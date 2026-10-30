import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './header/Header'
import ProtectedRoute from './pages/ProtectedRoute'
import ExpensePage from './pages/ExpensePage'


export const AuthContext = createContext()
function App() {

  const [isLogin,setIsLogin] = useState(false)

  return (
    <>
    <AuthContext.Provider value={{isLogin,setIsLogin}}>
    <Header/>
    <Routes>
      <Route element={<ProtectedRoute/>}>

      <Route path='/expense/create'
      element={<ExpensePage/>}/>
      </Route>
      <Route
          path="/"
          element={<HomePage />}
          />
      <Route
          path="/auth/signup"
          element={<SignupPage />}
          />
      <Route
          path="/auth/login"
          element={<LoginPage />}
          />
    </Routes>
          </AuthContext.Provider>
    </>
  )
}

export default App