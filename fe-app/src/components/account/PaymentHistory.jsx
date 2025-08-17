import React, { useState } from 'react';
import Modal from '../Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentHistory = ({ payments, firstName, lastName }) => {
  const [openModalId, setOpenModalId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFiltering, setIsFiltering] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const parseOrderDetails = (orderDetails) => {
    try {
      if (!orderDetails) return [];
      return orderDetails
        .slice(1, -1)
        .split(/\),\s*/)
        .map(item => {
          const props = item.replace(/^OrderDTO\(/, '').split(/,\s*/);
          const obj = {};
          props.forEach(prop => {
            const [key, value] = prop.split('=');
            obj[key] = value;
          });
          return obj;
        });
    } catch (error) {
      console.error('Error parsing order details:', error);
      return [];
    }
  };

  // ✅ Filtered or full payments
  const filteredPayments = isFiltering
    ? payments.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startDate && paymentDate <= endDate;
      })
    : payments;

  // ✅ Paginate payments
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to first page whenever filter toggles or dates change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [isFiltering, startDate, endDate]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Payment History for {firstName} {lastName}
      </h2>

      {/* Date range filters */}
      <div className="flex gap-4 mb-6 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border border-gray-300 rounded-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border border-gray-300 rounded-md p-2 w-40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        {/* Filter & Show All */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setIsFiltering(true)}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          >
            Filter
          </button>
          <button
            onClick={() => setIsFiltering(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Show All
          </button>
        </div>
      </div>

      {/* Payment table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">Date</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Status</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Order Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment) => {
              const parsedItems = parseOrderDetails(payment.orderDetails);
              const total = parsedItems.reduce(
                (sum, item) => sum + parseFloat(item.price || 0),
                0
              );

              return (
                <tr key={payment.id} className="border-t">
                  <td className="py-2 px-4">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{payment.status}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors"
                      onClick={() => setOpenModalId(payment.id)}
                    >
                      View Details
                    </button>
                    <Modal open={openModalId === payment.id} onClose={() => setOpenModalId(null)}>
                      <div className="max-w-md">
                        <h1 className="text-xl border-b border-gray-200 pb-3 mb-4">
                          Order ID {payment.id} Details
                        </h1>
                        <ul className="space-y-3 mb-4">
                          {parsedItems.map((item, index) => (
                            <li key={index} className="pb-2 border-b border-gray-200">
                              <div className="font-semibold">{item.itemTitle}</div>
                              <div className="text-sm text-gray-600">
                                Customization: {item.customization || 'None'}
                              </div>
                              <div className="text-sm text-gray-600">
                                Price: ${parseFloat(item.price || 0).toFixed(2)}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="font-bold border-t border-gray-200 pt-3">
                          Total: ${total.toFixed(2)}
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;