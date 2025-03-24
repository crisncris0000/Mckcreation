import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import Product from './Product';
import { jwtDecode } from 'jwt-decode';

const Products = () => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    console.log(items)

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        fetch('http://localhost:8080/api/item/get-all')
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((error) => console.log(error));

        fetch(`http://localhost:8080/api/category/get-all`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((error) => console.log(error))

        if(jwt) {
            setUser(jwtDecode(jwt));
        }
    }, []);

    const filteredItems = selectedCategory === "All" ? items : items.filter(item => item.category.name === selectedCategory);

    return (
        <div className='flex flex-col items-center'>
            {/* Category Submenu */}
            <div className='flex space-x-4 mb-6 bg-pink-200 p-3 rounded-lg shadow-lg'>
                {categories.map((category) => (
                    <button 
                        key={category.id} 
                        className={`px-4 py-2 rounded-full text-lg font-semibold transition-all ${selectedCategory === category.name ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 hover:bg-pink-300'}`} 
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            
            
            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <Product key={item.id} item={item} />
                    ))
                ) : (
                    <p className='text-center col-span-full'>No products available</p>
                )}
            </div>
            
            {/* Add Product Button (Admin Only) */}
            {jwt && user.role === 'ADMIN' && (
                <Link to={"/shop/item/form"}>
                    <button
                        className="fixed bottom-8 right-8 bg-pink-500 text-white p-5 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-110"
                    >
                        <FaPlus size={28} />
                    </button> 
                </Link>
            )}
        </div>
    );
}

export default Products;
