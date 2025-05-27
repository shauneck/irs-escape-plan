import { useState, useEffect } from "react";

const Explore = () => {
  const [activeSection, setActiveSection] = useState("glossary");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [currentQuizTerm, setCurrentQuizTerm] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizMode, setQuizMode] = useState("practice"); // practice, persona, category
  const [selectedPersona, setSelectedPersona] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quizProgress, setQuizProgress] = useState({ current: 0, total: 0, questions: [] });
  const [quizSession, setQuizSession] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [userStats, setUserStats] = useState({
    xp: 0,
    correct: 0,
    incorrect: 0,
    masteredTerms: [],
    badges: [],
    quizHistory: [],
    personaStats: {
      "W2": { correct: 0, incorrect: 0, xp: 0 },
      "business owner": { correct: 0, incorrect: 0, xp: 0 },
      "real estate": { correct: 0, incorrect: 0, xp: 0 },
      "investment": { correct: 0, incorrect: 0, xp: 0 }
    },
    categoryStats: {}
  });

  const sections = [
    { id: "glossary", name: "Glossary", icon: "📚" },
    { id: "quiz-mode", name: "Quiz Mode", icon: "🧠" },
    { id: "quiz-dashboard", name: "Quiz Dashboard", icon: "📊" },
    { id: "document-reader", name: "Document Reader", icon: "📄" },
    { id: "community", name: "Community", icon: "👥" },
    { id: "leaderboard", name: "Leaderboard", icon: "🏆" },
    { id: "office-hours", name: "Office Hours", icon: "🕐" },
  ];

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
      term: "F-Reorg",
      definition: "A tax-free corporate restructuring under IRC §368(a)(1)(F) used to preserve QSBS eligibility during ownership transitions or reorganizations.",
      tags: ["corporate", "QSBS", "business owner", "exit planning"],
      plain_english: "You can restructure your company without resetting the QSBS holding period.",
      case_study: {
        client_profile: "Sophie owned 90% of a startup C-Corp that was planning a Series A financing round.",
        structure: "She executed an F-Reorg to preserve QSBS treatment while converting the entity to a holding company.",
        implementation: "Filed required IRS forms and corporate documents to complete the reorganization without changing ownership.",
        results: "Maintained QSBS status, enabling a future $7M tax-free exit."
      },
      key_benefit: "Preserve QSBS tax treatment while restructuring for future growth or sale."
    },
    {
      term: "Oil & Gas IDCs",
      definition: "Intangible Drilling Costs that are 100% deductible in year one and can offset active income under IRC §263(c).",
      tags: ["deductions", "alternative investment", "business owner"],
      plain_english: "You can deduct the cost of drilling an oil well—even if it hasn't produced yet—to reduce your tax bill.",
      case_study: {
        client_profile: "Miles J., a business owner with $400K in income, needed deductions to lower taxable income.",
        structure: "He invested $250K in a direct oil & gas drilling program with 85% IDC allocation.",
        implementation: "The sponsor filed K-1s showing $212K in year-one deductions.",
        results: "Reduced his federal tax bill by over $70K and began earning monthly distributions."
      },
      key_benefit: "Front-load massive deductions while generating cash flow from alternative assets."
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
    },
    {
      term: "Material Participation",
      definition: "A set of IRS tests under IRC §469 that determine if a taxpayer is actively involved in a business or rental activity, affecting how losses are treated.",
      tags: ["real estate", "active income", "IRS rules", "deductions"],
      plain_english: "If you're active enough in a business or rental, the IRS lets you use losses to reduce your other income.",
      case_study: {
        client_profile: "Rachel owns three rental properties and wants to offset income from her consulting business.",
        structure: "She manages the properties herself, tracks hours, and handles tenant screening and repairs.",
        implementation: "She passed the 500-hour test to qualify as materially participating.",
        results: "Wrote off $45K in passive losses against active consulting income."
      },
      key_benefit: "Convert passive losses into active deductions by demonstrating real involvement."
    },
    {
      term: "MSO (Management Services Organization)",
      definition: "A business structure—often a C-Corp—that provides services to a primary operating business, allowing income separation and advanced tax planning.",
      tags: ["business owner", "entity structure", "C-Corp", "advanced planning"],
      plain_english: "Create a second company to manage your business and open up new tax-saving strategies.",
      case_study: {
        client_profile: "Jordan runs a medical clinic and earns $1.4M in annual revenue.",
        structure: "He forms an MSO to handle management and admin services.",
        implementation: "The MSO receives $600K in service fees, shifting profit to a C-Corp.",
        results: "Reduced pass-through income and used retained earnings for split-dollar insurance."
      },
      key_benefit: "Unlock corporate tax strategies and income control with compliant multi-entity planning."
    },
    {
      term: "Split-Dollar Life Insurance",
      definition: "A strategy where an employer or entity funds a permanent life insurance policy, creating future tax-free income or wealth transfer advantages.",
      tags: ["insurance", "business owner", "wealth transfer", "retirement"],
      plain_english: "A business can help fund a life insurance policy that you later borrow from tax-free.",
      case_study: {
        client_profile: "Melissa owns a C-Corp MSO generating $400K in retained earnings.",
        structure: "The company funds a loan-based split-dollar life insurance policy on her life.",
        implementation: "Policy grows in value tax-deferred; Melissa can borrow against it in retirement.",
        results: "Extracted $2.5M from her company over 12 years without dividend tax."
      },
      key_benefit: "Exit retained earnings tax-efficiently while building future tax-free income."
    },
    {
      term: "Installment Sale",
      definition: "A method under IRC §453 that allows sellers to defer capital gains by spreading the sale proceeds and tax liability over multiple years.",
      tags: ["exit planning", "capital gains", "timing", "business owner"],
      plain_english: "Sell something and get paid over time so you don't owe all the tax up front.",
      case_study: {
        client_profile: "An ecommerce founder sells their brand for $2M, half up front and half over 3 years.",
        structure: "Uses an installment agreement to spread out tax liability.",
        implementation: "Capital gains are only taxed as payments are received.",
        results: "Reduced year-one tax exposure and stayed in a lower tax bracket."
      },
      key_benefit: "Control the timing of your tax bill by structuring multi-year exits."
    },
    {
      term: "Irrevocable Trust",
      definition: "A legal structure that, once established, cannot be changed and removes assets from your estate for tax and protection purposes.",
      tags: ["estate planning", "asset protection", "wealth transfer"],
      plain_english: "You lock assets into a trust that can't be touched—by you or creditors—so they pass tax-efficiently.",
      case_study: {
        client_profile: "Anthony had $12M in net worth and wanted to shield future investment gains from estate tax.",
        structure: "He funded an irrevocable trust with a private stock portfolio.",
        implementation: "His estate attorney drafted the trust and assigned independent trustees.",
        results: "Removed $5M from his taxable estate and avoided future capital gains on growth."
      },
      key_benefit: "Protect assets from estate taxes and creditors while preserving legacy control."
    },
    {
      term: "Cost Segregation",
      definition: "An IRS-approved method of breaking down a property into depreciable parts to accelerate deductions.",
      tags: ["real estate", "depreciation", "deductions", "tax timing"],
      plain_english: "Split a building into components so you can write off more value faster.",
      case_study: {
        client_profile: "Jackson owns a $1.2M short-term rental portfolio across five properties.",
        structure: "Hired a firm to do a cost segregation study.",
        implementation: "Accelerated depreciation on non-structural components (roof, carpet, appliances).",
        results: "Deducted $230K in year one, sheltering STR income and offsetting W-2 wages."
      },
      key_benefit: "Unlock massive up-front write-offs from real estate that would normally take decades to depreciate."
    },
    {
      term: "Charitable Remainder Trust (CRT)",
      definition: "A split-interest trust that pays income to the donor during life, then gifts the remainder to charity—often reducing capital gains and estate taxes.",
      tags: ["charitable", "estate planning", "capital gains", "wealth transfer"],
      plain_english: "You donate an asset to a trust, get income from it for life, and send what's left to charity—while cutting taxes.",
      case_study: {
        client_profile: "A business owner sold a $3M real estate portfolio and wanted to avoid full capital gains exposure.",
        structure: "He contributed $1.5M of the asset value to a CRT before the sale.",
        implementation: "Received a partial deduction and income payments for 20 years.",
        results: "Avoided ~$300K in immediate capital gains and removed value from estate."
      },
      key_benefit: "Generate income and lower taxes while funding a cause you care about."
    },
    {
      term: "AMT (Alternative Minimum Tax)",
      definition: "A parallel tax system that limits certain deductions and ensures high-income earners pay a baseline tax, regardless of how many write-offs they have.",
      tags: ["W2", "deductions", "IRS rules", "tax limits"],
      plain_english: "Even if you have a ton of deductions, the IRS might still tax you under AMT rules to make sure you pay something.",
      case_study: {
        client_profile: "Helen Park earned $950K and used oil & gas and STR deductions to offset her W-2 income.",
        structure: "She claimed over $350K in deductions between depreciation and IDCs.",
        implementation: "Her CPA ran both regular and AMT calculations to optimize outcome.",
        results: "AMT eliminated a portion of her deductions, increasing her tax liability by $14K compared to the standard calculation."
      },
      key_benefit: "Plan ahead to avoid surprise taxes when stacking large deductions."
    },
    {
      term: "Tax-Free Step-Up in Basis",
      definition: "A rule that resets the cost basis of an asset to its fair market value at death, eliminating capital gains for heirs.",
      tags: ["estate planning", "capital gains", "inheritance", "investment"],
      plain_english: "When someone dies, their heirs get the asset at today's value—so they don't owe capital gains on past appreciation.",
      case_study: {
        client_profile: "A client inherited a rental property that had appreciated from $400K to $1.3M.",
        structure: "The property received a full step-up in basis upon the parent's death.",
        implementation: "The heir re-listed the property and sold it for $1.35M shortly after.",
        results: "Owed virtually no capital gains tax due to the reset basis."
      },
      key_benefit: "Eliminate decades of built-up capital gains tax with smart estate timing."
    },
    {
      term: "Self-Rental Rule",
      definition: "An IRS rule that converts passive rental income into non-passive income when a property is rented to a related active business.",
      tags: ["real estate", "business owner", "deductions", "passive income"],
      plain_english: "If your business rents property from you, the income can offset your other business income instead of being stuck as passive.",
      case_study: {
        client_profile: "Dr. Patel owns both her dental practice and the building it's in.",
        structure: "The building is held in an LLC and leased to the operating S-Corp.",
        implementation: "Qualified for self-rental reclassification under §469.",
        results: "Recharacterized $85K in rental income as non-passive, offsetting other active losses."
      },
      key_benefit: "Match rental income with your business losses for better tax alignment."
    },
    {
      term: "State Residency Planning",
      definition: "A tax strategy focused on establishing legal residency in a low- or no-income tax state to reduce future tax burdens.",
      tags: ["W2", "exit planning", "state tax", "income"],
      plain_english: "Move to a tax-friendly state—legally and intentionally—to stop bleeding income to high state taxes.",
      case_study: {
        client_profile: "A tech executive in California planned to sell RSUs worth $3M.",
        structure: "Moved to Texas six months before the vesting event.",
        implementation: "Changed domicile, updated voter registration, and documented intent to remain.",
        results: "Avoided ~13.3% California state tax on the gain—saving nearly $400K."
      },
      key_benefit: "Escape high-tax states and keep more of your exit money legally."
    },
    {
      term: "Family Limited Partnership (FLP)",
      definition: "An entity structure that allows families to consolidate assets, shift ownership to heirs at discounted values, and protect wealth from creditors.",
      tags: ["entity structure", "estate planning", "wealth transfer", "valuation"],
      plain_english: "Put family assets into a shared partnership so you can gift control to your kids at a discount.",
      case_study: {
        client_profile: "The Tran family held $7M in real estate across multiple LLCs.",
        structure: "They formed an FLP with parents as general partners and gifted limited interests to kids.",
        implementation: "Applied valuation discounts of 25–35% due to lack of control/liquidity.",
        results: "Reduced estate value for tax purposes and protected assets from liability."
      },
      key_benefit: "Transfer wealth at discounted values while retaining control."
    },
    {
      term: "Backdoor Roth IRA",
      definition: "A strategy that allows high-income earners to contribute to a Roth IRA by first contributing to a nondeductible traditional IRA and converting it.",
      tags: ["retirement", "W2", "tax-free growth", "income limits"],
      plain_english: "Too rich for a Roth IRA? There's a legal workaround using a traditional IRA that converts right in.",
      case_study: {
        client_profile: "Rachel earns $300K in W-2 income and doesn't qualify for direct Roth contributions.",
        structure: "She contributes $6,500 to a nondeductible IRA.",
        implementation: "Converts it to a Roth IRA the next day, paying minimal tax.",
        results: "Grows tax-free over time and keeps the Roth open for future rollovers."
      },
      key_benefit: "Build tax-free retirement wealth even if you're over the income limit."
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

  // Enhanced quiz question generator with multiple question types
  const generateQuizQuestions = (term) => {
    const questions = [];
    
    // Question 1: Multiple choice definition
    const wrongDefinitions = glossaryTerms
      .filter(t => t.term !== term.term)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(t => t.definition);
    
    questions.push({
      id: `${term.term}-definition`,
      type: "multiple_choice",
      question: `What is the definition of "${term.term}"?`,
      options: [...wrongDefinitions, term.definition].sort(() => Math.random() - 0.5),
      correct: term.definition,
      term: term.term,
      category: "definition",
      xpValue: 10
    });

    // Question 2: True/False based on key benefit
    const isTrue = Math.random() > 0.5;
    const trueFalseStatement = isTrue 
      ? term.key_benefit 
      : `${term.term} is primarily used for generating immediate tax credits.`;
    
    questions.push({
      id: `${term.term}-truefalse`,
      type: "true_false",
      question: `True or False: ${trueFalseStatement}`,
      correct: isTrue,
      term: term.term,
      category: "application",
      xpValue: 15
    });

    // Question 3: Case study matching
    const clientName = extractClientName(term.case_study.client_profile);
    const wrongClients = glossaryTerms
      .filter(t => t.term !== term.term)
      .map(t => extractClientName(t.case_study.client_profile))
      .filter(name => name && name !== clientName)
      .slice(0, 3);
    
    if (clientName && wrongClients.length >= 3) {
      questions.push({
        id: `${term.term}-casestudy`,
        type: "case_study_match",
        question: `Which client is featured in the ${term.term} case study?`,
        options: [...wrongClients, clientName].sort(() => Math.random() - 0.5),
        correct: clientName,
        term: term.term,
        category: "case_study",
        xpValue: 20
      });
    }

    // Question 4: Scenario application
    questions.push({
      id: `${term.term}-scenario`,
      type: "scenario",
      question: `Based on the case study, what was the primary result achieved using ${term.term}?`,
      options: [
        term.case_study.results,
        "Eliminated all tax liability permanently",
        "Reduced tax rates to zero percent", 
        "Generated unlimited deductions"
      ].sort(() => Math.random() - 0.5),
      correct: term.case_study.results,
      term: term.term,
      category: "results",
      xpValue: 25
    });

    return questions;
  };

  // Extract client name from case study profile
  const extractClientName = (profile) => {
    const names = ["Amanda", "Nina", "Ethan", "Sophie", "Miles", "Samir", "Liam", "Rachel", 
                   "Jordan", "Melissa", "Jackson", "Anthony", "Helen Park", "Dr. Patel"];
    return names.find(name => profile.includes(name)) || null;
  };

  // Filter terms by persona
  const getTermsByPersona = (persona) => {
    if (persona === "all") return glossaryTerms;
    
    const personaMap = {
      "w2": ["W2", "retirement", "tax timing"],
      "business": ["business owner", "entity structure", "C-Corp", "advanced planning"],
      "realestate": ["real estate", "depreciation", "passive income"],
      "investment": ["investment", "capital gains", "alternative investment"]
    };
    
    return glossaryTerms.filter(term => 
      term.tags.some(tag => 
        personaMap[persona]?.some(p => tag.toLowerCase().includes(p.toLowerCase()))
      )
    );
  };

  // Start comprehensive quiz
  const startComprehensiveQuiz = (mode = "practice", persona = "all", category = "all") => {
    const filteredTerms = getTermsByPersona(persona);
    const allQuestions = [];
    
    filteredTerms.forEach(term => {
      const termQuestions = generateQuizQuestions(term);
      allQuestions.push(...termQuestions);
    });
    
    // Shuffle questions
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    const sessionQuestions = mode === "practice" 
      ? shuffledQuestions.slice(0, 10) 
      : shuffledQuestions;
    
    setQuizProgress({
      current: 0,
      total: sessionQuestions.length,
      questions: sessionQuestions
    });
    
    setQuizSession({
      mode,
      persona,
      category,
      startTime: new Date(),
      answers: [],
      score: 0
    });
    
    setCurrentQuizQuestion(sessionQuestions[0]);
    setUserAnswer("");
    setShowAnswer(false);
    setIncorrectAnswers([]);
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
    const questions = generateQuizQuestions(randomTerm);
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuizTerm(randomQuestion);
    setUserAnswer("");
    setShowAnswer(false);
  };

  // Submit quiz answer
  const submitAnswer = () => {
    if (!currentQuizTerm) return;

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

      // Update persona stats
      const personaKey = getPersonaKey(currentQuizTerm.term);
      if (personaKey && newStats.personaStats[personaKey]) {
        newStats.personaStats[personaKey].correct += 1;
        newStats.personaStats[personaKey].xp += 10;
      }
      
      setUserProgress(prev => ({ ...prev, [currentQuizTerm.term]: termProgress }));
    } else {
      newStats.incorrect += 1;
      const termProgress = userProgress[currentQuizTerm.term] || { correct: 0, incorrect: 0 };
      termProgress.incorrect += 1;

      // Update persona stats for incorrect answers
      const personaKey = getPersonaKey(currentQuizTerm.term);
      if (personaKey && newStats.personaStats[personaKey]) {
        newStats.personaStats[personaKey].incorrect += 1;
      }

      setUserProgress(prev => ({ ...prev, [currentQuizTerm.term]: termProgress }));
    }
    
    setUserStats(newStats);
    setShowAnswer(true);
  };

  // Enhanced submit answer with comprehensive scoring
  const submitQuizAnswer = () => {
    if (!currentQuizQuestion || !quizSession) return;

    const question = currentQuizQuestion;
    let isCorrect = false;

    // Check answer based on question type
    switch (question.type) {
      case "multiple_choice":
      case "case_study_match":
      case "scenario":
        isCorrect = userAnswer === question.correct;
        break;
      case "true_false":
        isCorrect = userAnswer === question.correct.toString();
        break;
      default:
        isCorrect = userAnswer.toLowerCase().trim() === question.correct.toLowerCase();
    }

    // Update quiz session
    const answer = {
      questionId: question.id,
      question: question.question,
      userAnswer,
      correctAnswer: question.correct,
      isCorrect,
      term: question.term,
      category: question.category,
      xpEarned: isCorrect ? question.xpValue : 0
    };

    const updatedSession = {
      ...quizSession,
      answers: [...quizSession.answers, answer],
      score: quizSession.score + (isCorrect ? question.xpValue : 0)
    };

    setQuizSession(updatedSession);

    // Update user stats
    const newStats = { ...userStats };
    
    if (isCorrect) {
      newStats.correct += 1;
      newStats.xp += question.xpValue;
      
      // Update persona stats
      const personaKey = getPersonaKey(question.term);
      if (personaKey && newStats.personaStats[personaKey]) {
        newStats.personaStats[personaKey].correct += 1;
        newStats.personaStats[personaKey].xp += question.xpValue;
      }

      // Update category stats
      if (!newStats.categoryStats[question.category]) {
        newStats.categoryStats[question.category] = { correct: 0, incorrect: 0, xp: 0 };
      }
      newStats.categoryStats[question.category].correct += 1;
      newStats.categoryStats[question.category].xp += question.xpValue;

    } else {
      newStats.incorrect += 1;
      
      // Track incorrect answer for review
      setIncorrectAnswers(prev => [...prev, {
        term: question.term,
        question: question.question,
        userAnswer,
        correctAnswer: question.correct
      }]);

      // Update persona stats
      const personaKey = getPersonaKey(question.term);
      if (personaKey && newStats.personaStats[personaKey]) {
        newStats.personaStats[personaKey].incorrect += 1;
      }

      // Update category stats
      if (!newStats.categoryStats[question.category]) {
        newStats.categoryStats[question.category] = { correct: 0, incorrect: 0, xp: 0 };
      }
      newStats.categoryStats[question.category].incorrect += 1;
    }

    // Check for new badges
    checkAndAwardBadges(newStats);
    
    setUserStats(newStats);
    setShowAnswer(true);
  };

  // Get persona key for term
  const getPersonaKey = (termName) => {
    const term = glossaryTerms.find(t => t.term === termName);
    if (!term) return null;
    
    const tags = term.tags.map(t => t.toLowerCase());
    if (tags.some(tag => tag.includes("w2") || tag.includes("retirement"))) return "W2";
    if (tags.some(tag => tag.includes("business") || tag.includes("entity"))) return "business owner";
    if (tags.some(tag => tag.includes("real estate") || tag.includes("depreciation"))) return "real estate";
    if (tags.some(tag => tag.includes("investment") || tag.includes("capital gains"))) return "investment";
    return null;
  };

  // Enhanced badge system
  const checkAndAwardBadges = (stats) => {
    const badges = [...stats.badges];
    
    // XP-based badges
    if (stats.xp >= 500 && !badges.includes("tax-apprentice")) {
      badges.push("tax-apprentice");
    }
    if (stats.xp >= 1000 && !badges.includes("tax-strategist")) {
      badges.push("tax-strategist");
    }
    if (stats.xp >= 2500 && !badges.includes("tax-expert")) {
      badges.push("tax-expert");
    }
    if (stats.xp >= 5000 && !badges.includes("tax-master")) {
      badges.push("tax-master");
    }

    // Persona-based badges
    Object.entries(stats.personaStats).forEach(([persona, data]) => {
      if (data.xp >= 300 && !badges.includes(`${persona.replace(" ", "-")}-specialist`)) {
        badges.push(`${persona.replace(" ", "-")}-specialist`);
      }
    });

    // Category mastery badges
    Object.entries(stats.categoryStats).forEach(([category, data]) => {
      if (data.correct >= 10 && !badges.includes(`${category}-master`)) {
        badges.push(`${category}-master`);
      }
    });

    // Accuracy badges
    const totalAnswers = stats.correct + stats.incorrect;
    const accuracy = totalAnswers > 0 ? (stats.correct / totalAnswers) * 100 : 0;
    
    if (totalAnswers >= 50 && accuracy >= 90 && !badges.includes("precision-expert")) {
      badges.push("precision-expert");
    }
    if (totalAnswers >= 100 && accuracy >= 85 && !badges.includes("consistency-champion")) {
      badges.push("consistency-champion");
    }

    stats.badges = badges;
  };

  // Move to next question
  const nextQuizQuestion = () => {
    const nextIndex = quizProgress.current + 1;
    
    if (nextIndex < quizProgress.total) {
      setQuizProgress(prev => ({ ...prev, current: nextIndex }));
      setCurrentQuizQuestion(quizProgress.questions[nextIndex]);
      setUserAnswer("");
      setShowAnswer(false);
    } else {
      // Quiz completed
      completeQuiz();
    }
  };

  // Complete quiz and save to history
  const completeQuiz = () => {
    if (!quizSession) return;

    const completedSession = {
      ...quizSession,
      endTime: new Date(),
      completed: true,
      incorrectTerms: incorrectAnswers.map(a => a.term)
    };

    const newStats = { ...userStats };
    newStats.quizHistory.push(completedSession);
    setUserStats(newStats);

    // Reset quiz state
    setCurrentQuizQuestion(null);
    setQuizSession(null);
    setQuizProgress({ current: 0, total: 0, questions: [] });
    setShowAnswer(false);
    setUserAnswer("");
  };

  // Enhanced Badge component with categories
  const Badge = ({ badge, size = "normal" }) => {
    const badgeConfig = {
      // XP-based badges
      "tax-apprentice": { name: "Tax Apprentice", icon: "🌱", color: "bg-green-500", description: "Earned 500+ XP" },
      "tax-strategist": { name: "Tax Strategist", icon: "⚡", color: "bg-blue-500", description: "Earned 1,000+ XP" },
      "tax-expert": { name: "Tax Expert", icon: "🎯", color: "bg-purple-500", description: "Earned 2,500+ XP" },
      "tax-master": { name: "Tax Master", icon: "👑", color: "bg-yellow-500", description: "Earned 5,000+ XP" },
      
      // Persona-based badges
      "W2-specialist": { name: "W-2 Specialist", icon: "💼", color: "bg-indigo-500", description: "W-2 Expert" },
      "business-owner-specialist": { name: "Business Specialist", icon: "🏢", color: "bg-red-500", description: "Business Expert" },
      "real-estate-specialist": { name: "Real Estate Specialist", icon: "🏠", color: "bg-orange-500", description: "Real Estate Expert" },
      "investment-specialist": { name: "Investment Specialist", icon: "📈", color: "bg-teal-500", description: "Investment Expert" },
      
      // Category mastery badges
      "definition-master": { name: "Definition Master", icon: "📚", color: "bg-gray-600", description: "Definition Expert" },
      "application-master": { name: "Application Master", icon: "🔧", color: "bg-pink-500", description: "Application Expert" },
      "case_study-master": { name: "Case Study Master", icon: "📖", color: "bg-cyan-500", description: "Case Study Expert" },
      "results-master": { name: "Results Master", icon: "🎯", color: "bg-lime-500", description: "Results Expert" },
      
      // Accuracy badges
      "precision-expert": { name: "Precision Expert", icon: "🎯", color: "bg-yellow-600", description: "90%+ Accuracy" },
      "consistency-champion": { name: "Consistency Champion", icon: "🏆", color: "bg-amber-500", description: "85%+ Accuracy" },

      // Legacy badges
      "5-terms": { name: "Tax Rookie", icon: "🌱", color: "bg-green-500", description: "5 Terms Mastered" },
      "10-terms": { name: "Tax Strategist", icon: "⚡", color: "bg-blue-500", description: "10 Terms Mastered" },
      "25-terms": { name: "Tax Expert", icon: "🎯", color: "bg-purple-500", description: "25 Terms Mastered" },
      "50-terms": { name: "Tax Master", icon: "👑", color: "bg-yellow-500", description: "50 Terms Mastered" }
    };
    
    const badgeInfo = badgeConfig[badge] || { name: badge, icon: "🏅", color: "bg-gray-500", description: "Special Badge" };
    const sizeClasses = size === "small" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";
    
    return (
      <div 
        className={`${badgeInfo.color} text-white ${sizeClasses} rounded-full flex items-center space-x-1 group relative`}
        title={badgeInfo.description}
      >
        <span>{badgeInfo.icon}</span>
        <span className="font-medium">{badgeInfo.name}</span>
        {size === "normal" && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {badgeInfo.description}
          </div>
        )}
      </div>
    );
  };

  // Quiz Mode Selector Component
  const QuizModeSelector = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Quiz Mode</h3>
        
        {/* Quiz Mode Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => startComprehensiveQuiz("practice", "all", "all")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 transition-colors text-left"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">🎯</span>
              <h4 className="font-semibold">Practice Mode</h4>
            </div>
            <p className="text-sm text-gray-600">Quick 10-question practice session</p>
          </button>
          
          <button
            onClick={() => setActiveSection("persona-quiz")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">👤</span>
              <h4 className="font-semibold">Persona Quiz</h4>
            </div>
            <p className="text-sm text-gray-600">Focus on W-2, Business, or Real Estate</p>
          </button>
          
          <button
            onClick={() => setActiveSection("comprehensive-quiz")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-left"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">🏆</span>
              <h4 className="font-semibold">Full Assessment</h4>
            </div>
            <p className="text-sm text-gray-600">Complete knowledge assessment</p>
          </button>
        </div>

        {/* Persona Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Persona:</label>
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">All Personas</option>
            <option value="w2">W-2 Earners</option>
            <option value="business">Business Owners</option>
            <option value="realestate">Real Estate Investors</option>
            <option value="investment">Investment Focused</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{userStats.xp}</div>
            <div className="text-xs text-gray-600">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.correct}</div>
            <div className="text-xs text-gray-600">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{userStats.incorrect}</div>
            <div className="text-xs text-gray-600">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.badges.length}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
        </div>
      </div>
    );
  };

  // Quiz Dashboard Component
  const QuizDashboard = () => {
    const totalAnswers = userStats.correct + userStats.incorrect;
    const accuracy = totalAnswers > 0 ? Math.round((userStats.correct / totalAnswers) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow text-white p-6">
          <h3 className="text-lg font-medium mb-4">Quiz Performance Dashboard</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.xp}</div>
              <div className="text-sm opacity-90">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{accuracy}%</div>
              <div className="text-sm opacity-90">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.quizHistory.length}</div>
              <div className="text-sm opacity-90">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.badges.length}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Badge Collection */}
        {userStats.badges.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Badge Collection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {userStats.badges.map((badge, index) => (
                <Badge key={index} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {/* Persona Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Performance by Persona</h4>
          <div className="space-y-4">
            {Object.entries(userStats.personaStats).map(([persona, stats]) => {
              const personaTotal = stats.correct + stats.incorrect;
              const personaAccuracy = personaTotal > 0 ? Math.round((stats.correct / personaTotal) * 100) : 0;
              
              return (
                <div key={persona} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 capitalize">{persona.replace("-", " ")}</h5>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{stats.correct} correct</span>
                      <span>{stats.incorrect} incorrect</span>
                      <span>{stats.xp} XP</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{personaAccuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Quiz History */}
        {userStats.quizHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Quiz History</h4>
            <div className="space-y-3">
              {userStats.quizHistory.slice(-5).reverse().map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{quiz.mode} Quiz</p>
                    <p className="text-sm text-gray-600">
                      {new Date(quiz.startTime).toLocaleDateString()} • 
                      {quiz.answers.length} questions
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{quiz.score} XP</p>
                    <p className="text-sm text-gray-600">
                      {Math.round((quiz.answers.filter(a => a.isCorrect).length / quiz.answers.length) * 100)}% correct
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms to Review */}
        {incorrectAnswers.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Terms to Review</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...new Set(incorrectAnswers.map(a => a.term))].map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSection("glossary");
                    setSearchTerm(term);
                  }}
                  className="p-3 border border-red-200 rounded-lg text-left hover:bg-red-50 transition-colors"
                >
                  <p className="font-medium text-red-700">{term}</p>
                  <p className="text-sm text-red-600">Review in glossary</p>
                </button>
              ))}
            </div>
          </div>
        )}
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
          <div className="space-y-6">
            {/* Glossary Header with Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Advanced Tax Strategy Glossary</h3>
                  <p className="mt-1 text-sm text-gray-600">Master complex tax terms with interactive learning</p>
                </div>
                <div className="flex items-center space-x-6">
                  <ProgressRing />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{userStats.xp}</div>
                    <div className="text-sm text-gray-600">XP</div>
                  </div>
                </div>
              </div>

              {/* User Badges */}
              {userStats.badges.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Your Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} badge={badge} />
                    ))}
                  </div>
                </div>
              )}

              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search terms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <button
                    onClick={() => setActiveSection("quiz-mode")}
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>

                {/* Tag Filters */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Filter by Category:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Glossary Terms */}
            <div className="space-y-4">
              {filteredTerms.map((term, index) => {
                const termProgress = userProgress[term.term];
                const isMastered = userStats.masteredTerms.includes(term.term);
                const isFavorited = favorites.includes(term.term);

                return (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">{term.term}</h4>
                          {isMastered && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                              ✓ Mastered
                            </span>
                          )}
                          <button
                            onClick={() => toggleFavorite(term.term)}
                            className={`text-xl ${isFavorited ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                          >
                            {isFavorited ? '★' : '☆'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {term.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Definition:</h5>
                        <p className="text-gray-600">{term.definition}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Plain English:</h5>
                        <p className="text-blue-600 italic">{term.plain_english}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Real-World Case Study:</h5>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div>
                            <h6 className="font-medium text-gray-700 text-sm">Client Profile:</h6>
                            <p className="text-gray-600 text-sm">{term.case_study.client_profile}</p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700 text-sm">Structure:</h6>
                            <p className="text-gray-600 text-sm">{term.case_study.structure}</p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700 text-sm">Implementation:</h6>
                            <p className="text-gray-600 text-sm">{term.case_study.implementation}</p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700 text-sm">Results:</h6>
                            <p className="text-green-600 text-sm font-medium">{term.case_study.results}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h5 className="font-medium text-yellow-800 mb-1">Key Benefit:</h5>
                        <p className="text-yellow-700 text-sm">{term.key_benefit}</p>
                      </div>

                      {termProgress && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Quiz Progress:</span>
                            <span>{termProgress.correct} correct, {termProgress.incorrect} incorrect</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTerms.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No terms match your current filters.</p>
              </div>
            )}
          </div>
        )}

        {activeSection === "quiz-mode" && (
          <div className="space-y-6">
            {/* Quiz Mode Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Interactive Quiz Mode</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.correct}</div>
                    <div className="text-xs text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{userStats.incorrect}</div>
                    <div className="text-xs text-gray-600">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.xp}</div>
                    <div className="text-xs text-gray-600">XP</div>
                  </div>
                </div>
              </div>

              {/* Quiz Mode Selection */}
              {!currentQuizTerm && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => startQuiz()}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 transition-colors text-left"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🎯</span>
                        <h4 className="font-semibold">Practice Mode</h4>
                      </div>
                      <p className="text-sm text-gray-600">Random questions from all terms</p>
                    </button>
                    
                    <button
                      onClick={() => {
                        // Filter by W-2 terms and start quiz
                        const w2Terms = glossaryTerms.filter(term => 
                          term.tags.some(tag => tag.toLowerCase().includes("w2") || tag.toLowerCase().includes("retirement"))
                        );
                        if (w2Terms.length > 0) {
                          const randomTerm = w2Terms[Math.floor(Math.random() * w2Terms.length)];
                          const questions = generateQuizQuestions(randomTerm);
                          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                          setCurrentQuizTerm(randomQuestion);
                          setUserAnswer("");
                          setShowAnswer(false);
                        }
                      }}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">💼</span>
                        <h4 className="font-semibold">W-2 Earner Focus</h4>
                      </div>
                      <p className="text-sm text-gray-600">Questions for high-income employees</p>
                    </button>
                    
                    <button
                      onClick={() => {
                        // Filter by Business Owner terms and start quiz
                        const businessTerms = glossaryTerms.filter(term => 
                          term.tags.some(tag => tag.toLowerCase().includes("business") || tag.toLowerCase().includes("entity"))
                        );
                        if (businessTerms.length > 0) {
                          const randomTerm = businessTerms[Math.floor(Math.random() * businessTerms.length)];
                          const questions = generateQuizQuestions(randomTerm);
                          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                          setCurrentQuizTerm(randomQuestion);
                          setUserAnswer("");
                          setShowAnswer(false);
                        }
                      }}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-left"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🏢</span>
                        <h4 className="font-semibold">Business Owner Focus</h4>
                      </div>
                      <p className="text-sm text-gray-600">Advanced strategies for entrepreneurs</p>
                    </button>
                  </div>

                  {/* Progress Overview */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Your Progress</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <ProgressRing />
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-700">Badges Earned</h5>
                        <div className="flex flex-wrap gap-1">
                          {userStats.badges.length > 0 ? (
                            userStats.badges.slice(0, 3).map((badge, index) => (
                              <Badge key={index} badge={badge} />
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">No badges yet</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-700">Accuracy Rate</h5>
                        <div className="text-2xl font-bold text-blue-600">
                          {userStats.correct + userStats.incorrect > 0 
                            ? Math.round((userStats.correct / (userStats.correct + userStats.incorrect)) * 100)
                            : 0}%
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-700">Next Badge</h5>
                        <div className="text-sm text-gray-600">
                          {userStats.xp < 500 
                            ? `${500 - userStats.xp} XP to Tax Apprentice`
                            : userStats.xp < 1000
                            ? `${1000 - userStats.xp} XP to Tax Strategist`
                            : userStats.xp < 2500
                            ? `${2500 - userStats.xp} XP to Tax Expert`
                            : "All major badges earned!"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Active Quiz Interface */}
            {currentQuizTerm && !showAnswer && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Question Type: {currentQuizTerm.category || currentQuizTerm.type}</span>
                    <span className="text-sm font-medium text-yellow-600">+{currentQuizTerm.xpValue || 10} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">{currentQuizTerm.question}</h4>

                  {(currentQuizTerm.type === "multiple_choice" || currentQuizTerm.type === "case_study_match" || currentQuizTerm.type === "scenario") && (
                    <div className="space-y-3">
                      {currentQuizTerm.options.map((option, index) => (
                        <label key={index} className="flex items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer">
                          <input
                            type="radio"
                            name="quiz"
                            value={option}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="text-blue-600 mr-3"
                          />
                          <span className="text-blue-800">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQuizTerm.type === "true_false" && (
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer">
                        <input
                          type="radio"
                          name="quiz"
                          value="true"
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="text-blue-600 mr-3"
                        />
                        <span className="text-blue-800">True</span>
                      </label>
                      <label className="flex items-center p-3 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer">
                        <input
                          type="radio"
                          name="quiz"
                          value="false"
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="text-blue-600 mr-3"
                        />
                        <span className="text-blue-800">False</span>
                      </label>
                    </div>
                  )}

                  {currentQuizTerm.type === "fill_blank" && (
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={submitAnswer}
                    disabled={!userAnswer}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                  <button
                    onClick={() => setCurrentQuizTerm(null)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    End Quiz
                  </button>
                </div>
              </div>
            )}

            {/* Answer Feedback */}
            {currentQuizTerm && showAnswer && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className={`border rounded-lg p-6 ${
                  (currentQuizTerm.type === "true_false" 
                    ? userAnswer === currentQuizTerm.correct.toString()
                    : userAnswer === currentQuizTerm.correct)
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h4 className="font-semibold mb-3">
                    {(currentQuizTerm.type === "true_false" 
                      ? userAnswer === currentQuizTerm.correct.toString()
                      : userAnswer === currentQuizTerm.correct)
                      ? '✅ Correct!' 
                      : '❌ Incorrect'}
                  </h4>
                  <p className="mb-2">
                    <strong>Correct Answer:</strong> {currentQuizTerm.correct.toString()}
                  </p>
                  <p className="mb-4">
                    <strong>Your Answer:</strong> {userAnswer}
                  </p>
                  
                  {/* Term Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-2">About {currentQuizTerm.term}:</h5>
                    <button
                      onClick={() => {
                        setActiveSection("glossary");
                        setSearchTerm(currentQuizTerm.term);
                      }}
                      className="text-yellow-600 hover:text-yellow-700 text-sm underline"
                    >
                      Review in Glossary →
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setCurrentQuizTerm(null);
                      startQuiz();
                    }}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Next Question
                  </button>
                  <button
                    onClick={() => setCurrentQuizTerm(null)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    End Quiz
                  </button>
                </div>
              </div>
            )}
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
          <div className="space-y-6">
            {/* Course Leaderboard */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Course Progress Leaderboard</h3>
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

            {/* Glossary Leaderboard */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Glossary Mastery Leaderboard</h3>
                <p className="mt-1 text-sm text-gray-600">Top performers in tax term mastery</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Mock glossary leaderboard data */}
                  {[
                    { rank: 1, name: "Sarah Chen", masteredTerms: 18, xp: 2450, badges: 3 },
                    { rank: 2, name: "Michael Rodriguez", masteredTerms: 15, xp: 2100, badges: 3 },
                    { rank: 3, name: "Jennifer Kim", masteredTerms: 12, xp: 1850, badges: 2 },
                    { rank: 4, name: "David Thompson", masteredTerms: 8, xp: 1200, badges: 2 },
                    { rank: 5, name: "You", masteredTerms: userStats.masteredTerms.length, xp: userStats.xp, badges: userStats.badges.length }
                  ].map((user, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${
                      user.name === "You" ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${user.name === "You" ? 'text-yellow-800' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.masteredTerms} terms mastered • {user.badges} badges</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${user.name === "You" ? 'text-yellow-800' : 'text-gray-900'}`}>
                          {user.xp}
                        </p>
                        <p className="text-sm text-gray-600">XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current User Stats */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow text-white p-6">
              <h3 className="text-lg font-medium mb-4">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.masteredTerms.length}</div>
                  <div className="text-sm opacity-90">Terms Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.xp}</div>
                  <div className="text-sm opacity-90">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.badges.length}</div>
                  <div className="text-sm opacity-90">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {userStats.correct + userStats.incorrect > 0 
                      ? Math.round((userStats.correct / (userStats.correct + userStats.incorrect)) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm opacity-90">Accuracy</div>
                </div>
              </div>
              
              {userStats.badges.length > 0 && (
                <div className="mt-4 pt-4 border-t border-yellow-300">
                  <h4 className="text-sm font-medium mb-2 opacity-90">Your Badges:</h4>
                  <div className="flex flex-wrap gap-2">
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} badge={badge} />
                    ))}
                  </div>
                </div>
              )}
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