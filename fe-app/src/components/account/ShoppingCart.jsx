import React, { useMemo, useState } from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";

const ShoppingCart = ({ orders, jwt }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = async (e, orderID) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/api/order/delete/${orderID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt}` },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const total = useMemo(
    () => orders.reduce((sum, o) => sum + o.price, 0),
    [orders]
  );

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
              <p className="text-gray-700 mb-3">{order.itemTitle}</p>
              <p className="text-gray-700 mb-5">Price: ${order.price.toFixed(2)}</p>

              <div className="mt-auto flex gap-3">
                <button
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-100 transition-colors duration-300"
                  onClick={(e) => handleDelete(e, order.id)}
                >
                  Remove Order
                </button>

                <button
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Customization
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        <h1 className="text-xl border-b border-gray-200 pb-3 mb-4 text-gray-800">
          Customization you've chosen
        </h1>
        <p className="text-gray-700">{selectedOrder?.customization}</p>
      </Modal>

      {orders.length > 0 && (
        <div className="flex justify-around items-center mt-10">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>

          <Link
            to="/account/cart/checkout"
            state={{ total, orders }}
          >
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
