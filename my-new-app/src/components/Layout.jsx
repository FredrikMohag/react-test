// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../src/index.css"; // Se till att importera CSS

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
