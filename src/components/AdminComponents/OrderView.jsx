import React, { useState, useEffect } from "react";
import { Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { ChangeDateFormat } from "../../utils/helper.js";
import {
  useDeleteOrderMutation,
  useGetAllOrdersMutation,
} from "../../store/order/orderApiSlice";

const OrdersView = () => {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusOptions] = useState([
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [getAllOrders, { isLoading, data: AllOrderList }] =
    useGetAllOrdersMutation();
  const [deleteOrder, { isLoading: deleting, data: deleteOrderResponse }] =
    useDeleteOrderMutation();

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (AllOrderList) {
      setOrders(AllOrderList);
    }
  }, [AllOrderList]);
  useEffect(() => {
    if (deleteOrderResponse) {
      toast.success("Order deleted successfully");
      getAllOrders();
    }
  }, [deleteOrderResponse]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder({ id: orderId });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Order ID</th>
            <th className="border p-2 text-left">Customer</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Total</th>
            <th className="border p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?.id}>
              <td className="border p-2">{order?.id}</td>
              <td className="border p-2">{order?.user?.name}</td>
              <td className="border p-2">
                {ChangeDateFormat(order?.dateOrdered)}
              </td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order?.id, e.target.value)}
                  className="border rounded-md px-3 py-1"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">${order?.totalPrice?.toFixed(2)}</td>
              <td className="border p-2 text-right space-x-2">
                <button
                  onClick={() => viewOrderDetails(order)}
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteOrder(order?.id)}
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder?.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder?.user?.name}
            </p>
            <p>
              <strong>Date:</strong>
              {ChangeDateFormat(selectedOrder?.dateOrdered)}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder?.status}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder?.totalPrice?.toFixed(2)}
            </p>

            <h4 className="mt-4 mb-2 font-semibold">Items Ordered</h4>
            <ul className="space-y-2">
              {selectedOrder?.orderItems?.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item.product?.name} - {item?.quantity} x $
                  {item?.product?.price?.toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersView;
