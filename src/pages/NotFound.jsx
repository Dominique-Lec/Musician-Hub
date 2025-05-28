import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark dark:bg-dark light:bg-light transition-colors duration-200">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold mb-6 text-light dark:text-light light:text-dark"
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-light-darker dark:text-light-darker light:text-dark-lighter max-w-2xl mb-10"
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
