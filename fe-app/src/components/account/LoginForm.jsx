import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import Message from '../message/Message';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = new useNavigate()

  const loginForm = async (e) => {
    e.preventDefault()
    
    setIsLoading(true)

    const loginRequest = {
      email, 
      password
    }

    try{
      const res = await fetch(`http://localhost:8080/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest)
      })

      const jsonRes = await res.json()

      if(res.status != 200) {
        console.log(jsonRes)
        return
      }

      const user = jwtDecode(jsonRes.token)

      localStorage.setItem("jwt", jsonRes.token)

      navigate('/')
      window.location.reload()
    } catch(error) {
      console.log(error)
      setMessage('An error has occured please try again later')
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form 
          className="space-y-4"
          onSubmit={loginForm}
        >
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
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
            }
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/account/register" className="text-indigo-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
