import { useEffect, type JSX } from "react";
import { useUser } from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isPending } = useUser();

  useEffect(() => {
    if (user === null) {
      const redirectTo = encodeURIComponent(location.pathname);
      navigate(`/sign-in?redirect=${redirectTo}`);
    }
  }, [user, navigate, location.pathname]);
  if (isPending) return null;
  return children;
}

export default ProtectedRoute;
