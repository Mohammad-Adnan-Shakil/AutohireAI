import React from "react";
import { Activity, CheckCircle, FileText, Cpu, Mail, Database } from "lucide-react";

export const ActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case "received":
        return <FileText size={14} style={{ color: "#3B82F6" }} />;
      case "parsed":
        return <Cpu size={14} style={{ color: "#00F0FF" }} />;
      case "evaluated":
        return <Activity size={14} style={{ color: "#8B5CF6" }} />;
      case "shortlisted":
        return <CheckCircle size={14} style={{ color: "#10B981" }} />;
      case "email":
        return <Mail size={14} style={{ color: "#F59E0B" }} />;
      case "airtable":
        return <Database size={14} style={{ color: "#00F0FF" }} />;
      default:
        return <CheckCircle size={14} style={{ color: "#10B981" }} />;
    }
  };

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">
          <Activity size={18} style={{ color: "var(--accent-cyan)" }} />
          Autonomous Activity
        </h2>
        <div className="pulse-dot"></div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {activities.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.85rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border-light)"
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2px"
              }}
            >
              {getIcon(item.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FFF" }}>
                  ✓ {item.title}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {item.time}
                </span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", marginTop: "2px" }}>
                {item.candidate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
