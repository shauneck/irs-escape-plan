import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useContext(ThemeContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}?user_email=${user.email}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Course Not Found</h2>
          <Link to="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary">Courses</Link>
            <span>›</span>
            <span className="text-primary">{course.title}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`badge ${course.is_premium ? 'badge-premium' : 'badge-free'}`}>
                  {course.is_premium ? `$${course.price.toLocaleString()}` : 'FREE'}
                </span>
                <span className="badge badge-difficulty">{course.difficulty}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-primary mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center">
                  <span className="mr-2">👨‍🏫</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📚</span>
                  <span>{course.modules?.length || 0} modules</span>
                </div>
              </div>
            </div>

            {/* Course Progress */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Course Modules</h2>
                
                <div className="space-y-4">
                  {course.modules.map((module, index) => {
                    const isCompleted = module.progress?.completed || false;
                    const isBookmarked = module.bookmark !== null;
                    const progressPercentage = module.progress?.progress_percentage || 0;
                    
                    return (
                      <div key={module.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                isCompleted ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                              }`}>
                                {isCompleted ? '✓' : index + 1}
                              </span>
                              <h3 className="text-lg font-semibold text-primary">{module.title}</h3>
                              {isBookmarked && (
                                <span className="text-premium-gold" title="Bookmarked">
                                  🔖
                                </span>
                              )}
                            </div>
                            
                            <p className="text-muted-foreground mb-3 ml-11">{module.description}</p>
                            
                            <div className="flex items-center space-x-4 ml-11 text-sm text-muted-foreground">
                              <span>⏱️ {formatDuration(module.estimated_duration)}</span>
                              {progressPercentage > 0 && (
                                <span className="text-primary">
                                  {progressPercentage}% complete
                                </span>
                              )}
                            </div>
                            
                            {progressPercentage > 0 && progressPercentage < 100 && (
                              <div className="progress-bar mt-2 ml-11">
                                <div 
                                  className="progress-bar-fill" 
                                  style={{ width: `${progressPercentage}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Link
                              to={`/course/${courseId}/module/${module.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              {isCompleted ? 'Review' : progressPercentage > 0 ? 'Continue' : 'Start'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Course Benefits */}
            <div className="bg-secondary rounded-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Advanced tax planning strategies</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Real-world implementation examples</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Professional dialogue and insights</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Compliance and legal considerations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Step-by-step implementation guides</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>Ongoing optimization techniques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Thumbnail */}
            <div className="card">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              {/* Action Button */}
              {course.is_premium ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${course.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">One-time purchase</div>
                  </div>
                  <button className="btn btn-premium w-full">
                    Purchase Course
                  </button>
                  <div className="text-center text-sm text-muted-foreground">
                    30-day money-back guarantee
                  </div>
                </div>
              ) : (
                <Link to={`/course/${courseId}/module/${course.modules?.[0]?.id}`} className="btn btn-primary w-full">
                  Start Free Course
                </Link>
              )}
            </div>

            {/* Course Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Course Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span className="font-medium">{formatDuration(course.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-medium">{course.modules?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access</span>
                  <span className="font-medium">Lifetime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Prerequisites</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Basic understanding of tax concepts</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Annual income of $75K+ for maximum benefit</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access to tax professional for implementation</span>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Related Tools</h3>
              <div className="space-y-3">
                <Link to="/tax-calculator" className="block p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="font-medium text-primary">🧮 Tax Calculator</div>
                  <div className="text-sm text-muted-foreground">Calculate your savings</div>
                </Link>
                <Link to="/strategy-builder" className="block p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="font-medium text-primary">🎯 Strategy Builder</div>
                  <div className="text-sm text-muted-foreground">Get personalized plan</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;