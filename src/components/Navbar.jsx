import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='container navbar'>
        <div className="logo">Tv <span>Bookmark</span></div>
            <div  className="navlinks">
            <Link className='navlink' to="/">Search</Link>
            <Link className='navlink' to="/my-shows">My Shows</Link>
            <Link className='navlink' to="#">Discover</Link>
            <Link className='navlink' to="#">Contact</Link>
            
        </div>
    </div>
  )
}

export default Navbar