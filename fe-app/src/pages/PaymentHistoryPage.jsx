import React from 'react'
import PaymentHistory from '../components/account/PaymentHistory'

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
      .then((data) => setPayments(data));
  }, [jwt, nav]);

  return (
    <PaymentHistory paymensts={payments} firstName={firstName} lastName={lastName}/>
  )
}

export default PaymentHistoryPage
