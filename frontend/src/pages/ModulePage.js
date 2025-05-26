import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const ModulePage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(ThemeContext);
  const [module, setModule] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchModule();
    fetchCourse();
  }, [courseId, moduleId]);

  const fetchModule = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}/modules/${moduleId}?user_email=${user.email}`);
      const data = await response.json();
      setModule(data);
      setIsBookmarked(data.bookmark !== null);
      setNotes(data.bookmark?.notes || '');
      setProgress(data.progress?.progress_percentage || 0);
    } catch (error) {
      console.error('Error fetching module:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const updateProgress = async (percentage, completed = false) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/modules/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: user.email,
          module_id: moduleId,
          progress_percentage: percentage,
          completed: completed
        })
      });
      setProgress(percentage);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/modules/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: user.email,
          module_id: moduleId,
          notes: notes
        })
      });
      
      const data = await response.json();
      setIsBookmarked(data.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const markAsComplete = async () => {
    await updateProgress(100, true);
    alert('Module completed! 🎉');
  };

  const getNextModule = () => {
    if (!course || !course.modules) return null;
    const currentIndex = course.modules.findIndex(m => m.id === moduleId);
    return currentIndex < course.modules.length - 1 ? course.modules[currentIndex + 1] : null;
  };

  const getPreviousModule = () => {
    if (!course || !course.modules) return null;
    const currentIndex = course.modules.findIndex(m => m.id === moduleId);
    return currentIndex > 0 ? course.modules[currentIndex - 1] : null;
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

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Module Not Found</h2>
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-primary">Courses</Link>
              <span>›</span>
              <Link to={`/course/${courseId}`} className="hover:text-primary">
                {course?.title || 'Course'}
              </Link>
              <span>›</span>
              <span className="text-primary">{module.title}</span>
            </div>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">{module.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>⏱️ {formatDuration(module.estimated_duration)}</span>
                <span>Module {module.module_number}</span>
                {progress > 0 && (
                  <span className="text-primary">
                    {progress}% complete
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Bookmark Toggle */}
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked ? 'text-premium-gold' : 'text-muted-foreground hover:text-primary'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <svg className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              {/* Progress Controls */}
              <div className="flex items-center space-x-2">
                {progress < 100 && (
                  <>
                    <button
                      onClick={() => updateProgress(50)}
                      className="btn btn-outline btn-sm"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => updateProgress(75)}
                      className="btn btn-outline btn-sm"
                    >
                      75%
                    </button>
                    <button
                      onClick={markAsComplete}
                      className="btn btn-success btn-sm"
                    >
                      Complete
                    </button>
                  </>
                )}
                {progress === 100 && (
                  <span className="text-success font-medium">✓ Completed</span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="progress-bar mt-4">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {module.content}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <div>
                {previousModule && (
                  <Link
                    to={`/course/${courseId}/module/${previousModule.id}`}
                    className="btn btn-outline"
                  >
                    ← Previous: {previousModule.title}
                  </Link>
                )}
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
                  <Link
                    to={`/course/${courseId}`}
                    className="btn btn-primary"
                  >
                    Course Complete 🎉
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Modules */}
            {course && course.modules && (
              <div className="card">
                <h3 className="text-lg font-semibold text-primary mb-4">Course Modules</h3>
                <div className="space-y-2">
                  {course.modules.map((mod, index) => (
                    <Link
                      key={mod.id}
                      to={`/course/${courseId}/module/${mod.id}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        mod.id === moduleId 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            mod.id === moduleId 
                              ? 'bg-white text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium truncate">{mod.title}</span>
                        </div>
                        <span className="text-xs opacity-75">
                          {formatDuration(mod.estimated_duration)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this module..."
                className="input resize-none h-32"
                rows="4"
              />
              <button
                onClick={toggleBookmark}
                className="btn btn-primary w-full mt-3"
              >
                {isBookmarked ? 'Update Bookmark' : 'Save Bookmark'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/tax-calculator" className="block p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="font-medium text-primary">🧮 Try Calculator</div>
                  <div className="text-sm text-muted-foreground">Apply what you learned</div>
                </Link>
                <Link to="/glossary" className="block p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="font-medium text-primary">📚 Tax Glossary</div>
                  <div className="text-sm text-muted-foreground">Look up terms</div>
                </Link>
                <Link to="/ai-assistant" className="block p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="font-medium text-primary">🤖 Ask AI</div>
                  <div className="text-sm text-muted-foreground">Get instant help</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;