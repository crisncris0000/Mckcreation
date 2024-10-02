import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Message from '../message/Message';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const jwt = localStorage.getItem('jwt')
  const nav = useNavigate()

  useEffect(() => {
    if(!jwt) {
      nav('account/login')
    } else {
      const user = jwtDecode(jwt)
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  },[jwt, nav])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = jwtDecode(jwt) 

    const updateUser = {
      firstName,
      lastName,
      oldPassword,
      password: newPassword
    }

    try {
      setIsLoading(true)

      const res = await fetch(`http://localhost:8080/api/user/update-password/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser)
      })

      const jsonRes = await res.json()

      if(res.status != 200) {
        setMessage(jsonRes.error)
        setError(true)
        setIsVisible(true)
      } else {
        setError(false)
        setIsVisible(true)
        setMessage(jsonRes.message)
      }

      if(res.status == 401) console.log('JWT expired')

    } catch (error) {
      setMessage('An error has occured please try again later')
      setError(true)
      setIsVisible(true)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="m-10 max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">

      <Message isError={error} isVisible={isVisible} setIsVisible={setIsVisible} message={message} />

      <h2 className="text-2xl font-bold mb-4 text-center">Update Account Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="First Name"
            required
          />
        </div>
        
        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Last Name"
            required
          />
        </div>

        {/* Current Password */}
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Current Password"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="New Password"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm New Password"
            required
          />
        </div>

        <div className="flex justify-center">
          { isLoading ?
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#d614e0', '#bf60c4', '#5140a8', '#271e54']}
              />
              :
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Account
              </button>
            }
          </div>
      </form>
    </div>
  );
};

export default AccountSettings;
