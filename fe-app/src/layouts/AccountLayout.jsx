import React from 'react'
import AccountNav from '../components/AccountNav'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
    <>
      <AccountNav />
      <Outlet />
    </>
  )
}

export default AccountLayout
