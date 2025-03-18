import React, { useState } from 'react';
import Modal from '../Modal';

const ShoppingCart = ({ orders, user }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (e, orderID) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/order/delete/${orderID}/${user.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{order.productName}</h2>
              <p className="text-gray-700 mb-3">Price: ${order.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mb-4">Order ID: {order.id}</p>

              {/* Buttons side by side */}
              <div className="mt-auto flex gap-3">
                <button
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-100 transition-colors duration-300"
                  onClick={(e) => handleDelete(e, order.id)}
                >
                  Remove Order
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                  onClick={() => setOpen(true)}
                >
                  View Customization
                </button>
              </div>

              <Modal open={open} onClose={() => setOpen(false)}>
                <h1 className="text-xl border-b border-gray-200 pb-3 mb-4 text-gray-800">
                  Customization you've chosen
                </h1>
                <p className="text-gray-700">{order.customization}</p>
              </Modal>
            </div>
          ))}
        </div>
      )}
      {orders.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md 
            hover:bg-blue-700 transition duration-300 text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
