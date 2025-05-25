import React from 'react';

function FeatureComparisonTable() {
  const features = [
    {
      name: "Full course video and lesson access",
      base: true,
      premium: true
    },
    {
      name: "Story-based glossary with definitions",
      base: true,
      premium: true
    },
    {
      name: "Progress tracking",
      base: true,
      premium: true
    },
    {
      name: "Personalized AI tax Q&A (GPT assistant)",
      base: false,
      premium: true
    },
    {
      name: "Saved chat history for tax planning",
      base: false,
      premium: true
    },
    {
      name: "Context-aware follow-up questions",
      base: false,
      premium: true
    },
    {
      name: "Voice assistant (coming soon)",
      base: false,
      premium: true
    }
  ];

  return (
    <div className="feature-comparison-table">
      <div className="table-container">
        <div className="table-header">
          <div className="column-header base-column">
            <h3>Base Course Access</h3>
            <p>Course purchase only</p>
          </div>
          <div className="column-header premium-column">
            <h3>Course + AI Tax Planner</h3>
            <p>Complete tax mastery solution</p>
            <div className="recommended-badge">
              RECOMMENDED
            </div>
          </div>
        </div>
        
        <div className="table-body">
          {features.map((feature, index) => (
            <div key={index} className="feature-row">
              <div className="feature-name">
                {feature.name}
              </div>
              <div className="feature-availability">
                <div className={`feature-cell ${feature.base ? 'available' : 'unavailable'}`}>
                  {feature.base ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="cross">✗</span>
                  )}
                </div>
                <div className={`feature-cell ${feature.premium ? 'available' : 'unavailable'}`}>
                  {feature.premium ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="cross">✗</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="table-footer">
          <div className="column-footer base-column">
            <div className="price">Included with course</div>
            <button className="btn btn-outline" disabled>
              Current Access
            </button>
          </div>
          <div className="column-footer premium-column">
            <div className="price">
              <span className="price-main">$297</span> one-time
              <span className="price-alt">or $49/month</span>
            </div>
            <button className="btn btn-accent btn-lg">
              Unlock AI Assistant
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-comparison-table {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 8px 16px var(--shadow-medium);
          margin: var(--space-2xl) 0;
        }

        .table-container {
          width: 100%;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          padding: var(--space-xl);
          text-align: center;
        }

        .column-header {
          position: relative;
        }

        .column-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 var(--space-sm) 0;
        }

        .column-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .recommended-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--premium-gold);
          color: var(--text-primary);
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .table-body {
          background: var(--card-bg);
        }

        .feature-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          border-bottom: 1px solid var(--border-color);
          padding: var(--space-lg);
          align-items: center;
        }

        .feature-row:last-child {
          border-bottom: none;
        }

        .feature-name {
          font-weight: 500;
          color: var(--text-primary);
          padding-right: var(--space-lg);
        }

        .feature-availability {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-lg);
          text-align: center;
        }

        .feature-cell {
          padding: var(--space-sm);
          border-radius: var(--radius-sm);
          font-size: 1.2rem;
          font-weight: 700;
        }

        .feature-cell.available {
          background: var(--brand-success);
          color: white;
        }

        .feature-cell.unavailable {
          background: var(--bg-tertiary);
          color: var(--text-muted);
        }

        .checkmark {
          font-size: 1.2rem;
        }

        .cross {
          font-size: 1rem;
          opacity: 0.5;
        }

        .table-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg-tertiary);
          padding: var(--space-xl);
          text-align: center;
          gap: var(--space-lg);
        }

        .price {
          margin-bottom: var(--space-lg);
        }

        .price-main {
          font-size: 2rem;
          font-weight: 800;
          color: var(--brand-accent);
          display: block;
        }

        .price-alt {
          font-size: 1rem;
          color: var(--text-secondary);
          display: block;
          margin-top: var(--space-xs);
        }

        .btn-lg {
          padding: var(--space-md) var(--space-xl);
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .table-header {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .recommended-badge {
            position: static;
            transform: none;
            margin-top: var(--space-sm);
            display: inline-block;
          }

          .feature-row {
            grid-template-columns: 1fr;
            gap: var(--space-md);
            text-align: center;
          }

          .feature-name {
            padding-right: 0;
            margin-bottom: var(--space-sm);
            font-weight: 600;
          }

          .feature-availability {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-sm);
          }

          .table-footer {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }

          .column-footer.base-column {
            order: 2;
          }

          .column-footer.premium-column {
            order: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default FeatureComparisonTable;
