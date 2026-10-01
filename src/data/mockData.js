export const INITIAL_CANDIDATES = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    role: "Full Stack Developer",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    experience: "4.5 Years",
    education: "B.S. Computer Science, Stanford",
    score: 82,
    tier: "A",
    decision: "SHORTLIST",
    processingTime: "51 sec",
    status: "Completed",
    time: "12 mins ago",
    timestamp: "19:32:01",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    scoreBreakdown: {
      technical: 36, // out of 40
      experience: 26, // out of 30
      education: 13, // out of 15
      communication: 12 // out of 15
    },
    strengths: ["React", "Node.js", "FastAPI", "3+ years production experience", "System Design"],
    gaps: ["Limited ML production experience", "No Rust experience"],
    reasoning: "Strong full-stack profile with relevant production experience in modern React and microservices. Candidate satisfies the majority of the technical and experience requirements with excellent code structure indicators.",
    timeline: [
      { time: "19:32:01", event: "Resume received via Webhook", status: "completed" },
      { time: "19:32:05", event: "Parsed via LlamaParse OCR", status: "completed" },
      { time: "19:32:12", event: "Groq AI Agent evaluation completed", status: "completed" },
      { time: "19:32:14", event: "Tier A (Shortlist) threshold matched (82/100)", status: "completed" },
      { time: "19:32:16", event: "Personalized Shortlist email sent via Gmail API", status: "completed" },
      { time: "19:32:18", event: "Interview slot reserved on Google Calendar", status: "completed" },
      { time: "19:32:20", event: "Airtable recruitment base record synced", status: "completed" },
      { time: "19:32:21", event: "Slack notification sent to #engineering-hiring", status: "completed" }
    ]
  },
  {
    id: "cand-2",
    name: "Priya Sharma",
    role: "Frontend Developer",
    email: "priya.sharma@example.com",
    location: "Austin, TX",
    experience: "3.8 Years",
    education: "B.Tech IT, IIT Delhi",
    score: 78,
    tier: "A",
    decision: "SHORTLIST",
    processingTime: "49 sec",
    status: "Completed",
    time: "34 mins ago",
    timestamp: "19:10:15",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    scoreBreakdown: {
      technical: 34,
      experience: 24,
      education: 12,
      communication: 14
    },
    strengths: ["TypeScript", "Next.js", "Tailwind CSS", "Web Performance Optimization", "Design Systems"],
    gaps: ["Backend Node.js API development is basic"],
    reasoning: "Exceptional frontend expertise with demonstrable production portfolio. Excellent score on component architecture and modern UI state management.",
    timeline: [
      { time: "19:10:15", event: "Resume received", status: "completed" },
      { time: "19:10:19", event: "Parsed via LlamaParse", status: "completed" },
      { time: "19:10:25", event: "Groq AI evaluation (Score: 78)", status: "completed" },
      { time: "19:10:27", event: "Tier A selected", status: "completed" },
      { time: "19:10:29", event: "Shortlist email sent", status: "completed" },
      { time: "19:10:31", event: "Google Calendar interview invite created", status: "completed" },
      { time: "19:10:33", event: "Airtable synced & Slack notified", status: "completed" }
    ]
  },
  {
    id: "cand-3",
    name: "Rahul Mehta",
    role: "Software Engineer",
    email: "rahul.mehta@example.com",
    location: "Seattle, WA",
    experience: "2.5 Years",
    education: "B.S. CS, Univ. of Washington",
    score: 67,
    tier: "B",
    decision: "WAITLIST",
    processingTime: "53 sec",
    status: "Completed",
    time: "1 hour ago",
    timestamp: "18:45:22",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    scoreBreakdown: {
      technical: 28,
      experience: 20,
      education: 11,
      communication: 11
    },
    strengths: ["Java", "Spring Boot", "SQL & Database Design"],
    gaps: ["Limited Cloud deployment (AWS/GCP)", "No modern JS framework experience"],
    reasoning: "Solid core software engineering basics with backend focus. Slightly falls below Tier A requirements due to missing cloud infrastructure skills, placed on Waitlist.",
    timeline: [
      { time: "18:45:22", event: "Resume received", status: "completed" },
      { time: "18:45:26", event: "LlamaParse extraction finished", status: "completed" },
      { time: "18:45:33", event: "AI Evaluation complete (Score: 67)", status: "completed" },
      { time: "18:45:35", event: "Tier B (Waitlist) decision triggered", status: "completed" },
      { time: "18:45:37", event: "Waitlist email queued in Gmail", status: "completed" },
      { time: "18:45:39", event: "Airtable candidate pool updated", status: "completed" }
    ]
  },
  {
    id: "cand-4",
    name: "Sneha Kapoor",
    role: "Junior Developer",
    email: "sneha.kapoor@example.com",
    location: "Chicago, IL",
    experience: "1 Year",
    education: "B.S. Software Engineering, UIC",
    score: 53,
    tier: "B",
    decision: "WAITLIST",
    processingTime: "55 sec",
    status: "Completed",
    time: "2 hours ago",
    timestamp: "17:30:10",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    scoreBreakdown: {
      technical: 22,
      experience: 14,
      education: 10,
      communication: 10
    },
    strengths: ["HTML/CSS", "JavaScript", "Quick Learner", "Git"],
    gaps: ["Lack of enterprise project experience", "Needs supervision on complex architectures"],
    reasoning: "Promising entry-level developer with good fundamental concepts. Added to Tier B waitlist for upcoming junior intake round.",
    timeline: [
      { time: "17:30:10", event: "Resume received", status: "completed" },
      { time: "17:30:15", event: "LlamaParse extraction finished", status: "completed" },
      { time: "17:30:22", event: "AI Evaluation complete (Score: 53)", status: "completed" },
      { time: "17:30:24", event: "Tier B selected", status: "completed" },
      { time: "17:30:26", event: "Waitlist notification sent", status: "completed" }
    ]
  },
  {
    id: "cand-5",
    name: "Arjun Verma",
    role: "Software Intern",
    email: "arjun.verma@example.com",
    location: "Boston, MA",
    experience: "0.5 Years",
    education: "Undergrad CS, Northeastern Univ",
    score: 34,
    tier: "C",
    decision: "REJECT",
    processingTime: "48 sec",
    status: "Completed",
    time: "3 hours ago",
    timestamp: "16:15:00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    scoreBreakdown: {
      technical: 14,
      experience: 8,
      education: 7,
      communication: 5
    },
    strengths: ["Python basics", "Academic projects"],
    gaps: ["Does not meet minimum 2 years experience criteria", "Incomplete skill matrix for full stack role"],
    reasoning: "Candidate does not meet the core experience thresholds for the applied senior position. Automated polite rejection triggered as per hiring policy.",
    timeline: [
      { time: "16:15:00", event: "Resume received", status: "completed" },
      { time: "16:15:04", event: "LlamaParse extraction finished", status: "completed" },
      { time: "16:15:10", event: "AI Evaluation complete (Score: 34)", status: "completed" },
      { time: "16:15:12", event: "Tier C (Reject) decision triggered", status: "completed" },
      { time: "16:15:14", event: "Polite rejection email dispatched", status: "completed" },
      { time: "16:15:16", event: "Airtable archived", status: "completed" }
    ]
  }
];

