import { Outlet } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import NavFooter from "./components/NavFooter";

function AppLayout() {
  return (
    <>
      <NavHeader />
      <Outlet />
      <NavFooter />
    </>
  );
}

export default AppLayout;
