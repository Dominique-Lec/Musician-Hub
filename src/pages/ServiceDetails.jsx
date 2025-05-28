import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiRefreshCw, FiMessageCircle, FiHeart, FiShare2 } from 'react-icons/fi'
import { useService } from '../contexts/ServiceContext'
import { useCommunity } from '../contexts/CommunityContext'
import { useAuth } from '../contexts/AuthContext'

const ServiceDetails = () => {
  const { id } = useParams()
  const { getService } = useService()
  const { getCommunity } = useCommunity()
  const { currentUser } = useAuth()
  
  const [activeTab, setActiveTab] = useState('description')
  
  const service = getService(id)
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <p>Service not found</p>
      </div>
    )
  }
  
  const community = getCommunity(service.communityId)
  const isOwner = currentUser?.id === service.sellerId
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'seller', label: 'About the Seller' }
  ]
  
  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: {
        name: 'Michael Thompson',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      rating: 5,
      date: '2023-05-15',
      content: 'Incredible work! The quality exceeded my expectations, and the delivery was prompt. Will definitely use this service again.'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Miller',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      rating: 4,
      date: '2023-04-22',
      content: 'Great service overall. The communication was excellent, and the final product was very good. Just needed a minor revision.'
    }
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
            {/* Breadcrumbs */}
            <div className="mb-6 text-sm">
              <Link to="/communities/all/services" className="text-light-darker hover:text-light">
                Services
              </Link>
              <span className="mx-2 text-light-darker">›</span>
              {community && (
                <>
                  <Link to={`/communities/${community.id}/services`} className="text-light-darker hover:text-light">
                    {community.name}
                  </Link>
                  <span className="mx-2 text-light-darker">›</span>
                </>
              )}
              <span className="text-light">{service.title}</span>
            </div>
            
            {/* Service Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="rounded-lg overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span>{service.rating.toFixed(1)}</span>
                    <span className="text-light-darker ml-1">({service.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-light-darker">
                    <span>In</span>
                    <Link to={`/communities/${service.communityId}`} className="text-primary mx-1 hover:underline">
                      {community?.name || 'Community'}
                    </Link>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-800">
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
                <div>
                  {activeTab === 'description' && (
                    <div>
                      <p className="text-light-darker mb-6">
                        {service.description}
                      </p>
                      
                      <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-primary mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Professional quality recording/production</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-primary mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Up to {service.revisions} revisions to ensure your satisfaction</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-primary mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>High-resolution files delivered in your preferred format</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-primary mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Full commercial rights to the final product</span>
                        </li>
                      </ul>
                      
                      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                      
                      <ol className="space-y-4 mb-6">
                        <li className="flex">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark font-bold mr-3">
                            1
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Place Your Order</h3>
                            <p className="text-light-darker text-sm">
                              Submit your order with details about your project and any reference materials.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark font-bold mr-3">
                            2
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Collaboration</h3>
                            <p className="text-light-darker text-sm">
                              We'll discuss your project in detail to ensure I understand your vision.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark font-bold mr-3">
                            3
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Delivery</h3>
                            <p className="text-light-darker text-sm">
                              Receive your completed project within {service.deliveryTime} days.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark font-bold mr-3">
                            4
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Revisions</h3>
                            <p className="text-light-darker text-sm">
                              Request up to {service.revisions} revisions to perfect the final product.
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="flex items-center mr-6">
                          <div className="text-4xl font-bold mr-2">{service.rating.toFixed(1)}</div>
                          <div>
                            <div className="flex text-yellow-500 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`${i < Math.round(service.rating) ? 'fill-current' : ''}`}
                                />
                              ))}
                            </div>
                            <div className="text-light-darker text-sm">{service.reviews} reviews</div>
                          </div>
                        </div>
                        
                        <div>
                          <button className="btn-outline">Write a Review</button>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-800 pb-6">
                            <div className="flex items-center mb-3">
                              <img
                                src={review.user.avatar}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-medium">{review.user.name}</div>
                                <div className="flex items-center">
                                  <div className="flex text-yellow-500 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="text-light-darker text-xs">
                                    {new Date(review.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-light-darker">{review.content}</p>
                          </div>
                        ))}
                      </div>
                      
                      {reviews.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-light-darker mb-4">No reviews yet</p>
                          <button className="btn-primary">Be the first to review</button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'seller' && (
                    <div>
                      <div className="flex items-center mb-6">
                        <img
                          src={service.sellerAvatar}
                          alt={service.sellerName}
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <h2 className="text-xl font-semibold mb-1">{service.sellerName}</h2>
                          <p className="text-light-darker">Professional Musician</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-dark-lighter rounded-lg p-4">
                          <div className="text-light-darker text-sm mb-1">Member Since</div>
                          <div>January 2023</div>
                        </div>
                        <div className="bg-dark-lighter rounded-lg p-4">
                          <div className="text-light-darker text-sm mb-1">Response Time</div>
                          <div>Within 24 hours</div>
                        </div>
                        <div className="bg-dark-lighter rounded-lg p-4">
                          <div className="text-light-darker text-sm mb-1">Services</div>
                          <div>5 active services</div>
                        </div>
                        <div className="bg-dark-lighter rounded-lg p-4">
                          <div className="text-light-darker text-sm mb-1">Completed Orders</div>
                          <div>32 orders</div>
                        </div>
                      </div>
                      
                      <p className="text-light-darker mb-6">
                        I'm a professional musician with over 10 years of experience in the industry. I specialize in guitar, production, and mixing. I've worked with various artists and bands, and I'm passionate about helping others bring their musical visions to life.
                      </p>
                      
                      <button className="btn-outline">
                        <FiMessageCircle className="mr-2" />
                        Contact Seller
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Card */}
              <div>
                <div className="card sticky top-24">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary mb-1">${service.price}</div>
                    <div className="flex items-center text-light-darker text-sm">
                      <FiClock className="mr-1" />
                      <span>{service.deliveryTime} day delivery</span>
                      <span className="mx-2">•</span>
                      <FiRefreshCw className="mr-1" />
                      <span>{service.revisions} revisions</span>
                    </div>
                  </div>
                  
                  <p className="text-light-darker text-sm mb-6">
                    This package includes everything you need for a professional {service.category.toLowerCase()} service.
                  </p>
                  
                  <button className="btn-primary w-full mb-3">
                    Order Now
                  </button>
                  
                  <button className="btn-outline w-full mb-6">
                    <FiMessageCircle className="mr-2" />
                    Contact Seller
                  </button>
                  
                  <div className="flex justify-between">
                    <button className="text-light-darker hover:text-light flex items-center">
                      <FiHeart className="mr-1" />
                      Save
                    </button>
                    <button className="text-light-darker hover:text-light flex items-center">
                      <FiShare2 className="mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Services */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Similar Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    to={`/services/${i}`}
                    className="card block overflow-hidden hover:bg-dark-lighter/80 transition-colors"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`https://images.pexels.com/photos/${1540406 + i * 100}/pexels-photo-${1540406 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                        alt="Service"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Similar Service Title</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span>4.8</span>
                          <span className="text-light-darker ml-1">(24)</span>
                        </div>
                        <div className="text-primary font-bold">$75</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