export const INITIAL_METRICS = {
  candidatesProcessed: 1248,
  processedChange: "+18.4%",
  shortlisted: 286,
  shortlistedRatio: "22.9%",
  avgScore: 71.8,
  avgScoreChange: "+4.2%",
  avgProcessingTime: "52 sec",
  processingTimeChange: "-31.6%",
  tierA: 286,
  tierB: 534,
  tierC: 428,
  manualEffortReduced: "80%",
  workflowSuccessRate: "99.2%"
};

export const RECENT_ACTIVITIES = [
  { id: 1, type: "received", title: "Resume received", candidate: "Alex Johnson", time: "12 sec ago", status: "success" },
  { id: 2, type: "parsed", title: "Resume parsed (LlamaParse)", candidate: "Alex Johnson", time: "10 sec ago", status: "success" },
  { id: 3, type: "evaluated", title: "AI evaluation completed", candidate: "Score: 82 (Tier A)", time: "8 sec ago", status: "success" },
  { id: 4, type: "shortlisted", title: "Candidate shortlisted", candidate: "Alex Johnson", time: "6 sec ago", status: "success" },
  { id: 5, type: "email", title: "Email sent via Gmail", candidate: "Interview invitation", time: "4 sec ago", status: "success" },
  { id: 6, type: "airtable", title: "Airtable Base Synced", candidate: "Record #REC-8921", time: "2 sec ago", status: "success" }
];

