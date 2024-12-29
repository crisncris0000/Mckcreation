import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import Product from './Product';
import item from '../assets/product.png';


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fakeProducts = [
            { id: 1, title: 'Earrings', price: 18.99, file: item },
            { id: 2, title: 'Necklace', price: 25.99, file: item },
            { id: 3, title: 'Bracelet', price: 15.49, file: item },
            { id: 4, title: 'Ring', price: 12.99, file: item },
            { id: 5, title: 'Watch', price: 45.00, file: item },
            { id: 6, title: 'Sunglasses', price: 30.75, file: item }
        ];
        setProducts(fakeProducts);
    }, []);

    return (
        <div className='flex justify-center mt-24 mb-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Product product={product} />
                    ))
                ) : (
                    <p className='text-center col-span-full'>No products available</p>
                )}
            </div>
            
            <Link to="/shop/item/add">
                <IoIosAdd className='h-32 w-32 fixed right-16 bottom-28'/>
            </Link>
        </div>
    );
}

export default Products;
