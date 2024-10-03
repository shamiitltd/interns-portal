import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const SidebarItem = ({ icon, text, active = false }) => (
  <li className={`flex items-center space-x-2 py-2 px-4 rounded ${active ? 'bg-indigo-700' : 'hover:bg-indigo-600'} transition-colors`}>
    {icon}
    <span>{text}</span>
  </li>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeInterns: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    // Fetch users and stats from API
    // This is a placeholder. Replace with actual API calls.
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = () => {
    // Placeholder for API call
    setUsers([
      { id: 1, name: 'John Doe', role: 'Intern', status: 'Active' },
      { id: 2, name: 'Jane Smith', role: 'Team Lead', status: 'Active' },
      // Add more users...
    ]);
  };

  const fetchStats = () => {
    // Placeholder for API call
    setStats({
      totalUsers: 50,
      activeInterns: 30,
      pendingApprovals: 5
    });
  };

  const pieData = {
    labels: ['Active Interns', 'Other Users'],
    datasets: [
      {
        data: [stats.activeInterns, stats.totalUsers - stats.activeInterns],
        backgroundColor: ['#4C51BF', '#9F7AEA'],
        hoverBackgroundColor: ['#434190', '#805AD5'],
      },
    ],
  };

  const barData = {
    labels: ['Total Users', 'Active Interns', 'Pending Approvals'],
    datasets: [
      {
        label: 'User Statistics',
        data: [stats.totalUsers, stats.activeInterns, stats.pendingApprovals],
        backgroundColor: ['#4C51BF', '#48BB78', '#F6AD55'],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul className="space-y-2">
          <SidebarItem icon={<i className="fas fa-tachometer-alt mr-2" />} text="Dashboard" active />
          <SidebarItem icon={<i className="fas fa-users mr-2" />} text="Users" />
          <SidebarItem icon={<i className="fas fa-clipboard-list mr-2" />} text="Reports" />
          <SidebarItem icon={<i className="fas fa-cog mr-2" />} text="Settings" />
        </ul>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Active Interns</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeInterns}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Pending Approvals</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pendingApprovals}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">User Distribution</h3>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
            <Bar data={barData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
