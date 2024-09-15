import React from 'react';
import { Link } from 'react-router-dom';

const AccountNav = () => {
  return (
    <nav className='flex justify-around items-center m-auto text-2xl '>
      <Link to="/account/settings">Settings</Link>
      <Link to="/account/payment-history">Payment History</Link> 
      <Link to="/account/logout">Logout</Link>
    </nav>
  );
};

export default AccountNav;
