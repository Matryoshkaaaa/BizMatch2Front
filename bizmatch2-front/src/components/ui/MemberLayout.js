import React from "react";
import { Outlet } from "react-router-dom";
import AfterLoginHeader from "../main/AfterLoginHeader";
import { useSelector } from "react-redux";
import BeforeLoginHeader from "../main/BeforeLoginHeader";

export default function MemberLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));

  return (
    <>
      {loginState.info && loginState.info.emilAddr ? (
        <AfterLoginHeader />
      ) : (
        <BeforeLoginHeader />
      )}
      <Outlet />
    </>
  );
}
