import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace />;
  } else return <Outlet></Outlet>;
};

export default PrivateRoute;
