import apiSlice from "../ApiSlice";

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
    getUserById: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/users`,
        method: "POST",
        body: payload?.body,
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: payload?.body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({
        url: `/categories/${payload.id}`,
        method: "DELETE",
      }),
    }),
    getUsersCount: builder.mutation({
      query: () => ({
        url: `/users/get/count`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useGetUserByIdMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersCountMutation,
} = UserApiSlice;
