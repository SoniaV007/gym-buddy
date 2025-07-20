import React from 'react'
import { useAuthContext } from '../context/AuthContextProvider'
import type { UserDetails } from '../interfaces/user/user';

const MyProfile = () => {
    const authContext = useAuthContext();
    const user : UserDetails | null = authContext.user;

  return (
    <div>
        Profile 
        Name: {user?.name}
        EMail: {user?.email}
    </div>
  )
}

export default MyProfile