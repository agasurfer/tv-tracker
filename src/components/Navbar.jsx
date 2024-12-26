import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='container navbar'>
      <div className="logo">Tv <span>Bookmark</span></div>
      <div className={`navlinks ${menuOpen ? 'open' : ''}`}>
        <div className={`close-icon ${menuOpen ? 'visible' : ''}`} onClick={() => setMenuOpen(false)}>✖</div>
        <Link className='navlink' to="/" onClick={() => setMenuOpen(false)}>Search</Link>
        <Link className='navlink' to="/my-shows" onClick={() => setMenuOpen(false)}>My Shows</Link>
        <Link className='navlink' to="#" onClick={() => setMenuOpen(false)}>Discover</Link>
        <Link className='navlink' to="#" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default Navbar;

