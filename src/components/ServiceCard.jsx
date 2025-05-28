import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiRefreshCw } from 'react-icons/fi'

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm font-medium">
          ${service.price}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{service.title}</h3>
      <p className="text-light-darker mb-4 text-sm line-clamp-2">{service.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 text-light-darker text-sm">
          <FiClock size={14} />
          <span>{service.deliveryTime} days delivery</span>
        </div>
        
        <div className="flex items-center space-x-1 text-light-darker text-sm">
          <FiRefreshCw size={14} />
          <span>{service.revisions} revisions</span>
        </div>
      </div>
      
      <Link 
        to={`/services/${service.id}`}
        className="btn-primary w-full flex justify-center"
      >
        View Details
      </Link>
    </motion.div>
  )
}

export default ServiceCard
