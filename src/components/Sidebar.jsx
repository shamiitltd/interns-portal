import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBoxArrowRight } from 'react-icons/bs';
import "./Sidebar.css";

const menuItems = [
  { path: "/dashboard", icon: <BsGrid1X2Fill className='icon' />, label: "Dashboard" },
  { path: "/notice-board", icon: <BsFillArchiveFill className='icon' />, label: "Notice Board" },
  { path: "/meetings-scheduled", icon: <BsFillGrid3X3GapFill className='icon' />, label: "Meetings Scheduled" },
  { path: "/performance-tracking", icon: <BsPeopleFill className='icon' />, label: "Performance Tracking" },
  { path: "/daily-emails", icon: <BsListCheck className='icon' />, label: "Daily Emails" },
  { path: "/reports", icon: <BsMenuButtonWideFill className='icon' />, label: "Reports" },
  { path: "/settings", icon: <BsFillGearFill className='icon' />, label: "Settings" },
];

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} activeClassName="active">
                {item.icon}
                <span className="link-text">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">
          <BsBoxArrowRight className='icon' />
          <span className="link-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
