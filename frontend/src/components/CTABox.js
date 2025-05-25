import React from 'react';
import { Link } from 'react-router-dom';

function CTABox({ user, hasAIAccess = false }) {
  // Don't show if user has AI access
  if (hasAIAccess) return null;

  return (
    <div className="cta-box">
      <div className="cta-content">
        <div className="cta-icon">🤖</div>
        <div className="cta-text">
          <h4>Your AI Tax Planner Awaits</h4>
          <p>Ask tax questions tailored to your situation. Save time. Save money. Never be confused again.</p>
        </div>
        <div className="cta-action">
          <Link to="/ai-upsell" className="btn btn-accent">
            Unlock AI Assistant
          </Link>
        </div>
      </div>

      <style jsx>{`
        .cta-box {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          margin: var(--space-lg) 0;
          box-shadow: 0 4px 6px var(--shadow-light);
          transition: all 0.3s ease;
        }

        .cta-box:hover {
          box-shadow: 0 8px 16px var(--shadow-medium);
          transform: translateY(-2px);
        }

        .cta-content {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }

        .cta-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .cta-text {
          flex: 1;
        }

        .cta-text h4 {
          margin: 0 0 var(--space-sm) 0;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .cta-text p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.4;
        }

        .cta-action {
          flex-shrink: 0;
        }

        .cta-action .btn {
          background: var(--premium-gold);
          color: var(--text-primary);
          font-weight: 700;
          padding: var(--space-sm) var(--space-lg);
          white-space: nowrap;
        }

        .cta-action .btn:hover {
          background: #f59e0b;
          transform: scale(1.05);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .cta-content {
            flex-direction: column;
            text-align: center;
            gap: var(--space-md);
          }

          .cta-action .btn {
            padding: var(--space-md) var(--space-xl);
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .cta-box {
            padding: var(--space-md);
          }

          .cta-text h4 {
            font-size: 1.1rem;
          }

          .cta-text p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CTABox;
