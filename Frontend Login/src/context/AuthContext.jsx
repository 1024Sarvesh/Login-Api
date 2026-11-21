import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCookie } from '../utils/getcookie';


export const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)


function AuthProvider({ children }) {


  const [isLogin, setIsLogin] = useState(getCookie("token") ? true : false);
  const [user, setUser] = useState(
    getCookie("token")
      ? { name: getCookie("name"), email: getCookie("email") }
      : null,
  );



  const logout = () => {
  document.cookie = "token=; max-age=0; path=/";
  document.cookie = "name=; max-age=0; path=/";
  document.cookie = "email=; max-age=0; path=/";

  setIsLogin(false);
  setUser(null);
};

useEffect(()=>{
   const token = getCookie("token");

  if (!token) return;

  try {
     const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))

      const expiryTime = payload.exp * 1000;
    const remainingTime = expiryTime - Date.now();

    if (remainingTime <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, remainingTime);

    return () => clearTimeout(timer);
    
  } catch (error) {
      logout();
  }
},[isLogin])


  

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider