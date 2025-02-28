import React from 'react'

const UsersTable = ({ users, onPrevious, onNext }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 text-gray-600 font-medium">Name</th>
            <th className="py-3 text-gray-600 font-medium">Email</th>
            <th className="py-3 text-gray-600 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <td className="py-3 text-gray-700">{user.name}</td>
              <td className="py-3 text-gray-700">{user.email}</td>
              <td className="py-3 text-gray-700">{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersTable;