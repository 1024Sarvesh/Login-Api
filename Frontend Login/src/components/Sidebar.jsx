import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router'

function Sidebar() {

    const { isLogin, setIsLogin,setUser } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = () => {
  document.cookie = "token=; max-age=0; path=/";
  document.cookie = "name=; max-age=0; path=/";
  document.cookie = "email=; max-age=0; path=/";

  setIsLogin(false);
  setUser(null);

  navigate("/auth/login", { replace: true });
};
    
    return (
        <aside className="w-full md:w-72 md:min-w-2xs bg-indigo-100 p-4 md:p-5 rounded-2xl shadow">
            <div className="flex items-center gap-3">

                {isLogin ? (
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-gray-900 transition cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/auth/login"
                        className="px-5 py-2 border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-gray-900 transition cursor-pointer"
                    >
                        Login
                    </Link>
                )}

                {!isLogin && (
                    <Link
                        to="/auth/signup"
                        className="px-5 py-2 bg-sky-400 text-gray-900 font-semibold rounded-lg hover:bg-sky-500 transition cursor-pointer"
                    >
                        Signup
                    </Link>
                )}

            </div>

        </aside>
    )
}

export default Sidebar