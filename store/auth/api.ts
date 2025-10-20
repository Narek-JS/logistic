import {
  RegisterResponse,
  RegisterRequest,
  LoginResponse,
  LoginRequest,
} from "./types";
import { setAccessToken } from "./slice";
import { RTKApi } from "../api";

const extendedApi = RTKApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (props) => ({
        url: "/auth/login",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
        const response = await mutationLifeCycleApi.queryFulfilled;
        const token = response.data.access_token;
        mutationLifeCycleApi.dispatch(setAccessToken({ token }));
      },
    }),

    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (props) => ({
        url: "/auth/register",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(_queryArgument, mutationLifeCycleApi) {
        const response = await mutationLifeCycleApi.queryFulfilled;
        const token = response.data.access_token;
        mutationLifeCycleApi.dispatch(setAccessToken({ token }));
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = extendedApi;

export default extendedApi;
