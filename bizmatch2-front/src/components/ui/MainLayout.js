import React from "react";
import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import Footer from "../main/Footer";

export default function MainLayout() {
  return (
    <div>
      <BeforeLoginHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