export const WORKFLOW_NODES = [
  {
    id: "candidate",
    name: "Candidate Application",
    type: "trigger",
    provider: "Web Portal / Job Board",
    status: "active",
    execCount: "1,248",
    description: "Applicant submits PDF resume via auto-screening page or job board webhook.",
    icon: "UserCheck"
  },
  {
    id: "webhook",
    name: "n8n Webhook",
    type: "orchestrator",
    provider: "n8n Engine",
    status: "active",
    execCount: "1,248",
    description: "Catches payload, validates file format, and triggers autonomous pipeline sequence.",
    icon: "Webhook"
  },
  {
    id: "llamaparse",
    name: "LlamaParse",
    type: "parser",
    provider: "LlamaIndex OCR",
    status: "active",
    execCount: "1,248",
    description: "High-precision PDF parsing, structured markdown extraction & schema mapping.",
    icon: "FileText"
  },
  {
    id: "groq",
    name: "Groq AI Agent",
    type: "ai",
    provider: "LLaMA 3 (70B)",
    status: "active",
    execCount: "1,248",
    description: "Evaluates resume against 4-tier rubric (Technical 40%, Experience 30%, Ed 15%, Comm 15%).",
    icon: "Cpu"
  },
  {
    id: "switch",
    name: "Tier Router",
    type: "logic",
    provider: "n8n Switch Node",
    status: "active",
    execCount: "1,248",
    description: "Routes candidate based on score: Tier A (>=75), Tier B (50-74), Tier C (<50).",
    icon: "GitFork"
  },
  {
    id: "gmail",
    name: "Gmail Auto-Responder",
    type: "action",
    provider: "Google Workspace API",
    status: "active",
    execCount: "1,248",
    description: "Dispatches personalized email templates (Invite link / Waitlist / Friendly rejection).",
    icon: "Mail"
  },
  {
    id: "calendar",
    name: "Google Calendar",
    type: "action",
    provider: "Google Calendar API",
    status: "active",
    execCount: "286",
    description: "Holds candidate interview slot & sends calendar invites automatically.",
    icon: "Calendar"
  },
  {
    id: "airtable",
    name: "Airtable Base",
    type: "db",
    provider: "Airtable API",
    status: "active",
    execCount: "1,248",
    description: "Stores candidate record, AI reasoning breakdown, tags and score audit log.",
    icon: "Database"
  },
  {
    id: "slack",
    name: "Slack Notifications",
    type: "action",
    provider: "Slack Webhook",
    status: "active",
    execCount: "1,248",
    description: "Posts rich cards to #recruitment-feed with score alerts and recruiter quick-actions.",
    icon: "MessageSquare"
  },
  {
    id: "dashboard",
    name: "React Command Center",
    type: "frontend",
    provider: "AutoHire Web App",
    status: "active",
    execCount: "Live Sync",
    description: "Real-time updates to recruiter dashboard metrics, funnel stats & candidate table.",
    icon: "LayoutDashboard"
  }
];

