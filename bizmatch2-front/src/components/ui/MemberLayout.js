import React from "react";
import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";

export default function MemberLayout() {
  return (
    <>
      <BeforeLoginHeader />
      <Outlet />
    </>
  );
}
