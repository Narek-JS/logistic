import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/urls";

const RTKApi = createApi({
  reducerPath: "api",
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("x-current-locale", "en");
      headers.set("x-device-id", "111");
      return headers;
    },
  }),
});

export { RTKApi };
