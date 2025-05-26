import React, { useState } from 'react';

function StrategyBuilderWizard({ onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    income_types: [],
    entity_type: '',
    lifestyle_factors: [],
    goals: []
  });

  const steps = [
    {
      title: "Income Types",
      subtitle: "Select all that apply to your situation",
      options: [
        { value: "W-2", label: "W-2 Employee Income", description: "Traditional employment with employer withholding" },
        { value: "1099", label: "1099 Contractor Income", description: "Independent contractor or freelance work" },
        { value: "Business Owner", label: "Business Owner", description: "You own and operate a business" },
        { value: "Real Estate", label: "Real Estate Income", description: "Rental properties or real estate investments" },
        { value: "Investments", label: "Investment Income", description: "Stocks, bonds, capital gains, dividends" },
        { value: "Crypto", label: "Cryptocurrency", description: "Digital currency trading or mining" }
      ],
      type: "multi-select"
    },
    {
      title: "Entity Type",
      subtitle: "What's your primary business structure?",
      options: [
        { value: "Sole Proprietorship", label: "Sole Proprietorship", description: "Individual business ownership" },
        { value: "LLC", label: "LLC", description: "Limited Liability Company" },
        { value: "S Corp", label: "S Corporation", description: "S Corp election for tax benefits" },
        { value: "C Corp", label: "C Corporation", description: "Traditional corporation structure" }
      ],
      type: "single-select"
    },
    {
      title: "Lifestyle Factors",
      subtitle: "Select all that describe your situation",
      options: [
        { value: "Minor children", label: "Minor Children", description: "Children under 18 years old" },
        { value: "Home office", label: "Home Office", description: "You work from home regularly" },
        { value: "Charitable giving", label: "Charitable Giving", description: "You donate to charities regularly" },
        { value: "Rental properties", label: "Rental Properties", description: "You own rental real estate" },
        { value: "Business travel", label: "Business Travel", description: "Regular travel for business purposes" }
      ],
      type: "multi-select"
    },
    {
      title: "Tax Goals",
      subtitle: "What are your primary tax objectives?",
      options: [
        { value: "Pay less now", label: "Pay Less Now", description: "Reduce current year tax liability" },
        { value: "Build wealth", label: "Build Wealth", description: "Long-term wealth accumulation strategies" },
        { value: "Reduce audit risk", label: "Reduce Audit Risk", description: "Minimize IRS audit exposure" },
        { value: "Exit planning", label: "Exit Planning", description: "Planning to sell business or assets" }
      ],
      type: "multi-select"
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleOptionChange = (optionValue) => {
    const stepKey = ['income_types', 'entity_type', 'lifestyle_factors', 'goals'][currentStep - 1];
    
    if (currentStepData.type === 'multi-select') {
      const currentValues = answers[stepKey] || [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      
      setAnswers(prev => ({
        ...prev,
        [stepKey]: newValues
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [stepKey]: optionValue
      }));
    }
  };

  const isStepValid = () => {
    const stepKey = ['income_types', 'entity_type', 'lifestyle_factors', 'goals'][currentStep - 1];
    const value = answers[stepKey];
    
    if (currentStepData.type === 'multi-select') {
      return Array.isArray(value) && value.length > 0;
    } else {
      return value && value.length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const getSelectedValue = (optionValue) => {
    const stepKey = ['income_types', 'entity_type', 'lifestyle_factors', 'goals'][currentStep - 1];
    const value = answers[stepKey];
    
    if (currentStepData.type === 'multi-select') {
      return Array.isArray(value) && value.includes(optionValue);
    } else {
      return value === optionValue;
    }
  };

  return (
    <div className="strategy-wizard">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Tax Strategy Assessment</h1>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Step {currentStep} of {steps.length}
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

          <div className="options-grid">
            {currentStepData.options.map((option, index) => (
              <div 
                key={index}
                className={`option-card ${getSelectedValue(option.value) ? 'selected' : ''}`}
                onClick={() => handleOptionChange(option.value)}
              >
                <div className="option-header">
                  <div className="option-checkbox">
                    {getSelectedValue(option.value) && (
                      <span className="checkmark">✓</span>
                    )}
                  </div>
                  <h4 className="option-label">{option.label}</h4>
                </div>
                <p className="option-description">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="wizard-navigation">
            <button 
              className="btn btn-outline"
              onClick={handlePrevious}
            >
              {currentStep === 1 ? '← Back to Intro' : '← Previous'}
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
              disabled={!isStepValid()}
            >
              {currentStep === steps.length ? 'Get My Strategies' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .strategy-wizard {
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

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }

        .option-card {
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
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

        .option-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .option-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid var(--border-color);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .option-card.selected .option-checkbox {
          background: white;
          border-color: white;
        }

        .checkmark {
          color: var(--brand-primary);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .option-label {
          margin: 0;
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .wizard-content {
            padding: 0 var(--space-md);
          }

          .step-header h2 {
            font-size: 2rem;
          }

          .options-grid {
            grid-template-columns: 1fr;
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

export default StrategyBuilderWizard;
