import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "./auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice.token;

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && [403].includes(response.error.status)) {
    api.dispatch(signOut());
  }

  return response;
};

const baseAPI = createApi({
  reducerPath: "baseAPI",
  tagTypes: ["auth"],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export default baseAPI;
