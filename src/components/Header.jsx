import React from 'react';
import { Tooltip } from 'react-tooltip';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
    
      <div className='header-left'>
        <div className='portal-title'>
          Intern Portal
        </div>
        <div className='search-container'>
          <BsSearch className='icon search-icon' />
          <input 
            type="search" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
      </div>
      <div className='header-right'>
        <Link to="/notifications" className='header-link' data-tooltip-id="header-tooltip" data-tooltip-content="Notifications">
          <BsFillBellFill className='icon' /> 
        </Link>
        <Link to="/messages" className='header-link' data-tooltip-id="header-tooltip" data-tooltip-content="Messages">
          <BsFillEnvelopeFill className='icon' /> 
        </Link>
        <Link to="/profile" className='header-link' data-tooltip-id="header-tooltip" data-tooltip-content="Profile">
          <BsPersonCircle className='icon' /> 
         
        </Link>
      </div>
      <Tooltip id="header-tooltip" place="bottom" effect="solid" />
    </header>
  );
}

export default Header;
