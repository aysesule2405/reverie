import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFEFB' }}>
        <div className="w-8 h-8 rounded-full animate-spin"
          style={{ border: '3px solid #e8e8f0', borderTopColor: '#6A7FDB' }} />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
