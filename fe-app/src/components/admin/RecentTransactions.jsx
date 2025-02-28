import React from 'react'

const RecentTransactions = ({recentTransactions}) => {
  return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-gray-600 font-medium">User</th>
              <th className="py-3 text-gray-600 font-medium">Amount</th>
              <th className="py-3 text-gray-600 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 text-gray-700">{transaction.user}</td>
                <td className="py-3 text-gray-700">${transaction.amount}</td>
                <td className="py-3 text-gray-700">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default RecentTransactions
