/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface IError {
  message: string;
  errors: Record<string, string[]>;
}

export type ApiFieldErrors = Record<string, string[] | string>;

export type Api400Error = {
  data: {
    message: string;
  };
  status: 400;
};

export type Api422Error = {
  data: {
    message: string;
    errors: ApiFieldErrors;
  };
  status: 422;
};

export type Api429Error = {
  data: {
    message: string;
  };
  status: 429;
};

export type ApiError = Api400Error | Api422Error | Api429Error;

export type ApiResponse<TSuccessData> = {
  data?: TSuccessData;
  error?: ApiError;
};

// 400 {"error": {"data": {"message": "Could not send verification code. Please try again."}, "status": 400}}
// 422 {"error": {"data": {"errors": [Object], "message": "The phone field format is invalid."}, "status": 422}}
// 429 {"error": {"data": {"message": "Too many failed attempts. Try again in 1 minute 24 seconds."}, "status": 429}}
