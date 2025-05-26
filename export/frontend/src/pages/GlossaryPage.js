import React, { useState, useEffect } from 'react';

const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [filteredTerms, setFilteredTerms] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Business Structures', name: 'Business Structures' },
    { id: 'Investment & Equity', name: 'Investment & Equity' },
    { id: 'Real Estate & Depreciation', name: 'Real Estate & Depreciation' },
    { id: 'Real Estate Professional', name: 'Real Estate Professional' },
    { id: 'Investment & Deferral', name: 'Investment & Deferral' }
  ];

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    filterTerms();
  }, [terms, searchTerm, selectedCategory]);

  const fetchTerms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/glossary`);
      const data = await response.json();
      setTerms(data);
    } catch (error) {
      console.error('Error fetching glossary terms:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTerms = () => {
    let filtered = terms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.plain_english.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    setFilteredTerms(filtered);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const TermModal = ({ term, onClose }) => {
    if (!term) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-primary">{term.term}</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center space-x-2">
              <span className="badge badge-primary">{term.category}</span>
            </div>

            {/* Definition */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Technical Definition</h3>
              <p className="text-muted-foreground">{term.definition}</p>
            </div>

            {/* Plain English */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Plain English Explanation</h3>
              <p className="text-muted-foreground">{term.plain_english}</p>
            </div>

            {/* Case Study */}
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">📈 Real Client Case Study</h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-primary">Client:</strong> {term.case_study.client}
                </div>
                <div>
                  <strong className="text-primary">Situation:</strong> {term.case_study.situation}
                </div>
                <div>
                  <strong className="text-primary">Problem:</strong> {term.case_study.problem}
                </div>
                <div>
                  <strong className="text-primary">Solution:</strong> {term.case_study.solution}
                </div>
                <div>
                  <strong className="text-primary">Result:</strong> {term.case_study.result}
                </div>
                <div className="bg-accent text-white rounded-lg p-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">💰 {term.case_study.savings}</div>
                    <div className="text-sm opacity-90">Total Tax Savings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Strategies */}
            {term.related_strategies && term.related_strategies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Related Strategies</h3>
                <div className="flex flex-wrap gap-2">
                  {term.related_strategies.map((strategy, index) => (
                    <span key={index} className="badge badge-outline">
                      {strategy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tax Strategy Glossary
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive database of advanced tax terms with real case studies and implementation examples. 
            Master the language of tax optimization.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative glossary-search">
            <svg className="search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search terms, definitions, or case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTerms.length} of {terms.length} terms
          </p>
        </div>

        {/* Terms Grid */}
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-primary mb-2">No terms found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredTerms.map((term) => (
              <div 
                key={term.id}
                onClick={() => setSelectedTerm(term)}
                className="card cursor-pointer hover:shadow-lg"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-primary">{term.term}</h3>
                    <span className="badge badge-primary shrink-0 ml-2">
                      {term.category}
                    </span>
                  </div>

                  {/* Definition Preview */}
                  <p className="text-muted-foreground line-clamp-3">
                    {term.plain_english}
                  </p>

                  {/* Case Study Preview */}
                  {term.case_study && (
                    <div className="bg-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-primary">Case Study</div>
                          <div className="text-sm text-muted-foreground">{term.case_study.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-accent">{term.case_study.savings}</div>
                          <div className="text-xs text-muted-foreground">Savings</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Related Strategies Preview */}
                  {term.related_strategies && term.related_strategies.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Related Strategies:</div>
                      <div className="flex flex-wrap gap-1">
                        {term.related_strategies.slice(0, 3).map((strategy, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            {strategy}
                          </span>
                        ))}
                        {term.related_strategies.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            +{term.related_strategies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Click Indicator */}
                  <div className="text-sm text-accent font-medium">
                    Click for full case study →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Educational Section */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why Understanding These Terms Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Professional Communication</h3>
              <p className="opacity-90">
                Speak confidently with tax professionals, attorneys, and financial advisors using precise terminology.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Strategy Recognition</h3>
              <p className="opacity-90">
                Identify opportunities and understand recommendations from tax professionals and advisors.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Implementation Success</h3>
              <p className="opacity-90">
                Make informed decisions about which strategies to implement based on real case study results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Term Detail Modal */}
      <TermModal 
        term={selectedTerm} 
        onClose={() => setSelectedTerm(null)} 
      />
    </div>
  );
};

export default GlossaryPage;