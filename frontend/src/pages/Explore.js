import { useState } from "react";

const Explore = () => {
  const [activeSection, setActiveSection] = useState("glossary");

  const sections = [
    { id: "glossary", name: "Glossary", icon: "📚" },
    { id: "quiz-mode", name: "Quiz Mode", icon: "🧠" },
    { id: "document-reader", name: "Document Reader", icon: "📄" },
    { id: "community", name: "Community", icon: "👥" },
    { id: "leaderboard", name: "Leaderboard", icon: "🏆" },
    { id: "office-hours", name: "Office Hours", icon: "🕐" },
  ];

  const glossaryTerms = [
    { term: "Qualified Opportunity Fund (QOF)", definition: "An investment vehicle that allows for the deferral of capital gains taxes." },
    { term: "Section 1031 Exchange", definition: "A tax-deferred exchange allowing real estate investors to swap properties." },
    { term: "Cost Segregation", definition: "A tax strategy that accelerates depreciation deductions for commercial property." },
    { term: "Augusta Rule", definition: "IRS provision allowing tax-free rental income from personal residence up to 14 days." },
  ];

  const leaderboardData = [
    { rank: 1, name: "Sarah Chen", points: 2450, modules: 9 },
    { rank: 2, name: "Michael Rodriguez", points: 2380, modules: 8 },
    { rank: 3, name: "Jennifer Kim", points: 2220, modules: 7 },
    { rank: 4, name: "David Thompson", points: 2100, modules: 8 },
    { rank: 5, name: "Lisa Anderson", points: 1950, modules: 6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
          <p className="mt-2 text-gray-600">Discover tools, resources, and connect with the community</p>
        </div>

        {/* Section Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${
                activeSection === section.id
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } p-4 rounded-lg shadow transition-colors text-center`}
            >
              <div className="text-2xl mb-2">{section.icon}</div>
              <div className="text-sm font-medium">{section.name}</div>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === "glossary" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Tax Strategy Glossary</h3>
              <p className="mt-1 text-sm text-gray-600">Key terms and definitions for tax optimization</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="font-semibold text-gray-900">{item.term}</h4>
                    <p className="mt-1 text-gray-600">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "quiz-mode" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Strategy Quiz</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Question 1 of 10</h4>
              <p className="text-blue-800 mb-4">What is the maximum amount you can contribute to a SEP-IRA in 2024?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="quiz" className="text-blue-600" />
                  <span className="ml-2">$6,500</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="quiz" className="text-blue-600" />
                  <span className="ml-2">$22,500</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="quiz" className="text-blue-600" />
                  <span className="ml-2">$66,000</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="quiz" className="text-blue-600" />
                  <span className="ml-2">$69,000</span>
                </label>
              </div>
            </div>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              Next Question
            </button>
          </div>
        )}

        {activeSection === "document-reader" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Reader</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-gray-600 mb-4">Upload tax documents for AI-powered analysis</p>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        )}

        {activeSection === "community" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Community Chat</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-4 h-64 overflow-y-auto">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">S</div>
                  <div>
                    <p className="text-sm font-medium">Sarah Chen</p>
                    <p className="text-sm text-gray-600">Just completed the real estate module - amazing strategies!</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                  <div>
                    <p className="text-sm font-medium">Michael Rodriguez</p>
                    <p className="text-sm text-gray-600">Has anyone tried the Augusta Rule strategy? Looking for real-world examples.</p>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "leaderboard" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Leaderboard</h3>
              <p className="mt-1 text-sm text-gray-600">Top performers this month</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.modules} modules completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{user.points}</p>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "office-hours" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Office Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Next Session</h4>
                <p className="text-sm text-gray-600 mb-2">Advanced Business Strategies Q&A</p>
                <p className="text-sm text-gray-500 mb-4">Friday, March 15th • 2:00 PM EST</p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                  Register
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Recent Recording</h4>
                <p className="text-sm text-gray-600 mb-2">Real Estate Tax Benefits Deep Dive</p>
                <p className="text-sm text-gray-500 mb-4">March 8th • 45 minutes</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;