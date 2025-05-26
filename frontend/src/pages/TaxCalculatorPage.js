import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../App';

function TaxCalculatorPage({ user }) {
  const api = useContext(APIContext);
  const [inputs, setInputs] = useState({
    annual_income: '',
    income_types: [],
    has_business: false,
    entity_type: '',
    minor_children: 0,
    work_from_home: false,
    has_rentals: false,
    donates_to_charity: false
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const incomeTypeOptions = [
    { value: 'w2', label: 'W-2 Employee', tag: 'w2_income' },
    { value: '1099', label: '1099 Contractor', tag: 'contractor_income' },
    { value: 'business', label: 'Business Income', tag: 'business_owner' },
    { value: 'real_estate', label: 'Real Estate', tag: 'real_estate' },
    { value: 'investments', label: 'Investment Income', tag: 'investor' },
    { value: 'crypto', label: 'Cryptocurrency', tag: 'crypto' }
  ];

  const entityOptions = [
    { value: 'sole_prop', label: 'Sole Proprietorship', tag: 'sole_prop' },
    { value: 'llc', label: 'LLC', tag: 'llc' },
    { value: 's_corp', label: 'S Corporation', tag: 's_corp' },
    { value: 'c_corp', label: 'C Corporation', tag: 'c_corp' }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIncomeTypeToggle = (incomeType) => {
    setInputs(prev => ({
      ...prev,
      income_types: prev.income_types.includes(incomeType)
        ? prev.income_types.filter(type => type !== incomeType)
        : [...prev.income_types, incomeType]
    }));
  };

  const calculateSavings = async () => {
    if (!inputs.annual_income || inputs.annual_income <= 0) {
      alert('Please enter a valid annual income');
      return;
    }

    if (inputs.income_types.length === 0) {
      alert('Please select at least one income type');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/api/tax-calculator', {
        user_email: user?.email || 'anonymous',
        ...inputs
      });
      
      setResults(response);
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating savings:', error);
      alert('Error calculating savings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  const resetCalculator = () => {
    setInputs({
      annual_income: '',
      income_types: [],
      has_business: false,
      entity_type: '',
      minor_children: 0,
      work_from_home: false,
      has_rentals: false,
      donates_to_charity: false
    });
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="tax-calculator-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Tax Savings Estimator</h1>
          <div className="ai-badge">
            <span className="badge-icon">🤖</span>
            Powered by Strategy Builder AI
          </div>
          <p className="page-subtitle">
            Get an instant estimate of your potential tax savings with advanced strategies
          </p>
        </div>
      </div>

      <div className="container">
        <div className="calculator-layout">
          {/* Input Form */}
          <div className="calculator-inputs">
            <div className="input-section">
              <h3>Tell us about your financial situation</h3>
              
              {/* Annual Income */}
              <div className="form-group">
                <label className="form-label">
                  Estimated Annual Income <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="150000"
                    value={inputs.annual_income}
                    onChange={(e) => handleInputChange('annual_income', e.target.value)}
                  />
                </div>
              </div>

              {/* Income Types */}
              <div className="form-group">
                <label className="form-label">
                  Income Types <span className="required">*</span>
                </label>
                <p className="form-help">Select all that apply</p>
                <div className="checkbox-grid">
                  {incomeTypeOptions.map(option => (
                    <div
                      key={option.value}
                      className={`checkbox-card ${inputs.income_types.includes(option.value) ? 'selected' : ''}`}
                      onClick={() => handleIncomeTypeToggle(option.value)}
                    >
                      <div className="checkbox-indicator">
                        {inputs.income_types.includes(option.value) && <span>✓</span>}
                      </div>
                      <span className="checkbox-label">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Ownership */}
              <div className="form-group">
                <label className="form-label">Do you own a business?</label>
                <div className="toggle-group">
                  <button
                    className={`toggle-btn ${inputs.has_business ? 'active' : ''}`}
                    onClick={() => handleInputChange('has_business', true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`toggle-btn ${!inputs.has_business ? 'active' : ''}`}
                    onClick={() => handleInputChange('has_business', false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Entity Type */}
              {inputs.has_business && (
                <div className="form-group">
                  <label className="form-label">Entity Type</label>
                  <select
                    className="form-select"
                    value={inputs.entity_type}
                    onChange={(e) => handleInputChange('entity_type', e.target.value)}
                  >
                    <option value="">Select entity type</option>
                    {entityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Additional Factors */}
              <div className="form-group">
                <label className="form-label">Additional Information</label>
                
                <div className="form-row">
                  <div className="form-col">
                    <label className="form-sublabel">Number of minor children</label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      max="10"
                      value={inputs.minor_children}
                      onChange={(e) => handleInputChange('minor_children', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="checkbox-list">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="work_from_home"
                      checked={inputs.work_from_home}
                      onChange={(e) => handleInputChange('work_from_home', e.target.checked)}
                    />
                    <label htmlFor="work_from_home">I work from home</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="has_rentals"
                      checked={inputs.has_rentals}
                      onChange={(e) => handleInputChange('has_rentals', e.target.checked)}
                    />
                    <label htmlFor="has_rentals">I own rental properties</label>
                  </div>
                  
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="donates_to_charity"
                      checked={inputs.donates_to_charity}
                      onChange={(e) => handleInputChange('donates_to_charity', e.target.checked)}
                    />
                    <label htmlFor="donates_to_charity">I donate to charity annually</label>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                className="btn btn-accent btn-lg btn-full"
                onClick={calculateSavings}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    Calculating...
                  </>
                ) : (
                  'Estimate My Savings'
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className={`calculator-results ${showResults ? 'visible' : ''}`}>
            {results ? (
              <div className="results-content">
                <div className="results-header">
                  <h3>Your Tax Savings Potential</h3>
                  <div className="total-savings">
                    <div className="savings-amount">
                      {formatCurrency(results.total_estimated_savings)}
                    </div>
                    <div className="savings-label">Estimated Annual Savings</div>
                  </div>
                </div>

                {results.matched_strategies && results.matched_strategies.length > 0 ? (
                  <div className="strategies-list">
                    <h4>Recommended Strategies ({results.matched_strategies.length})</h4>
                    {results.matched_strategies.map((strategy, index) => (
                      <div key={index} className="strategy-item">
                        <div className="strategy-header">
                          <h5 className="strategy-name">{strategy.strategy}</h5>
                          <div className="strategy-savings">
                            {formatCurrency(strategy.impact_value)}
                          </div>
                        </div>
                        <p className="strategy-description">{strategy.description}</p>
                        <div className="strategy-actions">
                          <Link to={`/glossary/${strategy.glossary?.[0]?.toLowerCase()}`} className="btn btn-outline btn-sm">
                            Learn More
                          </Link>
                          <Link to="/ai-upsell" className="btn btn-primary btn-sm">
                            Ask AI
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-strategies">
                    <h4>Limited Strategies Found</h4>
                    <p>Based on your inputs, there are fewer targeted strategies available. Consider exploring our comprehensive courses for general tax optimization techniques.</p>
                    <Link to="/" className="btn btn-primary">
                      Browse Courses
                    </Link>
                  </div>
                )}

                <div className="results-actions">
                  <button className="btn btn-outline" onClick={resetCalculator}>
                    Calculate Again
                  </button>
                  <Link to="/strategy-builder" className="btn btn-accent">
                    Get Detailed Strategy Plan
                  </Link>
                </div>

                <div className="disclaimer">
                  <p>
                    <strong>Disclaimer:</strong> These are estimates for educational purposes only. 
                    Actual savings depend on your specific circumstances and proper implementation. 
                    Consult a tax professional before making any decisions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="results-placeholder">
                <div className="placeholder-icon">📊</div>
                <h4>Ready to Calculate</h4>
                <p>Fill out the form to get your personalized tax savings estimate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .tax-calculator-page {
          min-height: 100vh;
        }

        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          background: var(--brand-accent);
          color: white;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          margin: var(--space-md) 0;
        }

        .badge-icon {
          font-size: 1rem;
        }

        .calculator-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2xl);
          margin: var(--space-2xl) 0;
        }

        .calculator-inputs {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: 0 4px 6px var(--shadow-light);
          height: fit-content;
        }

        .input-section h3 {
          color: var(--brand-primary);
          margin-bottom: var(--space-xl);
          text-align: center;
        }

        .form-group {
          margin-bottom: var(--space-lg);
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .required {
          color: var(--brand-error);
        }

        .form-help {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
        }

        .input-wrapper {
          position: relative;
        }

        .input-prefix {
          position: absolute;
          left: var(--space-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          font-weight: 600;
        }

        .form-input {
          width: 100%;
          padding: var(--space-md);
          padding-left: var(--space-xl);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--brand-primary);
        }

        .form-select {
          width: 100%;
          padding: var(--space-md);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-md);
        }

        .checkbox-card {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checkbox-card:hover {
          border-color: var(--brand-accent);
        }

        .checkbox-card.selected {
          border-color: var(--brand-accent);
          background: var(--brand-accent);
          color: white;
        }

        .checkbox-indicator {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-color);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .checkbox-card.selected .checkbox-indicator {
          border-color: white;
          background: white;
          color: var(--brand-accent);
        }

        .toggle-group {
          display: flex;
          gap: var(--space-sm);
        }

        .toggle-btn {
          flex: 1;
          padding: var(--space-md);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-btn.active {
          border-color: var(--brand-accent);
          background: var(--brand-accent);
          color: white;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .form-sublabel {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-xs);
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .checkbox-item input {
          width: 16px;
          height: 16px;
        }

        .btn-full {
          width: 100%;
        }

        .btn-lg {
          padding: var(--space-lg) var(--space-xl);
          font-size: 1.1rem;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: var(--space-sm);
        }

        .calculator-results {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: 0 4px 6px var(--shadow-light);
          height: fit-content;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .calculator-results.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .results-placeholder {
          text-align: center;
          padding: var(--space-2xl);
          color: var(--text-secondary);
        }

        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: var(--space-lg);
        }

        .results-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .results-header h3 {
          color: var(--brand-primary);
          margin-bottom: var(--space-lg);
        }

        .total-savings {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .savings-amount {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: var(--space-sm);
        }

        .savings-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .strategies-list {
          margin: var(--space-xl) 0;
        }

        .strategies-list h4 {
          color: var(--brand-primary);
          margin-bottom: var(--space-lg);
        }

        .strategy-item {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
          margin-bottom: var(--space-md);
        }

        .strategy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-md);
        }

        .strategy-name {
          color: var(--brand-primary);
          font-size: 1.1rem;
          margin: 0;
          flex: 1;
        }

        .strategy-savings {
          background: var(--brand-success);
          color: white;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .strategy-description {
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
          line-height: 1.5;
        }

        .strategy-actions {
          display: flex;
          gap: var(--space-sm);
        }

        .btn-sm {
          padding: var(--space-xs) var(--space-md);
          font-size: 0.9rem;
        }

        .results-actions {
          display: flex;
          gap: var(--space-md);
          margin: var(--space-xl) 0;
          justify-content: center;
        }

        .disclaimer {
          background: var(--bg-tertiary);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .no-strategies {
          text-align: center;
          padding: var(--space-xl);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .calculator-layout {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .checkbox-grid {
            grid-template-columns: 1fr;
          }

          .strategy-header {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .strategy-actions {
            flex-direction: column;
          }

          .results-actions {
            flex-direction: column;
          }

          .savings-amount {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default TaxCalculatorPage;
