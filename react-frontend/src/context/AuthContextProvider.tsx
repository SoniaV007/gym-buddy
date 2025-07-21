import React, {createContext, useContext, useState, type ReactNode } from 'react'
import type { UserDetails } from '../interfaces/user/user'

interface AuthContextInterface{
    isLoggedIn : boolean,
    setLoggedInStatus : (status : boolean) => void,
    user : UserDetails | null,
    setUserData : (data : UserDetails) => void,  
    logout : () => void
}

const AutherisationContext = createContext<AuthContextInterface | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUserData] = useState<UserDetails | null>(null);
    const logout = () => {
      setIsLoggedIn(false);
      return;
    };

    const authObject : AuthContextInterface = {
        isLoggedIn : isLoggedIn,
        setLoggedInStatus : setIsLoggedIn, 
        user : user,
        setUserData : setUserData,
        logout : logout
    }

  return (
    <AutherisationContext.Provider value={authObject}>
        {children}
    </AutherisationContext.Provider>
  )
}

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AutherisationContext);
  if(!context)     throw new Error('useAuthContext must be used within an AuthContextProvider');
  return context;
  
}