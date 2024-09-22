import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header"; // Adjust the import path
import Footer from "../Footer/Footer"; // Adjust the import path if you have a footer

const Layout = () => {
  const location = useLocation(); // Get current path

  // Define paths where you don't want to show the header or footer
  const hideHeaderAndFooter = location.pathname === "/account"; // Only hide on Account page

  return (
    <>
      {!hideHeaderAndFooter && <Header />} {/* Conditionally render Header */}
      
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>

      {!hideHeaderAndFooter && <Footer />} {/* Conditionally render Footer */}
    </>
  );
};

export default Layout;
