import { useState } from "react";

// Core courses data (3 main courses for conversion focus)
const coreCourses = [
  {
    id: 1,
    title: "The Escape Blueprint",
    tagline: "Start your IRS Escape — no cost, just clarity.",
    description: "Perfect for W2 earners and business owners new to tax strategy. Learn the fundamentals that form the foundation of advanced tax planning.",
    image: "https://images.pexels.com/photos/8962468/pexels-photo-8962468.jpeg",
    cta: "Start Free",
    price: "Free",
    locked: false,
    progress: 35,
    badge: "Beginner Friendly",
    audience: "W2 Earners & Business Owners",
    duration: "2-3 hours",
    modules: 4
  },
  {
    id: 2,
    title: "W-2 Escape Plan",
    tagline: "Slash your W-2 taxes and build tax-free wealth.",
    description: "Advanced strategies specifically designed for high-income employees. Transform your W-2 tax burden into wealth-building opportunities.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NDgzMDk2ODV8MA&ixlib=rb-4.1.0&q=85",
    cta: "View Curriculum",
    price: "$497",
    locked: true,
    progress: 0,
    badge: "High-Income Employees",
    audience: "W2 Earners $100K+",
    duration: "6-8 hours",
    modules: 8
  },
  {
    id: 3,
    title: "Business Owner Escape Plan",
    tagline: "Turn your business into a tax-optimized wealth engine.",
    description: "Elite strategies for entrepreneurs with $1M+ profit. Master advanced tax structures, asset protection, and wealth preservation techniques.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    cta: "View Curriculum",
    price: "$1,997",
    locked: true,
    progress: 0,
    badge: "$1M+ Businesses",
    audience: "Business Owners",
    duration: "10-12 hours",
    modules: 12
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



const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
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
                  View Progress
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
          {coreCourses.map((module) => (
            <CourseCard key={module.id} module={module} />
          ))}
        </div>
      </div>



      {/* Quick Access Section */}
      <div className="px-8 md:px-16 py-12 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">My Progress</h3>
            <p className="text-gray-300">Track your course completion and achievements</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Tax Calculator</h3>
            <p className="text-gray-300">Calculate potential tax savings</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-300">Connect with other tax strategists</p>
          </div>
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

export default Home;