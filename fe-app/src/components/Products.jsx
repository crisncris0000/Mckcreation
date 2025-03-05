import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Product from './Product';
import { jwtDecode } from 'jwt-decode';


const Products = () => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState('')

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        fetch('http://localhost:8080/api/item/get-all')
        .then((response) => {
            return response.json()
        }).then((data) => {
            setItems(data)
        })

        if(jwt) {
            setUser(jwtDecode(jwt))
        }
    }, []);

    return (
        <div className='flex justify-center mt-24 mb-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {items && items.length > 0 ? (
                    items.map((item) => (
                        <Product key={item.id} item={item} />
                    ))
                ) : (
                    <p className='text-center col-span-full'>No products available</p>
                )}
            </div>
            
            {jwt && user.role === 'ADMIN' ?
            <Link to={"/shop/item/form"}>
                <button
                    className="fixed bottom-8 right-8 bg-pink-500 text-white p-5 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-110"
                >
                    <FaPlus size={28} />
                </button> 
            </Link>: null
            
        }
        </div>
    );
}

export default Products;