import React from 'react';
import { Link } from 'react-router-dom';

const CreateOrderForm = ({ handleOnSubmit, customization, setCustomization }) => {

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-32 mb-32">
      <h2 className="text-xl font-semibold mb-4">Customize Your Item</h2>
      <form onSubmit={handleOnSubmit}>
        <label className="block text-gray-700 mb-2">Personalization:</label>
        <textarea 
          type="text"
          required
          value={customization} 
          onChange={(e) => setCustomization(e.target.value)} 
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter something you would like for example if you chose a shirt write ur size, or if you want a specific color or image added to something please specify"
        />
        <button 
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
        <Link to="/shop">
          <button 
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CreateOrderForm;
