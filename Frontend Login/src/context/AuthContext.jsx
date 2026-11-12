import React, { createContext, useContext, useState } from 'react'


export const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)


function AuthProvider({ children }) {


   const [isLogin, setIsLogin] = useState(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    return !!token;
  });

return (
  <AuthContext.Provider value={{ isLogin, setIsLogin }}>
    {children}
  </AuthContext.Provider>
)
}

export default AuthProvider