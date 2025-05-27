import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MyPlan from './pages/MyPlan';
import Explore from './pages/Explore';
import Marketplace from './pages/Marketplace';
import CourseDetail from './pages/CourseDetail';
import AdvisorDashboard from './pages/AdvisorDashboard';
import DocumentReader from './pages/DocumentReader';
import EscapeBlueprint from './pages/EscapeBlueprint';
import Community from './pages/Community';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-plan" element={<MyPlan />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/advisor" element={<AdvisorDashboard />} />
          <Route path="/documents" element={<DocumentReader />} />
          <Route path="/escape-blueprint" element={<EscapeBlueprint />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;