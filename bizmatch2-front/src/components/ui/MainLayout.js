import React from "react";
import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import Footer from "../main/Footer";
import { useSelector } from "react-redux";
import AfterLoginHeader from "../main/AfterLoginHeader";
import ScrollToTop from "../main/ScrollToTop";

export default function MainLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  //
  return (
    <div>
      <ScrollToTop />
      {loginState.info && loginState.info.emilAddr ? (
        <AfterLoginHeader />
      ) : (
        <BeforeLoginHeader />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}
