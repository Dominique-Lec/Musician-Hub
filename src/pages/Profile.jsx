import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit, FiSettings, FiStar, FiShoppingBag, FiUsers, FiMessageCircle } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useService } from '../contexts/ServiceContext'

const Profile = () => {
  const { currentUser, updateProfile } = useAuth()
  const { services } = useService()
  const [activeTab, setActiveTab] = useState('services')
  
  // Filter services by current user
  const userServices = services.filter(service => service.sellerId === currentUser?.id)
  
  const tabs = [
    { id: 'services', label: 'Services', icon: <FiShoppingBag /> },
    { id: 'communities', label: 'Communities', icon: <FiUsers /> },
    { id: 'reviews', label: 'Reviews', icon: <FiStar /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageCircle /> }
  ]
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="relative mb-8">
              <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-lg"></div>
              <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6 flex justify-between">
                <div className="flex items-end">
                  <div className="w-24 h-24 rounded-full border-4 border-dark bg-dark-lighter overflow-hidden">
                    <img
                      src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random`}
                      alt={currentUser?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 mb-2">
                    <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
                    <p className="text-light-darker">{currentUser?.instrument || 'Musician'}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link to="/profile/edit" className="btn-outline">
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </Link>
                  <Link to="/settings" className="btn-outline">
                    <FiSettings className="mr-2" />
                    Settings
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Profile Stats */}
            <div className="mt-16 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-light-darker text-sm">Services</div>
                </div>
                <div className="card p-4 text-center">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-light-darker text-sm">Communities</div>
                </div>
                <div className="card p-4 text-center">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-light-darker text-sm">Reviews</div>
                </div>
                <div className="card p-4 text-center">
                  <div className="text-2xl font-bold mb-1">0</div>
                  <div className="text-light-darker text-sm">Completed Orders</div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-8 border-b border-gray-800">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-medium whitespace-nowrap flex items-center ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-light-darker hover:text-light'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div>
              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Services</h2>
                    <Link to="/services/create" className="btn-primary">
                      Create New Service
                    </Link>
                  </div>
                  
                  {userServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {userServices.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="card block overflow-hidden hover:bg-dark-lighter/80 transition-colors"
                        >
                          <div className="h-40 overflow-hidden">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">{service.title}</h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <FiStar className="text-yellow-500 mr-1" />
                                <span>{service.rating.toFixed(1)}</span>
                                <span className="text-light-darker ml-1">({service.reviews})</span>
                              </div>
                              <div className="text-primary font-bold">${service.price}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 card">
                      <h3 className="text-xl font-semibold mb-2">You don't have any services yet</h3>
                      <p className="text-light-darker mb-6">
                        Create your first service to start offering your musical talents to the community.
                      </p>
                      <Link to="/services/create" className="btn-primary">
                        Create New Service
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'communities' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Communities</h2>
                    <Link to="/communities" className="btn-primary">
                      Explore Communities
                    </Link>
                  </div>
                  
                  <div className="text-center py-12 card">
                    <h3 className="text-xl font-semibold mb-2">You haven't joined any communities yet</h3>
                    <p className="text-light-darker mb-6">
                      Join communities to connect with other musicians and access their services.
                    </p>
                    <Link to="/communities" className="btn-primary">
                      Explore Communities
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Reviews</h2>
                  
                  <div className="text-center py-12 card">
                    <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                    <p className="text-light-darker mb-6">
                      Reviews from your clients will appear here once you complete orders.
                    </p>
                    <Link to="/communities/all/services" className="btn-primary">
                      Browse Services
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Messages</h2>
                  
                  <div className="text-center py-12 card">
                    <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
                    <p className="text-light-darker mb-6">
                      Connect with other musicians to start conversations.
                    </p>
                    <Link to="/communities" className="btn-primary">
                      Find Musicians
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
