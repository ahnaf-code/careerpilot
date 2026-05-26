import io
import json
import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Dict

from google import genai as google_genai
import pdfplumber
from dotenv import load_dotenv
import requests
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cv_store: Dict[str, str] = {}

DATABASE_PATH = Path(__file__).resolve().parent / "careerpilot.db"
engine = create_engine(
    f"sqlite:///{DATABASE_PATH}",
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Applied")
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


class ChatRequest(BaseModel):
    cv_id: str
    message: str


class FitScoreRequest(BaseModel):
    cv_id: str
    job_description: str


class TrackerCreate(BaseModel):
    title: str
    company: str


class TrackerStatusUpdate(BaseModel):
    status: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/tracker")
def create_tracker_application(body: TrackerCreate):
    db: Session = SessionLocal()
    try:
        application = Application(title=body.title, company=body.company)
        db.add(application)
        db.commit()
        db.refresh(application)
        return {"ok": True, "id": application.id}
    finally:
        db.close()


@app.get("/api/tracker")
def list_tracker_applications():
    db: Session = SessionLocal()
    try:
        applications = db.query(Application).order_by(Application.created_at.desc()).all()
        return {
            "applications": [
                {
                    "id": app.id,
                    "title": app.title,
                    "company": app.company,
                    "status": app.status,
                    "created_at": app.created_at.isoformat() if app.created_at else None,
                }
                for app in applications
            ]
        }
    finally:
        db.close()


@app.patch("/api/tracker/{id}")
def update_tracker_application(id: int, body: TrackerStatusUpdate):
    db: Session = SessionLocal()
    try:
        application = db.query(Application).filter(Application.id == id).first()
        if application is None:
            raise HTTPException(status_code=404, detail="Application not found")
        application.status = body.status
        db.commit()
        return {"ok": True}
    finally:
        db.close()


@app.get("/api/jobs")
def search_jobs(q: str = Query(default="")):
    try:
        response = requests.get(
            "https://remotive.com/api/remote-jobs",
            params={"search": q, "limit": 10},
            timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail="Failed to fetch jobs") from exc

    data = response.json()
    jobs = [
        {
            "title": job.get("title", ""),
            "company": job.get("company_name", ""),
            "url": job.get("url", ""),
            "salary": job.get("salary", ""),
            "location": job.get("candidate_required_location", ""),
        }
        for job in data.get("jobs", [])
    ]
    return {"jobs": jobs}


@app.post("/api/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    contents = await file.read()
    text_parts = []

    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)

    cv_text = "\n".join(text_parts)
    if not cv_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    cv_id = str(uuid.uuid4())
    cv_store[cv_id] = cv_text

    return {"cv_id": cv_id}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    cv_text = cv_store.get(request.cv_id)
    if cv_text is None:
        raise HTTPException(status_code=404, detail="CV not found")

    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")

    client = google_genai.Client(api_key=GEMINI_API_KEY)
    full_prompt = f"You are a career assistant. The user's CV is: {cv_text}. Answer based on this CV only.\n\nUser question: {request.message}"
    response = client.models.generate_content(model="gemini-2.0-flash", contents=full_prompt)
    return {"reply": response.text}


@app.post("/api/fit-score")
async def fit_score(request: FitScoreRequest):
    cv_text = cv_store.get(request.cv_id)
    if cv_text is None:
        raise HTTPException(status_code=404, detail="CV not found")

    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")

    client = google_genai.Client(api_key=GEMINI_API_KEY)
    prompt = (
        f"Given this CV: {cv_text} and this job description: {request.job_description}, "
        "compute a fit score from 0 to 100 based on how well the CV matches the job. "
        'Return ONLY a JSON object like this: {"score": 75, "explanation": "one sentence reason"}'
    )
    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)

    try:
        result = json.loads(response.text.strip())
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=502, detail="Invalid response from model") from exc

    return {"score": result["score"], "explanation": result["explanation"]}
