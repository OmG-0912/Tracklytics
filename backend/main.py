from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

app = FastAPI(title="Tracklytics API", description="Backend API for AtomQuest Hackathon", version="1.0.0")

# Enable CORS so the React frontend can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact React app URL
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MOCK DATA ---
# This mirrors the Indian context dataset we created for the frontend

USERS = [
    {"id": "U101", "name": "Priya Raman", "role": "admin", "title": "Chief People Officer", "department": "People Ops", "location": "Bengaluru, KA"},
    {"id": "U102", "name": "Amit Verma", "role": "admin", "title": "VP of Engineering", "department": "Engineering", "location": "Pune, MH"},
    {"id": "U201", "name": "Rohan Sharma", "role": "manager", "title": "Design Director", "department": "Design", "location": "Mumbai, MH", "managerId": "U101"},
    {"id": "U301", "name": "Aanya Mehta", "role": "employee", "title": "Sr. Product Designer", "department": "Design", "location": "Mumbai, MH", "managerId": "U201"},
    {"id": "U302", "name": "Arjun Patel", "role": "employee", "title": "Product Designer", "department": "Design", "location": "Pune, MH", "managerId": "U201"},
]

AUDIT_LOGS = [
    {"id": 1, "role": "Manager", "user": "Rohan Sharma", "action": "Approved goal", "field": "status: Pending -> Approved", "timestamp": "2026-02-18 14:32", "target": "Improve NPS by 12 points", "ip": "49.36.12.110"},
    {"id": 2, "role": "Employee", "user": "Aanya Mehta", "action": "Edited weightage", "field": "weightage: 25% -> 30%", "timestamp": "2026-02-18 11:08", "target": "Improve NPS by 12 points", "ip": "115.112.55.99"},
    {"id": 3, "role": "Admin", "user": "Priya Raman", "action": "Pushed shared KPI", "field": "scope: org-wide", "timestamp": "2026-02-17 09:45", "target": "Org-wide eNPS >= 60", "ip": "103.21.124.5"},
]

SHARED_KPIS = [
    {"id": "KPI-1", "title": "Org-wide eNPS >= 60", "audience": "All Employees", "syncStatus": "Synced 2h ago", "uom": "Numeric", "target": "60", "weight": 10, "pushedBy": "Priya Raman"},
    {"id": "KPI-2", "title": "Zero P0 security incidents", "audience": "Engineering, Design, Product", "syncStatus": "Synced yesterday", "uom": "Zero-based", "target": "0", "weight": 15, "pushedBy": "Amit Verma"},
]

GOALS = []
CHECK_INS = []
COMMENTS = [
    {"id": "c1", "user_id": "U301", "author_id": "U301", "author_name": "Aanya Mehta", "role": "EMPLOYEE", "text": "Shipped tokens to product surfaces 1 & 2. Migrating surface 3 next sprint.", "timestamp": "2026-05-18T10:00:00Z"},
    {"id": "c2", "user_id": "U301", "author_id": "U201", "author_name": "Rohan Sharma", "role": "MANAGER", "text": "Excellent. Let's pull a11y audit one week earlier if possible.", "timestamp": "2026-05-18T10:30:00Z"}
]

# --- PYDANTIC MODELS ---

class GoalCreate(BaseModel):
    user_id: str
    title: str
    description: str
    target: str
    uom: str
    weightage: int
    category: str
    cycle: Optional[str] = "Q2 FY26"

class GoalStatusUpdate(BaseModel):
    status: str
    feedback: Optional[str] = None

class CheckInCreate(BaseModel):
    goal_id: str
    user_id: str
    actual_value: str
    status: str
    comments: Optional[str] = None

class CommentCreate(BaseModel):
    user_id: str
    author_id: str
    text: str

class SharedKPICreate(BaseModel):
    title: str
    audience: str
    uom: str
    target: str
    weight: int
    pushedBy: str

# --- API ENDPOINTS ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the Tracklytics API (FastAPI)!"}

@app.get("/api/users")
def get_users():
    """Retrieve all users in the organization."""
    return {"status": "success", "data": USERS}

@app.get("/api/users/{user_id}")
def get_user(user_id: str):
    """Retrieve a specific user by ID."""
    user = next((u for u in USERS if u["id"] == user_id), None)
    if user:
        return {"status": "success", "data": user}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/api/audit-logs")
def get_audit_logs():
    """Retrieve the governance audit trail logs."""
    return {"status": "success", "data": AUDIT_LOGS}

@app.get("/api/shared-kpis")
def get_shared_kpis():
    """Retrieve shared KPIs pushed by admins."""
    return {"status": "success", "data": SHARED_KPIS}

