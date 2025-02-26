import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
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
                <Link to="/shop/item/form">
                    <IoIosAdd className='h-32 w-32 fixed right-16 bottom-28'/>
                </Link>
            : null}
        </div>
    );
}

export default Products;