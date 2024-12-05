import React from "react";
import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import Footer from "../main/Footer";

export default function MemberLayout() {
  return (
    <>
      <BeforeLoginHeader />
      <Outlet />
      <Footer />
    </>
  );
}
