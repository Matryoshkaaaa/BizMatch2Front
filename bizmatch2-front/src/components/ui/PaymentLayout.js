import React from "react";
import { Outlet } from "react-router-dom";
import AfterLoginHeader from "../main/AfterLoginHeader";

export default function PaymentLayout() {
  return (
    <>
      <AfterLoginHeader />
      <Outlet />
    </>
  );
}
