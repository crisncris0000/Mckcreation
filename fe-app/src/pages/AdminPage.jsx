import React, { useEffect, useState } from 'react'
import Admin from '../components/account/Admin'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const AdminPage = () => {

    const jwt = localStorage.getItem('jwt')
    const nav = useNavigate()
    

    useEffect(() => {
        if (!jwt) {
          nav('/account/login');
          return;
        }
      
        const decodedUser = jwtDecode(jwt);
        
        if (decodedUser.role !== 'ROLE_ADMIN') {
          nav('/forbidden');
          return;
        }
      }, []);

    return (
        <div>
            <Admin jwt={jwt}/>
        </div>
    )
}

export default AdminPage