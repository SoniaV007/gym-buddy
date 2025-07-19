import React from 'react'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      Welcome!
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout