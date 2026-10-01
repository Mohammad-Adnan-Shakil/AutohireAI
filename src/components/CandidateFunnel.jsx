import React from "react";
import { Filter, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const CandidateFunnel = ({ metrics }) => {
  const steps = [
    { label: "Applications", count: metrics.candidatesProcessed, percent: "100%", color: "#3B82F6", icon: Filter },
    { label: "AI Screened", count: metrics.candidatesProcessed, percent: "100%", color: "#00F0FF", icon: CheckCircle2 },
    { label: "Tier A (Shortlist)", count: metrics.tierA, percent: metrics.shortlistedRatio, color: "#10B981", icon: CheckCircle2 },
    { label: "Tier B (Waitlist)", count: metrics.tierB, percent: `${((metrics.tierB / metrics.candidatesProcessed) * 100).toFixed(1)}%`, color: "#F59E0B", icon: AlertTriangle },
    { label: "Tier C (Reject)", count: metrics.tierC, percent: `${((metrics.tierC / metrics.candidatesProcessed) * 100).toFixed(1)}%`, color: "#EF4444", icon: XCircle }
  ];

  return (
    <div className="glass-card" style={{ marginBottom: "2rem" }}>
      <div className="section-header">
        <h2 className="section-title">
          <Filter size={18} style={{ color: "var(--accent-cyan)" }} />
          Recruitment Conversion Funnel
        </h2>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Real-time AI Tier Filtering
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", position: "relative" }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              style={{
                background: "rgba(13, 19, 32, 0.8)",
                border: "1px solid var(--border-color)",
                borderRadius: "14px",
                padding: "1.2rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "all 0.2s ease"
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: step.color,
                  marginBottom: "0.75rem"
                }}
              >
                <Icon size={18} />
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, textAlign: "center" }}>
                {step.label}
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FFF", margin: "0.25rem 0" }}>
                {step.count.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: step.color,
                  background: `${step.color}15`,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px"
                }}
              >
                {step.percent}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
