import React, { useState, memo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import './ScrumMasterDashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const SprintOverviewChart = memo(({ data }) => (
  <Bar data={data} options={{ responsive: true, animation: { duration: 2000 } }} />
));

const TeamPerformanceChart = memo(({ data }) => (
  <Line data={data} options={{ responsive: true, animation: { duration: 2000 } }} />
));

function ScrumMasterDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard-overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sprintOverviewData = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3'],
    datasets: [{
      label: 'Completion Rates',
      data: [95, 88, 92],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const teamPerformanceData = {
    labels: ['Velocity', 'Efficiency'],
    datasets: [{
      label: 'Team Performance',
      data: [75, 82],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  return (
    <div className={`scrum-dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header>
        <div className="logo-and-title">
          <img src="scrum-logo.png" alt="Scrum Logo" />
          <h1>Scrum Dashboard</h1>
        </div>
        <div className="profile-and-notifications">
          <img src="scrum-master-profile.png" alt="Scrum Master Profile" />
          <span className="notifications">3 sprint notifications</span>
        </div>
      </header>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '◀' : '▶'}
      </button>
      <nav className="navigation-sidebar">
        <ul>
          <li className={activeTab === 'dashboard-overview' ? 'active' : ''} onClick={() => setActiveTab('dashboard-overview')}>
            <a href="#">Dashboard Overview</a>
          </li>
          <li className={activeTab === 'sprint-overview' ? 'active' : ''} onClick={() => setActiveTab('sprint-overview')}>
            <a href="#">Sprint Overview</a>
          </li>
          <li className={activeTab === 'task-management' ? 'active' : ''} onClick={() => setActiveTab('task-management')}>
            <a href="#">Task Management</a>
          </li>
          <li className={activeTab === 'team-performance' ? 'active' : ''} onClick={() => setActiveTab('team-performance')}>
            <a href="#">Team Performance Monitoring</a>
          </li>
          <li className={activeTab === 'report-submission' ? 'active' : ''} onClick={() => setActiveTab('report-submission')}>
            <a href="#">Report Submission</a>
          </li>
          <li className={activeTab === 'meeting-scheduler' ? 'active' : ''} onClick={() => setActiveTab('meeting-scheduler')}>
            <a href="#">Meeting Scheduler</a>
          </li>
          <li className={activeTab === 'leave-requests' ? 'active' : ''} onClick={() => setActiveTab('leave-requests')}>
            <a href="#">Leave Requests</a>
          </li>
          <li className={activeTab === 'notice-board' ? 'active' : ''} onClick={() => setActiveTab('notice-board')}>
            <a href="#">Notice Board</a>
          </li>
        </ul>
      </nav>
      <main className="main-content-area">
        {activeTab === 'dashboard-overview' && (
          <section className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="overview-content">
              <p>Welcome to the Scrum Master Dashboard. This dashboard provides a comprehensive view of your team's performance, sprint progress, and important project metrics.</p>
              <h3>Key Features:</h3>
              <ul>
                <li>Sprint Overview: Track current sprint progress and completion rates</li>
                <li>Task Management: Manage and monitor tasks across different stages</li>
                <li>Team Performance: Visualize team velocity and efficiency</li>
                <li>Report Submission: Submit sprint review reports</li>
                <li>Meeting Scheduler: Schedule and track important meetings</li>
                <li>Leave Requests: Manage team member leave requests</li>
                <li>Notice Board: Post and view important announcements</li>
              </ul>
              <p>Use the navigation sidebar to access different sections of the dashboard. Stay on top of your team's progress and ensure smooth project execution.</p>
            </div>
          </section>
        )}
        {activeTab === 'sprint-overview' && (
          <section className="sprint-overview">
            <h2>Sprint Overview</h2>
            <div className="sprint-progress">
              <h3>Current Sprint Progress</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: '65%' }}>65%</div>
              </div>
            </div>
            <div className="completion-rates">
              <h3>Completion Rates</h3>
              <div className="chart-container">
                <SprintOverviewChart data={sprintOverviewData} />
              </div>
            </div>
          </section>
        )}
        {activeTab === 'task-management' && (
          <section className="task-management">
            <h2>Task Management</h2>
            <div className="task-columns">
              <div className="task-column">
                <h3>Backlog</h3>
                <ul className="task-list">
                  <li>Task 1</li>
                  <li>Task 2</li>
                  <li>Task 3</li>
                </ul>
              </div>
              <div className="task-column">
                <h3>In Progress</h3>
                <ul className="task-list">
                  <li>Task 4</li>
                  <li>Task 5</li>
                </ul>
              </div>
              <div className="task-column">
                <h3>Done</h3>
                <ul className="task-list">
                  <li>Task 6</li>
                  <li>Task 7</li>
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'team-performance' && (
          <section className="team-performance">
            <h2>Team Performance Monitoring</h2>
            <div className="performance-graphs">
              <div className="graph">
                <h3>Team Velocity</h3>
                <div className="chart-container">
                  <TeamPerformanceChart data={teamPerformanceData} />
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'report-submission' && (
          <section className="report-submission">
            <h2>Report Submission</h2>
            <div className="report-form">
              <h3>Sprint Review Report</h3>
              <form>
                <textarea placeholder="Enter report details"></textarea>
                <button type="submit">Submit Report</button>
              </form>
            </div>
          </section>
        )}
        {activeTab === 'meeting-scheduler' && (
          <section className="meeting-scheduler">
            <h2>Meeting Scheduler</h2>
            <div className="meeting-schedule">
              <h3>Sprint Planning Meeting</h3>
              <p>Scheduled for: 2023-02-15 10:00 AM</p>
            </div>
          </section>
        )}
        {activeTab === 'leave-requests' && (
          <section className="leave-requests">
            <h2>Leave Requests</h2>
            <div className="leave-request-list">
              <ul>
                <li>John Doe: 2023-02-10 - 2023-02-12</li>
                <li>Jane Doe: 2023-02-15 - 2023-02-17</li>
              </ul>
            </div>
          </section>
        )}
        {activeTab === 'notice-board' && (
          <section className="notice-board">
            <h2>Notice Board</h2>
            <div className="notice-list">
              <ul>
                <li>Scrum meeting rescheduled to 2023-02-15 10:00 AM</li>
                <li>New sprint goals announced</li>
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default ScrumMasterDashboard;