import React from "react";
import { Outlet } from "react-router-dom";
import AfterLoginHeader from "../main/AfterLoginHeader";
import ScrollToTop from "../main/ScrollToTop";

export default function PaymentLayout() {
  return (
    <>
      <ScrollToTop />
      <AfterLoginHeader />
      <Outlet />
    </>
  );
}
