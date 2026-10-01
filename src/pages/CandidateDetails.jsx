import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ScoreRing } from "../components/ScoreRing";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles
} from "lucide-react";

export const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates } = useApp();

  const candidate = candidates.find((c) => c.id === id) || candidates[0];

  if (!candidate) {
    return (
      <div className="page-container">
        <button onClick={() => navigate("/candidates")} className="btn-demo">
          <ArrowLeft size={16} /> Back to Candidates
        </button>
        <p style={{ marginTop: "2rem" }}>Candidate not found.</p>
      </div>
    );
  }

  const breakdown = candidate.scoreBreakdown || {
    technical: 36,
    experience: 26,
    education: 13,
    communication: 12
  };

  const tierBadgeClass =
    candidate.tier === "A" ? "badge-tier-a" : candidate.tier === "B" ? "badge-tier-b" : "badge-tier-c";

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <button
        onClick={() => navigate("/candidates")}
        style={{
          background: "none",
          border: "none",
          color: "var(--accent-cyan)",
          fontSize: "0.88rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Candidates</span>
      </button>

      {/* Header Banner */}
      <div className="glass-card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <img
              src={candidate.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt={candidate.name}
              style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent-cyan)" }}
            />
            <div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFF" }}>{candidate.name}</h1>
              <p style={{ fontSize: "0.92rem", color: "var(--accent-cyan)", marginTop: "2px" }}>{candidate.role}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className={`badge ${tierBadgeClass}`} style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}>
              TIER {candidate.tier}
            </span>
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 800,
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                background:
                  candidate.decision === "SHORTLIST"
                    ? "rgba(16, 185, 129, 0.15)"
                    : candidate.decision === "WAITLIST"
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                color:
                  candidate.decision === "SHORTLIST"
                    ? "#10B981"
                    : candidate.decision === "WAITLIST"
                    ? "#F59E0B"
                    : "#EF4444",
                border: `1px solid ${
                  candidate.decision === "SHORTLIST"
                    ? "rgba(16, 185, 129, 0.3)"
                    : candidate.decision === "WAITLIST"
                    ? "rgba(245, 158, 11, 0.3)"
                    : "rgba(239, 68, 68, 0.3)"
                }`
              }}
            >
              {candidate.decision}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Candidate Info Grid */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>
              Candidate Information
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <User size={18} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Full Name</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFF" }}>{candidate.name}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Mail size={18} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Email</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFF" }}>{candidate.email}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <MapPin size={18} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Location</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFF" }}>{candidate.location}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Briefcase size={18} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Experience</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFF" }}>{candidate.experience}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", gridColumn: "span 2" }}>
                <GraduationCap size={18} style={{ color: "var(--accent-cyan)" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Education</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFF" }}>{candidate.education}</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Score Breakdown & Rubric Progress Bars */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
              Score Breakdown (Rubric Weights)
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Technical Skills", val: breakdown.technical, max: 40 },
                { label: "Experience & Projects", val: breakdown.experience, max: 30 },
                { label: "Education", val: breakdown.education, max: 15 },
                { label: "Communication", val: breakdown.communication, max: 15 }
              ].map((item, idx) => {
                const percent = Math.round((item.val / item.max) * 100);
                return (
                  <div key={idx}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                      <span style={{ fontWeight: 600, color: "#FFF" }}>{item.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent-cyan)" }}>
                        {item.val} / {item.max} ({percent}%)
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.08)",
                        borderRadius: "999px",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${percent}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #00F0FF, #3B82F6)",
                          borderRadius: "999px",
                          transition: "width 1s ease"
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Gaps */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1rem" }}>
              Strengths & Identified Gaps
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10B981", marginBottom: "0.5rem" }}>
                  STRENGTHS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {candidate.strengths.map((str, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(16, 185, 129, 0.12)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        color: "#10B981",
                        fontSize: "0.8rem",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "999px",
                        fontWeight: 600
                      }}
                    >
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#EF4444", marginBottom: "0.5rem" }}>
                  IDENTIFIED GAPS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {candidate.gaps.map((gap, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(239, 68, 68, 0.12)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#EF4444",
                        fontSize: "0.8rem",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "999px",
                        fontWeight: 600
                      }}
                    >
                      • {gap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Reasoning Card */}
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Sparkles size={18} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF" }}>Groq AI Reasoning</h3>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              {candidate.reasoning}
            </p>
          </div>
        </div>

        {/* Right Column: AI Gauge & Automation Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* AI Score Circular Gauge Card */}
          <div
            className="glass-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "1rem" }}>
              GROQ LLaMA 3 COMPOSITE SCORE
            </div>
            <ScoreRing score={candidate.score} size={150} strokeWidth={12} />
            <div style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--accent-cyan)", fontWeight: 700 }}>
              TIER {candidate.tier} • {candidate.decision}
            </div>
          </div>

          {/* Automation Timeline */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
              Automation Timeline
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", position: "relative" }}>
              {(candidate.timeline || []).map((step, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid #10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10B981",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      marginTop: "2px"
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FFF" }}>{step.event}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {step.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
