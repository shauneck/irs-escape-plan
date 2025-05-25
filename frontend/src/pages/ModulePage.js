import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { APIContext } from '../App';

function ModulePage({ user }) {
  const api = useContext(APIContext);
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [glossaryTerms, setGlossaryTerms] = useState({});

  useEffect(() => {
    loadData();
  }, [courseId, moduleId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [courseResponse, glossaryResponse] = await Promise.all([
        api.get(`/api/courses/${courseId}${user ? `?user_email=${user.email}` : ''}`),
        api.get('/api/glossary')
      ]);
      
      setCourse(courseResponse.course);
      setGlossaryTerms(glossaryResponse.glossary);
      
      const module = courseResponse.course.modules?.find(m => m.id === moduleId);
      setCurrentModule(module);
    } catch (err) {
      console.error('Error loading module:', err);
      setError('Failed to load module content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async () => {
    if (!user || !currentModule) return;
    
    try {
      await api.post('/api/modules/progress', {
        user_email: user.email,
        module_id: currentModule.id,
        completed: true,
        progress_percentage: 100
      });
      
      // Reload to get updated progress
      loadData();
    } catch (err) {
      console.error('Error marking module as complete:', err);
    }
  };

  const toggleBookmark = async () => {
    if (!user || !currentModule) return;
    
    try {
      await api.post('/api/modules/bookmark', {
        user_email: user.email,
        module_id: currentModule.id
      });
      
      // Reload to get updated bookmark status
      loadData();
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const getNextModule = () => {
    if (!course?.modules || !currentModule) return null;
    const currentIndex = course.modules.findIndex(m => m.id === currentModule.id);
    return currentIndex < course.modules.length - 1 ? course.modules[currentIndex + 1] : null;
  };

  const getPreviousModule = () => {
    if (!course?.modules || !currentModule) return null;
    const currentIndex = course.modules.findIndex(m => m.id === currentModule.id);
    return currentIndex > 0 ? course.modules[currentIndex - 1] : null;
  };

  const highlightGlossaryTerms = (content) => {
    if (!content || !glossaryTerms) return content;
    
    let highlightedContent = content;
    
    Object.keys(glossaryTerms).forEach(termKey => {
      const term = glossaryTerms[termKey];
      const termText = term.term.split('(')[0].trim(); // Remove parenthetical parts
      
      // Create regex to match the term (case insensitive, word boundaries)
      const regex = new RegExp(`\\b${termText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      
      highlightedContent = highlightedContent.replace(regex, (match) => {
        return `<span class="glossary-term" data-term="${termKey}" title="${term.definition}">${match}</span>`;
      });
    });
    
    return highlightedContent;
  };

  const handleGlossaryTermClick = (termKey) => {
    navigate(`/glossary/${termKey}`);
  };

  useEffect(() => {
    // Add click handlers for glossary terms
    const handleTermClick = (e) => {
      if (e.target.classList.contains('glossary-term')) {
        const termKey = e.target.getAttribute('data-term');
        if (termKey) {
          handleGlossaryTermClick(termKey);
        }
      }
    };

    document.addEventListener('click', handleTermClick);
    return () => document.removeEventListener('click', handleTermClick);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '1rem' }}>Loading module...</span>
      </div>
    );
  }

  if (error || !course || !currentModule) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Module Not Found</h2>
          <p>{error || 'The requested module could not be found.'}</p>
          <Link to={`/course/${courseId}`} className="btn btn-primary">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const nextModule = getNextModule();
  const previousModule = getPreviousModule();

  return (
    <div>
      {/* Module Header */}
      <div className="page-header" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Link 
              to={`/course/${courseId}`} 
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
            >
              ← Back to {course.title}
            </Link>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                Module {currentModule.module_number}
              </div>
              <h1 className="page-title" style={{ fontSize: '2rem', margin: 0 }}>
                {currentModule.title}
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0.5rem 0 0 0' }}>
                {currentModule.description}
              </p>
            </div>
            
            {user && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={toggleBookmark}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                  title={currentModule.is_bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  {currentModule.is_bookmarked ? '🔖' : '📖'}
                </button>
                
                {!currentModule.progress?.completed && (
                  <button
                    onClick={markAsCompleted}
                    className="btn btn-accent"
                    style={{ color: 'white' }}
                  >
                    Mark Complete
                  </button>
                )}
                
                {currentModule.progress?.completed && (
                  <div style={{ 
                    background: 'var(--brand-success)', 
                    color: 'white', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    ✓ Completed
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Module Content */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-content">
            <div 
              className="module-content"
              style={{ 
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ 
                __html: highlightGlossaryTerms(currentModule.content?.replace(/\n/g, '<br>') || '') 
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            {previousModule ? (
              <Link 
                to={`/course/${courseId}/module/${previousModule.id}`}
                className="btn btn-outline"
              >
                ← Previous: {previousModule.title}
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link to={`/course/${courseId}`} className="btn btn-primary">
              Course Overview
            </Link>
          </div>
          
          <div>
            {nextModule ? (
              <Link 
                to={`/course/${courseId}/module/${nextModule.id}`}
                className="btn btn-primary"
              >
                Next: {nextModule.title} →
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Glossary Terms Preview */}
        {Object.keys(glossaryTerms).length > 0 && (
          <div className="card">
            <div className="card-header">
              <h3>📚 Tax Glossary</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                Click on highlighted terms in the content above to learn more, or explore our comprehensive glossary.
              </p>
            </div>
            <div className="card-footer">
              <Link to="/glossary" className="btn btn-accent">
                Explore Full Glossary
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .glossary-term {
          background-color: var(--brand-accent);
          color: white;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .glossary-term:hover {
          background-color: var(--brand-accent-dark);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default ModulePage;
