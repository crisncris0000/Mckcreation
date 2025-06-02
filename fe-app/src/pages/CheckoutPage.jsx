import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/forms/CheckoutForm';
import { jwtDecode } from 'jwt-decode';

const CheckoutPage = () => {
  const jwt = localStorage.getItem('jwt');
  const [user, setUser] = useState(null);
  const [shipping, setShipping] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
      return;
    }

    try {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);

      fetch(`http://localhost:8080/api/shipping/get-user-shipping`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch shipping info.");
          return res.json();
        })
        .then((data) => {
          setShipping({
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
          });
        })
        .catch((error) => console.log("Shipping fetch error:", error));
    } catch (err) {
      console.error("JWT Decode Error:", err);
      nav('/account/login');
    }
  }, [jwt, nav]);

  if (!user) return null; // or loading spinner

  return <CheckoutForm user={user} shipping={shipping} />;
};

export default CheckoutPage;
