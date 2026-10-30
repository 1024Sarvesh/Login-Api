import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
    <>
    <header className='flex items-center justify-between px-10 border h-15'>
  <h1 className='text-2xl font-semibold'>Login Api</h1>
  <div className='flex gap-5'>
  <nav>About</nav>
  <nav>Check Users</nav>
  <nav>Contact me</nav>
  </div>

  <div className='rounded-xl flex gap-5'>
    <Link className='cursor-pointer text-center font-semibold bg-indigo-600 text-white px-4 py-2 rounded-xl' to={"/auth/login"}>Login</Link>
    <Link className='cursor-pointer text-center font-semibold bg-indigo-600 text-white px-4 py-2 rounded-xl' to={"/auth/signup"}>Signup</Link>
    </div>
 </header>
    </>
  )
}

export default Header