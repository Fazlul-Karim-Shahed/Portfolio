import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser, isSessionValid, loading } = useAuth();

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'
        style={{ background: 'var(--bg-primary)' }}>
        <div className='spinner-border' style={{ color: 'var(--accent)' }} role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser || !isSessionValid()) {
    return <Navigate to='/admin-panel' replace />;
  }

  return children;
}
