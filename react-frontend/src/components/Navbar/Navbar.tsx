import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">   
        <NavLink to="/" className={ ({isActive}) => isActive ? "navbar__link navbar__link--active" : "navbar__link" }>Home</NavLink>
        <NavLink to="/exercises" className={ ({isActive}) => isActive ? "navbar__link navbar__link--active" : "navbar__link" } >Excercises</NavLink>
        <NavLink to="/routines" className={ ({isActive}) => isActive ? "navbar__link navbar__link--active" : "navbar__link" } >Routines</NavLink>
        <NavLink to="/log-workout" className={ ({isActive}) => isActive ? "navbar__link navbar__link--active" : "navbar__link" } >Log Workout</NavLink>
    </div>
  )
}

export default Navbar