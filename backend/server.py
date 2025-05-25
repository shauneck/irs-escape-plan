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

# Tax Glossary Data (stored in-memory for performance)
TAX_GLOSSARY = {
    "mso": {
        "term": "MSO (Management Services Organization)",
        "definition": "A legal entity that provides administrative and support services to healthcare practices while maintaining compliance with healthcare regulations.",
        "plain_english": "A company that handles the business side of medical practices so doctors can focus on patient care.",
        "case_study": {
            "client": "Dr. Sarah Chen, Cardiothoracic Surgeon",
            "situation": "Dr. Chen was paying $180,000 annually in self-employment taxes on her $600,000 practice income.",
            "structure": "Established an MSO to provide administrative services to her practice, converting $400,000 of income to corporate distributions.",
            "implementation": "MSO handles billing, HR, marketing, and facility management for the medical practice.",
            "results": "Reduced self-employment tax by $56,400 annually while maintaining full operational control."
        }
    },
    "qsbs": {
        "term": "QSBS (Qualified Small Business Stock)",
        "definition": "Stock in a qualified small business that may be eligible for significant federal tax benefits under Section 1202.",
        "plain_english": "Special stock that can save you millions in taxes when you sell your business if it meets specific criteria.",
        "case_study": {
            "client": "Marcus Rodriguez, Tech Entrepreneur",
            "situation": "Marcus sold his software company for $15 million after 7 years of ownership.",
            "structure": "Properly structured the business as a C-Corporation from inception to qualify for QSBS.",
            "implementation": "Maintained detailed records and ensured all QSBS requirements were met throughout ownership.",
            "results": "Saved $1.5 million in federal taxes on the sale, utilizing the full $10 million QSBS exclusion."
        }
    },
    "cost_segregation": {
        "term": "Cost Segregation",
        "definition": "An accounting method that accelerates depreciation deductions by identifying components of a building that can be depreciated over shorter periods.",
        "plain_english": "A way to get bigger tax deductions in the first few years after buying commercial property by breaking down the building into parts.",
        "case_study": {
            "client": "Jennifer Walsh, Real Estate Investor",
            "situation": "Jennifer purchased a $2.8 million commercial office building and wanted to maximize depreciation.",
            "structure": "Conducted cost segregation study identifying $840,000 in 5-7 year property components.",
            "implementation": "Accelerated depreciation on electrical, plumbing, flooring, and specialized equipment.",
            "results": "Generated $315,000 in additional first-year depreciation, saving $110,000 in taxes."
        }
    },
    "installment_sale": {
        "term": "Installment Sale",
        "definition": "A method of recognizing gain from the sale of property where payments are received over multiple tax years.",
        "plain_english": "Spreading out the tax hit from selling property by receiving payments over several years instead of all at once.",
        "case_study": {
            "client": "Robert Kim, Business Owner",
            "situation": "Robert sold his manufacturing business for $8 million, triggering a massive tax liability.",
            "structure": "Structured as installment sale with $2 million down and $1.5 million annually for four years.",
            "implementation": "Gain recognition spread over 5 years, keeping Robert in lower tax brackets.",
            "results": "Reduced effective tax rate from 37% to 24%, saving over $800,000 in total taxes."
        }
    },
    "qof": {
        "term": "QOF (Qualified Opportunity Fund)",
        "definition": "An investment vehicle designed to drive capital to distressed communities through temporary tax deferral and potential permanent exclusion.",
        "plain_english": "A special investment fund that lets you defer and potentially eliminate capital gains taxes by investing in designated low-income areas.",
        "case_study": {
            "client": "Patricia Moore, Investment Advisor",
            "situation": "Patricia had $3.2 million in capital gains from stock sales and faced a $640,000 tax bill.",
            "structure": "Invested gains into Qualified Opportunity Fund focused on affordable housing development.",
            "implementation": "Deferred all capital gains taxes and positioned for permanent exclusion after 10 years.",
            "results": "Deferred $640,000 in taxes with potential for complete elimination if held for full term."
        }
    },
    "reps": {
        "term": "REPS (Real Estate Professional Status)",
        "definition": "A tax classification allowing real estate professionals to deduct rental losses against other income without passive activity limitations.",
        "plain_english": "A special tax status that lets real estate professionals use property losses to offset their other income.",
        "case_study": {
            "client": "David Thompson, Real Estate Developer",
            "situation": "David had $450,000 in rental losses but couldn't use them due to passive activity rules.",
            "structure": "Qualified for Real Estate Professional Status by documenting 1,200+ hours in real estate activities.",
            "implementation": "Restructured time allocation and maintained detailed logs of real estate professional activities.",
            "results": "Unlocked $450,000 in previously suspended losses, generating $157,000 in tax savings."
        }
    },
    "oil_gas_depletion": {
        "term": "Oil & Gas Depletion",
        "definition": "Tax deductions available to owners of oil and gas properties for the reduction in reserves as resources are extracted.",
        "plain_english": "Special tax breaks for oil and gas investments that let you deduct more than you actually invested.",
        "case_study": {
            "client": "Michael Stevens, High-Income Executive",
            "situation": "Michael needed tax shelters for his $850,000 annual W-2 income.",
            "structure": "Invested in oil and gas drilling partnerships with intangible drilling costs and depletion allowances.",
            "implementation": "Claimed 75% of investment as immediate deduction plus ongoing percentage depletion.",
            "results": "Generated $320,000 in first-year deductions from $400,000 investment, saving $112,000 in taxes."
        }
    },
    "like_kind_exchange": {
        "term": "1031 Like-Kind Exchange",
        "definition": "A transaction allowing taxpayers to defer capital gains taxes by exchanging investment property for other investment property of like kind.",
        "plain_english": "Swapping one investment property for another without paying capital gains taxes right away.",
        "case_study": {
            "client": "Lisa Garcia, Property Investor",
            "situation": "Lisa wanted to sell her $1.8M apartment building (basis $600K) but avoid $240K in capital gains taxes.",
            "structure": "Executed 1031 exchange into larger commercial property worth $2.5M using qualified intermediary.",
            "implementation": "Identified replacement property within 45 days and completed exchange within 180 days.",
            "results": "Deferred $240,000 in capital gains taxes while upgrading to higher-value property with better cash flow."
        }
    },
    "conservation_easement": {
        "term": "Conservation Easement",
        "definition": "A legal agreement that permanently limits uses of land to protect its conservation values while allowing continued private ownership.",
        "plain_english": "Donating development rights on your land to charity for a big tax deduction while still owning the property.",
        "case_study": {
            "client": "William Parker, Private Equity Partner",
            "situation": "William earned $2.4M annually and needed significant charitable deductions.",
            "structure": "Donated conservation easement on 400-acre ranch, appraised at $3.2M for charitable value.",
            "implementation": "Preserved land for agricultural use while maintaining ownership and limited development rights.",
            "results": "Claimed $3.2M charitable deduction over 6 years, saving $1.1M in federal and state taxes."
        }
    },
    "captive_insurance": {
        "term": "Captive Insurance Company",
        "definition": "A wholly-owned subsidiary created to provide insurance coverage to its parent company and related entities.",
        "plain_english": "Creating your own insurance company to insure your business risks while getting tax deductions and building wealth.",
        "case_study": {
            "client": "Rachel Green, Manufacturing CEO",
            "situation": "Rachel's company had high insurance costs and wanted to retain underwriting profits.",
            "structure": "Formed captive insurance company to cover product liability, cyber security, and key person risks.",
            "implementation": "Paid $600,000 annually in premiums to captive, building reserves for future claims.",
            "results": "Deducted all premiums while building $3.2M in captive reserves over 5 years for family wealth transfer."
        }
    }
}

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
    
    modules = await db.modules.find({"course_id": course_id}).sort("module_number", 1).to_list(100)
    
    # Add user progress and bookmarks if email provided
    if user_email:
        for module in modules:
            # Get progress
            progress = await db.user_progress.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
            module["progress"] = progress if progress else None
            
            # Get bookmark status
            bookmark = await db.user_bookmarks.find_one({
                "user_email": user_email,
                "module_id": module["id"]
            })
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

