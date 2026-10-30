import React from 'react'
import { Route, Routes } from 'react-router'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './header/Header'

function App() {
  return (
    <>
    <Header/>
    <Routes>
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
    </>
  )
}

export default App