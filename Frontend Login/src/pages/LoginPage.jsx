
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router'
import { useAuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const {setIsLogin } = useAuthContext()

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const LoginData = {
      email,
      password,
    };

    try {

      const res = await fetch("http://127.0.0.1:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login Response:", data);

      alert("Login Successful!");

      document.cookie = `token=${data.token}; max-age=86400; path=/; SameSite=Lax`;

      setEmail("");
      setPassword("");
      setIsLogin(true);
      navigate("/");


    } catch (error) {
      console.error("Login Error:", error);

    }
  };

  return (
    <div className="flex items-center justify-center mt-[10%]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>



        <form onSubmit={HandleSubmit}>

          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Login Now !
          </button>

        </form>


      </div>
    </div>
  );
}

export default LoginPage;
