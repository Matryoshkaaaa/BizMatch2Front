import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNav from "../../admin/ui/HeaderNav";

export default function AdminLayout() {
  return (
    <div>
      <HeaderNav />
      <Outlet />
    </div>
  );
}
