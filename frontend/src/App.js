import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ModulePage from './pages/ModulePage';
import ToolsPage from './pages/ToolsPage';
import GlossaryPage from './pages/GlossaryPage';
import TaxCalculator from './pages/TaxCalculator';
import StrategyBuilder from './pages/StrategyBuilder';
import AIAssistantLanding from './pages/AIAssistantLanding';
import TaxCalculatorLanding from './pages/TaxCalculatorLanding';
import StrategyBuilderLanding from './pages/StrategyBuilderLanding';

// Theme Context
export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ email: 'demo@example.com', name: 'Demo User' }); // Mock user for demo

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const themeValue = {
    theme,
    toggleTheme,
    user,
    setUser
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route path="/course/:courseId/module/:moduleId" element={<ModulePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/calculator" element={<TaxCalculator />} />
              <Route path="/strategies" element={<StrategyBuilder />} />
              <Route path="/ai-assistant" element={<AIAssistantLanding />} />
              <Route path="/tax-calculator" element={<TaxCalculatorLanding />} />
              <Route path="/strategy-builder" element={<StrategyBuilderLanding />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;