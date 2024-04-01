import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser  } from "aws-amplify/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState('Guest');

  const assessUserState = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Logged In");
      console.log(user);
      //TODO UPDATE THIS FOR ADMIN CHECKS WHEN FIGURE OUT HOW
      setUserState('Admin');
    } catch (error) {
      console.log("Not Logged In");
      setUserState('Guest');
    }
  };

  useEffect(() => {
    console.log("Hello");
    assessUserState();
  }, []);

  return (
    <UserContext.Provider value={{ userState, assessUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);