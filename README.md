# AutoHire.AI

> **From Resume to Offer Letter — Autonomously**

An AI-powered autonomous recruitment command center and pipeline prototype built for high-throughput candidate evaluation, rubric scoring, and workflow orchestration.

---

## 🚀 Overview

AutoHire.AI automates the entire candidate recruitment lifecycle:

```text
Candidate submits resume
          ↓
     n8n Webhook
          ↓
     LlamaParse
          ↓
 Groq AI Agent / LLaMA 3
          ↓
 Candidate Score (0–100)
          ↓
 Automatic Tier Decision
 ┌────────────┬────────────┐
 │            │            │
Tier A       Tier B       Tier C
 ≥75         50–74         <50
 │            │            │
Shortlist    Waitlist     Reject
 │            │            │
Gmail        Gmail        Gmail
 │
Google Calendar
 ↓
Airtable
 ↓
Slack
 ↓
React Dashboard
```

---

## ✨ Key Features

- **Recruiter Command Center Dashboard (`/`)**:
  - 4 Key KPI metrics: Candidates Processed, Shortlisted, Avg AI Score, Avg Processing Time.
  - Interactive Recruitment Conversion Funnel (Applications ➔ AI Screened ➔ Tier A ➔ Tier B ➔ Tier C).
  - Recent candidates table with instant navigation to profile deep-dives.
  - Real-time Autonomous Activity Feed.
- **AI Candidate Screening (`/screening`)**:
  - Drag-and-drop PDF resume upload zone.
  - Quick candidate presets across all tiers (Elena Rostova, Marcus Vance, Alex Johnson, Priya Sharma, Rahul Mehta, David Kim, Liam O'Connor, Arjun Verma).
  - 4-Tier Rubric Weighting (Technical 40%, Experience 30%, Education 15%, Communication 15%).
  - Live animated pipeline simulation with real-time state changes.
  - Animated circular score gauge, strengths & gaps breakdown, AI reasoning, and automated dispatch checklist.
- **Candidate Profiles & Database (`/candidates` & `/candidates/:id`)**:
  - Searchable, filterable candidate repository by Tier (A, B, C) and Decision (SHORTLIST, WAITLIST, REJECT).
  - Granular rubric score breakdown progress bars.
  - Audit trail and automation timeline with timestamps.
- **Workflow Pipeline Architecture (`/workflow`)**:
  - Interactive n8n node graph mapping the entire microservice chain.
  - Live node configuration and execution telemetry inspector.
- **Analytics & Impact Metrics (`/analytics`)**:
  - Interactive Recharts donut/pie distribution of tiers.
  - AI score distribution bar charts.
  - Processing speed comparison line charts (Manual HR vs. AutoHire.AI).
  - Automation impact metrics (80% manual effort saved, 99.2% success rate).
- **Settings & Integrations (`/settings`)**:
  - Groq Cloud LLaMA 3 model configuration.
  - LlamaParse OCR configuration.
  - n8n Webhook router endpoint settings.
  - Integration toggles for Gmail API, Google Calendar API, Airtable API, and Slack Webhooks.
- **"▶ Run Demo" Hackathon Mode**:
  - Automated 5-second end-to-end autonomous pipeline demo with step markers, toast notifications, confetti animations, and state updates.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router v7
- **Styling**: Vanilla Modern CSS (Dark theme `#070B14`, glassmorphism, responsive)
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Delight & Animations**: Canvas Confetti

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

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

Open your browser and navigate to:
```text
http://localhost:5173/
```

### Production Build

```bash
npm run build
```

---

## 👥 Authors & Team

- **Mohammad Adnan Shakil**
- **AutoHire.AI Team**
