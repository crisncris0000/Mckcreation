import React, { useEffect, useState } from 'react';
import StatsSection from './StatsSection';
import UsersTable from './UsersTable';
import RecentTransactions from './RecentTransactions';

const AdminDashboard = () => {

  const [users, setUsers] = useState([])

  const totalIncome = 12500;
  const popularItems = [
    { id: 1, name: 'Item A', sales: 150 },
    { id: 2, name: 'Item B', sales: 120 },
    { id: 3, name: 'Item C', sales: 90 },
  ];

  const recentTransactions = [
    { id: 1, user: 'John Doe', amount: 200, date: '2023-10-05' },
    { id: 2, user: 'Jane Smith', amount: 150, date: '2023-10-04' },
    { id: 3, user: 'Alice Johnson', amount: 300, date: '2023-10-03' },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/user/recent/5').then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      setUsers(data)
    }).catch((error) => {
      console.log(error)
    })

    
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <StatsSection totalIncome={totalIncome} popularItems={popularItems} users={users}/>

      <UsersTable users={users} />

      <RecentTransactions recentTransactions={recentTransactions} />
    </div>
  );
};

export default AdminDashboard;