import React from "react";
import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import { useSelector } from "react-redux";
import AfterLoginHeader from "../main/AfterLoginHeader";

export default function MemberLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  console.log("data", loginState.info);
  return (
    <>
      <div>
        {loginState.info && loginState.info.emilAddr ? (
          <AfterLoginHeader />
        ) : (
          <BeforeLoginHeader />
        )}
        <Outlet />
      </div>
    </>
  );
}
