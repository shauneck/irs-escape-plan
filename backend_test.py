#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for IRS Escape Plan
Tests all API endpoints systematically using the public URL
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class IRSEscapePlanAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        self.course_ids = []
        self.module_ids = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = {
            "test": name,
            "status": status,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")

    def run_api_test(self, method: str, endpoint: str, expected_status: int = 200, 
                     data: Optional[Dict] = None, description: str = "") -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method.upper() == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            try:
                response_json = response.json()
            except:
                response_json = {"raw_response": response.text}

            details = f"Status: {response.status_code}"
            if not success:
                details += f" (Expected: {expected_status})"
            
            return success, response_json, details

        except requests.exceptions.RequestException as e:
            return False, {}, f"Request failed: {str(e)}"
        except Exception as e:
            return False, {}, f"Error: {str(e)}"

    def test_health_check(self):
        """Test API health check"""
        print("\n🔍 Testing API Health Check...")
        success, response, details = self.run_api_test("GET", "/api/status")
        
        if success and response.get("status") == "healthy":
            self.log_test("Health Check", True, f"{details} - API is healthy")
        else:
            self.log_test("Health Check", False, f"{details} - API health check failed")

    def test_categories(self):
        """Test categories endpoint"""
        print("\n🔍 Testing Categories API...")
        success, response, details = self.run_api_test("GET", "/api/categories")
        
        if success:
            categories = response.get("categories", [])
            expected_count = 3
            if len(categories) == expected_count:
                category_names = [cat.get("name") for cat in categories]
                self.log_test("Categories Count", True, 
                             f"{details} - Found {len(categories)} categories: {category_names}")
            else:
                self.log_test("Categories Count", False, 
                             f"{details} - Expected {expected_count} categories, got {len(categories)}")
        else:
            self.log_test("Categories API", False, details)

    def test_courses(self):
        """Test courses endpoint"""
        print("\n🔍 Testing Courses API...")
        success, response, details = self.run_api_test("GET", "/api/courses")
        
        if success:
            courses = response.get("courses", [])
            expected_count = 3
            
            if len(courses) == expected_count:
                # Analyze course types
                free_courses = [c for c in courses if not c.get("is_premium", True)]
                premium_courses = [c for c in courses if c.get("is_premium", False)]
                
                # Store course IDs for later testing
                self.course_ids = [course.get("id") for course in courses if course.get("id")]
                
                course_info = []
                for course in courses:
                    course_type = "FREE" if not course.get("is_premium", True) else "PREMIUM"
                    price = course.get("price", 0)
                    course_info.append(f"{course.get('title', 'Unknown')} ({course_type}, ${price})")
                
                if len(free_courses) == 1 and len(premium_courses) == 2:
                    self.log_test("Courses Structure", True, 
                                 f"{details} - Found 1 free + 2 premium courses: {course_info}")
                else:
                    self.log_test("Courses Structure", False, 
                                 f"{details} - Expected 1 free + 2 premium, got {len(free_courses)} free + {len(premium_courses)} premium")
            else:
                self.log_test("Courses Count", False, 
                             f"{details} - Expected {expected_count} courses, got {len(courses)}")
        else:
            self.log_test("Courses API", False, details)

    def test_course_details(self):
        """Test course details endpoint"""
        print("\n🔍 Testing Course Details API...")
        
        if not self.course_ids:
            self.log_test("Course Details", False, "No course IDs available for testing")
            return
        
        # Test first course
        course_id = self.course_ids[0]
        success, response, details = self.run_api_test("GET", f"/api/courses/{course_id}")
        
        if success:
            course = response.get("course", {})
            modules = course.get("modules", [])
            
            # Store module IDs for later testing
            self.module_ids = [module.get("id") for module in modules if module.get("id")]
            
            if course and modules:
                self.log_test("Course Details", True, 
                             f"{details} - Course '{course.get('title')}' has {len(modules)} modules")
            else:
                self.log_test("Course Details", False, 
                             f"{details} - Course details incomplete")
        else:
            self.log_test("Course Details", False, details)

    def test_glossary(self):
        """Test tax glossary endpoint"""
        print("\n🔍 Testing Tax Glossary API...")
        success, response, details = self.run_api_test("GET", "/api/glossary")
        
        if success:
            glossary = response.get("glossary", {})
            expected_count = 10
            
            if len(glossary) == expected_count:
                terms = list(glossary.keys())
                # Check if each term has required fields
                valid_terms = 0
                for term_key, term_data in glossary.items():
                    if all(key in term_data for key in ["term", "definition", "plain_english", "case_study"]):
                        valid_terms += 1
                
                if valid_terms == expected_count:
                    self.log_test("Glossary Structure", True, 
                                 f"{details} - Found {len(glossary)} complete terms: {terms[:3]}...")
                else:
                    self.log_test("Glossary Structure", False, 
                                 f"{details} - {valid_terms}/{expected_count} terms have complete data")
            else:
                self.log_test("Glossary Count", False, 
                             f"{details} - Expected {expected_count} terms, got {len(glossary)}")
        else:
            self.log_test("Glossary API", False, details)

    def test_glossary_search(self):
        """Test glossary search functionality"""
        print("\n🔍 Testing Glossary Search...")
        success, response, details = self.run_api_test("GET", "/api/glossary?search=tax")
        
        if success:
            glossary = response.get("glossary", {})
            if glossary:
                self.log_test("Glossary Search", True, 
                             f"{details} - Search returned {len(glossary)} results")
            else:
                self.log_test("Glossary Search", False, 
                             f"{details} - Search returned no results")
        else:
            self.log_test("Glossary Search", False, details)

    def test_progress_tracking(self):
        """Test module progress tracking"""
        print("\n🔍 Testing Progress Tracking API...")
        
        if not self.module_ids:
            self.log_test("Progress Tracking", False, "No module IDs available for testing")
            return
        
        test_data = {
            "user_email": "test@example.com",
            "module_id": self.module_ids[0],
            "completed": True,
            "progress_percentage": 100.0
        }
        
        success, response, details = self.run_api_test("POST", "/api/modules/progress", 
                                                      data=test_data)
        
        if success and response.get("message"):
            self.log_test("Progress Tracking", True, 
                         f"{details} - {response.get('message')}")
        else:
            self.log_test("Progress Tracking", False, details)

    def test_bookmark_functionality(self):
        """Test module bookmark functionality"""
        print("\n🔍 Testing Bookmark API...")
        
        if not self.module_ids:
            self.log_test("Bookmark Functionality", False, "No module IDs available for testing")
            return
        
        test_data = {
            "user_email": "test@example.com",
            "module_id": self.module_ids[0],
            "notes": "Test bookmark note"
        }
        
        success, response, details = self.run_api_test("POST", "/api/modules/bookmark", 
                                                      data=test_data)
        
        if success and response.get("message"):
            self.log_test("Bookmark Functionality", True, 
                         f"{details} - {response.get('message')}")
        else:
            self.log_test("Bookmark Functionality", False, details)

    def test_ai_assistant_packages(self):
        """Test AI assistant packages endpoint"""
        print("\n🔍 Testing AI Assistant Packages...")
        success, response, details = self.run_api_test("GET", "/api/ai-assistant/packages")
        
        if success:
            packages = response.get("packages", [])
            if len(packages) >= 2:
                package_types = [pkg.get("type") for pkg in packages]
                self.log_test("AI Assistant Packages", True, 
                             f"{details} - Found {len(packages)} packages: {package_types}")
            else:
                self.log_test("AI Assistant Packages", False, 
                             f"{details} - Expected at least 2 packages, got {len(packages)}")
        else:
            self.log_test("AI Assistant Packages", False, details)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting IRS Escape Plan API Testing...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Core API tests
        self.test_health_check()
        self.test_categories()
        self.test_courses()
        self.test_course_details()
        self.test_glossary()
        self.test_glossary_search()
        
        # Functionality tests
        self.test_progress_tracking()
        self.test_bookmark_functionality()
        self.test_ai_assistant_packages()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if "❌" in result["status"]]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        print("\n✅ API Testing Complete!")
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    # Use the public URL from frontend/.env
    base_url = "https://bb4a44be-7ace-4613-922a-40075c03d054.preview.emergentagent.com"
    
    tester = IRSEscapePlanAPITester(base_url)
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())