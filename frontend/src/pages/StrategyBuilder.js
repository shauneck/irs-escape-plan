import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const StrategyBuilder = () => {
  const { user } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const [formData, setFormData] = useState({
    income_types: [],
    annual_income: '',
    entity_type: '',
    business_revenue: '',
    lifestyle_factors: [],
    business_goals: [],
    investment_interests: []
  });

  const steps = [
    { id: 1, title: 'Income & Business', icon: '💼' },
    { id: 2, title: 'Lifestyle & Goals', icon: '🎯' },
    { id: 3, title: 'Investment Interests', icon: '📈' },
    { id: 4, title: 'Review & Submit', icon: '✓' },
    { id: 5, title: 'Your Strategy Plan', icon: '📊' }
  ];

  const incomeTypes = [
    { id: 'w2', label: 'W2 Employment', description: 'Regular employment income' },
    { id: 'business', label: 'Business Income', description: 'Self-employment or business ownership' },
    { id: 'investment', label: 'Investment Income', description: 'Dividends, capital gains, etc.' },
    { id: 'rental', label: 'Rental Properties', description: 'Real estate rental income' }
  ];

  const entityTypes = [
    { id: 'sole_prop', label: 'Sole Proprietorship' },
    { id: 'llc', label: 'LLC' },
    { id: 's_corp', label: 'S-Corporation' },
    { id: 'c_corp', label: 'C-Corporation' },
    { id: 'partnership', label: 'Partnership' }
  ];

  const lifestyleFactors = [
    { id: 'home_office', label: 'Home Office', description: 'Work from home regularly' },
    { id: 'travel', label: 'Business Travel', description: 'Frequent business travel' },
    { id: 'vehicle', label: 'Business Vehicle', description: 'Use vehicle for business' },
    { id: 'real_estate', label: 'Real Estate Interest', description: 'Own or want to invest in real estate' },
    { id: 'children', label: 'Dependent Children', description: 'Have dependent children' },
    { id: 'education', label: 'Education Expenses', description: 'Ongoing education or training' }
  ];

  const businessGoals = [
    { id: 'tax_reduction', label: 'Minimize Tax Burden', description: 'Primary goal is tax optimization' },
    { id: 'wealth_building', label: 'Wealth Building', description: 'Focus on long-term wealth accumulation' },
    { id: 'cash_flow', label: 'Improve Cash Flow', description: 'Optimize current cash flow' },
    { id: 'retirement', label: 'Retirement Planning', description: 'Maximize retirement savings' },
    { id: 'business_growth', label: 'Business Growth', description: 'Expand business operations' },
    { id: 'asset_protection', label: 'Asset Protection', description: 'Protect wealth from liability' }
  ];

  const investmentInterests = [
    { id: 'stocks', label: 'Stock Market', description: 'Traditional stock investments' },
    { id: 'real_estate', label: 'Real Estate', description: 'Property investment' },
    { id: 'private_equity', label: 'Private Equity', description: 'Private business investments' },
    { id: 'crypto', label: 'Cryptocurrency', description: 'Digital asset investments' },
    { id: 'bonds', label: 'Bonds & Fixed Income', description: 'Conservative investments' },
    { id: 'alternative', label: 'Alternative Investments', description: 'Oil & gas, art, etc.' }
  ];

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const buildStrategy = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/strategy-builder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_email: user.email,
          annual_income: parseFloat(formData.annual_income),
          business_revenue: formData.business_revenue ? parseFloat(formData.business_revenue) : null
        })
      });

      const data = await response.json();
      setResults(data);
      setCurrentStep(5);
    } catch (error) {
      console.error('Error building strategy:', error);
      alert('Error building strategy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const resetBuilder = () => {
    setCurrentStep(1);
    setResults(null);
    setFormData({
      income_types: [],
      annual_income: '',
      entity_type: '',
      business_revenue: '',
      lifestyle_factors: [],
      business_goals: [],
      investment_interests: []
    });
  };

  const canProceed = (step) => {
    switch (step) {
      case 1:
        return formData.income_types.length > 0 && formData.annual_income;
      case 2:
        return formData.lifestyle_factors.length > 0 && formData.business_goals.length > 0;
      case 3:
        return true; // Investment interests are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tax Strategy Builder
          </h1>
          <p className="text-xl text-muted-foreground">
            Get personalized tax strategy recommendations with our comprehensive 5-step assessment
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 md:space-x-4 min-w-max px-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div 
                    className={`wizard-step ${
                      currentStep === step.id ? 'active' : 
                      currentStep > step.id ? 'completed' : 'inactive'
                    }`}
                  >
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium text-primary">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-6 md:w-8 h-px bg-border"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-lg p-6 mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">💼 Income & Business Information</h2>
              
              {/* Income Types */}
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Income Types (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {incomeTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => handleArrayToggle('income_types', type.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.income_types.includes(type.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-primary">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annual Income */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Annual Income
                </label>
                <input
                  type="number"
                  placeholder="200000"
                  value={formData.annual_income}
                  onChange={(e) => handleInputChange('annual_income', e.target.value)}
                  className="input"
                />
              </div>

              {/* Entity Type (if business income) */}
              {formData.income_types.includes('business') && (
                <div>
                  <label className="block text-sm font-medium text-primary mb-4">
                    Business Entity Type
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {entityTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => handleInputChange('entity_type', type.id)}
                        className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                          formData.entity_type === type.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium text-primary">{type.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceed(1)}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Lifestyle & Goals
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">🎯 Lifestyle & Goals</h2>
              
              {/* Lifestyle Factors */}
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Lifestyle Factors (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {lifestyleFactors.map(factor => (
                    <div
                      key={factor.id}
                      onClick={() => handleArrayToggle('lifestyle_factors', factor.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.lifestyle_factors.includes(factor.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-primary">{factor.label}</div>
                      <div className="text-sm text-muted-foreground">{factor.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Goals */}
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Primary Goals (Select your top priorities)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {businessGoals.map(goal => (
                    <div
                      key={goal.id}
                      onClick={() => handleArrayToggle('business_goals', goal.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.business_goals.includes(goal.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-primary">{goal.label}</div>
                      <div className="text-sm text-muted-foreground">{goal.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceed(2)}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Investment Interests
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">📈 Investment Interests</h2>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Investment Interests (Optional - helps us recommend tax-efficient strategies)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {investmentInterests.map(interest => (
                    <div
                      key={interest.id}
                      onClick={() => handleArrayToggle('investment_interests', interest.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.investment_interests.includes(interest.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-primary">{interest.label}</div>
                      <div className="text-sm text-muted-foreground">{interest.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn btn-primary"
                >
                  Next: Review
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">✓ Review Your Assessment</h2>
              
              <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-medium text-primary mb-2">Income & Business</h3>
                  <p className="text-muted-foreground">
                    Annual Income: {formatCurrency(formData.annual_income)}
                  </p>
                  <p className="text-muted-foreground">
                    Income Types: {formData.income_types.join(', ')}
                  </p>
                  {formData.entity_type && (
                    <p className="text-muted-foreground">
                      Entity Type: {formData.entity_type}
                    </p>
                  )}
                </div>

                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-medium text-primary mb-2">Lifestyle & Goals</h3>
                  <p className="text-muted-foreground">
                    Lifestyle: {formData.lifestyle_factors.join(', ')}
                  </p>
                  <p className="text-muted-foreground">
                    Goals: {formData.business_goals.join(', ')}
                  </p>
                </div>

                {formData.investment_interests.length > 0 && (
                  <div className="bg-secondary rounded-lg p-4">
                    <h3 className="font-medium text-primary mb-2">Investment Interests</h3>
                    <p className="text-muted-foreground">
                      {formData.investment_interests.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={buildStrategy}
                  disabled={loading}
                  className="btn btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Building Strategy...' : 'Build My Strategy'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && results && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-primary mb-4">📊 Your Personalized Tax Strategy</h2>
              
              {/* Total Savings */}
              <div className="bg-accent text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.total_estimated_savings)}
                </div>
                <div className="text-lg opacity-90">
                  Total Estimated Annual Savings
                </div>
              </div>

              {/* Assessment Summary */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Assessment Summary</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-medium text-primary">Income Level</div>
                    <div className="text-muted-foreground">{results.assessment_summary.income_level}</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary">Complexity Level</div>
                    <div className="text-muted-foreground">{results.assessment_summary.complexity_level}</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary">Primary Opportunities</div>
                    <div className="text-muted-foreground">
                      {results.assessment_summary.primary_opportunities.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Strategies */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Recommended Strategies ({results.matched_strategies.length})
                </h3>
                <div className="space-y-4">
                  {results.matched_strategies.map((strategy, index) => (
                    <div key={strategy.id} className="strategy-card p-6 bg-card border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-primary">{strategy.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(strategy.estimated_annual_savings)}
                          </div>
                          <div className="text-sm text-muted-foreground">Potential Savings</div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{strategy.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="impact-score">
                            <span className="text-sm text-muted-foreground">Impact Score:</span>
                            <div className="impact-score-bar">
                              <div 
                                className="impact-score-fill" 
                                style={{ width: `${strategy.matching_score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{strategy.matching_score}/100</span>
                          </div>
                          <span className="badge badge-difficulty">{strategy.complexity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Implementation Next Steps</h3>
                <ul className="space-y-2">
                  {results.next_steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetBuilder}
                  className="btn btn-outline"
                >
                  New Assessment
                </button>
                <Link to="/courses" className="btn btn-primary">
                  Learn Implementation
                </Link>
                <Link to="/ai-assistant" className="btn btn-premium">
                  Get AI Guidance
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Educational Note */}
        <div className="bg-secondary rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-4">💡 About This Assessment</h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h4 className="font-medium text-primary mb-2">Personalized Matching</h4>
              <p>Our algorithm analyzes your specific situation against 12 advanced tax strategies to find the best matches.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Real Savings Estimates</h4>
              <p>Savings calculations are based on actual client results and current tax law implementations.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Implementation Ready</h4>
              <p>Each strategy includes specific requirements, complexity assessment, and step-by-step implementation guidance.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Ongoing Support</h4>
              <p>Connect with our courses and AI assistant for detailed implementation support and ongoing optimization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;