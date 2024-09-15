import React, { useEffect, useState } from 'react'
import logo from '../assets/mckcreation.png'
import { Link } from 'react-router-dom'
import useCheckScreenSize from '../hooks/useCheckScreenSize'
import DropDownProfile from './DropDownProfile'

const Navbar = () => {
  const isTabletSize = useCheckScreenSize()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    if(jwt !== null) {
      setIsLoggedIn(true)
    } else if(jwt === null) {
      setIsLoggedIn(false)
    }
  }, [])


  return (
    <>
      <img src={logo} className='h-28 w-28 m-auto'/>
      <nav className='
        flex m-auto items-center justify-around 
        w-full h-20 text-xl border border-transparent
      hover:bg-pink-400 hover:border-black transition: duration-500'
      >
        <Link to="/" className='hover:underline active:text-red-500'>Home</Link>
        <Link to="/shop" className='hover:underline active:text-red-500'>Shop</Link>
        <Link to="#" className='hover:underline active:text-red-500'>Portfolio</Link>
        <Link to="/contact" className='hover:underline active:text-red-500'>Contact</Link>
        {!isLoggedIn ?
        <Link to='/account' className='hover:underline active:text-red-500'>Login</Link>
        :
        null
        }
        {isLoggedIn ? <DropDownProfile /> : null}
      </nav>
    </>
  )
}

export default Navbar
