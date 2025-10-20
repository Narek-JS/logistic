import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/urls";

const RTKApi = createApi({
  reducerPath: "api",
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
});

export { RTKApi };
