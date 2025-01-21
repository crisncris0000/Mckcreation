import React, { useState, useEffect } from 'react';
import Product from '../Product';
import { MdKeyboardArrowDown } from "react-icons/md";
import Message from '../message/Message';


const ItemForm = () => {

  const [prevImg, setPrevImg] = useState(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);
  const [imageData, setImageData] = useState(null);
  const [mimeType, setMimeType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const product = {
    title,
    price,
    "file": prevImg,
  };

  useEffect(() => {

    fetch('http://localhost:8080/api/category/get-all')
      .then(res => {
        return res.json()
      }).then(data => {
        setCategories(data)
      })
      .catch(error => {
        console.log(error)
      })

  }, [categories, setCategories])

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', title)
    formData.append('imageData', imageData)
    formData.append('mimeType', mimeType)
    formData.append('price', price)
    formData.append('selectedCategory', selectedCategory)

    try{
      const res = await fetch("http://localhost:8080/api/item/create", {
        method: 'POST',
        body: formData
      })
    } catch(error) {
      setErrorMessage('Internal server error, please try again later')
      setIsVisible(true)
    }

  }

  const addNewCategory = async (e) => {
    
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8080/api/category/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'name': categoryName})
      })

      const jsonRes = await res.json()

      if(res.status != 200) {
        setIsVisible(true)
        setErrorMessage(jsonRes.message)
        return
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleFileChange = (e) => {
    setPrevImg(URL.createObjectURL(e.target.files[0]))
    setImageData(e.target.files[0])
    setMimeType(e.target.files[0].type)
  }

  return (
    <div className="flex flex-row justify-center gap-10 flex-wrap mt-20 mb-20">
      {/* Form Section */}
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

        <div>
          <label htmlFor="new-category" className="block text-gray-700 font-medium mb-2">
            Add New Category
          </label>
          <input
            type="text"
            id="new-category"
            name="new-category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <Message isError={true} isVisible={isVisible} setIsVisible={setIsVisible} message={errorMessage}/>

        <button
          className="block w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 mt-4"
          onClick={addNewCategory}
        >
          Add Category
        </button>
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
      </form>

      <div className="w-full max-w-sm p-6 rounded-lg shadow-md">
        <Product product={product} />
      </div>
    </div>
  );
};

export default ItemForm;