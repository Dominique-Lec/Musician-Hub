import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  // In a real app, these would make API calls
  const getServices = (communityId) => {
    if (communityId === 'all') {
      return services;
    }
    return services.filter(service => service.communityId === communityId);
  };

  const getServiceById = (id) => {
    return services.find(service => service.id === id);
  };

  const createService = (serviceData) => {
    const newService = {
      id: Date.now().toString(),
      ...serviceData,
      createdAt: new Date().toISOString(),
    };
    setServices([...services, newService]);
    return newService;
  };

  return (
    <ServiceContext.Provider value={{ 
      services, 
      getServices, 
      getServiceById, 
      createService 
    }}>
      {children}
    </ServiceContext.Provider>
  );
};
