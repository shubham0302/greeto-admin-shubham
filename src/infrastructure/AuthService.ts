import Axios, { AxiosError } from "axios";
import { omit } from "lodash";
import { LoginRequest, User } from "../common";
import { BaseApiResponse } from "../common/types/apiTypes";
import { baseApi } from "./BaseApi";
import { BaseApi, ChangeProfileType } from "./types";

class AuthService {
  private baseService: BaseApi;
  private baseUrl: string = "/admin";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  async login(
    credentials: string,
    password: string
  ): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/login";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.post<
        BaseApiResponse<User>,
        LoginRequest
      >(url, {
        email: credentials,
        password,
      });
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  async changeProfile(body: User): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/" + body._id + "/changeProfile";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.put<
        BaseApiResponse<User>,
        ChangeProfileType
      >(url, omit(body, ["_id", "__v", "joinDate", "role"]));
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async fetchProfile(): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/profile";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<BaseApiResponse<User>>(
        url
      );
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async logout(): Promise<BaseApiResponse<string>> {
    const url = this.baseUrl + "/logout";
    const result: BaseApiResponse<string> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<BaseApiResponse<string>>(
        url
      );
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: logoutData, success, error } = data || {};
        if (success) {
          result.data = logoutData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  protected handleError<T>(err: any, result: BaseApiResponse<T>) {
    let message = err?.message;
    const error = err as AxiosError;
    if (error?.isAxiosError) {
      message = ((error?.response?.data as any)?.error as any)?.message;
    }
    const cancelled = Axios.isCancel(err);
    result.success = false;
    result.cancelled = cancelled;
    result.error = {
      message: cancelled ? "Server call has been cancelled" : message,
    };
  }
}

export const authService = new AuthService(baseApi);
