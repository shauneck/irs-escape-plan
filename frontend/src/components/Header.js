import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';

function Header({ user }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isActiveLink = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo">
            Q
          </Link>
          <Link to="/" className="brand-text">
            The IRS Escape Plan
          </Link>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link 
                to="/glossary" 
                className={`nav-link ${isActiveLink('/glossary') ? 'active' : ''}`}
              >
                Tax Glossary
              </Link>
            </li>
            <li>
              <Link 
                to="/ai-assistant" 
                className={`nav-link ${isActiveLink('/ai-assistant') ? 'active' : ''}`}
              >
                AI Assistant
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user && (
            <div className="user-info">
              <span>Welcome, {user.name}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
