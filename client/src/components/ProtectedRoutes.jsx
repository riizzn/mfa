import React from 'react'
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const isLoggedIn=true
  return (
    isLoggedIn? <Outlet/>: <Navigate to="/login"/>
    
  )
}

export default ProtectedRoutes