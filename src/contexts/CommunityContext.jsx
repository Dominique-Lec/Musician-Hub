import { createContext, useContext, useState } from 'react';

const CommunityContext = createContext();

export const useCommunity = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);

  // In a real app, these would make API calls
  const getCommunities = () => {
    // Placeholder for API call
    return communities;
  };

  const getCommunityById = (id) => {
    return communities.find(community => community.id === id);
  };

  const createCommunity = (communityData) => {
    const newCommunity = {
      id: Date.now().toString(),
      ...communityData,
      createdAt: new Date().toISOString(),
    };
    setCommunities([...communities, newCommunity]);
    return newCommunity;
  };

  return (
    <CommunityContext.Provider value={{ 
      communities, 
      getCommunities, 
      getCommunityById, 
      createCommunity 
    }}>
      {children}
    </CommunityContext.Provider>
  );
};
