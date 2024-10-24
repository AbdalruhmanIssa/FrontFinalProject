import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
