import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

const CoursesPage = () => {
  const { user } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedCategory]);

  const fetchData = async () => {
    try {
      const [coursesResponse, categoriesResponse] = await Promise.all([
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courses?user_email=${user.email}`),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`)
      ]);
      
      const coursesData = await coursesResponse.json();
      const categoriesData = await categoriesResponse.json();
      
      setCourses(coursesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category_id === selectedCategory);
    }

    setFilteredCourses(filtered);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Professional Tax Education Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Master advanced tax strategies with our comprehensive course library designed for high-income professionals.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="all">All Categories</option>
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
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-primary mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className={`course-card card ${course.is_premium ? 'card-premium' : ''}`}>
                {/* Premium Badge */}
                {course.is_premium && (
                  <div className="absolute top-4 right-4 bg-premium-gold text-background px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM
                  </div>
                )}

                <div className="course-thumbnail mb-4 relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Progress Overlay */}
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
                  {/* Course Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-medium">
                      {getCategoryName(course.category_id)}
                    </span>
                    <span className="badge badge-difficulty">
                      {course.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{course.description}</p>
                  
                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <span className="mr-1">👨‍🏫</span>
                      {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">⏱️</span>
                      {formatDuration(course.duration)}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">📚</span>
                      {course.module_count} modules
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">💰</span>
                      {course.is_premium ? `$${course.price.toLocaleString()}` : 'FREE'}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Link 
                    to={`/course/${course.id}`}
                    className={`btn w-full ${course.is_premium ? 'btn-premium' : 'btn-primary'}`}
                  >
                    {course.progress && course.progress.percentage > 0 ? (
                      <>Continue Learning ({course.progress.percentage}%)</>
                    ) : (
                      <>
                        {course.is_premium ? 'Purchase & Start' : 'Start Free Course'}
                      </>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-primary text-primary-foreground rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Optimize Your Tax Strategy?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Start with our free tools to see how much you could save, then dive deeper with our premium courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tax-calculator" className="btn bg-white text-primary hover:bg-gray-100">
                Try Tax Calculator
              </Link>
              <Link to="/strategy-builder" className="btn btn-accent">
                Build Your Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;