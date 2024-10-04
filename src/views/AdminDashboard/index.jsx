// components/AdminDashboard.js
import React, { useState } from "react";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import Sidebar from "../../components/AdminComponents/Sidebar";
import OrdersView from "../../components/AdminComponents/OrderView";
import ProductsView from "../../components/AdminComponents/ProductView";
import UsersView from "../../components/AdminComponents/UserView";
export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("Orders");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeItem) {
      case "Orders":
        return <OrdersView />;
      case "Products":
        return <ProductsView />;
      case "Users":
        return <UsersView />;
      default:
        return <OrdersView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        ismobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1">
        <aside
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block fixed inset-y-0 left-0 z-50 w-64 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </aside>
        <main className="flex-1 p-6 overflow-auto">{renderView()}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
