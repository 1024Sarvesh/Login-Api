
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'
import {
    CircleUserRound, X,
    Mail,
    UserRound
} from 'lucide-react'
import { getCookie } from '../utils/getcookie'

function Header() {

    const { isLogin, setIsLogin } = useAuthContext()
    const [isOpen, setIsOpen] = useState(false);
    const getname = getCookie('name')
    const getemail = getCookie('email')

    console.log(getemail, getname)


    return (
        <header className="w-full shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div>
                    <Link to="/" className="text-2xl font-bold text-sky-800">
                        Login API
                    </Link>
                </div>
                {isLogin ? <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-sky-400 transition">
                        Home
                    </Link>


                    <Link to="/auth/allusers" className="hover:text-sky-400 transition">
                        All Users
                    </Link>

                    <Link to="/expense/create" className="hover:text-sky-400 transition">
                        Add Expense
                    </Link>
                </nav> :
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="hover:text-sky-400 transition">
                            Home
                        </Link>
                    </nav>

                }
                

                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sky-800 hover:text-sky-500 transition cursor-pointer"
                >
                    <CircleUserRound size={30} />
                </button>


            </div>
                
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}<div
                className={`fixed top-0 right-0 min-h-80 w-80 bg-white shadow-2xl z-50
                transform transition-transform duration-300 cursor-pointer
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-xl font-bold text-sky-800">
                        My Profile
                    </h2>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">

                    <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                            <CircleUserRound size={48} className="text-sky-700" />
                        </div>
                    </div>

                    <div className="space-y-5">

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <UserRound className="text-sky-700" size={22} />

                            <div className="overflow-hidden">
                                <p className="text-xs text-gray-500">
                                    Full Name
                                </p>
                                <p className="font-semibold text-gray-800 truncate">
                                    {getname || 'User Name'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="text-sky-700" size={22} />

                            <div className="overflow-hidden">
                                <p className="text-xs text-gray-500">
                                    Email Address
                                </p>
                                <p className="font-semibold text-gray-800 truncate">
                                    {getemail || 'User Email'}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
