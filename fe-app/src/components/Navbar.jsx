import React, { useState } from 'react'
import logo from '../assets/mckcreation.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className='flex justify-between items-center text-black py-6 px-8 md:px-32 bg-pink-200 drop-shadow-md relative z-50'>
        <Link to='/'>
          <img src={logo} className='h-28 w-28 m-auto hover:scale-105 transition-all' alt="Logo" />
        </Link>

        <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
          
          <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer'>
            <Link to='/'>
              Home
            </Link>
          </li>

          <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer'>
            <Link to='/shop'>
              Shop
            </Link>
          </li>

          <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer'>
            <Link to='#'>
              Portfolio
            </Link>
          </li>

          <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer'>
            <Link to='/contact'>
              Contact
            </Link>
          </li>

          <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer'>
            <Link to='/account/login'>
              Login
            </Link>
          </li>

        </ul>

        <i className='bx bx-menu xl:hidden block text-5xl cursor-pointer'
          onClick={() => setIsMenuOpen(!isMenuOpen)}></i>

        <div
          className={`absolute xl:hidden top-32 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg
          transition-transform transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'} z-50`}
          style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
        >
          <Link to='/'
          className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
            Home
          </Link>

          <Link to='/shop'
          className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
            Shop
          </Link>

          <Link to='#'
          className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
            Portfolio
          </Link>

          <Link to='/contact'
          className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
            Contact
          </Link>
          
          <Link to='/account/login' 
          className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
            Login
          </Link>
        </div>
      </header>
    </>
  )
}

export default Navbar
