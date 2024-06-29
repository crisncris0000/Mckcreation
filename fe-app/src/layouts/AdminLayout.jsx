import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenu from '../components/AdminMenu'

const AdminLayout = () => {
  return (
    <>
      <AdminMenu />
      <Outlet />
    </>
  )
}

export default AdminLayout
