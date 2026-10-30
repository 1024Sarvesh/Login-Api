import React, { createContext, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../App'



function LoginPage() { 

  const Navigate = useNavigate()
  const {isLogin,setIsLogin} = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const HandleSubmit =async(e)=>{
e.preventDefault()
try {
  const res = await fetch("http://127.0.0.1:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log(data);
      setUser(data);
      setEmail("");
      setPassword("");
      if(!res.ok){
        return setIsLogin(false)
      }else{
        return setIsLogin(true)
      }
} catch (error) {
  console.log(error)
}
}


  return (
    <>

      <Link className='ml-10' to={"/"}>Back to Home</Link>
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-xl bg-white border shadow-2xs mt-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login Form
          </h2>
          <form onSubmit={HandleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className='flex justify-around'>

              <button
                type="reset"
                className="w-30 shadow-2xs bg-white-500 border-1 cursor-pointer text-black py-2 rounded-lg font-semibold"
              >
                Reset
              </button>
              <button
              onClick={()=>{
                return Navigate("/expense/create")
              }}
                type="submit"
                className="w-30 shadow-2xs bg-white-500 border-1 cursor-pointer text-black py-2 rounded-lg font-semibold"
              >
                Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage