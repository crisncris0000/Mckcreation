import React, { useState } from 'react';
import Product from '../Product';

const ItemForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0.0);
  const [file, setFile] = useState(null);

  const product = {
    title,
    price,
    file,
  };

  return (
    <div className="flex flex-row justify-center gap-10 flex-wrap mt-10">
      {/* Form Section */}
      <form
        onSubmit={null}
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
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
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
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
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
