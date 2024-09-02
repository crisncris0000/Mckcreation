import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [match, setMatch] = useState(true)

  const registerUser = (e) => {
    e.preventDefault()

    if(password !==  confirmedPassword) {
      setMatch(false)
      return
    }

    const user = {
      firstName,
      lastName,
      email,
      password
    }

    console.log(user)
  }

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4" onSubmit={registerUser}>
          {/* First Name Field */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first-name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* Last Name Field */}
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last-name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>                   
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Confrim Password Field */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            {
            !match ? <p className='text-red-500'>Passwords must match!</p> : ''
            }
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
              text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link to="/account" className="text-indigo-600 hover:underline">Go back</Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
