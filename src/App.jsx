import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Community from './pages/Community'
import CommunityDetails from './pages/CommunityDetails'
import ServiceMarketplace from './pages/ServiceMarketplace'
import ServiceDetails from './pages/ServiceDetails'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/communities" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        
        <Route path="/communities/:id" element={
          <ProtectedRoute>
            <CommunityDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/communities/:communityId/services" element={
          <ProtectedRoute>
            <ServiceMarketplace />
          </ProtectedRoute>
        } />
        
        <Route path="/services/:id" element={
          <ProtectedRoute>
            <ServiceDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
