import React from 'react';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const RegisterForm = ({ registrationInfo, setRegistrationInfo, sendVerificationEmail, match, isLoading, error, errorMessage }) => {
  return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md m-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="space-y-4" onSubmit={sendVerificationEmail}>
            {/* First Name Field */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first-name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="First Name"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, firstName: e.target.value }))}
                value={registrationInfo.firstName}
                required
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
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, lastName: e.target.value }))}
                value={registrationInfo.lastName}
                required
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
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, email: e.target.value }))}
                value={registrationInfo.email}              
                required
              />
              {error && <p className="text-red-500 text-lg">{errorMessage}</p>}
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Password"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, password: e.target.value }))}
                value={registrationInfo.password}
                required
              />
            </div>
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                type="password"
                id="confirm-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Password"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, confirmPassword: e.target.value }))}
                value={registrationInfo.confirmPassword}
                required
              />
              {!match && <p className='text-red-500'>Passwords must match!</p>}
            </div>
            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Address"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, address: e.target.value }))}
                value={registrationInfo.address}
                required
              />
            </div>
            {/* City Field */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="City"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, city: e.target.value }))}
                value={registrationInfo.city}
                required
              />
            </div>
            {/* State Field */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="State"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, state: e.target.value }))}
                value={registrationInfo.state}
                required
              />
            </div>
            {/* Zip Code Field */}
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                id="zip"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Zip Code"
                onChange={(e) => setRegistrationInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                value={registrationInfo.zipCode}
                required
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center">
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#d614e0', '#bf60c4', '#5140a8', '#271e54']}
                />
              ) : (            
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              )}
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            <Link to="/account/login" className="text-indigo-600 hover:underline">Go back</Link>
          </p>
        </div>
  );  
};

export default RegisterForm;
