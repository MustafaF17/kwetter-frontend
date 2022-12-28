import React from 'react'
import { Link } from "react-router-dom";
import './Nav.css';
import logo from '../logo.png';
import { useNavigate } from "react-router-dom";





function Nav() {

  const navigate=useNavigate();
  const logout = async => {

    console.log("Logged out");
    localStorage.setItem('token','');
    navigate('/login')
    
  
    }

  return (

    <nav>
      <div className="logo">
      <img className='icon' src={logo} alt='Kwetter'></img>
      </div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars" />
      </label>
      <ul>
        <li><Link to="/timeline">Timeline</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </nav>
  )
}

export default Nav;
