import Axios, { AxiosError } from "axios";
import { User } from "../common";
import { BaseApiResponse } from "../common/types/apiTypes";
import { baseApi } from "./BaseApi";
import { BaseApi } from "./types";

type CheckUserRequest = {
  email: string;
};

type SendEmailRequest = {
  id: string;
};

type ResetPasswordRequest = {
  token: string;
  password: string;
};

type ChangePasswordRequest = {
  password: string;
  currentPassword: string;
};

type SentEmailResponse = {
  status: number;
  body: any;
};

class PasswordService {
  private baseService: BaseApi;
  private baseUrl: string = "/passwords";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  async checkAccountRequest(email: string): Promise<BaseApiResponse<User[]>> {
    const url = this.baseUrl + "/get-users";
    const result: BaseApiResponse<User[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      const request: CheckUserRequest = {
        email,
      };
      const apiResponse = await this.baseService.post<
        BaseApiResponse<User[]>,
        CheckUserRequest
      >(url, request);

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

  async sendEmail(id: string): Promise<BaseApiResponse<SentEmailResponse>> {
    const url = this.baseUrl + "/send-email";
    const result: BaseApiResponse<SentEmailResponse> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const request: SendEmailRequest = {
        id,
      };
      const apiResponse = await this.baseService.post<
        BaseApiResponse<SentEmailResponse>,
        SendEmailRequest
      >(url, request);

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

  async resetPassword(
    token: string,
    password: string
  ): Promise<BaseApiResponse<string>> {
    const url = this.baseUrl + "/reset-password";
    const result: BaseApiResponse<string> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const request: ResetPasswordRequest = {
        token,
        password,
      };
      const apiResponse = await this.baseService.post<
        BaseApiResponse<string>,
        ResetPasswordRequest
      >(url, request);

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

  async changePassword(
    password: string,
    currentPassword: string
  ): Promise<BaseApiResponse<string>> {
    const url = this.baseUrl + "/change-password";
    const result: BaseApiResponse<string> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const request: ChangePasswordRequest = {
        password,
        currentPassword,
      };
      const apiResponse = await this.baseService.post<
        BaseApiResponse<string>,
        ChangePasswordRequest
      >(url, request);

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

export const passwordService = new PasswordService(baseApi);
