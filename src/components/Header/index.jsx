import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User, ShoppingCart, Search, ChevronDown } from "lucide-react";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { useGetUserByIdMutation } from "../../store/user/userApiSlice";
// import { selectCartCount } from "../../store/cart/cartSlice";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Store user data
  const [getUserById, { data, isLoading }] = useGetUserByIdMutation();
  const navigate = useCustomNavigation();
  const cartItemCount = 1;
  // console.log("cartItemCount", cartItemCount);
  // // Function to handle dropdown toggle
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  // Handle navigation
  const handleNavigate = (path = "") => {
    if (path !== "") {
      navigate(path);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null); // Clear the user state
    navigate("/login");
  };

  // Fetch user data if token is present
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUserName = localStorage.getItem("name");

    if (storedUserName) {
      // If user name is present in localStorage, set it
      setUser({ name: storedUserName });
    } else if (token) {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        // Fetch user details using user ID if not available in localStorage
        getUserById({ id: userId, access_token: token })
          .unwrap()
          .then((userData) => {
            console.log("User data:", userData);
            setUser(userData); // Set the fetched user data
            localStorage.setItem("name", userData.name); // Save name to localStorage for future use
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            setUser(null); // Clear user if fetch fails
          });
      }
    }
  }, [getUserById]);

  return (
    <header className="font-sans">
      {/* Main header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold text-gray-800">
            E-kart
            <span className="block text-sm font-normal text-gray-500">
              Online Store
            </span>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center flex-grow mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search size={24} />
              </button>
            </div>
          </form>

          {/* User actions */}
          <div className="flex items-center space-x-6">
            {/* Shopping Cart Icon */}
            <div className="relative" onClick={() => navigate("/mycart")}>
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* User authentication */}
            {!user ? (
              <button
                onClick={() => handleNavigate("/login")}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <img
                    src={user.avatarUrl || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                    className="rounded-full w-10 h-10"
                  />
                  <span className="ml-2 text-gray-800 text-lg">
                    {user.name || "John Doe"}
                  </span>
                  <ChevronDown size={20} className="ml-1" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <ul>
                      <li>
                        <p
                          onClick={() => handleNavigate("/my-orders")}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          My Orders
                        </p>
                      </li>
                      <li>
                        <p
                          onClick={() => handleNavigate("/profile")}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          My Profile
                        </p>
                      </li>
                      <li>
                        <p
                          onClick={() => handleLogout()}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
