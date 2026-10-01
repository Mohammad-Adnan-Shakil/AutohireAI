import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle2, Loader2, Sparkles, X, ShieldAlert } from "lucide-react";

export const DemoModal = () => {
  const { isDemoRunning, demoStep } = useApp();

  if (!isDemoRunning) return null;

  const pipelineSteps = [
    { id: 1, label: "Resume Received", detail: "Webhook received PDF upload (Sarah Jenkins)" },
    { id: 2, label: "Parsing Resume", detail: "LlamaParse converting PDF to structured Markdown text" },
    { id: 3, label: "AI Evaluation", detail: "Groq LLaMA 3 analyzing skills, experience & education" },
    { id: 4, label: "Tier Decision", detail: "Scored 86 / 100 ➔ Selected TIER A (Shortlist)" },
    { id: 5, label: "Automated Gmail", detail: "Dispatched offer email with interview calendar link" },
    { id: 6, label: "Calendar & Airtable", detail: "Reserved interview slot & updated HR database" },
    { id: 7, label: "Slack & Dashboard", detail: "Posted card in #engineering-hiring & updated stats" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(7, 11, 20, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem"
      }}
    >
      <div
        style={{
          background: "#0D1320",
          border: "1px solid var(--accent-cyan)",
          boxShadow: "0 0 50px rgba(0, 240, 255, 0.3)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          position: "relative"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00F0FF, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000"
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFF" }}>
                Autonomous Pipeline Executing...
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--accent-cyan)" }}>
                Live Hackathon End-to-End Simulation
              </p>
            </div>
          </div>
          <div className="live-badge" style={{ padding: "0.3rem 0.6rem" }}>
            ● LIVE
          </div>
        </div>

        {/* Step list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {pipelineSteps.map((step) => {
            const isCompleted = demoStep > step.id;
            const isCurrent = demoStep === step.id;

            return (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: isCurrent
                    ? "rgba(0, 240, 255, 0.1)"
                    : isCompleted
                    ? "rgba(16, 185, 129, 0.08)"
                    : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${
                    isCurrent
                      ? "var(--accent-cyan)"
                      : isCompleted
                      ? "rgba(16, 185, 129, 0.3)"
                      : "var(--border-color)"
                  }`,
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ width: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} style={{ color: "#10B981" }} />
                  ) : isCurrent ? (
                    <Loader2 size={20} className="spin-icon" style={{ color: "var(--accent-cyan)", animation: "spin 1s linear infinite" }} />
                  ) : (
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.2)"
                      }}
                    ></div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: isCurrent ? "var(--accent-cyan)" : isCompleted ? "#FFF" : "var(--text-muted)"
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        color: isCompleted ? "#10B981" : isCurrent ? "var(--accent-cyan)" : "var(--text-dim)"
                      }}
                    >
                      {isCompleted ? "Completed ✓" : isCurrent ? "Processing..." : "Waiting"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: "0.78rem", textAlign: "center", color: "var(--text-muted)" }}>
          Simulating real n8n webhook ➔ Groq AI ➔ Gmail ➔ Airtable ➔ Slack pipeline.
        </div>
      </div>
    </div>
  );
};
