import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [instrument, setInstrument] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!name || !email || !password || !confirmPassword || !instrument) {
      return setError('Please fill in all fields')
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }
    
    try {
      setLoading(true)
      await register(email, password, name, instrument)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const instruments = [
    'Guitar',
    'Bass',
    'Drums',
    'Vocals',
    'Piano/Keyboard',
    'Violin',
    'Saxophone',
    'Trumpet',
    'Producer/Beatmaker',
    'DJ',
    'Other'
  ]
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <Link to="/" className="flex items-center text-light-darker hover:text-light transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="card">
          <h1 className="text-2xl font-bold mb-6">Create your account</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="instrument" className="block text-sm font-medium mb-1">
                Primary Instrument/Role
              </label>
              <select
                id="instrument"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="input"
              >
                <option value="">Select your instrument</option>
                {instruments.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-light-darker">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
