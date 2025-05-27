import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "My Plan", path: "/my-plan" },
    { name: "Explore", path: "/explore" },
    { name: "Documents", path: "/documents" },
    { name: "Community", path: "/community" },
    { name: "Marketplace", path: "/marketplace" },
  ];

  const exploreSubItems = [
    "Glossary",
    "Quiz Mode", 
    "Document Reader",
    "Free Course - Escape Blueprint"
  ];

  const isActive = (path) => location.pathname === path;

  // Theme toggle component
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="theme-toggle ml-4"
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

  return (
    <nav className="nav-container sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center nav-brand">
              <span className="text-2xl font-bold">
                <span className="text-primary">The IRS Escape Plan</span>
                <span className="text-accent ml-2 text-sm">by Quantus Group</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.name === "Explore" ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsExploreOpen(!isExploreOpen)}
                        className={`${
                          isActive(item.path)
                            ? "bg-yellow-100 text-yellow-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        } px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
                      >
                        {item.name}
                        <svg
                          className={`ml-1 h-4 w-4 transform transition-transform ${
                            isExploreOpen ? "rotate-180" : ""
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      
                      {/* Explore Dropdown */}
                      {isExploreOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                          {exploreSubItems.map((subItem) => (
                            <Link
                              key={subItem}
                              to={subItem === "Free Course - Escape Blueprint" ? "/escape-blueprint" : `/explore#${subItem.toLowerCase().replace(" ", "-")}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsExploreOpen(false)}
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`${
                        isActive(item.path)
                          ? "bg-yellow-100 text-yellow-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="text-muted hover:text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM16 3H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
              </button>
              <button className="btn-primary px-4 py-2 rounded-md text-sm font-medium">
                Upgrade
              </button>
              <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.name === "Explore" ? (
                  <div>
                    <button
                      onClick={() => setIsExploreOpen(!isExploreOpen)}
                      className={`${
                        isActive(item.path)
                          ? "bg-yellow-100 text-yellow-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      } w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between`}
                    >
                      {item.name}
                      <svg
                        className={`h-4 w-4 transform transition-transform ${
                          isExploreOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    
                    {/* Mobile Explore Submenu */}
                    {isExploreOpen && (
                      <div className="pl-4 mt-2 space-y-1">
                        {exploreSubItems.map((subItem) => (
                          <Link
                            key={subItem}
                            to={subItem === "Free Course - Escape Blueprint" ? "/escape-blueprint" : `/explore#${subItem.toLowerCase().replace(" ", "-")}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsExploreOpen(false);
                            }}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? "bg-yellow-100 text-yellow-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">User</span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Guest User</div>
                  <div className="text-sm text-gray-500">guest@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-3">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;