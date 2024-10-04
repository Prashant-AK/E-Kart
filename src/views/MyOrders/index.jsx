import React, { useState } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  Box,
  CheckCircle,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const OrderStatus = ({ status }) => {
  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4 py-3 border-b last:border-b-0">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-md shadow-sm"
    />
    <div className="flex-1">
      <h4 className="font-semibold text-gray-800">{item.name}</h4>
      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
    </div>
    <p className="font-semibold text-lg">
      ${(item.price * item.quantity).toFixed(2)}
    </p>
  </div>
);

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden mb-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div
        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer transition-colors duration-300 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <p className="font-semibold text-lg">Order #{order.id}</p>
          <p className="text-sm text-gray-600">Placed on {order.date}</p>
        </div>
        <div className="flex items-center space-x-4">
          <OrderStatus status={order.status} />
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 bg-white">
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Items in this order
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">
                Shipping Address
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                {order.shippingAddress}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">
                Payment Method
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                {order.paymentMethod}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center border-t mt-6 pt-4">
            <span className="font-semibold text-lg text-gray-800">
              Order Total:
            </span>
            <span className="font-semibold text-2xl text-blue-600">
              ${order.total.toFixed(2)}
            </span>
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Track Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderTimeline = ({ status }) => {
  const steps = [
    { icon: Package, label: "Order Placed" },
    { icon: Box, label: "Processing" },
    { icon: Truck, label: "Shipped" },
    { icon: CheckCircle, label: "Delivered" },
  ];

  const currentStep = steps.findIndex((step) => step.label === status);

  return (
    <div className="flex items-center justify-between w-full mt-6">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              index <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <step.icon className="w-6 h-6" />
          </div>
          <p className="text-xs mt-2 text-center font-medium">{step.label}</p>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-full absolute top-6 left-1/2 ${
                index < currentStep ? "bg-blue-500" : "bg-gray-200"
              }`}
              style={{ width: "calc(100% - 3rem)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function EnhancedMyOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const orders = [
    {
      id: "ORD12345",
      date: "May 15, 2023",
      status: "Delivered",
      total: 129.97,
      shippingAddress: "123 Main St, Anytown, ST 12345",
      paymentMethod: "Credit Card ending in 1234",
      items: [
        {
          name: "Wireless Headphones",
          quantity: 1,
          price: 79.99,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          name: "Phone Case",
          quantity: 2,
          price: 24.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD12346",
      date: "May 20, 2023",
      status: "Shipped",
      total: 89.99,
      shippingAddress: "456 Elm St, Othertown, ST 67890",
      paymentMethod: "PayPal",
      items: [
        {
          name: "Smart Watch",
          quantity: 1,
          price: 89.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD12347",
      date: "May 25, 2023",
      status: "Processing",
      total: 159.98,
      shippingAddress: "789 Oak St, Anothercity, ST 13579",
      paymentMethod: "Credit Card ending in 5678",
      items: [
        {
          name: "Bluetooth Speaker",
          quantity: 2,
          price: 79.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD12348",
      date: "May 28, 2023",
      status: "Processing",
      total: 49.99,
      shippingAddress: "101 Pine St, Somewhereville, ST 24680",
      paymentMethod: "Credit Card ending in 9012",
      items: [
        {
          name: "Fitness Tracker",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD12349",
      date: "June 1, 2023",
      status: "Shipped",
      total: 199.99,
      shippingAddress: "202 Maple Ave, Lasttown, ST 13579",
      paymentMethod: "PayPal",
      items: [
        {
          name: "Noise-Cancelling Headphones",
          quantity: 1,
          price: 199.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD12350",
      date: "June 5, 2023",
      status: "Processing",
      total: 299.97,
      shippingAddress: "303 Cedar Blvd, Newcity, ST 97531",
      paymentMethod: "Credit Card ending in 3456",
      items: [
        {
          name: "Smartphone",
          quantity: 1,
          price: 299.97,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ];

  const filteredOrders = orders
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .filter((order) => filterStatus === "All" || order.status === filterStatus);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="mb-10 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Current Order Status
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-gray-800">
              Order #ORD12347
            </h3>
            <OrderStatus status="Processing" />
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Estimated delivery: June 1, 2023
          </p>
          <OrderTimeline status="Processing" />
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-800">
          Order History
        </h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {currentOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {Array.from({
            length: Math.ceil(filteredOrders.length / ordersPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                currentPage === index + 1
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredOrders.length / ordersPerPage)
            }
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
