import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorComponent from "./pages/ErrorPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";

// Lazy load all pages
const About = lazy(() => import("./pages/About"));
const Explore = lazy(() => import("./pages/Explore"));
const Upload = lazy(() => import("./pages/Upload"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ImageDetails = lazy(() => import("./pages/ImageDetails"));

// Wrapper component to apply Suspense to lazy pages
const LazyPage = ({ component: Component }: { component: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="w-full h-dvh bg-(--text-color-2)">
        <LoadingSpinner />
      </div>
    }
  >
    {Component}
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <LazyPage component={<Explore />} />,
      },
      {
        path: "/upload",
        element: (
          <ProtectedRoute>
            <LazyPage component={<Upload />} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <LazyPage component={<About />} />,
      },
      {
        path: "/user-profile",
        element: (
          <ProtectedRoute>
            <LazyPage component={<UserProfile />} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/callback",
        element: <LazyPage component={<AuthCallback />} />,
      },
      {
        path: "/user-settings",
        element: (
          <ProtectedRoute>
            <LazyPage component={<UserSettings />} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: <LazyPage component={<SignUp />} />,
      },
      {
        path: "/sign-in",
        element: <LazyPage component={<SignIn />} />,
      },
      {
        path: "/image-details/:imageId",
        element: <LazyPage component={<ImageDetails />} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
