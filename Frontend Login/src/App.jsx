import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './context/AuthContext'
import Expense from './pages/Expense'

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/'
            element={<HomePage />}
            />
          <Route path='/expense/create' element={<Expense />} />

        </Route>
        <Route path='/auth/signup'
          element={<SignupPage />}
        />
        <Route path='/auth/login'
          element={<LoginPage />}
        />
      </Routes>
    </AuthProvider>
  )
}

export default App