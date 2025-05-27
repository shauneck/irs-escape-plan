// Course content structure for paid courses
export const courseContent = {
  "w2-escape-plan": {
    id: "w2-escape-plan",
    title: "W-2 Escape Plan",
    subtitle: "Advanced Tax Strategies for High-Income Employees",
    price: "$497",
    description: "Transform your W-2 tax burden into wealth-building opportunities with proven strategies used by top earners.",
    caseStudyClient: "Helen Park",
    locked: true,
    vsl: {
      title: "Stop Being the IRS's Favorite ATM",
      script: "You maxed out your 401(k). You made all the 'safe' moves. And yet, the IRS still took six figures last year. You're not alone — high-income W-2 earners are the IRS's favorite ATM. But there's another path. Inside the W-2 Escape Plan, you'll learn exactly how clients like Helen Park reduced their tax bill by over $100K a year — legally, ethically, and efficiently. We'll show you how to reposition your income, restructure your assets, and reclaim control. You don't need to become a real estate tycoon or quit your job. You just need to stop playing by the IRS's rules — and start playing by the code. Click below to unlock the full course. Let's get your tax life back."
    },
    modules: [
      {
        id: 1,
        title: "Why CPAs Are Failing You",
        theme: "Filing Isn't Planning",
        duration: "32 min",
        preview: true,
        script: `Welcome to the W-2 Escape Plan. I'm going to start with something that might sting a little: your CPA is probably failing you.

Not because they're incompetent. Not because they don't care. But because they're playing a different game than you think they are.

See, most CPAs are in the compliance business. They file your return. They make sure you don't get audited. They keep you out of trouble. And that's valuable — but it's not tax strategy.

Tax strategy is proactive. It's about structuring your financial life in advance to minimize what you owe. Compliance is reactive. It's about reporting what already happened.

Helen Park learned this the hard way. Tech executive, $450K W-2 income, maxed out 401k, did everything "right" — and still paid $140K in federal taxes alone.

Her CPA filed a perfect return. Clean, compliant, audit-proof. And completely reactive.

That's when Helen found us. And over the next 18 months, we helped her cut that $140K tax bill by more than half — without changing her job, her income, or her lifestyle.

How? By moving from filing to planning. From reactive to proactive. From compliance to strategy.

In this course, you're going to learn exactly how we did it.`,
        strategies: [
          "Introduction to proactive tax planning",
          "Understanding the difference between compliance and strategy",
          "The CPA limitation framework"
        ],
        ircRefs: [],
        caseStudy: "Helen Park begins her journey from $140K tax bill to strategic optimization"
      },
      {
        id: 2,
        title: "Where the Real Deductions Begin",
        theme: "Standard advice leaves 6–7 figures on the table",
        duration: "45 min",
        preview: false,
        script: `Let's talk about where the real deductions begin. Because if you're maxing out your 401k and taking the standard deduction, you're leaving six to seven figures on the table over your career.

The tax code isn't just about W-2s and 1040s. It's about business activities, investment activities, and strategic repositioning of income.

Helen's breakthrough came when we introduced her to three concepts her CPA never mentioned:

First: Oil & Gas IDCs. Intangible Drilling Costs. Under IRC Section 263(c), you can deduct 100% of certain drilling costs in year one. Helen invested $150K and deducted $127K immediately.

Second: Short-Term Rental classification. Not just owning rental property — but structuring it correctly under Section 469 to offset W-2 income.

Third: Accelerated depreciation through cost segregation. Breaking down property into components that depreciate faster than the standard 27.5 years.

These aren't loopholes. They're explicit provisions in the tax code designed to incentivize specific economic activities.

The problem? Most CPAs don't work in these areas. They're complex, they require specialized knowledge, and they carry compliance risk if done incorrectly.

But when done right? They're transformational.`,
        strategies: [
          "Oil & Gas IDCs for immediate deductions",
          "STR classification under §469",
          "Accelerated depreciation via cost segregation",
          "Moving beyond standard W-2 deductions"
        ],
        ircRefs: ["§263(c)", "§469", "§168"],
        caseStudy: "Helen's first exposure to strategic tax sheltering: $127K deduction from $150K investment"
      },
      {
        id: 3,
        title: "Repositioning Your Assets",
        theme: "From taxed to protected",
        duration: "38 min",
        preview: false,
        script: `Asset repositioning is where high-income W-2 earners make their biggest gains. Because it's not just about what you earn — it's about where you earn it and how it's structured.

Helen had $800K in traditional retirement accounts. All of it destined for ordinary income tax rates in retirement. We needed to reposition some of that into tax-free territory.

The strategy: Roth conversions with strategic offsets.

Here's how it worked:

Year one: Helen converted $200K from traditional to Roth IRA. Normally, that would create $200K in taxable income — about $74K in additional tax.

But we paired the conversion with her STR losses and cost segregation deductions. Net result? $60K offset, reducing the conversion tax to just $14K.

She paid $14K in tax to convert $200K into tax-free growth. That's a 7% tax rate on a Roth conversion for someone in the 37% bracket.

We also restructured her property holdings using the self-rental rule under Section 469. Her consulting LLC now rents office space from her property LLC, converting passive rental income into active income that can offset other deductions.

This is asset repositioning. Taking what you have and restructuring it for maximum tax efficiency.`,
        strategies: [
          "Roth conversion with strategic offsets",
          "Self-rental rule application",
          "Material participation standards",
          "Asset restructuring for tax efficiency"
        ],
        ircRefs: ["§408A", "§469"],
        caseStudy: "Helen converts $200K IRA with $60K offset using STR losses, paying only 7% effective tax rate"
      },
      {
        id: 4,
        title: "The Real Estate Game Plan",
        theme: "Turning property into tax shields",
        duration: "42 min",
        preview: false,
        script: `Real estate isn't just an investment for high-income W-2 earners. It's a tax strategy delivery vehicle.

But here's what most people get wrong: they buy rental property, collect rent, and pay tax on the income. That's backwards.

The goal isn't rental income. The goal is tax losses that offset your W-2 income.

Helen bought a short-term rental property in Virginia. Not for the cash flow — though it produces that too — but for the tax benefits.

Here's the structure:

Purchase price: $380K
Cost segregation study: $45K in accelerated depreciation, year one
Material participation: Helen manages the property herself, documenting 150+ hours
Classification: Active business under Section 469, not passive rental

Result: $31K in tax losses that directly offset her W-2 income.

But we didn't stop there. We also showed Helen how to use the Augusta Rule — Section 280A(g) — to rent her personal residence to her consulting business for up to 14 days per year, tax-free.

The key is understanding that real estate tax benefits aren't automatic. They depend on structure, classification, and active participation.`,
        strategies: [
          "STR as active business strategy",
          "Cost segregation for accelerated depreciation",
          "Material participation requirements",
          "Augusta Rule for personal residence"
        ],
        ircRefs: ["§469", "§280A(g)", "§168"],
        caseStudy: "Helen's Virginia STR generates $31K in W-2 offsets through strategic structuring"
      },
      {
        id: 5,
        title: "Business Structure Fundamentals",
        theme: "Creating entities that work for you",
        duration: "35 min",
        preview: false,
        script: `Even as a W-2 employee, you need business structures. Not to replace your job, but to optimize around it.

Helen started a consulting LLC. Not because she wanted to quit her tech job, but because she wanted access to business deductions and entity-level tax planning.

The consulting work was legitimate — she helped other tech companies with strategic planning, maybe 10-15 hours per month. But the tax benefits were transformational.

Business vehicle expenses. Home office deduction. Business meals and entertainment. Equipment purchases with bonus depreciation.

More importantly, the LLC gave us options:

Election flexibility: LLC taxed as S-Corp for employment tax savings
Self-rental opportunities: LLC rents from her property entities
Retirement plan access: SEP-IRA contributions up to 25% of business income

We also set up a solo 401k for the LLC, allowing Helen to contribute both as employer and employee — up to $66K per year in 2023.

The key insight: you don't need to be a full-time entrepreneur to benefit from business entity structures. You just need legitimate business activity.`,
        strategies: [
          "Consulting LLC for business deductions",
          "S-Corp election for employment tax savings",
          "Solo 401k maximization",
          "Business vehicle and home office deductions"
        ],
        ircRefs: ["§162", "§280A", "§401"],
        caseStudy: "Helen's consulting LLC generates $47K in additional deductions and retirement contributions"
      },
      {
        id: 6,
        title: "Advanced Retirement Strategies",
        theme: "Beyond the 401k limits",
        duration: "40 min",
        preview: false,
        script: `The 401k contribution limit is $22.5K in 2023. For high-income earners, that's not enough.

But there are strategies to go beyond the limits — legally and strategically.

Helen's advanced retirement strategy had three components:

First: Backdoor Roth IRA. At her income level, she couldn't contribute directly to a Roth. But she could contribute $6.5K to a non-deductible traditional IRA and convert it immediately.

Second: Mega backdoor Roth. Her employer's 401k plan allowed after-tax contributions up to the Section 415 limit of $66K total. She contributed $22.5K pre-tax, $43.5K after-tax, then converted the after-tax portion to Roth.

Third: Solo 401k for business income. Through her consulting LLC, Helen could contribute an additional $66K to a separate solo 401k plan.

Total annual retirement contributions: $132K. Nearly six times the standard 401k limit.

We also showed Helen how to use life insurance as a retirement vehicle. A properly structured whole life policy allows tax-deferred growth and tax-free loans in retirement — with no contribution limits or required distributions.

The key is understanding that retirement planning isn't just about qualified plans. It's about tax-advantaged wealth accumulation through multiple vehicles.`,
        strategies: [
          "Backdoor Roth IRA implementation",
          "Mega backdoor Roth strategy",
          "Solo 401k for business income",
          "Life insurance as retirement vehicle"
        ],
        ircRefs: ["§408A", "§415", "§401"],
        caseStudy: "Helen increases retirement contributions from $22.5K to $132K annually through strategic planning"
      },
      {
        id: 7,
        title: "State Tax Strategy",
        theme: "Geographic arbitrage for high earners",
        duration: "33 min",
        preview: false,
        script: `State taxes can be the biggest opportunity — or the biggest blind spot — for high-income W-2 earners.

Helen lived in California. State income tax: 13.3% on her bracket. That's nearly $60K per year just to the state.

We didn't tell her to move to Texas. We showed her how to optimize within the system.

First: Strategic timing of income recognition. Bonuses, stock options, and other variable compensation can sometimes be timed to minimize state tax impact.

Second: Domicile planning for future flexibility. Establishing connections to favorable states before a major liquidity event.

Third: Trust structures for multi-state tax planning. Using trusts domiciled in favorable jurisdictions for specific types of income.

Helen kept her job in California but established Nevada residency for her consulting business income. The business income flows through the Nevada entity, avoiding California's high rates on that portion.

She also moved some investments into a Nevada trust structure, removing future appreciation from California's tax reach.

The key insight: state tax planning isn't just about moving. It's about strategic structuring to minimize total tax burden across all jurisdictions.`,
        strategies: [
          "Multi-state entity structuring",
          "Domicile planning for flexibility",
          "Trust structures for state tax optimization",
          "Income timing strategies"
        ],
        ircRefs: [],
        caseStudy: "Helen reduces California tax burden through Nevada business structuring and trust planning"
      },
      {
        id: 8,
        title: "Investment Tax Optimization",
        theme: "Making your portfolio work harder",
        duration: "37 min",
        preview: false,
        script: `Investment taxes are often the silent killer of wealth accumulation. Capital gains, dividend taxes, and ordinary income from investments can devastate long-term returns.

Helen had a typical high-earner investment profile: maxed-out 401k, some index funds in taxable accounts, maybe some individual stocks. Tax-inefficient and strategically unfocused.

We rebuilt her investment strategy around tax efficiency:

Asset location optimization: Tax-inefficient investments in tax-deferred accounts, tax-efficient investments in taxable accounts.

Tax-loss harvesting: Systematically realizing losses to offset gains and ordinary income.

Opportunity Zone investments: Deferring and potentially eliminating capital gains through QOZ investments.

Alternative investments: Oil & gas partnerships, real estate syndications, and other vehicles with favorable tax treatment.

Helen moved $400K into Opportunity Zone investments, deferring $120K in capital gains. If held for 10 years, those gains are permanently eliminated.

She also allocated $200K to oil & gas partnerships, generating immediate deductions and ongoing depletion allowances.

The key insight: investment strategy and tax strategy aren't separate. They're integrated components of wealth optimization.`,
        strategies: [
          "Asset location optimization",
          "Tax-loss harvesting systems",
          "Opportunity Zone investments",
          "Alternative investment tax benefits"
        ],
        ircRefs: ["§1400Z-2", "§613A"],
        caseStudy: "Helen defers $120K in capital gains through QOZ investments and generates ongoing tax benefits"
      },
      {
        id: 9,
        title: "Implementation & Maintenance",
        theme: "Building systems that scale",
        duration: "41 min",
        preview: false,
        script: `Strategy without implementation is just theory. The final module is about building systems that scale and maintain your tax optimization over time.

Helen's implementation roadmap:

Quarter 1: Entity setup (LLC formation, bank accounts, record-keeping systems)
Quarter 2: Real estate acquisition and cost segregation study
Quarter 3: Investment repositioning (Roth conversions, alternative investments)
Quarter 4: Planning for next year (contribution limits, strategy adjustments)

We also built Helen a maintenance checklist:

Monthly: Business expense tracking, rental property management hours
Quarterly: Estimated tax payments, investment rebalancing
Annually: Strategy review, contribution limit adjustments, entity elections

The key insight: tax optimization isn't a one-time event. It's an ongoing system that evolves with your income, goals, and life circumstances.

Helen's total first-year tax savings: $127K. Her annual maintenance time commitment: about 15 hours per month.

That's an effective hourly rate of over $700 for tax planning activities.

More importantly, she now has a scalable system that grows with her income and provides increasing value over time.

Welcome to proactive tax planning. Welcome to taking control of your financial future.`,
        strategies: [
          "Implementation timeline and milestones",
          "Ongoing maintenance systems",
          "Record-keeping and compliance",
          "Annual strategy review process"
        ],
        ircRefs: [],
        caseStudy: "Helen achieves $127K first-year tax savings with 15 hours monthly maintenance commitment"
      }
    ]
  },
  "business-owner-escape-plan": {
    id: "business-owner-escape-plan",
    title: "Business Owner Escape Plan",
    subtitle: "Advanced Tax Strategies for $1M+ Profit Businesses",
    price: "$1,997",
    description: "Transform your business into a tax-optimized wealth engine with elite strategies used by the most successful entrepreneurs.",
    caseStudyClient: "Anonymized 7-Figure Business Owner",
    locked: true,
    vsl: {
      title: "Stop Being Taxed Like You're the Villain",
      script: "You built the business. You took the risk. And now you're being taxed like you're the villain. But what if the problem isn't your CPA — it's the system they're stuck inside? The Business Owner Escape Plan is built for founders making $1M+ in profit — and bleeding hundreds of thousands in avoidable tax. We'll show you how to move income off your personal return, restructure your entity stack, and capture 6 to 7 figures in deductions. This isn't theory. It's what we used to transform the tax footprint of the nation's most profitable entrepreneurs. Don't settle for reactive bookkeeping. Step into proactive wealth engineering. Click below to unlock the course and stop overpaying the IRS."
    },
    modules: [
      {
        id: 0,
        title: "Who This Is For & What You're About to Learn",
        theme: "Qualify viewer, show transformation arc",
        duration: "28 min",
        preview: true,
        script: `This course is for business owners generating $1M+ in annual profit who are tired of bleeding hundreds of thousands in avoidable taxes.

If you're making seven figures and still paying six figures to the IRS, this course will change everything.

We're going to show you how one client went from a $500K tax bill to $183K — a $317K reduction — without changing their business model, revenue, or operations.

Just structure. Just strategy. Just moving from reactive bookkeeping to proactive wealth engineering.

Over the next 9 modules, you'll learn:

How to restructure your entity stack to minimize personal income
The MSO strategy that shifts profits from 1040 to corporate returns
Advanced depreciation techniques that generate massive year-one deductions
International structures for maximum legal tax efficiency

But first, let's make sure you're in the right place.

This isn't for side hustlers making $50K. This isn't for consultants with $200K practices. This is for legitimate businesses generating serious profit — and serious tax problems.

If that's you, keep watching. If not, this will be the most expensive education you never use.`,
        strategies: [
          "Qualification criteria for $1M+ businesses",
          "Introduction to entity restructuring",
          "Overview of advanced tax strategies",
          "Setting expectations for implementation"
        ],
        ircRefs: [],
        caseStudy: "Composite overview of anonymized 7-figure business owners and their transformation potential"
      },
      {
        id: 1,
        title: "Why You're Still Bleeding Cash",
        theme: "Filing ≠ planning, problem with reactive CPAs",
        duration: "35 min",
        preview: false,
        script: `Let's start with why you're still bleeding cash to the IRS despite having "good" accounting.

Your CPA isn't the problem. The system they're working within is the problem.

Most business accounting is reactive. They track what happened, categorize expenses, file returns. They're historians, not strategists.

Here's a real example: Client with $1.4M in profit, paying $500K+ in combined federal and state taxes. Their CPA filed a perfect return. Clean, compliant, defensible.

And completely reactive.

The business was structured as a single LLC, taxed as an S-Corp. All profit flowed through to the owner's personal return. Standard depreciation on equipment. Minimal entity structuring.

Result: $1.4M in personal income, 37% federal rate, 13.3% California rate. Over $700K in tax on $1.4M profit.

Here's what we did:

Restructured the entity stack to separate operating income from investment income
Implemented an MSO to shift service income to a C-Corp
Added cost segregation and bonus depreciation for massive year-one deductions
Integrated oil & gas partnerships for additional ordinary income offsets

New result: $183K total tax bill. Same business, same revenue, same profit.

The difference? Moving from filing to planning. From reactive to proactive. From compliance to strategy.`,
        strategies: [
          "Entity mismatch diagnosis",
          "Single vs. multiple entity structures",
          "Reactive vs. proactive planning mindset",
          "Introduction to entity stack restructuring"
        ],
        ircRefs: ["§162", "§199A"],
        caseStudy: "Client with $1.4M profit reduces tax bill from $500K+ to $183K through strategic restructuring"
      },
      {
        id: 2,
        title: "Reengineering the Entity Stack",
        theme: "Structure = strategy",
        duration: "48 min",
        preview: false,
        script: `Entity structure isn't about paperwork. It's about tax strategy delivery.

Single-entity businesses are tax-inefficient by design. All income flows to one place, taxed at one rate, with limited deduction opportunities.

Multi-entity structures create optionality:

Different entities for different income types
Flexibility in tax elections and planning
Asset protection through separation
Advanced strategies like self-rental and profit shifting

Here's the framework we used for our $1.4M client:

Operating LLC: Core business operations, S-Corp election
Management C-Corp: Administrative and strategic services
Real Estate LLC: Property holding and leasing
Investment LLC: Alternative investments and passive income

The Operating LLC pays the Management C-Corp $600K annually for legitimate management services. That income stays at the corporate level, taxed at 21% instead of 37%+.

The Real Estate LLC owns the business property and leases it back to the Operating LLC. Self-rental rule converts passive income to active, creating deduction opportunities.

The Investment LLC holds oil & gas partnerships, Opportunity Zone investments, and other tax-advantaged vehicles.

Total result: $1.4M in business profit, but only $400K flowing to personal return.

This is entity engineering. This is how seven-figure businesses optimize taxes.`,
        strategies: [
          "Multi-entity structure design",
          "MSO (Management Services Organization) implementation",
          "Self-rental rule application",
          "Profit shifting between entities"
        ],
        ircRefs: ["§469(c)(2)", "§162", "§199A"],
        caseStudy: "Business restructured to shift $600K from personal return to corporate entity, reducing effective tax rate"
      },
      {
        id: 3,
        title: "The MSO Strategy Deep Dive",
        theme: "Management companies that transform tax bills",
        duration: "42 min",
        preview: false,
        script: `The Management Services Organization is the backbone of advanced business tax strategy.

Here's how it works:

Your operating business pays your management company for legitimate services:
- Strategic planning and consulting
- Administrative and back-office support
- Marketing and business development
- Financial planning and analysis

The payments are deductible to the operating business and income to the management company.

But here's the key: the management company is structured as a C-Corp.

C-Corp advantages:
- 21% federal tax rate vs. 37% personal rate
- Retained earnings stay at corporate level
- Access to corporate-only deductions and benefits
- Split-dollar life insurance opportunities

Our client's MSO structure:

Operating business profit: $1.4M
Management fees paid: $600K
Operating business net: $800K (flows to personal return)
MSO income: $600K (taxed at corporate rates)

MSO tax on $600K: $126K (21% rate)
Personal tax on $800K: Significantly reduced through other strategies

The MSO also funds a split-dollar life insurance policy, creating future tax-free income and wealth transfer opportunities.

This is how sophisticated business owners move income off their personal returns and into tax-advantaged structures.`,
        strategies: [
          "Management Services Organization setup",
          "Legitimate service fee arrangements",
          "C-Corp election and retained earnings",
          "Split-dollar life insurance integration"
        ],
        ircRefs: ["§162", "§11"],
        caseStudy: "Client shifts $600K to MSO C-Corp, reducing effective tax rate and enabling advanced strategies"
      },
      {
        id: 4,
        title: "Depreciation & Cost Segregation Mastery",
        theme: "Turning assets into massive deductions",
        duration: "44 min",
        preview: false,
        script: `Depreciation is the most underutilized wealth-building tool for business owners.

Standard depreciation spreads the cost of business assets over many years. A $1M building depreciates over 39 years — about $25K per year.

But with cost segregation and bonus depreciation, you can accelerate those deductions dramatically.

Cost segregation breaks down property into components:
- Structural elements (39-year depreciation)
- Non-structural elements (5, 7, 15-year depreciation)
- Personal property (immediate bonus depreciation)

Our client owned a $2M commercial building. Standard depreciation: $51K per year.

After cost segregation:
- $400K in personal property (100% bonus depreciation)
- $300K in 5-year property
- $200K in 7-year property
- $1.1M in structural (39-year)

First-year depreciation: $580K vs. $51K standard.

We also implemented equipment purchases with Section 179 expensing:
- $500K in machinery and equipment
- 100% first-year deduction under Section 179

Total first-year depreciation and expensing: $1.08M.

This single strategy generated over $1M in deductions, saving approximately $400K in taxes.

This is how sophisticated business owners turn required capital investments into massive tax benefits.`,
        strategies: [
          "Cost segregation study implementation",
          "Bonus depreciation maximization",
          "Section 179 expensing strategies",
          "Strategic asset acquisition timing"
        ],
        ircRefs: ["§168", "§179", "§1245"],
        caseStudy: "Client generates $1.08M in first-year deductions through strategic depreciation planning"
      },
      {
        id: 5,
        title: "Alternative Investment Integration",
        theme: "Portfolio strategies for business owners",
        duration: "39 min",
        preview: false,
        script: `Business owners have access to investment opportunities that W-2 employees can't touch.

The key is integrating these investments with your business tax strategy for maximum benefit.

Oil & Gas Partnerships:
- Immediate deduction of Intangible Drilling Costs (IDCs)
- Ongoing depletion allowances
- Passive income that can offset active business income

Our client invested $300K in oil & gas partnerships:
- $255K immediate deduction (85% IDC allocation)
- Ongoing monthly distributions
- 15% depletion allowance on future income

Real Estate Syndications:
- Accelerated depreciation through cost segregation
- K-1 losses that offset business income
- Potential for significant appreciation

Opportunity Zone Investments:
- Deferral of existing capital gains
- Step-up in basis after 5 and 7 years
- Complete elimination of gains after 10 years

Private Placement Life Insurance (PPLI):
- Tax-deferred growth on alternative investments
- Tax-free access through policy loans
- Estate planning benefits

The key insight: these aren't just investments. They're tax strategy delivery vehicles that happen to generate returns.

Our client's alternative investment portfolio generates $400K+ in annual deductions while building long-term wealth.`,
        strategies: [
          "Oil & Gas IDC strategies",
          "Real estate syndication benefits",
          "Opportunity Zone investment planning",
          "Private Placement Life Insurance"
        ],
        ircRefs: ["§263(c)", "§1400Z-2", "§613A"],
        caseStudy: "Client integrates $300K in alternative investments, generating $400K+ in annual deductions"
      },
      {
        id: 6,
        title: "International Tax Planning",
        theme: "Global structures for maximum efficiency",
        duration: "46 min",
        preview: false,
        script: `International tax planning isn't about hiding money offshore. It's about legitimate structures that optimize global tax efficiency.

For business owners with international operations or customers, proper structuring can create significant tax benefits.

Key strategies:

Foreign LLC structures:
- Income earned outside the US may qualify for foreign tax credits
- Proper structuring can defer or reduce US tax on foreign income

International holding companies:
- Intellectual property licensing arrangements
- Transfer pricing optimization
- Global tax rate arbitrage

Foreign retirement planning:
- International pension structures
- Cross-border retirement planning
- Currency diversification benefits

Our client had international customers and intellectual property licensing opportunities:

US Operating Company: Core business operations
Foreign LLC: International sales and licensing
IP Holding Entity: Intellectual property ownership and licensing

Structure benefits:
- Foreign income potentially taxed at lower rates
- Transfer pricing opportunities for IP licensing
- Asset protection through international structures

Important note: International tax planning requires strict compliance with US reporting requirements:
- FBAR (Foreign Bank Account Report)
- Form 8938 (FATCA reporting)
- Form 5471 (Foreign corporation reporting)

This is advanced strategy that requires sophisticated compliance. But for the right business owner, the benefits can be transformational.`,
        strategies: [
          "Foreign LLC structures",
          "International IP licensing",
          "Transfer pricing optimization",
          "Cross-border tax planning"
        ],
        ircRefs: ["§911", "§951A", "§482"],
        caseStudy: "Client implements international structure for IP licensing, reducing effective tax rate on foreign income"
      },
      {
        id: 7,
        title: "Estate & Succession Planning",
        theme: "Building generational wealth systems",
        duration: "40 min",
        preview: false,
        script: `Estate planning for business owners isn't about death. It's about building systems that create generational wealth while optimizing lifetime taxes.

Business owners have unique opportunities:

Valuation discounts:
- Minority interest discounts for gifted business interests
- Marketability discounts for private company shares
- Combined discounts of 30-40% are common

Grantor trusts:
- Intentionally Defective Grantor Trusts (IDGTs)
- Grantor pays income taxes, effectively making additional gifts
- Assets grow outside the estate

Family limited partnerships:
- Consolidate family assets
- Gift limited partnership interests at discounted values
- Maintain control through general partnership interest

Our client's succession strategy:

Business value: $10M
Family Limited Partnership: Transfers 60% ownership to children
Valuation discount: 35% (lack of control and marketability)
Effective gift: $6M business interest for $3.9M gift value

Annual gifting program:
- Uses annual exclusion amounts ($17K per recipient in 2023)
- Additional gifts within lifetime exemption
- Grantor trust structure for additional leverage

The business continues to grow, but future appreciation occurs outside the estate.

Split-dollar life insurance provides liquidity for estate taxes while creating additional wealth transfer opportunities.

This is how business owners build generational wealth while minimizing transfer taxes.`,
        strategies: [
          "Business valuation discount strategies",
          "Family Limited Partnership structures",
          "Grantor trust implementation",
          "Split-dollar life insurance integration"
        ],
        ircRefs: ["§2031", "§2501", "§2702"],
        caseStudy: "Client transfers $6M business value for $3.9M gift through strategic valuation discounts"
      },
      {
        id: 8,
        title: "Exit Planning & Wealth Preservation",
        theme: "Maximizing after-tax proceeds from business sale",
        duration: "43 min",
        preview: false,
        script: `Exit planning isn't about when you sell. It's about maximizing after-tax proceeds and preserving wealth for the next generation.

Business owners spend decades building value, then lose 40-50% to taxes at exit. But with proper planning, you can preserve significantly more.

QSBS (Qualified Small Business Stock):
- Up to $10M or 10x basis exclusion from federal taxes
- Must be C-Corp stock held for 5+ years
- Can be combined with other strategies

Installment sales:
- Spread gain recognition over multiple years
- Stay in lower tax brackets
- Generate ongoing income stream

Charitable strategies:
- Charitable Remainder Trusts for large gains
- Charitable Lead Trusts for family transfers
- Private foundation establishment

Our client's exit strategy for a $20M business sale:

QSBS election: $10M gain exclusion (50% of sale price)
Installment sale: 5-year payout structure
Remaining $10M gain spread over 5 years

Without planning: $8M in taxes (40% rate)
With planning: $3.2M in taxes (16% effective rate)
Tax savings: $4.8M

Additional strategies:
- Geographic arbitrage (temporary residency planning)
- Asset protection structures
- International diversification

The key insight: exit planning starts years before exit. The strategies must be in place and tested before you need them.

Our client preserved an additional $4.8M through strategic exit planning. That's generational wealth preservation.`,
        strategies: [
          "QSBS election and optimization",
          "Installment sale structures",
          "Charitable exit strategies",
          "Geographic arbitrage for exits"
        ],
        ircRefs: ["§1202", "§453", "§664"],
        caseStudy: "Client reduces exit taxes from $8M to $3.2M through strategic planning, preserving $4.8M"
      },
      {
        id: 9,
        title: "Implementation Roadmap & Ongoing Optimization",
        theme: "Building systems that scale with your business",
        duration: "38 min",
        preview: false,
        script: `Implementation is where strategy becomes reality. The final module is about building systems that scale with your business and maintain optimization over time.

Year 1 Implementation Roadmap:

Q1: Entity restructuring and formation
- MSO C-Corp formation
- Real estate LLC setup
- Investment LLC establishment
- Banking and record-keeping systems

Q2: Operational implementation
- Management service agreements
- Self-rental lease agreements
- Transfer pricing documentation
- Compliance system setup

Q3: Investment strategy execution
- Oil & gas partnership participation
- Cost segregation studies
- Equipment purchases and Section 179 elections
- Alternative investment due diligence

Q4: Planning and optimization
- Year-end tax planning
- Strategy review and adjustments
- Next year contribution limits and elections
- Annual compliance requirements

Ongoing maintenance systems:

Monthly: Financial reporting, entity compliance, investment monitoring
Quarterly: Estimated tax payments, strategy adjustments, performance review
Annually: Entity elections, contribution limits, strategy evolution

Our client's first-year results:
- Tax reduction: $317K
- Implementation time: ~40 hours over 12 months
- Effective hourly rate: $7,925 per hour of tax planning

But more importantly, they now have a scalable system that grows with their business:
- Entity structures that handle increasing profit
- Investment strategies that compound over time
- Estate planning that builds generational wealth

This is proactive wealth engineering. This is how seven-figure business owners think about taxes.

Welcome to the Business Owner Escape Plan. Welcome to taking control of your financial future.`,
        strategies: [
          "Quarterly implementation milestones",
          "Ongoing compliance and maintenance",
          "Scalable system development",
          "Annual strategy review process"
        ],
        ircRefs: [],
        caseStudy: "Client achieves $317K first-year tax savings with systematic implementation and ongoing optimization"
      }
    ]
  }
};

export default courseContent;