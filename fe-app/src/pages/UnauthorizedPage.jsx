import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
      <p className="text-lg mb-6">You don't have permission to access this page.</p>
      <button 
        onClick={() => navigate(-1)} 
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default UnauthorizedPage;