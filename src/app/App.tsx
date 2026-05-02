import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useAuth } from './AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppShell from './components/layout/AppShell';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateMoodSpace from './pages/CreateMoodSpace';
import MoodDetail from './pages/MoodDetail';
import EditMood from './pages/EditMood';
import Profile from './pages/Profile';
import Community from './pages/Community';
import SavedSpaces from './pages/SavedSpaces';
import Timeline from './pages/Timeline';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFEFB' }}>
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full mx-auto animate-spin"
            style={{ border: '3px solid #e8e8f0', borderTopColor: '#6A7FDB' }} />
          <p className="text-sm" style={{ color: '#A9B8FF', fontFamily: 'var(--font-heading)' }}>
            Loading Reverie…
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

      {/* Protected routes wrapped in AppShell sidebar layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/saved" element={<SavedSpaces />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/create" element={<CreateMoodSpace />} />
          <Route path="/mood/:id" element={<MoodDetail />} />
          <Route path="/mood/:id/edit" element={<EditMood />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
