import { useState, useEffect } from "react";

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [advisorNotes, setAdvisorNotes] = useState({});
  const [userTags, setUserTags] = useState({});
  const [showCallPrep, setShowCallPrep] = useState(false);

  // Mock advisor authentication - in real app would be handled by backend
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [advisorInfo] = useState({
    name: "Sarah Chen, CPA",
    id: "advisor_001",
    role: "Senior Tax Strategist",
    permissions: ["view_users", "annotate_docs", "export_reports"]
  });

  // Load advisor data
  useEffect(() => {
    const savedNotes = localStorage.getItem('advisorNotes');
    const savedTags = localStorage.getItem('userTags');
    
    if (savedNotes) setAdvisorNotes(JSON.parse(savedNotes));
    if (savedTags) setUserTags(JSON.parse(savedTags));
    
    // Check authentication status
    const isLoggedIn = localStorage.getItem('advisorAuthenticated');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Mock user data - in real app would come from backend API
  const mockUsers = [
    {
      id: "user_001",
      name: "Michael Thompson",
      email: "michael.t@email.com",
      persona: "Business Owner",
      joinDate: "2024-02-15",
      lastActive: "2024-03-10",
      status: "Active",
      xp: 2450,
      level: "Tax Expert",
      courseProgress: {
        modulesCompleted: 7,
        totalModules: 9,
        currentModule: "Advanced Strategies",
        completionRate: 78
      },
      quizStats: {
        totalQuizzes: 24,
        correctAnswers: 189,
        incorrectAnswers: 31,
        accuracy: 86,
        weakAreas: ["QSBS", "Oil & Gas IDCs"],
        strongAreas: ["Entity Structuring", "Roth Conversions"]
      },
      readyToImplement: [
        {
          strategy: "S-Corp Election",
          category: "Entity Structuring", 
          dateMarked: "2024-03-08",
          complexity: "Medium",
          estimatedSavings: "$15,000"
        },
        {
          strategy: "Solo 401k Setup",
          category: "Retirement Planning",
          dateMarked: "2024-03-05",
          complexity: "Low",
          estimatedSavings: "$8,500"
        },
        {
          strategy: "Cost Segregation Study",
          category: "Real Estate",
          dateMarked: "2024-03-02",
          complexity: "High",
          estimatedSavings: "$35,000"
        }
      ],
      uploadedDocs: [
        {
          id: "doc_001",
          name: "2023_Business_Return.pdf",
          type: "Tax Return",
          uploadDate: "2024-03-01",
          size: "2.4 MB",
          annotations: []
        },
        {
          id: "doc_002", 
          name: "Real_Estate_K1.pdf",
          type: "K-1",
          uploadDate: "2024-02-28",
          size: "1.8 MB",
          annotations: [
            {
              id: "ann_001",
              page: 1,
              note: "Passive income potential for REPS election",
              advisor: "Sarah Chen",
              timestamp: "2024-03-05"
            }
          ]
        }
      ],
      riskFactors: ["High AGI", "Complex Entity Structure"],
      implementationReadiness: "Ready",
      nextCallDate: "2024-03-15"
    },
    {
      id: "user_002",
      name: "Jennifer Liu",
      email: "jennifer.liu@email.com", 
      persona: "W-2 Employee",
      joinDate: "2024-01-20",
      lastActive: "2024-03-11",
      status: "Active",
      xp: 1150,
      level: "Tax Strategist",
      courseProgress: {
        modulesCompleted: 4,
        totalModules: 9,
        currentModule: "Retirement Conversion",
        completionRate: 44
      },
      quizStats: {
        totalQuizzes: 18,
        correctAnswers: 142,
        incorrectAnswers: 28,
        accuracy: 83,
        weakAreas: ["Real Estate Professional Status", "STR Material Participation"],
        strongAreas: ["Roth Conversions", "HSA Strategies"]
      },
      readyToImplement: [
        {
          strategy: "Backdoor Roth IRA",
          category: "Retirement Planning",
          dateMarked: "2024-03-10",
          complexity: "Medium",
          estimatedSavings: "$12,000"
        }
      ],
      uploadedDocs: [
        {
          id: "doc_003",
          name: "W2_2023.pdf",
          type: "W-2",
          uploadDate: "2024-03-10",
          size: "0.8 MB",
          annotations: []
        }
      ],
      riskFactors: ["Limited Implementation Experience"],
      implementationReadiness: "Needs Guidance", 
      nextCallDate: "2024-03-18"
    },
    {
      id: "user_003",
      name: "Robert Martinez",
      email: "robert.m@email.com",
      persona: "Real Estate Investor",
      joinDate: "2024-03-01",
      lastActive: "2024-03-11",
      status: "Active",
      xp: 3200,
      level: "Tax Expert",
      courseProgress: {
        modulesCompleted: 8,
        totalModules: 9,
        currentModule: "Implementation Mastery",
        completionRate: 89
      },
      quizStats: {
        totalQuizzes: 32,
        correctAnswers: 267,
        incorrectAnswers: 21,
        accuracy: 93,
        weakAreas: ["Opportunity Zone Funds"],
        strongAreas: ["REPS", "Cost Segregation", "1031 Exchanges"]
      },
      readyToImplement: [
        {
          strategy: "REPS Election",
          category: "Real Estate",
          dateMarked: "2024-03-11",
          complexity: "High",
          estimatedSavings: "$45,000"
        },
        {
          strategy: "Material Participation",
          category: "Real Estate", 
          dateMarked: "2024-03-09",
          complexity: "Medium",
          estimatedSavings: "$28,000"
        }
      ],
      uploadedDocs: [
        {
          id: "doc_004",
          name: "Rental_Property_Schedule_E.pdf",
          type: "Schedule E",
          uploadDate: "2024-03-11",
          size: "1.9 MB",
          annotations: []
        }
      ],
      riskFactors: ["IRS Audit History"],
      implementationReadiness: "Ready",
      nextCallDate: "2024-03-14"
    }
  ];

  // Authentication component
  const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    
    const handleLogin = (e) => {
      e.preventDefault();
      // Mock authentication - in real app would validate against backend
      if (credentials.username === "advisor" && credentials.password === "quantus2024") {
        localStorage.setItem('advisorAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        alert("Invalid credentials. Use: advisor / quantus2024");
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Quantus Advisor Portal</h1>
            <p className="text-gray-600 mt-2">Secure access for tax advisors</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login to Advisor Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Demo credentials: advisor / quantus2024
          </div>
        </div>
      </div>
    );
  };

  // Filter users based on search and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.persona.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "ready" && user.implementationReadiness === "Ready") ||
                         (filterStatus === "needs-guidance" && user.implementationReadiness === "Needs Guidance") ||
                         (filterStatus === "high-xp" && user.xp >= 2000);
    
    return matchesSearch && matchesStatus;
  });

  // Save advisor notes
  const saveAdvisorNote = (userId, note) => {
    const updatedNotes = {
      ...advisorNotes,
      [userId]: [...(advisorNotes[userId] || []), {
        id: Date.now(),
        note,
        advisor: advisorInfo.name,
        timestamp: new Date().toISOString()
      }]
    };
    setAdvisorNotes(updatedNotes);
    localStorage.setItem('advisorNotes', JSON.stringify(updatedNotes));
  };

  // Update user tags
  const updateUserTag = (userId, tag) => {
    const updatedTags = { ...userTags, [userId]: tag };
    setUserTags(updatedTags);
    localStorage.setItem('userTags', JSON.stringify(updatedTags));
  };

  // Generate call prep summary
  const generateCallPrepSummary = (user) => {
    const userNotes = advisorNotes[user.id] || [];
    const userTag = userTags[user.id] || "Untagged";
    
    return {
      userOverview: {
        name: user.name,
        persona: user.persona,
        level: user.level,
        xp: user.xp,
        tag: userTag
      },
      strengths: user.quizStats.strongAreas,
      weaknesses: user.quizStats.weakAreas,
      readyStrategies: user.readyToImplement,
      riskFactors: user.riskFactors,
      recommendations: [
        `Focus on ${user.quizStats.weakAreas[0]} education before implementation`,
        `Review uploaded documents for optimization opportunities`,
        `Consider scheduling follow-up in 2 weeks`
      ],
      advisorNotes: userNotes
    };
  };

  // Export report
  const exportReport = (user) => {
    const summary = generateCallPrepSummary(user);
    const reportData = {
      generatedBy: advisorInfo.name,
      generatedAt: new Date().toISOString(),
      user: user,
      summary: summary
    };
    
    // In real app, this would generate and download a PDF
    console.log("Exporting report:", reportData);
    alert("Report exported successfully! (Check console for data)");
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quantus Advisor Dashboard</h1>
              <p className="text-gray-600">Tax strategy advisory platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{advisorInfo.name}</p>
                <p className="text-sm text-gray-600">{advisorInfo.role}</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('advisorAuthenticated');
                  setIsAuthenticated(false);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "users", name: "User Management", icon: "👥" },
              { id: "analytics", name: "Analytics", icon: "📊" },
              { id: "documents", name: "Document Review", icon: "📄" },
              { id: "glossary", name: "Glossary Analytics", icon: "📚" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-lg">
                  <input
                    type="text"
                    placeholder="Search users by name, email, or persona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Users</option>
                    <option value="ready">Ready to Implement</option>
                    <option value="needs-guidance">Needs Guidance</option>
                    <option value="high-xp">High XP (2000+)</option>
                  </select>
                  <div className="text-sm text-gray-600">
                    {filteredUsers.length} users
                  </div>
                </div>
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* User Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userTags[user.id] === "Hot" ? "bg-red-100 text-red-800" :
                          userTags[user.id] === "Warm" ? "bg-orange-100 text-orange-800" :
                          userTags[user.id] === "Cold" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {userTags[user.id] || "Untagged"}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.implementationReadiness === "Ready" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {user.implementationReadiness}
                        </span>
                      </div>
                    </div>

                    {/* User Stats */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Persona:</span>
                        <span className="font-medium">{user.persona}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">{user.level} ({user.xp} XP)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Course Progress:</span>
                        <span className="font-medium">{user.courseProgress.completionRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quiz Accuracy:</span>
                        <span className="font-medium">{user.quizStats.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ready Strategies:</span>
                        <span className="font-medium">{user.readyToImplement.length}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setShowCallPrep(user)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                      >
                        Call Prep
                      </button>
                    </div>

                    {/* Tag Selector */}
                    <div className="mt-3">
                      <select
                        value={userTags[user.id] || ""}
                        onChange={(e) => updateUserTag(user.id, e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Select Tag</option>
                        <option value="Hot">🔥 Hot Lead</option>
                        <option value="Warm">🟡 Warm Lead</option>
                        <option value="Cold">🔵 Cold Lead</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{mockUsers.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ready to Implement</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {mockUsers.filter(u => u.implementationReadiness === "Ready").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg XP</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {Math.round(mockUsers.reduce((acc, u) => acc + u.xp, 0) / mockUsers.length)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {Math.round(mockUsers.reduce((acc, u) => acc + u.quizStats.accuracy, 0) / mockUsers.length)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Performance Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Performance Overview</h3>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.persona}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{user.xp}</p>
                        <p className="text-xs text-gray-600">XP</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{user.quizStats.accuracy}%</p>
                        <p className="text-xs text-gray-600">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{user.readyToImplement.length}</p>
                        <p className="text-xs text-gray-600">Strategies</p>
                      </div>
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${user.courseProgress.completionRate}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{user.courseProgress.completionRate}% Complete</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Document Review</h3>
              <div className="space-y-4">
                {mockUsers.flatMap(user => 
                  user.uploadedDocs.map(doc => ({
                    ...doc,
                    userName: user.name,
                    userPersona: user.persona,
                    userId: user.id
                  }))
                ).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <span className="text-2xl">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.userName} • {doc.userPersona}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {doc.annotations.length > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {doc.annotations.length} annotations
                        </span>
                      )}
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        Review Document
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Glossary Analytics Tab */}
        {activeTab === "glossary" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Glossary Performance Heatmap</h3>
              
              {/* Common Weak Areas */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Most Missed Terms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["QSBS", "Oil & Gas IDCs", "REPS", "Cost Segregation", "Opportunity Zone Funds", "F-Reorg"].map((term, index) => (
                    <div key={term} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="font-medium text-gray-900">{term}</span>
                      <span className="text-sm text-red-600">{Math.floor(Math.random() * 40) + 20}% miss rate</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Areas */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Well Understood Terms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Roth Conversion", "Entity Structuring", "HSA Strategies", "Backdoor Roth", "Solo 401k", "STR"].map((term, index) => (
                    <div key={term} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="font-medium text-gray-900">{term}</span>
                      <span className="text-sm text-green-600">{Math.floor(Math.random() * 20) + 80}% accuracy</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-5/6 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600">{selectedUser.email} • {selectedUser.persona}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-gray-500 text-xl">✕</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Progress Overview */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Course Progress</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Modules Completed</span>
                          <span>{selectedUser.courseProgress.modulesCompleted}/{selectedUser.courseProgress.totalModules}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${selectedUser.courseProgress.completionRate}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">Currently on: {selectedUser.courseProgress.currentModule}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Quiz Performance</h3>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{selectedUser.quizStats.correctAnswers}</p>
                          <p className="text-xs text-gray-600">Correct</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">{selectedUser.quizStats.incorrectAnswers}</p>
                          <p className="text-xs text-gray-600">Incorrect</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-center text-lg font-bold text-gray-900">{selectedUser.quizStats.accuracy}% Accuracy</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Strengths & Weaknesses</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Strong Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedUser.quizStats.strongAreas.map((area) => (
                              <span key={area} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-700 mb-1">Weak Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedUser.quizStats.weakAreas.map((area) => (
                              <span key={area} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implementation Readiness */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Ready to Implement</h3>
                      <div className="space-y-3">
                        {selectedUser.readyToImplement.map((strategy, index) => (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium text-gray-900">{strategy.strategy}</p>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                strategy.complexity === "High" ? "bg-red-100 text-red-800" :
                                strategy.complexity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {strategy.complexity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{strategy.category}</p>
                            <p className="text-sm text-green-600">Est. Savings: {strategy.estimatedSavings}</p>
                            <p className="text-xs text-gray-500">Marked: {strategy.dateMarked}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Risk Factors</h3>
                      <div className="space-y-2">
                        {selectedUser.riskFactors.map((risk) => (
                          <div key={risk} className="flex items-center space-x-2">
                            <span className="text-red-500">⚠️</span>
                            <span className="text-sm text-gray-700">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Advisor Notes</h3>
                      <div className="space-y-2 mb-3">
                        {(advisorNotes[selectedUser.id] || []).map((note) => (
                          <div key={note.id} className="bg-white p-2 rounded border text-sm">
                            <p className="text-gray-700">{note.note}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {note.advisor} • {new Date(note.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add advisor note..."
                          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              saveAdvisorNote(selectedUser.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            if (input.value.trim()) {
                              saveAdvisorNote(selectedUser.id, input.value);
                              input.value = '';
                            }
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => exportReport(selectedUser)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Export Report
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call Prep Modal */}
        {showCallPrep && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-5/6 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Call Prep: {showCallPrep.name}</h2>
                <button
                  onClick={() => setShowCallPrep(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-gray-500 text-xl">✕</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {(() => {
                  const summary = generateCallPrepSummary(showCallPrep);
                  return (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-3">User Overview</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Persona: {summary.userOverview.persona}</div>
                          <div>Level: {summary.userOverview.level}</div>
                          <div>XP: {summary.userOverview.xp}</div>
                          <div>Tag: {summary.userOverview.tag}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">Strengths</h3>
                          <ul className="space-y-1 text-sm">
                            {summary.strengths.map((strength) => (
                              <li key={strength} className="flex items-center space-x-2">
                                <span className="text-green-500">✓</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">Areas for Development</h3>
                          <ul className="space-y-1 text-sm">
                            {summary.weaknesses.map((weakness) => (
                              <li key={weakness} className="flex items-center space-x-2">
                                <span className="text-red-500">⚠</span>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-3">Implementation Ready Strategies</h3>
                        <div className="space-y-2">
                          {summary.readyStrategies.map((strategy, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span>{strategy.strategy}</span>
                              <span className="text-green-600">{strategy.estimatedSavings}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-3">Recommendations for Call</h3>
                        <ul className="space-y-2 text-sm">
                          {summary.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-blue-500 mt-1">→</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {summary.advisorNotes.length > 0 && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">Previous Notes</h3>
                          <div className="space-y-2">
                            {summary.advisorNotes.map((note) => (
                              <div key={note.id} className="text-sm">
                                <p className="text-gray-700">{note.note}</p>
                                <p className="text-xs text-gray-500">
                                  {note.advisor} • {new Date(note.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => exportReport(showCallPrep)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Export Summary
                </button>
                <button
                  onClick={() => setShowCallPrep(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorDashboard;