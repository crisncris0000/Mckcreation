import './App.css'
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ShoppingPage from './pages/ShoppingPage'
import CustomShirtPage from './pages/CustomShirtPage'
import CustomTrayPage from './pages/CustomTrayPage'
import CustomCupsPagee from './pages/CustomCupsPage'
import CustomCakeTopperPage from './pages/CustomCakeTopperPage'
import ContactPage from './pages/ContactPage'
import AccountPage from './pages/AccountPage'
import RegisterForm from './components/account/RegisterForm'
import AccountLayout from './layouts/AccountLayout'
import AccountSettingsPage from './pages/AccountPage'
import NotFoundPage from './pages/NotFoundPage'
import PaymentHistoryPage from './pages/PaymentHistoryPage'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

function App() {

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if(!jwt) {
      return
    }

    const decodedToken = jwtDecode(jwt)
    const currentTime = Date.now() / 1000; // convert to seconds

    if(decodedToken.exp < currentTime) {
      localStorage.removeItem('jwt')
      window.location.reload()
    }

  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='*' element={<NotFoundPage />} />
        <Route index element={<HomePage />} />
        <Route path='/shop' element={<ShoppingPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/account/login' element={<AccountPage />} />
        <Route path='/account/register' element={<RegisterForm />} />
        <Route path='/shop/custom-shirt' element={<CustomShirtPage />} />
        <Route path='/shop/custom-tray' element={<CustomTrayPage />} />
        <Route path='/shop/custom-cup' element={<CustomCupsPagee />} />
        <Route path='/shop/custom-tray' element={<CustomTrayPage />} />
        <Route path='/shop/custom-topper' element={<CustomCakeTopperPage />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route path='/account/settings' element={<AccountSettingsPage />} />
          <Route path='/account/payment-history' element={<PaymentHistoryPage />} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App 