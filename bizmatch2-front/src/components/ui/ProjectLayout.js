import { Outlet } from "react-router-dom";
import AfterLoginHeader from "../main/AfterLoginHeader";
import Footer from "../main/Footer";

export default function ProjectLayout() {
  return (
    <>
      <AfterLoginHeader />
      <Outlet />
      <Footer />
    </>
  );
}
