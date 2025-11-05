export interface PhoneRequest {
  phone: string;
}

export type PhoneResponse = {
  message: string;
};

export interface User {
  is_activated: boolean;
  first_name: string;
  last_name: string;
  email: string;
}

export type RegisterResponse = any;
export type RegisterRequest = any;
export type LoginResponse = any;
export type LoginRequest = any;
