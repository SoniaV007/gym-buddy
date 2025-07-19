import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "./root.css"

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout