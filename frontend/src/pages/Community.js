import { useState, useEffect } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [leaderboardFilter, setLeaderboardFilter] = useState("all-time");
  const [personaFilter, setPersonaFilter] = useState("global");
  const [activeChannel, setActiveChannel] = useState("ask-an-advisor");
  const [newMessage, setNewMessage] = useState("");
  const [userStats, setUserStats] = useState({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [showNotification, setShowNotification] = useState(null);

  // Load user data and check streaks
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    const savedStreak = localStorage.getItem('currentStreak');
    const savedLastLogin = localStorage.getItem('lastLoginDate');
    
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedStreak) setCurrentStreak(parseInt(savedStreak));
    if (savedLastLogin) setLastLoginDate(savedLastLogin);

    // Check and update daily login streak
    checkDailyLogin();
  }, []);

  // Check daily login and award XP
  const checkDailyLogin = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = 1;
      if (lastLogin === yesterday.toDateString()) {
        newStreak = currentStreak + 1;
      }
      
      // Award daily login XP
      awardXP(5, "Daily Login Bonus");
      
      // Check streak bonuses
      if (newStreak === 5) {
        awardXP(100, "5-Day Streak Bonus");
        showNotificationPopup("🔥 5-Day Streak! +100 XP Bonus!", "success");
      } else if (newStreak === 30) {
        awardBadge("Consistency Beast");
        showNotificationPopup("🏆 30-Day Streak! Consistency Beast Badge Unlocked!", "badge");
      }
      
      setCurrentStreak(newStreak);
      setLastLoginDate(today);
      localStorage.setItem('currentStreak', newStreak.toString());
      localStorage.setItem('lastLoginDate', today);
    }
  };

  // Award XP function
  const awardXP = (amount, reason) => {
    const currentStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const newXP = (currentStats.xp || 0) + amount;
    const oldXP = currentStats.xp || 0;
    
    currentStats.xp = newXP;
    currentStats.xpHistory = [...(currentStats.xpHistory || []), {
      amount,
      reason,
      timestamp: new Date().toISOString(),
      totalXP: newXP
    }];
    
    setUserStats(currentStats);
    localStorage.setItem('userStats', JSON.stringify(currentStats));
    
    // Check for XP milestones
    checkXPMilestones(oldXP, newXP);
  };

  // Award badge function
  const awardBadge = (badgeName) => {
    const currentStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const badges = currentStats.badges || [];
    
    if (!badges.includes(badgeName)) {
      badges.push(badgeName);
      currentStats.badges = badges;
      setUserStats(currentStats);
      localStorage.setItem('userStats', JSON.stringify(currentStats));
    }
  };

  // Check XP milestones
  const checkXPMilestones = (oldXP, newXP) => {
    const milestones = [1000, 2500, 5000, 10000, 25000];
    
    milestones.forEach(milestone => {
      if (oldXP < milestone && newXP >= milestone) {
        showNotificationPopup(`🎉 ${milestone} XP Milestone Reached!`, "milestone");
        
        // Award milestone badges
        if (milestone === 1000) awardBadge("Rising Star");
        if (milestone === 2500) awardBadge("Tax Strategist");
        if (milestone === 5000) awardBadge("Expert Level");
        if (milestone === 10000) awardBadge("Tax Master");
        if (milestone === 25000) awardBadge("Legend");
      }
    });
  };

  // Show notification popup
  const showNotificationPopup = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 4000);
  };

  // Mock leaderboard data
  const generateLeaderboardData = () => {
    const mockUsers = [
      { id: 1, username: "TaxMaster2024", persona: "Business Owner", xp: 15420, badge: "Master", streak: 45, avatar: "👑" },
      { id: 2, username: "RealEstateQueen", persona: "Real Estate", xp: 12850, badge: "Gold", streak: 23, avatar: "🏠" },
      { id: 3, username: "W2Warrior", persona: "W-2 Professional", xp: 11200, badge: "Gold", streak: 18, avatar: "💼" },
      { id: 4, username: "StrategicSaver", persona: "Business Owner", xp: 9890, badge: "Silver", streak: 12, avatar: "💰" },
      { id: 5, username: "PropertyPro", persona: "Real Estate", xp: 8750, badge: "Silver", streak: 31, avatar: "🏘️" },
      { id: 6, username: "EmployeeExpert", persona: "W-2 Professional", xp: 7650, badge: "Silver", streak: 7, avatar: "📊" },
      { id: 7, username: "TaxNinja", persona: "Business Owner", xp: 6890, badge: "Bronze", streak: 5, avatar: "🥷" },
      { id: 8, username: "InvestorInsight", persona: "Real Estate", xp: 5920, badge: "Bronze", streak: 14, avatar: "📈" },
      { id: 9, username: "SalaryOptimizer", persona: "W-2 Professional", xp: 5100, badge: "Bronze", streak: 9, avatar: "⚡" },
      { id: 10, username: "DeductionDynamo", persona: "Business Owner", xp: 4750, badge: "Bronze", streak: 22, avatar: "🚀" },
      // Add current user
      { 
        id: "current", 
        username: "You", 
        persona: userStats.recommendedPersona || "W-2 Professional", 
        xp: userStats.xp || 0, 
        badge: getBadgeTier(userStats.xp || 0), 
        streak: currentStreak,
        avatar: "⭐",
        isCurrentUser: true
      }
    ];

    // Filter by persona if not global
    let filteredUsers = mockUsers;
    if (personaFilter !== "global") {
      const personaMap = {
        "w2": "W-2 Professional",
        "business": "Business Owner", 
        "realestate": "Real Estate"
      };
      filteredUsers = mockUsers.filter(user => user.persona === personaMap[personaFilter]);
    }

    // Sort by XP and add rankings
    return filteredUsers
      .sort((a, b) => b.xp - a.xp)
      .map((user, index) => ({ ...user, rank: index + 1 }))
      .slice(0, 50);
  };

  // Get badge tier based on XP
  const getBadgeTier = (xp) => {
    if (xp >= 10000) return "Master";
    if (xp >= 5000) return "Gold";
    if (xp >= 2500) return "Silver";
    if (xp >= 1000) return "Bronze";
    return "Beginner";
  };

  // Community channels data
  const channels = [
    {
      id: "ask-an-advisor",
      name: "ask-an-advisor",
      description: "Office hours twice a week - Get expert advice",
      icon: "🤝",
      lastActivity: "2 hours ago",
      memberCount: 1247
    },
    {
      id: "w2-strategies", 
      name: "w2-strategies",
      description: "Tax optimization for W-2 employees",
      icon: "💼",
      lastActivity: "30 minutes ago",
      memberCount: 892
    },
    {
      id: "business-tax-playbooks",
      name: "business-tax-playbooks", 
      description: "Advanced business tax strategies",
      icon: "🏢",
      lastActivity: "1 hour ago",
      memberCount: 1156
    },
    {
      id: "real-estate-tax-hacks",
      name: "real-estate-tax-hacks",
      description: "Real estate investor tax strategies", 
      icon: "🏠",
      lastActivity: "45 minutes ago",
      memberCount: 743
    },
    {
      id: "wins-and-milestones",
      name: "wins-and-milestones",
      description: "Share your tax savings victories",
      icon: "🎉", 
      lastActivity: "15 minutes ago",
      memberCount: 2103
    }
  ];

  // Mock community messages
  const getChannelMessages = (channelId) => {
    const messagesByChannel = {
      "ask-an-advisor": [
        {
          id: 1,
          username: "TaxAdvisor_Sarah",
          role: "Advisor",
          message: "Office hours starting in 30 minutes! Bring your REPS questions.",
          timestamp: "2 hours ago",
          upvotes: 24,
          replies: 8,
          avatar: "👩‍💼"
        },
        {
          id: 2,
          username: "W2Warrior", 
          message: "Can I qualify for REPS if I have a day job? Looking at @Real Estate Professional Status",
          timestamp: "3 hours ago",
          upvotes: 12,
          replies: 5,
          avatar: "💼"
        }
      ],
      "w2-strategies": [
        {
          id: 3,
          username: "SalaryOptimizer",
          message: "Just saved $15K with a Solo 401k setup! Check out @Solo 401k module for details.",
          timestamp: "30 minutes ago", 
          upvotes: 31,
          replies: 12,
          avatar: "⚡"
        },
        {
          id: 4,
          username: "EmployeeExpert",
          message: "Backdoor Roth strategy working perfectly. See @Backdoor Roth IRA for implementation.",
          timestamp: "1 hour ago",
          upvotes: 18,
          replies: 7,
          avatar: "📊"
        }
      ],
      "business-tax-playbooks": [
        {
          id: 5,
          username: "TaxMaster2024",
          message: "Oil & Gas IDCs delivered 80% deduction this year. @Oil & Gas IDCs module is gold!",
          timestamp: "1 hour ago",
          upvotes: 47,
          replies: 15,
          avatar: "👑"
        }
      ],
      "real-estate-tax-hacks": [
        {
          id: 6,
          username: "PropertyPro", 
          message: "Cost segregation study on 4-unit property: $45K in year-1 deductions. Worth every penny!",
          timestamp: "45 minutes ago",
          upvotes: 28,
          replies: 9,
          avatar: "🏘️"
        }
      ],
      "wins-and-milestones": [
        {
          id: 7,
          username: "DeductionDynamo",
          message: "🎉 Just hit 5,000 XP and saved $127K in taxes this year using platform strategies!",
          timestamp: "15 minutes ago",
          upvotes: 89,
          replies: 23,
          avatar: "🚀"
        }
      ]
    };

    return messagesByChannel[channelId] || [];
  };

  // Handle upvote
  const handleUpvote = (messageId) => {
    awardXP(2, "Community Engagement");
    // In real app, would update message upvote count
  };

  // Handle new message
  const handleNewMessage = () => {
    if (!newMessage.trim()) return;
    
    awardXP(5, "Community Contribution");
    setNewMessage("");
    
    // In real app, would add message to channel
  };

  // Get streak emoji
  const getStreakEmoji = (streak) => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⚡";
    if (streak >= 7) return "💪";
    if (streak >= 3) return "🌟";
    return "📈";
  };

  // Leaderboard component
  const LeaderboardView = () => {
    const leaderboardData = generateLeaderboardData();
    
    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                <select
                  value={leaderboardFilter}
                  onChange={(e) => setLeaderboardFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all-time">All Time</option>
                  <option value="this-month">This Month</option>
                  <option value="this-week">This Week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leaderboard</label>
                <select
                  value={personaFilter}
                  onChange={(e) => setPersonaFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="global">🌍 Global</option>
                  <option value="w2">💼 W-2 Professionals</option>
                  <option value="business">🏢 Business Owners</option>
                  <option value="realestate">🏠 Real Estate</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.xp || 0}</div>
              <div className="text-sm text-gray-600">Your XP</div>
              <div className="flex items-center justify-center mt-1">
                <span className="text-lg">{getStreakEmoji(currentStreak)}</span>
                <span className="text-sm text-gray-600 ml-1">{currentStreak} day streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              🏆 {personaFilter === "global" ? "Global" : personaFilter.toUpperCase()} Leaderboard
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Persona</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">XP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((user) => (
                  <tr key={user.id} className={`${user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.rank <= 3 && (
                          <span className="text-lg mr-2">
                            {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                          </span>
                        )}
                        <span className="font-semibold text-gray-900">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{user.avatar}</span>
                        <div>
                          <div className={`font-medium ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                            {user.username}
                            {user.isCurrentUser && <span className="text-blue-600 ml-2">(You)</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.persona}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">{user.xp.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.badge === "Master" ? "bg-purple-100 text-purple-800" :
                        user.badge === "Gold" ? "bg-yellow-100 text-yellow-800" :
                        user.badge === "Silver" ? "bg-gray-100 text-gray-800" :
                        user.badge === "Bronze" ? "bg-orange-100 text-orange-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {user.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-1">{getStreakEmoji(user.streak)}</span>
                        <span className="text-sm text-gray-600">{user.streak}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Community view
  const CommunityView = () => {
    const activeChannelData = channels.find(c => c.id === activeChannel);
    const messages = getChannelMessages(activeChannel);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Channel List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Channels</h3>
          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeChannel === channel.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{channel.icon}</span>
                    <span className="font-medium">#{channel.name}</span>
                  </div>
                  {channel.memberCount > 1000 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {Math.round(channel.memberCount / 100) / 10}k
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{channel.description}</div>
                <div className="text-xs text-gray-400 mt-1">{channel.lastActivity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow flex flex-col">
          {/* Channel Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{activeChannelData?.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">#{activeChannelData?.name}</h3>
                <p className="text-sm text-gray-600">{activeChannelData?.description}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{message.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{message.username}</span>
                      {message.role && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {message.role}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{message.message}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        onClick={() => handleUpvote(message.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                      >
                        <span>👍</span>
                        <span>{message.upvotes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                        <span>💬</span>
                        <span>{message.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNewMessage()}
                placeholder={`Message #${activeChannelData?.name}`}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleNewMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Tip: Use @Term Name to link glossary terms and earn +2 XP
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="mt-2 text-gray-600">Connect, compete, and accelerate your tax strategy learning</p>
        </div>

        {/* XP & Streak Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="text-2xl font-bold">{userStats.xp || 0}</div>
            <div className="text-sm opacity-90">Total XP</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{getStreakEmoji(currentStreak)}</span>
              <div>
                <div className="text-2xl font-bold">{currentStreak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg">
            <div className="text-2xl font-bold">{getBadgeTier(userStats.xp || 0)}</div>
            <div className="text-sm opacity-90">Current Tier</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
            <div className="text-2xl font-bold">#{generateLeaderboardData().find(u => u.isCurrentUser)?.rank || "N/A"}</div>
            <div className="text-sm opacity-90">Global Rank</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "leaderboard", name: "🏆 Leaderboard", count: "50" },
              { id: "community", name: "💬 Community", count: "5 channels" },
              { id: "rewards", name: "🎁 Rewards", count: "Active" }
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
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "leaderboard" && <LeaderboardView />}
        {activeTab === "community" && <CommunityView />}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎁 Daily Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold mb-2">✅ Daily Login</div>
                  <div className="text-2xl font-bold text-green-700">+5 XP</div>
                  <div className="text-sm text-green-600">Complete ✓</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold mb-2">🧠 Complete Quiz</div>
                  <div className="text-2xl font-bold text-blue-700">+10 XP</div>
                  <div className="text-sm text-blue-600">Available</div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <div className="text-purple-600 font-semibold mb-2">📚 Finish Module</div>
                  <div className="text-2xl font-bold text-purple-700">+25 XP</div>
                  <div className="text-sm text-purple-600">Available</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Streak Bonuses</h3>
              <div className="space-y-3">
                <div className={`p-4 rounded-lg ${currentStreak >= 5 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">5-Day Streak Bonus</span>
                    <span className={`font-bold ${currentStreak >= 5 ? 'text-green-600' : 'text-gray-500'}`}>
                      +100 XP {currentStreak >= 5 && "✅"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Progress: {Math.min(currentStreak, 5)}/5 days
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${currentStreak >= 30 ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">30-Day Streak - Consistency Beast Badge</span>
                    <span className={`font-bold ${currentStreak >= 30 ? 'text-purple-600' : 'text-gray-500'}`}>
                      Badge {currentStreak >= 30 && "🏆"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Progress: {Math.min(currentStreak, 30)}/30 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Popup */}
        {showNotification && (
          <div className="fixed top-20 right-4 z-50">
            <div className={`${
              showNotification.type === "success" ? "bg-green-500" :
              showNotification.type === "milestone" ? "bg-purple-500" :
              showNotification.type === "badge" ? "bg-yellow-500" :
              "bg-blue-500"
            } text-white p-4 rounded-lg shadow-lg max-w-sm`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {showNotification.type === "success" && "🎉"}
                  {showNotification.type === "milestone" && "🏆"}
                  {showNotification.type === "badge" && "🏅"}
                </div>
                <div className="font-medium">{showNotification.message}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;