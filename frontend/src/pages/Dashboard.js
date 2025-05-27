import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({});
  const [courseProgress, setCourseProgress] = useState({});
  const [unlockedTools, setUnlockedTools] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
    generateRecommendations();
  }, []);

  // Load user statistics and progress
  const loadUserData = () => {
    const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    
    // Default user stats
    const defaultStats = {
      totalXP: 1250,
      level: calculateLevel(1250),
      tier: calculateTier(1250),
      weeklyStreak: 5,
      quizAccuracy: 87,
      completedModules: 7,
      totalModules: 12,
      badges: ['W-2 Specialist', 'Quiz Master', 'Streak Warrior'],
      xpHistory: [],
      lastLogin: new Date().toISOString()
    };

    const defaultProgress = {
      currentModule: 'module-8',
      moduleProgress: {
        'module-1': 100,
        'module-2': 100,
        'module-3': 100,
        'module-4': 100,
        'module-5': 100,
        'module-6': 100,
        'module-7': 100,
        'module-8': 65,
        'module-9': 0,
        'module-10': 0,
        'module-11': 0,
        'module-12': 0
      },
      quizScores: {
        'module-1': 95,
        'module-2': 88,
        'module-3': 92,
        'module-4': 84,
        'module-5': 91,
        'module-6': 86,
        'module-7': 89
      }
    };

    setUserStats({ ...defaultStats, ...stats });
    setCourseProgress({ ...defaultProgress, ...progress });
    calculateUnlockedTools({ ...defaultStats, ...stats });
  };

  // Calculate user level based on XP
  const calculateLevel = (xp) => {
    if (xp < 500) return 1;
    if (xp < 1000) return 2;
    if (xp < 2000) return 3;
    if (xp < 3500) return 4;
    if (xp < 5000) return 5;
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate user tier
  const calculateTier = (xp) => {
    if (xp < 500) return 'Beginner';
    if (xp < 1000) return 'Apprentice';
    if (xp < 2000) return 'Practitioner';
    if (xp < 3500) return 'Expert';
    if (xp < 5000) return 'Master';
    return 'Grandmaster';
  };

  // Calculate XP needed for next level
  const getXPForNextLevel = (currentXP) => {
    const currentLevel = calculateLevel(currentXP);
    const xpThresholds = [0, 500, 1000, 2000, 3500, 5000];
    
    if (currentLevel >= 5) {
      return (currentLevel + 1) * 1000;
    }
    
    return xpThresholds[currentLevel] || 5000;
  };

  // Calculate unlocked tools based on progress
  const calculateUnlockedTools = (stats) => {
    const tools = [
      {
        id: 'strategy-finder',
        name: 'Strategy Finder',
        icon: '🔍',
        unlockedAt: 'Course Start',
        status: 'unlocked'
      },
      {
        id: 'savings-estimator',
        name: 'Tax Savings Estimator',
        icon: '💰',
        unlockedAt: 'Module 2 Complete',
        status: stats.completedModules >= 2 ? 'unlocked' : 'locked'
      },
      {
        id: 'entity-wizard',
        name: 'Entity Structure Wizard',
        icon: '🏢',
        unlockedAt: 'Module 4 Complete',
        status: stats.completedModules >= 4 ? 'unlocked' : 'locked'
      },
      {
        id: 'exposure-radar',
        name: 'IRS Exposure Radar',
        icon: '🎯',
        unlockedAt: 'Module 6 Complete',
        status: stats.completedModules >= 6 ? 'unlocked' : 'locked'
      },
      {
        id: 'str-optimizer',
        name: 'STR/REPS Optimizer',
        icon: '🏠',
        unlockedAt: 'Real Estate Badge',
        status: stats.badges?.includes('Real Estate Expert') ? 'unlocked' : 'locked'
      },
      {
        id: 'audit-heatmap',
        name: 'Audit Risk Heatmap',
        icon: '🔥',
        unlockedAt: 'Expert Tier',
        status: stats.tier === 'Expert' || stats.tier === 'Master' ? 'unlocked' : 'locked'
      }
    ];

    setUnlockedTools(tools);
  };

  // Generate smart recommendations based on user data
  const generateRecommendations = () => {
    const recs = [
      {
        id: 'entity-wizard-rec',
        title: 'Try the Entity Structure Wizard',
        description: 'Based on your business owner profile, this could save you an estimated $27,000 annually.',
        tool: 'entity-wizard',
        icon: '🏢',
        priority: 'high',
        reason: 'Profile match'
      },
      {
        id: 'quiz-improvement',
        title: 'Boost Your Quiz Scores',
        description: 'Your average quiz score is 87%. Retake Module 4 quiz to improve your mastery.',
        tool: 'glossary-quiz',
        icon: '📚',
        priority: 'medium',
        reason: 'Score improvement'
      },
      {
        id: 'streak-bonus',
        title: 'Keep Your Streak Going!',
        description: 'You\'re on a 5-day streak. Complete today\'s lesson to unlock bonus XP.',
        tool: 'continue-course',
        icon: '🔥',
        priority: 'medium',
        reason: 'Engagement'
      },
      {
        id: 'ai-assistant',
        title: 'Ask Our AI Assistant',
        description: 'Get instant answers to your tax strategy questions with our advanced AI.',
        tool: 'ai-assistant',
        icon: '🤖',
        priority: 'low',
        reason: 'Feature discovery'
      }
    ];

    setRecommendations(recs);
  };

  // Award XP and handle level up
  const awardXP = (amount, reason) => {
    const newXP = userStats.totalXP + amount;
    const oldLevel = userStats.level;
    const newLevel = calculateLevel(newXP);

    const updatedStats = {
      ...userStats,
      totalXP: newXP,
      level: newLevel,
      tier: calculateTier(newXP),
      xpHistory: [
        ...userStats.xpHistory,
        {
          amount,
          reason,
          timestamp: new Date().toISOString(),
          newTotal: newXP
        }
      ]
    };

    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));

    // Show level up animation if level increased
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

  // Get next incomplete module
  const getNextModule = () => {
    const modules = [
      { id: 'module-8', name: 'Advanced Deduction Strategies', progress: 65 },
      { id: 'module-9', name: 'Real Estate Tax Planning', progress: 0 },
      { id: 'module-10', name: 'Business Exit Strategies', progress: 0 }
    ];

    return modules.find(module => 
      (courseProgress.moduleProgress?.[module.id] || 0) < 100
    ) || modules[0];
  };

  // Progress card component
  const ProgressCard = () => {
    const xpProgress = ((userStats.totalXP % 1000) / 1000) * 100;
    const nextLevelXP = getXPForNextLevel(userStats.totalXP);
    const currentLevelXP = userStats.totalXP % 1000;

    return (
      <div className="card-gradient-text bg-gradient-to-br from-accent to-primary rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🎯 Your Progress</h3>
        
        {/* Level and Tier */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">Level {userStats.level}</div>
            <div className="text-sm opacity-90">{userStats.tier}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{userStats.totalXP}</div>
            <div className="text-sm opacity-90">Total XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>XP Progress</span>
            <span>{currentLevelXP}/{nextLevelXP - (nextLevelXP - 1000)} XP</span>
          </div>
          <div className="progress-bar h-3 bg-white bg-opacity-30 rounded-full">
            <div 
              className="progress-fill h-3 bg-white rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{Math.round((userStats.completedModules / userStats.totalModules) * 100)}%</div>
            <div className="text-xs opacity-90">Course Complete</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userStats.quizAccuracy}%</div>
            <div className="text-xs opacity-90">Quiz Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userStats.weeklyStreak}</div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
        </div>
      </div>
    );
  };

  // Tools and badges card
  const ToolsBadgesCard = () => (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-primary mb-4">🏆 Unlocked Tools & Badges</h3>
      
      {/* Badges */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary mb-3">Your Badges</h4>
        <div className="flex flex-wrap gap-2">
          {userStats.badges?.map((badge, index) => (
            <span 
              key={index}
              className="badge badge-gold px-3 py-1 text-sm font-semibold rounded-full cursor-pointer hover:scale-105 transition-transform"
              title={`Click to see how you earned "${badge}"`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Unlocked Tools */}
      <div>
        <h4 className="font-semibold text-primary mb-3">Available Tools</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {unlockedTools.slice(0, 4).map(tool => (
            <div 
              key={tool.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                tool.status === 'unlocked' 
                  ? 'border-accent bg-accent bg-opacity-10 hover:bg-opacity-20' 
                  : 'border-gray-300 bg-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{tool.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{tool.name}</div>
                  <div className="text-xs text-muted">{tool.unlockedAt}</div>
                </div>
                {tool.status === 'locked' && <span className="text-gray-400">🔒</span>}
              </div>
            </div>
          ))}
        </div>
        <Link 
          to="/tools" 
          className="block text-center text-accent hover:text-accent-hover font-medium mt-4"
        >
          View All Tools →
        </Link>
      </div>
    </div>
  );

  // Continue course card
  const ContinueCourseCard = () => {
    const nextModule = getNextModule();
    
    return (
      <div className="card p-6">
        <h3 className="text-xl font-bold text-primary mb-4">📚 Continue Your Course</h3>
        
        <div className="bg-secondary rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-primary">{nextModule.name}</h4>
              <p className="text-sm text-muted">Module {nextModule.id.split('-')[1]}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">{nextModule.progress}%</div>
              <div className="text-xs text-muted">Complete</div>
            </div>
          </div>
          
          {/* Progress Ring */}
          <div className="flex items-center justify-between">
            <div className="progress-bar flex-1 h-2 bg-gray-300 rounded-full mr-4">
              <div 
                className="progress-fill h-2 bg-accent rounded-full transition-all"
                style={{ width: `${nextModule.progress}%` }}
              ></div>
            </div>
            <button className="cta-button px-4 py-2 rounded-lg text-sm font-semibold">
              Resume
            </button>
          </div>
        </div>

        {/* Course Persona Progress */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-primary">7/9</div>
            <div className="text-xs text-muted">W-2 Modules</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">5/8</div>
            <div className="text-xs text-muted">Business Modules</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">3/6</div>
            <div className="text-xs text-muted">RE Modules</div>
          </div>
        </div>
      </div>
    );
  };

  // Smart recommendations card
  const SmartRecommendationsCard = () => (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-primary mb-4">🚀 Smart Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="border border-light rounded-lg p-4 hover:border-accent transition-colors">
            <div className="flex items-start">
              <span className="text-2xl mr-3">{rec.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-primary mb-1">{rec.title}</h4>
                <p className="text-sm text-muted mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.reason}
                  </span>
                  <button 
                    onClick={() => rec.tool === 'continue-course' ? 
                      window.location.href = '/escape-blueprint' :
                      window.location.href = `/tools/${rec.tool}`
                    }
                    className="btn-primary px-3 py-1 text-xs rounded"
                  >
                    Try This Tool
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Level up animation
  const LevelUpAnimation = () => (
    showLevelUp && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-card rounded-lg p-8 text-center animate-pulse">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-accent mb-2">Level Up!</h2>
          <p className="text-xl text-primary">You've reached Level {userStats.level}</p>
          <p className="text-muted mt-2">Tier: {userStats.tier}</p>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-primary">
      {/* Level Up Animation */}
      <LevelUpAnimation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Your Dashboard</h1>
          <p className="text-muted">Track your progress and discover new opportunities</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Progress Card - Full width on mobile, spans 1 column on larger screens */}
          <div className="xl:col-span-1">
            <ProgressCard />
          </div>

          {/* Continue Course Card */}
          <div className="xl:col-span-1">
            <ContinueCourseCard />
          </div>

          {/* Tools and Badges Card */}
          <div className="xl:col-span-1">
            <ToolsBadgesCard />
          </div>

          {/* Smart Recommendations - Full width */}
          <div className="lg:col-span-2 xl:col-span-3">
            <SmartRecommendationsCard />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => awardXP(50, 'Daily Login Bonus')}
              className="btn-outline p-4 rounded-lg text-center hover:bg-accent hover:text-white transition-colors"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold">Claim Daily XP</div>
            </button>
            <Link 
              to="/tools" 
              className="btn-outline p-4 rounded-lg text-center hover:bg-accent hover:text-white transition-colors block"
            >
              <div className="text-2xl mb-2">🔧</div>
              <div className="text-sm font-semibold">Browse Tools</div>
            </Link>
            <Link 
              to="/community" 
              className="btn-outline p-4 rounded-lg text-center hover:bg-accent hover:text-white transition-colors block"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-semibold">Join Community</div>
            </Link>
            <Link 
              to="/escape-blueprint" 
              className="btn-outline p-4 rounded-lg text-center hover:bg-accent hover:text-white transition-colors block"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-semibold">Continue Course</div>
            </Link>
          </div>
        </div>

        {/* Milestones Ahead */}
        <div className="mt-8 card p-6">
          <h3 className="text-lg font-bold text-primary mb-4">🎯 Milestones Ahead</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="font-semibold text-primary">Complete 1 more quiz → Unlock Quiz Master Badge</div>
                <div className="text-sm text-muted">Score 90%+ on Module 8 quiz</div>
              </div>
              <div className="text-accent font-bold">+200 XP</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="font-semibold text-primary">Reach Level 4 → Unlock Advanced Tools</div>
                <div className="text-sm text-muted">{getXPForNextLevel(userStats.totalXP) - userStats.totalXP} XP needed</div>
              </div>
              <div className="text-accent font-bold">New Tools</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="font-semibold text-primary">7-day streak → Streak Champion Badge</div>
                <div className="text-sm text-muted">2 more days to go!</div>
              </div>
              <div className="text-accent font-bold">+500 XP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;