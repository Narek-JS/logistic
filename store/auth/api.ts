import {
  VerifyCodeResponse,
  VerifyCodeRequest,
  RegisterResponse,
  RegisterRequest,
  LoginResponse,
  PhoneResponse,
  LoginRequest,
  PhoneRequest,
} from "./types";
import { setAccessToken } from "./slice";
import { RTKApi } from "../api";

const extendedApi = RTKApi.injectEndpoints({
  endpoints: (build) => ({
    phoneVendor: build.mutation<PhoneResponse, PhoneRequest>({
      query: (props) => ({
        url: "/vendor/auth/register-phone",
        method: "POST",
        body: props,
      }),
    }),
    verifyCodeVendor: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (props) => ({
        url: "/vendor/auth/verify-phone",
        method: "POST",
        body: props,
      }),
    }),
    registerVendor: build.mutation<RegisterResponse, RegisterRequest>({
      query: (props) => ({
        url: "/vendor/auth/register",
        method: "POST",
        body: props,
      }),
    }),
    phoneClient: build.mutation<PhoneResponse, PhoneRequest>({
      query: (props) => ({
        url: "/client/auth/register-phone",
        method: "POST",
        body: props,
      }),
    }),
    verifyCodeClient: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (props) => ({
        url: "/client/auth/verify-phone",
        method: "POST",
        body: props,
      }),
    }),
    registerClient: build.mutation<RegisterResponse, RegisterRequest>({
      query: (props) => ({
        url: "/client/auth/register",
        method: "POST",
        body: props,
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (props) => ({
        url: "/auth/login",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
        const response = await mutationLifeCycleApi.queryFulfilled;
        const token = response.data.data?.access_token;
        if (token) {
          mutationLifeCycleApi.dispatch(setAccessToken({ token }));
        }
      },
    }),
  }),
});

export const {
  useVerifyCodeVendorMutation,
  useVerifyCodeClientMutation,
  useRegisterClientMutation,
  useRegisterVendorMutation,
  usePhoneVendorMutation,
  usePhoneClientMutation,
  useLoginMutation,
} = extendedApi;

export default extendedApi;
