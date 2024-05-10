import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestHeaders,
} from "axios";
import {
  BaseApi,
  InterceptorRequestConfig,
  InterceptorResponse,
  UrlParams,
} from "./types";
import { LogLevel, logger } from "../common";
import { v4 as uuidV4 } from "uuid";
import { cloneDeep, isEmpty } from "lodash";
import qs from "query-string";

export const defHeaders = new AxiosHeaders();

export const apiConfig: InterceptorRequestConfig<null> = {
  // baseURL: "http://localhost:5010/api",
  baseURL: "https://backend.greetogifts.com/api",
  // baseURL: "https://api.adanisaksham.com/api",
  // baseURL: "https://b102-2401-4900-1f3e-8fff-00-1c2-77b3.ngrok-free.app/api",
  withCredentials: true,
  timeout: 2 * 60 * 1000,
  headers: {
    ...defHeaders,
    Accept: "application/json",
    // "Content-Type": "application/json",
  } as AxiosRequestHeaders,
};

class BaseApiService implements BaseApi {
  protected api: AxiosInstance;
  constructor(config?: InterceptorRequestConfig<null>) {
    this.api = axios.create(config);
    this.api.interceptors.request.use(this.requestInterceptors.bind(this));
    this.api.interceptors.response.use(
      this.responseSuccessInterceptors.bind(this),
      this.responseErrorInterceptors.bind(this)
    );
  }

  private logger(msg: unknown, timeStamp?: Date) {
    const stamp = timeStamp || new Date();
    logger.log(LogLevel.INFO, "Base Api", `${msg} at ${stamp}`);
  }

  getCommonHeaders(): Record<string, AxiosHeaderValue> {
    return this.api.defaults.headers || {};
  }

  setCommonHeader(header: string, value: string) {
    if (!isEmpty(header) && !isEmpty(value)) {
      this.api.defaults.headers[header] = value;
      logger.log(
        LogLevel.INFO,
        "Base Api",
        `Setting Header: ${header} Value ${value}`
      );
    } else {
      logger.log(
        LogLevel.ERROR,
        "Base APi",
        `Header Error. Header: ${header} Value ${value}`
      );
    }
  }

  private async requestInterceptors<T>(
    config: InterceptorRequestConfig<T>
  ): Promise<InterceptorRequestConfig<T>> {
    config.headers = config.headers || defHeaders;
    config.headers["requestId"] = uuidV4();
    this.logger(config);
    return Promise.resolve(config);
  }
  private responseSuccessInterceptors<T, D>(
    response: InterceptorResponse<T, D>
  ) {
    this.logger(response);
    return this.sucess(response);
  }
  private responseErrorInterceptors(error: AxiosError<Error>) {
    return this.error(error);
  }

  private sucess<T, D>(response: InterceptorResponse<T, D>) {
    return response;
  }

  private error(error: AxiosError<Error>) {
    if (error?.response?.status === 401) {
      const isLoginRequired = true;
      const unAuthorizedEvent = new CustomEvent("globalError", {
        detail: {
          message: "Unauthorized",
          isLoginRequired,
        },
      });
      window.dispatchEvent(unAuthorizedEvent);
    }
    throw error;
  }

  get<T, B = UrlParams, R = InterceptorResponse<T, B>>(
    url: string,
    payload?: B,
    config?: InterceptorRequestConfig<B>,
    encode = false
  ): Promise<R> {
    url += !isEmpty(payload)
      ? `?${qs.stringify(payload as any, { encode: encode })}`
      : "";
    return this.api.get(url, config);
  }

  delete<T, R = InterceptorResponse<T, null>>(
    url: string,
    config?: InterceptorRequestConfig<null>
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  post<T, B, R = InterceptorResponse<T, B>>(
    url: string,
    data?: B,
    config?: InterceptorRequestConfig<B>
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  put<T, B, R = InterceptorResponse<T, B>>(
    url: string,
    data?: B,
    config?: InterceptorRequestConfig<B>
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  patch<T, B, R = InterceptorResponse<T, B>>(
    url: string,
    data?: B,
    config?: InterceptorRequestConfig<B>
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}

export const baseApi = new BaseApiService(cloneDeep(apiConfig));
