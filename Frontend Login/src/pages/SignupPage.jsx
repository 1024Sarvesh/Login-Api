import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

function SignupPage() {
const Navigate = useNavigate()

  const [signup, setSignup] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://127.0.0.1:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender
        }),
      });

      const data = await res.json();

      console.log(data.user);
      setSignup(data);
      setName("");
      setEmail("");
      setPassword("");
      setGender("");
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <>

          <Link className='ml-10' to={"/"}>Back to Home</Link>
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-xl bg-white border shadow-2xs mt-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Registration Form
          </h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your fullname"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select value={gender} onChange={(e) => {
                setGender(e.target.value)
              }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
                return Navigate("/")
              }}
                type="submit"
                className="w-30 shadow-2xs bg-white-500 border-1 cursor-pointer text-black py-2 rounded-lg font-semibold"
                
              >
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignupPage