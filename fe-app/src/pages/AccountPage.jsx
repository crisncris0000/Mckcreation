import React, { useEffect, useState } from 'react'
import LoginForm from '../components/account/LoginForm'

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
      null
    }
    </>
  )
}

export default AccountPage
