// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Registration/RegistrationForm';
import ForgotPassword from './pages/Login/PasswordReset';
import AdminDashboard from './components/Dashboard/AdminDashboard/AdminDashboard';
import TeamLeadDashboard from './components/Dashboard/TeamleadDashboard/TeamLeadDashboard';
import ScrumMasterDashboard from './components/Dashboard/ScrummasterDashboard/ScrumMasterDashboard';
import InternDashboard from './components/Dashboard/InternDashboard/InternDashboard';
import HrDashboard from './components/Dashboard/HrDashboard/HrDashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teamlead-dashboard"
          element={
            <PrivateRoute>
              <TeamLeadDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/scrummaster-dashboard"
          element={
            <PrivateRoute>
              <ScrumMasterDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/intern-dashboard"
          element={
            <PrivateRoute>
              <InternDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/hr-dashboard"
          element={
            <PrivateRoute>
              <HrDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
