import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:9000/user/current_user', {
          credentials: 'include', // Include credentials to send the session cookie
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          }
        } else {
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};