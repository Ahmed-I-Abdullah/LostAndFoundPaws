import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signIn, signOut  } from "aws-amplify/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState('Guest');

  const assessUserState = async () => {
    try {
      const user = await getCurrentUser();
      console.log("ABC123");
      console.log(user);
      const role = await fetchUserRole(user.ID);
      setUserState(role);
    } catch (error) {
      console.log("123ABC");
      setUserState('Guest');
    }
  };

  useEffect(() => {
    console.log("OHHHHNOOOOOOOOOO");
    assessUserState();
  }, []);

  const signinUser = async (username, password) => {
    try {
      console.log("attempt sign in");
      await signIn({ username, password });
      await assessUserState();
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  const logout = async () => {
    try {
      console.log("attempt logout");
      await signOut();
      setUserState('guest');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <UserContext.Provider value={{ userState, signinUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);