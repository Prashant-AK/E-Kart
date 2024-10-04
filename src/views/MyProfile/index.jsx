import React, { useState } from "react";
import {
  User,
  MapPin,
  Package,
  LogOut,
  Edit,
  Plus,
  ChevronRight,
  X,
} from "lucide-react";
import FeaturedProduct from "../../components/HomeComponents/FeaturedProduct";
import useCustomNavigation from "../../hooks/useCustomNavigation";

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
      active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

// Profile Section Component
const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

// Order Item Component
const OrderItem = ({ order }) => (
  <div className="flex items-center justify-between border-b py-4 last:border-b-0">
    <div className="flex items-center space-x-4">
      <img
        src={order.image}
        alt={order.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <h3 className="font-semibold">{order.name}</h3>
        <p className="text-sm text-gray-600">Order ID: {order.id}</p>
        <p className="text-sm text-gray-600">Ordered on: {order.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">${order.total.toFixed(2)}</p>
      <p
        className={`text-sm ${
          order.status === "Delivered" ? "text-green-600" : "text-blue-600"
        }`}
      >
        {order.status}
      </p>
    </div>
  </div>
);

// Address Item Component
const AddressItem = ({ address }) => (
  <div className="border rounded-lg p-4 mb-4 last:mb-0 flex justify-between items-start">
    <div>
      <h3 className="font-semibold">{address.type}</h3>
      <p className="text-sm text-gray-600">{address.street}</p>
      <p className="text-sm text-gray-600">
        {address.city}, {address.state} {address.zip}
      </p>
    </div>
    <button className="text-blue-600 hover:text-blue-800">
      <Edit size={18} />
    </button>
  </div>
);

// Modal Component
const Modal = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default function SimplifiedMyProfilePage() {
  const [activeSection, setActiveSection] = useState("personal-info");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const navigate = useCustomNavigation();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
  };

  const recentOrders = [
    {
      id: "ORD12345",
      name: "Wireless Headphones",
      date: "May 15, 2023",
      total: 79.99,
      status: "Delivered",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "ORD12346",
      name: "Smart Watch",
      date: "May 20, 2023",
      total: 199.99,
      status: "Shipped",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "ORD12347",
      name: "Laptop Stand",
      date: "May 25, 2023",
      total: 29.99,
      status: "Processing",
      image: "/placeholder.svg?height=64&width=64",
    },
  ];

  const addresses = [
    {
      type: "Home",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    {
      type: "Work",
      street: "456 Office Blvd",
      city: "Workville",
      state: "NY",
      zip: "67890",
    },
  ];

  const handleLogout = () => {
    alert("Logout functionality to be implemented");
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    alert("Profile updated!");
    setIsEditModalOpen(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    alert("Address added!");
    setIsAddAddressModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-xl">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <SidebarItem
                  icon={User}
                  label="Personal Information"
                  active={activeSection === "personal-info"}
                  onClick={() => setActiveSection("personal-info")}
                />
                <SidebarItem
                  icon={MapPin}
                  label="Addresses"
                  active={activeSection === "addresses"}
                  onClick={() => setActiveSection("addresses")}
                />
                <SidebarItem
                  icon={Package}
                  label="Orders"
                  active={activeSection === "orders"}
                  onClick={() => setActiveSection("orders")}
                />
                <SidebarItem
                  icon={LogOut}
                  label="Logout"
                  onClick={handleLogout}
                />
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            {activeSection === "personal-info" && (
              <ProfileSection title="Personal Information">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={user.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={user.phone}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      readOnly
                    />
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white mt-6 px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Profile
                </button>
              </ProfileSection>
            )}

            {activeSection === "orders" && (
              <ProfileSection title="Recent Orders">
                {recentOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </ProfileSection>
            )}

            {activeSection === "addresses" && (
              <ProfileSection title="My Addresses">
                {addresses.map((address, index) => (
                  <AddressItem key={index} address={address} />
                ))}
                <button
                  className="flex items-center mt-4 text-blue-600 hover:text-blue-800"
                  onClick={() => setIsAddAddressModalOpen(true)}
                >
                  <Plus size={18} className="mr-2" />
                  Add New Address
                </button>
              </ProfileSection>
            )}
          </main>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile Details"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <form onSubmit={handleEditProfile}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="editFullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="editFullName"
                defaultValue={user.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="editEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="editEmail"
                defaultValue={user.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="editPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="editPhone"
                defaultValue={user.phone}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Address Modal */}
      <Modal
        title="Add New Address"
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
      >
        <form onSubmit={handleAddAddress}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="addressType"
                className="block text-sm font-medium text-gray-700"
              >
                Address Type
              </label>
              <select
                id="addressType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <input
                type="text"
                id="street"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={() => setIsAddAddressModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
      <FeaturedProduct />
    </div>
  );
}
