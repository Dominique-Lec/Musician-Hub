import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiPlus, FiStar } from 'react-icons/fi'
import { useService } from '../contexts/ServiceContext'
import { useCommunity } from '../contexts/CommunityContext'

const ServiceMarketplace = () => {
  const { communityId } = useParams()
  const { getServicesByCommunity } = useService()
  const { getCommunity } = useCommunity()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('newest')
  
  const community = communityId !== 'all' ? getCommunity(communityId) : null
  const services = getServicesByCommunity(communityId)
  
  const categories = ['All', 'Recording', 'Production', 'Mixing', 'Mastering', 'Composition', 'Marketing']
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })
  
  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortBy === 'price-low') {
      return a.price - b.price
    } else if (sortBy === 'price-high') {
      return b.price - a.price
    } else if (sortBy === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {community ? `${community.name} Services` : 'All Services'}
                </h1>
                <p className="text-light-darker">
                  {community 
                    ? `Browse services offered by members of ${community.name}`
                    : 'Browse all services offered by musicians across all communities'
                  }
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  to={`/services/create${community ? `?community=${communityId}` : ''}`} 
                  className="btn-primary"
                >
                  <FiPlus className="inline-block mr-2" />
                  Offer a Service
                </Link>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-darker" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
                
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-dark-lighter text-light-darker hover:text-light'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center bg-dark-lighter rounded-lg p-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <FiFilter className="mr-2 text-light-darker" />
                  <span className="mr-4">Price Range:</span>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-16 bg-dark border border-gray-700 rounded px-2 py-1"
                    />
                    <span className="mx-2">to</span>
                    <span className="mr-2">$</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-16 bg-dark border border-gray-700 rounded px-2 py-1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-dark border border-gray-700 rounded px-3 py-1"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="card block overflow-hidden hover:bg-dark-lighter/80 transition-colors"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark to-transparent h-20"></div>
                      <div className="absolute bottom-2 left-2 bg-dark/80 text-xs rounded-full px-2 py-1">
                        {service.category}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{service.title}</h3>
                      <p className="text-light-darker text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center mb-3">
                        <img
                          src={service.sellerAvatar}
                          alt={service.sellerName}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm">{service.sellerName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span>{service.rating.toFixed(1)}</span>
                          <span className="text-light-darker ml-1">({service.reviews})</span>
                        </div>
                        
                        <div className="text-primary font-bold">
                          ${service.price}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              {/* Create Service Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  to={`/services/create${community ? `?community=${communityId}` : ''}`}
                  className="card flex flex-col items-center justify-center p-6 h-full border-2 border-dashed border-gray-700 hover:border-primary transition-colors"
                >
                  <FiPlus className="text-4xl mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Offer a Service</h3>
                  <p className="text-light-darker text-center">
                    Share your musical talents and earn money
                  </p>
                </Link>
              </motion.div>
            </div>
            
            {sortedServices.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p className="text-light-darker mb-6">
                  Try adjusting your search or filters, or be the first to offer a service.
                </p>
                <Link 
                  to={`/services/create${community ? `?community=${communityId}` : ''}`} 
                  className="btn-primary"
                >
                  <FiPlus className="inline-block mr-2" />
                  Offer a Service
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServiceMarketplace
