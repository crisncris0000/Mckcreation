import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '../message/Message';
import { jwtDecode } from 'jwt-decode';

const UpdateItemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || null; // Ensure `data` is not null

  // Redirect if accessed directly
  useEffect(() => {
    if (!data) {
      navigate('/shop'); // Redirect to shop if no data
    }
  }, [data, navigate]);

  const [title, setTitle] = useState(data?.title || '');
  const [price, setPrice] = useState(data?.price || '');
  const [imageData, setImageData] = useState(data?.imageData || '');
  const [mimeType, setMimeType] = useState(data?.mimeType || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (!jwt) {
      navigate('account/login');
      return;
    }

    try {
      const user = jwtDecode(jwt);
      if (user.role !== 'ADMIN') {
        navigate('/unauthorized');
      }
    } catch (error) {
      console.error('Invalid JWT:', error);
      navigate('/login');
    }

    fetch('http://localhost:8080/api/category/get-all')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, [jwt, navigate]);

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
      const res = await fetch(`http://localhost:8080/api/item/update/${data.id}`, {
        method: 'PUT',
        body: formData
      });

      if (res.status === 200) {
        setIsError(false);
        setMessage('Item updated successfully');
        setIsVisible(true);
        setTimeout(() => navigate('/shop'), 1000);
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

  if (!data) return null; // Prevent rendering if no data

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
          <option value="">Choose category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        
        <label className="block text-gray-700 font-medium mb-2 mt-4">Upload New Image (optional)</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        
        <Message isError={isError} isVisible={isVisible} setIsVisible={setIsVisible} message={message} />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
