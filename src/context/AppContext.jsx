import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_CANDIDATES, INITIAL_METRICS, RECENT_ACTIVITIES } from "../data/mockData";
import confetti from "canvas-confetti";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [activities, setActivities] = useState(RECENT_ACTIVITIES);
  const [toasts, setToasts] = useState([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("ALL");

  // Helper for adding toast messages
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add candidate manually or from demo
  const addCandidate = (newCand) => {
    setCandidates((prev) => [newCand, ...prev]);

    // Recalculate metrics
    setMetrics((prev) => {
      const newTotal = prev.candidatesProcessed + 1;
      const isShortlisted = newCand.tier === "A";
      const newShortlisted = prev.shortlisted + (isShortlisted ? 1 : 0);
      const tierA = prev.tierA + (newCand.tier === "A" ? 1 : 0);
      const tierB = prev.tierB + (newCand.tier === "B" ? 1 : 0);
      const tierC = prev.tierC + (newCand.tier === "C" ? 1 : 0);
      
      const newShortlistedRatio = ((newShortlisted / newTotal) * 100).toFixed(1) + "%";
      
      return {
        ...prev,
        candidatesProcessed: newTotal,
        shortlisted: newShortlisted,
        shortlistedRatio: newShortlistedRatio,
        tierA,
        tierB,
        tierC
      };
    });

    // Add activity log
    const newActivity = {
      id: Date.now(),
      type: newCand.tier === "A" ? "shortlisted" : "evaluated",
      title: `Candidate ${newCand.decision.toLowerCase()}: ${newCand.name}`,
      candidate: `Score: ${newCand.score} (Tier ${newCand.tier})`,
      time: "Just now",
      status: "success"
    };

    setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
  };

  // Execute hackathon "▶ Run Demo" 5-second workflow simulation
  const runAutonomousDemo = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setDemoStep(1);

    addToast("▶ Starting Autonomous Recruitment Pipeline Demo...", "info");

    const steps = [
      { delay: 600, step: 1, toast: "✓ Webhook triggered: New Resume received from Sarah Jenkins" },
      { delay: 1400, step: 2, toast: "✓ LlamaParse OCR completed: Extracted 3 pages of markdown text" },
      { delay: 2200, step: 3, toast: "✓ Groq AI Agent evaluating candidate against hiring rubric..." },
      { delay: 3000, step: 4, toast: "★ Evaluation Complete: Score 86 / 100 — Tier A Selected!" },
      { delay: 3700, step: 5, toast: "✓ Gmail API: Shortlist offer letter email sent to sarah.jenkins@dev.io" },
      { delay: 4300, step: 6, toast: "✓ Google Calendar & Airtable base updated automatically" },
      { delay: 5000, step: 7, toast: "✓ Slack notification posted to #engineering-hiring" }
    ];

    steps.forEach(({ delay, step, toast }) => {
      setTimeout(() => {
        setDemoStep(step);
        addToast(toast, step === 4 ? "success" : "info");
      }, delay);
    });

    // Finalize Demo after 5.5 sec
    setTimeout(() => {
      const demoCandidate = {
        id: "demo-cand-" + Date.now(),
        name: "Sarah Jenkins",
        role: "Senior AI / Backend Engineer",
        email: "sarah.jenkins@dev.io",
        location: "San Francisco, CA",
        experience: "5.2 Years",
        education: "M.S. Artificial Intelligence, MIT",
        score: 86,
        tier: "A",
        decision: "SHORTLIST",
        processingTime: "47 sec",
        status: "Completed",
        time: "Just now",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
        scoreBreakdown: {
          technical: 38,
          experience: 28,
          education: 14,
          communication: 14
        },
        strengths: ["LLMs & RAG Architecture", "Python & PyTorch", "FastAPI", "Distributed Systems"],
        gaps: ["Mobile development experience"],
        reasoning: "Exceptional candidate with deep expertise in AI pipeline engineering and high-throughput backend services. Exceeds Tier A threshold of 75.",
        timeline: [
          { time: "Just now", event: "Resume received via Webhook", status: "completed" },
          { time: "Just now", event: "LlamaParse PDF parsed into structured markdown", status: "completed" },
          { time: "Just now", event: "Groq LLaMA 3 evaluation completed (Score: 86)", status: "completed" },
          { time: "Just now", event: "Tier A (Shortlist) threshold matched", status: "completed" },
          { time: "Just now", event: "Shortlist email & calendar invite sent via Gmail API", status: "completed" },
          { time: "Just now", event: "Synced to Airtable and posted in Slack", status: "completed" }
        ]
      };

      addCandidate(demoCandidate);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      addToast("🎉 Autonomous Pipeline Execution Completed in 4.7 sec!", "success");
      setIsDemoRunning(false);
      setDemoStep(0);
    }, 5500);
  };

  return (
    <AppContext.Provider
      value={{
        candidates,
        metrics,
        activities,
        toasts,
        addToast,
        removeToast,
        addCandidate,
        isDemoRunning,
        demoStep,
        runAutonomousDemo,
        searchQuery,
        setSearchQuery,
        tierFilter,
        setTierFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
