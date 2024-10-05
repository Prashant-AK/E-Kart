import logo from "./logo.svg";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import HomePage from "./views/HomePage";
import ProductDetails from "./views/ProductDetails";
import MyCart from "./views/MyCart";
import AdminDashboard from "./views/AdminDashboard";
import BuyNowPage from "./views/BuyNow";
import EnhancedMyOrdersPage from "./views/MyOrders";
import PublicLayout from "./Layout/PublicLayout";
import SimplifiedMyProfilePage from "./views/MyProfile";
import "./App.css";

function App() {
  return (
    <>
      <Toaster
        position="top-right" // Change the position
        reverseOrder={false} // Display latest toasts at the top
        toastOptions={{
          duration: 4000, // Set duration for the toast
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/product-details"
          element={
            <PublicLayout>
              <ProductDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <PublicLayout>
              <SimplifiedMyProfilePage />
            </PublicLayout>
          }
        />
        <Route
          path="/mycart"
          element={
            <PublicLayout>
              <MyCart />
            </PublicLayout>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PublicLayout>
              <EnhancedMyOrdersPage />
            </PublicLayout>
          }
        />
        <Route
          path="/buy"
          element={
            <PublicLayout>
              <BuyNowPage />
            </PublicLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
