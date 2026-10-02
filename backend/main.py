import os
from urllib.parse import quote

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL")
AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.getenv("AIRTABLE_TABLE_NAME", "Candidates")

app = FastAPI(title="AutoHire.AI Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/webhook/resume")
async def submit_resume(
    name: str = Form(...),
    email: str = Form(...),
    resume: UploadFile = File(...),
):
    if not N8N_WEBHOOK_URL:
        raise HTTPException(
            status_code=500,
            detail="N8N_WEBHOOK_URL is not configured",
        )

    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF resume files are accepted",
        )

    resume_bytes = await resume.read()

    try:
        response = requests.post(
            N8N_WEBHOOK_URL,
            data={
                "name": name,
                "email": email,
            },
            files={
                "resume": (
                    resume.filename or "resume.pdf",
                    resume_bytes,
                    "application/pdf",
                )
            },
            timeout=60,
        )

        response.raise_for_status()

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to forward resume to n8n: {exc}",
        ) from exc

    return {
        "status": "received",
        "candidate": name,
    }


@app.get("/candidates")
def get_candidates():
    missing = [
        variable
        for variable, value in (
            ("AIRTABLE_API_KEY", AIRTABLE_API_KEY),
            ("AIRTABLE_BASE_ID", AIRTABLE_BASE_ID),
        )
        if not value
    ]

    if missing:
        raise HTTPException(
            status_code=500,
            detail=f"Missing environment variables: {', '.join(missing)}",
        )

    table_name = quote(AIRTABLE_TABLE_NAME, safe="")
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{table_name}"

    headers = {
        "Authorization": f"Bearer {AIRTABLE_API_KEY}",
        "Content-Type": "application/json",
    }

    candidates = []

    params = {
        "pageSize": 100,
    }

    try:
        while True:
            response = requests.get(
                url,
                headers=headers,
                params=params,
                timeout=30,
            )

            response.raise_for_status()

            payload = response.json()

            for record in payload.get("records", []):
                fields = record.get("fields", {})

                candidates.append(
                    {
                        "name": fields.get("name"),
                        "email": fields.get("email"),
                        "score": fields.get("score"),
                        "tier": fields.get("tier"),
                        "decision": fields.get("decision"),
                        "reasoning": fields.get("reasoning"),
                        "timestamp": fields.get("timestamp"),
                    }
                )

            offset = payload.get("offset")

            if not offset:
                break

            params["offset"] = offset

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch candidates from Airtable: {exc}",
        ) from exc

    except ValueError as exc:
        raise HTTPException(
            status_code=502,
            detail="Airtable returned an invalid JSON response",
        ) from exc

    return candidates