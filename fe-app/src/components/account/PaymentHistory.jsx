import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const jwt = localStorage.getItem('jwt');
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
    } else {
      const user = jwtDecode(jwt);
      setFirstName(user.firstName);
      setLastName(user.lastName);

      // Mock payment data
      setPayments([
        {
          id: 1,
          date: '2024-09-28',
          status: 'Delivered',
          items: ['Product 1', 'Product 2'],
        },
        {
          id: 2,
          date: '2024-09-20',
          status: 'Pending',
          items: ['Product 3'],
        },
        {
          id: 3,
          date: '2024-09-15',
          status: 'Refunded',
          items: ['Product 4', 'Product 5'],
        },
      ]);
    }
  }, [jwt, nav]);

  const handleOrderDetails = (items) => {
    alert(`Order details:\n${items.join(', ')}`);
  };

  const handleRefund = (id) => {
    alert(`Refund initiated for Order #${id}`);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Payment History for {firstName} {lastName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">Date</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Status</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Order Details</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="py-2 px-4">{payment.date}</td>
                <td className="py-2 px-4">{payment.status}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleOrderDetails(payment.items)}
                  >
                    View Details
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`${
                      payment.status === 'Refunded'
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-700'
                    } text-white px-4 py-1 rounded`}
                    onClick={() => handleRefund(payment.id)}
                    disabled={payment.status === 'Refunded'}
                  >
                    {payment.status === 'Refunded' ? 'Refunded' : 'Refund'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
