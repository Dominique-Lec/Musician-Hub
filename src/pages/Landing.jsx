import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMusic, FiUsers, FiShoppingBag } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useTheme } from '../contexts/ThemeContext'

const Landing = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-dark dark:bg-dark light:bg-light transition-colors duration-200">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-light dark:text-light light:text-dark"
          >
            Welcome to <span className="gradient-text">MusicianHub</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-light-darker dark:text-light-darker light:text-dark-lighter max-w-2xl mb-10"
          >
            The ultimate platform for musicians to connect, collaborate, and offer services
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/communities" className="btn-outline">
              Explore Communities
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
          >
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <FiUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-light dark:text-light light:text-dark">Join Communities</h3>
              <p className="text-light-darker dark:text-light-darker light:text-dark-lighter">
                Connect with musicians who share your interests and collaborate on projects
              </p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <FiShoppingBag className="text-secondary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-light dark:text-light light:text-dark">Offer Services</h3>
              <p className="text-light-darker dark:text-light-darker light:text-dark-lighter">
                Share your musical talents and earn money by offering services to other musicians
              </p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <FiMusic className="text-accent text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-light dark:text-light light:text-dark">Grow Your Network</h3>
              <p className="text-light-darker dark:text-light-darker light:text-dark-lighter">
                Build your professional network and find opportunities in the music industry
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing
