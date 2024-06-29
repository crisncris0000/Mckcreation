import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <nav className='
    flex m-auto items-center justify-around 
    w-full h-20 text-xl border border-transparent
  hover:bg-pink-400 hover:border-black transition: duration-500'
  >
    <Link to="/" className='hover:underline active:text-red-500'>Sales</Link>
    <Link to="/shop" className='hover:underline active:text-red-500'>Users</Link>
    <Link to="#" className='hover:underline active:text-red-500'>Orders</Link>
  </nav>
  )
}

export default AdminMenu
