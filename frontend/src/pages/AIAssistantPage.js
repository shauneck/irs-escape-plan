import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIContext } from '../App';

function AIAssistantPage({ user }) {
  const api = useContext(APIContext);
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [packagesResponse] = await Promise.all([
        api.get('/api/ai-assistant/packages')
      ]);
      
      setPackages(packagesResponse.packages || []);
      
      if (user) {
        await checkAccess();
      } else {
        // Redirect to upsell if no user
        navigate('/ai-upsell');
        return;
      }
    } catch (err) {
      console.error('Error loading AI assistant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAccess = async () => {
    if (!user) return;
    
    try {
      setCheckingAccess(true);
      const response = await api.get(`/api/ai-assistant/access/${user.email}`);
      const userHasAccess = response.has_access || false;
      setHasAccess(userHasAccess);
      
      // Redirect to upsell if no access
      if (!userHasAccess) {
        navigate('/ai-upsell');
        return;
      }
    } catch (err) {
      console.error('Error checking access:', err);
      setHasAccess(false);
      navigate('/ai-upsell');
    } finally {
      setCheckingAccess(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '1rem' }}>Loading AI Assistant...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">AI Tax Assistant</h1>
          <p className="page-subtitle">
            Get instant, expert-level tax advice powered by advanced AI
          </p>
        </div>
      </div>

      <div className="container">
        {user && hasAccess ? (
          /* Chat Interface for Users with Access */
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3>🤖 Your AI Tax Assistant is Ready</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                  Ask questions about tax strategies, get personalized advice, and explore advanced planning techniques.
                </p>
              </div>
            </div>

            {/* Chat Interface Placeholder */}
            <div className="card">
              <div className="card-content">
                <div style={{ 
                  height: '400px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{ fontSize: '3rem' }}>🚧</div>
                  <h3>Chat Interface Coming Soon</h3>
                  <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    The AI chat interface is currently being developed.<br/>
                    Your access is confirmed and will be available soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Access Purchase Interface */
          <div>
            {/* Features Section */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                What Can the AI Assistant Do?
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                    <h4>Personalized Tax Strategy</h4>
                    <p>Get customized advice based on your specific financial situation and goals.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                    <h4>Advanced Planning</h4>
                    <p>Explore complex strategies like QOF investments, cost segregation, and business structures.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                    <h4>Instant Responses</h4>
                    <p>Get immediate answers to your tax questions, available 24/7.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                    <h4>IRC Code Knowledge</h4>
                    <p>Access deep understanding of tax codes and regulations for accurate guidance.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                    <h4>Conversation History</h4>
                    <p>Review past conversations and build on previous advice over time.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                    <h4>Educational Guidance</h4>
                    <p>Learn while you plan with detailed explanations and real-world examples.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            {packages.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Choose Your Plan
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                  gap: '2rem',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {packages.map(pkg => (
                    <div key={pkg.type} className="card" style={{ 
                      border: pkg.type === 'lifetime' ? '3px solid var(--brand-accent)' : 'none',
                      position: 'relative'
                    }}>
                      {pkg.type === 'lifetime' && (
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--brand-accent)',
                          color: 'white',
                          padding: '0.25rem 1rem',
                          borderRadius: '1rem',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          BEST VALUE
                        </div>
                      )}
                      
                      <div className="card-content" style={{ textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
                          {pkg.name}
                        </h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--brand-accent)', marginBottom: '0.5rem' }}>
                          ${pkg.price}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                          {pkg.type === 'lifetime' ? 'One-time payment' : 'Per month'}
                        </div>
                        <p style={{ marginBottom: '2rem' }}>
                          {pkg.description}
                        </p>
                        
                        <button 
                          className={`btn ${pkg.type === 'lifetime' ? 'btn-accent' : 'btn-primary'} btn-full`}
                          disabled={!user}
                          style={{ marginBottom: '1rem' }}
                        >
                          {!user ? 'Login Required' : `Get ${pkg.name}`}
                        </button>
                        
                        {pkg.type === 'lifetime' && (
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Save over $300 compared to 12 months
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sample Questions */}
            <div className="card">
              <div className="card-header">
                <h3>💡 Example Questions You Can Ask</h3>
              </div>
              <div className="card-content">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem'
                  }}>
                    "I make $500K as a W-2 employee. What are the best tax strategies for someone in my situation?"
                  </div>
                  <div style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem'
                  }}>
                    "Should I convert my business to an S-Corp? What are the pros and cons?"
                  </div>
                  <div style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem'
                  }}>
                    "I'm selling my business for $10M. How can I minimize capital gains taxes?"
                  </div>
                  <div style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem'
                  }}>
                    "What's the difference between cost segregation and bonus depreciation?"
                  </div>
                </div>
              </div>
            </div>

            {!user && (
              <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div className="card-content">
                  <h3>Ready to Get Started?</h3>
                  <p>Create an account to access the AI Tax Assistant and start optimizing your tax strategy today.</p>
                  <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAssistantPage;
