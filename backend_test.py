#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for IRS Escape Plan
Tests all API endpoints with realistic data
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

class IRSEscapePlanAPITester:
    def __init__(self, base_url="https://c56765cb-c1fb-4404-a478-13bb61e6eecb.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details
        })

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int = 200, data: Dict[Any, Any] = None, params: Dict[str, str] = None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                self.log_test(name, False, f"Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    self.log_test(name, True, f"Status: {response.status_code}, Response length: {len(str(response_data))}")
                    return True, response_data
                except json.JSONDecodeError:
                    self.log_test(name, True, f"Status: {response.status_code}, Non-JSON response")
                    return True, {}
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}")
                return False, {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}

    def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("\n🔍 Testing Basic Endpoints...")
        
        # Root endpoint
        self.run_test("Root API", "GET", "api/")
        
        # Health check
        self.run_test("Health Status", "GET", "api/status")

    def test_course_system(self):
        """Test course management system"""
        print("\n📚 Testing Course System...")
        
        # Get categories
        success, categories = self.run_test("Get Categories", "GET", "api/categories")
        if success and categories:
            print(f"    Found {len(categories)} categories")
        
        # Get all courses
        success, courses = self.run_test("Get All Courses", "GET", "api/courses")
        if success and courses:
            print(f"    Found {len(courses)} courses")
            
            # Test with user email parameter
            self.run_test("Get Courses with User", "GET", "api/courses", params={"user_email": "test@example.com"})
            
            # Test individual course details
            if len(courses) > 0:
                course_id = courses[0]["id"]
                self.run_test("Get Course Details", "GET", f"api/courses/{course_id}")
                self.run_test("Get Course with User", "GET", f"api/courses/{course_id}", params={"user_email": "test@example.com"})
                
                # Test module access
                success, course_detail = self.run_test("Get Course for Module Test", "GET", f"api/courses/{course_id}")
                if success and course_detail and "modules" in course_detail and len(course_detail["modules"]) > 0:
                    module_id = course_detail["modules"][0]["id"]
                    self.run_test("Get Module Content", "GET", f"api/courses/{course_id}/modules/{module_id}")

    def test_progress_and_bookmarks(self):
        """Test progress tracking and bookmark functionality"""
        print("\n📈 Testing Progress & Bookmarks...")
        
        # Test progress update
        progress_data = {
            "user_email": "test@example.com",
            "module_id": "mod1",
            "completed": True,
            "progress_percentage": 100
        }
        self.run_test("Update Module Progress", "POST", "api/modules/progress", data=progress_data)
        
        # Test bookmark toggle
        bookmark_data = {
            "user_email": "test@example.com", 
            "module_id": "mod1",
            "notes": "Important tax planning concepts"
        }
        self.run_test("Add Bookmark", "POST", "api/modules/bookmark", data=bookmark_data)
        self.run_test("Remove Bookmark", "POST", "api/modules/bookmark", data=bookmark_data)

    def test_tax_calculator(self):
        """Test tax calculator with realistic scenarios"""
        print("\n🧮 Testing Tax Calculator...")
        
        # High-income W2 employee scenario
        w2_scenario = {
            "user_email": "test@example.com",
            "annual_income": 150000,
            "income_types": ["w2"],
            "has_business": False
        }
        success, result = self.run_test("Tax Calculator - W2 Employee", "POST", "api/tax-calculator", data=w2_scenario)
        if success and result:
            print(f"    Current tax burden: ${result.get('current_tax_burden', 0):,.2f}")
            print(f"    Optimized tax burden: ${result.get('optimized_tax_burden', 0):,.2f}")
            print(f"    Annual savings: ${result.get('total_annual_savings', 0):,.2f}")
        
        # Business owner with S-Corp scenario
        business_scenario = {
            "user_email": "test@example.com",
            "annual_income": 200000,
            "income_types": ["business"],
            "has_business": True,
            "entity_type": "s_corp",
            "business_revenue": 250000,
            "business_expenses": 50000
        }
        success, result = self.run_test("Tax Calculator - S-Corp Business", "POST", "api/tax-calculator", data=business_scenario)
        if success and result:
            print(f"    Current tax burden: ${result.get('current_tax_burden', 0):,.2f}")
            print(f"    Optimized tax burden: ${result.get('optimized_tax_burden', 0):,.2f}")
            print(f"    Annual savings: ${result.get('total_annual_savings', 0):,.2f}")
            print(f"    Strategies applied: {', '.join(result.get('strategies_applied', []))}")

    def test_strategy_builder(self):
        """Test strategy builder with comprehensive assessment"""
        print("\n🎯 Testing Strategy Builder...")
        
        # Comprehensive high-earner assessment
        assessment_data = {
            "user_email": "test@example.com",
            "income_types": ["business", "w2"],
            "annual_income": 300000,
            "entity_type": "s_corp",
            "business_revenue": 400000,
            "lifestyle_factors": ["home_office", "real_estate"],
            "business_goals": ["growth", "tax_optimization"],
            "investment_interests": ["real_estate", "retirement"]
        }
        success, result = self.run_test("Strategy Builder - High Earner", "POST", "api/strategy-builder", data=assessment_data)
        if success and result:
            print(f"    Total estimated savings: ${result.get('total_estimated_savings', 0):,.2f}")
            print(f"    Matched strategies: {len(result.get('matched_strategies', []))}")
            
            # Show top 3 strategies
            strategies = result.get('matched_strategies', [])[:3]
            for i, strategy in enumerate(strategies, 1):
                print(f"    {i}. {strategy.get('name', 'Unknown')} - ${strategy.get('estimated_annual_savings', 0):,.2f}")
        
        # Get all available strategies
        self.run_test("Get All Strategies", "GET", "api/strategy-builder/strategies")

    def test_glossary_system(self):
        """Test glossary and search functionality"""
        print("\n📖 Testing Glossary System...")
        
        # Get all glossary terms
        success, terms = self.run_test("Get All Glossary Terms", "GET", "api/glossary")
        if success and terms:
            print(f"    Found {len(terms)} glossary terms")
        
        # Test search functionality
        search_terms = ["MSO", "QSBS", "cost segregation", "real estate"]
        for term in search_terms:
            success, results = self.run_test(f"Search Glossary - '{term}'", "GET", "api/glossary", params={"search": term})
            if success and results:
                print(f"    Search '{term}' returned {len(results)} results")

    def test_strategies_endpoint(self):
        """Test strategies endpoint"""
        print("\n⚡ Testing Strategies Endpoint...")
        
        success, strategies = self.run_test("Get All Tax Strategies", "GET", "api/strategies")
        if success and strategies:
            print(f"    Found {len(strategies)} tax strategies")
            
            # Show strategy categories
            categories = set()
            for strategy in strategies:
                categories.update(strategy.get('tags', []))
            print(f"    Strategy categories: {', '.join(sorted(categories))}")

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print("🚀 Starting IRS Escape Plan API Testing...")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_basic_endpoints()
        self.test_course_system()
        self.test_progress_and_bookmarks()
        self.test_tax_calculator()
        self.test_strategy_builder()
        self.test_glossary_system()
        self.test_strategies_endpoint()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [test for test in self.test_results if not test["success"]]
        if failed_tests:
            print(f"\n❌ Failed Tests ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"  - {test['name']}: {test['details']}")
        else:
            print("\n🎉 All tests passed!")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = IRSEscapePlanAPITester()
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())