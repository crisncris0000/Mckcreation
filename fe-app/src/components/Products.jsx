import React, { useEffect, useState } from 'react';
import item from '../assets/product.png';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fakeProducts = [
            { id: 1, name: 'Earrings', price: 18.99 },
            { id: 2, name: 'Necklace', price: 25.99 },
            { id: 3, name: 'Bracelet', price: 15.49 },
            { id: 4, name: 'Ring', price: 12.99 },
            { id: 5, name: 'Watch', price: 45.00 },
            { id: 6, name: 'Sunglasses', price: 30.75 }
        ];
        setProducts(fakeProducts);
    }, []);

    return (
        <div className='flex justify-center mt-24 mb-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div 
                            key={product.id} 
                            className=' rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105'
                        >
                            <img 
                                src={item} 
                                alt={product.name} 
                                className='h-64 w-full object-cover rounded-t-md' 
                            />
                            <div className='mt-5'>
                                <h1 className='text-xl font-bold'>{product.name}</h1>
                                <p className='text-gray-700 mt-2'>${product.price.toFixed(2)}</p>
                            </div>
                            <button 
                                className='mt-5 bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition-colors w-full'
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-center col-span-full'>No products available</p>
                )}
            </div>
        </div>
    );
}

export default Products;
