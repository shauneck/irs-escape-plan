import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../App';

function StrategyBuilderResults({ strategies, userInputs, user, onStartOver }) {
  const api = useContext(APIContext);

  const formatInputs = (inputs) => {
    return {
      'Income Types': inputs.income_types?.join(', ') || 'None selected',
      'Entity Type': inputs.entity_type || 'Not specified',
      'Lifestyle Factors': inputs.lifestyle_factors?.join(', ') || 'None selected',
      'Goals': inputs.goals?.join(', ') || 'None selected'
    };
  };

  const formattedInputs = formatInputs(userInputs);

  const handleAskAI = async (strategy) => {
    // This would integrate with AI assistant if available
    // For now, redirect to AI upsell
    window.location.href = '/ai-upsell';
  };

  return (
    <div className="strategy-results">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Your Tax Strategy Plan</h1>
          <p className="page-subtitle">
            Based on your responses, here are the strategies that can save you the most money
          </p>
        </div>
      </div>

      <div className="container">
        {/* User Summary */}
        <div className="user-summary">
          <h3>Your Profile Summary</h3>
          <div className="summary-grid">
            {Object.entries(formattedInputs).map(([key, value]) => (
              <div key={key} className="summary-item">
                <div className="summary-label">{key}</div>
                <div className="summary-value">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {strategies.length > 0 ? (
          <div className="strategies-section">
            <div className="section-header">
              <h2>🎯 Recommended Tax Strategies</h2>
              <p>We found {strategies.length} strategies that match your situation. Strategies are ranked by relevance to your profile.</p>
            </div>

            <div className="strategies-grid">
              {strategies.map((strategy, index) => (
                <div key={index} className="strategy-card">
                  <div className="strategy-header">
                    <div className="strategy-rank">#{index + 1}</div>
                    <div className="strategy-title-section">
                      <h4 className="strategy-title">{strategy.strategy}</h4>
                      <div className="strategy-impact">{strategy.impact}</div>
                    </div>
                    <div className="match-score">
                      {strategy.match_score || 1} matches
                    </div>
                  </div>

                  <div className="strategy-description">
                    <p>{strategy.description}</p>
                  </div>

                  <div className="strategy-links">
                    <div className="course-link">
                      <strong>📚 Learn More:</strong> {strategy.module}
                    </div>
                    
                    {strategy.glossary && strategy.glossary.length > 0 && (
                      <div className="glossary-links">
                        <strong>📖 Glossary Terms:</strong>
                        <div className="glossary-tags">
                          {strategy.glossary.map((term, termIndex) => (
                            <Link 
                              key={termIndex}
                              to={`/glossary/${term.toLowerCase().replace(/\s+/g, '_')}`}
                              className="glossary-tag"
                            >
                              {term}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="strategy-actions">
                    <Link to="/" className="btn btn-outline">
                      Find Related Course
                    </Link>
                    <button 
                      className="btn btn-accent"
                      onClick={() => handleAskAI(strategy)}
                    >
                      Ask AI How This Applies to Me
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-strategies">
            <div className="no-strategies-content">
              <h3>🤔 No Specific Strategies Found</h3>
              <p>
                Based on your current inputs, we couldn't find highly targeted strategies. 
                This might mean you need different entity structuring or have unique circumstances.
              </p>
              <div className="suggestions">
                <h4>Suggestions:</h4>
                <ul>
                  <li>Consider consulting with a tax professional for your specific situation</li>
                  <li>Review our comprehensive courses for general tax strategies</li>
                  <li>Try the assessment again with different entity types</li>
                </ul>
              </div>
              <div className="fallback-actions">
                <Link to="/" className="btn btn-primary">
                  Browse All Courses
                </Link>
                <button className="btn btn-outline" onClick={onStartOver}>
                  Try Assessment Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Actions */}
        <div className="results-summary">
          <div className="summary-card">
            <h3>🎉 Next Steps</h3>
            <div className="next-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Review Your Strategies</h5>
                  <p>Each strategy above includes estimated savings and implementation details.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Take Relevant Courses</h5>
                  <p>Deep-dive into the specific modules mentioned in your strategy cards.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Get Personalized Guidance</h5>
                  <p>Use our AI Assistant for implementation questions specific to your situation.</p>
                </div>
              </div>
            </div>

            <div className="summary-actions">
              <button className="btn btn-outline" onClick={onStartOver}>
                ← Start Over
              </button>
              <Link to="/ai-upsell" className="btn btn-accent">
                Get AI Implementation Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .strategy-results {
          min-height: 100vh;
        }

        .user-summary {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          margin-bottom: var(--space-2xl);
          box-shadow: 0 2px 4px var(--shadow-light);
        }

        .user-summary h3 {
          color: var(--brand-primary);
          margin-bottom: var(--space-lg);
          text-align: center;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-lg);
        }

        .summary-item {
          text-align: center;
        }

        .summary-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-xs);
          font-weight: 600;
        }

        .summary-value {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .strategies-section {
          margin-bottom: var(--space-2xl);
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-md);
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .strategies-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .strategy-card {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: 0 4px 6px var(--shadow-light);
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .strategy-card:hover {
          border-color: var(--brand-accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px var(--shadow-medium);
        }

        .strategy-header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        .strategy-rank {
          background: var(--brand-primary);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .strategy-title-section {
          flex: 1;
        }

        .strategy-title {
          color: var(--brand-primary);
          margin: 0 0 var(--space-xs) 0;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .strategy-impact {
          color: var(--brand-success);
          font-weight: 700;
          font-size: 1.1rem;
        }

        .match-score {
          background: var(--brand-accent);
          color: white;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .strategy-description {
          margin-bottom: var(--space-lg);
        }

        .strategy-description p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0;
        }

        .strategy-links {
          background: var(--bg-tertiary);
          padding: var(--space-lg);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-lg);
        }

        .course-link {
          margin-bottom: var(--space-md);
          font-size: 0.95rem;
        }

        .glossary-links {
          font-size: 0.95rem;
        }

        .glossary-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-top: var(--space-xs);
        }

        .glossary-tag {
          background: var(--brand-primary);
          color: white;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .glossary-tag:hover {
          background: var(--brand-accent);
          transform: scale(1.05);
        }

        .strategy-actions {
          display: flex;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .strategy-actions .btn {
          flex: 1;
          min-width: 150px;
        }

        .no-strategies {
          text-align: center;
          margin: var(--space-2xl) 0;
        }

        .no-strategies-content {
          background: var(--card-bg);
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
          max-width: 600px;
          margin: 0 auto;
        }

        .suggestions {
          text-align: left;
          margin: var(--space-xl) 0;
        }

        .suggestions ul {
          margin-left: var(--space-lg);
        }

        .suggestions li {
          margin-bottom: var(--space-sm);
        }

        .fallback-actions {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          margin-top: var(--space-xl);
        }

        .results-summary {
          margin-top: var(--space-2xl);
        }

        .summary-card {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .summary-card h3 {
          margin-bottom: var(--space-xl);
          font-size: 2rem;
        }

        .next-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
          text-align: left;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--premium-gold);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content h5 {
          margin: 0 0 var(--space-xs) 0;
          font-weight: 700;
        }

        .step-content p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .summary-actions {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
        }

        .summary-actions .btn {
          padding: var(--space-md) var(--space-xl);
          font-size: 1.1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .strategy-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-md);
          }

          .strategy-actions {
            flex-direction: column;
          }

          .strategy-actions .btn {
            width: 100%;
          }

          .next-steps {
            grid-template-columns: 1fr;
          }

          .summary-actions {
            flex-direction: column;
          }

          .fallback-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default StrategyBuilderResults;
