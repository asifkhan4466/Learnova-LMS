import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="main-content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
