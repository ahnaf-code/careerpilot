# CareerPilot

AI-powered career co-pilot. Users upload their CV and get job matches, fit scores, AI career advice, and application tracking.

## Tech stack

Python, FastAPI, ChromaDB, Google Gemini, SQLite, React, Vite, Tailwind

## How to run the backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Server runs at http://localhost:8000

## Environment variables

```
GEMINI_API_KEY=your_key_here
```

Put this in `backend/.env`.

## API endpoints

- POST `/api/upload-cv` — input: PDF file, output: `{ cv_id }`
- POST `/api/chat` — input: `{ cv_id, message }`, output: `{ reply }`
- GET `/api/jobs?q=` — input: search query, output: `{ jobs: [...] }`
- POST `/api/fit-score` — input: `{ cv_id, job_description }`, output: `{ score, explanation }`
- POST `/api/tracker` — input: `{ title, company }`, output: `{ ok, id }`
- GET `/api/tracker` — output: `{ applications: [...] }`
- PATCH `/api/tracker/{id}` — input: `{ status }`, output: `{ ok }`
