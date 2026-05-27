const BASE_URL = "http://localhost:8000";

export async function uploadCV(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/api/upload-cv`, { method: "POST", body: formData });
  return res.json();
}

export async function sendChat(cvId, message) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId, message }),
  });
  return res.json();
}

export async function searchJobs(query) {
  const res = await fetch(`${BASE_URL}/api/jobs?q=${query}`);
  return res.json();
}

export async function getFitScore(cvId, jobDescription) {
  const res = await fetch(`${BASE_URL}/api/fit-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId, job_description: jobDescription }),
  });
  return res.json();
}

export async function saveApplication(data) {
  const res = await fetch(`${BASE_URL}/api/tracker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getApplications() {
  const res = await fetch(`${BASE_URL}/api/tracker`);
  return res.json();
}

export async function updateApplication(id, status) {
  const res = await fetch(`${BASE_URL}/api/tracker/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
