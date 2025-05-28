import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Essential top navigation items
  const topNavItems = [
    { name: "Courses", path: "/" },
    { name: "Glossary", path: "/explore" },
    { name: "Community", path: "/community" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // Menu dropdown items
  const menuItems = [
    { name: "My Plan", path: "/my-plan", icon: "📋" },
    { name: "Dashboard", path: "/dashboard", icon: "🎯" },
    { name: "Tools", path: "/tools", icon: "🔧" },
    { name: "Strategy Playbooks", path: "/tools/strategy-playbooks", icon: "📚" },
    { name: "Community", path: "/community", icon: "💬" },
    { name: "Documents", path: "/documents", icon: "📄", conditional: true }, // Only if user has uploads
    { name: "Advisor Mode", path: "/advisor", icon: "👨‍💼", adminOnly: true },
    { name: "Account Settings", path: "/settings", icon: "⚙️" },
    { name: "Log Out", path: "/logout", icon: "🚪", isAction: true },
  ];

  const isActive = (path) => location.pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Theme toggle component
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );

  // Menu toggle button
  const MenuToggle = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="menu-toggle"
      aria-label="Open menu"
      title="Menu"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  // Menu dropdown/sidebar
  const MenuDropdown = () => (
    <>
      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div 
          className="menu-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Menu content */}
      <div
        ref={menuRef}
        className={`menu-dropdown ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}
      >
        <div className="menu-header">
          <h3 className="text-lg font-semibold text-primary mb-4">Menu</h3>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="menu-close-btn"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="menu-nav">
          {menuItems.map((item) => {
            // Skip conditional items based on user state
            if (item.conditional && !hasUserDocuments()) return null;
            if (item.adminOnly && !isAdmin()) return null;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`menu-item ${isActive(item.path) ? 'menu-item-active' : ''} ${
                  item.isAction ? 'menu-item-action' : ''
                }`}
                onClick={item.isAction ? handleLogout : undefined}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-text">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info section */}
        <div className="menu-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
            <div className="user-details">
              <div className="text-sm font-medium text-primary">John Doe</div>
              <div className="text-xs text-muted">Gold Member</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Helper functions
  const hasUserDocuments = () => {
    // Check if user has uploaded documents
    const userDocs = localStorage.getItem('userDocuments');
    return userDocs && JSON.parse(userDocs).length > 0;
  };

  const isAdmin = () => {
    // Check if user has admin privileges
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Handle logout logic here
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    // Redirect to login or home
    window.location.href = '/';
  };

  return (
    <nav className="nav-container sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="nav-brand flex items-center">
              <span className="text-xl font-bold">
                <span className="text-primary">The IRS Escape Plan</span>
                <span className="text-accent ml-2 text-sm">by Quantus Group</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {topNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'text-accent bg-secondary bg-opacity-10 scale-105'
                    : 'text-primary hover:text-accent hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <div className="relative">
              <MenuToggle />
              <MenuDropdown />
            </div>
          </div>
        </div>

        {/* Mobile top nav items */}
        <div className="md:hidden border-t border-light mt-2 pt-2">
          <div className="flex space-x-4 overflow-x-auto">
            {topNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link-mobile whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-accent bg-secondary bg-opacity-10'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;