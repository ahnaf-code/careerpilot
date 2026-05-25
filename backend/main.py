import io
import os
import uuid
from typing import Dict

from google import genai as google_genai
import pdfplumber
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


class ChatRequest(BaseModel):
    cv_id: str
    message: str


@app.get("/health")
def health():
    return {"status": "ok"}


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
    response = client.models.generate_content(model="gemini-2.0-flash-lite", contents=full_prompt)
    return {"reply": response.text}
