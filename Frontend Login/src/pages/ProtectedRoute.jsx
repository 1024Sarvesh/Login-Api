import React, { useContext } from 'react'
import { AuthContext } from '../App'
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {

    const {isLogin} = useContext(AuthContext)
   if (!isLogin) {
    return <Navigate to={"/auth/login"}/>;
  }

  return <Outlet />;
}

export default ProtectedRoute