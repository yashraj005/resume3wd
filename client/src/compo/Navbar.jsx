import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Using Lucide for icons (optional)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className='navbar'>
      <h1 className='brand'>3WD SOFTWARE</h1>

      <button className='hamburger' onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`navlink ${isOpen ? 'open' : ''}`}>
        <NavLink to="/whatweserve" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>What We Provide</NavLink>
        <NavLink to="/home" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/services" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink>
        <NavLink to="/blogs" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>3WD Blogs</NavLink>
        <NavLink to="/client" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Our Clients</NavLink>
        <NavLink to="/aboutus" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
        <NavLink to="/contactus" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Contact Us</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
