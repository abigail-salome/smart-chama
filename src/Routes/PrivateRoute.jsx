import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Not logged in redirects to login
  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  // if Logged in allows access
  return children;
};

export default PrivateRoute;
