import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNav from "../../admin/ui/HeaderNav";
import AfterLoginHeader from "../main/AfterLoginHeader";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  return (
    <>
      <div>
        {loginState.info && loginState.info.emilAddr ? (
          <AfterLoginHeader />
        ) : (
          <BeforeLoginHeader />
        )}
        <HeaderNav />
        <Outlet />
      </div>
    </>
  );
}