@app.post("/api/shared-kpis")
def create_shared_kpi(kpi: SharedKPICreate):
    """Push a new shared KPI to the organization."""
    new_kpi = kpi.dict()
    new_kpi["id"] = f"KPI-{len(SHARED_KPIS) + 1}"
    new_kpi["syncStatus"] = "Synced just now"
    SHARED_KPIS.append(new_kpi)
    
    # Also log this action in the audit logs
    AUDIT_LOGS.insert(0, {
        "id": len(AUDIT_LOGS) + 1,
        "role": "Admin",
        "user": kpi.pushedBy,
        "action": "Pushed shared KPI",
        "field": f"audience: {kpi.audience}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "target": kpi.title,
        "ip": "103.21.124.5"
    })
    
    return {"status": "success", "data": new_kpi}

# --- GOAL ENDPOINTS ---

@app.get("/api/goals")
def get_all_goals():
    """Retrieve all goals across the organization (Admin view)."""
    return {"status": "success", "data": GOALS}

@app.post("/api/goals")
def create_goal(goal: GoalCreate):
    """Create a new goal for an employee."""
    new_goal = goal.dict()
    new_goal["id"] = str(uuid.uuid4())
    new_goal["status"] = "Pending Approval"
    new_goal["created_at"] = datetime.now().isoformat()
    GOALS.append(new_goal)
    return {"status": "success", "data": new_goal}

@app.get("/api/goals/user/{user_id}")
def get_user_goals(user_id: str):
    """Retrieve all goals for a specific employee."""
    user_goals = [g for g in GOALS if g["user_id"] == user_id]
    return {"status": "success", "data": user_goals}

@app.get("/api/goals/team/{manager_id}")
def get_team_goals(manager_id: str):
    """Retrieve all goals for users reporting to a specific manager."""
    # Find all users reporting to this manager
    team_user_ids = [u["id"] for u in USERS if u.get("managerId") == manager_id]
    team_goals = [g for g in GOALS if g["user_id"] in team_user_ids]
    return {"status": "success", "data": team_goals}

@app.patch("/api/goals/{goal_id}/status")
def update_goal_status(goal_id: str, update: GoalStatusUpdate):
    """Approve, reject, or update the status of a goal."""
    goal = next((g for g in GOALS if g["id"] == goal_id), None)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    goal["status"] = update.status
    if update.feedback:
        goal["feedback"] = update.feedback
        
    return {"status": "success", "data": goal}

# --- CHECK-IN ENDPOINTS ---

@app.post("/api/check-ins")
def create_check_in(checkin: CheckInCreate):
    """Submit a quarterly check-in for a specific goal."""
    new_checkin = checkin.dict()
    new_checkin["id"] = str(uuid.uuid4())
    new_checkin["created_at"] = datetime.now().isoformat()
    CHECK_INS.append(new_checkin)
    return {"status": "success", "data": new_checkin}

@app.get("/api/check-ins/goal/{goal_id}")
def get_goal_check_ins(goal_id: str):
    """Retrieve all check-ins for a specific goal."""
    goal_check_ins = [c for c in CHECK_INS if c["goal_id"] == goal_id]
    return {"status": "success", "data": goal_check_ins}

# --- COMMENT ENDPOINTS ---

@app.get("/api/comments/user/{user_id}")
def get_user_comments(user_id: str):
    """Retrieve all conversation comments for a user's check-in."""
    user_comments = [c for c in COMMENTS if c["user_id"] == user_id]
    # Sort by timestamp (optional, since they are appended in order)
    return {"status": "success", "data": user_comments}

@app.post("/api/comments")
def create_comment(comment: CommentCreate):
    """Post a new comment to the conversation thread."""
    author = next((u for u in USERS if u["id"] == comment.author_id), None)
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
        
    new_comment = {
        "id": str(uuid.uuid4()),
        "user_id": comment.user_id,
        "author_id": comment.author_id,
        "author_name": author["name"],
        "role": author["role"].upper(),
        "text": comment.text,
        "timestamp": datetime.now().isoformat()
    }
    COMMENTS.append(new_comment)
    return {"status": "success", "data": new_comment}

# --- AI ENDPOINTS ---

class GoalRequest(BaseModel):
    role_description: str
    focus_area: str

@app.post("/api/ai/generate-smart-goal")
def generate_smart_goal(request: GoalRequest):
    """
    Mock AI endpoint. 
    Tomorrow, we will connect this to a real LLM (Gemini/OpenAI) using LangChain or direct SDK!
    """
    mock_generated_goal = {
        "title": f"Improve {request.focus_area} metrics by 15%",
        "description": f"A SMART goal generated for a {request.role_description} focusing on {request.focus_area}. Measured quarterly to ensure steady growth.",
        "target": "15",
        "uom": "Percentage"
    }
    return {"status": "success", "data": mock_generated_goal}
