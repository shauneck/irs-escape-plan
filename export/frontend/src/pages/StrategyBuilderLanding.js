import React from 'react';
import { Link } from 'react-router-dom';

const StrategyBuilderLanding = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎯</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6">
            Build Your Tax Escape Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get a comprehensive, personalized tax strategy plan with our 5-step assessment. 
            Discover which of our 12 advanced strategies could save you the most money.
          </p>
          <Link to="/strategies" className="btn btn-accent text-lg px-8 py-4">
            Start Assessment (Free)
          </Link>
        </div>

        {/* Assessment Process */}
        <div className="bg-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            5-Step Comprehensive Assessment
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0 text-white text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Income & Business Analysis</h3>
                <p className="text-muted-foreground">
                  Analyze your income sources, business structure, and current entity setup to identify optimization opportunities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shrink-0 text-white text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Lifestyle & Goals Mapping</h3>
                <p className="text-muted-foreground">
                  Understand your lifestyle factors (home office, travel, etc.) and primary financial goals to match appropriate strategies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center shrink-0 text-background text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Investment Profile Review</h3>
                <p className="text-muted-foreground">
                  Assess your investment interests and risk tolerance to recommend tax-efficient investment strategies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shrink-0 text-white text-2xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Strategy Matching Algorithm</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes your profile against 12 advanced strategies and scores them based on potential impact and feasibility.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0 text-white text-2xl font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Personalized Strategy Plan</h3>
                <p className="text-muted-foreground">
                  Receive your ranked strategy recommendations with estimated savings, complexity assessment, and implementation roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Strategies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            12 Advanced Strategies in Our Database
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-primary mb-3">Business Structure Optimization</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• S-Corporation Election & Salary Optimization</li>
                <li>• Section 199A QBI Deduction Maximization</li>
                <li>• Augusta Rule (Section 280A) Implementation</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-primary mb-3">Real Estate & Depreciation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Cost Segregation Studies</li>
                <li>• Real Estate Professional Status (REPS)</li>
                <li>• 1031 Like-Kind Exchanges</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-primary mb-3">Retirement & Wealth Building</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Solo 401k & Defined Benefit Plans</li>
                <li>• Cash Balance Plan Implementation</li>
                <li>• Paying Children Legally Strategy</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-primary mb-3">Advanced Investment Strategies</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Qualified Small Business Stock (QSBS)</li>
                <li>• Conservation Easement Programs</li>
                <li>• Captive Insurance Company Setup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Your Personalized Strategy Report Includes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Total Estimated Savings</div>
                  <div className="text-sm text-muted-foreground">Combined annual savings from all recommended strategies</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Ranked Strategy List</div>
                  <div className="text-sm text-muted-foreground">Strategies ordered by potential impact for your situation</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Implementation Complexity</div>
                  <div className="text-sm text-muted-foreground">Clear difficulty ratings and resource requirements</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Specific Requirements</div>
                  <div className="text-sm text-muted-foreground">Detailed prerequisites and qualifications for each strategy</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Implementation Timeline</div>
                  <div className="text-sm text-muted-foreground">Step-by-step roadmap with recommended timing</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <div className="font-medium text-primary">Course Connections</div>
                  <div className="text-sm text-muted-foreground">Direct links to educational content for each strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-secondary rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Strategy Builder Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">$74,000</div>
              <div className="font-medium text-primary mb-2">Annual Savings</div>
              <div className="text-sm text-muted-foreground">
                Software engineer + real estate investor implemented 6 strategies
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">$125,000</div>
              <div className="font-medium text-primary mb-2">First-Year Savings</div>
              <div className="text-sm text-muted-foreground">
                Healthcare business owner using cost segregation + S-Corp optimization
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">$45,000</div>
              <div className="font-medium text-primary mb-2">W2 Employee Savings</div>
              <div className="text-sm text-muted-foreground">
                High-income W2 + side business implementing retirement maximization
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Strategy Builder vs. Traditional Tax Planning
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Approach</th>
                  <th className="text-center py-4 px-4 text-accent">Strategy Builder</th>
                  <th className="text-center py-4 px-4 text-muted-foreground">Traditional Planning</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Comprehensive Analysis</td>
                  <td className="py-4 px-4 text-center text-accent">12 Advanced Strategies</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">3-5 Basic Strategies</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Time to Results</td>
                  <td className="py-4 px-4 text-center text-accent">10 Minutes</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Weeks/Months</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Cost</td>
                  <td className="py-4 px-4 text-center text-accent">Free</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">$1,500-5,000+</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Personalization</td>
                  <td className="py-4 px-4 text-center text-accent">Algorithm-Matched</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Experience-Based</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Educational Support</td>
                  <td className="py-4 px-4 text-center text-accent">Integrated Courses</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Separate Research</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Complete our comprehensive assessment and get your personalized tax escape plan in 10 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/strategies" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Start Strategy Assessment
            </Link>
            <Link to="/tax-calculator" className="btn btn-accent text-lg px-8 py-4">
              Try Quick Calculator First
            </Link>
          </div>
          
          <div className="mt-6 text-sm opacity-75">
            100% Free • Instant results • No obligation
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilderLanding;