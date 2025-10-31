import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/user-profile/:userId",
        element: <UserProfile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
