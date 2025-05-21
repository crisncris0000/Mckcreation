import React from 'react'
import CheckoutForm from '../components/forms/CheckoutForm'

const CheckoutPage = () => {
  const jwt = localStorage.getItem('jwt');
  const [user, setUser] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/account/login');
    }
    if (location.state == null) {
      nav('/');
    }

    setUser(jwtDecode(jwt));

    fetch(`http://localhost:8080/api/shipping/get-user-shipping`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zipCode);
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log(user)
      })

  }, []);
  return (
    <CheckoutForm user={user}/>
  )
}

export default CheckoutPage
