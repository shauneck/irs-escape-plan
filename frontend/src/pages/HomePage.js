import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const HomePage = () => {
  const { user } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses?user_email=${user.email}`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              MASTER ADVANCED TAX STRATEGIES.
              <br />
              <span className="text-accent">ESCAPE THE IRS TRAP.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of high-income professionals who've discovered the tax strategies 
              the wealthy use to keep more of what they earn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn btn-accent text-lg px-8 py-4">
                Start Learning Today
              </Link>
              <Link to="/tax-calculator" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Calculate Your Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="bg-accent text-white py-8 border-b-4 border-accent-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">🤖 Unlock Your Personal AI Tax Planner</h2>
              <p className="text-lg opacity-90">
                Get instant answers to complex tax questions. Available 24/7 to optimize your strategies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold">$297</div>
                <div className="text-sm opacity-75">Lifetime Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$49</div>
                <div className="text-sm opacity-75">Monthly</div>
              </div>
              <Link 
                to="/ai-assistant" 
                className="btn bg-white text-accent hover:bg-gray-100 whitespace-nowrap"
              >
                Get AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Professional Tax Education Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Netflix-quality education designed for high-income professionals. Start with our free 
              introduction, then unlock advanced strategies with premium courses.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <div key={course.id} className="course-card card">
                  <div className="course-thumbnail mb-4 relative overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.progress && course.progress.percentage > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <div className="progress-bar mb-1">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${course.progress.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-sm">
                          {course.progress.completed_modules}/{course.progress.total_modules} modules completed
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`badge ${course.is_premium ? 'badge-premium' : 'badge-free'}`}>
                        {course.is_premium ? `$${course.price.toLocaleString()}` : 'FREE'}
                      </span>
                      <span className="badge badge-difficulty">
                        {course.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>👨‍🏫 {course.instructor}</span>
                      <span>⏱️ {formatDuration(course.duration)}</span>
                      <span>📚 {course.module_count} modules</span>
                    </div>
                    
                    <Link 
                      to={`/course/${course.id}`}
                      className="btn btn-primary w-full"
                    >
                      {course.progress && course.progress.percentage > 0 ? 'Continue Learning' : 'Start Course'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Browse All Courses */}
          <div className="text-center mt-12">
            <Link to="/courses" className="btn btn-outline">
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Quick Tax Planning Tools
            </h2>
            <p className="text-xl text-muted-foreground">
              Get instant insights into your tax optimization opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/tax-calculator" className="card hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧮</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Tax Calculator</h3>
                <p className="text-muted-foreground mb-4">
                  Calculate your potential tax savings with advanced strategies in just 3 steps.
                </p>
                <span className="text-accent font-medium">Try Calculator →</span>
              </div>
            </Link>

            <Link to="/strategy-builder" className="card hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Strategy Builder</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized tax strategy recommendations based on your unique situation.
                </p>
                <span className="text-accent font-medium">Build Strategy →</span>
              </div>
            </Link>

            <Link to="/glossary" className="card hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Tax Glossary</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive database of tax terms with real case studies and examples.
                </p>
                <span className="text-accent font-medium">Explore Glossary →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Real Results from Real Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">$34,000+</div>
              <div className="text-lg font-medium text-primary mb-2">Average Annual Savings</div>
              <div className="text-muted-foreground">
                From our Tax Calculator users implementing S-Corp and QBI strategies
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">$74,000+</div>
              <div className="text-lg font-medium text-primary mb-2">Strategy Builder Results</div>
              <div className="text-muted-foreground">
                Personalized recommendations for high-income professionals
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5,000+</div>
              <div className="text-lg font-medium text-primary mb-2">Professionals Educated</div>
              <div className="text-muted-foreground">
                Business owners, W2 employees, and real estate investors
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;