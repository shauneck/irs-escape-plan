import React, { useState, useEffect } from 'react';

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userPersona, setUserPersona] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load user persona and stats
  useEffect(() => {
    const savedPersona = localStorage.getItem('userPersona') || 'w2';
    setUserPersona(savedPersona);
  }, []);

  // Tool categories
  const categories = [
    { id: 'all', name: 'All Tools', icon: '🔧' },
    { id: 'strategy', name: 'Strategy Guidance', icon: '🎯' },
    { id: 'recommendations', name: 'Smart Recommendations', icon: '💡' },
    { id: 'ai-learning', name: 'AI & Learning', icon: '🤖' },
    { id: 'advanced', name: 'Advanced Tools', icon: '🛠' }
  ];

  // All available tools
  const allTools = [
    // Strategy Guidance
    {
      id: 'entity-wizard',
      category: 'strategy',
      title: 'Entity Structure Wizard',
      description: 'Interactive decision tree to determine optimal business entity structure for tax savings.',
      icon: '🏢',
      personas: ['business', 'investor'],
      status: 'available',
      route: '/tools/entity-wizard'
    },
    {
      id: 'strategy-playbooks',
      category: 'strategy',
      title: 'Strategy Playbooks',
      description: 'Step-by-step execution guides for implementing advanced tax strategies.',
      icon: '📋',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/strategy-playbooks'
    },
    {
      id: 'strategy-finder',
      category: 'strategy',
      title: 'Strategy Finder',
      description: 'Filter and discover tax strategies based on your specific goals and situation.',
      icon: '🔍',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/strategy-finder'
    },

    // Smart Recommendations
    {
      id: 'savings-estimator',
      category: 'recommendations',
      title: 'Tax Savings Estimator',
      description: 'Calculate potential tax savings with our advanced algorithm based on your profile.',
      icon: '💰',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/savings-estimator'
    },
    {
      id: 'exposure-radar',
      category: 'recommendations',
      title: 'IRS Exposure Radar',
      description: 'Heatmap analysis of audit risk factors and compliance vulnerabilities.',
      icon: '🎯',
      personas: ['business', 'investor'],
      status: 'available',
      route: '/tools/exposure-radar'
    },
    {
      id: 'upload-analyzer',
      category: 'recommendations',
      title: 'Upload Analyzer',
      description: 'AI-powered analysis of your tax documents for personalized recommendations.',
      icon: '📄',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/upload-analyzer'
    },

    // AI & Learning
    {
      id: 'ai-assistant',
      category: 'ai-learning',
      title: 'AI Tax Assistant',
      description: 'Chat with our advanced AI for real-time tax strategy guidance and questions.',
      icon: '🤖',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/ai-assistant'
    },
    {
      id: 'glossary-quiz',
      category: 'ai-learning',
      title: 'Glossary Quiz Retake',
      description: 'Remediation engine for strengthening understanding of missed tax terms.',
      icon: '📚',
      personas: ['w2', 'business', 'investor'],
      status: 'available',
      route: '/tools/glossary-quiz'
    },

    // Advanced Tools
    {
      id: 'roth-ladder',
      category: 'advanced',
      title: 'Roth Ladder Builder',
      description: 'Optimize retirement conversion strategies with advanced modeling.',
      icon: '🪜',
      personas: ['w2', 'business'],
      status: 'coming-soon',
      requiredBadge: 'retirement-master'
    },
    {
      id: 'str-optimizer',
      category: 'advanced',
      title: 'STR/REPS Optimizer',
      description: 'Short-term rental optimization for real estate professional status.',
      icon: '🏠',
      personas: ['investor'],
      status: 'coming-soon',
      requiredModule: 'real-estate-advanced'
    },
    {
      id: 'audit-heatmap',
      category: 'advanced',
      title: 'Audit Risk Heatmap',
      description: 'Comprehensive audit risk analysis with mitigation recommendations.',
      icon: '🔥',
      personas: ['business', 'investor'],
      status: 'coming-soon',
      requiredBadge: 'compliance-expert'
    },
    {
      id: 'legacy-simulator',
      category: 'advanced',
      title: 'Legacy Builder Simulator',
      description: 'Model estate planning strategies and generational wealth transfer.',
      icon: '🏛',
      personas: ['business', 'investor'],
      status: 'coming-soon',
      requiredModule: 'estate-planning'
    }
  ];

  // Get filtered tools
  const getFilteredTools = () => {
    let filtered = allTools;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (selectedCategory === 'advanced' && !showAdvanced) {
      return [];
    }

    return filtered;
  };

  // Get recommended tools for user persona
  const getRecommendedTools = () => {
    return allTools
      .filter(tool => tool.personas.includes(userPersona) && tool.status === 'available')
      .slice(0, 4);
  };

  // Onboarding wizard component
  const OnboardingWizard = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (question, answer) => {
      setAnswers({ ...answers, [question]: answer });
      if (step < 3) {
        setStep(step + 1);
      }
    };

    const getRecommendations = () => {
      const { persona, income, goal } = answers;
      
      // Simple recommendation logic
      let recommended = [];
      
      if (persona === 'w2') {
        recommended = ['strategy-finder', 'savings-estimator', 'ai-assistant'];
      } else if (persona === 'business') {
        recommended = ['entity-wizard', 'exposure-radar', 'strategy-playbooks'];
      } else if (persona === 'investor') {
        recommended = ['str-optimizer', 'strategy-playbooks', 'exposure-radar'];
      }

      return allTools.filter(tool => recommended.includes(tool.id));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-primary mb-2">Not Sure Where to Start?</h3>
            <p className="text-muted">Let's find the perfect tools for your situation</p>
          </div>

          {step === 1 && (
            <div>
              <h4 className="font-semibold text-primary mb-4">What describes you best?</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer('persona', 'w2')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  💼 W-2 Employee / High Earner
                </button>
                <button
                  onClick={() => handleAnswer('persona', 'business')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  🏢 Business Owner / Entrepreneur
                </button>
                <button
                  onClick={() => handleAnswer('persona', 'investor')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  🏠 Real Estate Investor
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="font-semibold text-primary mb-4">What's your income range?</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer('income', 'mid')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  $100K - $300K
                </button>
                <button
                  onClick={() => handleAnswer('income', 'high')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  $300K - $500K
                </button>
                <button
                  onClick={() => handleAnswer('income', 'ultra')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  $500K+
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="font-semibold text-primary mb-4">What's your main goal?</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer('goal', 'reduce-taxes')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  💰 Reduce Current Tax Burden
                </button>
                <button
                  onClick={() => handleAnswer('goal', 'optimize-structure')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  🏗 Optimize Business Structure
                </button>
                <button
                  onClick={() => handleAnswer('goal', 'real-estate')}
                  className="w-full p-3 text-left bg-secondary hover:bg-accent hover:text-white rounded-lg transition-colors"
                >
                  🏠 Maximize Real Estate Benefits
                </button>
              </div>
            </div>
          )}

          {step > 3 && (
            <div>
              <h4 className="font-semibold text-primary mb-4">Recommended Tools for You:</h4>
              <div className="space-y-3 mb-4">
                {getRecommendations().map(tool => (
                  <div key={tool.id} className="p-3 bg-secondary rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{tool.icon}</span>
                      <div>
                        <h5 className="font-semibold text-primary">{tool.title}</h5>
                        <p className="text-sm text-muted">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    localStorage.setItem('userPersona', answers.persona);
                    setUserPersona(answers.persona);
                    setShowOnboarding(false);
                  }}
                  className="flex-1 btn-primary py-2 px-4 rounded-lg"
                >
                  Start With These
                </button>
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="flex-1 btn-secondary py-2 px-4 rounded-lg"
                >
                  Show All Tools
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowOnboarding(false)}
            className="absolute top-4 right-4 text-muted hover:text-primary"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  // Tool card component
  const ToolCard = ({ tool, isRecommended = false }) => {
    const isLocked = tool.status === 'coming-soon';
    
    return (
      <div className={`card p-6 ${isRecommended ? 'border-accent border-2' : ''} ${isLocked ? 'opacity-60' : ''}`}>
        {isRecommended && (
          <div className="bg-accent text-white text-xs px-2 py-1 rounded-full inline-block mb-3">
            Recommended for You
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{tool.icon}</div>
          {isLocked && <div className="text-2xl">🔒</div>}
        </div>
        
        <h3 className="text-lg font-semibold text-primary mb-2">{tool.title}</h3>
        <p className="text-muted mb-4 text-sm leading-relaxed">{tool.description}</p>
        
        {isLocked ? (
          <div className="text-center">
            <div className="text-sm text-muted mb-2">
              {tool.requiredBadge && `Unlock with "${tool.requiredBadge}" badge`}
              {tool.requiredModule && `Complete "${tool.requiredModule}" module`}
            </div>
            <button className="btn-outline w-full py-2 px-4 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        ) : (
          <button 
            onClick={() => window.location.href = tool.route}
            className="cta-button w-full py-2 px-4 rounded-lg"
          >
            Launch Tool
          </button>
        )}
      </div>
    );
  };

  const filteredTools = getFilteredTools();
  const recommendedTools = getRecommendedTools();

  return (
    <div className="min-h-screen bg-primary">
      {/* Onboarding Modal */}
      {showOnboarding && <OnboardingWizard />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-3">Tax Strategy Toolkit</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Advanced planning tools to optimize your tax strategy and maximize savings
          </p>
        </div>

        {/* Onboarding CTA */}
        <div className="bg-gradient-to-r from-accent to-primary rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Not Sure Where to Start?</h2>
          <p className="text-white opacity-90 mb-4">
            Take our quick assessment to get personalized tool recommendations
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="bg-white text-accent px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get My Recommendations
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                if (category.id === 'advanced') {
                  setShowAdvanced(true);
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-primary hover:bg-accent hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Recommended Tools Section */}
        {selectedCategory === 'all' && recommendedTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} isRecommended={true} />
              ))}
            </div>
          </div>
        )}

        {/* Advanced Tools Toggle */}
        {selectedCategory === 'advanced' && !showAdvanced && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🛠</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Advanced Tools</h3>
            <p className="text-muted mb-6">
              Unlock powerful optimization tools as you progress through the course
            </p>
            <button
              onClick={() => setShowAdvanced(true)}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Show Advanced Tools
            </button>
          </div>
        )}

        {/* Tools Grid */}
        {(selectedCategory !== 'advanced' || showAdvanced) && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              {selectedCategory === 'all' ? 'All Tools' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTools.length === 0 && selectedCategory !== 'advanced' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-primary mb-3">No tools found</h3>
            <p className="text-muted">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;