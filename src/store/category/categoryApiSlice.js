import apiSlice from "../ApiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.mutation({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
    }),
    getCategoriesById: builder.mutation({
      query: (payload) => ({
        url: `/categories/${payload.id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: `/categories`,
        method: "POST",
        body: payload?.body,
      }),
    }),
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `/categories/${payload.id}`,
        method: "PUT",
        body: payload?.body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (payload) => ({
        url: `/categories/${payload.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesMutation,
  useGetCategoriesByIdMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
