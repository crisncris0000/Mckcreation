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
import AdminLayout from './layouts/AdminLayout'
import SalesSummaryPage from './pages/SalesSummaryPage'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/shop' element={<ShoppingPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/account/register' element={<RegisterForm />} />
        <Route path='/shop/custom-shirt' element={<CustomShirtPage />} />
        <Route path='/shop/custom-tray' element={<CustomTrayPage />} />
        <Route path='/shop/custom-cup' element={<CustomCupsPagee />} />
        <Route path='/shop/custom-tray' element={<CustomTrayPage />} />
        <Route path='/shop/custom-topper' element={<CustomCakeTopperPage />} />

        <Route path="account/admin" element={<AdminLayout />}>
          <Route index element={<SalesSummaryPage />} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App 