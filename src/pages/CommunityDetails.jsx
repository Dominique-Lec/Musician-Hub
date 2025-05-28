import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiMessageCircle, FiShoppingBag, FiCalendar, FiEdit, FiShare2 } from 'react-icons/fi'
import { useCommunity } from '../contexts/CommunityContext'
import { useService } from '../contexts/ServiceContext'
import { useAuth } from '../contexts/AuthContext'

const CommunityDetails = () => {
  const { id } = useParams()
  const { getCommunity } = useCommunity()
  const { getServicesByCommunity } = useService()
  const { currentUser } = useAuth()
  
  const community = getCommunity(id)
  const services = getServicesByCommunity(id).slice(0, 3) // Get first 3 services
  
  const [activeTab, setActiveTab] = useState('about')
  
  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <p>Community not found</p>
      </div>
    )
  }
  
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'members', label: 'Members' },
    { id: 'events', label: 'Events' }
  ]
  
  const isOwner = currentUser?.id === community.ownerId
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Community Header */}
            <div className="relative h-64 rounded-lg overflow-hidden mb-8">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="inline-block bg-dark/80 text-xs rounded-full px-2 py-1 mb-2">
                      {community.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{community.name}</h1>
                    <div className="flex items-center text-light-darker">
                      <FiUsers className="mr-1" />
                      <span>{community.members} members</span>
                      <span className="mx-2">•</span>
                      <FiCalendar className="mr-1" />
                      <span>Created {new Date(community.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    {isOwner && (
                      <Link to={`/communities/${id}/edit`} className="btn-outline">
                        <FiEdit className="mr-2" />
                        Edit
                      </Link>
                    )}
                    <button className="btn-outline">
                      <FiShare2 className="mr-2" />
                      Share
                    </button>
                    <Link to={`/communities/${id}/services`} className="btn-primary">
                      <FiShoppingBag className="mr-2" />
                      Services
                    </Link>
                  </div>
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
                    className={`px-6 py-3 font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-light-darker hover:text-light'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {activeTab === 'about' && (
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">About this Community</h2>
                    <p className="text-light-darker mb-6">
                      {community.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-3">Community Guidelines</h3>
                    <ul className="list-disc pl-5 text-light-darker mb-6">
                      <li>Be respectful and supportive of other members</li>
                      <li>Share knowledge and help others grow</li>
                      <li>No spam or self-promotion without permission</li>
                      <li>Give credit when sharing others' work</li>
                      <li>Have fun and make music together!</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-3">Join the Conversation</h3>
                    <p className="text-light-darker">
                      Introduce yourself in the discussions tab and start connecting with other musicians in this community.
                    </p>
                  </div>
                )}
                
                {activeTab === 'discussions' && (
                  <div className="card">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Discussions</h2>
                      <button className="btn-primary">New Topic</button>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 border border-gray-800 rounded-lg hover:bg-dark-lighter/50 transition-colors">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-semibold">Tips for recording acoustic guitar at home</h3>
                            <span className="text-light-darker text-sm">2 days ago</span>
                          </div>
                          <p className="text-light-darker text-sm mb-3">
                            I'm struggling to get a clean recording of my acoustic guitar. Any tips on microphone placement and room treatment?
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="User"
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm">Alex Johnson</span>
                            </div>
                            <div className="text-light-darker text-sm">
                              <FiMessageCircle className="inline-block mr-1" />
                              12 replies
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button className="text-primary hover:underline">View All Discussions</button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'members' && (
                  <div className="card">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Members</h2>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search members..."
                          className="input py-1 px-3 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center p-3 border border-gray-800 rounded-lg hover:bg-dark-lighter/50 transition-colors">
                          <img
                            src={`https://images.pexels.com/photos/${1222271 + i * 100}/pexels-photo-${1222271 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                            alt="Member"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <h3 className="font-medium">Member Name</h3>
                            <p className="text-light-darker text-xs">Guitarist • Joined 3 months ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button className="text-primary hover:underline">View All Members ({community.members})</button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'events' && (
                  <div className="card">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Upcoming Events</h2>
                      {isOwner && (
                        <button className="btn-primary">Create Event</button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-4 border border-gray-800 rounded-lg hover:bg-dark-lighter/50 transition-colors">
                          <div className="flex">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex flex-col items-center justify-center mr-4">
                              <span className="text-lg font-bold">{15 + i}</span>
                              <span className="text-xs">June</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Virtual Jam Session</h3>
                              <p className="text-light-darker text-sm mb-2">
                                Join us for a virtual jam session where we'll collaborate on some new ideas.
                              </p>
                              <div className="text-light-darker text-xs">
                                <span>8:00 PM - 10:00 PM EST</span>
                                <span className="mx-2">•</span>
                                <span>Online (Zoom)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button className="text-primary hover:underline">View All Events</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Join Community */}
                <div className="card">
                  <button className="btn-primary w-full mb-4">Join Community</button>
                  <p className="text-light-darker text-sm text-center">
                    Connect with {community.members} musicians in this community
                  </p>
                </div>
                
                {/* Services */}
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Services</h3>
                    <Link to={`/communities/${id}/services`} className="text-primary text-sm hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  {services.length > 0 ? (
                    <div className="space-y-3">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="flex items-center p-2 hover:bg-dark-lighter/50 rounded-lg transition-colors"
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-12 h-12 object-cover rounded-lg mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{service.title}</h4>
                            <p className="text-primary text-sm">${service.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-light-darker text-sm mb-3">No services yet</p>
                      <Link to={`/services/create?community=${id}`} className="text-primary text-sm hover:underline">
                        Offer a service
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Community Info */}
                <div className="card">
                  <h3 className="font-semibold mb-4">Community Info</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-light-darker">Created</span>
                      <span>{new Date(community.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-darker">Category</span>
                      <span>{community.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-darker">Members</span>
                      <span>{community.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-darker">Services</span>
                      <span>{services.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetails
