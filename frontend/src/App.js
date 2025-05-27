import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mock data for course modules
const courseModules = [
  {
    id: 1,
    title: "Tax Fundamentals & Strategy",
    hook: "Master the basics and build your foundation for tax optimization",
    image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
    progress: 85,
    duration: "2.5 hours"
  },
  {
    id: 2,
    title: "Business Tax Strategies",
    hook: "Unlock powerful deductions and structures for entrepreneurs",
    image: "https://images.pexels.com/photos/32270056/pexels-photo-32270056.jpeg",
    progress: 62,
    duration: "3 hours"
  },
  {
    id: 3,
    title: "Personal Deduction Mastery",
    hook: "Maximize your personal tax savings with advanced deduction strategies",
    image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
    progress: 90,
    duration: "2 hours"
  },
  {
    id: 4,
    title: "Real Estate Tax Benefits",
    hook: "Leverage property investments for maximum tax advantages",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    progress: 45,
    duration: "2.5 hours"
  },
  {
    id: 5,
    title: "Retirement Planning & Tax Optimization",
    hook: "Secure your future while minimizing tax burdens today",
    image: "https://images.pexels.com/photos/32219704/pexels-photo-32219704.jpeg",
    progress: 30,
    duration: "3.5 hours"
  },
  {
    id: 6,
    title: "Investment Tax Strategies",
    hook: "Smart investing techniques to reduce capital gains tax",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
    progress: 75,
    duration: "2.5 hours"
  },
  {
    id: 7,
    title: "Advanced Tax Consultation",
    hook: "Professional strategies used by top tax advisors",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    progress: 15,
    duration: "4 hours"
  },
  {
    id: 8,
    title: "Tax Data Analysis & Reporting",
    hook: "Use data-driven insights to optimize your tax position",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    progress: 0,
    duration: "2 hours"
  },
  {
    id: 9,
    title: "Legal Tax Avoidance Methods",
    hook: "Stay compliant while minimizing your tax obligations",
    image: "https://images.pexels.com/photos/6963021/pexels-photo-6963021.jpeg",
    progress: 55,
    duration: "3 hours"
  }
];

// Mock data for strategy playbooks
const strategyPlaybooks = [
  {
    id: 1,
    title: "The High-Income Professional",
    hook: "Strategies for doctors, lawyers, and executives earning $200K+",
    image: "https://images.pexels.com/photos/732444/pexels-photo-732444.jpeg",
    personas: "High Earners",
    tactics: "12 tactics"
  },
  {
    id: 2,
    title: "The Small Business Owner",
    hook: "Maximize deductions and structure for growing businesses",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    personas: "Entrepreneurs",
    tactics: "15 tactics"
  },
  {
    id: 3,
    title: "The Real Estate Investor",
    hook: "Advanced strategies for property investment portfolios",
    image: "https://images.pexels.com/photos/9052475/pexels-photo-9052475.jpeg",
    personas: "Investors",
    tactics: "10 tactics"
  },
  {
    id: 4,
    title: "The Retirement Planner",
    hook: "Optimize taxes in your pre-retirement and retirement years",
    image: "https://images.pexels.com/photos/6863253/pexels-photo-6863253.jpeg",
    personas: "Retirees",
    tactics: "8 tactics"
  }
];

const CourseCard = ({ module }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900">
        <img
          src={module.image}
          alt={module.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">
            {module.title}
          </h3>
          <p className="text-sm text-gray-200 mb-2 line-clamp-2">{module.hook}</p>
          <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
            <span>{module.duration}</span>
            <span>{module.progress}% complete</span>
          </div>
          {module.progress > 0 && (
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlaybookCard = ({ playbook }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900">
        <img
          src={playbook.image}
          alt={playbook.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">
            {playbook.title}
          </h3>
          <p className="text-sm text-gray-200 mb-2 line-clamp-2">{playbook.hook}</p>
          <div className="flex justify-between items-center text-xs text-gray-300">
            <span className="bg-green-600 px-2 py-1 rounded-full">{playbook.personas}</span>
            <span>{playbook.tactics}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-[70vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/732444/pexels-photo-732444.jpeg')`
          }}
        >
          <div className="flex items-center h-full px-8 md:px-16">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                The IRS 
                <span className="text-yellow-400"> Escape Plan</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                by <span className="text-green-400 font-semibold">Quantus Group</span>
              </p>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Master advanced tax strategies used by the wealthy. Learn from certified tax professionals 
                and transform your financial future with proven methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                  Start Learning Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-colors">
                  View Playbooks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="px-8 md:px-16 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          The IRS Escape Plan Course
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseModules.map((module) => (
            <CourseCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Strategy Playbooks Section */}
      <div className="px-8 md:px-16 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Strategy Persona Playbooks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategyPlaybooks.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-8 md:px-16 py-8 mt-12">
        <div className="text-center text-gray-400">
          <p className="text-lg font-semibold text-white mb-2">Quantus Group</p>
          <p>Professional Tax Strategy Education • Advanced Financial Planning</p>
          <p className="mt-4 text-sm">© 2025 Quantus Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;