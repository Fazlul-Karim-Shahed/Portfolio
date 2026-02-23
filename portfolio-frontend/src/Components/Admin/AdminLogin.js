import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';
import './AdminLogin.css';

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, signup } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Check if signups are accepted
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_API + 'Settings/acceptNewAdmins.json'
        );
        if (res.data === false) {
          setLoading(false);
          return setError('New admin registrations are currently disabled');
        }

        const result = await signup(email, password);

        // Save admin info to DB
        await axios.post(process.env.REACT_APP_BACKEND_API + 'Admins.json', {
          email: email,
          createdAt: new Date().toISOString(),
          uid: result.user.uid
        });
      } else {
        await login(email, password);
      }
      // Auth state change will cause AdminGate to re-render and show Admin
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError(err.message || 'An error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className='admin-login-page'>
      {/* Animated background */}
      <div className='admin-login-bg'>
        <div className='admin-login-orb admin-login-orb-1'></div>
        <div className='admin-login-orb admin-login-orb-2'></div>
        <div className='admin-login-orb admin-login-orb-3'></div>
      </div>

      {/* Theme toggle */}
      <button
        className='admin-login-theme-btn'
        onClick={toggleTheme}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? '🌙' : '☀️'}
      </button>

      <div className='admin-login-card'>
        {/* Logo area */}
        <div className='admin-login-logo'>
          <div className='admin-login-logo-icon'>🔐</div>
          <h1 className='admin-login-title'>Admin Panel</h1>
          <p className='admin-login-subtitle'>
            {isSignUp ? 'Create your admin account' : 'Sign in to manage your portfolio'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className='admin-login-error'>
            <span className='admin-login-error-icon'>⚠️</span>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='admin-login-form'>
          <div className='admin-login-field'>
            <label className='admin-login-label'>Email</label>
            <div className='admin-login-input-wrap'>
              <span className='admin-login-input-icon'>✉️</span>
              <input
                type='email'
                className='admin-login-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='admin@example.com'
                required
              />
            </div>
          </div>

          <div className='admin-login-field'>
            <label className='admin-login-label'>Password</label>
            <div className='admin-login-input-wrap'>
              <span className='admin-login-input-icon'>🔑</span>
              <input
                type={showPassword ? 'text' : 'password'}
                className='admin-login-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                required
              />
              <button
                type='button'
                className='admin-login-eye-btn'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className='admin-login-field admin-login-field-animate'>
              <label className='admin-login-label'>Confirm Password</label>
              <div className='admin-login-input-wrap'>
                <span className='admin-login-input-icon'>🔑</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='admin-login-input'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>
          )}

          <button
            type='submit'
            className='admin-login-submit'
            disabled={loading}
          >
            {loading ? (
              <span className='admin-login-spinner'></span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className='admin-login-toggle'>
          <span className='admin-login-toggle-text'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button
            className='admin-login-toggle-btn'
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        {/* Session info */}
        <div className='admin-login-session-info'>
          🕐 Sessions are valid for 3 hours
        </div>
      </div>
    </div>
  );
}
