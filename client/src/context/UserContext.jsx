import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser  } from "aws-amplify/auth";
import * as queries from '../graphql/queries.js';
import { downloadData } from "@aws-amplify/storage";

const UserContext = createContext();

const client = generateClient({authMode: 'userPool'});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState('Guest');
  const [currentUser, setCurrentUser] = useState('')
  const [currentProfilePictureImageData, setCurrentProfilePictureImageData] = useState('')

  const updateUserContext = async () => {
    try {
      const user = await getCurrentUser();
      const result = await client.graphql({
        query: queries.getUser,
        variables: { id: user.userId }
      });
      setCurrentUser(result.data.getUser)

      try {
        const imageUrl = result.data.getUser.profilePicture;
        const imageData = await downloadData({ key: imageUrl })
          .result;
        setCurrentProfilePictureImageData(imageData)
      } catch (error) {
        console.error("Error fetching image for post:", error);
        setCurrentProfilePicture('');
      }
    } catch (error) {
      console.log("Error fetching username:", error)
      setCurrentUser('')
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
      setCurrentUser(result.data.getUser);
    } catch (error) {
      setUserState('Guest');
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    assessUserState();
    updateUserContext();
  }, []);

  return (
    <UserContext.Provider value={{ userState, currentUser, currentProfilePictureImageData, assessUserState, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);