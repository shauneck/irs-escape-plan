import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import courseContent from "../data/courseContent";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [selectedModule, setSelectedModule] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [courseUnlocked, setCourseUnlocked] = useState(false);
  const [showVSL, setShowVSL] = useState(false);

  const course = courseContent[courseId];

  // Load user progress and unlock status
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    const unlockStatus = localStorage.getItem(`course-unlocked-${courseId}`);
    
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
    if (unlockStatus) setCourseUnlocked(JSON.parse(unlockStatus));
  }, [courseId]);

  // Save progress
  const saveProgress = (moduleId, completed = false, notes = "", bookmark = false) => {
    const newProgress = {
      ...userProgress,
      [moduleId]: {
        completed,
        notes,
        bookmark,
        lastAccessed: new Date().toISOString(),
        watchTime: (userProgress[moduleId]?.watchTime || 0) + 1
      }
    };
    setUserProgress(newProgress);
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(newProgress));
  };

  // Unlock course (for demo purposes)
  const unlockCourse = () => {
    setCourseUnlocked(true);
    localStorage.setItem(`course-unlocked-${courseId}`, JSON.stringify(true));
  };

  // Calculate progress statistics
  const completedModules = Object.values(userProgress).filter(p => p.completed).length;
  const totalModules = course?.modules.length || 0;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 px-8">
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Link to="/" className="text-gray-300 hover:text-white mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <span className="text-yellow-400 text-sm font-medium">Back to Courses</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.subtitle}</p>
              <p className="text-gray-200 leading-relaxed">{course.description}</p>
              
              {courseUnlocked && (
                <div className="mt-6 flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl font-bold text-black">{progressPercentage}%</span>
                    </div>
                    <div>
                      <p className="font-medium">Course Progress</p>
                      <p className="text-sm text-gray-300">{completedModules} of {totalModules} modules completed</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 text-gray-800">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{course.price}</div>
                  {course.locked && !courseUnlocked && (
                    <div className="flex items-center justify-center text-orange-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Course Locked</span>
                    </div>
                  )}
                  
                  {courseUnlocked && (
                    <div className="flex items-center justify-center text-green-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Course Unlocked</span>
                    </div>
                  )}
                </div>
                
                {!courseUnlocked ? (
                  <>
                    <button
                      onClick={() => setShowVSL(true)}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
                    >
                      Watch Preview Video
                    </button>
                    <button
                      onClick={unlockCourse}
                      className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                    >
                      Unlock Full Course
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedModule(course.modules[0])}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                )}
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{totalModules} comprehensive modules</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Real case studies with {course.caseStudyClient}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Lifetime access & updates</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VSL Modal */}
      {showVSL && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{course.vsl.title}</h3>
                <button
                  onClick={() => setShowVSL(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 mb-6">
                <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600">Video Sales Letter</p>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.vsl.script}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowVSL(false)}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowVSL(false);
                    unlockCourse();
                  }}
                  className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                >
                  Unlock Course Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Course Modules</h3>
              <div className="space-y-2">
                {course.modules.map((module, index) => {
                  const isPreview = module.preview;
                  const isLocked = course.locked && !courseUnlocked && !isPreview;
                  const isCompleted = userProgress[module.id]?.completed;
                  const isBookmarked = userProgress[module.id]?.bookmark;
                  
                  return (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedModule?.id === module.id
                          ? 'bg-yellow-50 border-yellow-300'
                          : isLocked
                          ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => !isLocked && setSelectedModule(module)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {isLocked && (
                              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {isPreview && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Preview
                              </span>
                            )}
                            {isCompleted && (
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {isBookmarked && (
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                              </svg>
                            )}
                          </div>
                          <h4 className={`text-sm font-medium ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                            Module {module.id}: {module.title}
                          </h4>
                          <p className={`text-xs ${isLocked ? 'text-gray-300' : 'text-gray-600'}`}>
                            {module.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            {selectedModule ? (
              <ModuleViewer
                module={selectedModule}
                courseId={courseId}
                isUnlocked={courseUnlocked || selectedModule.preview}
                userProgress={userProgress[selectedModule.id]}
                onSaveProgress={saveProgress}
              />
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome to {course.title}</h3>
                <p className="text-gray-600 mb-6">Select a module from the left to begin your learning journey.</p>
                {!courseUnlocked && (
                  <button
                    onClick={() => setShowVSL(true)}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                  >
                    Watch Course Preview
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleViewer = ({ module, courseId, isUnlocked, userProgress, onSaveProgress }) => {
  const [notes, setNotes] = useState(userProgress?.notes || "");
  const [isBookmarked, setIsBookmarked] = useState(userProgress?.bookmark || false);

  const handleCompleteModule = () => {
    onSaveProgress(module.id, true, notes, isBookmarked);
  };

  const handleSaveNotes = () => {
    onSaveProgress(module.id, userProgress?.completed || false, notes, isBookmarked);
  };

  const handleToggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    onSaveProgress(module.id, userProgress?.completed || false, notes, newBookmarkState);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Module Locked</h3>
        <p className="text-gray-600 mb-6">This module is part of the premium course content. Unlock the full course to access all modules.</p>
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors">
          Unlock Full Course
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Module Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Module {module.id}: {module.title}
            </h2>
            <p className="text-lg text-gray-600 mb-2">{module.theme}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Duration: {module.duration}</span>
              {userProgress?.completed && (
                <span className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6">
        {/* Video Placeholder */}
        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg mb-4">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-600">Module Video ({module.duration})</p>
            </div>
          </div>
        </div>

        {/* Script Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Module Script</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{module.script}</p>
          </div>
        </div>

        {/* Key Strategies */}
        {module.strategies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Strategies Covered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.strategies.map((strategy, index) => (
                <div key={index} className="flex items-center bg-blue-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800 font-medium">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IRC References */}
        {module.ircRefs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Code References</h3>
            <div className="flex flex-wrap gap-2">
              {module.ircRefs.map((ref, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  IRC {ref}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Case Study */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Case Study Summary</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800">{module.caseStudy}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes about this module..."
            className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleSaveNotes}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Save Notes
          </button>
        </div>

        {/* Complete Module */}
        {!userProgress?.completed && (
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handleCompleteModule}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Mark Module as Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;