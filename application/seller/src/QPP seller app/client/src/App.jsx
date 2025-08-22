import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import StartSelling from './pages/auth/StartSelling'
import CatalogPage from './pages/CatalogPage'
import OrdersPage from './pages/OrdersPage'
import CategoriesPage from './pages/CategoriesPage'
import RegisterLocal from './pages/auth/RegisterLocal'
import RegisterBusiness from './pages/auth/RegisterBusiness'
import SalesOverview from './pages/SalesOverview'

function PrivateRoute({ children }){
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
  <Route path="/sales-overview" element={<PrivateRoute><SalesOverview /></PrivateRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
      <Route path="/start-selling" element={<StartSelling />} />
      <Route path="/register-local" element={<RegisterLocal />} />
      <Route path="/register-business" element={<RegisterBusiness />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
      <Route path="/catalog" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

