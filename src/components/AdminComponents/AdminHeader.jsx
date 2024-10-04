import React, { useState } from "react";
import { Menu, ChevronDown, LogOut } from "lucide-react";

// Placeholder avatar image
const defaultAvatar = "https://via.placeholder.com/150";

const AdminHeader = ({ setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("User logged out"); // Handle logout logic here
  };

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">E-Kart Admin</h1>
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800 font-medium">John Doe</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
