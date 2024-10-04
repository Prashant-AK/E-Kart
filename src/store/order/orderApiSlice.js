import apiSlice from "../ApiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.mutation({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
    getordersById: builder.mutation({
      query: (payload) => ({
        url: `/orders/${payload.id}`,
        method: "GET",
      }),
    }),
    getordersCount: builder.mutation({
      query: () => ({
        url: `/orders/get/count`,
        method: "GET",
      }),
    }),
    getTotalSales: builder.mutation({
      query: () => ({
        url: `/orders/get/totalsales`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: payload?.body,
      }),
    }),
    updateOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders/${payload.id}`,
        method: "PUT",
        body: payload?.body,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders/${payload.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersMutation,
  useGetordersByIdMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetordersCountMutation,
  useGetTotalSalesMutation,
} = orderApiSlice;
