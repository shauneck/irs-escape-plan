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
          details: 'Create a separate C-Corp entity to serve as the management company for your operating business.',
          advanced: 'Ensure compliance with IRC Section 482 and establish proper substance for the MSO to avoid recharacterization.'
        },
        {
          step: 2,
          title: 'Create a Service Agreement',
          description: 'Draft comprehensive management service agreements',
          details: 'Develop detailed agreements outlining services provided by MSO to operating entities.',
          advanced: 'Structure fees at arm\'s length pricing with proper transfer pricing documentation under Treas. Reg. 1.482-1.'
        },
        {
          step: 3,
          title: 'Allocate Income Appropriately',
          description: 'Optimize income allocation between entities',
          details: 'Split income between operating entity and MSO to optimize overall tax burden.',
          advanced: 'Monitor accumulated earnings tax under Section 531 and personal holding company rules under Section 541.'
        },
        {
          step: 4,
          title: 'Reinvest Retained Earnings',
          description: 'Deploy retained earnings tax-efficiently',
          details: 'Use C-Corp retained earnings for business expansion and investment at lower corporate rates.',
          advanced: 'Consider QSBS qualification under Section 1202 for potential gain exclusion on future sale.'
        },
        {
          step: 5,
          title: 'Track Compliance',
          description: 'Maintain ongoing compliance and documentation',
          details: 'Ensure proper corporate formalities and maintain detailed records for all inter-company transactions.',
          advanced: 'Implement quarterly transfer pricing reviews and maintain contemporaneous documentation.'
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
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 1: Business Structuring & Retained Earnings',
        id: 'module-1',
        description: 'Master business entity optimization and corporate tax planning'
      },
      commonMistakes: [
        'Inadequate substance in MSO operations and activities',
        'Improper transfer pricing between related entities',
        'Failing to maintain corporate formalities and documentation',
        'Ignoring accumulated earnings tax implications'
      ],
      checklist: [
        'Form C-Corp MSO with proper QSBS planning',
        'Draft comprehensive service agreements',
        'Establish arm\'s length pricing methodology',
        'Implement quarterly compliance reviews',
        'Maintain detailed inter-company transaction records',
        'Monitor accumulated earnings tax thresholds'
      ]
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
          details: 'Invest traditional IRA into private equity, real estate partnerships, or other illiquid assets.',
          advanced: 'Consider IRC Section 409A valuation requirements and ensure proper independent appraisal methodology.'
        },
        {
          step: 2,
          title: 'Secure FMV Valuation',
          description: 'Obtain qualified independent appraisal with appropriate discounts',
          details: 'Get professional valuation reflecting marketability and minority interest discounts.',
          advanced: 'Apply ASA, AAA, or similar credentialed appraiser with experience in IRC Section 2031 valuations.'
        },
        {
          step: 3,
          title: 'Convert at Discounted Basis',
          description: 'Execute Roth conversion based on discounted fair market value',
          details: 'Convert the discounted asset value to Roth IRA, paying taxes on reduced basis.',
          advanced: 'Coordinate timing with income management strategies and consider estimated tax payment requirements.'
        },
        {
          step: 4,
          title: 'Grow Assets Tax-Free',
          description: 'Allow converted assets to appreciate in tax-free Roth environment',
          details: 'Monitor asset performance and manage Roth account for optimal long-term growth.',
          advanced: 'Consider subsequent asset diversification strategies within Roth to manage concentration risk.'
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
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' },
        { name: 'Retirement Optimizer', id: 'retirement-optimizer', icon: '🎯' }
      ],
      linkedModule: {
        name: 'Module 3: Roth Conversion & Valuation Strategies',
        id: 'module-3',
        description: 'Advanced retirement account optimization and valuation techniques'
      },
      commonMistakes: [
        'Using aggressive or unsupportable valuation discounts',
        'Converting too much in high-income years',
        'Inadequate documentation for valuation methodology',
        'Using IRA funds to pay conversion taxes'
      ],
      checklist: [
        'Select appropriate alternative investment for discount potential',
        'Engage qualified independent appraiser',
        'Document valuation methodology and discount rationale',
        'Plan external funding source for conversion taxes',
        'Execute conversion timing with income optimization',
        'Maintain detailed records for IRS compliance'
      ]
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
          details: 'Purchase properties intended for short-term rental with average guest stays under 7 days.',
          advanced: 'Ensure substantial services under Temp. Reg. 1.469-1T(e)(3)(ii) to avoid passive classification.'
        },
        {
          step: 2,
          title: 'Qualify for REPS (750+ hours)',
          description: 'Meet real estate professional status requirements',
          details: 'Document 750+ hours annually in real estate trades/businesses with >50% of personal services.',
          advanced: 'Consider grouping election under Treas. Reg. 1.469-9 to aggregate multiple real estate activities.'
        },
        {
          step: 3,
          title: 'Perform Cost Segregation',
          description: 'Accelerate depreciation through cost segregation study',
          details: 'Engage qualified cost segregation specialist to identify shorter-life property components.',
          advanced: 'Coordinate with IRC Section 168(k) bonus depreciation elections and consider Section 199A implications.'
        },
        {
          step: 4,
          title: 'Apply Bonus Depreciation',
          description: 'Maximize current-year deductions through bonus depreciation',
          details: 'Elect 100% bonus depreciation on qualifying property components identified in cost segregation.',
          advanced: 'Monitor AMT implications and consider Section 163(j) interest limitation on highly leveraged properties.'
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
        { name: 'STR Optimizer', id: 'str-optimizer', icon: '🏠' },
        { name: 'Real Estate Strategy Finder', id: 're-strategy-finder', icon: '🔍' }
      ],
      linkedModule: {
        name: 'Module 5: Real Estate Professional Strategies',
        id: 'module-5',
        description: 'Master REPS qualification and short-term rental optimization'
      },
      commonMistakes: [
        'Inadequate contemporaneous hour tracking documentation',
        'Failing to provide substantial services for STR classification',
        'Missing material participation tests for individual properties',
        'Not filing grouping election when beneficial'
      ],
      checklist: [
        'Implement comprehensive hour tracking system',
        'Document substantial STR services provided to guests',
        'Ensure 750+ hours in real estate professional activities',
        'File grouping election if managing multiple properties',
        'Coordinate cost segregation study with property acquisition',
        'Monitor material participation for each rental activity'
      ]
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
          details: 'Choose working interest in oil and gas properties with significant IDC component.',
          advanced: 'Ensure working interest status under IRC Section 469(c)(3) to avoid passive activity limitations.'
        },
        {
          step: 2,
          title: 'Allocate to IDC-heavy Assets',
          description: 'Focus investment on intangible drilling costs for maximum deduction',
          details: 'Prioritize drilling programs with high percentage of deductible intangible costs.',
          advanced: 'File Section 263(c) election to deduct IDCs currently rather than capitalize and deplete.'
        },
        {
          step: 3,
          title: 'Deduct 80–90% in Year 1',
          description: 'Maximize current-year ordinary income deductions',
          details: 'Claim immediate deduction for intangible drilling and development costs.',
          advanced: 'Monitor AMT implications under Section 57(a)(2) and consider timing of additional investments.'
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
        { name: 'IRS Exposure Radar', id: 'exposure-radar', icon: '🎯' },
        { name: 'Alternative Investment Analyzer', id: 'alt-investment-analyzer', icon: '📊' }
      ],
      linkedModule: {
        name: 'Module 6: Oil & Gas Tax Planning',
        id: 'module-6',
        description: 'Navigate oil & gas investments and deduction optimization'
      },
      commonMistakes: [
        'Investing in passive limited partnership interests instead of working interests',
        'Inadequate due diligence on drilling program economics',
        'Missing IDC election deadlines or filing requirements',
        'Ignoring AMT impact of large IDC deductions'
      ],
      checklist: [
        'Verify working interest status for passive activity exemption',
        'Conduct thorough due diligence on drilling program and operator',
        'File appropriate IDC elections with tax return',
        'Evaluate AMT impact and plan accordingly',
        'Diversify across multiple drilling programs to manage risk',
        'Set up tracking for ongoing depletion calculations'
      ]
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
          details: 'Sell appreciated asset and identify capital gain amount eligible for QOF investment.',
          advanced: 'Consider installment sale timing under Section 453 to optimize gain recognition and deferral periods.'
        },
        {
          step: 2,
          title: 'Reinvest Within 180 Days',
          description: 'Invest gain proceeds into Qualified Opportunity Fund',
          details: 'Deploy capital gain proceeds into qualifying QOF investment before 180-day deadline.',
          advanced: 'Ensure QOF compliance with 90% asset test under Section 1400Z-2 and proper certification.'
        },
        {
          step: 3,
          title: 'Hold 10+ Years',
          description: 'Maintain investment for maximum tax benefits',
          details: 'Hold QOF investment for at least 10 years to eliminate tax on appreciation.',
          advanced: 'Monitor QOF compliance throughout holding period and plan for basis adjustments at 5 and 7 years.'
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
        { name: 'Capital Gains Deferral Planner', id: 'capital-gains-planner', icon: '📈' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 7: Opportunity Zone Planning',
        id: 'module-7',
        description: 'Master Opportunity Zone investment strategies and compliance'
      },
      commonMistakes: [
        'Missing 180-day reinvestment deadline',
        'Investing in non-compliant or poorly managed QOF',
        'Inadequate due diligence on underlying opportunity zone business',
        'Failing to track basis adjustments and holding period requirements'
      ],
      checklist: [
        'Identify and quantify eligible capital gains',
        'Research and select appropriate Qualified Opportunity Fund',
        'Execute investment within 180-day window',
        'Maintain detailed records of investment timing',
        'Monitor QOF compliance and performance',
        'Plan for basis adjustments at 5 and 7-year marks'
      ]
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
          details: 'Hire engineering-based cost segregation firm to analyze property components.',
          advanced: 'Ensure compliance with IRC Section 167 and Treas. Reg. 1.167-11 detailed engineering methodology.'
        },
        {
          step: 2,
          title: 'Apply Bonus Depreciation',
          description: 'Elect maximum bonus depreciation on qualifying components',
          details: 'Take 100% bonus depreciation on 5, 7, and 15-year property identified in study.',
          advanced: 'Consider Section 163(j) interest limitation impact and coordinate with Section 199A deduction planning.'
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
        { name: 'Real Estate Strategy Finder', id: 're-strategy-finder', icon: '🔍' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 5: Real Estate Tax Optimization',
        id: 'module-5',
        description: 'Advanced real estate depreciation and tax planning strategies'
      },
      commonMistakes: [
        'Using non-engineering based cost segregation studies',
        'Failing to consider passive activity loss limitations',
        'Not coordinating with overall tax planning strategy',
        'Inadequate documentation for asset classifications'
      ],
      checklist: [
        'Engage qualified engineering-based cost segregation firm',
        'Ensure study meets IRS detailed methodology requirements',
        'Coordinate bonus depreciation elections with overall tax plan',
        'Consider passive activity loss limitation impacts',
        'Maintain detailed documentation for component classifications',
        'Plan for depreciation recapture on future property sales'
      ]
    },
    {
      id: 's-corp-salary-optimization',
      title: 'S-Corp Salary Optimization',
      category: 'Entity Planning',
      personas: ['w2', 'business'],
      icon: '💼',
      overview: 'Form an S-Corp and split income between salary and distributions to avoid self-employment tax on the latter.',
      unlockModule: 'module-2',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-2'] || 0) >= 85,
      requirements: {
        income: '$100K+ annual self-employment or business income',
        entity: 'LLC, sole proprietorship, or partnership eligible for S-Corp election',
        timing: 'Election must be filed by March 15th for current year (or within 2.5 months of entity formation)'
      },
      implementation: [
        {
          step: 1,
          title: 'Form S-Corp',
          description: 'Elect S-Corporation tax status for existing entity',
          details: 'File Form 2553 to elect S-Corporation status for LLC or incorporate new S-Corp.',
          advanced: 'Consider late election relief under Rev. Proc. 2013-30 if deadline missed, ensure shareholder consent requirements met.'
        },
        {
          step: 2,
          title: 'Set Up Payroll',
          description: 'Establish reasonable salary and payroll system',
          details: 'Implement payroll system and set reasonable compensation for owner-employee services.',
          advanced: 'Apply three-factor test (time, effort, skills) and industry compensation data for reasonable salary determination.'
        },
        {
          step: 3,
          title: 'Distribute Remaining Profit',
          description: 'Take remaining business profit as distributions',
          details: 'Distribute profits above reasonable salary as S-Corp distributions to avoid SE tax.',
          advanced: 'Monitor accumulated adjustments account (AAA) and ensure compliance with distribution ordering rules.'
        }
      ],
      taxImpact: {
        scenario: '$150K annual business income',
        before: '$22,950 self-employment tax on full amount',
        after: '$9,180 payroll tax on $60K salary',
        savings: '$10K-$20K annual self-employment tax savings',
        notes: 'Assumes $60K reasonable salary with $90K distributions'
      },
      linkedTools: [
        { name: 'Entity Structure Wizard', id: 'entity-wizard', icon: '🧙‍♂️' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 2: W-2 Income Repositioning',
        id: 'module-2',
        description: 'Optimize employment tax strategies and entity elections'
      },
      commonMistakes: [
        'Setting unreasonably low salary to maximize SE tax savings',
        'Missing S-Corp election deadlines',
        'Inadequate payroll system and compliance',
        'Not tracking accumulated adjustments account properly'
      ],
      checklist: [
        'File Form 2553 with all required shareholder consents',
        'Establish payroll system and obtain EIN if needed',
        'Research industry compensation data for reasonable salary',
        'Set up quarterly payroll tax deposits and filings',
        'Implement AAA tracking for distribution planning',
        'Update operating agreement or bylaws as needed'
      ]
    },
    {
      id: 'charitable-trust-planning',
      title: 'Charitable Trust Planning (CRT / CLAT)',
      category: 'Estate Planning',
      personas: ['investor'],
      icon: '💝',
      overview: 'Use CRTs or Sharkfin CLATs to defer gains, create deductions, and shift wealth while maintaining income.',
      unlockModule: 'module-8',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-8'] || 0) >= 85,
      requirements: {
        income: '$1M+ net worth with appreciated assets and charitable intent',
        entity: 'High-net-worth individuals with significant appreciated assets',
        timing: 'Optimal before large liquidity events or during high-income years'
      },
      implementation: [
        {
          step: 1,
          title: 'Transfer Asset to Trust',
          description: 'Contribute appreciated asset to charitable remainder or lead trust',
          details: 'Transfer highly appreciated asset to CRT or CLAT structure for tax optimization.',
          advanced: 'Consider IRC Section 664 requirements for CRTs and Section 170 valuation rules for charitable deductions.'
        },
        {
          step: 2,
          title: 'Structure Payouts and Remainder',
          description: 'Optimize income stream and charitable remainder calculations',
          details: 'Design payout structure to balance current income needs with charitable goals.',
          advanced: 'Use actuarial factors under Section 7520 and consider "Sharkfin" CLAT structures for wealth transfer.'
        },
        {
          step: 3,
          title: 'File Charitable Deduction',
          description: 'Claim appropriate charitable income tax deduction',
          details: 'Calculate and claim charitable deduction based on present value of remainder interest.',
          advanced: 'Navigate 50%/30%/20% AGI limitations and five-year carryforward provisions under Section 170(b).'
        }
      ],
      taxImpact: {
        scenario: '$2M appreciated asset with $200K basis',
        before: '$360K+ capital gains tax on sale',
        after: 'No immediate tax plus $500K+ charitable deduction',
        savings: 'Gain deferral plus large current deduction',
        notes: 'Plus ongoing income stream and wealth transfer benefits'
      },
      linkedTools: [
        { name: 'Estate Optimizer', id: 'estate-optimizer', icon: '🏛️' },
        { name: 'Charitable Planning Calculator', id: 'charitable-calculator', icon: '💝' }
      ],
      linkedModule: {
        name: 'Module 8: Charitable Structures',
        id: 'module-8',
        description: 'Master charitable remainder trusts and advanced giving strategies'
      },
      commonMistakes: [
        'Inadequate asset selection for trust funding',
        'Poor payout rate selection affecting trust qualification',
        'Not coordinating with overall estate planning strategy',
        'Failing to consider trustee selection and management'
      ],
      checklist: [
        'Select appropriate appreciated assets for trust funding',
        'Engage qualified estate planning attorney for trust drafting',
        'Calculate optimal payout rates and structure',
        'Coordinate charitable deduction timing with AGI limitations',
        'Select appropriate trustee and investment management',
        'Plan for ongoing trust administration and compliance'
      ]
    },
    {
      id: 'installment-sale-exit-planning',
      title: 'Installment Sale Exit Planning',
      category: 'Exit Planning',
      personas: ['business', 'investor'],
      icon: '📅',
      overview: 'Spread recognition of capital gains over several years to manage tax brackets and avoid spikes.',
      unlockModule: 'module-9',
      unlockQuizScore: 85,
      isUnlocked: (userStats.quizScores?.['module-9'] || 0) >= 85,
      requirements: {
        income: 'Substantial capital gain from business or real estate sale',
        entity: 'Business or investment property suitable for installment treatment',
        timing: 'Best for large gains that would cause significant bracket compression'
      },
      implementation: [
        {
          step: 1,
          title: 'Structure Installment Agreement',
          description: 'Design sale agreement for installment treatment qualification',
          details: 'Structure sale to receive payments over multiple years to qualify for installment method.',
          advanced: 'Ensure compliance with IRC Section 453 and avoid disqualifying payment patterns or contingent sales.'
        },
        {
          step: 2,
          title: 'Time Payments with Deductions',
          description: 'Coordinate payment timing with other tax planning strategies',
          details: 'Plan installment payments to coincide with years having offsetting deductions.',
          advanced: 'Consider charitable deductions, business losses, and other timing strategies to optimize overall tax burden.'
        },
        {
          step: 3,
          title: 'File Under §453',
          description: 'Properly report installment sale on tax returns',
          details: 'Use Form 6252 to report installment sale income over the payment period.',
          advanced: 'Monitor depreciation recapture timing and consider Section 1031 like-kind exchange coordination.'
        }
      ],
      taxImpact: {
        scenario: '$1M capital gain from business sale',
        before: 'Entire gain recognized in year of sale',
        after: 'Gain spread over 5-10 years at lower marginal rates',
        savings: 'Avoid bracket compression and NIIT on large gain',
        notes: 'Plus interest income on deferred payments and improved cash flow'
      },
      linkedTools: [
        { name: 'Capital Gains Deferral Planner', id: 'capital-gains-planner', icon: '📈' },
        { name: 'Tax Savings Estimator', id: 'savings-estimator', icon: '💰' }
      ],
      linkedModule: {
        name: 'Module 9: Installment Sales',
        id: 'module-9',
        description: 'Master installment sale strategies and exit planning techniques'
      },
      commonMistakes: [
        'Receiving too much cash in year of sale, disqualifying installment treatment',
        'Not properly securing payment obligations from buyer',
        'Failing to coordinate with other tax planning strategies',
        'Inadequate documentation of installment sale terms'
      ],
      checklist: [
        'Structure sale agreement to qualify for installment treatment',
        'Limit year-of-sale payments to avoid disqualification',
        'Secure buyer payment obligations with appropriate collateral',
        'Plan payment timing to optimize tax bracket management',
        'Coordinate with other income and deduction timing strategies',
        'Maintain detailed records for multi-year reporting compliance'
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