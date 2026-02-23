import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Admin from './Admin';
import AdminLogin from './AdminLogin';

export default function AdminGate() {
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
    return <AdminLogin />;
  }

  return <Admin />;
}
