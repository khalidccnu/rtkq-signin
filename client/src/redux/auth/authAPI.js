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
    signOut: build.mutation({
      query: () => {
        return {
          url: "signout",
          method: "post",
        };
      },
    }),
    user: build.query({
      query: () => "user",
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useUserQuery,
} = authAPI;
