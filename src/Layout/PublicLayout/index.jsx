// Layout.jsx
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
