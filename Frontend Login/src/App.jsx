import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
    <Header/>
    <Routes>
      <Route element={<ProtectedRoute/>}>

    <Route path='/'
    element={<HomePage/>}
    />
    </Route>
    <Route path='/auth/signup'
    element={<SignupPage/>}
    />
    <Route path='/auth/login'
    element={<LoginPage/>}
    />
  </Routes>
    </AuthProvider>
  )
}

export default App