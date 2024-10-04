import React, { useState } from "react";
import { User, ShoppingCart, Search, ChevronDown } from "lucide-react";
import useCustomNavigation from "../../hooks/useCustomNavigation";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useCustomNavigation();
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Search Query:", searchQuery);
  };

  const handleNavigate = (path = "") => {
    if (path !== "") {
      navigate(path);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
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
            <a
              href="#"
              aria-label="Shopping cart"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={24} />
            </a>

            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <img
                  src="https://via.placeholder.com/40" // Placeholder for user avatar
                  alt="User Avatar"
                  className="rounded-full w-10 h-10" // Increased avatar size
                />
                <span className="ml-2 text-gray-800 text-lg">John Doe</span>
                <ChevronDown size={20} className="ml-1" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <ul>
                    <li>
                      <p
                        onClick={() => {
                          handleNavigate("/my-orders");
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        My Orders
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => {
                          handleNavigate("/profile");
                        }}
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
          </div>
        </div>
      </div>
    </header>
  );
}
