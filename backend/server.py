from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
from datetime import datetime, timedelta
import uvicorn
import asyncio

# Environment configuration
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "irs_escape_plan")

# FastAPI app
app = FastAPI(title="IRS Escape Plan API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database client
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Pydantic models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    subscription_status: str = "free"

class StrategyBuilderResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    income_types: List[str]
    entity_type: str
    lifestyle_factors: List[str]
    goals: List[str]
    matched_strategies: List[Dict[str, Any]]
    completed_at: datetime = Field(default_factory=datetime.utcnow)

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
    created_at: datetime = Field(default_factory=datetime.utcnow)

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
    progress_percentage: float = 0.0
    completed_at: Optional[datetime] = None

class UserBookmark(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    module_id: str
    notes: Optional[str] = None
    bookmarked_at: datetime = Field(default_factory=datetime.utcnow)

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    course_id: Optional[str] = None
    user_email: str
    amount: float
    payment_status: str
    stripe_status: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AIAssistantPurchase(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    plan_type: str  # "lifetime" or "monthly"
    amount: float
    purchased_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
    status: str = "active"

class ChatConversation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_email: str
    title: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    conversation_id: str
    user_email: str
    message_type: str  # "user" or "assistant"
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Tax Strategy Builder Data
STRATEGY_DATABASE = [
    {
        "strategy": "Augusta Rule",
        "match_tags": ["business_owner", "has_kids", "home_office"],
        "impact": "Save $3K–$15K/year",
        "module": "Pay Your Kids Legally",
        "glossary": ["Augusta Rule"],
        "description": "Rent your home to your business for up to 14 days per year tax-free, perfect for business meetings and events."
    },
    {
        "strategy": "REPS (Real Estate Professional Status)",
        "match_tags": ["real_estate", "business_owner", "llc"],
        "impact": "Save $10K–$25K/year",
        "module": "Real Estate Pro Tax Hacks",
        "glossary": ["reps"],
        "description": "Qualify as a real estate professional to deduct rental losses against other income without passive activity limitations."
    },
    {
        "strategy": "QSBS (Qualified Small Business Stock)",
        "match_tags": ["investor", "c_corp"],
        "impact": "Save up to $10M in capital gains",
        "module": "Capital Gains Optimization",
        "glossary": ["qsbs"],
        "description": "Structure your business sale to potentially exclude up to $10 million in capital gains from federal taxes."
    },
    {
        "strategy": "S Corp Salary Optimization",
        "match_tags": ["s_corp", "business_owner"],
        "impact": "Save $8K–$12K/year",
        "module": "Salary Split Strategy",
        "glossary": ["s_corp"],
        "description": "Optimize your salary vs. distribution split to minimize self-employment taxes while maintaining IRS compliance."
    },
    {
        "strategy": "Paying Your Kids Legally",
        "match_tags": ["business_owner", "has_kids"],
        "impact": "Save $6K per child",
        "module": "Pay Your Kids Legally",
        "glossary": ["child_income"],
        "description": "Hire your children in your business to shift income to lower tax brackets and teach them valuable work skills."
    },
    {
        "strategy": "Cost Segregation",
        "match_tags": ["real_estate", "has_rentals"],
        "impact": "Save $25K+ upfront",
        "module": "Depreciation Acceleration",
        "glossary": ["cost_segregation"],
        "description": "Accelerate depreciation on commercial properties by identifying components that can be depreciated over shorter periods."
    },
    {
        "strategy": "Installment Sales",
        "match_tags": ["investor", "exit_planning"],
        "impact": "Spread out capital gains, reduce tax burden",
        "module": "Smart Exit Planning",
        "glossary": ["installment_sale"],
        "description": "Structure asset sales to receive payments over multiple years, keeping you in lower tax brackets."
    },
    {
        "strategy": "QBI Deduction Optimization",
        "match_tags": ["s_corp", "llc", "business_owner"],
        "impact": "Save $10K/year",
        "module": "Business Income Strategies",
        "glossary": ["qbi"],
        "description": "Maximize your 20% qualified business income deduction through proper entity structuring and income planning."
    },
    {
        "strategy": "Home Office Deduction",
        "match_tags": ["home_office", "business_owner", "contractor_income"],
        "impact": "Save $2K–$4K/year",
        "module": "Home Office Tax Breaks",
        "glossary": ["home_office"],
        "description": "Properly claim home office expenses to reduce taxable income while avoiding IRS red flags."
    },
    {
        "strategy": "Conservation Easement",
        "match_tags": ["investor", "build_wealth", "donates"],
        "impact": "Six-figure charitable deduction opportunity",
        "module": "Charitable Planning Strategies",
        "glossary": ["conservation_easement"],
        "description": "Donate development rights on land for significant charitable deductions while maintaining ownership."
    },
    {
        "strategy": "Crypto Tax Loss Harvesting",
        "match_tags": ["crypto", "investor"],
        "impact": "Offset capital gains with crypto losses",
        "module": "Crypto Tax Strategies",
        "glossary": ["crypto_loss"],
        "description": "Strategically realize crypto losses to offset capital gains from other investments."
    },
    {
        "strategy": "QOF (Qualified Opportunity Fund)",
        "match_tags": ["investor", "build_wealth"],
        "impact": "Defer or exclude capital gains via Opportunity Zones",
        "module": "Opportunity Fund Tax Planning",
        "glossary": ["qof"],
        "description": "Invest capital gains in Qualified Opportunity Funds to defer and potentially eliminate capital gains taxes."
    }
]

def match_strategies(user_inputs):
    """Match user inputs to relevant tax strategies"""
    # Convert user inputs to tags
    user_tags = []
    
    # Income types
    income_map = {
        "W-2": ["w2_income"],
        "1099": ["contractor_income"],
        "Business Owner": ["business_owner"],
        "Real Estate": ["real_estate"],
        "Investments": ["investor"],
        "Crypto": ["crypto"]
    }
    
    for income_type in user_inputs.get("income_types", []):
        user_tags.extend(income_map.get(income_type, []))
    
    # Entity type
    entity_map = {
        "Sole Proprietorship": ["sole_prop"],
        "LLC": ["llc"],
        "S Corp": ["s_corp"],
        "C Corp": ["c_corp"]
    }
    
    entity_type = user_inputs.get("entity_type", "")
    user_tags.extend(entity_map.get(entity_type, []))
    
    # Lifestyle factors
    lifestyle_map = {
        "Minor children": ["has_kids"],
        "Home office": ["home_office"],
        "Charitable giving": ["donates"],
        "Rental properties": ["has_rentals"],
        "Business travel": ["business_travel"]
    }
    
    for lifestyle in user_inputs.get("lifestyle_factors", []):
        user_tags.extend(lifestyle_map.get(lifestyle, []))
    
    # Goals
    goal_map = {
        "Pay less now": ["reduce_taxes"],
        "Build wealth": ["build_wealth"],
        "Reduce audit risk": ["reduce_risk"],
        "Exit planning": ["exit_planning"]
    }
    
    for goal in user_inputs.get("goals", []):
        user_tags.extend(goal_map.get(goal, []))
    
    # Match strategies
    matched_strategies = []
    
    for strategy in STRATEGY_DATABASE:
        # Check if any of the strategy's required tags match user tags
        if any(tag in user_tags for tag in strategy["match_tags"]):
            # Calculate match score based on number of matching tags
            match_score = len(set(strategy["match_tags"]) & set(user_tags))
            strategy_copy = strategy.copy()
            strategy_copy["match_score"] = match_score
            matched_strategies.append(strategy_copy)
    
    # Sort by match score (highest first)
    matched_strategies.sort(key=lambda x: x["match_score"], reverse=True)
    
    return matched_strategies

# Helper function to convert MongoDB documents
def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable dict"""
    if doc is None:
        return None
    if "_id" in doc:
        del doc["_id"]
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    return doc

# Sample data initialization
async def init_sample_data():
    """Initialize sample data if collections are empty"""
    
    # Categories
    categories_data = [
        {"id": str(uuid.uuid4()), "name": "Tax Fundamentals", "description": "Core tax planning concepts", "color": "#2d4c45"},
        {"id": str(uuid.uuid4()), "name": "Business Strategies", "description": "Advanced business tax strategies", "color": "#e57e35"},
        {"id": str(uuid.uuid4()), "name": "Investment Planning", "description": "Tax-efficient investment strategies", "color": "#b95d26"}
    ]
    
    if await db.categories.count_documents({}) == 0:
        await db.categories.insert_many(categories_data)
    
    # Sample courses
    courses_data = [
        {
            "id": str(uuid.uuid4()),
            "title": "Introduction to Tax Planning",
            "description": "Master the fundamentals of strategic tax planning for high-income professionals",
            "thumbnail": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            "category_id": categories_data[0]["id"],
            "instructor": "Shaun Quan, CPA",
            "difficulty": "Beginner",
            "duration": 120,
            "price": 0.0,
            "is_premium": False,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Tax Planning for W2 Employees",
            "description": "Advanced strategies for high-earning employees to minimize tax liability",
            "thumbnail": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
            "category_id": categories_data[0]["id"],
            "instructor": "Jordan Williams, EA",
            "difficulty": "Intermediate",
            "duration": 480,
            "price": 1497.0,
            "is_premium": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Business Tax Strategies for Entrepreneurs",
            "description": "Comprehensive tax planning for business owners and entrepreneurs",
            "thumbnail": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "category_id": categories_data[1]["id"],
            "instructor": "Shaun Quan, CPA",
            "difficulty": "Advanced",
            "duration": 720,
            "price": 2497.0,
            "is_premium": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    if await db.courses.count_documents({}) == 0:
        await db.courses.insert_many(courses_data)
    
    # Sample modules for first course
    sample_course_id = courses_data[0]["id"]
    modules_data = [
        {
            "id": str(uuid.uuid4()),
            "course_id": sample_course_id,
            "title": "Understanding Tax Brackets",
            "description": "Learn how progressive tax brackets work and impact your planning",
            "content": """**Shaun:** Welcome to our comprehensive guide on tax brackets, Jordan. Today we're going to break down how the progressive tax system actually works.

**Jordan:** Absolutely, Shaun. This is foundational knowledge that every high-income professional needs to understand. Let me start with a real client example.

**Case Study: Dr. Amanda Rodriguez**
- **Profession:** Orthopedic Surgeon
- **Annual Income:** $485,000
- **Filing Status:** Married Filing Jointly

**Jordan:** Dr. Rodriguez came to us thinking she was paying 37% on her entire income because that's her top tax bracket. But that's not how it works.

**Shaun:** Exactly. The progressive system means you pay different rates on different portions of your income. For 2024, the brackets for married filing jointly are:

- 10% on income up to $23,200
- 12% on income from $23,201 to $94,300
- 22% on income from $94,301 to $201,050
- 24% on income from $201,051 to $383,900
- 32% on income from $383,901 to $487,450
- 35% on income from $487,451 to $731,200
- 37% on income above $731,200

**Jordan:** So Dr. Rodriguez only pays 32% on the income between $383,901 and $485,000. Her effective tax rate is actually around 26.8%, not 37%.

**Key Takeaway:** Understanding this concept is crucial for tax planning strategies like timing income recognition and maximizing deductions in high-bracket years.""",
            "module_number": 1,
            "estimated_duration": 25
        },
        {
            "id": str(uuid.uuid4()),
            "course_id": sample_course_id,
            "title": "Deduction vs Credit Strategy",
            "description": "Master the difference between deductions and credits for maximum tax savings",
            "content": """**Shaun:** Jordan, let's talk about one of the most misunderstood concepts in tax planning - the difference between deductions and credits.

**Jordan:** This is huge, Shaun. I see high-income clients make costly mistakes here all the time. Let me illustrate with our client Maria Santos.

**Case Study: Maria Santos, Tech Executive**
- **Annual Salary:** $325,000
- **Tax Bracket:** 32%
- **Challenge:** Maximizing tax savings with limited options

**Shaun:** Maria was focused entirely on charitable deductions, thinking bigger deductions meant bigger savings. But we showed her something better.

**Deductions vs Credits:**

**Deduction Example:**
- $10,000 charitable donation
- Tax savings: $10,000 × 32% = $3,200

**Credit Example:**
- $10,000 investment in Qualified Opportunity Fund
- Tax credit: Direct $10,000 reduction in taxes owed

**Jordan:** The credit gives Maria more than triple the tax benefit! Plus, credits aren't subject to phase-outs like many deductions are at her income level.

**Advanced Strategy:**
We helped Maria implement a **Credit Stacking Strategy**:
1. Solar panel installation: $26,000 credit (30% of $87,000 cost)
2. Electric vehicle purchase: $7,500 credit
3. Child care expenses: $3,000 credit (two children)

**Results:** Total tax reduction of $36,500 versus traditional deduction strategies that would have saved only $12,000.

**Shaun:** Remember, a dollar of credit equals a dollar of tax savings, while a deduction only saves you your marginal tax rate percentage.""",
            "module_number": 2,
            "estimated_duration": 30
        }
    ]
    
    if await db.modules.count_documents({}) == 0:
        await db.modules.insert_many(modules_data)

# API Routes

@app.get("/api/")
async def read_root():
    return {"message": "IRS Escape Plan API - Ready to help you master tax strategies"}

@app.get("/api/status")
async def get_status():
    """API health check"""
    try:
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "message": "IRS Escape Plan API is running"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

# Course Management APIs
@app.get("/api/categories")
async def get_categories():
    """Get all course categories"""
    categories = await db.categories.find({}).to_list(100)
    categories = [serialize_doc(cat) for cat in categories]
    return {"categories": categories}

@app.get("/api/courses")
async def get_courses(
    category_id: Optional[str] = Query(None),
    user_email: Optional[str] = Query(None)
):
    """Get all courses with optional filtering"""
    query = {}
    if category_id:
        query["category_id"] = category_id
    
    courses = await db.courses.find(query).to_list(100)
    courses = [serialize_doc(course) for course in courses]
    
    # Add user progress if email provided
    if user_email:
        for course in courses:
            course_modules = await db.modules.find({"course_id": course["id"]}).to_list(100)
            total_modules = len(course_modules)
            
            if total_modules > 0:
                completed_modules = 0
                for module in course_modules:
                    progress = await db.user_progress.find_one({
                        "user_email": user_email,
                        "module_id": module["id"],
                        "completed": True
                    })
                    if progress:
                        completed_modules += 1
                
                course["progress_percentage"] = (completed_modules / total_modules) * 100
            else:
                course["progress_percentage"] = 0
    
    return {"courses": courses}

@app.get("/api/courses/{course_id}")
async def get_course_detail(course_id: str, user_email: Optional[str] = Query(None)):
    """Get detailed course information with modules"""
    course = await db.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course = serialize_doc(course)
    modules = await db.modules.find({"course_id": course_id}).sort("module_number", 1).to_list(100)
    modules = [serialize_doc(module) for module in modules]
    
    # Add user progress and bookmarks if email provided
    if user_email:
        for module in modules:
            # Get progress
            progress = await db.user_progress.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
            module["progress"] = serialize_doc(progress) if progress else None
            
            # Get bookmark status
            bookmark = await db.user_bookmarks.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
            bookmark = serialize_doc(bookmark) if bookmark else None
            module["is_bookmarked"] = bool(bookmark)
            module["bookmark_notes"] = bookmark.get("notes") if bookmark else None
    
    course["modules"] = modules
    return {"course": course}

# Progress Tracking APIs
@app.post("/api/modules/progress")
async def update_module_progress(data: dict):
    """Update user progress on a module"""
    user_email = data.get("user_email")
    module_id = data.get("module_id")
    completed = data.get("completed", False)
    progress_percentage = data.get("progress_percentage", 0.0)
    
    if not user_email or not module_id:
        raise HTTPException(status_code=400, detail="user_email and module_id are required")
    
    # Check if progress record exists
    existing_progress = await db.user_progress.find_one({
        "user_email": user_email,
        "module_id": module_id
    })
    
    progress_data = {
        "user_email": user_email,
        "module_id": module_id,
        "completed": completed,
        "progress_percentage": progress_percentage,
        "completed_at": datetime.utcnow() if completed else None
    }
    
    if existing_progress:
        await db.user_progress.update_one(
            {"id": existing_progress["id"]},
            {"$set": progress_data}
        )
    else:
        progress_data["id"] = str(uuid.uuid4())
        await db.user_progress.insert_one(progress_data)
    
    return {"message": "Progress updated successfully"}

@app.post("/api/modules/bookmark")
async def toggle_module_bookmark(data: dict):
    """Toggle bookmark status for a module"""
    user_email = data.get("user_email")
    module_id = data.get("module_id")
    notes = data.get("notes", "")
    
    if not user_email or not module_id:
        raise HTTPException(status_code=400, detail="user_email and module_id are required")
    
    # Check if bookmark exists
    existing_bookmark = await db.user_bookmarks.find_one({
        "user_email": user_email,
        "module_id": module_id
    })
    
    if existing_bookmark:
        # Remove bookmark
        await db.user_bookmarks.delete_one({"id": existing_bookmark["id"]})
        return {"message": "Bookmark removed", "is_bookmarked": False}
    else:
        # Add bookmark
        bookmark_data = {
            "id": str(uuid.uuid4()),
            "user_email": user_email,
            "module_id": module_id,
            "notes": notes,
            "bookmarked_at": datetime.utcnow()
        }
        await db.user_bookmarks.insert_one(bookmark_data)
        return {"message": "Bookmark added", "is_bookmarked": True}

# Strategy Builder API
@app.post("/api/strategy-builder")
async def get_tax_strategies(data: dict):
    """Get personalized tax strategy recommendations with access control"""
    user_email = data.get("user_email")
    
    if not user_email:
        raise HTTPException(status_code=400, detail="user_email is required")
    
    # Check if user has access (premium course purchase) - for now we'll allow demo access
    # TODO: Implement proper access control when purchase system is ready
    # user_purchases = await db.user_purchases.find({"user_email": user_email}).to_list(100)
    # if not user_purchases:
    #     raise HTTPException(status_code=403, detail="Premium course access required")
    
    # Match strategies based on user inputs
    matched_strategies = match_strategies(data)
    
    # Save results to database
    result_data = {
        "id": str(uuid.uuid4()),
        "user_email": user_email,
        "income_types": data.get("income_types", []),
        "entity_type": data.get("entity_type", ""),
        "lifestyle_factors": data.get("lifestyle_factors", []),
        "goals": data.get("goals", []),
        "matched_strategies": [serialize_doc(s) for s in matched_strategies],
        "completed_at": datetime.utcnow()
    }
    
    await db.strategy_builder_results.insert_one(result_data)
    
    return {
        "strategies": matched_strategies,
        "total_matches": len(matched_strategies),
        "user_inputs": {
            "income_types": data.get("income_types", []),
            "entity_type": data.get("entity_type", ""),
            "lifestyle_factors": data.get("lifestyle_factors", []),
            "goals": data.get("goals", [])
        }
    }

@app.get("/api/strategy-builder/access/{user_email}")
async def check_strategy_builder_access(user_email: str):
    """Check if user has access to strategy builder"""
    # For demo purposes, allow access. In production, check course purchases
    # user_purchases = await db.user_purchases.find({"user_email": user_email}).to_list(100)
    
    # Check if user has completed strategy builder before
    previous_result = await db.strategy_builder_results.find_one({"user_email": user_email})
    
    return {
        "has_access": True,  # Demo access for all users
        "has_completed": bool(previous_result),
        "last_completed": previous_result.get("completed_at").isoformat() if previous_result and previous_result.get("completed_at") else None
    }

@app.get("/api/strategy-builder/results/{user_email}")
async def get_user_strategy_results(user_email: str):
    """Get user's previous strategy builder results"""
    result = await db.strategy_builder_results.find_one(
        {"user_email": user_email},
        sort=[("completed_at", -1)]
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="No strategy results found")
    
    return {"result": serialize_doc(result)}

@app.get("/api/strategies")
async def get_all_strategies():
    """Get all available tax strategies"""
    return {
        "strategies": STRATEGY_DATABASE,
        "total_strategies": len(STRATEGY_DATABASE)
    }

# Tax Calculator API
@app.post("/api/tax-calculator")
async def calculate_tax_savings(data: dict):
    """Calculate potential tax savings based on user inputs"""
    user_email = data.get("user_email")
    annual_income = data.get("annual_income", 0)
    
    # Convert inputs to tags for strategy matching
    user_tags = []
    
    # Income types mapping
    income_type_map = {
        'w2': ['w2_income'],
        '1099': ['contractor_income'],
        'business': ['business_owner'],
        'real_estate': ['real_estate'],
        'investments': ['investor'],
        'crypto': ['crypto']
    }
    
    for income_type in data.get("income_types", []):
        user_tags.extend(income_type_map.get(income_type, []))
    
    # Business and entity mapping
    if data.get("has_business", False):
        user_tags.append("business_owner")
        entity_type = data.get("entity_type", "")
        entity_map = {
            'sole_prop': ['sole_prop'],
            'llc': ['llc'],
            's_corp': ['s_corp'],
            'c_corp': ['c_corp']
        }
        user_tags.extend(entity_map.get(entity_type, []))
    
    # Lifestyle factors
    if data.get("minor_children", 0) > 0:
        user_tags.append("has_kids")
    if data.get("work_from_home", False):
        user_tags.append("home_office")
    if data.get("has_rentals", False):
        user_tags.append("has_rentals")
    if data.get("donates_to_charity", False):
        user_tags.append("donates")
    
    # Match strategies
    matched_strategies = []
    total_savings = 0
    
    for strategy in STRATEGY_DATABASE:
        # Check if any of the strategy's required tags match user tags
        if any(tag in user_tags for tag in strategy["match_tags"]):
            strategy_copy = strategy.copy()
            
            # Calculate match score
            match_score = len(set(strategy["match_tags"]) & set(user_tags))
            strategy_copy["match_score"] = match_score
            
            # Adjust savings based on income level (for some strategies)
            impact_value = strategy.get("impact_value", 0)
            
            # Income-based adjustments for certain strategies
            if strategy["strategy"] == "QBI Deduction Optimization" and annual_income:
                # QBI is up to 20% of qualified income, capped
                qbi_savings = min(annual_income * 0.20 * 0.32, 10000)  # 32% tax rate assumption
                impact_value = qbi_savings
                
            elif strategy["strategy"] == "S Corp Salary Optimization" and annual_income:
                # Self-employment tax savings roughly 15.3% on amount above reasonable salary
                se_savings = min(annual_income * 0.153 * 0.6, 15000)  # Conservative estimate
                impact_value = se_savings
                
            elif strategy["strategy"] == "Paying Your Kids Legally":
                # Multiple by number of kids
                kids_count = data.get("minor_children", 1)
                impact_value = impact_value * min(kids_count, 3)  # Cap at 3 kids for calculation
            
            strategy_copy["impact_value"] = int(impact_value)
            matched_strategies.append(strategy_copy)
            total_savings += impact_value
    
    # Sort by match score and impact
    matched_strategies.sort(key=lambda x: (x["match_score"], x["impact_value"]), reverse=True)
    
    # Limit to top 6 strategies for display
    matched_strategies = matched_strategies[:6]
    
    # Save calculation result
    if user_email and user_email != "anonymous":
        calculation_data = {
            "id": str(uuid.uuid4()),
            "user_email": user_email,
            "annual_income": annual_income,
            "inputs": data,
            "matched_strategies": [serialize_doc(s) for s in matched_strategies],
            "total_estimated_savings": int(total_savings),
            "calculated_at": datetime.utcnow()
        }
        
        await db.tax_calculations.insert_one(calculation_data)
    
    return {
        "total_estimated_savings": int(total_savings),
        "matched_strategies": matched_strategies,
        "calculation_summary": {
            "annual_income": annual_income,
            "strategies_found": len(matched_strategies),
            "user_tags": user_tags
        }
    }

@app.get("/api/ai-assistant/packages")
async def get_ai_packages():
    """Get AI assistant pricing packages"""
    return {
        "packages": [
            {
                "type": "lifetime",
                "name": "Lifetime Access",
                "price": 297,
                "description": "One-time payment for unlimited AI tax assistance"
            },
            {
                "type": "monthly",
                "name": "Monthly Subscription",
                "price": 49,
                "description": "Monthly subscription with full AI features"
            }
        ]
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize sample data on startup"""
    await init_sample_data()
    print("✅ IRS Escape Plan API started successfully with sample data")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)