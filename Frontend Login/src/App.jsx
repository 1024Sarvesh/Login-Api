import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import AuthProvider from './context/AuthContext'
import Expense from './pages/Expense'
import ProtectedLayout from './components/ProtectedLayout'
import MainLayout from './components/MainLayout'
import AllUser from './pages/AllUser'
import AllExpenses from './pages/AllExpenses'
import UserById from './pages/UserById'
import ExpenseById from './pages/ExpenseById'

function App() {
  return (
    <AuthProvider>
      
      <Routes>
        <Route element={<ProtectedLayout/>}>
          <Route element={<MainLayout/>}>
                <Route path='/'element={<HomePage />}/>
                <Route path='/expense/create' element={<Expense />} />
                <Route path='/auth/allusers' element={<AllUser />} />
                <Route path='/expense/all' element={<AllExpenses/>}/>
                <Route path='/user/:id' element={<UserById/>}/>
                <Route path='/expense/:id' element={<ExpenseById/>}/>
                <Route path='/expense/update/:id' element={<Expense/>}/>
            </Route>
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