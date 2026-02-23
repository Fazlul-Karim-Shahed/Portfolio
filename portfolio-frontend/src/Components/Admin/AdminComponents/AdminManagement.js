import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [acceptNew, setAcceptNew] = useState(true);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const API = process.env.REACT_APP_BACKEND_API;

  const fetchAdmins = () => {
    axios.get(API + 'Admins.json').then(res => {
      if (res.data) {
        const list = Object.entries(res.data).map(([id, val]) => ({ id, ...val }));
        setAdmins(list);
      } else {
        setAdmins([]);
      }
    });
  };

  const fetchAcceptSetting = () => {
    axios.get(API + 'Settings/acceptNewAdmins.json').then(res => {
      setAcceptNew(res.data !== false);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdmins();
    fetchAcceptSetting();
    // eslint-disable-next-line
  }, []);

  const toggleAccept = () => {
    const newValue = !acceptNew;
    fetch(API + 'Settings/acceptNewAdmins.json', {
      method: 'PUT',
      body: JSON.stringify(newValue),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => setAcceptNew(newValue));
  };

  const deleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      axios.delete(`${API}Admins/${id}.json`).then(() => {
        setAdmins(prev => prev.filter(a => a.id !== id));
      });
    }
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center p-5'>
        <div className='spinner-border' style={{ color: 'var(--accent)' }} role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-4'>
      <h2 className='mb-4' style={{ color: 'var(--accent)', fontWeight: 700 }}>
        👥 Admin Management
      </h2>

      {/* Accept New Admins Toggle */}
      <div className='p-4 mb-4 rounded-4' style={{
        background: 'var(--bg-secondary, rgba(255,255,255,0.04))',
        border: '1px solid var(--border-color, rgba(0,0,0,0.1))',
        backdropFilter: 'blur(10px)'
      }}>
        <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
          <div>
            <h5 className='mb-1' style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Accept New Admin Registrations
            </h5>
            <p className='mb-0' style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {acceptNew
                ? '✅ New admins can sign up'
                : '🚫 Signups are currently disabled'}
            </p>
          </div>
          <div
            onClick={toggleAccept}
            style={{
              width: '3rem',
              height: '1.6rem',
              borderRadius: '1rem',
              backgroundColor: acceptNew ? '#6366f1' : '#ccc',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.3s ease',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '1.2rem',
              height: '1.2rem',
              borderRadius: '50%',
              backgroundColor: '#fff',
              position: 'absolute',
              top: '0.2rem',
              left: acceptNew ? '1.6rem' : '0.2rem',
              transition: 'left 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }} />
          </div>
        </div>
      </div>

      {/* Admin List */}
      <div className='p-4 rounded-4' style={{
        background: 'var(--bg-secondary, rgba(255,255,255,0.04))',
        border: '1px solid var(--border-color, rgba(0,0,0,0.1))',
        backdropFilter: 'blur(10px)'
      }}>
        <h5 className='mb-3' style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          All Admins ({admins.length})
        </h5>

        {admins.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No admins registered yet.</p>
        ) : (
          <div className='d-flex flex-column gap-3'>
            {admins.map((admin) => (
              <div
                key={admin.id}
                className='d-flex justify-content-between align-items-center p-3 rounded-3'
                style={{
                  background: 'var(--bg-secondary, rgba(255,255,255,0.03))',
                  border: '1px solid var(--border-color, rgba(0,0,0,0.08))',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <div className='d-flex align-items-center gap-2'>
                    <span style={{ fontSize: '1.3rem' }}>👤</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {admin.email}
                    </span>
                    {currentUser && admin.uid === currentUser.uid && (
                      <span className='badge rounded-pill' style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        fontSize: '0.7rem',
                        padding: '0.3rem 0.6rem'
                      }}>
                        You
                      </span>
                    )}
                  </div>
                  <small style={{ color: 'var(--text-secondary)' }}>
                    Joined: {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    }) : 'Unknown'}
                  </small>
                </div>
                {currentUser && admin.uid !== currentUser.uid && (
                  <button
                    className='btn btn-sm'
                    onClick={() => deleteAdmin(admin.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '10px',
                      padding: '0.4rem 0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
