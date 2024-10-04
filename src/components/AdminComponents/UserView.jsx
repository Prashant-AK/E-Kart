import React, { useState } from "react";
import { Trash2, Edit, Eye } from "lucide-react";

const UsersView = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Customer",
      status: "Active",
      registeredDate: "2024-09-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Admin",
      status: "Inactive",
      registeredDate: "2024-08-22",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRole, setFilteredRole] = useState("All");

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => filteredRole === "All" || user.role === filteredRole);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* Search and Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email"
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
        />

        <select
          value={filteredRole}
          onChange={(e) => setFilteredRole(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="All">All Roles</option>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* User List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Registered Date</th>
            <th className="border p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td
                className={`border p-2 ${
                  user.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </td>
              <td className="border p-2">{user.registeredDate}</td>
              <td className="border p-2 text-right space-x-2">
                <button className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No Users Found */}
      {filteredUsers.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UsersView;
