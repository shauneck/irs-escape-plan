import { useState, useEffect, useRef } from "react";

const AITaxAssistant = ({ isOpen, onClose, userStats, glossaryTerms, courseModules, userProgress }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState("qa"); // "qa" or "advisor"
  const messagesEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = generateWelcomeMessage();
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AI Knowledge Base and Context Engine
  const AIEngine = {
    // User context analysis
    getUserContext: function() {
      try {
        const completedModules = (courseModules || []).filter(m => m.status === "Completed");
        const inProgressModules = (courseModules || []).filter(m => m.status === "In Progress");
        const masteredTerms = (userStats && userStats.masteredTerms) || [];
        const recentQuizzes = (userStats && userStats.quizHistory) || [];
        const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers') || '[]');
        
        return {
          xp: (userStats && userStats.xp) || 0,
          level: this.getUserLevel((userStats && userStats.xp) || 0),
          completedModules,
          inProgressModules,
          masteredTerms,
          recentQuizzes,
          incorrectAnswers,
          strongAreas: this.getStrongAreas(),
          weakAreas: this.getWeakAreas(),
          recommendedPersona: this.getRecommendedPersona()
        };
      } catch (error) {
        console.error("Error getting user context:", error);
        return {
          xp: 0,
          level: "Tax Beginner",
          completedModules: [],
          inProgressModules: [],
          masteredTerms: [],
          recentQuizzes: [],
          incorrectAnswers: [],
          strongAreas: [],
          weakAreas: [],
          recommendedPersona: "W2"
        };
      }
    },

    getUserLevel: function(xp) {
      if (xp >= 5000) return "Tax Master";
      if (xp >= 2500) return "Tax Expert";
      if (xp >= 1000) return "Tax Strategist";
      if (xp >= 500) return "Tax Apprentice";
      return "Tax Beginner";
    },

    getStrongAreas: function() {
      try {
        const categoryStats = (userStats && userStats.categoryStats) || {};
        return Object.entries(categoryStats)
          .filter(([_, stats]) => stats.correct > stats.incorrect && stats.correct >= 3)
          .map(([category, _]) => category);
      } catch (error) {
        return [];
      }
    },

    getWeakAreas: function() {
      try {
        const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers') || '[]');
        const weakTerms = [...new Set(incorrectAnswers.map(a => a.term))];
        return weakTerms.slice(0, 5); // Top 5 weak areas
      } catch (error) {
        return [];
      }
    },

    getRecommendedPersona: function() {
      try {
        const personaStats = (userStats && userStats.personaStats) || {};
        const maxPersona = Object.entries(personaStats)
          .reduce((max, [persona, stats]) => 
            stats.xp > (max.stats?.xp || 0) ? { persona, stats } : max, {});
        return maxPersona.persona || "W2";
      } catch (error) {
        return "W2";
      }
    },

    // Query analysis and response generation
    analyzeQuery: function(query) {
      const lowerQuery = query.toLowerCase();
      
      // Intent detection
      const intents = {
        definition: /what is|define|meaning of|explain/i.test(query),
        strategy: /strategy|strategies|how to|best way|optimize/i.test(query),
        comparison: /vs|versus|compare|difference|better/i.test(query),
        implementation: /how do i|implement|set up|start/i.test(query),
        persona: /w-2|w2|business owner|real estate|investment/i.test(query),
        caseStudy: /example|case study|client|helen|amanda|nina|ethan|sophie|miles/i.test(query),
        nextSteps: /what next|recommend|should i|best action/i.test(query)
      };

      // Extract entities (glossary terms, personas, etc.)
      const entities = this.extractEntities(query);
      
      return { intents, entities, originalQuery: query };
    },

    extractEntities: function(query) {
      const entities = {
        glossaryTerms: [],
        personas: [],
        strategies: [],
        clients: []
      };

      // Extract glossary terms
      if (glossaryTerms && Array.isArray(glossaryTerms)) {
        glossaryTerms.forEach(term => {
          if (query.toLowerCase().includes(term.term.toLowerCase())) {
            entities.glossaryTerms.push(term);
          }
        });
      }

      // Extract personas
      const personaKeywords = {
        'w2': ['w-2', 'w2', 'employee', 'salary'],
        'business': ['business', 'entrepreneur', 'llc', 's-corp'],
        'realestate': ['real estate', 'rental', 'property', 'landlord'],
        'investment': ['investment', 'capital gains', 'portfolio']
      };

      Object.entries(personaKeywords).forEach(([persona, keywords]) => {
        if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
          entities.personas.push(persona);
        }
      });

      // Extract client names from case studies
      const clientNames = ["Helen Park", "Amanda", "Nina", "Ethan", "Sophie", "Miles", "Samir", "Liam", "Rachel", "Jordan", "Melissa"];
      entities.clients = clientNames.filter(name => 
        query.toLowerCase().includes(name.toLowerCase())
      );

      return entities;
    },

    // Response generation
    generateResponse: function(analysis) {
      try {
        const context = this.getUserContext();
        const { intents, entities } = analysis;

        // Handle specific intents
        if (intents.definition && entities.glossaryTerms.length > 0) {
          return this.generateDefinitionResponse(entities.glossaryTerms[0], context);
        }

        if (intents.caseStudy && entities.clients.length > 0) {
          return this.generateCaseStudyResponse(entities.clients[0], context);
        }

        if (intents.strategy) {
          return this.generateStrategyResponse(analysis, context);
        }

        if (intents.implementation) {
          return this.generateImplementationResponse(analysis, context);
        }

        if (intents.nextSteps) {
          return this.generateNextStepsResponse(context);
        }

        if (intents.comparison && entities.glossaryTerms.length >= 2) {
          return this.generateComparisonResponse(entities.glossaryTerms, context);
        }

        // Fallback to general response
        return this.generateGeneralResponse(analysis, context);
      } catch (error) {
        console.error("Error generating response:", error);
        return this.generateErrorResponse();
      }
    },

    generateErrorResponse: function() {
      return {
        text: "I apologize, but I encountered an issue processing your request. Please try rephrasing your question or ask about specific tax strategies.",
        suggestions: [
          "What is QSBS?",
          "How can I reduce my taxes?",
          "What should I learn next?"
        ],
        ctas: []
      };
    },

    generateDefinitionResponse: function(term, context) {
      try {
        const relatedTerms = this.findRelatedTerms(term);
        const userLevel = context.level;
        
        return {
          text: `## ${term.term}\n\n**Definition:** ${term.definition}\n\n**In Plain English:** ${term.plain_english}\n\n**Key Benefit:** ${term.key_benefit}\n\n${this.getPersonalizedInsight(term, context)}`,
          suggestions: [
            `Tell me about the ${term.term} case study`,
            `How do I implement ${term.term}?`,
            `What other strategies work with ${term.term}?`
          ],
          relatedTerms: relatedTerms.slice(0, 3),
          ctas: this.generateCTAs(term, context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateCaseStudyResponse: function(clientName, context) {
      try {
        const term = (glossaryTerms || []).find(t => 
          t.case_study && t.case_study.client_profile.includes(clientName)
        );
        
        if (!term) {
          return this.generateGeneralResponse({ entities: { clients: [clientName] } }, context);
        }

        return {
          text: `## ${clientName}'s Case Study - ${term.term}\n\n**Client Profile:** ${term.case_study.client_profile}\n\n**Structure Used:** ${term.case_study.structure}\n\n**Implementation:** ${term.case_study.implementation}\n\n**Results:** ${term.case_study.results}\n\n${this.getPersonalizedApplicationAdvice(term, context)}`,
          suggestions: [
            `How can I apply ${term.term} to my situation?`,
            `What are the requirements for ${term.term}?`,
            `Show me other similar strategies`
          ],
          relatedTerms: this.findRelatedTerms(term).slice(0, 2),
          ctas: this.generateCTAs(term, context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateStrategyResponse: function(analysis, context) {
      try {
        const { entities } = analysis;
        const userPersona = context.recommendedPersona;
        const relevantStrategies = this.getStrategiesForPersona(userPersona);
        
        let response = `## Tax Strategies for ${userPersona.replace(/([A-Z])/g, ' $1').trim()}\n\n`;
        
        if (entities.personas.length > 0) {
          const requestedPersona = entities.personas[0];
          response = `## Tax Strategies for ${requestedPersona.toUpperCase()} Professionals\n\n`;
          relevantStrategies.forEach((strategy, index) => {
            response += `**${index + 1}. ${strategy.term}**\n${strategy.plain_english}\n\n`;
          });
        } else {
          response += `Based on your progress (${context.xp} XP, ${context.level}), here are strategies to consider:\n\n`;
          relevantStrategies.slice(0, 3).forEach((strategy, index) => {
            response += `**${index + 1}. ${strategy.term}**\n${strategy.plain_english}\n\n`;
          });
        }

        return {
          text: response + this.getPersonalizedRecommendation(context),
          suggestions: [
            `How do I implement these strategies?`,
            `What are the risks of these strategies?`,
            `Which strategy should I start with?`
          ],
          relatedTerms: relevantStrategies.slice(0, 3),
          ctas: this.generateStrategyCTAs(context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateImplementationResponse: function(analysis, context) {
      try {
        const { entities } = analysis;
        const term = entities.glossaryTerms[0];
        
        if (!term) {
          return {
            text: `## Implementation Guidance\n\nTo provide specific implementation advice, I need to know which strategy you're interested in. Based on your progress, I recommend starting with:\n\n${this.getNextBestStrategy(context)}`,
            suggestions: [
              "What's the best strategy for my situation?",
              "Show me implementation checklists",
              "What documents do I need?"
            ],
            ctas: this.generateImplementationCTAs(context)
          };
        }

        return {
          text: `## Implementation Guide: ${term.term}\n\n**Prerequisites:**\n- ${context.level} understanding (✓ You qualify)\n- Relevant documentation\n- Professional consultation recommended\n\n**Implementation Steps:**\n1. Review all requirements\n2. Gather necessary documents\n3. Consult with tax professional\n4. Execute strategy\n5. Monitor and adjust\n\n**Based on your profile:** ${this.getPersonalizedImplementationAdvice(term, context)}`,
          suggestions: [
            "What documents do I need?",
            "How long does implementation take?",
            "What are the costs involved?"
          ],
          relatedTerms: [term],
          ctas: this.generateImplementationCTAs(context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateNextStepsResponse: function(context) {
      try {
        const recommendations = [];
        
        // Learning recommendations
        if (context.xp < 1000) {
          recommendations.push("📚 **Continue Learning**: Take more quizzes to unlock advanced strategies");
        }
        
        // Module recommendations
        if (context.inProgressModules.length > 0) {
          recommendations.push(`📖 **Complete Module**: Finish "${context.inProgressModules[0].title}" (${100 - context.inProgressModules[0].completion}% remaining)`);
        }
        
        // Review recommendations
        if (context.weakAreas.length > 0) {
          recommendations.push(`🔍 **Review Terms**: Focus on ${context.weakAreas.slice(0, 2).join(", ")}`);
        }
        
        // Strategy recommendations
        const nextStrategy = this.getNextBestStrategy(context);
        if (nextStrategy) {
          recommendations.push(`⚡ **Next Strategy**: Explore ${nextStrategy}`);
        }

        return {
          text: `## Your Personalized Next Steps\n\n${recommendations.join('\n\n')}\n\n**Your Progress:** ${context.xp} XP, ${context.level} level\n**Strengths:** ${context.strongAreas.join(', ') || 'Building foundation'}\n**Focus Areas:** ${context.weakAreas.join(', ') || 'Continue learning'}`,
          suggestions: [
            "What quiz should I take next?",
            "Which module should I prioritize?",
            "How can I earn more XP quickly?"
          ],
          ctas: [
            { text: "Take Practice Quiz", action: "quiz" },
            { text: "Review Weak Terms", action: "review" },
            { text: "Continue Learning", action: "learn" }
          ]
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateComparisonResponse: function(terms, context) {
      try {
        const term1 = terms[0];
        const term2 = terms[1];
        
        return {
          text: `## Comparison: ${term1.term} vs ${term2.term}\n\n**${term1.term}:**\n${term1.plain_english}\n\n**${term2.term}:**\n${term2.plain_english}\n\n**Key Differences:**\n- Use cases and applications vary\n- Different complexity levels\n- Distinct implementation requirements\n\n**For your situation (${context.level}):** ${this.getPersonalizedComparison(term1, term2, context)}`,
          suggestions: [
            `Which is better for ${context.recommendedPersona}?`,
            `Can I use both strategies together?`,
            `What are the implementation costs?`
          ],
          relatedTerms: [term1, term2],
          ctas: this.generateCTAs(term1, context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    generateGeneralResponse: function(analysis, context) {
      try {
        const fallbackResponses = [
          `Based on your current progress (${context.xp} XP, ${context.level}), I can help you with tax strategy questions. Try asking about specific strategies or concepts!`,
          `I have extensive knowledge about advanced tax strategies. What specific area would you like to explore?`,
          `Let me help you navigate tax strategies. You can ask about definitions, implementations, or get personalized recommendations!`
        ];

        return {
          text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
          suggestions: [
            "What strategies can reduce my tax burden?",
            "Explain Qualified Opportunity Fund",
            "What should I learn next?"
          ],
          ctas: this.generateGeneralCTAs(context)
        };
      } catch (error) {
        return this.generateErrorResponse();
      }
    },

    // Helper methods for context and personalization
    getPersonalizedInsight: (term, context) => {
      if (context.xp < 500) {
        return `💡 **For Your Level (${context.level}):** This is an advanced strategy. Consider mastering fundamentals first through our quiz system.`;
      }
      if (context.xp < 1500) {
        return `💡 **For Your Level (${context.level}):** You're ready to understand this strategy. Consider how it applies to your situation.`;
      }
      return `💡 **For Your Level (${context.level}):** You have the knowledge to implement this strategy. Focus on execution and optimization.`;
    },

    getPersonalizedApplicationAdvice: (term, context) => {
      const persona = context.recommendedPersona;
      const personaAdvice = {
        'W2': 'As a W-2 employee, focus on strategies that optimize your salary and benefits.',
        'business owner': 'As a business owner, this strategy can be integrated with your entity structure.',
        'real estate': 'For real estate investors, consider how this impacts your rental income and depreciation.',
        'investment': 'For investment-focused individuals, evaluate the impact on your portfolio strategy.'
      };
      
      return `**For ${persona} professionals:** ${personaAdvice[persona] || 'Consider how this applies to your specific tax situation.'}`;
    },

    getPersonalizedRecommendation: (context) => {
      if (context.xp < 1000) {
        return `💪 **Recommendation:** Focus on building your foundation with our quiz system to unlock more advanced strategies.`;
      }
      return `🎯 **Recommendation:** You're ready for implementation. Consider scheduling an advisor consultation.`;
    },

    getNextBestStrategy: (context) => {
      const unlockedStrategies = glossaryTerms.filter(term => {
        const complexity = this.getStrategyComplexity(term);
        return complexity <= context.xp;
      });
      
      const unmasteredStrategies = unlockedStrategies.filter(term => 
        !context.masteredTerms.includes(term.term)
      );
      
      if (unmasteredStrategies.length > 0) {
        return unmasteredStrategies[0].term;
      }
      
      return "Continue building your foundation with quizzes";
    },

    getStrategyComplexity: (term) => {
      const complexityMap = {
        'Roth Conversion': 300,
        'STR (Short-Term Rental)': 400,
        'QSBS (Qualified Small Business Stock)': 800,
        'F-Reorg': 1200,
        'Oil & Gas IDCs': 1000,
        'REPS (Real Estate Professional Status)': 600
      };
      return complexityMap[term.term] || 500;
    },

    getStrategiesForPersona: (persona) => {
      const personaStrategies = {
        'W2': glossaryTerms.filter(t => t.tags.some(tag => 
          tag.toLowerCase().includes('w2') || 
          tag.toLowerCase().includes('retirement') ||
          tag.toLowerCase().includes('deductions')
        )),
        'business owner': glossaryTerms.filter(t => t.tags.some(tag => 
          tag.toLowerCase().includes('business') || 
          tag.toLowerCase().includes('entity') ||
          tag.toLowerCase().includes('c-corp')
        )),
        'real estate': glossaryTerms.filter(t => t.tags.some(tag => 
          tag.toLowerCase().includes('real estate') || 
          tag.toLowerCase().includes('rental') ||
          tag.toLowerCase().includes('depreciation')
        )),
        'investment': glossaryTerms.filter(t => t.tags.some(tag => 
          tag.toLowerCase().includes('investment') || 
          tag.toLowerCase().includes('capital gains') ||
          tag.toLowerCase().includes('portfolio')
        ))
      };
      
      return personaStrategies[persona] || glossaryTerms.slice(0, 5);
    },

    findRelatedTerms: (term) => {
      return glossaryTerms.filter(t => 
        t.term !== term.term && 
        t.tags.some(tag => term.tags.includes(tag))
      );
    },

    // CTA generation
    generateCTAs: (term, context) => {
      const ctas = [];
      
      if (!context.masteredTerms.includes(term.term)) {
        ctas.push({ text: `Quiz: ${term.term}`, action: "quiz", term: term.term });
      }
      
      if (context.xp >= 1000) {
        ctas.push({ text: "Schedule Advisor Call", action: "schedule" });
      }
      
      ctas.push({ text: "Bookmark This Strategy", action: "bookmark", term: term.term });
      
      return ctas;
    },

    generateStrategyCTAs: (context) => {
      return [
        { text: "Take Strategy Quiz", action: "quiz" },
        { text: "Review Module", action: "module" },
        { text: "Get Implementation Guide", action: "guide" }
      ];
    },

    generateImplementationCTAs: (context) => {
      return [
        { text: "Download Checklist", action: "checklist" },
        { text: "Schedule Consultation", action: "schedule" },
        { text: "Find Required Documents", action: "documents" }
      ];
    },

    generateGeneralCTAs: (context) => {
      const ctas = [
        { text: "Take Practice Quiz", action: "quiz" }
      ];
      
      if (context.inProgressModules.length > 0) {
        ctas.push({ text: "Continue Learning", action: "module" });
      }
      
      if (context.weakAreas.length > 0) {
        ctas.push({ text: "Review Weak Areas", action: "review" });
      }
      
      return ctas;
    }
  };

  // Welcome message generation
  const generateWelcomeMessage = () => {
    const context = AIEngine.getUserContext();
    const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";
    
    let welcomeText = `Good ${timeOfDay}! I'm your AI Tax Assistant. `;
    
    if (context.xp === 0) {
      welcomeText += `I see you're just getting started. I can help you understand tax strategies, answer questions about our glossary terms, and guide your learning journey.`;
    } else {
      welcomeText += `I see you're a ${context.level} with ${context.xp} XP. I can help you with advanced tax strategies, provide implementation guidance, and suggest your next best steps.`;
    }
    
    return {
      id: Date.now(),
      type: "ai",
      text: welcomeText,
      timestamp: new Date(),
      suggestions: [
        "What strategies can help reduce my taxes?",
        "Explain a complex tax term",
        "What should I learn next?",
        "Analyze my progress"
      ],
      mode: "welcome"
    };
  };

  // Message handling
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const analysis = AIEngine.analyzeQuery(inputMessage);
      const response = AIEngine.generateResponse(analysis);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions || [],
        relatedTerms: response.relatedTerms || [],
        ctas: response.ctas || []
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleCTAClick = (cta) => {
    // Handle different CTA actions
    switch (cta.action) {
      case "quiz":
        // Navigate to quiz
        console.log("Navigate to quiz:", cta.term);
        break;
      case "schedule":
        // Open scheduling
        console.log("Open scheduling");
        break;
      case "bookmark":
        // Add bookmark
        console.log("Bookmark:", cta.term);
        break;
      default:
        console.log("CTA action:", cta.action);
    }
  };

  const generateAdvisorSummary = () => {
    const context = AIEngine.getUserContext();
    
    return {
      id: Date.now(),
      type: "ai",
      mode: "advisor",
      text: `# Your Tax Strategy Assessment\n\n## Current Status\n- **Level:** ${context.level} (${context.xp} XP)\n- **Completed Modules:** ${context.completedModules.length}/9\n- **Mastered Terms:** ${context.masteredTerms.length}\n\n## Strengths\n${context.strongAreas.length > 0 ? context.strongAreas.map(area => `- ${area}`).join('\n') : '- Building foundation'}\n\n## Focus Areas\n${context.weakAreas.length > 0 ? context.weakAreas.map(area => `- ${area}`).join('\n') : '- Continue learning fundamentals'}\n\n## Recommendations\n- Continue quiz practice to build XP\n- Focus on ${context.recommendedPersona} strategies\n- Consider implementation when you reach 1000+ XP`,
      timestamp: new Date(),
      ctas: AIEngine.generateGeneralCTAs(context)
    };
  };

  const switchToAdvisorMode = () => {
    setMode("advisor");
    const summary = generateAdvisorSummary();
    setMessages(prev => [...prev, summary]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Tax Assistant</h3>
              <p className="text-sm text-gray-600">
                Powered by your learning progress • {mode === "qa" ? "Q&A Mode" : "Advisor Mode"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode(mode === "qa" ? "advisor" : "qa")}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              {mode === "qa" ? "Advisor Summary" : "Q&A Mode"}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <span className="text-gray-500">✕</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3xl ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                } rounded-lg p-4`}
              >
                {message.type === "ai" ? (
                  <div>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: message.text.replace(/\n/g, '<br>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/## (.*?)(?=\n|$)/g, '<h3 class="font-bold text-lg mb-2">$1</h3>')
                          .replace(/# (.*?)(?=\n|$)/g, '<h2 class="font-bold text-xl mb-3">$1</h2>')
                      }}
                    />
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Try asking:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Terms */}
                    {message.relatedTerms && message.relatedTerms.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Related strategies:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.relatedTerms.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(`Tell me about ${term.term}`)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200"
                            >
                              {term.term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    {message.ctas && message.ctas.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Quick actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.ctas.map((cta, index) => (
                            <button
                              key={index}
                              onClick={() => handleCTAClick(cta)}
                              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
                            >
                              {cta.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
                
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about tax strategies..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          
          {mode === "qa" && (
            <div className="mt-2">
              <button
                onClick={switchToAdvisorMode}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Get personalized advisor summary →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITaxAssistant;