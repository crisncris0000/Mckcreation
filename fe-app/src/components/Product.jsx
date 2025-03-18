import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Product = ({ item }) => {

  const nav = new useNavigate();
  const jwt = localStorage.getItem('jwt');
  const [user, setUser] = useState('');

  useEffect(() => {
    if(jwt) {
      setUser(jwtDecode(jwt))
    } else {
      setUser('')
    }
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/item/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Item with id ${id} deleted successfully`);
          window.location.reload()
        } else {
          console.error('Failed to delete the item');
        }
      })
      .catch((error) => console.error('Error:', error));

      if(jwt) {
        setUser(jwtDecode(jwt));
      }
  };

  const handleEdit = () => {
    console.log(item)
    nav('/shop/item/update-form', {state: item})
  }

  return (
    <div
      key={item.id}
      className="rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105"
    >
      <img
        src={`data:${item.mimeType};base64,${item.imageData}`}
        alt={item.title}
        className="h-64 w-full object-cover rounded-t-md"
      />
      <div className="mt-5">
        <h1 className="text-xl font-bold">{item.title}</h1>
        <p className="text-gray-700 mt-2">${item.price}</p>
      </div>
      
      <Link to="/shop/custom-form" state={item}>
        <button
          className="mt-5 bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition-colors w-full"
        >
          Add to cart
        </button>
      </Link>

      {jwt && user.role === 'ADMIN' ?
        <button
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
          onClick={handleEdit}
        >
          Edit
        </button>
        :
        null
      }

      {jwt && user.role === 'ADMIN' ?
        <button
          className="mt-5 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors w-full"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button> 
        :
        null
      }
    </div>
  );
};

export default Product;
