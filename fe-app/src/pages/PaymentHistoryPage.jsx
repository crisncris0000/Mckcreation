import React, { useEffect, useState } from 'react'
import PaymentHistory from '../components/account/PaymentHistory'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const jwt = localStorage.getItem('jwt');
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
      return;
    }
    
    const user = jwtDecode(jwt);
    setFirstName(user.firstName);
    setLastName(user.lastName);

    fetch(`http://localhost:8080/api/placed-order/get-user-orders`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPayments(data) 
      });
  }, []);

  return (
    <PaymentHistory payments={payments} firstName={firstName} lastName={lastName}/>
  )
}

export default PaymentHistoryPage
