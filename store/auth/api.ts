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
    phone: build.mutation<PhoneResponse, PhoneRequest>({
      query: (props) => ({
        url: "/client/auth/register-phone",
        method: "POST",
        body: props,
      }),
    }),
    verifyCode: build.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (props) => ({
        url: "/client/auth/verify-phone",
        method: "POST",
        body: props,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
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

    // register: build.mutation<RegisterResponse, RegisterRequest>({
    //   query: (props) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: props,
    //   }),
    //   async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
    //     const response = await mutationLifeCycleApi.queryFulfilled;
    //     const token = response.data.access_token;
    //     mutationLifeCycleApi.dispatch(setAccessToken({ token }));
    //   },
    // }),
  }),
});

export const {
  useVerifyCodeMutation,
  useRegisterMutation,
  useLoginMutation,
  usePhoneMutation,
} = extendedApi;

export default extendedApi;
