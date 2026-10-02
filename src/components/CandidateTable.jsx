import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle } from "lucide-react";

export const CandidateTable = ({ candidates, limit }) => {
  const navigate = useNavigate();

  const displayList = limit ? candidates.slice(0, limit) : candidates;

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>AI Score</th>
            <th>Tier</th>
            <th>Decision</th>
            <th>AI Reasoning</th>
            <th>Status</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((cand) => {
            const scoreClass = cand.score >= 75 ? "high" : cand.score >= 50 ? "medium" : "low";
            const tierBadge = cand.tier === "A" ? "badge-tier-a" : cand.tier === "B" ? "badge-tier-b" : "badge-tier-c";

            return (
              <tr key={cand.id} onClick={() => navigate(`/candidates/${cand.id}`)}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img
                      src={cand.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                      alt={cand.name}
                      style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: "#FFF", whiteSpace: "nowrap" }}>{cand.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{cand.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`score-pill ${scoreClass}`} style={{ whiteSpace: "nowrap" }}>
                    {cand.score} / 100
                  </span>
                </td>
                <td>
                  <span className={`badge ${tierBadge}`} style={{ whiteSpace: "nowrap" }}>
                    Tier {cand.tier}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      color: cand.decision === "SHORTLIST" ? "#10B981" : cand.decision === "WAITLIST" ? "#F59E0B" : "#EF4444"
                    }}
                  >
                    {cand.decision}
                  </span>
                </td>
                <td style={{ maxWidth: "420px" }}>
                  <div
                    title={cand.reasoning}
                    style={{
                      fontSize: "0.8rem",
                      lineHeight: 1.45,
                      color: "var(--text-muted)",
                      whiteSpace: "normal",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {cand.reasoning || "—"}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      color: "#10B981",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>{cand.status}</span>
                  </div>
                </td>
                <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{cand.time}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/candidates/${cand.id}`);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border-color)",
                      color: "var(--accent-cyan)",
                      borderRadius: "8px",
                      padding: "0.4rem 0.6rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};