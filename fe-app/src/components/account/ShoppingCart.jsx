// ShoppingCart.js
import React, { useEffect, useState } from 'react';

const ShoppingCart = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders (replace with your actual API endpoint)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders'); // Replace with actual API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-lg flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{order.productName}</h2>
              <p className="text-gray-700 mb-2">Quantity: {order.quantity}</p>
              <p className="text-gray-700 mb-2">Price: ${order.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
