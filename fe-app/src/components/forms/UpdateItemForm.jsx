import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '../message/Message';
import { jwtDecode } from 'jwt-decode';

const UpdateItemForm = () => {
  const location = useLocation();
  const nav = useNavigate();
  const data = location.state || null;

  // Redirect if accessed directly
  useEffect(() => {
    if (!data) {
      nav('/shop');
    }
  }, [data, nav]);

  const [title, setTitle] = useState(data?.title || '');
  const [price, setPrice] = useState(data?.price || '');
  const [imageData, setImageData] = useState(data?.imageData || '');
  const [mimeType, setMimeType] = useState(data?.mimeType || '');
  const [selectedCategory, setSelectedCategory] = useState(location.state.category.name);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
      return;
    }

    const checkUserRole = async () => {
      if (!jwt) {
        nav('/account/login');
        return;
      }

      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);

      if (decodedUser.role !== 'ROLE_ADMIN') {
        nav('/forbidden');
      }
    };

    checkUserRole()

    try {
      const user = jwtDecode(jwt);
      if (user.role !== 'ROLE_ADMIN') {
        nav('/unauthorized');
      }
    } catch (error) {
      console.error('Invalid JWT:', error);
      nav('/login');
    }

    fetch(`${API_BASE_URL}/api/category/get-all`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, [jwt, nav]);

  const handleFileChange = (e) => {
    setImageData(e.target.files[0]);
    setMimeType(e.target.files[0].type);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('selectedCategory', selectedCategory);
    
    if (imageData instanceof File) {
      formData.append('imageData', imageData);
    }
    
    formData.append('mimeType', mimeType);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/item/update/${data.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
        body: formData
      });

      if (res.status === 200) {
        setIsError(false);
        setMessage('Item updated successfully');
        setIsVisible(true);
        setTimeout(() => nav('/shop'), 1000);
      } else {
        setIsError(true);
        setMessage('Error updating item');
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Request failed:', error);
      setMessage('Internal server error, please try again later');
      setIsVisible(true);
      setIsError(true);
    }
  };

  if (!data) return null;

  return (
    <div className="flex flex-row justify-center mt-20 mb-20">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Item</h2>
        
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md" />
        
        <label className="block text-gray-700 font-medium mb-2 mt-4">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded-md" />
        
        <label className="block text-gray-700 font-medium mb-2 mt-4">Select Category</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-md">
          <option value={selectedCategory}>Choose category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        
        <label className="block text-gray-700 font-medium mb-2 mt-4">Upload New Image (optional)</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        
        <Message isError={isError} isVisible={isVisible} setIsVisible={setIsVisible} message={message} />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Update Item</button>
        <button type="button" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4" onClick={() => nav("/shop")}>Go Back</button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
