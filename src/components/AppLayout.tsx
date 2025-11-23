import { useUser } from "../hooks/useUser";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function AppLayout() {
  const { isPending } = useUser();

  if (isPending) return <LoadingSpinner />;

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
