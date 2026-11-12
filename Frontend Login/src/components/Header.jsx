
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'

function Header() {

    const { isLogin, setIsLogin } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = () => {
        document.cookie = "token=; max-age=0; path=/";

        setIsLogin(false);

        navigate("/auth/login");
    };

    return (
        <header className="w-full shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div>
                    <Link to="/" className="text-2xl font-bold text-sky-800">
                        Login API
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-sky-400 transition">
                        Home
                    </Link>

                    <Link to="/about" className="hover:text-sky-400 transition">
                        About
                    </Link>

                    <Link to="/contact" className="hover:text-sky-400 transition">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-3">

                    {isLogin ? (
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-gray-900 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="px-5 py-2 border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-gray-900 transition"
                        >
                            Login
                        </Link>
                    )}

                    {!isLogin && (
                        <Link
                            to="/auth/signup"
                            className="px-5 py-2 bg-sky-400 text-gray-900 font-semibold rounded-lg hover:bg-sky-500 transition"
                        >
                            Signup
                        </Link>
                    )}

                </div>

            </div>
        </header>
    )
}

export default Header
