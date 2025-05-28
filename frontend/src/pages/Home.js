import { useState } from "react";
import { Link } from "react-router-dom";

// 9 Course Modules for The IRS Escape Plan
const courseModules = [
  {
    id: 1,
    title: "Module 1: Business Structuring & Retained Earnings",
    hook: "Turn your business into a tax-efficient wealth machine",
    description: "Master entity selection, C-Corp benefits, and retained earnings strategies for business owners.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    progress: 0,
    locked: false,
    duration: "45 min",
    strategies: ["MSO + C-Corp", "Entity Optimization"]
  },
  {
    id: 2,
    title: "Module 2: W-2 Income Repositioning",
    hook: "Escape the W-2 tax trap with smart repositioning",
    description: "Learn how to reposition W-2 income and minimize employment taxes through strategic entity choices.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NDgzMDk2ODV8MA&ixlib=rb-4.1.0&q=85",
    progress: 0,
    locked: false,
    duration: "50 min",
    strategies: ["S-Corp Election", "Salary Optimization"]
  },
  {
    id: 3,
    title: "Module 3: Roth Conversion & Valuation Strategies",
    hook: "Convert retirement accounts at massive discounts",
    description: "Use alternative investments and valuation discounts to minimize Roth conversion taxes.",
    image: "https://images.pexels.com/photos/8962468/pexels-photo-8962468.jpeg",
    progress: 0,
    locked: false,
    duration: "55 min",
    strategies: ["FMV Discounts", "Strategic Conversions"]
  },
  {
    id: 4,
    title: "Module 4: Solo 401k & Retirement Optimization",
    hook: "Max out retirement savings beyond traditional limits",
    description: "Leverage Solo 401k, defined benefit plans, and advanced retirement strategies.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    progress: 0,
    locked: false,
    duration: "40 min",
    strategies: ["Solo 401k", "Defined Benefit Plans"]
  },
  {
    id: 5,
    title: "Module 5: Real Estate Professional Strategies",
    hook: "Turn real estate losses into W-2 tax shields",
    description: "Master REPS qualification, cost segregation, and short-term rental optimization.",
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
    progress: 0,
    locked: false,
    duration: "60 min",
    strategies: ["REPS Qualification", "Cost Segregation"]
  },
  {
    id: 6,
    title: "Module 6: Oil & Gas Tax Planning",
    hook: "Generate massive deductions with IDC strategies",
    description: "Navigate oil & gas investments for immediate tax deductions and long-term benefits.",
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
    progress: 0,
    locked: false,
    duration: "35 min",
    strategies: ["IDC Deductions", "Working Interest"]
  },
  {
    id: 7,
    title: "Module 7: Opportunity Zone Planning",
    hook: "Defer and eliminate capital gains taxes forever",
    description: "Master Opportunity Zone investments for capital gains deferral and elimination.",
    image: "https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg",
    progress: 0,
    locked: false,
    duration: "45 min",
    strategies: ["OZ Investment", "Gain Elimination"]
  },
  {
    id: 8,
    title: "Module 8: Charitable Structures",
    hook: "Create massive deductions while keeping control",
    description: "Use charitable trusts and advanced giving strategies for tax benefits and wealth transfer.",
    image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg",
    progress: 0,
    locked: false,
    duration: "50 min",
    strategies: ["CRT/CLAT", "Charitable Planning"]
  },
  {
    id: 9,
    title: "Module 9: Installment Sales & Exit Planning",
    hook: "Spread out gains and minimize tax brackets",
    description: "Structure business and asset sales to optimize tax timing and minimize bracket compression.",
    image: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    progress: 0,
    locked: false,
    duration: "40 min",
    strategies: ["Installment Sales", "Exit Planning"]
  }
];

// 4 Strategy Persona Playbooks (featured selection from the 9)
const strategyPlaybooks = [
  {
    id: 'w2-professionals',
    title: 'W-2 Professionals Playbook',
    hook: 'Escape the employee tax trap',
    description: 'Complete playbook for high-income W-2 earners to minimize taxes and build wealth.',
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NDgzMDk2ODV8MA&ixlib=rb-4.1.0&q=85",
    strategies: ["S-Corp Salary Optimization", "Roth Conversion with FMV Discount", "Oil & Gas Deduction Pairing"],
    personas: ["W-2 Earner", "High-Income Employee"],
    link: "/tools/strategy-playbooks"
  },
  {
    id: 'business-owners',
    title: 'Business Owners Playbook',
    hook: 'Turn profits into tax-efficient wealth',
    description: 'Advanced strategies for entrepreneurs to optimize business structures and minimize tax burden.',
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    strategies: ["MSO + C-Corp Structuring", "Oil & Gas Deduction Pairing", "Installment Sale Exit Planning"],
    personas: ["Business Owner", "Entrepreneur"],
    link: "/tools/strategy-playbooks"
  },
  {
    id: 'real-estate-investors',
    title: 'Real Estate Investors Playbook',
    hook: 'Master the ultimate tax shelter',
    description: 'Complete guide to real estate tax strategies, from REPS to cost segregation and beyond.',
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
    strategies: ["STR + REPS Qualification", "Cost Segregation & Timing", "Opportunity Zone Deferral"],
    personas: ["Real Estate Investor", "Property Owner"],
    link: "/tools/strategy-playbooks"
  },
  {
    id: 'legacy-planners',
    title: 'Legacy Planners Playbook',
    hook: 'Preserve and transfer wealth tax-efficiently',
    description: 'Sophisticated strategies for high net worth individuals focused on wealth preservation and transfer.',
    image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg",
    strategies: ["Charitable Trust Planning", "Installment Sale Exit Planning", "Opportunity Zone Deferral"],
    personas: ["HNW Individual", "Legacy Planner"],
    link: "/tools/strategy-playbooks"
  }
];

