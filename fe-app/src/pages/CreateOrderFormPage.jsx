import React, { useEffect, useState } from 'react'
import CustomForm from '../components/forms/CreateOrderForm'
import { jwtDecode } from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateOrderFormPage = () => {
  const [customization, setCustomization] = useState('')
  const [user, setUser] = useState('')
  const jwt = localStorage.getItem('jwt')

  const location = useLocation()
  const data = location.state
  const nav = useNavigate()

  useEffect(() => {
    if (!jwt) {
      nav('/account/login')
    }
    setUser(jwtDecode(jwt))
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const order = {
      itemTitle: data.title,
      customization,
      price: data.price,
      userID: user.id,
      categoryID: data.category.id
    }

    try {
      await fetch('http://localhost:8080/api/order/create', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      })

      nav('/shop')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
        src={`data:${data?.mimeType};base64,${data?.imageData}`}
          alt="Item Preview"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2">
        <CustomForm
          handleOnSubmit={handleOnSubmit}
          customization={customization}
          setCustomization={setCustomization}
        />
      </div>
    </div>
  )
}

export default CreateOrderFormPage
