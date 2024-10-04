// components/Sidebar.js
import React from "react";
import { ShoppingCart, Package, Users } from "lucide-react";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: "Orders", icon: ShoppingCart },
    { name: "Products", icon: Package },
    { name: "Users", icon: Users },
  ];

  return (
    <div className="bg-white border-r h-full p-4 w-64">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Admin Dashboard
      </h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeItem === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
