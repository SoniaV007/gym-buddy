import { useAuthContext } from '../context/AuthContextProvider';
import type { UserDetails } from '../interfaces/user/user';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const MyProfile = () => {
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const user: UserDetails | null = authContext.user; 
    
    const logout = () => {
        authContext.logout(); 
        navigate("/");
    };

  return (
    <div className='profilePop'>
        <h2>Profile</h2>
        <p>Name: {user?.name}</p> 
        <p>Email: {user?.email}</p> 
        <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default MyProfile;