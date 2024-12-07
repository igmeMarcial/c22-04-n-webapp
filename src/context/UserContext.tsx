'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the type for your user (adjust as needed)
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties
}

// Create the context
export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {}
});

// Provider component
export function UserProvider({ 
  children, 
  initialUser 
}: { 
  children: React.ReactNode, 
  initialUser: User | null 
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the context
export function useUser() {
  return useContext(UserContext);
}