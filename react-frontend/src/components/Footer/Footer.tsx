import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h4>Gym Buddy</h4>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
        <div className='footer-section'>
          <h5>Navigate</h5>
          <ul className='footer-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/routines">Routines</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
          </ul>
        </div>
        <div className='footer-section'>
          <h5>Follow Us</h5>
          <div className='social-links'>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;