# Tax Glossary API
@app.get("/api/glossary")
async def get_tax_glossary(search: Optional[str] = Query(None)):
    """Get tax glossary terms with optional search"""
    glossary = TAX_GLOSSARY
    
    if search:
        search_lower = search.lower()
        filtered_glossary = {
            key: value for key, value in glossary.items()
            if search_lower in value["term"].lower() or 
               search_lower in value["definition"].lower() or
               search_lower in value["plain_english"].lower()
        }
        return {"glossary": filtered_glossary}
    
    return {"glossary": glossary}

@app.get("/api/glossary/{term_key}")
async def get_glossary_term(term_key: str):
    """Get specific glossary term details"""
    if term_key not in TAX_GLOSSARY:
        raise HTTPException(status_code=404, detail="Glossary term not found")
    
    return {"term": TAX_GLOSSARY[term_key]}

# AI Assistant APIs (placeholder for now)
@app.get("/api/ai-assistant/access/{user_email}")
async def check_ai_access(user_email: str):
    """Check if user has AI assistant access"""
    purchase = await db.ai_assistant_purchases.find_one({
        "user_email": user_email,
        "status": "active"
    })
    
    if not purchase:
        return {"has_access": False, "message": "No active AI assistant subscription"}
    
    # Check if monthly subscription is expired
    if purchase["plan_type"] == "monthly" and purchase["expires_at"]:
        if datetime.utcnow() > purchase["expires_at"]:
            await db.ai_assistant_purchases.update_one(
                {"id": purchase["id"]},
                {"$set": {"status": "expired"}}
            )
            return {"has_access": False, "message": "AI assistant subscription expired"}
    
    return {"has_access": True, "plan_type": purchase["plan_type"]}

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
