import React from 'react'
import AccountSettings from '../components/account/AccountSettings'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AccountSettingsPage = () => {
  const jwt = localStorage.getItem('jwt')
  const nav = useNavigate()

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  useEffect(() => {
    if(!jwt) {
      nav('/account/login')
    } else {
      fetch(`${API_BASE_URL}/api/shipping/get-user-shipping`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        setUserInfo({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          address: data.address,
          state: data.state,
          city: data.city,
          zipCode: data.zipCode
        })
      }).catch((error) => {
        console.log(error)
      })
    }

  },[jwt, nav])
  return (
    <AccountSettings userInfo={userInfo} setUserInfo={setUserInfo} jwt={jwt}/>
  )
}

export default AccountSettingsPage