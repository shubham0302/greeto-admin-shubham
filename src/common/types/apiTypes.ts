export interface BaseApiResponse<T> {
  data: T;
  success: boolean;
  error?: BaseApiErrorResponse;
  cancelled?: boolean;
}

export interface BaseApiErrorResponse {
  message?: string;
}
