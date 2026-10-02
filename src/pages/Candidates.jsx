import React, { useState, useEffect } from "react";
import { CandidateTable } from "../components/CandidateTable";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";

const timeAgo = (iso) => {
  if (!iso) return "—";
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const initialsAvatar = (name) => {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><rect width='72' height='72' fill='#0E7490'/><text x='50%' y='50%' dy='.35em' text-anchor='middle' font-family='Arial' font-size='28' font-weight='700' fill='#fff'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const mapCandidate = (c, i) => ({
  id: `airtable-${i}`,
  name: c.name || "Unknown",
  email: c.email || "",
  role: "—",
  score: c.score ?? 0,
  tier: c.tier || "C",
  decision: c.decision || "REJECT",
  processingTime: "—",
  status: "Completed",
  time: timeAgo(c.timestamp),
  reasoning: c.reasoning || "",
  avatar: initialsAvatar(c.name),
  createdAt: c.timestamp || ""
});

export const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [decisionFilter, setDecisionFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/candidates`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mapped = data
          .map(mapCandidate)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setCandidates(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredCandidates = candidates.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.role.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term);

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
          <div style={{ position: "relative", width: "100%" }}>
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
        {loading && (
          <p style={{ padding: "1.5rem", color: "var(--text-muted)" }}>Loading candidates from Airtable...</p>
        )}
        {!loading && error && (
          <p style={{ padding: "1.5rem", color: "#EF4444" }}>
            Could not load candidates: {error}. Check that the backend is running on port 8000.
          </p>
        )}
        {!loading && !error && filteredCandidates.length === 0 && (
          <p style={{ padding: "1.5rem", color: "var(--text-muted)" }}>No candidates found.</p>
        )}
        {!loading && !error && filteredCandidates.length > 0 && (
          <CandidateTable candidates={filteredCandidates} />
        )}
      </div>
    </div>
  );
};