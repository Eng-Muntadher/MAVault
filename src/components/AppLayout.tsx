import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
