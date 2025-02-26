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
import ContactPage from './pages/ContactPage'
import AccountPage from './pages/AccountPage'
import AccountLayout from './layouts/AccountLayout'
import AccountSettingsPage from './pages/AccountSettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import PaymentHistoryPage from './pages/PaymentHistoryPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import ItemFormPage from './pages/ItemFormPage'
import UpdateItemForm from './components/forms/UpdateItemForm'
import PortfolioPage from './pages/PortfolioPage'
import RegisterUserPage from './pages/RegisterUserPage'
import ResetPasswordForm from './components/account/ResetPasswordForm'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if(!jwt) {
      return
    }

    const decodedToken = jwtDecode(jwt)
    const currentTime = Date.now() / 1000;

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
        <Route path='/shop/item/form' element={<ItemFormPage />} />
        <Route path='shop/item/update-form' element={<UpdateItemForm />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/account/login' element={<AccountPage />} />
        <Route path='/account/register' element={<RegisterUserPage />} />
        <Route path='/account/reset' element={<ResetPasswordPage /> } />
        <Route path='/account/cart' element={<ShoppingCartPage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
       

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

export default App;