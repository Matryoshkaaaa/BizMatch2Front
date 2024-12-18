import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderNav from "../../admin/ui/HeaderNav";
import AfterLoginHeader from "../main/AfterLoginHeader";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import { useSelector } from "react-redux";
import ScrollToTop from "../main/ScrollToTop";

export default function AdminLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState?.info?.mbrCtgry !== 2) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loginState, navigate]);

  return (
    <>
      <div>
        <ScrollToTop />
        {loginState.info && loginState.info.emilAddr ? (
          <AfterLoginHeader />
        ) : (
          <BeforeLoginHeader />
        )}
        {loginState?.info?.mbrCtgry === 2 ? (
          <div>
            <HeaderNav />
            <Outlet />
          </div>
        ) : (
          <p>관리자가 아닙니다... {timer}초 후에 메인페이지로 이동합니다.</p>
        )}
      </div>
    </>
  );
}
