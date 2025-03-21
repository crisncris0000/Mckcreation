import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../assets/mckcreation.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const jwt = localStorage.getItem('jwt');

  return (
    <>
      <header className="flex justify-between items-center bg-pink-200 px-6 md:px-20 py-4 shadow-md relative z-50">
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="h-20 w-20 md:h-24 md:w-24 hover:scale-105 transition-transform" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-10 text-lg font-medium">
          <NavLink to="/" text="Home" />
          <NavLink to="/shop" text="Shop" />
          <NavLink to="/portfolio" text="Portfolio" />
          <NavLink to="/contact" text="Contact" />

          {jwt ? (
            <NavLink to="/account/settings" text="Account" />
          ) : (
            <NavLink to="/account/login" text="Login" />
          )}

          {jwt && (
            <Link to="/account/cart" className="text-2xl hover:text-sky-500 transition-all">
              <FaShoppingCart />
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="xl:hidden text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <RxHamburgerMenu />
        </button>

        {/* Mobile Dropdown Menu - Fixed z-index */}
        {isMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 gap-4 text-lg font-medium xl:hidden z-[999] transition-all duration-300"
          >
            <NavLink to="/" text="Home" onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/shop" text="Shop" onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/portfolio" text="Portfolio" onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/contact" text="Contact" onClick={() => setIsMenuOpen(false)} />
            
            {jwt ? (
              <NavLink to="/account/settings" text="Account" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <NavLink to="/account/login" text="Login" onClick={() => setIsMenuOpen(false)} />
            )}

            {jwt && (
              <Link to="/account/cart" className="text-2xl hover:text-sky-500 transition-all" onClick={() => setIsMenuOpen(false)}>
                <FaShoppingCart />
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

// Reusable NavLink Component for Clean Code
const NavLink = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative px-4 py-2 hover:text-sky-500 transition-all after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-sky-500 after:transition-all hover:after:w-full"
  >
    {text}
  </Link>
);

export default Navbar;
