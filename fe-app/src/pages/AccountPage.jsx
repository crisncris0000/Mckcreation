import React from 'react'
import LoginForm from '../components/account/LoginForm'

const AccountPage = () => {

  const jwt = localStorage.getItem('jwt')

  return (
    <>
    {!jwt ?
      <LoginForm />
      :
      <AccountSettingsPage />
    }
    </>
  )
}

export default AccountPage
