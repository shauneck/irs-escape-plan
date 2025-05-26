import React from 'react';
import { Link } from 'react-router-dom';

const TaxCalculatorLanding = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🧮</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6">
            Estimate Your Potential Tax Savings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how much you could save with advanced tax strategies. Our calculator uses real 2024 
            tax brackets and proven strategies to show your optimization potential.
          </p>
          <Link to="/calculator" className="btn btn-primary text-lg px-8 py-4">
            Start Calculator Now (Free)
          </Link>
        </div>

        {/* How It Works */}
        <div className="bg-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            How Our Calculator Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Enter Your Information</h3>
              <p className="text-muted-foreground">
                Provide your income details, business structure, and current tax situation in just 2 minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Real Tax Calculations</h3>
              <p className="text-muted-foreground">
                Our engine calculates your current tax burden using 2024 brackets and analyzes optimization opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Get Your Results</h3>
              <p className="text-muted-foreground">
                See your potential savings breakdown and get specific strategy recommendations for implementation.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Calculator Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">2024 Tax Brackets</h3>
                  <p className="text-muted-foreground">
                    Uses current federal tax brackets and self-employment tax rates for accurate calculations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Entity Optimization</h3>
                  <p className="text-muted-foreground">
                    Analyzes S-Corp elections, LLC structures, and other entity optimizations for your situation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-premium-gold rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-background text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Strategy Matching</h3>
                  <p className="text-muted-foreground">
                    Identifies which advanced strategies apply to your income level and business structure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">💰</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Savings Breakdown</h3>
                  <p className="text-muted-foreground">
                    Detailed breakdown showing exactly where your savings come from and potential dollar amounts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">📋</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Implementation Steps</h3>
                  <p className="text-muted-foreground">
                    Actionable next steps and timelines for implementing the strategies that could save you money.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Multiple Scenarios</h3>
                  <p className="text-muted-foreground">
                    Test different income levels, entity structures, and scenarios to optimize your approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Examples */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Real Results from Our Calculator
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">$150K Income</div>
              <div className="text-lg font-bold text-accent mb-2">$16,000 Savings</div>
              <div className="text-sm text-muted-foreground mb-3">
                W2 Employee + Side Business
              </div>
              <div className="text-xs text-muted-foreground">
                S-Corp election + QBI optimization
              </div>
            </div>
            
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">$300K Income</div>
              <div className="text-lg font-bold text-accent mb-2">$34,000 Savings</div>
              <div className="text-sm text-muted-foreground mb-3">
                Business Owner
              </div>
              <div className="text-xs text-muted-foreground">
                Entity optimization + retirement maximization
              </div>
            </div>
            
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">$500K Income</div>
              <div className="text-lg font-bold text-accent mb-2">$74,000 Savings</div>
              <div className="text-sm text-muted-foreground mb-3">
                High Earner + Real Estate
              </div>
              <div className="text-xs text-muted-foreground">
                Multiple advanced strategies
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              * Results based on typical implementations. Individual results may vary based on specific circumstances.
            </p>
          </div>
        </div>

        {/* Strategies Analyzed */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Strategies Our Calculator Analyzes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">S-Corporation Election & Salary Optimization</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Section 199A QBI Deduction Maximization</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Augusta Rule (Section 280A) Implementation</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Retirement Plan Optimization Strategies</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Home Office & Business Expense Deductions</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Self-Employment Tax Reduction Techniques</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Calculate Your Savings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Takes less than 3 minutes. Get instant results with specific dollar amounts and implementation steps.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Start Free Calculator
            </Link>
            <Link to="/strategy-builder" className="btn btn-accent text-lg px-8 py-4">
              Get Full Strategy Assessment
            </Link>
          </div>
          
          <div className="mt-6 text-sm opacity-75">
            100% Free • No email required • Instant results
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculatorLanding;