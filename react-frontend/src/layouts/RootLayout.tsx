import Footer from '../components/Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import "./root.css"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import MyProfile from '../components/Profile/MyProfile'

const RootLayout = () => {
  const navigate= useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


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