const ModuleCard = ({ module, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
        index === 0 ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 group-hover:border-accent transition-all duration-300">
        {/* Module Image */}
        <div className="relative h-32 lg:h-40 overflow-hidden">
          <img
            src={module.image}
            alt={module.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Module Number */}
          <div className="absolute top-3 left-3 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {module.id}
          </div>

          {/* Duration */}
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            {module.duration}
          </div>
        </div>

        {/* Module Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2 group-hover:text-accent transition-colors">
            {module.title}
          </h3>
          
          <p className="text-accent font-medium text-xs lg:text-sm mb-2">
            {module.hook}
          </p>
          
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {module.description}
          </p>

          {/* Strategies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {module.strategies.map((strategy, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {strategy}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          {module.progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-accent h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            to={`/course/module-${module.id}`}
            className="block w-full bg-accent text-white font-medium py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors text-center text-sm"
          >
            {module.progress > 0 ? 'Continue' : 'Start Module'}
          </Link>
        </div>
      </div>
    </div>
  );
};

const PlaybookCard = ({ playbook, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 group-hover:border-accent transition-all duration-300">
        {/* Playbook Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={playbook.image}
            alt={playbook.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Persona Badge */}
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
            {playbook.personas[0]}
          </div>
        </div>

        {/* Playbook Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
            {playbook.title}
          </h3>
          
          <p className="text-accent font-medium text-sm mb-2">
            {playbook.hook}
          </p>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {playbook.description}
          </p>

          {/* Strategy Count */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
            <span>{playbook.strategies.length} Strategies</span>
            <span>{playbook.personas.join(', ')}</span>
          </div>

          {/* Top Strategies */}
          <div className="space-y-1 mb-4">
            {playbook.strategies.slice(0, 2).map((strategy, idx) => (
              <div key={idx} className="flex items-center text-xs text-gray-700">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                {strategy}
              </div>
            ))}
            {playbook.strategies.length > 2 && (
              <div className="text-xs text-gray-500">
                +{playbook.strategies.length - 2} more strategies
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to={playbook.link}
            className="block w-full bg-primary text-white font-medium py-2.5 px-4 rounded-lg hover:bg-primary-hover transition-colors text-center text-sm"
          >
            Explore Playbook
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-primary pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-[50vh] lg:h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(37, 60, 55, 0.9), rgba(37, 60, 55, 0.7)), url('https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg')`
          }}
        >
          <div className="flex items-center justify-center h-full px-4 lg:px-8">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight text-white">
                The IRS 
                <span className="text-accent"> Escape Plan</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-3">
                by <span className="text-accent font-semibold">Quantus Group</span>
              </p>
              <p className="text-base lg:text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl mx-auto">
                Master the Netflix-style education platform for advanced tax strategies. 
                Choose your learning path and start building tax-free wealth today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/course/module-1"
                  className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-all transform hover:scale-105"
                >
                  Start Free Course
                </Link>
                <Link
                  to="/tools/strategy-playbooks"
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-all"
                >
                  Explore Strategies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="py-12 lg:py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                The IRS Escape Plan Course
              </h2>
              <p className="text-gray-600">
                9 comprehensive modules covering every aspect of advanced tax planning
              </p>
            </div>
            <Link
              to="/dashboard"
              className="hidden lg:block text-accent hover:text-accent-hover font-medium"
            >
              View All Modules →
            </Link>
          </div>

          {/* Netflix-style Module Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {courseModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="lg:hidden mt-6 text-center">
            <Link
              to="/dashboard"
              className="text-accent hover:text-accent-hover font-medium"
            >
              View All Modules →
            </Link>
          </div>
        </div>
      </div>

      {/* Strategy Persona Playbooks Section */}
      <div className="py-12 lg:py-16 px-4 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                Strategy Persona Playbooks
              </h2>
              <p className="text-gray-600">
                Curated strategy collections for your specific situation and goals
              </p>
            </div>
            <Link
              to="/tools/strategy-playbooks"
              className="hidden lg:block text-accent hover:text-accent-hover font-medium"
            >
              View All Playbooks →
            </Link>
          </div>

          {/* Netflix-style Playbook Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {strategyPlaybooks.map((playbook, index) => (
              <PlaybookCard key={playbook.id} playbook={playbook} index={index} />
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="lg:hidden mt-6 text-center">
            <Link
              to="/tools/strategy-playbooks"
              className="text-accent hover:text-accent-hover font-medium"
            >
              View All Playbooks →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="py-12 lg:py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-primary mb-8">
            Join Thousands Building Tax-Free Wealth
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">$2.5M</div>
              <div className="text-sm text-gray-600">Average Tax Savings</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">12K+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">89%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 lg:py-16 px-4 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Ready to Escape the IRS?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with our free Escape Blueprint module and discover how much you could be saving. 
            No cost, just clarity on your path to tax freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/escape-blueprint"
              className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-all transform hover:scale-105"
            >
              Start Free Blueprint
            </Link>
            <Link
              to="/community"
              className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;