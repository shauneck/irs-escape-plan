import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../App';

function HomePage({ user }) {
  const api = useContext(APIContext);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [coursesResponse, categoriesResponse] = await Promise.all([
        api.get('/api/courses' + (user ? `?user_email=${user.email}` : '')),
        api.get('/api/categories')
      ]);
      
      setCourses(coursesResponse.courses || []);
      setCategories(categoriesResponse.categories || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category_id === selectedCategory);

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
        <span style={{ marginLeft: '1rem' }}>Loading courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error Loading Courses</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Master Tax Strategies</h1>
          <p className="page-subtitle">
            Professional tax education for high-income earners, business owners, and entrepreneurs
          </p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="search-filters">
          <h3>Filter by Category</h3>
          <div className="filter-chips">
            <button 
              className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Courses
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-chip ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="course-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="card course-card">
                <div style={{ position: 'relative' }}>
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="course-thumbnail"
                  />
                  <div className={`course-badge ${course.is_premium ? 'badge-premium' : 'badge-free'}`}>
                    {course.is_premium ? 'PREMIUM' : 'FREE'}
                  </div>
                </div>
                
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  <div className="course-meta">
                    <span className="course-instructor">{course.instructor}</span>
                    <span className="course-duration">{formatDuration(course.duration)}</span>
                  </div>

                  {user && course.progress_percentage !== undefined && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress_percentage}%` }}
                        ></div>
                      </div>
                      <div className="progress-text">
                        {Math.round(course.progress_percentage)}% Complete
                      </div>
                    </div>
                  )}

                  <div className={`course-price ${course.price === 0 ? 'price-free' : ''}`}>
                    {formatPrice(course.price)}
                  </div>

                  <Link 
                    to={`/course/${course.id}`} 
                    className={`btn ${course.is_premium ? 'btn-accent' : 'btn-primary'} btn-full`}
                  >
                    {course.price === 0 ? 'Start Learning' : 'View Course'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>No courses found</h3>
            <p>Try selecting a different category.</p>
          </div>
        )}

        {/* Features Section */}
        <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose Quantus Group?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <h4>Expert-Led Training</h4>
                <p>Learn from seasoned CPAs and tax professionals with decades of experience.</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                <h4>Real-World Strategies</h4>
                <p>Case studies and examples from actual high-net-worth clients and businesses.</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                <h4>Comprehensive Resources</h4>
                <p>Tax glossary, AI assistant, and continuous content updates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
