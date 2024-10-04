import apiSlice from "../ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.mutation({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
    }),
    getProductById: builder.mutation({
      query: (payload) => ({
        url: `/products/${payload.id}`,
        method: "GET",
      }),
    }),
    getAllProductsCount: builder.mutation({
      query: () => ({
        url: `/products/get/count`,
        method: "GET",
      }),
    }),
    getAllFeaturedProductsCount: builder.mutation({
      query: ({ count }) => ({
        url: `/products/get/featured/${count}`,
        method: "GET",
      }),
    }),
    searchProduct: builder.mutation({
      query: ({ search }) => ({
        url: `/products/search?q=${search}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    // createProduct: builder.mutation({
    //   query: (payload) => ({
    //     url: `/products`,
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),
    // updateProduct: builder.mutation({
    //   query: (payload) => ({
    //     url: `/products/${payload.id}`,
    //     method: "PUT",
    //     body: payload,
    //   }),
    // }),
    // /gallery-images/:id
  }),
});

export const {
  useGetAllProductsMutation,
  useGetProductByIdMutation,
  useGetAllProductsCountMutation,
  useGetAllFeaturedProductsCountMutation,
  useSearchProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
