import React from 'react';
import { Link } from 'react-router-dom';

const AIAssistantLanding = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6">
            Unlock Your Personal AI Tax Planner
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant answers to complex tax questions. Your 24/7 AI assistant trained on advanced 
            tax strategies and personalized to your unique situation.
          </p>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="card border-2 border-accent">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">$297</div>
                <div className="text-lg font-medium text-primary mb-4">Lifetime Access</div>
                <div className="text-muted-foreground mb-6">
                  One-time payment for unlimited access to your AI tax assistant
                </div>
                <button className="btn btn-accent w-full">
                  Get Lifetime Access
                </button>
              </div>
            </div>
            
            <div className="card">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">$49</div>
                <div className="text-lg font-medium text-primary mb-4">Monthly Plan</div>
                <div className="text-muted-foreground mb-6">
                  Flexible monthly subscription with full AI assistant features
                </div>
                <button className="btn btn-primary w-full">
                  Start Monthly Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            What Your AI Assistant Can Do
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Instant Tax Questions</h3>
                  <p className="text-muted-foreground">
                    Ask complex tax questions and get detailed, personalized answers based on your situation and current tax law.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Strategy Optimization</h3>
                  <p className="text-muted-foreground">
                    Get personalized recommendations for optimizing your current tax strategies and discovering new opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-premium-gold rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-background text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Real-Time Calculations</h3>
                  <p className="text-muted-foreground">
                    Calculate potential savings, compare strategies, and model different scenarios instantly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">📚</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Implementation Guidance</h3>
                  <p className="text-muted-foreground">
                    Step-by-step guidance on implementing tax strategies, including timelines and required documentation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Ongoing Monitoring</h3>
                  <p className="text-muted-foreground">
                    Continuous monitoring of tax law changes and alerts for new opportunities relevant to your situation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your financial information is encrypted and secure. Your AI assistant maintains strict confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Perfect For These Situations
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-primary mb-3">Business Owners</h3>
                <p className="text-muted-foreground">
                  "Should I elect S-Corp status?" "How do I maximize my QBI deduction?" 
                  Get instant answers to complex business tax questions.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-primary mb-3">Real Estate Investors</h3>
                <p className="text-muted-foreground">
                  "When should I do a 1031 exchange?" "How do I qualify for REPS status?" 
                  Navigate real estate tax strategies with confidence.
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-primary mb-3">High Earners</h3>
                <p className="text-muted-foreground">
                  "How can I reduce my tax burden?" "What's the best retirement strategy?" 
                  Optimize complex situations for maximum savings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison with Human Advisors */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            AI Assistant vs. Traditional Tax Advisor
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4 text-accent">AI Assistant</th>
                  <th className="text-center py-4 px-4 text-muted-foreground">Traditional Advisor</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Availability</td>
                  <td className="py-4 px-4 text-center text-accent">24/7 Instant</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Business Hours</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Response Time</td>
                  <td className="py-4 px-4 text-center text-accent">Immediate</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Days/Weeks</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Cost per Question</td>
                  <td className="py-4 px-4 text-center text-accent">$0</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">$200-500+</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Knowledge Base</td>
                  <td className="py-4 px-4 text-center text-accent">Complete Tax Code</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Experience-Based</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Consistency</td>
                  <td className="py-4 px-4 text-center text-accent">Always Current</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center text-muted-foreground">
            <p>* AI Assistant complements, not replaces, professional tax preparation and complex compliance work</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've upgraded their tax planning with AI assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary hover:bg-gray-100">
              Start Free Trial (7 Days)
            </button>
            <Link to="/tax-calculator" className="btn btn-accent">
              Try Our Free Calculator First
            </Link>
          </div>
          
          <div className="mt-6 text-sm opacity-75">
            30-day money-back guarantee • Cancel anytime • No long-term commitment
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantLanding;