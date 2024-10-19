import React, { useEffect, useState } from 'react'
import LoginForm from '../components/account/LoginForm'
import AccountSettings from '../components/account/AccountSettings'

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
