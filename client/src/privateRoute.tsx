import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './redux/store';



const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => {

    return state.auth.token
  });
  const user = useSelector((state: RootState) => state.auth.user);

  if (!token) {
    return <Navigate to={"/login"} replace />;

  } else

    return <Outlet></Outlet>;
};

export default PrivateRoute;