import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <Routes>
    <Route path='/'
    element={<HomePage/>}
    />
    <Route path='/auth/signup'
    element={<SignupPage/>}
    />
  </Routes>
  )
}

export default App