import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APIContext } from '../App';

function CoursePage({ user }) {
  const api = useContext(APIContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/courses/${courseId}${user ? `?user_email=${user.email}` : ''}`);
      setCourse(response.course);
    } catch (err) {
      console.error('Error loading course:', err);
      setError('Failed to load course details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (moduleId) => {
    if (!user) return;
    
    try {
      await api.post('/api/modules/bookmark', {
        user_email: user.email,
        module_id: moduleId
      });
      
      // Reload course to get updated bookmark status
      loadCourse();
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const formatPrice = (price) => {
    if (price === 0) return 'FREE';
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '1rem' }}>Loading course...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Course Not Found</h2>
          <p>{error || 'The requested course could not be found.'}</p>
          <Link to="/" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalModules = course.modules?.length || 0;
  const completedModules = course.modules?.filter(m => m.progress?.completed).length || 0;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div>
      {/* Course Header */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              ← Back to Courses
            </Link>
          </div>
          <h1 className="page-title">{course.title}</h1>
          <p className="page-subtitle">{course.description}</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center', 
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Instructor</div>
              <div style={{ fontWeight: '600' }}>{course.instructor}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Duration</div>
              <div style={{ fontWeight: '600' }}>{formatDuration(course.duration)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Difficulty</div>
              <div style={{ fontWeight: '600' }}>{course.difficulty}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Price</div>
              <div style={{ fontWeight: '600' }}>{formatPrice(course.price)}</div>
            </div>
          </div>

          {user && totalModules > 0 && (
            <div style={{ maxWidth: '400px', margin: '1.5rem auto 0' }}>
              <div className="progress-bar" style={{ height: '12px' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-text" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {completedModules} of {totalModules} modules completed
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {/* Course Modules */}
        {course.modules && course.modules.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Course Modules</h2>
              {course.is_premium && !user && (
                <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--premium-gold)', color: 'black' }}>
                  <strong>Premium Course</strong> - Purchase required to access content
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.modules.map((module, index) => (
                <div key={module.id} className="card">
                  <div className="card-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            backgroundColor: module.progress?.completed ? 'var(--brand-success)' : 'var(--text-muted)',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}>
                            {module.progress?.completed ? '✓' : index + 1}
                          </span>
                          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{module.title}</h3>
                          {user && (
                            <button
                              onClick={() => toggleBookmark(module.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                color: module.is_bookmarked ? 'var(--brand-accent)' : 'var(--text-muted)'
                              }}
                              title={module.is_bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                            >
                              {module.is_bookmarked ? '🔖' : '📖'}
                            </button>
                          )}
                        </div>
                        
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                          {module.description}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          <span>Module {module.module_number}</span>
                          <span>• {formatDuration(module.estimated_duration)}</span>
                          {module.progress?.completed && (
                            <span style={{ color: 'var(--brand-success)' }}>• Completed</span>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ marginLeft: '1rem' }}>
                        {(!course.is_premium || user) ? (
                          <Link 
                            to={`/course/${courseId}/module/${module.id}`}
                            className="btn btn-primary"
                          >
                            {module.progress?.completed ? 'Review' : 'Start'}
                          </Link>
                        ) : (
                          <button className="btn btn-outline" disabled>
                            Purchase Required
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {module.is_bookmarked && module.bookmark_notes && (
                      <div style={{ 
                        marginTop: '1rem', 
                        padding: '0.75rem', 
                        backgroundColor: 'var(--bg-tertiary)', 
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                      }}>
                        <strong>Your Notes:</strong> {module.bookmark_notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>No modules available</h3>
            <p>This course is being prepared. Please check back later.</p>
          </div>
        )}

        {/* Course Actions */}
        {course.is_premium && !user && (
          <div className="card" style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem' }}>
            <h3>Ready to Master Advanced Tax Strategies?</h3>
            <p>Get instant access to all premium modules and start saving thousands in taxes.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Purchase Course - {formatPrice(course.price)}
              </button>
              <Link to="/ai-assistant" className="btn btn-outline">
                Learn More About AI Assistant
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
