import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import Message from '../message/Message';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [match, setMatch] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = new useNavigate()
  

  const registerUser = async (e) => {
    e.preventDefault()

    setIsLoading(true)

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

    try {
      const res = await fetch(`http://localhost:8080/api/auth/register`,{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })

      const jsonRes = await res.json()

      if(res.status != 201) {
        setMessage('Error has occured please register later')
        setIsVisible(true)
        setMessage(jsonRes.message)
      }

      navigate('/login')
    } catch(error) {
      console.log(error)
      setMessage('Error has occured please register later')
      setIsVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen">
      <Message 
        isError={true}
        message={message}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
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
              onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
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
              required
            />
            {
            !match ? <p className='text-red-500'>Passwords must match!</p> : ''
            }
          </div>
          {/* Submit Button */}
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
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
              text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            }
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
