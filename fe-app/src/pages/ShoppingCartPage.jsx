import React, { useEffect, useState } from 'react'
import ShoppingCart from '../components/account/ShoppingCart'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ShoppingCartPage = () => {

  const [orders, setOrders] = useState([]);
  const jwt = localStorage.getItem('jwt');
  const [user, setUser] = useState('')
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
    }

    setUser(jwtDecode(jwt))

    fetch(`http://localhost:8080/api/order/get-orders`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, [jwt, nav]);

  return (
    <ShoppingCart orders={orders} jwt={jwt} />
  )
}

export default ShoppingCartPage
