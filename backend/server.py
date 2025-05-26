from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import uuid
from datetime import datetime
import json

# Pydantic Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    subscription_status: str = "free"
    created_at: datetime = Field(default_factory=datetime.now)

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    color: str

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    thumbnail: str
    category_id: str
    instructor: str
    difficulty: str
    duration: int  # in minutes
    price: float
    is_premium: bool
    module_count: int

class Module(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    course_id: str
    title: str
    description: str
    content: str
    module_number: int
    estimated_duration: int  # in minutes

class UserProgress(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    module_id: str
    completed: bool = False
    progress_percentage: int = 0
    completed_at: Optional[datetime] = None

class UserBookmark(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    module_id: str
    notes: str = ""
    bookmarked_at: datetime = Field(default_factory=datetime.now)

class TaxCalculatorRequest(BaseModel):
    user_email: str
    annual_income: float
    income_types: List[str]
    has_business: bool
    entity_type: Optional[str] = None
    business_revenue: Optional[float] = None
    business_expenses: Optional[float] = None

class StrategyBuilderRequest(BaseModel):
    user_email: str
    income_types: List[str]
    annual_income: float
    entity_type: str
    business_revenue: Optional[float] = None
    lifestyle_factors: List[str]
    business_goals: List[str]
    investment_interests: List[str] = []

class GlossaryTerm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    term: str
    definition: str
    plain_english: str
    case_study: Dict[str, Any]
    related_strategies: List[str]
    category: str

class TaxStrategy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    potential_savings: str
    complexity: str
    requirements: List[str]
    tags: List[str]
    impact_score: int
    course_references: List[str]

# FastAPI app setup
app = FastAPI(title="IRS Escape Plan API", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.irs_escape_plan

# Sample data initialization
async def initialize_sample_data():
    """Initialize the database with sample data if collections are empty"""
    
    # Categories
    categories_data = [
        {"id": "cat1", "name": "Tax Fundamentals", "description": "Core tax concepts and planning strategies", "color": "#2d4c45"},
        {"id": "cat2", "name": "Business Strategies", "description": "Advanced business tax optimization", "color": "#e57e35"},
        {"id": "cat3", "name": "Investment Planning", "description": "Tax-efficient investment strategies", "color": "#fbbf24"}
    ]
    
    if await db.categories.count_documents({}) == 0:
        await db.categories.insert_many(categories_data)
    
    # Courses
    courses_data = [
        {
            "id": "course1",
            "title": "Introduction to Tax Planning",
            "description": "Master the fundamentals of tax planning and discover strategies to minimize your tax burden legally and effectively.",
            "thumbnail": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            "category_id": "cat1",
            "instructor": "Shaun & Jordan",
            "difficulty": "Beginner",
            "duration": 120,
            "price": 0.0,
            "is_premium": False,
            "module_count": 2
        },
        {
            "id": "course2", 
            "title": "Tax Planning for W2 Employees",
            "description": "Advanced strategies for W2 employees to maximize deductions and minimize tax liability through legal optimization techniques.",
            "thumbnail": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "category_id": "cat1",
            "instructor": "Shaun & Jordan",
            "difficulty": "Intermediate",
            "duration": 480,
            "price": 1497.0,
            "is_premium": True,
            "module_count": 6
        },
        {
            "id": "course3",
            "title": "Business Tax Strategies for Entrepreneurs", 
            "description": "Comprehensive guide to business entity structures, deductions, and advanced tax strategies for serious entrepreneurs.",
            "thumbnail": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
            "category_id": "cat2",
            "instructor": "Shaun & Jordan",
            "difficulty": "Advanced",
            "duration": 720,
            "price": 2497.0,
            "is_premium": True,
            "module_count": 8
        }
    ]
    
    if await db.courses.count_documents({}) == 0:
        await db.courses.insert_many(courses_data)
    
    # Modules for Introduction course (free access)
    modules_data = [
        {
            "id": "mod1",
            "course_id": "course1",
            "title": "Tax Planning Fundamentals",
            "description": "Understanding the basics of tax planning and why it matters",
            "content": """
**Shaun:** Welcome to our comprehensive tax planning course! I'm Shaun, and joining me is Jordan. We're excited to guide you through the fundamentals of tax planning.

**Jordan:** That's right, Shaun. Today we're covering why tax planning is crucial for anyone earning over $75,000 annually. The average American pays 22-32% of their income in taxes, but with proper planning, we can significantly reduce that burden.

**Key Concepts We'll Cover:**

1. **Understanding Tax vs. Tax Planning**
   - Tax preparation is looking backward - filing what happened last year
   - Tax planning is looking forward - strategically structuring your finances to minimize taxes

2. **The Three Pillars of Tax Planning**
   - Income timing and recognition
   - Deduction maximization
   - Entity structure optimization

**Shaun:** One of our clients, a marketing consultant earning $150,000, was paying $28,500 in federal taxes alone. After implementing our strategies, they now pay just $12,400 - a savings of over $16,000 annually.

**Jordan:** The key is understanding that the tax code isn't just rules - it's incentives. The government wants to encourage certain behaviors like business ownership, real estate investment, and retirement savings. When you align your financial decisions with these incentives, you naturally pay less tax.

**Action Items:**
- Calculate your current effective tax rate
- Identify your largest tax payments (federal, state, FICA)
- Consider your primary income sources and potential optimization opportunities

**Next Module Preview:** We'll dive into specific strategies for W2 employees and business owners, including the powerful Augusta Rule and home office deductions.
            """,
            "module_number": 1,
            "estimated_duration": 45
        },
        {
            "id": "mod2", 
            "course_id": "course1",
            "title": "Entity Structures & Tax Implications",
            "description": "Choosing the right business structure for tax optimization",
            "content": """
**Jordan:** Now let's explore one of the most impactful decisions you can make - choosing the right entity structure for your business or side income.

**Shaun:** This is where we see the biggest wins for our clients. The difference between operating as a sole proprietor versus an S-Corp can be $5,000-15,000 in annual tax savings for most professionals.

**Entity Structure Breakdown:**

1. **Sole Proprietorship (Schedule C)**
   - Simplest structure but highest tax burden
   - Subject to full self-employment tax (15.3%)
   - Example: $100,000 net profit = $15,300 in SE tax alone

2. **S-Corporation Election**
   - Game-changer for most business owners
   - Allows salary + distribution structure
   - Example: $100k profit → $60k salary + $40k distribution
   - SE tax only on salary = $9,180 (saves $6,120 annually)

3. **LLC with Tax Elections**
   - Flexibility to elect S-Corp or C-Corp treatment
   - Asset protection benefits
   - Multiple member opportunities

**Real Client Example:**

**Jordan:** We worked with a consultant earning $180,000 annually as a sole proprietor. Here's the transformation:

*Before:*
- Federal income tax: $28,500
- Self-employment tax: $25,515  
- Total taxes: $54,015

*After S-Corp Election:*
- Reasonable salary: $120,000
- Distribution: $60,000
- Federal income tax: $28,500
- Payroll taxes: $18,360
- Total taxes: $46,860
- **Annual savings: $7,155**

**Shaun:** The key is determining the optimal salary amount. Too low and the IRS will challenge it. Too high and you're paying unnecessary payroll taxes. We use industry benchmarks and IRS guidelines to find the sweet spot.

**Implementation Steps:**
1. Analyze your current entity structure
2. Calculate potential S-Corp savings
3. Consider your state's tax implications
4. Factor in additional compliance costs
5. Make the election before March 15th for current year treatment

**Advanced Tip:** For high earners, we often recommend the Augusta Rule strategy - rent your home to your business for up to 14 days annually, tax-free income up to $20,000+.
            """",
            "module_number": 2,
            "estimated_duration": 75
        }
    ]
    
    if await db.modules.count_documents({}) == 0:
        await db.modules.insert_many(modules_data)
    
    # Tax Glossary Terms
    glossary_data = [
        {
            "id": "gl1",
            "term": "MSO (Management Services Organization)",
            "definition": "A legal entity that provides management and administrative services to healthcare practices, allowing for tax optimization through service fee structures.",
            "plain_english": "Think of an MSO as a separate business that handles all the administrative work for your medical practice. Instead of the practice paying high taxes on all its income, it pays the MSO for services, which can be structured to minimize overall tax burden.",
            "case_study": {
                "client": "Dr. Sarah Chen, Orthopedic Surgeon",
                "situation": "Solo practice generating $800,000 annually",
                "problem": "Paying 37% federal + 13.3% California + 15.3% SE tax = 65.6% total tax rate",
                "solution": "Established MSO to provide administrative, billing, and consulting services to practice",
                "result": "Shifted $300,000 in income to MSO with favorable tax treatment",
                "savings": "$45,000 annually in reduced taxes"
            },
            "related_strategies": ["S-Corp Election", "Professional Service Corporations", "Income Shifting"],
            "category": "Business Structures"
        },
        {
            "id": "gl2", 
            "term": "QSBS (Qualified Small Business Stock)",
            "definition": "Section 1202 allows founders and early employees to exclude up to $10 million or 10x their basis in qualified small business stock from federal capital gains taxes.",
            "plain_english": "If you start or join a small business early and meet specific requirements, you can potentially sell your shares and pay ZERO federal capital gains tax on up to $10 million in profits.",
            "case_study": {
                "client": "Marcus Rodriguez, SaaS Founder",
                "situation": "Founded software company in 2019, owns 60% equity",
                "problem": "Company valued at $25 million, potential $15M personal gain subject to 20% capital gains + 3.8% net investment tax",
                "solution": "Structured as C-Corp from inception, met all QSBS requirements including 5-year holding period",
                "result": "Qualified for Section 1202 exclusion on $10 million of gains", 
                "savings": "$2.38 million in federal taxes avoided (20% + 3.8% on $10M)"
            },
            "related_strategies": ["C-Corp Structure", "Equity Compensation", "Exit Planning"],
            "category": "Investment & Equity"
        },
        {
            "id": "gl3",
            "term": "Cost Segregation",
            "definition": "An engineering-based study that reclassifies components of a building to shorter depreciation periods, accelerating deductions and improving cash flow.",
            "plain_english": "Instead of depreciating your entire building over 39 years, cost segregation identifies parts (like carpets, lighting, landscaping) that can be depreciated over 5-15 years, giving you much larger tax deductions upfront.",
            "case_study": {
                "client": "Jennifer Park, Real Estate Investor", 
                "situation": "Purchased $2.5M commercial building for dental practice",
                "problem": "Standard depreciation: $64,103 annually over 39 years",
                "solution": "Cost segregation study identified $800,000 in 5-15 year property",
                "result": "First-year depreciation increased to $180,000 with bonus depreciation",
                "savings": "$41,400 in tax savings (36% rate x $115,897 additional deduction)"
            },
            "related_strategies": ["Bonus Depreciation", "Section 179", "Real Estate Professional"],
            "category": "Real Estate & Depreciation"
        },
        {
            "id": "gl4",
            "term": "REPS (Real Estate Professional Status)",
            "definition": "IRS designation allowing real estate professionals to deduct rental losses against other income, bypassing passive activity loss limitations.",
            "plain_english": "Normally, losses from rental properties can only offset rental income. But if you qualify as a real estate professional, you can use those losses to reduce taxes on your W2 job or business income.",
            "case_study": {
                "client": "David and Lisa Thompson, High-Income Couple",
                "situation": "David: $250K W2 engineer, Lisa: $180K consultant, own 3 rental properties with $85K in tax losses",
                "problem": "Passive loss rules prevent using rental losses against high W2/business income",
                "solution": "Lisa qualified for REPS by spending 750+ hours and >50% of her time in real estate activities",
                "result": "Unlocked $85,000 in rental losses against their ordinary income",
                "savings": "$28,900 in federal tax savings (34% marginal rate)"
            },
            "related_strategies": ["Cost Segregation", "Short-Term Rental Loophole", "Passive Activity Rules"],
            "category": "Real Estate Professional"
        },
        {
            "id": "gl5",
            "term": "QOF (Qualified Opportunity Fund)",
            "definition": "Investment vehicle that allows deferral and potential elimination of capital gains taxes by investing in designated low-income communities.",
            "plain_english": "Sell an investment with big gains, immediately reinvest those gains in an Opportunity Fund, and you can defer taxes until 2026 plus potentially eliminate taxes on the new investment's growth if held 10+ years.",
            "case_study": {
                "client": "Robert Kim, Tech Executive",
                "situation": "Exercised stock options generating $500,000 capital gain",
                "problem": "Facing $119,000 in federal capital gains taxes (20% + 3.8% NIIT)",
                "solution": "Invested $500K gain into Qualified Opportunity Fund real estate project",
                "result": "Deferred $119K tax until 2026, potential to eliminate taxes on QOF growth if held until 2030",
                "savings": "Immediate $119K tax deferral + potential elimination of future growth taxes"
            },
            "related_strategies": ["1031 Exchange", "Installment Sales", "Charitable Remainder Trust"],
            "category": "Investment & Deferral"
        }
    ]
    
    if await db.glossary_terms.count_documents({}) == 0:
        await db.glossary_terms.insert_many(glossary_data)
    
    # Tax Strategies Database
    strategies_data = [
        {
            "id": "strat1",
            "name": "S-Corp Salary Optimization",
            "description": "Optimize salary vs. distribution split to minimize self-employment taxes while maintaining reasonable compensation standards.",
            "potential_savings": "$5,000 - $15,000 annually",
            "complexity": "Moderate",
            "requirements": ["Business income", "S-Corp election", "Reasonable salary determination"],
            "tags": ["business", "s_corp", "self_employment", "payroll"],
            "impact_score": 85,
            "course_references": ["course1", "course3"]
        },
        {
            "id": "strat2", 
            "name": "QBI Section 199A Deduction",
            "description": "Maximize the 20% deduction on qualified business income through income optimization and W2 wage considerations.",
            "potential_savings": "$8,000 - $25,000 annually",
            "complexity": "Moderate",
            "requirements": ["Qualified business income", "Income under $364,200 (MFJ) or wage/asset tests"],
            "tags": ["business", "deduction", "qbi", "pass_through"],
            "impact_score": 90,
            "course_references": ["course2", "course3"]
        },
        {
            "id": "strat3",
            "name": "Augusta Rule (Section 280A)",
            "description": "Rent your home to your business for up to 14 days annually without reporting the income, while business deducts the expense.",
            "potential_savings": "$3,000 - $8,000 annually", 
            "complexity": "Low",
            "requirements": ["Business use of home", "Legitimate business purpose", "Reasonable rental rate"],
            "tags": ["home_office", "business", "rental", "deduction"],
            "impact_score": 75,
            "course_references": ["course1", "course3"]
        },
        {
            "id": "strat4",
            "name": "Cost Segregation Study", 
            "description": "Accelerate depreciation on commercial real estate by reclassifying building components to shorter recovery periods.",
            "potential_savings": "$15,000 - $75,000 in first year",
            "complexity": "High",
            "requirements": ["Commercial real estate ownership", "Building cost >$500K", "Engineering study"],
            "tags": ["real_estate", "depreciation", "commercial", "acceleration"],
            "impact_score": 95,
            "course_references": ["course3"]
        },
        {
            "id": "strat5",
            "name": "Retirement Plan Maximization",
            "description": "Implement advanced retirement strategies including Solo 401k, defined benefit plans, and cash balance plans for high earners.",
            "potential_savings": "$10,000 - $50,000 annually",
            "complexity": "Moderate", 
            "requirements": ["Business income", "High earnings", "Administrative capacity"],
            "tags": ["retirement", "business", "high_earner", "deduction"],
            "impact_score": 80,
            "course_references": ["course2", "course3"]
        }
    ]
    
    if await db.tax_strategies.count_documents({}) == 0:
        await db.tax_strategies.insert_many(strategies_data)

# Routes
@app.get("/api/")
async def root():
    return {"message": "IRS Escape Plan API - Ready to help you master tax strategies"}

@app.get("/api/status")
async def status():
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

@app.on_event("startup")
async def startup_event():
    await initialize_sample_data()

# Course Management Routes
@app.get("/api/categories")
async def get_categories():
    categories = await db.categories.find({}).to_list(None)
    return categories

@app.get("/api/courses")
async def get_courses(user_email: Optional[str] = None):
    courses = await db.courses.find({}).to_list(None)
    
    if user_email:
        # Add progress information for each course
        for course in courses:
            modules = await db.modules.find({"course_id": course["id"]}).to_list(None)
            total_modules = len(modules)
            
            if total_modules > 0:
                completed_modules = 0
                for module in modules:
                    progress = await db.user_module_progress.find_one({
                        "user_email": user_email,
                        "module_id": module["id"],
                        "completed": True
                    })
                    if progress:
                        completed_modules += 1
                
                course["progress"] = {
                    "completed_modules": completed_modules,
                    "total_modules": total_modules,
                    "percentage": round((completed_modules / total_modules) * 100)
                }
            else:
                course["progress"] = {"completed_modules": 0, "total_modules": 0, "percentage": 0}
    
    return courses

@app.get("/api/courses/{course_id}")
async def get_course(course_id: str, user_email: Optional[str] = None):
    course = await db.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    modules = await db.modules.find({"course_id": course_id}).sort("module_number").to_list(None)
    
    if user_email:
        # Add progress and bookmark information
        for module in modules:
            progress = await db.user_module_progress.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
            bookmark = await db.user_bookmarks.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
            
            module["progress"] = progress if progress else None
            module["bookmark"] = bookmark if bookmark else None
    
    course["modules"] = modules
    return course

@app.get("/api/courses/{course_id}/modules/{module_id}")
async def get_module(course_id: str, module_id: str, user_email: Optional[str] = None):
    # Check if course exists and user has access
    course = await db.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # For premium courses, you would check user subscription here
    # For now, allowing access to demonstrate functionality
    
    module = await db.modules.find_one({"id": module_id, "course_id": course_id})
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    if user_email:
        progress = await db.user_module_progress.find_one({
            "user_email": user_email,
            "module_id": module_id
        })
        bookmark = await db.user_bookmarks.find_one({
            "user_email": user_email,
            "module_id": module_id
        })
        
        module["progress"] = progress if progress else None
        module["bookmark"] = bookmark if bookmark else None
    
    return module

@app.post("/api/modules/progress")
async def update_progress(progress_data: dict):
    user_email = progress_data.get("user_email")
    module_id = progress_data.get("module_id")
    completed = progress_data.get("completed", False)
    progress_percentage = progress_data.get("progress_percentage", 0)
    
    # Update or create progress record
    update_data = {
        "user_email": user_email,
        "module_id": module_id,
        "completed": completed,
        "progress_percentage": progress_percentage,
        "completed_at": datetime.now() if completed else None
    }
    
    await db.user_module_progress.update_one(
        {"user_email": user_email, "module_id": module_id},
        {"$set": update_data},
        upsert=True
    )
    
    return {"status": "success", "message": "Progress updated"}

@app.post("/api/modules/bookmark")
async def toggle_bookmark(bookmark_data: dict):
    user_email = bookmark_data.get("user_email")
    module_id = bookmark_data.get("module_id")
    notes = bookmark_data.get("notes", "")
    
    # Check if bookmark exists
    existing = await db.user_bookmarks.find_one({
        "user_email": user_email,
        "module_id": module_id
    })
    
    if existing:
        # Remove bookmark
        await db.user_bookmarks.delete_one({"id": existing["id"]})
        return {"status": "success", "action": "removed", "bookmarked": False}
    else:
        # Add bookmark
        bookmark = {
            "id": str(uuid.uuid4()),
            "user_email": user_email,
            "module_id": module_id,
            "notes": notes,
            "bookmarked_at": datetime.now()
        }
        await db.user_bookmarks.insert_one(bookmark)
        return {"status": "success", "action": "added", "bookmarked": True}

# Assessment Tools Routes
@app.post("/api/tax-calculator")
async def calculate_taxes(request: TaxCalculatorRequest):
    """Calculate potential tax savings based on user input"""
    
    # Simplified tax calculation logic
    income = request.annual_income
    base_tax = 0
    optimized_tax = 0
    
    # Basic federal tax calculation (2024 brackets)
    if income <= 22050:
        base_tax = income * 0.12
    elif income <= 89450:
        base_tax = 22050 * 0.12 + (income - 22050) * 0.22
    elif income <= 190750:
        base_tax = 22050 * 0.12 + (89450 - 22050) * 0.22 + (income - 89450) * 0.24
    else:
        base_tax = 22050 * 0.12 + (89450 - 22050) * 0.22 + (190750 - 89450) * 0.24 + (income - 190750) * 0.32
    
    # Add self-employment tax if applicable
    if request.has_business:
        se_tax = min(income * 0.9235, 160200) * 0.153
        base_tax += se_tax
    
    # Calculate optimized scenario
    strategies_applied = []
    savings_breakdown = {}
    
    if request.has_business and request.entity_type == "s_corp":
        # S-Corp optimization
        reasonable_salary = income * 0.6  # 60% as salary
        distribution = income * 0.4  # 40% as distribution
        
        se_tax_optimized = min(reasonable_salary * 0.9235, 160200) * 0.153
        se_savings = (min(income * 0.9235, 160200) * 0.153) - se_tax_optimized
        
        optimized_tax = base_tax - se_savings
        strategies_applied.append("S-Corp Election")
        savings_breakdown["S-Corp Salary Optimization"] = se_savings
    
    if "business" in request.income_types:
        # QBI Deduction
        qbi_deduction = min(income * 0.2, income * 0.2)  # Simplified
        qbi_savings = qbi_deduction * 0.24  # Average tax rate
        optimized_tax -= qbi_savings
        strategies_applied.append("QBI Section 199A Deduction")
        savings_breakdown["QBI Deduction"] = qbi_savings
        
        # Augusta Rule potential
        augusta_savings = 2400  # $200/day * 12 days average
        optimized_tax -= augusta_savings * 0.24
        strategies_applied.append("Augusta Rule")
        savings_breakdown["Augusta Rule Strategy"] = augusta_savings * 0.24
    
    total_savings = base_tax - optimized_tax
    
    # Save calculation to database
    calculation_record = {
        "id": str(uuid.uuid4()),
        "user_email": request.user_email,
        "annual_income": income,
        "inputs": request.dict(),
        "matched_strategies": strategies_applied,
        "total_estimated_savings": total_savings,
        "savings_breakdown": savings_breakdown,
        "calculated_at": datetime.now()
    }
    
    await db.tax_calculations.insert_one(calculation_record)
    
    return {
        "current_tax_burden": round(base_tax, 2),
        "optimized_tax_burden": round(optimized_tax, 2),
        "total_annual_savings": round(total_savings, 2),
        "strategies_applied": strategies_applied,
        "savings_breakdown": {k: round(v, 2) for k, v in savings_breakdown.items()},
        "next_steps": [
            "Schedule consultation to implement S-Corp election",
            "Set up business entity and accounting systems", 
            "Implement Augusta Rule documentation",
            "Maximize QBI deduction opportunities"
        ]
    }

@app.post("/api/strategy-builder")
async def build_strategy(request: StrategyBuilderRequest):
    """Generate personalized tax strategy recommendations"""
    
    # Get all available strategies
    all_strategies = await db.tax_strategies.find({}).to_list(None)
    
    # Strategy matching logic based on user profile
    matched_strategies = []
    total_estimated_savings = 0
    
    for strategy in all_strategies:
        score = 0
        
        # Score based on income types
        if "business" in request.income_types:
            if any(tag in strategy["tags"] for tag in ["business", "s_corp", "qbi"]):
                score += 30
        
        if "w2" in request.income_types:
            if any(tag in strategy["tags"] for tag in ["retirement", "deduction"]):
                score += 20
        
        # Score based on entity type
        if request.entity_type == "s_corp" and "s_corp" in strategy["tags"]:
            score += 25
        elif request.entity_type == "llc" and "business" in strategy["tags"]:
            score += 20
        
        # Score based on lifestyle factors
        if "home_office" in request.lifestyle_factors:
            if "home_office" in strategy["tags"]:
                score += 20
        
        if "real_estate" in request.lifestyle_factors:
            if "real_estate" in strategy["tags"]:
                score += 25
        
        # Score based on income level
        if request.annual_income > 200000:
            if strategy["complexity"] in ["Moderate", "High"]:
                score += 15
        
        # Add base impact score
        score += strategy["impact_score"] * 0.3
        
        if score > 40:  # Threshold for recommendation
            # Estimate savings based on income and strategy type
            if "S-Corp" in strategy["name"]:
                estimated = min(request.annual_income * 0.08, 15000)
            elif "QBI" in strategy["name"]:
                estimated = min(request.annual_income * 0.12, 25000)
            elif "Cost Segregation" in strategy["name"]:
                estimated = 35000  # Fixed estimate for real estate
            elif "Augusta" in strategy["name"]:
                estimated = 2400
            else:
                estimated = request.annual_income * 0.05
            
            strategy["matching_score"] = round(score, 1)
            strategy["estimated_annual_savings"] = round(estimated, 2)
            total_estimated_savings += estimated
            matched_strategies.append(strategy)
    
    # Sort by matching score
    matched_strategies.sort(key=lambda x: x["matching_score"], reverse=True)
    
    # Take top 8 strategies
    matched_strategies = matched_strategies[:8]
    
    # Save assessment to database
    assessment_record = {
        "id": str(uuid.uuid4()),
        "user_email": request.user_email,
        "assessment_data": request.dict(),
        "matched_strategies": [s["id"] for s in matched_strategies],
        "total_estimated_savings": total_estimated_savings,
        "completed_at": datetime.now()
    }
    
    await db.strategy_builder_results.insert_one(assessment_record)
    
    return {
        "total_estimated_savings": round(total_estimated_savings, 2),
        "matched_strategies": matched_strategies,
        "assessment_summary": {
            "income_level": "High Earner" if request.annual_income > 150000 else "Moderate Earner",
            "primary_opportunities": ["Business Structure Optimization", "Advanced Deductions", "Retirement Maximization"],
            "complexity_level": "Advanced" if len(matched_strategies) > 5 else "Moderate"
        },
        "next_steps": [
            "Download your personalized strategy report",
            "Schedule implementation consultation",
            "Begin with highest-impact strategies first",
            "Set up tracking for tax savings measurement"
        ]
    }

@app.get("/api/strategy-builder/strategies")
async def get_all_strategies():
    """Get complete database of tax strategies"""
    strategies = await db.tax_strategies.find({}).to_list(None)
    return strategies

# Content Routes
@app.get("/api/glossary")
async def get_glossary(search: Optional[str] = None):
    """Get tax glossary terms with optional search"""
    query = {}
    if search:
        query = {
            "$or": [
                {"term": {"$regex": search, "$options": "i"}},
                {"definition": {"$regex": search, "$options": "i"}},
                {"plain_english": {"$regex": search, "$options": "i"}}
            ]
        }
    
    terms = await db.glossary_terms.find(query).to_list(None)
    return terms

@app.get("/api/strategies")
async def get_strategies():
    """Get all tax strategies"""
    strategies = await db.tax_strategies.find({}).to_list(None)
    return strategies

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
