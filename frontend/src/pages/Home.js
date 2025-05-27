import { useState } from "react";
import { Link } from "react-router-dom";

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
    modules: 4,
    courseId: "escape-blueprint"
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
    modules: 9,
    courseId: "w2-escape-plan"
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
    modules: 12,
    courseId: "business-owner-escape-plan"
  }
];

const CourseCard = ({ course, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getBadgeColor = (index) => {
    switch(index) {
      case 0: return "bg-green-500";
      case 1: return "bg-blue-500";
      case 2: return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getCtaColor = (locked, index) => {
    if (!locked) return "bg-green-500 hover:bg-green-600";
    switch(index) {
      case 1: return "bg-blue-500 hover:bg-blue-600";
      case 2: return "bg-purple-500 hover:bg-purple-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 ${
        index === 1 ? 'transform scale-105 z-10' : ''
      } hover:scale-110`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge for middle course */}
      {index === 1 && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-100 group-hover:border-yellow-400 transition-all duration-300">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Badge */}
          <div className={`absolute top-4 left-4 ${getBadgeColor(index)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {course.badge}
          </div>

          {/* Lock icon for premium courses */}
          {course.locked && (
            <div className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-6">
          {/* Price */}
          <div className="flex justify-between items-start mb-3">
            <span className={`text-2xl font-bold ${course.locked ? 'text-gray-800' : 'text-green-600'}`}>
              {course.price}
            </span>
            {!course.locked && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                FREE
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
            {course.title}
          </h3>

          {/* Tagline */}
          <p className="text-gray-600 font-medium mb-3 text-sm">
            {course.tagline}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Course Details */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span><strong>Audience:</strong> {course.audience}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span><strong>Duration:</strong> {course.duration}</span>
              <span><strong>Modules:</strong> {course.modules}</span>
            </div>
          </div>

          {/* Progress Bar (if applicable) */}
          {course.progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <Link
            to={course.courseId === "escape-blueprint" ? "/escape-blueprint" : course.courseId ? `/course/${course.courseId}` : '#'}
            className={`block w-full ${getCtaColor(course.locked, index)} text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center`}
          >
            {course.locked ? (
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {course.cta}
              </span>
            ) : (
              course.cta
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};



const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg')`
          }}
        >
          <div className="flex items-center justify-center h-full px-8">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                The IRS 
                <span className="text-yellow-400"> Escape Plan</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                by <span className="text-green-400 font-semibold">Quantus Group</span>
              </p>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                Stop overpaying taxes. Start building wealth. Choose your path to financial freedom 
                with proven strategies used by the top 1%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection Section */}
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Choose Your <span className="text-yellow-500">Learning Path</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free course or jump into advanced strategies. 
              Each path is designed to maximize your tax savings and accelerate wealth building.
            </p>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {coreCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">Trusted by thousands of successful entrepreneurs and professionals</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>CPA Approved</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>IRS Compliant</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Proven Results</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Why Choose The IRS Escape Plan?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Proven Strategies</h4>
                  <p className="text-gray-600">Learn methods used by the wealthy to minimize taxes and maximize wealth accumulation.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Expert Guidance</h4>
                  <p className="text-gray-600">Created by certified tax professionals with decades of experience in wealth optimization.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Practical Implementation</h4>
                  <p className="text-gray-600">Step-by-step guides you can implement immediately to start reducing your tax burden.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Quantus Group</h3>
          <p className="text-gray-400 mb-4">Elite Tax Strategy Education • Wealth Optimization Specialists</p>
          <p className="text-sm text-gray-500">© 2025 Quantus Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;