import Axios, { AxiosError } from "axios";
import { BaseApiResponse, Manufacturer, ManufacturerFilter } from "../common";
import { baseApi } from "./BaseApi";
import { BaseApi } from "./types";
import { isNil } from "lodash";

class ManufacturerApiService {
  private baseService: BaseApi;
  private baseUrl: string = "/manufacturer";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  // product API (Base info)
  async getManufacturerList(
    filters?: ManufacturerFilter
  ): Promise<BaseApiResponse<Manufacturer[]>> {
    let subUrl = "/all";
    const search: string[] = [];
    if (filters) {
      if (filters.companyName) {
        search.push(`companyName=${filters.companyName}`);
      }
      if (isNil(filters.isVerified)) {
        search.push(`isVerified=${filters.isVerified}`);
      }
    }

    if (search) {
      subUrl = subUrl + "?" + search.join("&");
    }
    const url = this.baseUrl + subUrl;
    const result: BaseApiResponse<Manufacturer[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<
        BaseApiResponse<Manufacturer[]>
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

  async getManufacturerDetails(
    id?: string
  ): Promise<BaseApiResponse<Manufacturer>> {
    const subUrl = `/${id}/details`;

    const url = this.baseUrl + subUrl;
    const result: BaseApiResponse<Manufacturer> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<
        BaseApiResponse<Manufacturer>
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

  async verifyManufacturer(
    isVerified: boolean,
    id: string
  ): Promise<BaseApiResponse<Manufacturer>> {
    const subUrl = `/${id}/verify`;
    const url = this.baseUrl + subUrl;
    const result: BaseApiResponse<Manufacturer> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.patch<
        BaseApiResponse<Manufacturer>,
        { isVerified: boolean }
      >(url, { isVerified });

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

export const manufacturerApiService = new ManufacturerApiService(baseApi);
