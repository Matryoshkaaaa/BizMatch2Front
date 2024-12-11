import { Outlet } from "react-router-dom";
import BeforeLoginHeader from "../main/BeforeLoginHeader";
import Footer from "../main/Footer";
import { useSelector } from "react-redux";
import AfterLoginHeader from "../main/AfterLoginHeader";

export default function MainLayout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  //
  return (
    <div>
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
