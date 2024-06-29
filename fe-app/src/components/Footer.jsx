import React from 'react'

const Footer = () => {
    return (
        <footer className="text-black py-8 hover:bg-pink-400 hover:border-black transition: duration-500">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            {/* Company Info */}
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold">Carols Crafts</h2>
              <p className="text-sm">Created with love and care</p>
              <p className="text-sm">© 2024 Carols Crafts. All rights reserved.</p>
            </div>
    
            {/* Navigation Links */}
            <div className="mb-4 md:mb-0">
              <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
                <a href="/" className="hover:underline">Home</a>
                <a href="/shop" className="hover:underline">Shop</a>
                <a href="#" className="hover:underline">Projects</a>
                <a href="/contact" className="hover:underline">Contact</a>
              </nav>
            </div>
    
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </footer>
      )    
}

export default Footer