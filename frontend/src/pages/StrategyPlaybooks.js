import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const StrategyPlaybooks = () => {
  const { playbookId } = useParams();
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPersona, setFilterPersona] = useState('all');
  const [viewMode, setViewMode] = useState('simple');
  const [userStats, setUserStats] = useState({});

  // Load user data for unlock logic
  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    setUserStats({ ...stats, ...progress });
  }, []);

  // Strategy playbook data
  const playbooks = [
    {
      id: 's-corp-optimization',
      title: 'S-Corp Election Optimization',
      category: 'Entity Planning',
      personas: ['w2', 'business'],
      icon: '🏢',
      overview: 'Reduce self-employment taxes and optimize profit distributions through strategic S-Corp election.',
      unlockModule: 'module-3',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-3'] || 0) >= 85,
      requirements: {
        income: '$100K+ annual income',
        entity: 'LLC or sole proprietorship',
        timing: 'Before March 15th for current year election'
      },
      implementation: [
        {
          step: 1,
          title: 'Entity Analysis',
          description: 'Review current business structure and income patterns',
          details: 'Analyze your current entity structure, income projections, and existing tax obligations.',
          advanced: 'Consider IRC Section 1362 election requirements and potential termination triggers.'
        },
        {
          step: 2,
          title: 'S-Corp Election Filing',
          description: 'File Form 2553 with IRS within deadline',
          details: 'Submit Form 2553 to elect S-Corporation status. Ensure all shareholders consent.',
          advanced: 'Review late election relief under Rev. Proc. 2013-30 if deadline missed.'
        },
        {
          step: 3,
          title: 'Payroll Setup',
          description: 'Establish reasonable salary and payroll system',
          details: 'Set up payroll for owner-employee with reasonable compensation based on role and industry.',
          advanced: 'Apply safe harbor rules and factor analysis for reasonable compensation determination.'
        },
        {
          step: 4,
          title: 'Distribution Planning',
          description: 'Plan profit distributions to minimize overall tax burden',
          details: 'Structure distributions to optimize between salary and distributions for tax efficiency.',
          advanced: 'Consider AAA account tracking and built-in gains tax implications.'
        }
      ],
      taxImpact: {
        scenario: 'Business owner with $200K profit',
        before: '$30,600 self-employment tax',
        after: '$12,240 payroll tax (on $80K salary)',
        savings: '$18,360 annual savings',
        notes: 'Assumes $80K reasonable salary, $120K distributions'
      },
      linkedTools: [
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 3: Business Entity Optimization',
        id: 'module-3',
        description: 'Deep dive into entity elections and optimization strategies'
      },
      commonMistakes: [
        'Failing to pay reasonable salary to owner-employee',
        'Missing election deadline without requesting relief',
        'Not tracking AAA account for distribution planning',
        'Ignoring state tax implications of S-Corp election'
      ],
      checklist: [
        'Determine optimal election timing',
        'File Form 2553 with all required signatures',
        'Set up payroll system and EIN if needed',
        'Establish reasonable compensation benchmarks',
        'Plan quarterly distribution strategy',
        'Update operating agreement if LLC'
      ]
    },
    {
      id: 'mso-c-corp-structure',
      title: 'MSO + C-Corp Structuring',
      category: 'Advanced Entity Planning',
      personas: ['business'],
      icon: '🏗️',
      overview: 'Multi-entity structure combining management company and C-Corp for optimal tax efficiency.',
      unlockModule: 'module-6',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-6'] || 0) >= 85,
      requirements: {
        income: '$1M+ annual profit',
        entity: 'Established business with multiple revenue streams',
        timing: 'Best implemented during business expansion'
      },
      implementation: [
        {
          step: 1,
          title: 'Structure Design',
          description: 'Design multi-entity structure with MSO and operating entities',
          details: 'Create management services organization (MSO) and separate operating entities.',
          advanced: 'Consider IRC Section 482 transfer pricing regulations and substance requirements.'
        },
        {
          step: 2,
          title: 'C-Corp Formation',
          description: 'Establish C-Corporation for retained earnings optimization',
          details: 'Form C-Corp to benefit from lower corporate tax rates on retained earnings.',
          advanced: 'Plan for QSBS qualification under Section 1202 for potential gain exclusion.'
        },
        {
          step: 3,
          title: 'Management Agreements',
          description: 'Draft comprehensive management service agreements',
          details: 'Create agreements between MSO and operating entities for services and fees.',
          advanced: 'Ensure arm\'s length pricing and proper documentation for transfer pricing.'
        },
        {
          step: 4,
          title: 'Tax Optimization',
          description: 'Implement ongoing tax optimization strategies',
          details: 'Optimize income allocation between entities and distribution timing.',
          advanced: 'Monitor accumulated earnings tax under Section 531 and personal holding company rules.'
        }
      ],
      taxImpact: {
        scenario: 'Business with $2M annual profit',
        before: '$740K total tax burden (individual rates)',
        after: '$580K optimized tax burden',
        savings: '$160K+ annual savings',
        notes: 'Includes federal, state, and self-employment tax optimization'
      },
      linkedTools: [
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' },
        { name: 'IRS Exposure Radar', id: 'exposure-radar', icon: '🎯' }
      ],
      linkedModule: {
        name: 'Module 6: Advanced Business Structures',
        id: 'module-6',
        description: 'Complex entity planning and multi-tier structures'
      },
      commonMistakes: [
        'Inadequate substance in management services organization',
        'Improper transfer pricing between related entities',
        'Ignoring accumulated earnings tax implications',
        'Failing to maintain proper corporate formalities'
      ],
      checklist: [
        'Design optimal multi-entity structure',
        'Form C-Corp with proper QSBS planning',
        'Draft comprehensive service agreements',
        'Establish transfer pricing documentation',
        'Implement quarterly review process',
        'Maintain corporate formalities and records'
      ]
    },
    {
      id: 'roth-conversion-fmv',
      title: 'Roth Conversion with FMV Discount',
      category: 'Retirement Planning',
      personas: ['w2'],
      icon: '💎',
      overview: 'Maximize Roth conversions using fair market value discounts on illiquid assets.',
      unlockModule: 'module-4',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-4'] || 0) >= 85,
      requirements: {
        income: '$250K+ with existing retirement accounts',
        entity: 'Traditional IRA or 401(k) with significant balance',
        timing: 'Lower income years or market downturns optimal'
      },
      implementation: [
        {
          step: 1,
          title: 'Asset Valuation',
          description: 'Obtain professional valuation of illiquid assets',
          details: 'Get qualified appraisal of illiquid assets like private equity, real estate, or business interests.',
          advanced: 'Consider IRC Section 409A valuation methods and marketability discounts.'
        },
        {
          step: 2,
          title: 'Conversion Timing',
          description: 'Time conversion to optimize tax impact',
          details: 'Execute conversion during lower income years or when asset values are depressed.',
          advanced: 'Coordinate with income averaging strategies and state tax planning.'
        },
        {
          step: 3,
          title: 'Tax Payment Strategy',
          description: 'Plan tax payment without IRA distribution',
          details: 'Pay conversion taxes from outside sources to maximize conversion benefit.',
          advanced: 'Consider estimated tax payments and avoid underpayment penalties.'
        },
        {
          step: 4,
          title: 'Growth Monitoring',
          description: 'Monitor and manage Roth account growth',
          details: 'Track asset performance and consider additional optimization strategies.',
          advanced: 'Plan for potential recharacterization deadlines and strategy adjustments.'
        }
      ],
      taxImpact: {
        scenario: 'W-2 employee with $500K traditional IRA',
        before: 'Future RMDs taxed at ordinary rates',
        after: 'Tax-free growth and distributions',
        savings: '$200K+ in lifetime tax savings',
        notes: 'Assumes 30% discount valuation and 7% annual growth'
      },
      linkedTools: [
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' },
        { name: 'Retirement Optimizer', id: 'retirement-optimizer', icon: '🎯' }
      ],
      linkedModule: {
        name: 'Module 4: Retirement Tax Planning',
        id: 'module-4',
        description: 'Advanced retirement account optimization strategies'
      },
      commonMistakes: [
        'Converting too much in high-income years',
        'Using IRA funds to pay conversion taxes',
        'Inadequate asset valuation documentation',
        'Missing recharacterization deadlines'
      ],
      checklist: [
        'Obtain qualified asset appraisal',
        'Calculate optimal conversion amount',
        'Plan external tax payment source',
        'Execute conversion timing strategy',
        'Monitor asset performance post-conversion',
        'Document all valuation support'
      ]
    },
    {
      id: 'str-reps-qualification',
      title: 'Short-Term Rental REPS Qualification',
      category: 'Real Estate',
      personas: ['investor'],
      icon: '🏠',
      overview: 'Qualify STR activities as real estate professional to unlock passive loss deductions.',
      unlockModule: 'module-8',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-8'] || 0) >= 85,
      requirements: {
        income: 'STR rental income with time availability',
        entity: 'Short-term rental properties (< 7 days average)',
        timing: 'Must track hours contemporaneously'
      },
      implementation: [
        {
          step: 1,
          title: 'Activity Documentation',
          description: 'Document qualifying real estate activities',
          details: 'Track all time spent on real estate professional activities with detailed logs.',
          advanced: 'Consider IRC Section 469 regulations and material participation tests.'
        },
        {
          step: 2,
          title: 'Hour Requirements',
          description: 'Meet 750+ hour annual requirement',
          details: 'Ensure 750+ hours in real estate trades/businesses and >50% of personal services.',
          advanced: 'Aggregate multiple real estate activities under grouping election.'
        },
        {
          step: 3,
          title: 'STR Classification',
          description: 'Ensure short-term rental meets classification requirements',
          details: 'Maintain average stay under 7 days with substantial services provided.',
          advanced: 'Document extraordinary personal services under Temp. Reg. 1.469-1T(e)(3)(ii).'
        },
        {
          step: 4,
          title: 'Loss Utilization',
          description: 'Optimize passive loss utilization against ordinary income',
          details: 'Apply depreciation and losses against ordinary income rather than passive income.',
          advanced: 'Consider cost segregation and bonus depreciation timing strategies.'
        }
      ],
      taxImpact: {
        scenario: 'STR property with $100K in losses',
        before: 'Losses suspended as passive',
        after: 'Losses deductible against ordinary income',
        savings: '$37K tax savings (37% bracket)',
        notes: 'Includes depreciation and operational losses'
      },
      linkedTools: [
        { name: 'STR Optimizer', id: 'str-optimizer', icon: '🏠' },
        { name: 'Real Estate Strategy Finder', id: 're-strategy-finder', icon: '🔍' }
      ],
      linkedModule: {
        name: 'Module 8: Real Estate Tax Strategies',
        id: 'module-8',
        description: 'Advanced real estate professional strategies'
      },
      commonMistakes: [
        'Inadequate hour documentation and tracking',
        'Failing to meet material participation tests',
        'Not providing substantial services for STR classification',
        'Missing grouping election deadlines'
      ],
      checklist: [
        'Set up contemporaneous hour tracking system',
        'Ensure 750+ hours in real estate activities',
        'Document substantial STR services provided',
        'File grouping election if applicable',
        'Implement cost segregation studies',
        'Maintain detailed activity records'
      ]
    },
    {
      id: 'oil-gas-deduction',
      title: 'Oil & Gas Deduction Pairing',
      category: 'Alternative Investments',
      personas: ['w2', 'business', 'investor'],
      icon: '⛽',
      overview: 'Combine oil & gas investments with other strategies for maximum tax benefit.',
      unlockModule: 'module-10',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-10'] || 0) >= 85,
      requirements: {
        income: '$500K+ with high tax liability',
        entity: 'Ability to participate in drilling operations',
        timing: 'Year-end planning for immediate deductions'
      },
      implementation: [
        {
          step: 1,
          title: 'Investment Selection',
          description: 'Select qualified oil & gas drilling opportunities',
          details: 'Choose working interests in oil & gas properties with depletion allowance benefits.',
          advanced: 'Evaluate under IRC Section 613A depletion allowance and working interest rules.'
        },
        {
          step: 2,
          title: 'Deduction Timing',
          description: 'Optimize intangible drilling cost deductions',
          details: 'Time IDC elections for maximum current year benefit.',
          advanced: 'Consider Section 263(c) election and AMT implications under Section 57(a)(2).'
        },
        {
          step: 3,
          title: 'Risk Management',
          description: 'Implement risk management strategies',
          details: 'Balance tax benefits with investment risk through diversification.',
          advanced: 'Structure through entities to optimize passive activity rules.'
        },
        {
          step: 4,
          title: 'Ongoing Management',
          description: 'Manage ongoing depletion and income recognition',
          details: 'Track depletion allowances and manage future income streams.',
          advanced: 'Monitor percentage vs. cost depletion elections annually.'
        }
      ],
      taxImpact: {
        scenario: '$100K oil & gas investment',
        before: 'Limited current-year deductions',
        after: '$70K+ immediate deductions available',
        savings: '$25K+ first-year tax savings',
        notes: 'Plus ongoing depletion allowance benefits'
      },
      linkedTools: [
        { name: 'IRS Exposure Radar', id: 'exposure-radar', icon: '🎯' },
        { name: 'Alternative Investment Analyzer', id: 'alt-investment-analyzer', icon: '📊' }
      ],
      linkedModule: {
        name: 'Module 10: Alternative Investment Strategies',
        id: 'module-10',
        description: 'Oil & gas, equipment leasing, and other alternatives'
      },
      commonMistakes: [
        'Inadequate due diligence on drilling projects',
        'Missing IDC election deadlines',
        'Ignoring AMT implications of deductions',
        'Concentrating too heavily in single projects'
      ],
      checklist: [
        'Conduct thorough due diligence on projects',
        'File appropriate IDC elections',
        'Evaluate AMT impact and planning',
        'Diversify across multiple projects',
        'Set up proper record keeping systems',
        'Plan for ongoing depletion tracking'
      ]
    }
  ];

  // Filter functions
  const getFilteredPlaybooks = () => {
    return playbooks.filter(playbook => {
      const matchesSearch = playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           playbook.overview.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || playbook.category === filterCategory;
      const matchesPersona = filterPersona === 'all' || playbook.personas.includes(filterPersona);
      
      return matchesSearch && matchesCategory && matchesPersona;
    });
  };

  // Get unique categories and personas for filters
  const categories = ['all', ...new Set(playbooks.map(p => p.category))];
  const personas = [
    { id: 'all', name: 'All Users' },
    { id: 'w2', name: 'W-2 Employees' },
    { id: 'business', name: 'Business Owners' },
    { id: 'investor', name: 'Real Estate Investors' }
  ];

  // Award XP for completing playbook
  const completePlaybook = (playbookId) => {
    const currentStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const updatedStats = {
      ...currentStats,
      totalXP: (currentStats.totalXP || 0) + 100,
      completedPlaybooks: [...(currentStats.completedPlaybooks || []), playbookId],
      xpHistory: [
        ...(currentStats.xpHistory || []),
        {
          amount: 100,
          reason: 'Completed Strategy Playbook',
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Check for Strategy Master badge
    if (updatedStats.completedPlaybooks.length >= 5) {
      const badges = [...(updatedStats.badges || [])];
      if (!badges.includes('Strategy Master')) {
        badges.push('Strategy Master');
        updatedStats.badges = badges;
        updatedStats.xpHistory.push({
          amount: 200,
          reason: 'Earned Strategy Master Badge',
          timestamp: new Date().toISOString()
        });
        updatedStats.totalXP += 200;
      }
    }

    localStorage.setItem('userStats', JSON.stringify(updatedStats));
    setUserStats(updatedStats);
  };

  // Playbook grid view
  const PlaybookGrid = () => {
    const filteredPlaybooks = getFilteredPlaybooks();

    return (
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Search</label>
              <input
                type="text"
                placeholder="Search playbooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input w-full px-3 py-2 border border-light rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-select w-full px-3 py-2 border border-light rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">User Type</label>
              <select
                value={filterPersona}
                onChange={(e) => setFilterPersona(e.target.value)}
                className="form-select w-full px-3 py-2 border border-light rounded-lg"
              >
                {personas.map(persona => (
                  <option key={persona.id} value={persona.id}>
                    {persona.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Playbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaybooks.map(playbook => (
            <div key={playbook.id} className="card p-6 relative">
              {/* Unlock Status */}
              {!playbook.isUnlocked && (
                <div className="absolute top-4 right-4 text-2xl">🔒</div>
              )}
              {playbook.isUnlocked && !userStats.completedPlaybooks?.includes(playbook.id) && (
                <div className="bg-accent text-white text-xs px-2 py-1 rounded-full inline-block mb-3">
                  New
                </div>
              )}

              <div className="text-4xl mb-4">{playbook.icon}</div>
              <h3 className="text-lg font-bold text-primary mb-2">{playbook.title}</h3>
              <p className="text-sm text-muted mb-4">{playbook.overview}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {playbook.category}
                </span>
                {playbook.personas.map(persona => (
                  <span key={persona} className="text-xs bg-accent bg-opacity-20 text-accent px-2 py-1 rounded-full">
                    {personas.find(p => p.id === persona)?.name.replace(' Owners', '').replace(' Employees', '').replace(' Investors', '')}
                  </span>
                ))}
              </div>

              {playbook.isUnlocked ? (
                <button
                  onClick={() => setSelectedPlaybook(playbook)}
                  className="cta-button w-full py-2 px-4 rounded-lg"
                >
                  Launch Playbook
                </button>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-muted mb-2">
                    Score 85%+ on {playbook.linkedModule.name} quiz to unlock
                  </div>
                  <button className="btn-outline w-full py-2 px-4 rounded-lg cursor-not-allowed opacity-60">
                    Locked
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPlaybooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-primary mb-3">No playbooks found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    );
  };

  // Individual playbook view
  const PlaybookDetail = ({ playbook }) => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <button
          onClick={() => setSelectedPlaybook(null)}
          className="text-accent hover:text-accent-hover mb-4 inline-flex items-center"
        >
          ← Back to Playbooks
        </button>
        <div className="text-6xl mb-4">{playbook.icon}</div>
        <h1 className="text-3xl font-bold text-primary mb-3">{playbook.title}</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">{playbook.overview}</p>
        
        {/* View Mode Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('simple')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'simple' ? 'bg-accent text-white' : 'text-primary hover:bg-accent hover:text-white'
              }`}
            >
              Simple View
            </button>
            <button
              onClick={() => setViewMode('advanced')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'advanced' ? 'bg-accent text-white' : 'text-primary hover:bg-accent hover:text-white'
              }`}
            >
              Advanced View
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Overview */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">✅ Strategy Overview</h2>
        <p className="text-muted mb-4">{playbook.overview}</p>
        
        <h3 className="font-semibold text-primary mb-3">⚙️ Requirements</h3>
        <div className="bg-secondary rounded-lg p-4 space-y-2">
          <div><strong>Income:</strong> {playbook.requirements.income}</div>
          <div><strong>Entity:</strong> {playbook.requirements.entity}</div>
          <div><strong>Timing:</strong> {playbook.requirements.timing}</div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">🔍 Step-by-Step Implementation</h2>
        <div className="space-y-4">
          {playbook.implementation.map((step, index) => (
            <div key={index} className="border border-light rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary mb-2">{step.title}</h4>
                  <p className="text-muted mb-2">{step.description}</p>
                  <p className="text-sm text-secondary">{step.details}</p>
                  {viewMode === 'advanced' && step.advanced && (
                    <div className="mt-3 p-3 bg-secondary rounded-lg">
                      <div className="text-xs font-semibold text-accent uppercase mb-1">Advanced</div>
                      <p className="text-sm text-muted">{step.advanced}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Impact */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">📈 Projected Tax Impact</h2>
        <div className="bg-gradient-to-r from-accent to-primary rounded-lg p-6 text-white">
          <h3 className="font-bold mb-4">{playbook.taxImpact.scenario}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm opacity-90">Before</div>
              <div className="text-xl font-bold">{playbook.taxImpact.before}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">After</div>
              <div className="text-xl font-bold">{playbook.taxImpact.after}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Annual Savings</div>
              <div className="text-xl font-bold text-yellow-300">{playbook.taxImpact.savings}</div>
            </div>
          </div>
          <p className="text-sm opacity-90">{playbook.taxImpact.notes}</p>
        </div>
      </div>

      {/* Linked Tools */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">📄 Linked Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playbook.linkedTools.map(tool => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="flex items-center p-4 bg-secondary rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              <span className="text-2xl mr-3">{tool.icon}</span>
              <span className="font-medium">{tool.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Linked Course Module */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">📚 Linked Course Module</h2>
        <Link
          to={`/course/${playbook.linkedModule.id}`}
          className="block p-4 bg-secondary rounded-lg hover:bg-accent hover:text-white transition-colors"
        >
          <h3 className="font-semibold mb-2">{playbook.linkedModule.name}</h3>
          <p className="text-sm opacity-90">{playbook.linkedModule.description}</p>
        </Link>
      </div>

      {/* Common Mistakes */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">🧠 Common Mistakes to Avoid</h2>
        <ul className="space-y-2">
          {playbook.commonMistakes.map((mistake, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 mr-2">⚠️</span>
              <span className="text-muted">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Checklist */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">✅ Implementation Checklist</h2>
        <div className="space-y-3">
          {playbook.checklist.map((item, index) => (
            <label key={index} className="flex items-start cursor-pointer">
              <input type="checkbox" className="mt-1 mr-3" />
              <span className="text-muted">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card p-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => completePlaybook(playbook.id)}
            className="cta-button py-3 px-6 rounded-lg"
          >
            Mark as Complete (+100 XP)
          </button>
          <button className="btn-secondary py-3 px-6 rounded-lg">
            Connect With a Strategist
          </button>
        </div>
        <p className="text-sm text-muted mt-4">
          Download PDF checklist • Share with advisor • Schedule implementation call
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedPlaybook ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-3">Strategy Playbooks</h1>
              <p className="text-muted max-w-2xl mx-auto">
                Step-by-step implementation guides for advanced tax strategies
              </p>
            </div>

            <PlaybookGrid />
          </>
        ) : (
          <PlaybookDetail playbook={selectedPlaybook} />
        )}
      </div>
    </div>
  );
};

export default StrategyPlaybooks;