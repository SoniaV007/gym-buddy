import {logout} from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

const MyProfile = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    
    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
  };

  return (
    <div className='profilePop'>
        <h2>Profile</h2>
        <p>Name: {user?.name}</p> 
        <p>Email: {user?.email}</p> 
        <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default MyProfile;