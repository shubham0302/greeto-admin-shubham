import Axios, { AxiosError } from "axios";
import { baseApi } from "./BaseApi";
import { BaseApi, ImageUploadResponse } from "./types";
import { MediaType, BaseApiResponse } from "../common";

class ImageApiService {
  private baseService: BaseApi;
  private baseUrl: string = "/media";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  async uploadImage(file: File): Promise<BaseApiResponse<ImageUploadResponse>> {
    const url = this.baseUrl;
    const result: BaseApiResponse<ImageUploadResponse> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const apiResponse = await this.baseService.post<
        BaseApiResponse<ImageUploadResponse>,
        FormData
      >(url, formData);
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

  async getImageList(type: MediaType): Promise<BaseApiResponse<string[]>> {
    const url = this.baseUrl + "?fileType=" + type;
    const result: BaseApiResponse<string[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<BaseApiResponse<string[]>>(
        url
      );
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

export const imageApiService = new ImageApiService(baseApi);
