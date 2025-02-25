import React from 'react';

const VerificationCode = ({ handleVerify, code, setCode, error, errorMessage }) => {

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-xl w-96 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-700">Verify Your Code</h2>
      <input
        type="text"
        value={code}
        onChange={handleChange}
        maxLength="6"
        placeholder="Enter 6-digit code"
        className="border p-3 rounded-lg text-center text-lg tracking-widest w-full outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 w-full"
      >
        Verify
      </button>
      {error && <p className="text-red-500 text-lg">{errorMessage}</p>}
    </div>
  );
};

export default VerificationCode;