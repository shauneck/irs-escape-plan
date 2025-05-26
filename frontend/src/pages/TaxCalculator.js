import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const TaxCalculator = () => {
  const { user } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const [formData, setFormData] = useState({
    annual_income: '',
    income_types: [],
    has_business: false,
    entity_type: '',
    business_revenue: '',
    business_expenses: ''
  });

  const steps = [
    { id: 1, title: 'Income Information', icon: '💰' },
    { id: 2, title: 'Business Details', icon: '🏢' },
    { id: 3, title: 'Results & Recommendations', icon: '📊' }
  ];

  const incomeTypeOptions = [
    { id: 'w2', label: 'W2 Employment', description: 'Regular job with employer withholding' },
    { id: 'business', label: 'Business Income', description: 'Self-employment or business ownership' },
    { id: 'investment', label: 'Investment Income', description: 'Dividends, capital gains, etc.' },
    { id: 'rental', label: 'Rental Income', description: 'Real estate rental properties' },
    { id: 'other', label: 'Other Income', description: 'Freelancing, consulting, etc.' }
  ];

  const entityTypes = [
    { id: 'sole_prop', label: 'Sole Proprietorship', description: 'Individual business, Schedule C' },
    { id: 'llc', label: 'LLC', description: 'Limited Liability Company' },
    { id: 's_corp', label: 'S-Corporation', description: 'S-Corp election for tax benefits' },
    { id: 'c_corp', label: 'C-Corporation', description: 'Traditional corporation' },
    { id: 'partnership', label: 'Partnership', description: 'Multiple owner business' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIncomeTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      income_types: prev.income_types.includes(type)
        ? prev.income_types.filter(t => t !== type)
        : [...prev.income_types, type]
    }));
  };

  const calculateTaxes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tax-calculator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_email: user.email,
          annual_income: parseFloat(formData.annual_income),
          business_revenue: formData.business_revenue ? parseFloat(formData.business_revenue) : null,
          business_expenses: formData.business_expenses ? parseFloat(formData.business_expenses) : null
        })
      });

      const data = await response.json();
      setResults(data);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error calculating taxes:', error);
      alert('Error calculating taxes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceedToStep2 = () => {
    return formData.annual_income && formData.income_types.length > 0;
  };

  const canProceedToStep3 = () => {
    if (!formData.has_business) return true;
    return formData.entity_type;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setResults(null);
    setFormData({
      annual_income: '',
      income_types: [],
      has_business: false,
      entity_type: '',
      business_revenue: '',
      business_expenses: ''
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tax Savings Calculator
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover your potential tax savings with advanced strategies in 3 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
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
                  <div className="ml-2 hidden sm:block">
                    <div className="text-sm font-medium text-primary">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-border"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-lg p-6 mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">💰 Income Information</h2>
              
              {/* Annual Income */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Annual Income
                </label>
                <input
                  type="number"
                  placeholder="150000"
                  value={formData.annual_income}
                  onChange={(e) => handleInputChange('annual_income', e.target.value)}
                  className="input"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your total annual income from all sources
                </p>
              </div>

              {/* Income Types */}
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Income Types (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {incomeTypeOptions.map(option => (
                    <div
                      key={option.id}
                      onClick={() => handleIncomeTypeToggle(option.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.income_types.includes(option.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-primary">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToStep2()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Business Details
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">🏢 Business Details</h2>
              
              {/* Has Business */}
              <div>
                <label className="block text-sm font-medium text-primary mb-4">
                  Do you own a business or have self-employment income?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="has_business"
                      checked={formData.has_business === true}
                      onChange={() => handleInputChange('has_business', true)}
                      className="mr-3"
                    />
                    <span>Yes, I have business/self-employment income</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="has_business"
                      checked={formData.has_business === false}
                      onChange={() => handleInputChange('has_business', false)}
                      className="mr-3"
                    />
                    <span>No, I only have W2/investment income</span>
                  </label>
                </div>
              </div>

              {/* Entity Type (if has business) */}
              {formData.has_business && (
                <div>
                  <label className="block text-sm font-medium text-primary mb-4">
                    Business Entity Type
                  </label>
                  <div className="space-y-3">
                    {entityTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => handleInputChange('entity_type', type.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.entity_type === type.id
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
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  onClick={calculateTaxes}
                  disabled={!canProceedToStep3() || loading}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Calculating...' : 'Calculate Savings'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && results && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-primary mb-4">📊 Your Tax Savings Results</h2>
              
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {formatCurrency(results.current_tax_burden)}
                  </div>
                  <div className="text-sm text-red-700">Current Tax Burden</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatCurrency(results.optimized_tax_burden)}
                  </div>
                  <div className="text-sm text-green-700">Optimized Tax Burden</div>
                </div>
                
                <div className="bg-accent text-white rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(results.total_annual_savings)}
                  </div>
                  <div className="text-sm opacity-90">Annual Savings</div>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Savings Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(results.savings_breakdown).map(([strategy, savings]) => (
                    <div key={strategy} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{strategy}</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(savings)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied Strategies */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Recommended Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.strategies_applied.map((strategy, index) => (
                    <div key={index} className="strategy-card p-4 bg-card border rounded-lg">
                      <div className="font-medium text-primary">{strategy}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Next Steps to Implement</h3>
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
                  onClick={resetCalculator}
                  className="btn btn-outline"
                >
                  Calculate Again
                </button>
                <Link to="/strategy-builder" className="btn btn-accent">
                  Get Detailed Strategy Plan
                </Link>
                <Link to="/courses" className="btn btn-primary">
                  Learn Implementation
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="bg-secondary rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-4">💡 Why This Calculator Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h4 className="font-medium text-primary mb-2">Real Tax Calculations</h4>
              <p>Uses 2024 tax brackets and actual IRS guidelines to calculate your current burden and optimized scenarios.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Proven Strategies</h4>
              <p>Implements strategies our clients use daily: S-Corp elections, QBI deductions, Augusta Rule, and more.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Personalized Results</h4>
              <p>Takes into account your specific income types, business structure, and personal situation.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Implementation Ready</h4>
              <p>Provides specific next steps and connects you to educational resources for implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;