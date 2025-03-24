import React, { useEffect, useState } from 'react';
import ItemForm from '../components/forms/ItemForm';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ItemFormPage = () => {
  const jwt = localStorage.getItem('jwt');
  const nav = useNavigate();
  const [user, setUser] = useState(null); // Start with null to avoid early checks

  useEffect(() => {
    const checkUserRole = async () => {
      if (!jwt) {
        nav('/account/login');
        return;
      }

      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);

      if (decodedUser.role !== 'ADMIN') {
        nav('/forbidden');
      }
    };

    checkUserRole();
  }, [jwt, nav]); 
  
  if (!user) return null;

  return <ItemForm />;
};

export default ItemFormPage;
