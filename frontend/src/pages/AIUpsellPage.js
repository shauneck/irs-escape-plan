import React from 'react';
import { Link } from 'react-router-dom';
import FeatureComparisonTable from '../components/FeatureComparisonTable';
import TestimonialsSection from '../components/TestimonialsSection';

function AIUpsellPage() {
  return (
    <div className="ai-upsell-page">
      {/* Hero Section */}
      <div className="upsell-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Unlock Your Personal AI Tax Planner
            </h1>
            <p className="hero-subtitle">
              Turn complex tax rules into simple strategies—powered by AI trained on real-world tax planning.
            </p>
            
            <div className="hero-overview">
              <p>
                The IRS Escape Plan gives you deep tax education through case-based courses. 
                But with our premium <strong>AI Tax Planner</strong>, you get personal, real-time help for your exact 
                financial situation—like having a tax strategist in your pocket.
              </p>
            </div>

            <div className="hero-cta">
              <button className="btn btn-accent btn-hero">
                Unlock Now – $297 one-time or $49/month
              </button>
              <p className="cta-subtext">
                ⚡ Instant access • 💬 Unlimited questions • 🔒 Secure & private
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="ai-preview-card">
              <div className="chat-preview">
                <div className="chat-header">
                  <div className="ai-avatar">🤖</div>
                  <div className="ai-info">
                    <div className="ai-name">AI Tax Planner</div>
                    <div className="ai-status">Ready to help</div>
                  </div>
                </div>
                <div className="chat-messages">
                  <div className="message user-message">
                    "I make $500K as a W-2 employee. What are the best tax strategies for my situation?"
                  </div>
                  <div className="message ai-message">
                    "Based on your $500K W-2 income, here are 3 high-impact strategies:

1. **Maximize pre-tax contributions** - $23,000 to 401(k) + $6,500 catch-up if 50+
2. **Consider backdoor Roth** conversion for tax-free growth
3. **Explore HSA maximization** - triple tax advantage

Would you like me to dive deeper into any of these strategies for your specific situation?"
                  </div>
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Value Proposition */}
        <div className="value-section">
          <h2>Why Add the AI Tax Planner?</h2>
          <div className="value-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h4>Personalized to You</h4>
              <p>Get strategies tailored to your exact income, business structure, and financial goals—not generic advice.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h4>Instant Answers</h4>
              <p>No more waiting for appointments or second-guessing. Ask complex tax questions and get expert-level responses immediately.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💰</div>
              <h4>Save Thousands</h4>
              <p>One tax strategy suggestion could save you more than the entire cost of this tool. Many users save $5,000+ in their first year.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🧠</div>
              <h4>Learn While You Plan</h4>
              <p>Every answer comes with explanations, so you understand the 'why' behind each strategy. Build your tax knowledge over time.</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <FeatureComparisonTable />

        {/* Use Cases */}
        <div className="use-cases-section">
          <h2>Perfect For Your Situation</h2>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="use-case-header">
                <div className="use-case-icon">💼</div>
                <h4>High-Income W-2 Employees</h4>
              </div>
              <ul>
                <li>Stock option strategies</li>
                <li>Backdoor Roth conversions</li>
                <li>HSA maximization</li>
                <li>State tax optimization</li>
              </ul>
            </div>
            
            <div className="use-case-card">
              <div className="use-case-header">
                <div className="use-case-icon">🏢</div>
                <h4>Business Owners</h4>
              </div>
              <ul>
                <li>Entity structure optimization</li>
                <li>Business expense strategies</li>
                <li>Quarterly payment planning</li>
                <li>Equipment depreciation</li>
              </ul>
            </div>
            
            <div className="use-case-card">
              <div className="use-case-header">
                <div className="use-case-icon">🏠</div>
                <h4>Real Estate Investors</h4>
              </div>
              <ul>
                <li>1031 exchange planning</li>
                <li>Cost segregation analysis</li>
                <li>REPS qualification</li>
                <li>Passive loss strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How is this different from ChatGPT?</h4>
              <p>Our AI is specifically trained on tax code, real-world case studies, and advanced planning strategies. It remembers your situation across conversations and provides context-aware advice that general AI tools can't match.</p>
            </div>
            
            <div className="faq-item">
              <h4>Is my information secure?</h4>
              <p>Absolutely. All conversations are encrypted and private. We never share your personal financial information, and you can delete your chat history at any time.</p>
            </div>
            
            <div className="faq-item">
              <h4>Can this replace my tax professional?</h4>
              <p>The AI Tax Planner is designed to work alongside your tax professional, not replace them. Use it for strategy exploration, quick questions, and preparation before meetings with your CPA or attorney.</p>
            </div>
            
            <div className="faq-item">
              <h4>What if I'm not satisfied?</h4>
              <p>We offer a 30-day money-back guarantee. If the AI Tax Planner doesn't provide value for your situation, we'll refund your purchase—no questions asked.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="final-cta-section">
          <div className="cta-card">
            <h2>Ready to Unlock Your Tax Strategy?</h2>
            <p>Join thousands of high-income professionals who are saving money and time with personalized AI tax guidance.</p>
            
            <div className="pricing-options">
              <div className="pricing-option featured">
                <div className="pricing-badge">BEST VALUE</div>
                <h3>Lifetime Access</h3>
                <div className="price">$297</div>
                <div className="price-note">One-time payment</div>
                <button className="btn btn-accent btn-lg">
                  Get Lifetime Access
                </button>
                <div className="savings-note">Save $291 vs 12 months</div>
              </div>
              
              <div className="pricing-option">
                <h3>Monthly Plan</h3>
                <div className="price">$49</div>
                <div className="price-note">Per month</div>
                <button className="btn btn-primary btn-lg">
                  Start Monthly Plan
                </button>
                <div className="cancel-note">Cancel anytime</div>
              </div>
            </div>

            <div className="guarantee">
              <p>🛡️ <strong>30-day money-back guarantee</strong> • Instant access • No contracts</p>
            </div>
          </div>
        </div>

        {/* Navigation back */}
        <div className="back-navigation">
          <Link to="/ai-assistant" className="btn btn-outline">
            ← Back to AI Assistant Info
          </Link>
        </div>
      </div>

      <style jsx>{`
        .ai-upsell-page {
          min-height: 100vh;
        }

        .upsell-hero {
          background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%);
          color: white;
          padding: var(--space-2xl) 0;
          margin-bottom: var(--space-2xl);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2xl);
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 var(--space-lg) 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin: 0 0 var(--space-xl) 0;
          opacity: 0.95;
          line-height: 1.3;
        }

        .hero-overview {
          background: rgba(255, 255, 255, 0.1);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
          backdrop-filter: blur(10px);
        }

        .hero-overview p {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .btn-hero {
          font-size: 1.3rem;
          padding: var(--space-lg) var(--space-2xl);
          font-weight: 700;
          margin-bottom: var(--space-md);
          display: block;
          text-align: center;
          background: var(--premium-gold);
          color: var(--text-primary);
          border: none;
        }

        .btn-hero:hover {
          background: #f59e0b;
          transform: translateY(-2px);
        }

        .cta-subtext {
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.8;
          margin: 0;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .ai-preview-card {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 100%;
        }

        .chat-preview {
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--brand-primary);
          color: white;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--brand-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .ai-name {
          font-weight: 600;
        }

        .ai-status {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .chat-messages {
          padding: var(--space-md);
          max-height: 300px;
          overflow-y: auto;
        }

        .message {
          margin-bottom: var(--space-md);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .user-message {
          background: var(--brand-accent);
          color: white;
          margin-left: 20%;
        }

        .ai-message {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          margin-right: 20%;
          white-space: pre-line;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: var(--space-sm) var(--space-md);
          margin-left: var(--space-md);
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }

        .value-section {
          margin: var(--space-2xl) 0;
          text-align: center;
        }

        .value-section h2 {
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-xl);
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-xl);
        }

        .value-item {
          text-align: center;
          padding: var(--space-lg);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: var(--space-md);
        }

        .value-item h4 {
          color: var(--brand-primary);
          margin-bottom: var(--space-sm);
        }

        .use-cases-section {
          margin: var(--space-2xl) 0;
          text-align: center;
        }

        .use-cases-section h2 {
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-xl);
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
        }

        .use-case-card {
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          box-shadow: 0 4px 6px var(--shadow-light);
          text-align: left;
        }

        .use-case-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .use-case-icon {
          font-size: 2rem;
        }

        .use-case-card ul {
          list-style: none;
          padding: 0;
        }

        .use-case-card li {
          padding: var(--space-sm) 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          padding-left: var(--space-lg);
        }

        .use-case-card li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--brand-success);
          font-weight: 700;
        }

        .use-case-card li:last-child {
          border-bottom: none;
        }

        .faq-section {
          margin: var(--space-2xl) 0;
        }

        .faq-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--brand-primary);
          margin-bottom: var(--space-xl);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-xl);
        }

        .faq-item {
          background: var(--card-bg);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          box-shadow: 0 2px 4px var(--shadow-light);
        }

        .faq-item h4 {
          color: var(--brand-primary);
          margin-bottom: var(--space-md);
        }

        .final-cta-section {
          margin: var(--space-2xl) 0;
          text-align: center;
        }

        .cta-card {
          background: var(--card-bg);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          box-shadow: 0 8px 16px var(--shadow-medium);
        }

        .cta-card h2 {
          color: var(--brand-primary);
          margin-bottom: var(--space-md);
        }

        .cta-card > p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-2xl);
        }

        .pricing-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .pricing-option {
          background: var(--bg-tertiary);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          position: relative;
          border: 2px solid transparent;
        }

        .pricing-option.featured {
          border-color: var(--brand-accent);
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
          color: white;
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--premium-gold);
          color: var(--text-primary);
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .pricing-option h3 {
          margin: 0 0 var(--space-md) 0;
        }

        .price {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: var(--space-xs);
        }

        .price-note {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: var(--space-lg);
        }

        .btn-lg {
          padding: var(--space-md) var(--space-xl);
          font-size: 1.1rem;
          width: 100%;
          margin-bottom: var(--space-md);
        }

        .savings-note, .cancel-note {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .guarantee {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .back-navigation {
          text-align: center;
          margin: var(--space-2xl) 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .ai-preview-card {
            margin-top: var(--space-xl);
          }

          .value-grid {
            grid-template-columns: 1fr;
          }

          .use-cases-grid {
            grid-template-columns: 1fr;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .pricing-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default AIUpsellPage;
