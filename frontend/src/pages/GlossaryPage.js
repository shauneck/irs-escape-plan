import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APIContext } from '../App';

function GlossaryPage() {
  const api = useContext(APIContext);
  const { termKey } = useParams();
  const [glossaryTerms, setGlossaryTerms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGlossary();
  }, []);

  useEffect(() => {
    if (termKey && glossaryTerms[termKey]) {
      setSelectedTerm({ key: termKey, ...glossaryTerms[termKey] });
    }
  }, [termKey, glossaryTerms]);

  const loadGlossary = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/glossary');
      setGlossaryTerms(response.glossary || {});
    } catch (err) {
      console.error('Error loading glossary:', err);
      setError('Failed to load glossary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchGlossary = async (search) => {
    try {
      const response = await api.get(`/api/glossary?search=${encodeURIComponent(search)}`);
      setGlossaryTerms(response.glossary || {});
    } catch (err) {
      console.error('Error searching glossary:', err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      searchGlossary(value);
    } else {
      loadGlossary();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '1rem' }}>Loading glossary...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error Loading Glossary</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadGlossary}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const termEntries = Object.entries(glossaryTerms);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Tax Glossary</h1>
          <p className="page-subtitle">
            Comprehensive guide to advanced tax strategies and concepts
          </p>
        </div>
      </div>

      <div className="container">
        {!selectedTerm ? (
          <>
            {/* Search */}
            <div className="search-filters">
              <input
                type="text"
                placeholder="Search tax terms and strategies..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Search by term name, definition, or case study details
              </p>
            </div>

            {/* Terms Grid */}
            {termEntries.length > 0 ? (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {termEntries.map(([key, term]) => (
                  <div key={key} className="card">
                    <div className="card-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h3 style={{ color: 'var(--brand-primary)', margin: '0 0 0.5rem 0' }}>
                            {term.term}
                          </h3>
                          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                            {term.plain_english}
                          </p>
                        </div>
                        <Link 
                          to={`/glossary/${key}`}
                          className="btn btn-primary"
                          style={{ minWidth: 'auto', padding: '0.5rem 1rem' }}
                        >
                          View Details
                        </Link>
                      </div>
                      
                      <div style={{ 
                        background: 'var(--bg-tertiary)', 
                        padding: '1rem', 
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem'
                      }}>
                        <strong>Professional Definition:</strong> {term.definition}
                      </div>
                      
                      {term.case_study && (
                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: 'var(--brand-accent)', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
                            💼 Case Study: {term.case_study.client}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                            {term.case_study.situation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>No terms found</h3>
                <p>Try a different search term or browse all available terms.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setSearchTerm('');
                    loadGlossary();
                  }}
                >
                  Show All Terms
                </button>
              </div>
            )}
          </>
        ) : (
          /* Selected Term Detail View */
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <Link to="/glossary" className="btn btn-outline">
                ← Back to Glossary
              </Link>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h2 style={{ color: 'var(--brand-primary)', margin: 0 }}>
                  {selectedTerm.term}
                </h2>
              </div>
              <div className="card-content">
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--brand-accent)' }}>📖 Plain English Explanation</h4>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {selectedTerm.plain_english}
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--brand-accent)' }}>🎓 Professional Definition</h4>
                  <div style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>
                    {selectedTerm.definition}
                  </div>
                </div>

                {selectedTerm.case_study && (
                  <div>
                    <h4 style={{ color: 'var(--brand-accent)' }}>💼 Real-World Case Study</h4>
                    <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="card-content">
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                          <div>
                            <h5 style={{ color: 'var(--brand-primary)', margin: '0 0 0.5rem 0' }}>
                              Client Profile
                            </h5>
                            <p style={{ margin: 0, fontWeight: '600' }}>
                              {selectedTerm.case_study.client}
                            </p>
                          </div>

                          <div>
                            <h5 style={{ color: 'var(--brand-primary)', margin: '0 0 0.5rem 0' }}>
                              Situation
                            </h5>
                            <p style={{ margin: 0 }}>
                              {selectedTerm.case_study.situation}
                            </p>
                          </div>

                          <div>
                            <h5 style={{ color: 'var(--brand-primary)', margin: '0 0 0.5rem 0' }}>
                              Structure & Implementation
                            </h5>
                            <p style={{ margin: '0 0 1rem 0' }}>
                              <strong>Structure:</strong> {selectedTerm.case_study.structure}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Implementation:</strong> {selectedTerm.case_study.implementation}
                            </p>
                          </div>

                          <div style={{ 
                            background: 'var(--brand-success)', 
                            color: 'white', 
                            padding: '1rem', 
                            borderRadius: 'var(--radius-md)' 
                          }}>
                            <h5 style={{ margin: '0 0 0.5rem 0' }}>
                              ✅ Results
                            </h5>
                            <p style={{ margin: 0, fontWeight: '600' }}>
                              {selectedTerm.case_study.results}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Learning */}
            <div className="card">
              <div className="card-header">
                <h3>Continue Learning</h3>
              </div>
              <div className="card-content">
                <p style={{ marginBottom: '1.5rem' }}>
                  Ready to implement these strategies? Our comprehensive courses provide step-by-step guidance 
                  from experienced tax professionals.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/" className="btn btn-primary">
                    Browse Courses
                  </Link>
                  <Link to="/ai-assistant" className="btn btn-accent">
                    Ask AI Assistant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GlossaryPage;
