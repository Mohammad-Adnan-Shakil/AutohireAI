# AutoHire.AI

> **From Resume to Offer Letter - Autonomously**

An AI-powered autonomous recruitment pipeline built for high-throughput candidate evaluation, rubric scoring, and workflow orchestration.

---

## Overview

AutoHire.AI automates the entire candidate recruitment lifecycle:

Candidate submits resume
|
n8n Webhook
|
LlamaParse
|
Groq AI Scoring
|
Candidate Score (0-100)
|
Automatic Tier Decision
| | |
Tier A Tier B Tier C

=75 50-74 <50
| | |
Shortlist Waitlist Reject
| | |
Gmail Gmail Gmail
|
Google Calendar
|
Airtable
|
React Dashboard


---

## Key Features

- Recruiter Command Center Dashboard with KPI metrics
- AI Candidate Screening with drag-and-drop PDF upload
- Candidate Profiles and Database with search and filter
- Workflow Pipeline Architecture visualization
- Analytics and Impact Metrics with charts
- Settings and Integrations panel
- Hackathon Demo Mode with animated pipeline

---

## Technology Stack

| Layer | Tool |
|---|---|
| Workflow Orchestration | n8n |
| AI Reasoning | Groq (openai/gpt-oss-20b) |
| Resume Parsing | LlamaParse |
| Email Automation | Gmail (n8n node) |
| Interview Scheduling | Google Calendar (n8n node) |
| Candidate Database | Airtable |
| Recruiter Alerts | Slack |
| Frontend Dashboard | React + Vite |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
git clone https://github.com/Mohammad-Adnan-Shakil/AutohireAI.git
cd AutohireAI
npm install
```

### Running Locally

```bash
npm run dev
```

Open: http://localhost:5173

### n8n Pipeline

```bash
n8n start
```

Open: http://localhost:5678

Import `n8n/workflow.json` to load the pipeline.

---

## Key Metrics

- ~52 seconds per candidate end-to-end
- 80% reduction in manual recruiter effort
- Consistent bias-reduced scoring - same rubric every time
- Fully auditable - AI reasoning stored per candidate

---

## Built At

HackSprint 24-Hour Hackathon
Manipal Academy of Higher Education (MAHE), Bengaluru
October 17-18, 2026
Track 22 - AI Automation with n8n
Organized by Commudle | Sponsors: Paytm, MLH, n8n

---

## Team FAAA

- Mohammad Adnan Shakil
- Mohammed Ayham
- Ryan
- Abhishek
- Farheen Naaz
