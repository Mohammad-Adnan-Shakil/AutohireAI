import React from "react";
import { useApp } from "../context/AppContext";
import { MetricCard } from "../components/MetricCard";
import { CandidateFunnel } from "../components/CandidateFunnel";
import { CandidateTable } from "../components/CandidateTable";
import { ActivityFeed } from "../components/ActivityFeed";
import { Users, UserCheck, Award, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { candidates, metrics, activities } = useApp();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* KPI Row */}
      <div className="metrics-grid">
        <MetricCard
          title="Candidates Processed"
          value={metrics.candidatesProcessed.toLocaleString()}
          change={metrics.processedChange}
          isPositive={true}
          icon={Users}
          subtitle="Total resumes analyzed by AI"
        />

        <MetricCard
          title="Shortlisted"
          value={metrics.shortlisted.toLocaleString()}
          change={metrics.shortlistedRatio}
          isPositive={true}
          icon={UserCheck}
          subtitle="Tier A top candidates (≥75)"
        />

        <MetricCard
          title="Avg AI Score"
          value={metrics.avgScore}
          change={metrics.avgScoreChange}
          isPositive={true}
          icon={Award}
          subtitle="Groq LLaMA 3 composite rating"
        />

        <MetricCard
          title="Avg Processing Time"
          value={metrics.avgProcessingTime}
          change={metrics.processingTimeChange}
          isPositive={true}
          icon={Zap}
          subtitle="From upload to offer dispatch"
        />
      </div>

      {/* Funnel Visualization */}
      <CandidateFunnel metrics={metrics} />

      {/* Main Grid: Candidates Table & Activity Feed */}
      <div className="grid-2">
        <div className="glass-card">
          <div className="section-header">
            <h2 className="section-title">
              <Users size={18} style={{ color: "var(--accent-cyan)" }} />
              Recent Candidate Screenings
            </h2>
            <button
              onClick={() => navigate("/candidates")}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent-cyan)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <span>View All ({candidates.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <CandidateTable candidates={candidates} limit={5} />
        </div>

        <div>
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};
