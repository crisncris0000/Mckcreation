import React, { useState, useEffect} from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import Message from '../message/Message';
import { Link } from 'react-router-dom';

const ItemForm = () => {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageData, setImageData] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [isError, setIsError] = useState(true);
  const [categoryError, setCategoryError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/category/get-all`)
      .then(res => {
        return res.json()
      }).then(data => {
        const filteredData = data.filter((category)=> {
          return category.name !== 'All'
        })
        setCategories(filteredData)
      })
      .catch(error => {
        console.log(error)
      })

  }, [categories, setCategories])

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if(selectedCategory === '') {
      setCategoryError(true);
      return
    }

    const formData = new FormData()

    formData.append('title', title)
    formData.append('imageData', imageData)
    formData.append('mimeType', mimeType)
    formData.append('price', price)
    formData.append('selectedCategory', selectedCategory)

    try{
      const res = await fetch("http://localhost:8080/api/item/create", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: formData
      })

      if(res.status == 200) {
        setIsError(false)
        setMessage('Created item successfully')
        setIsVisible(true)
      } else {
        setIsError(true)
        setMessage('Error creating item')
        setIsVisible(true)
      }

    } catch(error) {
      console.log(error)
      setMessage('Internal server error, please try again later')
      setIsVisible(true)
      setIsError(false)
    }
  }

  const handleFileChange = (e) => {
    setImageData(e.target.files[0])
    setMimeType(e.target.files[0].type)
  }

  return (
    <div className="flex flex-row justify-center gap-10 flex-wrap mt-20 mb-20">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Item</h2>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Image:
          </label>
          <input
            required
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      <div className="relative inline-block w-full space-y-4">

        <div className="relative">
          <label htmlFor="dropdown" className="block text-gray-700 font-medium mb-2">
            Select Category
          </label>
          <select
            id="dropdown"
            className="block w-60 sm:w-60 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="N/A">Category</option>
            {categories ? categories.map((category) => (
              <option value={category.name} key={category.id}>{category.name}</option>
            )) : ''}
          </select>
          <MdKeyboardArrowDown className='absolute top-11 left-52'/>
        </div>
        
        {categoryError ? <p className='text-sm text-red-600'>Please select a category</p> : null }
        
        <Message isError={isError} isVisible={isVisible} setIsVisible={setIsVisible} message={message}/>
      </div>



        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2 mt-2"
          >
            Price:
          </label>
          <input
            required
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Item
        </button>
        
        <Link to="/shop">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
          >
            Go back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ItemForm;