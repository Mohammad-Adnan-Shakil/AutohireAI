import React from "react";
import { Play, Sparkles, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Header = () => {
  const { runAutonomousDemo, isDemoRunning } = useApp();

  return (
    <header className="header">
      <div className="header-title-group">
        <h1>Good evening, Recruiter</h1>
        <p>Autonomous recruitment command center</p>
      </div>

      <div className="header-right">
        <div className="live-badge">
          <RefreshCw size={14} className="spin-icon" style={{ animation: "spin 4s linear infinite" }} />
          <span>LIVE</span>
          <span style={{ color: "var(--text-muted)", marginLeft: "4px" }}>• Last sync: Just now</span>
        </div>

        <button
          onClick={runAutonomousDemo}
          disabled={isDemoRunning}
          className="btn-demo"
          title="Simulate complete end-to-end recruitment pipeline"
        >
          <Play size={16} fill="currentColor" />
          <span>{isDemoRunning ? "Running Pipeline..." : "▶ Run Demo"}</span>
        </button>
      </div>
    </header>
  );
};
