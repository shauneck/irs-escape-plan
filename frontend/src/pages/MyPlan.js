import { useState, useEffect } from "react";
import AITaxAssistant from "../components/AITaxAssistant";

const MyPlan = () => {
  const [activeSection, setActiveSection] = useState("strategy-map");
  const [selectedPersona, setSelectedPersona] = useState("all");
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userNotes, setUserNotes] = useState({});
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [readyToImplement, setReadyToImplement] = useState([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('userBookmarks');
    const savedNotes = localStorage.getItem('userNotes');
    const savedDocs = localStorage.getItem('uploadedDocuments');
    const savedStrategies = localStorage.getItem('readyToImplement');
    
    if (savedBookmarks) setUserBookmarks(JSON.parse(savedBookmarks));
    if (savedNotes) setUserNotes(JSON.parse(savedNotes));
    if (savedDocs) setUploadedDocuments(JSON.parse(savedDocs));
    if (savedStrategies) setReadyToImplement(JSON.parse(savedStrategies));
  }, []);

  // Get user stats from Explore page data
  const userStats = JSON.parse(localStorage.getItem('userStats') || '{"xp": 0, "correct": 0, "incorrect": 0, "masteredTerms": [], "badges": [], "quizHistory": [], "personaStats": {"W2": {"correct": 0, "incorrect": 0, "xp": 0}, "business owner": {"correct": 0, "incorrect": 0, "xp": 0}, "real estate": {"correct": 0, "incorrect": 0, "xp": 0}, "investment": {"correct": 0, "incorrect": 0, "xp": 0}}, "categoryStats": {}}');
  const userProgress = JSON.parse(localStorage.getItem('glossaryProgress') || '{}');
  
  // Mock course data - in real app this would come from backend
  const courseModules = [
    { id: 1, title: "Tax Fundamentals", completion: 85, status: "In Progress" },
    { id: 2, title: "Entity Structuring", completion: 100, status: "Completed" },
    { id: 3, title: "Passive Income Shields", completion: 62, status: "In Progress" },
    { id: 4, title: "Retirement Conversion", completion: 45, status: "In Progress" },
    { id: 5, title: "Exit Planning", completion: 30, status: "In Progress" },
    { id: 6, title: "Capital Gains Deferral", completion: 0, status: "Locked" },
    { id: 7, title: "Real Estate Optimization", completion: 90, status: "Completed" },
    { id: 8, title: "Advanced Strategies", completion: 0, status: "Locked" },
    { id: 9, title: "Implementation Mastery", completion: 0, status: "Locked" }
  ];

  // Glossary data for AI Assistant
  const glossaryTerms = [
    {
      term: "Qualified Opportunity Fund (QOF)",
      definition: "An investment vehicle under IRC §1400Z-2 that allows deferral and potential exclusion of capital gains by investing in designated Opportunity Zones.",
      tags: ["capital gains", "real estate", "business owner", "investment"],
      plain_english: "You can delay and potentially avoid paying capital gains taxes by investing in a Qualified Opportunity Fund.",
      case_study: {
        client_profile: "Amanda sold company stock with $600K in capital gains and wanted to defer the tax while reinvesting in real estate.",
        structure: "She invested the gains in a QOF within 180 days of sale, targeting tax-advantaged Opportunity Zone property.",
        implementation: "The fund pooled investor capital to purchase and improve a multifamily asset in a certified zone.",
        results: "Deferred $600K in taxes and positioned the investment for permanent gain exclusion after 10 years."
      },
      key_benefit: "Turn taxable gains into long-term tax-free growth through compliant real estate investing."
    },
    {
      term: "REPS (Real Estate Professional Status)",
      definition: "A tax classification under IRC §469 that allows certain real estate investors to offset active income with rental losses.",
      tags: ["real estate", "W2", "deductions", "active income"],
      plain_english: "If you work full-time in real estate, you can use rental losses to reduce your W-2 or business income.",
      case_study: {
        client_profile: "Nina K. is a tech executive who owns a short-term rental portfolio generating passive losses.",
        structure: "She became a full-time real estate professional by materially participating in her portfolio.",
        implementation: "Met the 750-hour rule and established REPS via tax elections and time logs.",
        results: "Used $82K in rental losses to offset W-2 income, reducing her tax bill by over $28K."
      },
      key_benefit: "Convert rental losses into powerful deductions against ordinary income."
    },
    {
      term: "QSBS (Qualified Small Business Stock)",
      definition: "Stock that may be eligible for up to 100% exclusion of capital gains under IRC §1202 if held for at least five years and issued by a qualifying C-Corp.",
      tags: ["equity", "startup", "exit planning", "capital gains"],
      plain_english: "If you hold shares in a qualified startup for 5 years, your gains can be 100% tax-free when you sell.",
      case_study: {
        client_profile: "Ethan invested in a software startup as an early employee and received QSBS-eligible shares.",
        structure: "The company met Section 1202 requirements and Ethan held his stock for over five years.",
        implementation: "Verified QSBS status through corporate records and planned exit accordingly.",
        results: "Excluded $9.2M in gains from federal tax at sale."
      },
      key_benefit: "Create generational wealth through tax-free startup exits."
    },
    {
      term: "Roth Conversion",
      definition: "The process of moving money from a traditional IRA to a Roth IRA, paying taxes now for tax-free growth later.",
      tags: ["retirement", "tax timing", "W2", "investment"],
      plain_english: "You pay taxes now so your retirement money grows and comes out tax-free later.",
      case_study: {
        client_profile: "Samir T., age 55, had $500K in a traditional IRA and anticipated higher taxes in retirement.",
        structure: "Converted $150K to a Roth IRA during a strategic low-income window.",
        implementation: "Used oil & gas deductions to eliminate 40% of the taxable income from the conversion.",
        results: "Paid $18K in tax instead of $32K and locked in future tax-free withdrawals."
      },
      key_benefit: "Shift retirement assets into a tax-free bucket while your rates are still low."
    },
    {
      term: "STR (Short-Term Rental)",
      definition: "Rental properties leased for less than 7 days per guest stay that may qualify for active participation tax benefits.",
      tags: ["real estate", "W2", "deductions", "passive income"],
      plain_english: "If you rent out property short-term and stay actively involved, you can write off losses against W-2 income.",
      case_study: {
        client_profile: "Liam R. owns a STR in Virginia while working full-time as an engineer.",
        structure: "Met material participation rules by self-managing and booking guests.",
        implementation: "Documented 150+ hours in active management to override passive classification.",
        results: "Used $31K in STR losses to offset his W-2 income, reducing taxes by $11K."
      },
      key_benefit: "Turn vacation rentals into powerful tax shields against earned income."
    }
  ];

  // Tax strategy categories with unlock requirements
  const strategyCategories = [
    {
      id: "entity-structuring",
      title: "Entity Structuring",
      description: "Optimize business structures for tax efficiency",
      progress: 100,
      unlocked: true,
      strategies: ["LLC vs S-Corp Election", "Solo 401k Setup", "MSO Structure"],
      icon: "🏢",
      color: "bg-blue-500",
      requiredXP: 0,
      requiredModules: []
    },
    {
      id: "passive-income",
      title: "Passive Income Shields",
      description: "Generate tax-advantaged passive income streams",
      progress: 75,
      unlocked: userStats.xp >= 500,
      strategies: ["Real Estate Professional Status", "STR Material Participation", "Cost Segregation"],
      icon: "🛡️",
      color: "bg-green-500",
      requiredXP: 500,
      requiredModules: ["Tax Fundamentals"]
    },
    {
      id: "retirement-conversion",
      title: "Retirement Conversion",
      description: "Strategic retirement account conversions",
      progress: 45,
      unlocked: userStats.xp >= 1000,
      strategies: ["Roth Conversions", "Backdoor Roth", "Mega Backdoor Roth"],
      icon: "🏦",
      color: "bg-purple-500",
      requiredXP: 1000,
      requiredModules: ["Tax Fundamentals", "Entity Structuring"]
    },
    {
      id: "exit-planning",
      title: "Exit Planning",
      description: "Tax-efficient business and asset exits",
      progress: 30,
      unlocked: userStats.xp >= 1500,
      strategies: ["QSBS Optimization", "Installment Sales", "1031 Exchanges"],
      icon: "🚪",
      color: "bg-red-500",
      requiredXP: 1500,
      requiredModules: ["Entity Structuring", "Passive Income Shields"]
    },
    {
      id: "capital-gains",
      title: "Capital Gains Deferral",
      description: "Defer and reduce capital gains tax",
      progress: 0,
      unlocked: userStats.xp >= 2000,
      strategies: ["Opportunity Zone Funds", "Charitable Remainder Trusts", "Like-Kind Exchanges"],
      icon: "💰",
      color: "bg-yellow-500",
      requiredXP: 2000,
      requiredModules: ["Exit Planning"]
    },
    {
      id: "real-estate",
      title: "Real Estate Optimization",
      description: "Advanced real estate tax strategies",
      progress: 90,
      unlocked: userStats.xp >= 2500,
      strategies: ["Delaware Statutory Trust", "Conservation Easements", "Professional Trader Status"],
      icon: "🏠",
      color: "bg-orange-500",
      requiredXP: 2500,
      requiredModules: ["Passive Income Shields", "Capital Gains Deferral"]
    },
    {
      id: "advanced-strategies",
      title: "Advanced Strategies",
      description: "Elite-level tax optimization techniques",
      progress: 0,
      unlocked: userStats.xp >= 5000,
      strategies: ["Captive Insurance", "Private Placement Insurance", "Family Limited Partnerships"],
      icon: "⚡",
      color: "bg-indigo-500",
      requiredXP: 5000,
      requiredModules: ["All Previous Modules"]
    }
  ];

  // Generate smart recommendations
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Check for next strategies to unlock
    const nextStrategy = strategyCategories.find(cat => !cat.unlocked && userStats.xp < cat.requiredXP);
    if (nextStrategy) {
      const xpNeeded = nextStrategy.requiredXP - userStats.xp;
      recommendations.push({
        type: "unlock",
        title: `Unlock ${nextStrategy.title}`,
        description: `Earn ${xpNeeded} more XP to unlock advanced strategies`,
        action: "Take Quiz",
        priority: "high"
      });
    }

    // Check for incomplete modules
    const incompleteModules = courseModules.filter(m => m.status === "In Progress");
    if (incompleteModules.length > 0) {
      recommendations.push({
        type: "continue",
        title: `Continue ${incompleteModules[0].title}`,
        description: `${100 - incompleteModules[0].completion}% remaining`,
        action: "Continue Module",
        priority: "medium"
      });
    }

    // Check for missed terms (from quiz data)
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers') || '[]');
    if (incorrectAnswers.length > 0) {
      recommendations.push({
        type: "review",
        title: "Review Missed Terms",
        description: `${incorrectAnswers.length} terms need review`,
        action: "Review Terms",
        priority: "high"
      });
    }

    return recommendations.slice(0, 3); // Limit to 3 recommendations
  };

  // Save functions
  const saveBookmarks = (bookmarks) => {
    setUserBookmarks(bookmarks);
    localStorage.setItem('userBookmarks', JSON.stringify(bookmarks));
  };

  const saveNotes = (notes) => {
    setUserNotes(notes);
    localStorage.setItem('userNotes', JSON.stringify(notes));
  };

  const saveStrategies = (strategies) => {
    setReadyToImplement(strategies);
    localStorage.setItem('readyToImplement', JSON.stringify(strategies));
  };

  // Toggle functions
  const toggleBookmark = (itemId, itemType) => {
    const bookmarkId = `${itemType}-${itemId}`;
    const newBookmarks = userBookmarks.includes(bookmarkId)
      ? userBookmarks.filter(b => b !== bookmarkId)
      : [...userBookmarks, bookmarkId];
    saveBookmarks(newBookmarks);
  };

  const addNote = (itemId, itemType) => {
    if (!newNote.trim()) return;
    const noteKey = `${itemType}-${itemId}`;
    const newNotes = {
      ...userNotes,
      [noteKey]: [...(userNotes[noteKey] || []), {
        id: Date.now(),
        text: newNote,
        timestamp: new Date().toISOString()
      }]
    };
    saveNotes(newNotes);
    setNewNote("");
  };

  const toggleImplementation = (strategyId) => {
    const newStrategies = readyToImplement.includes(strategyId)
      ? readyToImplement.filter(s => s !== strategyId)
      : [...readyToImplement, strategyId];
    saveStrategies(newStrategies);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        tags: []
      };
      const newDocs = [...uploadedDocuments, newDoc];
      setUploadedDocuments(newDocs);
      localStorage.setItem('uploadedDocuments', JSON.stringify(newDocs));
    }
  };

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Plan</h1>
          <p className="mt-2 text-gray-600">Your personalized tax strategy roadmap and implementation tracker</p>
        </div>

        {/* Section Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { id: "strategy-map", name: "Strategy Map", icon: "🗺️" },
            { id: "scorecard", name: "Implementation Scorecard", icon: "📊" },
            { id: "strategy-stack", name: "My Strategy Stack", icon: "📋" },
            { id: "recommendations", name: "Smart Recommendations", icon: "💡" },
            { id: "vault", name: "Document Vault", icon: "🗃️" }
          ].map((section) => (
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

        {/* Strategy Map View */}
        {activeSection === "strategy-map" && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl text-white p-8"
              style={{
                backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(147, 51, 234, 0.8)), url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">Your Tax Strategy Journey</h2>
                <p className="text-xl opacity-90 mb-6">
                  Navigate through advanced tax strategies customized for your profile. 
                  Unlock new strategies as you master the fundamentals.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.xp}</div>
                    <div className="text-sm opacity-80">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{strategyCategories.filter(c => c.unlocked).length}</div>
                    <div className="text-sm opacity-80">Unlocked Strategies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.badges.length}</div>
                    <div className="text-sm opacity-80">Badges Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Filter */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filter by Your Profile</h3>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Strategies</option>
                  <option value="w2">W-2 Employee</option>
                  <option value="business">Business Owner</option>
                  <option value="realestate">Real Estate Investor</option>
                  <option value="investment">Investment Focused</option>
                </select>
              </div>
            </div>

            {/* Strategy Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategyCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${
                    category.unlocked ? 'bg-white' : 'bg-gray-100 opacity-60'
                  } rounded-lg shadow p-6 relative overflow-hidden transition-all hover:shadow-lg`}
                >
                  {!category.unlocked && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                        🔒 Locked
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                      {category.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{category.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.unlocked ? category.color : 'bg-gray-400'}`}
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Strategies */}
                  <div className="space-y-2 mb-4">
                    {category.strategies.map((strategy, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className={category.unlocked ? 'text-gray-700' : 'text-gray-400'}>
                          {strategy}
                        </span>
                        {category.unlocked && (
                          <button
                            onClick={() => toggleImplementation(`${category.id}-${index}`)}
                            className={`${
                              readyToImplement.includes(`${category.id}-${index}`)
                                ? 'text-green-600'
                                : 'text-gray-400'
                            } hover:text-green-600`}
                          >
                            {readyToImplement.includes(`${category.id}-${index}`) ? '✓' : '+'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Unlock Requirements */}
                  {!category.unlocked && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                      <p><strong>Unlock Requirements:</strong></p>
                      <p>• {category.requiredXP} XP ({category.requiredXP - userStats.xp} more needed)</p>
                      <p>• Complete: {category.requiredModules.join(', ')}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {category.unlocked && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => toggleBookmark(category.id, 'strategy')}
                        className={`flex-1 px-3 py-2 rounded text-sm ${
                          userBookmarks.includes(`strategy-${category.id}`)
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-700'
                        } hover:bg-yellow-100`}
                      >
                        {userBookmarks.includes(`strategy-${category.id}`) ? '★ Bookmarked' : '☆ Bookmark'}
                      </button>
                      <button
                        onClick={() => setSelectedItem({ type: 'strategy', id: category.id, title: category.title })}
                        className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Add Note
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Implementation Scorecard */}
        {activeSection === "scorecard" && (
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow text-white p-6">
              <h3 className="text-xl font-bold mb-4">Implementation Scorecard</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{Math.round(courseModules.reduce((acc, m) => acc + m.completion, 0) / courseModules.length)}%</div>
                  <div className="text-sm opacity-90">Course Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{Math.round((userStats.masteredTerms?.length || 0) / 20 * 100)}%</div>
                  <div className="text-sm opacity-90">Glossary Mastery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.xp}</div>
                  <div className="text-sm opacity-90">Quiz XP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{readyToImplement.length}</div>
                  <div className="text-sm opacity-90">Ready Strategies</div>
                </div>
              </div>
            </div>

            {/* Course Modules Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-6">Course Module Progress</h4>
              <div className="space-y-4">
                {courseModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-gray-900">{module.title}</h5>
                        <span className="text-sm text-gray-600">{module.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            module.status === "Completed" ? "bg-green-500" :
                            module.status === "In Progress" ? "bg-yellow-500" : "bg-gray-400"
                          }`}
                          style={{ width: `${module.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        module.status === "Completed" ? "bg-green-100 text-green-800" :
                        module.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {module.status}
                      </span>
                      <button
                        onClick={() => toggleBookmark(module.id, 'module')}
                        className={`text-lg ${
                          userBookmarks.includes(`module-${module.id}`) ? 'text-yellow-500' : 'text-gray-400'
                        } hover:text-yellow-500`}
                      >
                        {userBookmarks.includes(`module-${module.id}`) ? '★' : '☆'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge Progress */}
            {userStats.badges && userStats.badges.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-6">Achievement Badges</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userStats.badges.map((badge, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-sm font-medium text-gray-900">{badge}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Strategy Stack */}
        {activeSection === "strategy-stack" && (
          <div className="space-y-6">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow text-white p-6"
              style={{
                backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.8), rgba(219, 39, 119, 0.8)), url('https://images.pexels.com/photos/8962468/pexels-photo-8962468.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3 className="text-xl font-bold mb-2">Your Strategy Stack</h3>
              <p className="opacity-90">Strategies you've marked as ready to implement</p>
            </div>

            {readyToImplement.length > 0 ? (
              <div className="space-y-4">
                {readyToImplement.map((strategyId, index) => {
                  const [categoryId, strategyIndex] = strategyId.split('-');
                  const category = strategyCategories.find(c => c.id === categoryId);
                  const strategyName = category?.strategies[parseInt(strategyIndex)];
                  
                  return (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`${category?.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                            {category?.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{strategyName}</h4>
                            <p className="text-sm text-gray-600">{category?.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                Ready to Implement
                              </span>
                              {selectedPersona !== "all" && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                  {selectedPersona.toUpperCase()} Strategy
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm">
                            Export Guide
                          </button>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
                            Schedule Call
                          </button>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
                            Checklist
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Strategies Selected Yet</h3>
                <p className="text-gray-600 mb-4">
                  Browse the Strategy Map and mark strategies as "Ready to Implement" to see them here.
                </p>
                <button
                  onClick={() => setActiveSection("strategy-map")}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Explore Strategies
                </button>
              </div>
            )}
          </div>
        )}

        {/* Smart Recommendations */}
        {activeSection === "recommendations" && (
          <div className="space-y-6">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow text-white p-6"
              style={{
                backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.8), rgba(37, 99, 235, 0.8)), url('https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
              <p className="opacity-90">AI-powered suggestions based on your progress and quiz performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      rec.priority === "high" ? "bg-red-500" :
                      rec.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`}></div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {rec.priority} Priority
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm">
                    {rec.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Weekly Streak */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Your Learning Streak</h4>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {(() => {
                      if (!userStats.quizHistory?.length) return 0;
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      const recentQuizzes = userStats.quizHistory.filter(quiz => 
                        new Date(quiz.startTime) >= weekAgo
                      );
                      const uniqueDays = new Set(recentQuizzes.map(quiz => 
                        new Date(quiz.startTime).toDateString()
                      ));
                      return uniqueDays.size;
                    })()}
                  </div>
                  <div className="text-sm text-gray-600">Days This Week</div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">Keep up the momentum! Consistent learning leads to better tax outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Vault */}
        {activeSection === "vault" && (
          <div className="space-y-6">
            <div 
              className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow text-white p-6"
              style={{
                backgroundImage: `linear-gradient(rgba(55, 65, 81, 0.8), rgba(17, 24, 39, 0.8)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NDgzNTg2ODF8MA&ixlib=rb-4.1.0&q=85')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h3 className="text-xl font-bold mb-2">Document Vault & Notes</h3>
              <p className="opacity-90">Store important tax documents and keep notes on strategies</p>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl text-gray-400 mb-2">📄</div>
                  <p className="text-gray-600 mb-2">Upload your tax documents (PDF only)</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Choose File
                  </button>
                </label>
              </div>
            </div>

            {/* Uploaded Documents */}
            {uploadedDocuments.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Your Documents</h4>
                <div className="space-y-3">
                  {uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📄</div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {Math.round(doc.size / 1024)} KB • {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarks */}
            {userBookmarks.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Your Bookmarks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userBookmarks.map((bookmark, index) => {
                    const [type, id] = bookmark.split('-');
                    let title = `${type} ${id}`;
                    
                    if (type === 'strategy') {
                      const category = strategyCategories.find(c => c.id === id);
                      title = category?.title || title;
                    } else if (type === 'module') {
                      const module = courseModules.find(m => m.id === parseInt(id));
                      title = module?.title || title;
                    }

                    return (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{title}</p>
                          <p className="text-sm text-gray-600 capitalize">{type}</p>
                        </div>
                        <button
                          onClick={() => setSelectedItem({ type, id, title })}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Add Note
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes */}
            {Object.keys(userNotes).length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Your Notes</h4>
                <div className="space-y-4">
                  {Object.entries(userNotes).map(([key, notes]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{key.replace('-', ' ')}</h5>
                      <div className="space-y-2">
                        {notes.map((note) => (
                          <div key={note.id} className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700">{note.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(note.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Note Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Note to {selectedItem.title}
              </h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note..."
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    addNote(selectedItem.id, selectedItem.type);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                >
                  Save Note
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlan;