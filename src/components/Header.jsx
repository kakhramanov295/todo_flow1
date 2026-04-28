import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, CheckCircle2 } from 'lucide-react';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, background: 'none', webkitTextFillColor: 'white' }}>FocusFlow</h1>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Minimal Task Management</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>
                {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
                {user.user_metadata?.full_name || user.email.split('@')[0]}
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="add-btn" 
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                color: '#ef4444',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              <LogOut size={18} />
              <span style={{ fontSize: '0.9rem' }}>Logout</span>
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="filter-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Login</Link>
            <Link to="/register" className="add-btn" style={{ textDecoration: 'none', padding: '0.6rem 1.25rem' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};
