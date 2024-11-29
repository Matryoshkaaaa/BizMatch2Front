import HeaderNav from "./HeaderNav";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <HeaderNav />
      <Outlet />
    </div>
  );
}
