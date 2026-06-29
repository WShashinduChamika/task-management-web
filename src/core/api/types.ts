export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiErrorBody = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;
