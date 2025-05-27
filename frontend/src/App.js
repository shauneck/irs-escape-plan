import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyPlan from "./pages/MyPlan";
import Explore from "./pages/Explore";
import Marketplace from "./pages/Marketplace";
import CourseDetail from "./pages/CourseDetail";
import AdvisorDashboard from './pages/AdvisorDashboard';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;