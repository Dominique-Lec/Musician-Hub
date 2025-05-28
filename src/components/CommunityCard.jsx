import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'

const CommunityCard = ({ community }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img 
          src={community.banner || community.image} 
          alt={community.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <img 
            src={community.image} 
            alt={community.name} 
            className="w-12 h-12 rounded-full border-2 border-primary"
          />
          <h3 className="text-xl font-bold text-white">{community.name}</h3>
        </div>
      </div>
      
      <p className="text-light-darker mb-4 line-clamp-2">{community.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-light-darker">
          <FiUsers />
          <span>{community.members.length} members</span>
        </div>
        
        <Link 
          to={`/communities/${community.id}`}
          className="btn-primary py-1.5 px-4"
        >
          View
        </Link>
      </div>
    </motion.div>
  )
}

export default CommunityCard
