import React from 'react';

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Melissa C.",
      occupation: "Tech Executive (W-2)",
      avatar: "MC",
      quote: "I've taken tax courses before, but the AI assistant changed the game. I got clear, personal answers about stock options and deductions in seconds. I'm saving over $9,000 this year—and I finally understand how."
    },
    {
      name: "Andre J.",
      occupation: "Small Business Owner",
      avatar: "AJ",
      quote: "It's like having a CPA in your pocket. I asked about paying my kids through the business and it walked me through the entire strategy. This tool alone is worth more than the course price."
    },
    {
      name: "Veronica S.",
      occupation: "Real Estate Professional",
      avatar: "VS",
      quote: "I was skeptical, but this assistant gave me real insight into depreciation and cost segregation. The glossary terms are solid—but the AI actually explains how it applies to me."
    },
    {
      name: "Dr. Kevin M.",
      occupation: "Surgeon with 1099 Income",
      avatar: "KM",
      quote: "I've paid for tax planning sessions that felt less clear than what I got from the AI assistant. It remembered my details, explained strategies, and even referenced IRC code I could ask my advisor about."
    },
    {
      name: "Anonymous",
      occupation: "High-Income Professional",
      avatar: "AN",
      quote: "Ask unlimited questions. Get answers tailored to you. It's like ChatGPT—but trained for high-level tax planning. Absolute no-brainer."
    }
  ];

  return (
    <div className="testimonials-section">
      <div className="section-header">
        <h2>What Our Members Say</h2>
        <p>Real results from high-income professionals using the AI Tax Planner</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="quote-icon">
              "
            </div>
            <div className="testimonial-content">
              <p className="quote-text">
                {testimonial.quote}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.avatar}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-occupation">{testimonial.occupation}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .testimonials-section {
          margin: var(--space-2xl) 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--brand-primary);
          margin: 0 0 var(--space-md) 0;
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }

        .testimonial-card {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: 0 4px 6px var(--shadow-light);
          transition: all 0.3s ease;
          position: relative;
          border: 2px solid transparent;
        }

        .testimonial-card:hover {
          box-shadow: 0 8px 16px var(--shadow-medium);
          transform: translateY(-2px);
          border-color: var(--brand-accent);
        }

        .quote-icon {
          position: absolute;
          top: var(--space-md);
          right: var(--space-lg);
          font-size: 4rem;
          color: var(--brand-accent);
          opacity: 0.3;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonial-content {
          position: relative;
          z-index: 1;
        }

        .quote-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 var(--space-lg) 0;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .author-occupation {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Featured testimonial styling for first item */
        .testimonial-card:first-child {
          grid-column: span 2;
          background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%);
          color: white;
        }

        .testimonial-card:first-child .quote-text {
          color: white;
          font-size: 1.3rem;
        }

        .testimonial-card:first-child .author-name {
          color: white;
        }

        .testimonial-card:first-child .author-occupation {
          color: rgba(255, 255, 255, 0.8);
        }

        .testimonial-card:first-child .author-avatar {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .testimonial-card:first-child .quote-icon {
          color: rgba(255, 255, 255, 0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .testimonial-card:first-child {
            grid-column: span 1;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .testimonial-card {
            padding: var(--space-lg);
          }

          .quote-text {
            font-size: 1rem;
          }

          .testimonial-card:first-child .quote-text {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .testimonial-card {
            padding: var(--space-md);
          }

          .quote-icon {
            font-size: 3rem;
            top: var(--space-sm);
            right: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}

export default TestimonialsSection;
