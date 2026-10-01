import React from "react";
import {
  UserCheck,
  Webhook,
  FileText,
  Cpu,
  GitFork,
  Mail,
  Calendar,
  Database,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2
} from "lucide-react";

const iconMap = {
  UserCheck,
  Webhook,
  FileText,
  Cpu,
  GitFork,
  Mail,
  Calendar,
  Database,
  MessageSquare,
  LayoutDashboard
};

export const WorkflowNode = ({ node, isSelected, onClick }) => {
  const IconComponent = iconMap[node.icon] || Cpu;

  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? "rgba(0, 240, 255, 0.08)" : "var(--card-bg)",
        border: `1px solid ${isSelected ? "var(--accent-cyan)" : "var(--border-color)"}`,
        borderRadius: "14px",
        padding: "1.2rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 0 20px rgba(0, 240, 255, 0.2)" : "none",
        minWidth: "220px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-cyan)"
          }}
        >
          <IconComponent size={18} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "#10B981" }}>
          <CheckCircle2 size={12} />
          <span>Active</span>
        </div>
      </div>

      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFF" }}>{node.name}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>{node.provider}</div>

      <div
        style={{
          marginTop: "0.85rem",
          paddingTop: "0.6rem",
          borderTop: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)"
        }}
      >
        <span>Executions:</span>
        <span style={{ color: "#FFF", fontWeight: 700 }}>{node.execCount}</span>
      </div>
    </div>
  );
};
