import baseAPI from "../baseAPI.js";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (credentials) => {
        return {
          url: "auth",
          method: "post",
          body: credentials,
        };
      },
    }),
    signUp: build.mutation({
      query: (credentials) => {
        return {
          url: "signup",
          method: "post",
          body: credentials,
        };
      },
    }),
    user: build.query({
      query: () => "user",
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useUserQuery } = authAPI;
