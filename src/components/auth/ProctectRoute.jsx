import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ allowedRole, children }) => {
  const { accessToken, role } = useSelector((state) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;

  if (allowedRole && !allowedRole.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return children ? children : <Outlet />;
};

export default ProtectRoute;
