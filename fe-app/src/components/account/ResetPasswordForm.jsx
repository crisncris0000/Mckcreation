import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';

const ResetPasswordForm = ({ 
  email, setEmail, 
  error, setError,
  errorMessage, setErrorMessage,
  handleEmailSubmit, 
  isResettingPassword,
  isLoading, setIsLoading
}) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const nav = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true)
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true)

    try{
      const res = await fetch(`http://localhost:8080/api/user/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        }),
      })

      if(res.status == 200) {
        nav('/account/login')
      }

    } catch(error) {
      setError(true)
      setErrorMessage('Internal server error')
    } finally {
      setIsLoading(false)
    }


  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {!isResettingPassword ? (
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
            <div className="flex justify-center">
              {!isLoading ?
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
              >
                Send Verification Code
              </button>
              :
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#d614e0', '#bf60c4', '#5140a8', '#271e54']}
              />
              }
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/account/login" className="text-indigo-600 hover:underline">Go back</Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
            Set New Password
          </h2>
          <p className="mb-4 text-center text-gray-500">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-lg">{errorMessage}</p>}
            
            <div className="flex justify-center">
              {!isLoading ?
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700"
              >
                Reset Password
              </button>
              :
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#d614e0', '#bf60c4', '#5140a8', '#271e54']}
              />
              }
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
