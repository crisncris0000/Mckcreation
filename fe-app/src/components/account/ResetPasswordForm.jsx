import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordForm = ({email, setEmail, error, errorMessage, handleEmailSubmit}) => {

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
          Reset Password
        </h2>
        <p className="mb-4 text-center text-gray-500">
          Enter your email to receive a verification code.
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-lg">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            Send Verification Code
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/account/login" className="text-indigo-600 hover:underline">Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;