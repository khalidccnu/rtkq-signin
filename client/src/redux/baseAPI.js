import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && [403].includes(response.error.status)) {
    await baseQuery("signout", api, extraOptions);
  }

  return response;
};

const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export default baseAPI;
