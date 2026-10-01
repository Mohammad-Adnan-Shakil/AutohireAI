import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CandidateTable } from "../components/CandidateTable";
import { Search, Filter, Plus, Users, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Candidates = () => {
  const { candidates } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [decisionFilter, setDecisionFilter] = useState("ALL");
  const navigate = useNavigate();

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = tierFilter === "ALL" || c.tier === tierFilter;
    const matchesDecision = decisionFilter === "ALL" || c.decision === decisionFilter;

    return matchesSearch && matchesTier && matchesDecision;
  });

  return (
    <div className="page-container">
      <div className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FFF" }}>Candidate Database</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Autonomous score tracking, evaluation reports & decision history
          </p>
        </div>

        <button
          onClick={() => navigate("/screening")}
          className="btn-demo"
          style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}
        >
          <Plus size={16} />
          <span>Screen New Candidate</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-card"
        style={{
          marginBottom: "1.5rem",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: "260px" }}>
          <div
            style={{
              position: "relative",
              width: "100%"
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }}
            />
            <input
              type="text"
              placeholder="Search by candidate name, role, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(13, 19, 32, 0.9)",
                border: "1px solid var(--border-color)",
                borderRadius: "10px",
                padding: "0.55rem 1rem 0.55rem 2.25rem",
                color: "#FFF",
                fontSize: "0.88rem",
                outline: "none"
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Filter size={14} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Tier:</span>
            {["ALL", "A", "B", "C"].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                style={{
                  background: tierFilter === t ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.04)",
                  color: tierFilter === t ? "#000" : "var(--text-muted)",
                  border: `1px solid ${tierFilter === t ? "var(--accent-cyan)" : "var(--border-color)"}`,
                  borderRadius: "6px",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {t === "ALL" ? "All Tiers" : `Tier ${t}`}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Decision:</span>
            {["ALL", "SHORTLIST", "WAITLIST", "REJECT"].map((d) => (
              <button
                key={d}
                onClick={() => setDecisionFilter(d)}
                style={{
                  background: decisionFilter === d ? "#3B82F6" : "rgba(255, 255, 255, 0.04)",
                  color: decisionFilter === d ? "#FFF" : "var(--text-muted)",
                  border: `1px solid ${decisionFilter === d ? "#3B82F6" : "var(--border-color)"}`,
                  borderRadius: "6px",
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Table Card */}
      <div className="glass-card">
        <CandidateTable candidates={filteredCandidates} />
      </div>
    </div>
  );
};
