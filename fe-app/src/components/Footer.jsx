import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'

const Footer = () => {
    return (
        <footer className="text-black py-8 hover:bg-pink-400 hover:border-black transition: duration-500">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold">Carols Crafts</h2>
              <p className="text-sm">Created with love and care</p>
              <p className="text-sm">© 2024 Carols Crafts. All rights reserved.</p>
            </div>
    
            {/* Navigation Links */}
            <div className="mb-4 md:mb-0">
              <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/shop" className="hover:underline">Shop</Link>
                <Link to="/portfolio" className="hover:underline">Portfolio</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </nav>
            </div>
    
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com/vanesso6" target='_blank' className="text-gray-400 hover:text-white">
                <img src={facebook} className='w-12 h-12 mt-2'></img>
              </Link>
              <Link to="https://www.instagram.com/mckcarcreations/" target='_blank' className="text-gray-400 hover:text-white">
                <img src={instagram} className='w-16 h-16'></img>
              </Link>
            </div>
          </div>
        </footer>
      )    
}

export default Footer