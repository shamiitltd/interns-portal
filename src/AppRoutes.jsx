import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import InternDashboard from './pages/Dashboard/InternDashboard';
import ScrumMasterDashboard from './pages/Dashboard/ScrumMasterDashboard';
import HRDashboard from './pages/Dashboard/HRDashboard';
import TeamLeadDashboard from './pages/Dashboard/TeamLeadDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import { useAuth } from './contexts/AuthContext';
import ReportSubmission from './pages/ReportSubmission/ReportSubmission';

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/intern-dashboard" element={
        <PrivateRoute allowedRoles={['intern', 'scrummaster', 'hr', 'teamlead', 'admin']}>
          <InternDashboard />
        </PrivateRoute>
      } />
      <Route path="/scrummaster-dashboard" element={
        <PrivateRoute allowedRoles={['scrummaster', 'hr', 'teamlead', 'admin']}>
          <ScrumMasterDashboard />
        </PrivateRoute>
      } />
      <Route path="/hr-dashboard" element={
        <PrivateRoute allowedRoles={['hr', 'admin']}>
          <HRDashboard />
        </PrivateRoute>
      } />
      <Route path="/teamlead-dashboard" element={
        <PrivateRoute allowedRoles={['teamlead', 'admin']}>
          <TeamLeadDashboard />
        </PrivateRoute>
      } />
      <Route path="/admin-dashboard" element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      } />
      <Route path="/submit-report" element={
        <PrivateRoute allowedRoles={['intern', 'scrummaster', 'teamlead']}>
          <ReportSubmission />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default AppRoutes;
