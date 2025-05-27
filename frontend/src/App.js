import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MyPlan from './pages/MyPlan';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Tools from './pages/Tools';
import StrategyPlaybooks from './pages/StrategyPlaybooks';
import Marketplace from './pages/Marketplace';
import CourseDetail from './pages/CourseDetail';
import AdvisorDashboard from './pages/AdvisorDashboard';
import DocumentReader from './pages/DocumentReader';
import EscapeBlueprint from './pages/EscapeBlueprint';
import Community from './pages/Community';
import './App.css';

function App() {
  // Theme management state
  const [theme, setTheme] = useState('light');

  // Detect system preference and initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('quantus-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.body.className = 'dark';
    } else {
      setTheme('light');
      document.body.className = 'light';
    }
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('quantus-theme', newTheme);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-primary text-primary">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-plan" element={<MyPlan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/advisor" element={<AdvisorDashboard />} />
          <Route path="/documents" element={<DocumentReader />} />
          <Route path="/escape-blueprint" element={<EscapeBlueprint />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;