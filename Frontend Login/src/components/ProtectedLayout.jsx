import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../context/AuthContext'

function ProtectedLayout() {
    const { isLogin } = useAuthContext()

    if (!isLogin) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}

export default ProtectedLayout