import apiSlice from "../ApiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    userSignup: builder.mutation({
      query: (payload) => ({
        url: `/auth/user/register`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserSignupMutation } = searchApiSlice;
