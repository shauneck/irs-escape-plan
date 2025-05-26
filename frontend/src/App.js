import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import ModulePage from './pages/ModulePage';
import GlossaryPage from './pages/GlossaryPage';
import AIAssistantPage from './pages/AIAssistantPage';
import AIUpsellPage from './pages/AIUpsellPage';
import StrategyBuilderPage from './pages/StrategyBuilderPage';
import TaxCalculatorPage from './pages/TaxCalculatorPage';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Theme Context
export const ThemeContext = React.createContext();
export const APIContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ email: 'demo@example.com', name: 'Demo User' });

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('irs-escape-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('irs-escape-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // API helper functions
  const api = {
    baseUrl: API_BASE_URL,
    
    async get(endpoint) {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return response.json();
    },
    
    async post(endpoint, data) {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return response.json();
    }
  };

  return (
    <APIContext.Provider value={api}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <div className="app">
            <Header user={user} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/course/:courseId" element={<CoursePage user={user} />} />
                <Route path="/course/:courseId/module/:moduleId" element={<ModulePage user={user} />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/glossary/:termKey" element={<GlossaryPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage user={user} />} />
                <Route path="/ai-upsell" element={<AIUpsellPage />} />
                <Route path="/strategy-builder" element={<StrategyBuilderPage user={user} />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeContext.Provider>
    </APIContext.Provider>
  );
}

export default App;
