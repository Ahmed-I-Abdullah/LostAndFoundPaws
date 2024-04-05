import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser  } from "aws-amplify/auth";
import * as queries from '../graphql/queries.js';

const UserContext = createContext();

const client = generateClient({authMode: 'userPool'});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState('Guest');
  const [currentUser, setCurrentUser] = useState(null)

  const updateUsername = async () => {
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: queries.getUser,
        variables: { id: user.userId }
      });
      setCurrentUser(result.data.getUser)
    } catch (error) {
      console.log("Error fetching username:", error)
      setCurrentUser(null)
    }
  };

  const assessUserState = async () => {
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: queries.getUser,
        variables: { id: user.userId }
      });
      if(result.data.getUser.role == 'ADMIN'){
        setUserState('Admin');
      }
      else{
        setUserState('Poster');
      }
    } catch (error) {
      setUserState('Guest');
    }
  };

  useEffect(() => {
    assessUserState();
    updateUsername();
  }, []);

  return (
    <UserContext.Provider value={{ userState, currentUser, assessUserState, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);