import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../App';

function EntityWizardPage({ user }) {
  const api = useContext(APIContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    income_types: [],
    income_range: '',
    owner_type: '',
    goals: []
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "What type of income are you earning?",
      subtitle: "Select all that apply to your business activities",
      field: "income_types",
      type: "multi-select",
      options: [
        { value: "freelance", label: "Freelance or 1099 Work", icon: "💼" },
        { value: "consulting", label: "Consulting or Coaching", icon: "🎯" },
        { value: "real_estate", label: "Real Estate Rental Income", icon: "🏠" },
        { value: "investments", label: "Investment Partnerships", icon: "📈" },
        { value: "products", label: "Selling Products or Digital Offers", icon: "🛍️" },
        { value: "other", label: "Other Business Income", icon: "💡" }
      ]
    },
    {
      title: "What's your expected net income from this business?",
      subtitle: "Choose the range that best represents your annual business profit",
      field: "income_range",
      type: "single-select",
      options: [
        { value: "<$30K", label: "Less than $30,000", description: "Starting out or side business" },
        { value: "$30K-$75K", label: "$30,000 – $75,000", description: "Growing business or part-time focus" },
        { value: "$75K-$150K", label: "$75,000 – $150,000", description: "Established business or full-time" },
        { value: "$150K-$500K", label: "$150,000 – $500,000", description: "Successful business requiring optimization" },
        { value: "$500K+", label: "$500,000+", description: "High-revenue business needing advanced planning" }
      ]
    },
    {
      title: "Are you working alone or with others?",
      subtitle: "This affects entity structure and tax filing requirements",
      field: "owner_type",
      type: "single-select",
      options: [
        { value: "solo", label: "Just me (solo owner)", icon: "👤", description: "Single-member entity" },
        { value: "spouse", label: "Me and my spouse", icon: "👫", description: "Joint business ownership" },
        { value: "partners", label: "Me and business partners", icon: "👥", description: "Multiple unrelated owners" }
      ]
    },
    {
      title: "What's most important to you?",
      subtitle: "Select your top priorities for business structure",
      field: "goals",
      type: "multi-select",
      options: [
        { value: "minimize_taxes", label: "Minimizing taxes", icon: "💰" },
        { value: "keep_simple", label: "Keeping it simple", icon: "✅" },
        { value: "limit_liability", label: "Limiting liability", icon: "🛡️" },
        { value: "raising_money", label: "Raising money or scaling", icon: "📊" },
        { value: "flexible_pay", label: "Paying myself flexibly", icon: "💳" }
      ]
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleOptionChange = (value) => {
    const field = currentStepData.field;
    
    if (currentStepData.type === 'multi-select') {
      const currentValues = answers[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      setAnswers(prev => ({ ...prev, [field]: newValues }));
    } else {
      setAnswers(prev => ({ ...prev, [field]: value }));
    }
  };

  const isStepValid = () => {
    const field = currentStepData.field;
    const value = answers[field];
    
    if (currentStepData.type === 'multi-select') {
      return Array.isArray(value) && value.length > 0;
    } else {
      return value && value.length > 0;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await getRecommendation();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendation = async () => {
    if (!user) {
      alert('Please log in to get your entity recommendation');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/api/entity-structure-wizard', {
        user_email: user.email,
        ...answers
      });
      
      setRecommendation(response.recommendation);
      setCurrentStep(5); // Results step
    } catch (error) {
      console.error('Error getting recommendation:', error);
      alert('Error getting recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (value) => {
    const field = currentStepData.field;
    const fieldValue = answers[field];
    
    if (currentStepData.type === 'multi-select') {
      return Array.isArray(fieldValue) && fieldValue.includes(value);
    } else {
      return fieldValue === value;
    }
  };

  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < score ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const startOver = () => {
    setCurrentStep(1);
    setAnswers({
      income_types: [],
      income_range: '',
      owner_type: '',
      goals: []
    });
    setRecommendation(null);
  };

  if (currentStep === 5 && recommendation) {
    // Results Page
    return (
      <div className="entity-wizard-results">
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Your Entity Recommendation</h1>
            <p className="page-subtitle">
              Based on your business profile, here's our professional recommendation
            </p>
          </div>
        </div>

        <div className="container">
          <div className="recommendation-card">
            <div className="rec-header">
              <div className="rec-title">
                <h2>{recommendation.recommendation}</h2>
                <div className="impact-score">
                  <span className="score-label">Strategy Efficiency:</span>
                  <div className="stars">
                    {renderStars(recommendation.impact_score)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rec-content">
              <div className="rec-description">
                <h4>Why this structure?</h4>
                <p>{recommendation.description}</p>
              </div>

              <div className="rec-benefits">
                <div className="benefit-section">
                  <h4>💰 Tax Benefits</h4>
                  <p>{recommendation.tax_benefits}</p>
                </div>
                
                <div className="benefit-section">
                  <h4>⚠️ Important Considerations</h4>
                  <p>{recommendation.considerations}</p>
                </div>
              </div>

              {recommendation.suggested_modules && (
                <div className="suggested-modules">
                  <h4>📚 Recommended Learning</h4>
                  <div className="modules-list">
                    {recommendation.suggested_modules.map((module, index) => (
                      <div key={index} className="module-item">
                        <span className="module-name">{module}</span>
                        <Link to="/" className="btn btn-outline btn-sm">
                          Find Course
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rec-actions">
              <button className="btn btn-outline" onClick={startOver}>
                ← Start Over
              </button>
              <Link to="/ai-upsell" className="btn btn-accent">
                Ask AI About This Entity
              </Link>
              <Link to="/strategy-builder" className="btn btn-primary">
                Build Tax Strategy Plan
              </Link>
            </div>
          </div>

          {/* Summary Card */}
          <div className="summary-card">
            <h3>Your Business Profile</h3>
            <div className="profile-summary">
              <div className="summary-item">
                <strong>Income Types:</strong> {answers.income_types.join(', ')}
              </div>
              <div className="summary-item">
                <strong>Expected Income:</strong> {answers.income_range}
              </div>
              <div className="summary-item">
                <strong>Ownership:</strong> {answers.owner_type}
              </div>
              <div className="summary-item">
                <strong>Priorities:</strong> {answers.goals.join(', ')}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-card">
            <h3>🎯 Next Steps</h3>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Learn the Details</h5>
                  <p>Review the recommended courses to understand your entity structure deeply.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Get Professional Help</h5>
                  <p>Consult with an attorney or CPA for formation and ongoing compliance.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Plan Your Tax Strategy</h5>
                  <p>Use our Strategy Builder to identify specific tax optimization opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .entity-wizard-results {
            min-height: 100vh;
          }

          .recommendation-card {
            background: var(--card-bg);
            border-radius: var(--radius-xl);
            box-shadow: 0 8px 16px var(--shadow-medium);
            margin-bottom: var(--space-2xl);
            overflow: hidden;
          }

          .rec-header {
            background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
            color: white;
            padding: var(--space-2xl);
            text-align: center;
          }

          .rec-title h2 {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0 0 var(--space-lg) 0;
          }

          .impact-score {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-md);
            font-size: 1.1rem;
          }

          .stars {
            display: flex;
            gap: var(--space-xs);
          }

          .star {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.3);
          }

          .star.filled {
            color: var(--premium-gold);
          }

          .rec-content {
            padding: var(--space-2xl);
          }

          .rec-description {
            margin-bottom: var(--space-xl);
            text-align: center;
          }

          .rec-description h4 {
            color: var(--brand-primary);
            margin-bottom: var(--space-md);
          }

          .rec-description p {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .rec-benefits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
            margin-bottom: var(--space-xl);
          }

          .benefit-section {
            background: var(--bg-tertiary);
            padding: var(--space-lg);
            border-radius: var(--radius-lg);
          }

          .benefit-section h4 {
            color: var(--brand-primary);
            margin-bottom: var(--space-md);
          }

          .suggested-modules {
            background: var(--bg-tertiary);
            padding: var(--space-lg);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-xl);
          }

          .suggested-modules h4 {
            color: var(--brand-primary);
            margin-bottom: var(--space-lg);
          }

          .modules-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }

          .module-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-md);
            background: var(--card-bg);
            border-radius: var(--radius-md);
          }

          .module-name {
            font-weight: 600;
            color: var(--text-primary);
          }

          .btn-sm {
            padding: var(--space-xs) var(--space-md);
            font-size: 0.9rem;
          }

          .rec-actions {
            display: flex;
            gap: var(--space-lg);
            justify-content: center;
            padding: var(--space-xl);
            background: var(--bg-tertiary);
          }

          .summary-card, .next-steps-card {
            background: var(--card-bg);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            margin-bottom: var(--space-xl);
            box-shadow: 0 4px 6px var(--shadow-light);
          }

          .summary-card h3, .next-steps-card h3 {
            color: var(--brand-primary);
            margin-bottom: var(--space-lg);
            text-align: center;
          }

          .profile-summary {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-lg);
          }

          .summary-item {
            padding: var(--space-md);
            background: var(--bg-tertiary);
            border-radius: var(--radius-md);
          }

          .steps-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
          }

          .step-item {
            display: flex;
            align-items: flex-start;
            gap: var(--space-md);
          }

          .step-number {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--brand-accent);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
          }

          .step-content h5 {
            margin: 0 0 var(--space-xs) 0;
            color: var(--brand-primary);
          }

          .step-content p {
            margin: 0;
            color: var(--text-secondary);
          }

          @media (max-width: 768px) {
            .rec-title h2 {
              font-size: 2rem;
            }

            .rec-benefits {
              grid-template-columns: 1fr;
            }

            .rec-actions {
              flex-direction: column;
              align-items: center;
            }

            .profile-summary {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  // Wizard Steps
  return (
    <div className="entity-wizard">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Entity Structure Advisor</h1>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="wizard-content">
          <div className="step-header">
            <h2>{currentStepData.title}</h2>
            <p className="step-subtitle">{currentStepData.subtitle}</p>
          </div>

          <div className="options-container">
            {currentStepData.options.map((option, index) => (
              <div
                key={index}
                className={`option-card ${isSelected(option.value) ? 'selected' : ''}`}
                onClick={() => handleOptionChange(option.value)}
              >
                {option.icon && (
                  <div className="option-icon">{option.icon}</div>
                )}
                <div className="option-content">
                  <h4 className="option-label">{option.label}</h4>
                  {option.description && (
                    <p className="option-description">{option.description}</p>
                  )}
                </div>
                <div className="option-selector">
                  {isSelected(option.value) && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="wizard-navigation">
            <button 
              className="btn btn-outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>

            <div className="step-indicators">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`step-dot ${index + 1 <= currentStep ? 'active' : ''}`}
                />
              ))}
            </div>

            <button 
              className={`btn ${isStepValid() ? 'btn-accent' : 'btn-disabled'}`}
              onClick={handleNext}
              disabled={!isStepValid() || loading}
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Getting Recommendation...
                </>
              ) : (
                currentStep === steps.length ? 'Get Recommendation' : 'Next →'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .entity-wizard {
          min-height: 100vh;
        }

        .progress-indicator {
          max-width: 400px;
          margin: var(--space-lg) auto 0;
        }

        .progress-text {
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          margin-top: var(--space-sm);
          font-weight: 600;
        }

        .wizard-content {
          max-width: 800px;
          margin: var(--space-2xl) auto;
          padding: 0 var(--space-lg);
        }

        .step-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .step-header h2 {
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-md);
          font-weight: 700;
        }

        .step-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }

        .option-card {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .option-card:hover {
          border-color: var(--brand-accent);
          box-shadow: 0 4px 8px var(--shadow-light);
          transform: translateY(-2px);
        }

        .option-card.selected {
          border-color: var(--brand-accent);
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
        }

        .option-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .option-content {
          flex: 1;
        }

        .option-label {
          margin: 0 0 var(--space-xs) 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .option-description {
          margin: 0;
          font-size: 0.95rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        .option-card.selected .option-description {
          opacity: 0.9;
        }

        .option-selector {
          width: 32px;
          height: 32px;
          border: 2px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .option-card.selected .option-selector {
          background: white;
          border-color: white;
        }

        .checkmark {
          color: var(--brand-primary);
          font-weight: 700;
          font-size: 1.2rem;
        }

        .wizard-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-lg) 0;
          border-top: 1px solid var(--border-color);
        }

        .step-indicators {
          display: flex;
          gap: var(--space-sm);
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--border-color);
          transition: all 0.3s ease;
        }

        .step-dot.active {
          background: var(--brand-accent);
        }

        .btn-disabled {
          background: var(--text-muted);
          color: white;
          cursor: not-allowed;
        }

        .btn-disabled:hover {
          background: var(--text-muted);
          transform: none;
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

        @media (max-width: 768px) {
          .wizard-content {
            padding: 0 var(--space-md);
          }

          .step-header h2 {
            font-size: 2rem;
          }

          .option-card {
            flex-direction: column;
            text-align: center;
            gap: var(--space-md);
          }

          .wizard-navigation {
            flex-direction: column;
            gap: var(--space-lg);
          }

          .wizard-navigation > .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default EntityWizardPage;
