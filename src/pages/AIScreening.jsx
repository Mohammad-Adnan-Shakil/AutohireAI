import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PRESET_RESUMES } from "../data/mockData";
import { simulateAIScreening, AUTOMATED_ACTIONS } from "../services/screeningService";
import { ScoreRing } from "../components/ScoreRing";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  Loader2,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  Play,
  RotateCcw,
  ArrowRight,
  Download,
  Users
} from "lucide-react";
import confetti from "canvas-confetti";

export const AIScreening = () => {
  const { addCandidate, addToast, candidates } = useApp();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [screeningResult, setScreeningResult] = useState(null);
  const [lastCandidateId, setLastCandidateId] = useState(null);

  const pipelineSteps = [
    "Resume Received",
    "Parsing Resume (LlamaParse)",
    "AI Evaluation (Groq LLaMA 3)",
    "Rubric Scoring",
    "Tier Decision",
    "Automated Action Dispatch"
  ];

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedPreset(null);
      setScreeningResult(null);
      setLastCandidateId(null);
    }
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    setSelectedFile({ name: preset.filename, preset: true });
    setScreeningResult(null);
    setLastCandidateId(null);
  };

  const executeScreening = (presetToRun = null) => {
    const activePreset = presetToRun || selectedPreset;
    const activeFile = presetToRun ? { name: presetToRun.filename, preset: true } : selectedFile;

    if (!activeFile && !activePreset) {
      addToast("Please choose a PDF resume or select a preset resume candidate!", "error");
      return;
    }

    if (presetToRun) {
      setSelectedPreset(presetToRun);
      setSelectedFile({ name: presetToRun.filename, preset: true });
    }

    setIsProcessing(true);
    setScreeningResult(null);
    setLastCandidateId(null);
    setCurrentStep(1);

    const candidateInfo = activePreset
      ? {
          name: activePreset.name.split(" - ")[0],
          role: activePreset.role,
          email: `${activePreset.name.split(" ")[0].toLowerCase()}@example.com`
        }
      : {
          name: activeFile.name.replace(".pdf", "").replace(/_/g, " "),
          role: "Senior Engineer",
          email: "candidate@demo.com"
        };

    // Step through pipeline sequence with realistic 600ms delays (~3.6 sec total)
    let step = 1;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= pipelineSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          const evalResult = simulateAIScreening(candidateInfo, activePreset);
          const newId = "cand-" + Date.now();
          setScreeningResult(evalResult);
          setLastCandidateId(newId);
          setIsProcessing(false);
          setCurrentStep(0);

          // Build full candidate object to append to context
          const newCand = {
            id: newId,
            name: evalResult.candidateName,
            role: evalResult.role,
            email: evalResult.email,
            location: "San Francisco, CA",
            experience: activePreset?.targetScore >= 80 ? "5+ Years" : "2+ Years",
            education: "B.S. / M.S. Computer Science",
            score: evalResult.score,
            tier: evalResult.tier,
            decision: evalResult.decision,
            processingTime: "49 sec",
            status: "Completed",
            time: "Just now",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
            scoreBreakdown: evalResult.scoreBreakdown,
            strengths: evalResult.strengths,
            gaps: evalResult.gaps,
            reasoning: evalResult.reasoning,
            timeline: [
              { time: "Just now", event: "Resume uploaded & parsed via LlamaParse", status: "completed" },
              { time: "Just now", event: `AI evaluation score: ${evalResult.score}/100`, status: "completed" },
              { time: "Just now", event: `Tier ${evalResult.tier} decision: ${evalResult.decision}`, status: "completed" },
              { time: "Just now", event: "Automated workflow dispatched (Gmail, Calendar, Airtable, Slack)", status: "completed" }
            ]
          };

          addCandidate(newCand);
          if (evalResult.tier === "A") {
            confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
          }
          addToast(`✓ Screening Complete: ${evalResult.candidateName} assigned Score ${evalResult.score} (Tier ${evalResult.tier})`, "success");
        }, 500);
      }
    }, 600);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFF" }}>AI Candidate Screening</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--accent-cyan)", marginTop: "4px" }}>
            Evaluate candidates using the AutoHire autonomous scoring engine.
          </p>
        </div>

        {/* Quick Sample Run Button */}
        <button
          onClick={() => executeScreening(PRESET_RESUMES[0])}
          disabled={isProcessing}
          className="btn-demo"
          style={{ background: "linear-gradient(135deg, #10B981, #00F0FF)", color: "#000" }}
          title="Instantly screen Elena Rostova (Cloud & DevOps Architect)"
        >
          <Sparkles size={16} />
          <span>⚡ Run Sample: Elena Rostova (Score 91)</span>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Upload Card */}
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF" }}>
                Upload Resume
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <a
                  href="/sample-resumes/Elena_Rostova_Cloud_Architect.pdf"
                  download
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--accent-cyan)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <Download size={12} />
                  <span>Sample PDF</span>
                </a>
              </div>
            </div>

            {/* Drag & Drop Box */}
            <label
              style={{
                border: "2px dashed var(--border-color)",
                borderRadius: "14px",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "rgba(13, 19, 32, 0.6)",
                transition: "all 0.2s ease"
              }}
              className="upload-dropzone"
            >
              <input type="file" accept=".pdf" onChange={handleFileSelect} style={{ display: "none" }} />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(0, 240, 255, 0.1)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                  marginBottom: "0.75rem"
                }}
              >
                <Upload size={22} />
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFF", marginBottom: "0.25rem" }}>
                {selectedFile ? selectedFile.name : "Drag & drop PDF here"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                Supported format: PDF
              </div>
              <span className="btn-demo" style={{ padding: "0.35rem 0.9rem", fontSize: "0.78rem" }}>
                Choose PDF
              </span>
            </label>

            {/* Quick Demo Preset Selection Grid */}
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>
                  CHOOSE CANDIDATE RESUME TO TEST:
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--accent-cyan)" }}>
                  {PRESET_RESUMES.length} Presets Available
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.5rem",
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px"
                }}
              >
                {PRESET_RESUMES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    style={{
                      background: selectedPreset?.id === preset.id ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.03)",
                      border: `1px solid ${selectedPreset?.id === preset.id ? "var(--accent-cyan)" : "var(--border-color)"}`,
                      borderRadius: "8px",
                      padding: "0.6rem 0.75rem",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#FFF",
                      fontSize: "0.78rem",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontWeight: 700, color: selectedPreset?.id === preset.id ? "var(--accent-cyan)" : "#FFF" }}>
                      {preset.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <span>{preset.role}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          color: preset.tier === "A" ? "#10B981" : preset.tier === "B" ? "#F59E0B" : "#EF4444"
                        }}
                      >
                        Tier {preset.tier} ({preset.targetScore})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Screening Action Button */}
            <button
              onClick={() => executeScreening()}
              disabled={isProcessing}
              className="btn-demo"
              style={{
                width: "100%",
                marginTop: "1.25rem",
                padding: "0.85rem",
                fontSize: "0.95rem",
                justifyContent: "center"
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
                  <span>Processing Autonomous AI Pipeline...</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="currentColor" />
                  <span>
                    {selectedPreset
                      ? `Screen ${selectedPreset.name.split(" - ")[0]} Now`
                      : selectedFile
                      ? `Screen Uploaded Resume Now`
                      : `Select a Resume Above to Start`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* AI Rubric Weights Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>
              AI Screening Rubric Weights
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "Technical Skills", weight: "40%", desc: "Languages, Frameworks, Architecture" },
                { label: "Experience & Projects", weight: "30%", desc: "Production impact, tenure, role alignment" },
                { label: "Education", weight: "15%", desc: "Degree, Institution, Relevant Certifications" },
                { label: "Communication", weight: "15%", desc: "Resume structure, clarity, presentation" }
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.85rem",
                    background: "rgba(13, 19, 32, 0.6)",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFF" }}>{r.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{r.desc}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 800,
                      fontSize: "0.92rem",
                      color: "var(--accent-cyan)"
                    }}
                  >
                    {r.weight}
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid var(--border-color)",
                  fontWeight: 800,
                  color: "#FFF",
                  fontSize: "0.88rem"
                }}
              >
                <span>Total Composite Weight</span>
                <span style={{ color: "#10B981" }}>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Pipeline & Evaluation Result */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Animated Pipeline Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
              Autonomous Processing Pipeline
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {pipelineSteps.map((stepName, idx) => {
                const stepNum = idx + 1;
                const isDone = currentStep > stepNum || screeningResult !== null;
                const isCurrent = currentStep === stepNum;

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      background: isCurrent
                        ? "rgba(0, 240, 255, 0.1)"
                        : isDone
                        ? "rgba(16, 185, 129, 0.08)"
                        : "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${
                        isCurrent
                          ? "var(--accent-cyan)"
                          : isDone
                          ? "rgba(16, 185, 129, 0.3)"
                          : "var(--border-color)"
                      }`
                    }}
                  >
                    <div style={{ width: "20px", display: "flex", justifyContent: "center" }}>
                      {isDone ? (
                        <CheckCircle2 size={18} style={{ color: "#10B981" }} />
                      ) : isCurrent ? (
                        <Loader2 size={18} className="spin-icon" style={{ color: "var(--accent-cyan)", animation: "spin 1s linear infinite" }} />
                      ) : (
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)" }}></div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: isCurrent ? "var(--accent-cyan)" : isDone ? "#FFF" : "var(--text-muted)",
                        flex: 1
                      }}
                    >
                      {stepName}
                    </span>
                    <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: isDone ? "#10B981" : isCurrent ? "var(--accent-cyan)" : "var(--text-dim)" }}>
                      {isDone ? "Completed ✓" : isCurrent ? "Processing..." : "Waiting"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Result Card */}
          {screeningResult && (
            <div
              className="glass-card"
              style={{
                border: `1px solid ${
                  screeningResult.tier === "A"
                    ? "var(--tier-a)"
                    : screeningResult.tier === "B"
                    ? "var(--tier-b)"
                    : "var(--tier-c)"
                }`,
                boxShadow: `0 0 30px ${
                  screeningResult.tier === "A"
                    ? "var(--tier-a-glow)"
                    : screeningResult.tier === "B"
                    ? "var(--tier-b-glow)"
                    : "var(--tier-c-glow)"
                }`
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--accent-cyan)", textTransform: "uppercase" }}>
                    AI Evaluation Complete
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFF" }}>
                    {screeningResult.candidateName}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {screeningResult.role}
                  </div>
                </div>

                <ScoreRing score={screeningResult.score} size={100} strokeWidth={8} />
              </div>

              {/* Tier & Recommendation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  background: "rgba(13, 19, 32, 0.8)",
                  borderRadius: "10px",
                  marginBottom: "1rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    className={`badge ${
                      screeningResult.tier === "A"
                        ? "badge-tier-a"
                        : screeningResult.tier === "B"
                        ? "badge-tier-b"
                        : "badge-tier-c"
                    }`}
                  >
                    TIER {screeningResult.tier}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#FFF" }}>
                    {screeningResult.decision}
                  </span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Automated Decision
                </div>
              </div>

              {/* Strengths & Gaps */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10B981", marginBottom: "0.35rem" }}>
                    STRENGTHS
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {screeningResult.strengths.map((s, i) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "#FFF", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ color: "#10B981" }}>✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#EF4444", marginBottom: "0.35rem" }}>
                    GAPS
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {screeningResult.gaps.map((g, i) => (
                      <li key={i} style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ color: "#EF4444" }}>•</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reasoning */}
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, padding: "0.75rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", marginBottom: "1.25rem" }}>
                <strong>AI REASONING:</strong> {screeningResult.reasoning}
              </div>

              {/* Automated Actions Checklist */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--accent-cyan)", marginBottom: "0.6rem" }}>
                  AUTOMATED ACTIONS DISPATCHED
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {(AUTOMATED_ACTIONS[screeningResult.tier] || AUTOMATED_ACTIONS.A).map((act, i) => (
                    <div key={i} style={{ fontSize: "0.8rem", color: "#FFF", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <CheckCircle2 size={14} style={{ color: "#10B981" }} />
                      <span>{act.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to see candidate alongside others in candidates list! */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => navigate(lastCandidateId ? `/candidates/${lastCandidateId}` : "/candidates")}
                  className="btn-demo"
                  style={{ flex: 1, justifyContent: "center", padding: "0.75rem", fontSize: "0.88rem" }}
                >
                  <span>View Candidate Details Profile</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("/candidates")}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    color: "#FFF",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Users size={16} />
                  <span>Pool ({candidates.length})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
