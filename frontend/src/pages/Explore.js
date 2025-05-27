import { useState, useEffect } from "react";

const Explore = () => {
  const [activeSection, setActiveSection] = useState("glossary");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [currentQuizTerm, setCurrentQuizTerm] = useState(null);
  const [quizType, setQuizType] = useState("multiple-choice");
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [userStats, setUserStats] = useState({
    xp: 0,
    correct: 0,
    incorrect: 0,
    masteredTerms: [],
    badges: []
  });

  const sections = [
    { id: "glossary", name: "Glossary", icon: "📚" },
    { id: "quiz-mode", name: "Quiz Mode", icon: "🧠" },
    { id: "document-reader", name: "Document Reader", icon: "📄" },
    { id: "community", name: "Community", icon: "👥" },
    { id: "leaderboard", name: "Leaderboard", icon: "🏆" },
    { id: "office-hours", name: "Office Hours", icon: "🕐" },
  ];

  const glossaryTerms = [
    {
      term: "Qualified Opportunity Fund (QOF)",
      definition: "An investment vehicle that allows deferral and potential elimination of capital gains when invested in designated Opportunity Zones.",
      example: "After selling stock with a $200K gain, you invest the gain in a QOF within 180 days to defer taxes.",
      tags: ["Capital Gains", "Investment", "Business Owner"]
    },
    {
      term: "REPS (Real Estate Professional Status)",
      definition: "A tax status that allows certain real estate investors to treat passive losses as active, offsetting W-2 or business income.",
      example: "Nina qualifies for REPS, allowing her $50K in rental losses to offset W-2 income.",
      tags: ["Real Estate", "W2", "Deductions"]
    },
    {
      term: "QSBS (Qualified Small Business Stock)",
      definition: "Stock in a qualifying C-Corp that can be sold after 5 years with up to 100% capital gains exclusion under Section 1202.",
      example: "Claire invests in a startup C-Corp and exits with $8M in tax-free gains.",
      tags: ["Equity", "Startup", "Exit Planning"]
    },
    {
      term: "F-Reorg",
      definition: "A type of corporate reorganization used to preserve QSBS eligibility when transferring ownership or restructuring.",
      example: "A founder uses an F-reorg before selling shares to maintain QSBS treatment.",
      tags: ["Corporate", "Advanced Planning", "QSBS"]
    },
    {
      term: "Oil & Gas IDCs",
      definition: "Intangible drilling costs that can be deducted in year one to offset ordinary income.",
      example: "Miles invests $200K in an oil partnership and deducts $170K in year one through IDCs.",
      tags: ["Alternative Investment", "Deductions", "Business Owner"]
    },
    {
      term: "Roth Conversion",
      definition: "Moving funds from a traditional IRA or 401(k) to a Roth IRA, paying tax now for future tax-free growth.",
      example: "Samir converts $150K during a low-income year to reduce lifetime tax liability.",
      tags: ["Retirement", "W2", "Tax Timing"]
    },
    {
      term: "STR (Short-Term Rental)",
      definition: "A rental property typically leased for fewer than 7 days per stay, often eligible for more aggressive tax treatment if materially participated in.",
      example: "Liam uses a Virginia STR to generate passive income and deductions against his W-2.",
      tags: ["Real Estate", "W2", "Deductions"]
    },
    {
      term: "Material Participation",
      definition: "A standard used to determine whether a taxpayer actively participates in an activity, affecting the treatment of losses.",
      example: "A taxpayer spends 500+ hours on a rental and qualifies as materially participating.",
      tags: ["IRS Rules", "Real Estate", "Active Income"]
    },
    {
      term: "MSO (Management Services Organization)",
      definition: "A C-Corp structure that provides services to a main business entity, allowing income separation and advanced tax strategies.",
      example: "Shaun creates an MSO to shift profits into a C-Corp and reduce pass-through taxation.",
      tags: ["Entity Structure", "Business Owner", "Advanced Planning"]
    },
    {
      term: "Split-Dollar Life Insurance",
      definition: "A strategy where a business funds a permanent life insurance policy, often with the goal of building tax-free retirement income.",
      example: "A C-Corp funds a policy for the owner, allowing future tax-free loans for income.",
      tags: ["Insurance", "Business Owner", "Wealth Transfer"]
    },
    {
      term: "Installment Sale",
      definition: "A method of deferring capital gains by spreading out income over multiple years.",
      example: "An investor sells a business and receives payments over 5 years, reducing year-one tax burden.",
      tags: ["Exit Planning", "Capital Gains", "Timing"]
    },
    {
      term: "Irrevocable Trust",
      definition: "A trust that, once created, cannot be changed or revoked and can offer estate and asset protection benefits.",
      example: "A founder uses an irrevocable trust to protect assets and remove them from their estate.",
      tags: ["Estate Planning", "Asset Protection", "Wealth Transfer"]
    },
    {
      term: "Cost Segregation",
      definition: "A tax strategy that accelerates depreciation of real estate to generate large deductions early.",
      example: "Jackson performs a cost seg on a rental and deducts $100K in year one.",
      tags: ["Real Estate", "Depreciation", "Deductions"]
    },
    {
      term: "Charitable Remainder Trust (CRT)",
      definition: "A trust that provides income to the donor or others for a period of time, then donates the remainder to charity, offering upfront tax benefits.",
      example: "A business owner funds a CRT to defer capital gains and create income for retirement.",
      tags: ["Charitable", "Estate Planning", "Capital Gains"]
    },
    {
      term: "AMT (Alternative Minimum Tax)",
      definition: "A parallel tax system ensuring high-income individuals pay at least a minimum tax amount, often triggered by large deductions.",
      example: "Helen hits AMT due to large oil & gas deductions and state tax write-offs.",
      tags: ["W2", "Deductions", "IRS Rules"]
    },
    {
      term: "Tax-Free Step-Up in Basis",
      definition: "The resetting of an asset's cost basis to its market value upon the owner's death, eliminating capital gains.",
      example: "Heirs inherit a $2M property at market value, avoiding capital gains tax on prior appreciation.",
      tags: ["Estate Planning", "Investment", "Capital Gains"]
    },
    {
      term: "Self-Rental Rule",
      definition: "An IRS rule that converts passive rental income into non-passive if the property is rented to a related business.",
      example: "A doctor rents a building to her practice, allowing rental income to offset active income.",
      tags: ["Real Estate", "Business Owner", "Deductions"]
    },
    {
      term: "State Residency Planning",
      definition: "Strategies for changing domicile to a lower-tax state to reduce long-term income and estate taxes.",
      example: "A tech executive moves to Texas before a major liquidity event to avoid state income tax.",
      tags: ["W2", "Exit Planning", "State Tax"]
    },
    {
      term: "Family Limited Partnership (FLP)",
      definition: "An entity structure used to consolidate family assets and pass wealth to heirs with valuation discounts.",
      example: "Parents gift FLP shares to children with a 30% discount for estate tax purposes.",
      tags: ["Entity Structure", "Wealth Transfer", "Estate Planning"]
    },
    {
      term: "Backdoor Roth IRA",
      definition: "A workaround that allows high-income earners to contribute to a Roth IRA via a nondeductible IRA conversion.",
      example: "A W-2 earner contributes $6,500 to a traditional IRA and converts it to a Roth the next day.",
      tags: ["Retirement", "W2", "Tax-Free Growth"]
    }
  ];

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('glossaryFavorites');
    const savedProgress = localStorage.getItem('glossaryProgress');
    const savedStats = localStorage.getItem('userStats');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
    if (savedStats) setUserStats(JSON.parse(savedStats));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('glossaryFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('glossaryProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  // Get all unique tags
  const allTags = [...new Set(glossaryTerms.flatMap(term => term.tags))];

  // Filter terms based on search and tags
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => term.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Toggle favorite
  const toggleFavorite = (termName) => {
    setFavorites(prev => 
      prev.includes(termName) 
        ? prev.filter(f => f !== termName)
        : [...prev, termName]
    );
  };

  // Toggle tag filter
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Generate quiz question
  const generateQuizQuestion = (term) => {
    const questionTypes = ["multiple-choice", "fill-blank", "definition"];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    if (type === "multiple-choice") {
      const wrongAnswers = glossaryTerms
        .filter(t => t.term !== term.term)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.definition);
      
      const options = [...wrongAnswers, term.definition].sort(() => Math.random() - 0.5);
      
      return {
        type: "multiple-choice",
        question: `What is the definition of "${term.term}"?`,
        options,
        correct: term.definition,
        term: term.term
      };
    } else if (type === "fill-blank") {
      const words = term.definition.split(' ');
      const blankIndex = Math.floor(Math.random() * words.length);
      const blankWord = words[blankIndex];
      const questionText = words.map((word, index) => 
        index === blankIndex ? '______' : word
      ).join(' ');
      
      return {
        type: "fill-blank",
        question: `Fill in the blank: ${questionText}`,
        correct: blankWord.toLowerCase(),
        term: term.term
      };
    } else {
      return {
        type: "definition",
        question: `Given this example: "${term.example}" - What tax concept is being described?`,
        correct: term.term,
        term: term.term
      };
    }
  };

  // Start quiz
  const startQuiz = () => {
    const availableTerms = glossaryTerms.filter(term => 
      !userStats.masteredTerms.includes(term.term)
    );
    
    if (availableTerms.length === 0) {
      alert("Congratulations! You've mastered all terms!");
      return;
    }
    
    const randomTerm = availableTerms[Math.floor(Math.random() * availableTerms.length)];
    const question = generateQuizQuestion(randomTerm);
    setCurrentQuizTerm(question);
    setUserAnswer("");
    setShowAnswer(false);
  };

  // Submit quiz answer
  const submitAnswer = () => {
    const isCorrect = currentQuizTerm.type === "multiple-choice" 
      ? userAnswer === currentQuizTerm.correct
      : userAnswer.toLowerCase().trim() === currentQuizTerm.correct.toLowerCase();

    const newStats = { ...userStats };
    
    if (isCorrect) {
      newStats.correct += 1;
      newStats.xp += 10;
      
      // Track progress for this term
      const termProgress = userProgress[currentQuizTerm.term] || { correct: 0, incorrect: 0 };
      termProgress.correct += 1;
      
      // Master term if answered correctly 3 times
      if (termProgress.correct >= 3 && !newStats.masteredTerms.includes(currentQuizTerm.term)) {
        newStats.masteredTerms.push(currentQuizTerm.term);
        newStats.xp += 25; // Bonus XP for mastering
        
        // Award badges
        const masteredCount = newStats.masteredTerms.length;
        if (masteredCount === 5 && !newStats.badges.includes("5-terms")) {
          newStats.badges.push("5-terms");
        } else if (masteredCount === 10 && !newStats.badges.includes("10-terms")) {
          newStats.badges.push("10-terms");
        } else if (masteredCount === 25 && !newStats.badges.includes("25-terms")) {
          newStats.badges.push("25-terms");
        } else if (masteredCount === 50 && !newStats.badges.includes("50-terms")) {
          newStats.badges.push("50-terms");
        }
      }
      
      setUserProgress(prev => ({ ...prev, [currentQuizTerm.term]: termProgress }));
    } else {
      newStats.incorrect += 1;
      const termProgress = userProgress[currentQuizTerm.term] || { correct: 0, incorrect: 0 };
      termProgress.incorrect += 1;
      setUserProgress(prev => ({ ...prev, [currentQuizTerm.term]: termProgress }));
    }
    
    setUserStats(newStats);
    setShowAnswer(true);
  };

  // Badge component
  const Badge = ({ badge }) => {
    const badges = {
      "5-terms": { name: "Tax Rookie", icon: "🌱", color: "bg-green-500" },
      "10-terms": { name: "Tax Strategist", icon: "⚡", color: "bg-blue-500" },
      "25-terms": { name: "Tax Expert", icon: "🎯", color: "bg-purple-500" },
      "50-terms": { name: "Tax Master", icon: "👑", color: "bg-yellow-500" }
    };
    
    const badgeInfo = badges[badge];
    return (
      <div className={`${badgeInfo.color} text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1`}>
        <span>{badgeInfo.icon}</span>
        <span>{badgeInfo.name}</span>
      </div>
    );
  };

  // Progress ring component
  const ProgressRing = () => {
    const masteredCount = userStats.masteredTerms.length;
    const percentage = (masteredCount / glossaryTerms.length) * 100;
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-yellow-500 transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{masteredCount}/{glossaryTerms.length}</span>
        </div>
      </div>
    );
  };

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