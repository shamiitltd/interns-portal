import React, { useState, memo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import './HrDashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const PerformanceChart = memo(({ data }) => (
  <Bar data={data} options={{ responsive: true, animation: { duration: 2000 } }} />
));

const InternshipStatusChart = memo(({ data }) => (
  <Doughnut data={data} options={{ responsive: true, animation: { duration: 2000 } }} />
));

const CandidatePipelineChart = memo(({ data }) => (
  <Line data={data} options={{ responsive: true, animation: { duration: 2000 } }} />
));

function HrDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Performance Ratings',
      data: [4.5, 4.2, 4.8, 4.6, 4.7],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const internshipStatusData = {
    labels: ['Active', 'Terminated', 'Completed'],
    datasets: [{
      data: [10, 5, 15],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    }],
  };

  const candidatePipelineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Candidates in Pipeline',
      data: [12, 19, 3, 5, 2],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  return (
    <div className={`hr-dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header>
        <div className="logo-and-title">
          <img src="logo.png" alt="HR Logo" />
          <h1>HR Dashboard</h1>
        </div>
        <div className="hr-profile-and-notifications">
          <img src="hr-profile.png" alt="HR Profile" />
          <span className="notifications">5 notifications</span>
        </div>
      </header>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '◀' : '▶'}
      </button>
      <nav className={`navigation-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul>
          <li><a href="#">Performance Monitoring</a></li>
          <li><a href="#">Report Submission</a></li>
          <li><a href="#">Internship Status Overview</a></li>
          <li><a href="#">Leave Requests Management</a></li>
          <li><a href="#">Candidate Pipeline</a></li>
          <li><a href="#">Certificate Issuance Tracking</a></li>
          <li><a href="#">Meeting Scheduler</a></li>
          <li><a href="#">Employee Relations</a></li>
        </ul>
      </nav>
      <main className="main-content-area">
        <section className="internship-status">
          <h2>Internship Status</h2>
          <div className="chart-container">
            <InternshipStatusChart data={internshipStatusData} />
          </div>
        </section>
        <section className="performance-overview">
          <h2>Performance Overview</h2>
          <div className="chart-container">
            <PerformanceChart data={performanceData} />
          </div>
        </section>
        <section className="leave-management">
          <h2>Leave Management</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Vacation</td>
                <td>Pending</td>
                <td>
                  <button className="approve-btn">Approve</button>
                  <button className="reject-btn">Reject</button>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>Sick Leave</td>
                <td>Approved</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="candidate-pipeline">
          <h2>Candidate Pipeline</h2>
          <div className="chart-container">
            <CandidatePipelineChart data={candidatePipelineData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HrDashboard;