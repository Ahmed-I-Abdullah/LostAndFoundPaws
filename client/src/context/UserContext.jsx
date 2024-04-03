import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser  } from "aws-amplify/auth";
import * as queries from '../graphql/queries.js';

const UserContext = createContext();

const client = generateClient({authMode: 'userPool'});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState('Guest');

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
  }, []);

  return (
    <UserContext.Provider value={{ userState, assessUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);