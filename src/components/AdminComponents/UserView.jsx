import React, { useState, useEffect } from "react";
import { Trash2, Edit, Eye } from "lucide-react";
import { useGetAllUsersMutation } from "../../store/user/userApiSlice";
import toast from "react-hot-toast";

const USERS = [
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
];
const UsersView = () => {
  const [users, setUsers] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");
  const [filteredRole, setFilteredRole] = useState("All");
  const [getAllUsers, { isLoading: UsersLoading, data: AllUsersList }] =
    useGetAllUsersMutation();
  const [deleteUser, { isLoading: UsersDeleting, data: deleteUserResponse }] =
    useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (AllUsersList) {
      setUsers(AllUsersList);
    }
  }, [AllUsersList]);

  useEffect(() => {
    if (deleteUserResponse) {
      toast.success("User Deleted successfully");
      getAllUsers();
    }
  }, [deleteUserResponse]);

  const handleDeleteUser = (id) => {
    deleteUser({ id });
  };

  const getAddress = (user) => {
    const { street, apartment, zip, city, country } = user;

    // Create an array of address components
    const addressComponents = [street, apartment, zip, city, country];

    // Filter out empty components and join them with commas
    const address = addressComponents.filter(Boolean).join(", ");

    return address || "Address not provided";
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* User List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Phone No</th>
            <th className="border p-2 text-left">Address </th>
            <th className="border p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                {user?.isAdmin ? "Admin" : "Customer"}
              </td>
              <td className={`border p-2 `}>{user?.phone}</td>
              <td className="border p-2">{getAddress(user)}</td>
              <td className="border p-2 text-right space-x-2">
                {/* <button className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600">
                  <Eye className="h-4 w-4" />
                </button> */}
                {/* <button className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600">
                  <Edit className="h-4 w-4" />
                </button> */}
                <button
                  onClick={() => handleDeleteUser(user?.id)}
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
      {!users.length && (
        <p className="text-gray-500 text-center mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UsersView;
