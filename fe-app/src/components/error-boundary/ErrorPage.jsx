import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100 p-4">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-red-700 mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-yellow-800 mb-6">
          We're sorry, but an unexpected error has occurred. Please try again later.
        </p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
