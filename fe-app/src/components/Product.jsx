import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div 
    key={product.id}
    className=' rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105'
>
    <img 
        src={product.file} 
        alt={product.title} 
        className='h-64 w-full object-cover rounded-t-md' 
    />
    <div className='mt-5'>
        <h1 className='text-xl font-bold'>{product.title}</h1>
        <p className='text-gray-700 mt-2'>${product.price}</p>
    </div>
    <button
        className='mt-5 bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition-colors w-full'
    >
        <Link to='/shop/item-form'>
            Add to Cart
        </Link>
    </button>
</div>
  )
}

export default Product
