import Axios, { AxiosError } from "axios";
import { BaseApiResponse, Relation } from "../common";
import { baseApi } from "./BaseApi";
import { BaseApi } from "./types";

class RelationApiService {
  private baseService: BaseApi;
  private baseUrl: string = "/relation";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  // product API (Base info)
  async getActiveRelationList(): Promise<BaseApiResponse<Relation[]>> {
    const url = this.baseUrl + "/active";
    const result: BaseApiResponse<Relation[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<
        BaseApiResponse<Relation[]>
      >(url);

      const { status, data } = apiResponse;

      if (status === 200) {
        result.data = data.data;
        result.success = data.success;
        result.error = data.error;
      } else {
        result.success = false;
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

export const relationApiService = new RelationApiService(baseApi);
