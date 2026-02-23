 import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Admin() {
  const [time, setTime] = useState(new Date().toLocaleString());
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin-Panel';
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const adminUri = '/admin-panel';
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const isAdminRoot = location.pathname === adminUri;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin-panel');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className='min-vh-100 d-flex flex-column' style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navbar */}
      <nav
        className='p-3 shadow-sm position-relative'
        style={{
          backdropFilter: 'blur(12px)',
          background: 'var(--navbar-bg)',
          borderBottom: '1px solid var(--border-color)',
          zIndex: 1000,
          transition: 'all 0.4s ease'
        }}
      >
        <div className='d-flex justify-content-between align-items-center w-100'>
          {/* Left Block: Logo */}
          <div className='d-flex align-items-center'>
            <Link to={''} className='fw-bold fs-3 text-decoration-none' style={{ color: 'var(--accent)' }}>🚀 Admin</Link>
          </div>

          {/* Middle Block: Links */}
          <div className='d-none d-lg-flex justify-content-center flex-grow-1 gap-4 align-items-center px-4'>
            <Link
              to="/"
              className='text-decoration-none position-relative nav-link-anim'
              style={{ color: 'var(--text-secondary)' }}
            >
              Home
            </Link>
            {['about', 'links', 'experience', 'testimonial', 'achievement', 'certification', 'resume', 'visitors', 'admins'].map((item, i) => (
              <Link
                key={i}
                to={`${adminUri}/${item}`}
                className='text-decoration-none position-relative nav-link-anim text-nowrap'
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          {/* Right Block */}
          <div className='d-none d-lg-flex gap-3 align-items-center'>
            <div className='fs-6' style={{ color: 'var(--accent)', textShadow: '0 0 10px var(--accent)' }}>{time}</div>

            <button
              onClick={toggleTheme}
              className='btn'
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--accent)',
                fontSize: '1.5rem',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '🌙' : '☀️'}
            </button>

            <button
              onClick={handleLogout}
              className='btn'
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              🚪 Logout
            </button>
          </div>

          <button
            className='btn d-lg-none'
            onClick={toggleMenu}
            aria-label='Toggle menu'
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            &#9776;
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`d-lg-none overflow-hidden transition-menu ${menuOpen ? 'menu-open' : 'menu-closed'}`}
        >
          <div className='d-flex flex-column mt-3'>
            <Link
              to="/"
              className='text-decoration-none py-2 px-1 nav-link-anim'
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {['about', 'links', 'experience', 'testimonial', 'achievement', 'certification', 'resume', 'visitors', 'admins'].map((item, i) => (
              <Link
                key={i}
                to={`${adminUri}/${item}`}
                className='text-decoration-none py-2 px-1 nav-link-anim'
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <div style={{ color: 'var(--accent)', textShadow: '0 0 10px var(--accent)' }}>{time}</div>
            <button
              onClick={toggleTheme}
              className='btn'
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--accent)',
                fontSize: '1.5rem',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '🌙' : '☀️'}
            </button>
            <button
              onClick={handleLogout}
              className='btn'
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '0.85rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '10px',
                fontWeight: 600
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex-grow-1'>
        {isAdminRoot ? (
          <div className='d-flex justify-content-center align-items-center h-100' style={{ background: 'var(--bg-primary)' }}>
            <div
              className='d-flex flex-column justify-content-center align-items-center text-center position-relative'
              style={{ height: 'calc(100vh - 80px)' }}
            >
              <h1 className='display-4' style={{ color: 'var(--accent)', textShadow: '0 0 15px var(--accent)' }}>👋 Welcome, Admin!</h1>
              <p className='fs-5' style={{ color: 'var(--text-secondary)' }}>Manage your content with ease.</p>
            </div>

          </div>
        ) : (
          <Outlet />
        )}
      </div>

      {/* Extra Styling */}
      <style>{`
        .nav-link-anim {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link-anim::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--accent);
          transition: width 0.3s ease;
        }

        .nav-link-anim:hover::after {
          width: 100%;
        }

        .nav-link-anim:hover {
          color: var(--accent) !important;
        }

        .transition-menu {
          max-height: 0;
          transition: max-height 0.4s ease-out;
        }

        .menu-open {
          max-height: 500px;
        }

        .menu-closed {
          max-height: 0;
        }

        .fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
