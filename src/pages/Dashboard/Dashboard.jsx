import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsGraphUp,
  BsGearFill,
  BsFillCalendarFill,
  BsFillPinAngleFill
} from 'react-icons/bs';

function Dashboard() {
  const { user } = useAuth();

  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case 'intern':
        return <h2>Welcome, Intern!</h2>;
      case 'scrummaster':
        return <h2>Welcome, Scrum Master!</h2>;
      case 'hr':
        return <h2>Welcome, HR Manager!</h2>;
      default:
        return <h2>Welcome!</h2>;
    }
  };

  return (
    <div className="dashboard-content">
      {renderRoleSpecificContent()}
      <div className='welcome'>
        <h3>Welcome, {user.name}! 👋</h3>
      </div>

      <div className='notice-board'>
        <h3><BsFillPinAngleFill /> Notice Board</h3>
        <div className='notices'>
          <div className='notice'>
            <h4>Important Announcement</h4>
            <p>All interns are required to submit their monthly reports by the 5th of every month.</p>
          </div>
          <div className='notice'>
            <h4>Upcoming Webinar</h4>
            <p>Join us for a webinar on "Career Opportunities in Tech" on June 15th at 3 PM.</p>
          </div>
          <div className='notice'>
            <h4>Holiday Reminder</h4>
            <p>The office will be closed on July 4th for Independence Day.</p>
          </div>
        </div>
      </div>

      <div className='cards'>
        {[
          { title: 'View Attendance', icon: <BsFillArchiveFill /> },
          { title: 'Download Certificate', icon: <BsFillGrid3X3GapFill /> },
          { title: 'Rules And Regulations', icon: <BsPeopleFill /> },
          { title: 'Internship Status', icon: <BsFillBellFill /> },
          { title: 'Performance Metrics', icon: <BsGraphUp /> },
          { title: 'Stipend Eligibility', icon: <BsGearFill /> },
          { title: 'Upcoming Events', icon: <BsFillCalendarFill /> }
        ].map((card, index) => (
          <div key={index} className='card'>
            <div className='card-inner'>
              <div className='card-icon'>{card.icon}</div>
              <h3>{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className='activities'>
        <h3>Recent Activities</h3>
        <ul className='list'>
          <li className='list-item'>Submitted project report</li>
          <li className='list-item'>Downloaded certificate</li>
          <li className='list-item'>Updated internship status</li>
          <li className='list-item'>Attended webinar on React.js</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
