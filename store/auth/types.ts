// General Types.
interface Client {
  id: number;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}
export interface PhoneRequest {
  phone: string;
}

export type PhoneResponse = {
  message: string;
};

export interface VerifyCodeRequest {
  code: string;
  phone: string;
}
export type VerifyCodeResponse = {
  message: string;
  token: string;
};

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  password: string;
  token: string;
}
export type RegisterResponse = {
  token: string;
  client: Client;
};

export type LoginResponse = any;
export type LoginRequest = any;
