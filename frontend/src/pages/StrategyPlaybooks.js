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

  // 9 Strategy Playbooks as provided
  const playbooks = [
    {
      id: 'mso-c-corp-structuring',
      title: 'MSO + C-Corp Structuring',
      category: 'Business Structuring',
      personas: ['business'],
      icon: '🏗️',
      overview: 'Use an MSO-C-Corp model to capture profits at a flat 21% tax rate while separating business operations from strategy.',
      unlockModule: 'module-1',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-1'] || 0) >= 85,
      requirements: {
        income: '$500K+ annual business profit',
        entity: 'Established business with multiple revenue streams',
        timing: 'Best implemented during business expansion or restructuring'
      },
      implementation: [
        {
          step: 1,
          title: 'Form a C-Corp MSO',
          description: 'Establish a C-Corporation Management Services Organization',
          details: 'Create a separate C-Corp entity to serve as the management company for your operating business.'
        },
        {
          step: 2,
          title: 'Create a Service Agreement',
          description: 'Draft comprehensive management service agreements',
          details: 'Develop detailed agreements outlining services provided by MSO to operating entities.'
        },
        {
          step: 3,
          title: 'Allocate Income Appropriately',
          description: 'Optimize income allocation between entities',
          details: 'Split income between operating entity and MSO to optimize overall tax burden.'
        },
        {
          step: 4,
          title: 'Reinvest Retained Earnings',
          description: 'Deploy retained earnings tax-efficiently',
          details: 'Use C-Corp retained earnings for business expansion and investment at lower corporate rates.'
        },
        {
          step: 5,
          title: 'Track Compliance',
          description: 'Maintain ongoing compliance and documentation',
          details: 'Ensure proper corporate formalities and maintain detailed records for all inter-company transactions.'
        }
      ],
      taxImpact: {
        scenario: 'Business with $1M annual profit',
        before: 'All income taxed at individual rates (up to 37%)',
        after: 'Reallocated income taxed at 21% corporate rate',
        savings: '$160K+ annual tax savings',
        notes: 'Includes federal and state tax optimization through rate arbitrage'
      },
      linkedTools: [
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' }
      ],
      linkedModule: {
        name: 'Module 1: Business Structuring & Retained Earnings',
        id: 'module-1',
        description: 'Master business entity optimization and corporate tax planning'
      }
    },
    {
      id: 'roth-conversion-fmv-discount',
      title: 'Roth Conversion with FMV Discount',
      category: 'Retirement Planning',
      personas: ['w2'],
      icon: '💎',
      overview: 'Convert retirement assets using alternative investments eligible for fair market value discounts (35–60%) to lower conversion tax.',
      unlockModule: 'module-3',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-3'] || 0) >= 85,
      requirements: {
        income: '$250K+ with substantial retirement account balances',
        entity: 'Traditional IRA or 401(k) with rollover capability',
        timing: 'Lower income years or market downturns optimal for conversion'
      },
      implementation: [
        {
          step: 1,
          title: 'Invest IRA into Discounted Asset',
          description: 'Direct IRA funds into alternative investments eligible for valuation discounts',
          details: 'Invest traditional IRA into private equity, real estate partnerships, or other illiquid assets.'
        },
        {
          step: 2,
          title: 'Secure FMV Valuation',
          description: 'Obtain qualified independent appraisal with appropriate discounts',
          details: 'Get professional valuation reflecting marketability and minority interest discounts.'
        },
        {
          step: 3,
          title: 'Convert at Discounted Basis',
          description: 'Execute Roth conversion based on discounted fair market value',
          details: 'Convert the discounted asset value to Roth IRA, paying taxes on reduced basis.'
        },
        {
          step: 4,
          title: 'Grow Assets Tax-Free',
          description: 'Allow converted assets to appreciate in tax-free Roth environment',
          details: 'Monitor asset performance and manage Roth account for optimal long-term growth.'
        }
      ],
      taxImpact: {
        scenario: 'High-income W-2 earner with $500K traditional IRA',
        before: 'Conversion tax on full $500K at ordinary rates',
        after: 'Conversion tax on $200K-$325K discounted value',
        savings: '35-60% reduction in conversion tax burden',
        notes: 'Plus all future growth completely tax-free in Roth IRA'
      },
      linkedTools: [
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 3: Roth Conversion & Valuation Strategies',
        id: 'module-3',
        description: 'Advanced retirement account optimization and valuation techniques'
      }
    },
    {
      id: 'str-reps-qualification',
      title: 'STR + REPS Qualification',
      category: 'Real Estate',
      personas: ['investor'],
      icon: '🏠',
      overview: 'Acquire short-term rentals and qualify for REPS to offset W-2 or active income with accelerated depreciation.',
      unlockModule: 'module-5',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-5'] || 0) >= 85,
      requirements: {
        income: 'STR rental income with significant time availability',
        entity: 'Short-term rental properties with average stays under 7 days',
        timing: 'Must track qualifying hours contemporaneously throughout tax year'
      },
      implementation: [
        {
          step: 1,
          title: 'Buy STR (<7 day stays)',
          description: 'Acquire short-term rental properties with proper classification',
          details: 'Purchase properties intended for short-term rental with average guest stays under 7 days.'
        },
        {
          step: 2,
          title: 'Qualify for REPS (750+ hours)',
          description: 'Meet real estate professional status requirements',
          details: 'Document 750+ hours annually in real estate trades/businesses with >50% of personal services.'
        },
        {
          step: 3,
          title: 'Perform Cost Segregation',
          description: 'Accelerate depreciation through cost segregation study',
          details: 'Engage qualified cost segregation specialist to identify shorter-life property components.'
        },
        {
          step: 4,
          title: 'Apply Bonus Depreciation',
          description: 'Maximize current-year deductions through bonus depreciation',
          details: 'Elect 100% bonus depreciation on qualifying property components identified in cost segregation.'
        }
      ],
      taxImpact: {
        scenario: 'STR property with $200K in accelerated depreciation',
        before: 'Depreciation losses suspended as passive',
        after: 'Losses deductible against ordinary income',
        savings: '$50K-$150K+ in year-one tax savings',
        notes: 'Includes cost segregation and bonus depreciation benefits'
      },
      linkedTools: [
        { name: 'STR Optimizer', id: 'str-optimizer', icon: '🏠' }
      ],
      linkedModule: {
        name: 'Module 5: Real Estate Professional Strategies',
        id: 'module-5',
        description: 'Master REPS qualification and short-term rental optimization'
      }
    },
    {
      id: 'oil-gas-deduction-pairing',
      title: 'Oil & Gas Deduction Pairing',
      category: 'Alternative Investments',
      personas: ['w2', 'business'],
      icon: '⛽',
      overview: 'Invest in drilling programs with IDCs to create large deductions against ordinary income.',
      unlockModule: 'module-6',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-6'] || 0) >= 85,
      requirements: {
        income: '$500K+ with high ordinary income tax liability',
        entity: 'Ability to participate directly in drilling operations as working interest owner',
        timing: 'Year-end planning optimal for immediate deduction benefits'
      },
      implementation: [
        {
          step: 1,
          title: 'Invest in Qualified O&G Program',
          description: 'Select appropriate oil and gas drilling investment opportunity',
          details: 'Choose working interest in oil and gas properties with significant IDC component.'
        },
        {
          step: 2,
          title: 'Allocate to IDC-heavy Assets',
          description: 'Focus investment on intangible drilling costs for maximum deduction',
          details: 'Prioritize drilling programs with high percentage of deductible intangible costs.'
        },
        {
          step: 3,
          title: 'Deduct 80–90% in Year 1',
          description: 'Maximize current-year ordinary income deductions',
          details: 'Claim immediate deduction for intangible drilling and development costs.'
        }
      ],
      taxImpact: {
        scenario: '$100K oil & gas working interest investment',
        before: 'Limited current-year tax benefits',
        after: '$70K-$90K immediate ordinary income deductions',
        savings: '$25K-$35K first-year tax savings',
        notes: 'Plus ongoing depletion allowance benefits and potential income streams'
      },
      linkedTools: [
        { name: 'IRS Exposure Radar', id: 'exposure-radar', icon: '🎯' }
      ],
      linkedModule: {
        name: 'Module 6: Oil & Gas Tax Planning',
        id: 'module-6',
        description: 'Navigate oil & gas investments and deduction optimization'
      }
    },
    {
      id: 'opportunity-zone-deferral',
      title: 'Opportunity Zone Deferral & Elimination',
      category: 'Capital Gains Planning',
      personas: ['investor'],
      icon: '🎯',
      overview: 'Reinvest capital gains into QOF to defer tax and eliminate future appreciation.',
      unlockModule: 'module-7',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-7'] || 0) >= 85,
      requirements: {
        income: 'Realized capital gains from sale of appreciated assets',
        entity: 'Qualified Opportunity Fund investment vehicle',
        timing: 'Must reinvest within 180 days of gain recognition'
      },
      implementation: [
        {
          step: 1,
          title: 'Identify Gain',
          description: 'Recognize eligible capital gain for deferral opportunity',
          details: 'Sell appreciated asset and identify capital gain amount eligible for QOF investment.'
        },
        {
          step: 2,
          title: 'Reinvest Within 180 Days',
          description: 'Invest gain proceeds into Qualified Opportunity Fund',
          details: 'Deploy capital gain proceeds into qualifying QOF investment before 180-day deadline.'
        },
        {
          step: 3,
          title: 'Hold 10+ Years',
          description: 'Maintain investment for maximum tax benefits',
          details: 'Hold QOF investment for at least 10 years to eliminate tax on appreciation.'
        }
      ],
      taxImpact: {
        scenario: '$500K capital gain from asset sale',
        before: 'Immediate tax on $500K gain at capital gains rates',
        after: 'Tax deferred until 2026 or QOF sale, plus appreciation elimination',
        savings: 'Complete elimination of tax on QOF appreciation',
        notes: 'Plus 10% basis step-up after 5 years, 15% after 7 years'
      },
      linkedTools: [
        { name: 'Capital Gains Deferral Planner', id: 'capital-gains-planner', icon: '📈' }
      ],
      linkedModule: {
        name: 'Module 7: Opportunity Zone Planning',
        id: 'module-7',
        description: 'Master Opportunity Zone investment strategies and compliance'
      }
    },
    {
      id: 'cost-segregation-timing',
      title: 'Cost Segregation & Timing',
      category: 'Real Estate',
      personas: ['investor'],
      icon: '🏗️',
      overview: 'Accelerate depreciation on rental property with cost segregation and bonus depreciation.',
      unlockModule: 'module-5',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-5'] || 0) >= 85,
      requirements: {
        income: 'Rental real estate with substantial improvements',
        entity: 'Commercial or residential rental property over $500K value',
        timing: 'Most beneficial in year of acquisition or substantial improvement'
      },
      implementation: [
        {
          step: 1,
          title: 'Order Cost Seg Study',
          description: 'Engage qualified cost segregation specialist',
          details: 'Hire engineering-based cost segregation firm to analyze property components.'
        },
        {
          step: 2,
          title: 'Apply Bonus Depreciation',
          description: 'Elect maximum bonus depreciation on qualifying components',
          details: 'Take 100% bonus depreciation on 5, 7, and 15-year property identified in study.'
        }
      ],
      taxImpact: {
        scenario: '$1M rental property with cost segregation',
        before: '$36K annual depreciation over 27.5 years',
        after: '$200K+ first-year depreciation deduction',
        savings: '$100K+ in upfront tax benefits',
        notes: 'Significant acceleration of depreciation benefits to current tax year'
      },
      linkedTools: [
        { name: 'Real Estate Strategy Finder', id: 're-strategy-finder', icon: '🔍' }
      ],
      linkedModule: {
        name: 'Module 5: Real Estate Tax Optimization',
        id: 'module-5',
        description: 'Advanced real estate depreciation and tax planning strategies'
      }
    },
    {
      id: 's-corp-salary-optimization',
      title: 'S-Corp Salary Optimization',
      category: 'Entity Structuring',
      personas: ['w2', 'business'],
      icon: '💼',
      overview: 'Form an S-Corp and split income between salary and distributions to avoid self-employment tax on the latter.',
      unlockModule: 'module-2',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-2'] || 0) >= 85,
      requirements: {
        income: '1099 income or business profit suitable for entity conversion',
        entity: 'Existing sole proprietorship or LLC eligible for S-Corp election',
        timing: 'Most beneficial for consistent annual income over $60K'
      },
      implementation: [
        {
          step: 1,
          title: 'Form S-Corp',
          description: 'Establish S-Corporation or elect S-Corp status for existing LLC',
          details: 'File appropriate paperwork with state and IRS to establish S-Corp status.'
        },
        {
          step: 2,
          title: 'Set up Payroll',
          description: 'Establish reasonable salary for owner-employee',
          details: 'Determine and implement reasonable compensation subject to payroll taxes.'
        },
        {
          step: 3,
          title: 'Distribute Remaining Profit',
          description: 'Take excess profit as distributions free from self-employment tax',
          details: 'Distribute remaining business profit to owners as non-payroll distributions.'
        }
      ],
      taxImpact: {
        scenario: '$150K annual business profit',
        before: 'All profit subject to 15.3% self-employment tax',
        after: 'Only reasonable salary ($75K) subject to payroll taxes',
        savings: '$10K-$20K/year in SE tax savings',
        notes: 'Ongoing savings year after year with proper salary management'
      },
      linkedTools: [
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' }
      ],
      linkedModule: {
        name: 'Module 2: W-2 Income Repositioning',
        id: 'module-2',
        description: 'Advanced strategies for optimizing employment and business income structures'
      }
    },
    {
      id: 'charitable-trust-planning',
      title: 'Charitable Trust Planning (CRT / CLAT)',
      category: 'Estate Planning',
      personas: ['hnw'],
      icon: '🎁',
      overview: 'Use CRTs or Sharkfin CLATs to defer gains, create deductions, and shift wealth while maintaining income.',
      unlockModule: 'module-8',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-8'] || 0) >= 85,
      requirements: {
        income: 'High net worth individual with significant appreciated assets',
        entity: 'Charitable trust structure with qualified charity beneficiary',
        timing: 'Best for large asset sales or estate planning events'
      },
      implementation: [
        {
          step: 1,
          title: 'Transfer Asset to Trust',
          description: 'Transfer appreciated asset to charitable remainder or lead trust',
          details: 'Contribute appreciated asset to trust in exchange for income stream or deduction.'
        },
        {
          step: 2,
          title: 'Structure Payouts and Remainder',
          description: 'Design trust terms for optimal income and charitable benefit',
          details: 'Configure trust payout terms to maximize income stream and charitable remainder.'
        },
        {
          step: 3,
          title: 'File Charitable Deduction',
          description: 'Claim appropriate charitable income tax deduction',
          details: 'Calculate and claim charitable deduction based on remainder value.'
        }
      ],
      taxImpact: {
        scenario: '$2M appreciated asset transfer to CRT',
        before: 'Large capital gains tax on asset sale',
        after: 'Income stream plus charitable deduction',
        savings: 'Large deduction + gain deferral or exclusion',
        notes: 'Plus estate tax benefits and wealth transfer advantages'
      },
      linkedTools: [
        { name: 'Estate Optimizer', id: 'estate-optimizer', icon: '🏛️' }
      ],
      linkedModule: {
        name: 'Module 8: Charitable Structures',
        id: 'module-8',
        description: 'Advanced charitable giving and estate planning strategies'
      }
    },
    {
      id: 'installment-sale-exit-planning',
      title: 'Installment Sale Exit Planning',
      category: 'Exit Planning',
      personas: ['business', 'investor'],
      icon: '🚪',
      overview: 'Spread recognition of capital gains over several years to manage tax brackets and avoid spikes.',
      unlockModule: 'module-9',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-9'] || 0) >= 85,
      requirements: {
        income: 'Business owner or investor planning asset sale',
        entity: 'Business or investment asset suitable for installment sale',
        timing: 'Pre-sale planning essential for optimal structure'
      },
      implementation: [
        {
          step: 1,
          title: 'Structure Installment Agreement',
          description: 'Design sale terms with payments over multiple tax years',
          details: 'Structure sale to receive payments over multiple years to spread gain recognition.'
        },
        {
          step: 2,
          title: 'Time Payments with Deductions',
          description: 'Coordinate installment receipts with available deductions',
          details: 'Plan payment timing to coincide with other deductions and manage tax brackets.'
        },
        {
          step: 3,
          title: 'File under §453',
          description: 'Elect installment sale treatment for tax purposes',
          details: 'Properly report installment sale and recognize gain ratably over payment period.'
        }
      ],
      taxImpact: {
        scenario: '$3M business sale with 5-year installment',
        before: 'All gain recognized in year of sale',
        after: '$600K gain recognized annually over 5 years',
        savings: 'Smoother tax liability and reduced bracket compression',
        notes: 'Avoids pushing taxpayer into highest brackets in single year'
      },
      linkedTools: [
        { name: 'Capital Gains Deferral Planner', id: 'capital-gains-planner', icon: '📈' }
      ],
      linkedModule: {
        name: 'Module 9: Installment Sales',
        id: 'module-9',
        description: 'Master installment sale strategies and exit planning techniques'
      }
    }
  ];

  // Filter playbooks based on search and filters
  const filteredPlaybooks = playbooks.filter(playbook => {
    const matchesSearch = playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playbook.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || playbook.category === filterCategory;
    const matchesPersona = filterPersona === 'all' || playbook.personas.includes(filterPersona);
    
    return matchesSearch && matchesCategory && matchesPersona;
  });

  // Get unique categories and personas for filters
  const categories = [...new Set(playbooks.map(p => p.category))];
  const personas = [...new Set(playbooks.flatMap(p => p.personas))];

  // Handle playbook selection from URL
  useEffect(() => {
    if (playbookId) {
      const playbook = playbooks.find(p => p.id === playbookId);
      if (playbook) {
        setSelectedPlaybook(playbook);
      }
    }
  }, [playbookId]);

  const PlaybookCard = ({ playbook }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
      !playbook.isUnlocked ? 'opacity-75' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{playbook.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{playbook.title}</h3>
            <p className="text-sm text-gray-600">{playbook.category}</p>
          </div>
        </div>
        {!playbook.isUnlocked && (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            🔒 Locked
          </span>
        )}
      </div>

      {/* Overview */}
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">{playbook.overview}</p>

      {/* Tax Impact Preview */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-green-800 mb-2">💰 Tax Impact</h4>
        <p className="text-sm text-green-700">{playbook.taxImpact.savings}</p>
      </div>

      {/* Linked Module */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>
          <strong>Module:</strong> {playbook.linkedModule.name}
        </span>
        <span>
          <strong>Personas:</strong> {playbook.personas.map(p => p.toUpperCase()).join(', ')}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {playbook.isUnlocked ? (
          <>
            <button
              onClick={() => setSelectedPlaybook(playbook)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              View Details
            </button>
            <Link
              to={`/tools`}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm font-medium"
            >
              Tools
            </Link>
          </>
        ) : (
          <div className="flex-1 bg-gray-200 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium text-center cursor-not-allowed">
            Complete {playbook.linkedModule.name} to unlock
          </div>
        )}
      </div>
    </div>
  );

  const PlaybookDetailModal = ({ playbook, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{playbook.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{playbook.title}</h2>
                <p className="text-gray-600">{playbook.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-700">{playbook.overview}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div><strong>Income Level:</strong> {playbook.requirements.income}</div>
              <div><strong>Entity Type:</strong> {playbook.requirements.entity}</div>
              <div><strong>Timing:</strong> {playbook.requirements.timing}</div>
            </div>
          </div>

          {/* Implementation Steps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Steps</h3>
            <div className="space-y-4">
              {playbook.implementation.map((step) => (
                <div key={step.step} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                      <p className="text-gray-500 text-sm">{step.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Impact Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax Impact Analysis</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Before Strategy</h4>
                  <p className="text-sm text-green-700">{playbook.taxImpact.before}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-1">After Strategy</h4>
                  <p className="text-sm text-green-700">{playbook.taxImpact.after}</p>
                </div>
              </div>
              <div className="bg-green-100 rounded p-3">
                <h4 className="font-semibold text-green-900 mb-1">💰 Expected Savings</h4>
                <p className="text-green-800 font-medium">{playbook.taxImpact.savings}</p>
                <p className="text-sm text-green-700 mt-1">{playbook.taxImpact.notes}</p>
              </div>
            </div>
          </div>

          {/* Linked Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Linked Module */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">📚 Course Module</h4>
                <p className="text-sm text-gray-600 mb-2">{playbook.linkedModule.name}</p>
                <p className="text-xs text-gray-500">{playbook.linkedModule.description}</p>
              </div>

              {/* Linked Tools */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">🛠️ Related Tools</h4>
                <div className="space-y-2">
                  {playbook.linkedTools.map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-2">
                      <span>{tool.icon}</span>
                      <span className="text-sm text-gray-600">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <Link
              to={`/course/${playbook.linkedModule.id}`}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium text-center"
            >
              Study Module
            </Link>
            <Link
              to="/tools"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium text-center"
            >
              Use Tools
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Strategy Playbooks</h1>
          <p className="mt-2 text-gray-600">
            Proven tax strategies with step-by-step implementation guides
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search strategies..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Persona</label>
              <select
                value={filterPersona}
                onChange={(e) => setFilterPersona(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Personas</option>
                <option value="w2">W-2 Earners</option>
                <option value="business">Business Owners</option>
                <option value="investor">Real Estate Investors</option>
                <option value="hnw">HNW Individuals</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="simple">Simple View</option>
                <option value="detailed">Detailed View</option>
              </select>
            </div>
          </div>
        </div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaybooks.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>

        {/* No Results */}
        {filteredPlaybooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No strategies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedPlaybook && (
          <PlaybookDetailModal
            playbook={selectedPlaybook}
            onClose={() => setSelectedPlaybook(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StrategyPlaybooks;