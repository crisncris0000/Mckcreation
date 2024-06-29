import React from 'react'
import HomeImage from '../assets/home-image.jpg'
import sample1 from '../assets/sample1.png'
import sample2 from '../assets/sample2.png'
import sample3 from '../assets/sample3.png'
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import { Link } from 'react-router-dom'
import useCheckScreenSize from '../hooks/useCheckScreenSize'

const Hero = () => {

  const isTablet = useCheckScreenSize(1366)

  return (
    <section>
        <div className='w-full flex justify-around flex-wrap'>
          <img src={HomeImage} className='h-imageSize w-full' alt='Image by FreePik'/>

          <div className='absolute h-boxHeight w-full flex justify-center flex-wrap'>
            <img src={sample1} className='h-boxHeight w-homeImageWidth blur-sm' />
            {!isTablet ?
              <>
                <img src={sample2} className='h-boxHeight w-homeImageWidth blur-sm'/>
                <img src={sample3} className='h-boxHeight w-homeImageWidth blur-sm'/>
              </>
            : ''}

          </div>
          
          <div className='absolute m-auto h-96 w-full text-center flex flex-col items-center justify-center'>
            <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold text-white bg-black bg-opacity-20 px-6 py-4 rounded-md shadow-lg'>
              Carols Crafts
            </h1>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-black bg-opacity-20 px-4 py-2 mt-4 rounded-md shadow-md'>
              Created with love and care
            </h3>
          </div>

          <div className='absolute mt-80 flex items-center justify-around w-48'>
            <a href='https://www.facebook.com/vanesso6' target='_blank'>
              <img src={facebook} className='h-16 w-16'/>
            </a>
            <a href='https://www.instagram.com/mckcarcreations/' target='_blank'>
              <img src={instagram} className='h-20 w-20'/>
            </a>
          </div>

          <div className='absolute mt-128'>
              <Link to='/shop'>
                <button className='border border-black p-5 bg-pink-300 active:bg-pink-400'>
                  Shop Now!
                </button>
              </Link>
          </div>

        </div>
    </section>
  )
}

export default Hero
