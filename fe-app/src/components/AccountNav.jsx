import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AccountNav = () => {

  const nav = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    nav('/')
    window.location.reload()
  }

  return (
    <nav className='flex justify-around items-center m-auto text-2xl '>
      <Link to="/account/settings">Settings</Link>
      <Link to="/account/payment-history">Payment History</Link> 
      <Link to="#" onClick={handleLogout}>Logout</Link>
    </nav>
  );
};

export default AccountNav;
