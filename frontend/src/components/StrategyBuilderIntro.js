import React from 'react';
import { Link } from 'react-router-dom';

function StrategyBuilderIntro({ hasAccess, user, onStartWizard }) {
  if (!hasAccess) {
    return (
      <div>
        {/* Header */}
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Tax Strategy Builder</h1>
            <p className="page-subtitle">
              Personalized tax strategies for your unique situation
            </p>
          </div>
        </div>

        {/* Teaser Version for Non-Purchasers */}
        <div className="container">
          <div className="intro-content">
            <div className="intro-grid">
              <div className="intro-text">
                <h2>Build Your Tax Escape Plan</h2>
                <p className="intro-subtitle">
                  Take this short assessment to uncover personalized, IRS-approved strategies 
                  that can help you save thousands in taxes—legally and confidently.
                </p>
                
                <div className="intro-description">
                  <p>
                    We'll ask a few quick questions about your income, business structure, and goals. 
                    In less than 2 minutes, you'll get a personalized Tax Strategy Map tailored to your situation.
                  </p>
                  <p><strong>No guesswork. No jargon. Just the moves that matter for you.</strong></p>
                </div>

                <div className="benefits-list blurred">
                  <h4>What You'll Get:</h4>
                  <ul>
                    <li>Tax strategies tailored to your income and lifestyle</li>
                    <li>Estimated savings for each strategy</li>
                    <li>Direct links to modules and glossary terms</li>
                    <li>Optional: Ask our AI Assistant how to apply them (if unlocked)</li>
                  </ul>
                </div>

                <div className="unlock-prompt">
                  <h3>🔒 Unlock the Tax Strategy Builder</h3>
                  <p>Get full access by enrolling in a premium course.</p>
                  <Link to="/" className="btn btn-accent btn-lg">
                    Unlock Now – View Premium Courses
                  </Link>
                </div>
              </div>

              <div className="intro-visual">
                <div className="strategy-preview">
                  <div className="preview-header">
                    <h4>Your Personalized Strategy Map</h4>
                  </div>
                  <div className="preview-content blurred">
                    <div className="strategy-card">
                      <div className="strategy-title">S Corp Salary Optimization</div>
                      <div className="strategy-impact">Save $8K–$12K/year</div>
                    </div>
                    <div className="strategy-card">
                      <div className="strategy-title">QBI Deduction</div>
                      <div className="strategy-impact">Save $10K/year</div>
                    </div>
                    <div className="strategy-card">
                      <div className="strategy-title">Home Office Deduction</div>
                      <div className="strategy-impact">Save $2K–$4K/year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Build Your Tax Escape Plan</h1>
          <p className="page-subtitle">
            Take this short assessment to uncover personalized, IRS-approved strategies 
            that can help you save thousands in taxes—legally and confidently.
          </p>
        </div>
      </div>

      {/* Premium User Version */}
      <div className="container">
        <div className="intro-content">
          <div className="intro-grid">
            <div className="intro-text">
              <div className="intro-description">
                <p>
                  We'll ask a few quick questions about your income, business structure, and goals. 
                  In less than 2 minutes, you'll get a personalized Tax Strategy Map tailored to your situation.
                </p>
                <p><strong>No guesswork. No jargon. Just the moves that matter for you.</strong></p>
              </div>

              <div className="benefits-list">
                <h4>What You'll Get:</h4>
                <ul>
                  <li>✓ Tax strategies tailored to your income and lifestyle</li>
                  <li>✓ Estimated savings for each strategy</li>
                  <li>✓ Direct links to modules and glossary terms</li>
                  <li>✓ Optional: Ask our AI Assistant how to apply them (if unlocked)</li>
                </ul>
              </div>

              <div className="progress-indicator">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <p className="progress-text">You're 5 steps from your personalized strategy</p>
              </div>

              <button 
                className="btn btn-accent btn-hero"
                onClick={onStartWizard}
              >
                Start My Tax Strategy Assessment
              </button>

              <div className="info-tooltip">
                <p>
                  💡 <strong>Why do we ask these questions?</strong><br/>
                  Because your entity type, income, and goals determine which strategies you can use. 
                  This ensures your plan is accurate—not generic.
                </p>
              </div>
            </div>

            <div className="intro-visual">
              <div className="strategy-map-illustration">
                <div className="map-header">
                  <h4>🗺️ Your Strategy Roadmap</h4>
                </div>
                <div className="map-content">
                  <div className="map-step">
                    <div className="step-number">1</div>
                    <div className="step-text">Income Analysis</div>
                  </div>
                  <div className="map-arrow">→</div>
                  <div className="map-step">
                    <div className="step-number">2</div>
                    <div className="step-text">Entity Optimization</div>
                  </div>
                  <div className="map-arrow">→</div>
                  <div className="map-step">
                    <div className="step-number">3</div>
                    <div className="step-text">Strategy Matching</div>
                  </div>
                  <div className="map-arrow">→</div>
                  <div className="map-step">
                    <div className="step-number">4</div>
                    <div className="step-text">Savings Plan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .intro-content {
          margin: var(--space-2xl) 0;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2xl);
          align-items: start;
        }

        .intro-text h2 {
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-lg);
          font-weight: 800;
        }

        .intro-subtitle {
          font-size: 1.3rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
          line-height: 1.4;
        }

        .intro-description {
          margin-bottom: var(--space-xl);
        }

        .intro-description p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
        }

        .benefits-list {
          background: var(--card-bg);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
          box-shadow: 0 2px 4px var(--shadow-light);
        }

        .benefits-list.blurred {
          position: relative;
          filter: blur(3px);
          pointer-events: none;
        }

        .benefits-list h4 {
          color: var(--brand-primary);
          margin-bottom: var(--space-md);
        }

        .benefits-list ul {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          padding: var(--space-sm) 0;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .progress-indicator {
          margin-bottom: var(--space-xl);
        }

        .progress-text {
          text-align: center;
          color: var(--text-secondary);
          margin-top: var(--space-sm);
          font-size: 0.9rem;
        }

        .btn-hero {
          width: 100%;
          font-size: 1.2rem;
          padding: var(--space-lg) var(--space-xl);
          font-weight: 700;
          margin-bottom: var(--space-lg);
        }

        .info-tooltip {
          background: var(--bg-tertiary);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .unlock-prompt {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          text-align: center;
          margin-top: var(--space-xl);
        }

        .unlock-prompt h3 {
          margin: 0 0 var(--space-md) 0;
        }

        .unlock-prompt p {
          margin: 0 0 var(--space-lg) 0;
          opacity: 0.9;
        }

        .strategy-preview, .strategy-map-illustration {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          box-shadow: 0 4px 6px var(--shadow-light);
        }

        .preview-header, .map-header {
          text-align: center;
          margin-bottom: var(--space-lg);
          color: var(--brand-primary);
        }

        .preview-content.blurred {
          filter: blur(2px);
          position: relative;
        }

        .strategy-card {
          background: var(--bg-tertiary);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-md);
        }

        .strategy-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .strategy-impact {
          color: var(--brand-success);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .map-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          align-items: center;
        }

        .map-step {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          background: var(--bg-tertiary);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          width: 100%;
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

        .step-text {
          font-weight: 600;
          color: var(--text-primary);
        }

        .map-arrow {
          color: var(--brand-primary);
          font-size: 1.5rem;
          font-weight: 700;
          transform: rotate(90deg);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .intro-text h2 {
            font-size: 2rem;
          }

          .intro-subtitle {
            font-size: 1.1rem;
          }

          .map-content {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .map-arrow {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

export default StrategyBuilderIntro;
