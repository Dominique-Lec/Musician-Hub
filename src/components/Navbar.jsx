import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Communities', path: '/communities' },
    { name: 'Services', path: '/communities/all/services' },
  ]

  const authLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Profile', path: '/profile' },
      ]
    : [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
      ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark/90 dark:bg-dark/90 backdrop-blur-md light:bg-light/90 z-50 py-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-sm font-medium text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark transition-colors duration-200"
              >
                Logout
              </button>
            )}
            
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 w-full bg-dark-lighter dark:bg-dark-lighter light:bg-light-darker py-4 shadow-lg transition-colors duration-200"
        >
          <div className="container mx-auto flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-gray-800 dark:bg-gray-800 light:bg-gray-200 my-2"></div>
            
            {authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout()
                  closeMenu()
                }}
                className="text-sm font-medium py-2 text-light-darker dark:text-light-darker light:text-dark-lighter hover:text-light dark:hover:text-light light:hover:text-dark transition-colors duration-200 text-left"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
