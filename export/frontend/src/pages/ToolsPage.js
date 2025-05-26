import React from 'react';
import { Link } from 'react-router-dom';

const ToolsPage = () => {
  const tools = [
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      description: 'Calculate your potential tax savings with advanced strategies in just 3 steps. Get instant estimates based on your income and business structure.',
      icon: '🧮',
      features: [
        'Real 2024 tax calculations',
        'S-Corp optimization analysis',
        'QBI deduction estimates',
        'Instant savings breakdown'
      ],
      link: '/tax-calculator',
      linkText: 'Start Calculating',
      badge: 'Free Tool',
      color: 'primary'
    },
    {
      id: 'strategy-builder',
      title: 'Strategy Builder',
      description: 'Get personalized tax strategy recommendations based on your unique situation. 5-step assessment with detailed implementation plan.',
      icon: '🎯',
      features: [
        '12 advanced strategies',
        'Personalized matching',
        'Impact scoring system',
        'Implementation roadmap'
      ],
      link: '/strategy-builder',
      linkText: 'Build Strategy',
      badge: 'Free Assessment',
      color: 'accent'
    },
    {
      id: 'ai-assistant',
      title: 'AI Tax Assistant',
      description: 'Your personal AI tax planner available 24/7. Get instant answers to complex tax questions and optimization strategies.',
      icon: '🤖',
      features: [
        '24/7 availability',
        'Complex tax questions',
        'Strategy optimization',
        'Real-time guidance'
      ],
      link: '/ai-assistant',
      linkText: 'Get AI Assistant',
      badge: 'Premium',
      color: 'premium-gold'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Tax Planning Tools Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade tax planning tools designed for high-income professionals. 
            Calculate savings, build strategies, and get expert guidance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool) => (
            <div key={tool.id} className="card hover:shadow-xl transition-all duration-300">
              {/* Tool Header */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-${tool.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-3xl">{tool.icon}</span>
                </div>
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-primary">{tool.title}</h2>
                  <span className={`badge badge-${tool.color === 'premium-gold' ? 'premium' : 'free'}`}>
                    {tool.badge}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {tool.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <h3 className="font-semibold text-primary mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link 
                to={tool.link}
                className={`btn w-full ${
                  tool.color === 'primary' ? 'btn-primary' :
                  tool.color === 'accent' ? 'btn-accent' :
                  'btn-premium'
                }`}
              >
                {tool.linkText}
              </Link>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            How Our Tools Work Together
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Calculate</h3>
              <p className="text-muted-foreground">
                Start with our Tax Calculator to see your potential savings and understand which strategies apply to your situation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Strategize</h3>
              <p className="text-muted-foreground">
                Use the Strategy Builder for a comprehensive assessment and personalized recommendations tailored to your goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4 text-background text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Implement</h3>
              <p className="text-muted-foreground">
                Get ongoing support with our AI Assistant and learn implementation through our comprehensive course system.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Real Results from Our Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">$34,000+</div>
              <div className="text-lg font-medium mb-2">Average Calculator Savings</div>
              <div className="opacity-90">
                From users implementing S-Corp and QBI strategies identified by our calculator
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">$74,000+</div>
              <div className="text-lg font-medium mb-2">Strategy Builder Results</div>
              <div className="opacity-90">
                Comprehensive savings for high-income professionals using our 5-step assessment
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-lg font-medium mb-2">Implementation Success</div>
              <div className="opacity-90">
                Of users who follow through with AI Assistant guidance achieve projected savings
              </div>
            </div>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Learn While You Plan
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our tools are integrated with comprehensive educational content to help you understand 
            and implement advanced tax strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
            <Link to="/glossary" className="btn btn-outline">
              Tax Glossary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;