export const PRESET_RESUMES = [
  {
    id: "preset-elena",
    name: "Elena Rostova - Cloud & DevOps Architect",
    role: "Cloud Architect",
    filename: "Elena_Rostova_Cloud_Architect.pdf",
    targetScore: 91,
    tier: "A",
    decision: "SHORTLIST",
    details: {
      technical: 39,
      experience: 28,
      education: 12,
      communication: 12,
      strengths: ["AWS Solutions Architect", "Kubernetes Multi-Cluster", "Terraform", "Go", "Zero-Downtime CI/CD"],
      gaps: ["No mobile frontend experience"],
      reasoning: "Exceptional infrastructure architect with top-tier cloud scalability benchmarks. Perfectly matches senior infrastructure requirements with an outstanding 91/100 composite score."
    }
  },
  {
    id: "preset-marcus",
    name: "Marcus Vance - AI Systems Engineer",
    role: "Senior AI Engineer",
    filename: "Marcus_Vance_AI_Engineer.pdf",
    targetScore: 88,
    tier: "A",
    decision: "SHORTLIST",
    details: {
      technical: 38,
      experience: 27,
      education: 11,
      communication: 12,
      strengths: ["PyTorch & Triton", "vLLM Inference Optimization", "RAG Pipelines", "FastAPI", "CUDA Kernel Tuning"],
      gaps: ["Limited legacy Java codebase exposure"],
      reasoning: "World-class AI systems engineer with deep hands-on expertise in LLM inference acceleration and distributed training. Automated Shortlist offer generated immediately."
    }
  },
  {
    id: "preset-alex",
    name: "Alex Johnson - Senior Full Stack",
    role: "Full Stack Developer",
    filename: "Alex_Johnson_Resume_2026.pdf",
    targetScore: 82,
    tier: "A",
    decision: "SHORTLIST",
    details: {
      technical: 36,
      experience: 26,
      education: 13,
      communication: 12,
      strengths: ["React", "Node.js", "FastAPI", "PostgreSQL", "Microservices architecture"],
      gaps: ["Limited Kubernetes cluster management"],
      reasoning: "High-caliber full stack engineer with demonstrated mastery in modern React, FastAPI backend microservices, and database tuning. Exceeds technical benchmarks."
    }
  },
  {
    id: "preset-priya",
    name: "Priya Sharma - Lead Frontend",
    role: "Frontend Developer",
    filename: "Priya_Sharma_CV.pdf",
    targetScore: 78,
    tier: "A",
    decision: "SHORTLIST",
    details: {
      technical: 34,
      experience: 24,
      education: 12,
      communication: 14,
      strengths: ["React 19", "TypeScript", "Performance Tuning", "UI Design System Architecture"],
      gaps: ["Backend GraphQL knowledge is basic"],
      reasoning: "Exceptional frontend specialist with strong emphasis on UI performance, accessibility, and component design patterns."
    }
  },
  {
    id: "preset-rahul",
    name: "Rahul Mehta - Mid Software Engineer",
    role: "Software Engineer",
    filename: "Rahul_Mehta_SoftwareEng.pdf",
    targetScore: 67,
    tier: "B",
    decision: "WAITLIST",
    details: {
      technical: 28,
      experience: 20,
      education: 11,
      communication: 11,
      strengths: ["Java / Spring Boot", "REST APIs", "RDBMS"],
      gaps: ["No direct React/Frontend experience", "Lacks Cloud deployment certification"],
      reasoning: "Solid backend candidate with Java proficiency. Meets intermediate requirements but lacks modern cloud and full stack versatility required for immediate Tier A placement."
    }
  },
  {
    id: "preset-david",
    name: "David Kim - Mobile & React Native",
    role: "Mobile App Engineer",
    filename: "David_Kim_Mobile_Dev.pdf",
    targetScore: 62,
    tier: "B",
    decision: "WAITLIST",
    details: {
      technical: 26,
      experience: 18,
      education: 9,
      communication: 9,
      strengths: ["React Native", "iOS / Swift", "Android / Kotlin"],
      gaps: ["Limited backend API scaling experience", "No DevOps experience"],
      reasoning: "Strong specialized mobile engineer, but role requires broader backend microservices exposure. Added to Tier B waitlist pool."
    }
  },
  {
    id: "preset-liam",
    name: "Liam O'Connor - Junior Developer",
    role: "Junior Web Developer",
    filename: "Liam_OConnor_Resume.pdf",
    targetScore: 41,
    tier: "C",
    decision: "REJECT",
    details: {
      technical: 16,
      experience: 10,
      education: 8,
      communication: 7,
      strengths: ["HTML/CSS/JS", "Git basics"],
      gaps: ["Lacks commercial production experience", "Missing automated testing & API fundamentals"],
      reasoning: "Candidate does not meet the minimum required production experience threshold for senior engineering positions. Rejection workflow triggered."
    }
  },
  {
    id: "preset-arjun",
    name: "Arjun Verma - CS Student / Intern",
    role: "Software Engineer",
    filename: "Arjun_Verma_Resume.pdf",
    targetScore: 34,
    tier: "C",
    decision: "REJECT",
    details: {
      technical: 14,
      experience: 8,
      education: 7,
      communication: 5,
      strengths: ["Basic Python", "Academic coursework"],
      gaps: ["Below minimum 2 years professional experience requirement", "No production deployment experience"],
      reasoning: "Candidate lacks required commercial software engineering experience. Automated rejection triggered according to baseline tier policy."
    }
  }
];

