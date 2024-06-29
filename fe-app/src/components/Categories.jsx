import React from 'react';
import tShirt from '../assets/t-shirt.png';
import cups from '../assets/cups.png';
import cakeTopper from '../assets/cake-topper.png';
import trays from '../assets/trays.png';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = 'p-5 flex justify-center items-center relative';

  return (
    <div className='flex justify-center border border-solid border-black p-10 w-full'>
      <h1 className='absolute text-4xl m-auto h-20'>
        What are you looking for?
      </h1>
      
      <div className='flex flex-wrap justify-center w-3/4 mt-32'>
        <div className={categories}>
          <Link 
            className='absolute text-4xl text-white z-10 font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md shadow-lg'
            to='/shop/custom-topper'
            >
            Cake Toppers
          </Link>
          <img src={cakeTopper} className='h-96 w-96 blur-sm' />
        </div>

        <div className={categories}>
          <Link 
            className='absolute text-4xl text-white z-10 font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md shadow-lg'
            to='/shop/custom-shirt'
          >
            T-shirts
          </Link>
          <img src={tShirt} className='h-96 w-96 blur-sm' />
        </div>

        <div className={categories}>
          <Link 
            className='absolute text-4xl text-white z-10 font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md shadow-lg'
            to='/shop/custom-cup'
          >
            Cups
          </Link>
          <img src={cups} className='h-96 w-96 blur-sm' />
        </div>

        <div className={categories}>
          <Link 
            className='absolute text-4xl text-white z-10 font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md shadow-lg'
            to='/shop/custom-tray'
          >
            Trays
          </Link>
          <img src={trays} className='h-96 w-96 blur-sm' />
        </div>
      </div>
    </div>
  );
}

export default Categories;