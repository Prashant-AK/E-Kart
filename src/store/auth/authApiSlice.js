import apiSlice from "../ApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (payload) => ({
        url: `/users/login`,
        method: "POST",
        body: payload,
      }),
    }),
    userSignup: builder.mutation({
      query: (payload) => ({
        url: `/users/register`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserSignupMutation } = authApiSlice;
