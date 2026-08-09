import { Routes, Route, Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { DashboardPage } from './pages/DashboardPage'
import { ClientsPage } from './pages/ClientsPage'
import { ServiceOrdersPage } from './pages/ServiceOrdersPage'

import './App.css'
import { LoginPage } from './pages/LoginPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={
        <div>
          <Header />
          <Outlet />
        </div>
      }>

        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/service-orders" element={<ServiceOrdersPage />} />
      </Route>
    </Routes>
  )
}

export default App