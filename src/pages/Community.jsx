import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiPlus, FiUsers, FiMessageCircle, FiShoppingBag } from 'react-icons/fi'
import { useCommunity } from '../contexts/CommunityContext'

const Community = () => {
  const { communities, loading } = useCommunity()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Instruments', 'Production', 'Vocals', 'Industry']
  
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <p>Loading communities...</p>
      </div>
    )
  }
  
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
                <h1 className="text-3xl font-bold mb-2">Communities</h1>
                <p className="text-light-darker">Connect with musicians who share your interests</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/communities/create" className="btn-primary">
                  <FiPlus className="inline-block mr-2" />
                  Create Community
                </Link>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-darker" />
                  <input
                    type="text"
                    placeholder="Search communities..."
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
            </div>
            
            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/communities/${community.id}`}
                    className="card block overflow-hidden hover:bg-dark-lighter/80 transition-colors"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark to-transparent h-20"></div>
                      <div className="absolute bottom-2 left-2 bg-dark/80 text-xs rounded-full px-2 py-1">
                        {community.category}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                      <p className="text-light-darker text-sm mb-4 line-clamp-2">
                        {community.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-light-darker text-sm">
                          <FiUsers className="mr-1" />
                          <span>{community.members} members</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <div className="flex items-center text-light-darker text-sm">
                            <FiMessageCircle className="mr-1" />
                            <span>Chat</span>
                          </div>
                          
                          <div className="flex items-center text-light-darker text-sm">
                            <FiShoppingBag className="mr-1" />
                            <span>Services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              {/* Create Community Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  to="/communities/create"
                  className="card flex flex-col items-center justify-center p-6 h-full border-2 border-dashed border-gray-700 hover:border-primary transition-colors"
                >
                  <FiPlus className="text-4xl mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Create Community</h3>
                  <p className="text-light-darker text-center">
                    Start your own community of musicians
                  </p>
                </Link>
              </motion.div>
            </div>
            
            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No communities found</h3>
                <p className="text-light-darker mb-6">
                  Try adjusting your search or filters, or create a new community.
                </p>
                <Link to="/communities/create" className="btn-primary">
                  <FiPlus className="inline-block mr-2" />
                  Create Community
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Community
