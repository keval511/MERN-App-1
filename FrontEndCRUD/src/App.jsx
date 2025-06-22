
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import { useState } from 'react'
import RefreshHandler from './Pages/RefreshHandler'

function App() {
  const [isAuthentication, setIsAuthentication] = useState(false)
  const PrivateRoute = ({ element }) => {
    return isAuthentication ? element : <Navigate to='/login' />
  }
  return (
    <>
      <RefreshHandler setIsAuthentication={setIsAuthentication} />

      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  )
}

export default App
