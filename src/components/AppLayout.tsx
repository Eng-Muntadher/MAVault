import { useUser } from "../hooks/useUser";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  // check for current signed in user (if there is one)
  const { isPending } = useUser();

  // Until check is complete, we render a spinner
  if (isPending) return null;

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
