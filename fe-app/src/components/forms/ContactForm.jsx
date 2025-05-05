import React, { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import Message from '../message/Message'

const ContactForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  


  const handleOnSubmit = async (e) => {
    
    e.preventDefault()

    setIsLoading(true)
    
    const newEmail = {
      name,
      email,
      subject,
      body
    }
    
    try {
      const res = await fetch('http://localhost:8080/api/user/send-email', {
        method: 'POST',
        body: JSON.stringify(newEmail),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(res.status == 200) {
        setMessage("Email sent successfully")
        setIsVisible(true)
        setIsError(false)

        setName('')
        setEmail('')
        setSubject('')
        setBody('')
        return
      } else {
        setMessage("Error sending the email")
        setIsVisible(true)
        setIsError(true)
      }
      
    } catch(error) {
      setMessage("Internal Server error")
      setIsVisible(true)
      setIsError(true)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <section className="flex justify-center items-center min-h-screen">

    <Message isError={isError} isVisible={isVisible} setIsVisible={setIsVisible} message={message}/>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
              onChange={e => setName(e.target.value)}
              value={name}
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
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
              onChange={e => setSubject(e.target.value)}
              value={subject}
            />
          </div>
          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Message"
              onChange={e => setBody(e.target.value)}
              value={body}
            />
          </div>
          {/* Submit Button */}
          
          <div className="flex justify-center">
          {isLoading ?
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#d614e0', '#bf60c4', '#5140a8', '#271e54']}
            /> :
          
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Message
              </button>
            }
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;