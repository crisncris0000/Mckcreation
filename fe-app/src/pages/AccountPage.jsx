import React, { useEffect, useState } from 'react'
import LoginForm from '../components/account/LoginForm'
import AccountSettings from '../components/account/AccountSettings'

const AccountPage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    if(jwt != null) {
      setIsLoggedIn(true)
    }

  }, [])

  return (
    <>
    {!isLoggedIn ?
      <LoginForm />
      :
      <AccountSettings />
    }
    </>
  )
}

export default AccountPage
