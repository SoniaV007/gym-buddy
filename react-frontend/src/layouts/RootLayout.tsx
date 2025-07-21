import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "./root.css"
import MyProfile from '../components/MyProfile'
import { useAuthContext } from '../context/AuthContextProvider'
import { useState } from 'react'

const RootLayout = () => {
  const navigate= useNavigate();
  const authContext = useAuthContext();
  const isLoggedIn : boolean= authContext.isLoggedIn;

  const [profilePopUpVisible , changeVisibility] = useState(false);
  return (
    <div className="root-layout">
      <div className='header'>
      <Navbar />
      {!isLoggedIn && <button onClick={() => navigate("/signup")}>Login | Signup</button>}

      {isLoggedIn && 
       <button onClick={() => changeVisibility((prevVal) => !prevVal)}> Profile </button>
      }
      {
       (isLoggedIn && profilePopUpVisible) &&  <MyProfile />
      }

      </div>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout