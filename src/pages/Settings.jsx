import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Cpu, FileText, GitBranch, Mail, Calendar, Database, MessageSquare, Save } from "lucide-react";

export const Settings = () => {
  const { addToast } = useApp();
  const [integrations, setIntegrations] = useState({
    gmail: true,
    calendar: true,
    airtable: true,
    slack: true
  });

  const toggleIntegration = (key) => {
    setIntegrations((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      addToast(`${key.toUpperCase()} integration ${updated[key] ? "Connected" : "Disconnected"}`, "info");
      return updated;
    });
  };

  const saveSettings = () => {
    addToast("✓ System Settings & API configurations saved successfully!", "success");
  };

  return (
    <div className="page-container" style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFF" }}>System & Service Settings</h1>
        <p style={{ fontSize: "0.88rem", color: "var(--accent-cyan)", marginTop: "4px" }}>
          Configure AI LLM providers, n8n webhook routing & API integrations
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* AI Engine Settings */}
        <div className="glass-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Cpu size={20} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF" }}>AI Evaluation Engine</h3>
            </div>
            <span className="badge badge-tier-a">● CONNECTED</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>LLM Provider</label>
              <input
                type="text"
                readOnly
                value="Groq Cloud LLaMA 3 API"
                style={{
                  width: "100%",
                  background: "rgba(13, 19, 32, 0.9)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "0.6rem 0.85rem",
                  color: "#FFF",
                  fontSize: "0.88rem",
                  marginTop: "0.3rem"
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Model Version</label>
              <input
                type="text"
                readOnly
                value="llama3-70b-8192 (High Precision)"
                style={{
                  width: "100%",
                  background: "rgba(13, 19, 32, 0.9)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "0.6rem 0.85rem",
                  color: "#FFF",
                  fontSize: "0.88rem",
                  marginTop: "0.3rem"
                }}
              />
            </div>
          </div>
        </div>

        {/* Resume Parser */}
        <div className="glass-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FileText size={20} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF" }}>Resume Parser Engine</h3>
            </div>
            <span className="badge badge-tier-a">● CONNECTED</span>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Parser Service</label>
            <input
              type="text"
              readOnly
              value="LlamaParse High-Accuracy Document Extraction API"
              style={{
                width: "100%",
                background: "rgba(13, 19, 32, 0.9)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "0.6rem 0.85rem",
                color: "#FFF",
                fontSize: "0.88rem",
                marginTop: "0.3rem"
              }}
            />
          </div>
        </div>

        {/* Automation n8n */}
        <div className="glass-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <GitBranch size={20} style={{ color: "var(--accent-cyan)" }} />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF" }}>Automation Webhook</h3>
            </div>
            <span className="badge badge-tier-a">● ACTIVE</span>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>n8n Webhook Endpoint</label>
            <input
              type="text"
              readOnly
              value="https://n8n.autohire.ai/webhook/v1/resume-pipeline-trigger"
              style={{
                width: "100%",
                background: "rgba(13, 19, 32, 0.9)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "0.6rem 0.85rem",
                color: "var(--accent-cyan)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                marginTop: "0.3rem"
              }}
            />
          </div>
        </div>

        {/* External API Integrations */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
            External Workspace Integrations
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { key: "gmail", name: "Gmail API", icon: Mail, desc: "Sends automated offer/waitlist/rejection emails" },
              { key: "calendar", name: "Google Calendar API", icon: Calendar, desc: "Schedules interview slots for Tier A candidates" },
              { key: "airtable", name: "Airtable Base API", icon: Database, desc: "Syncs recruitment records and audit history" },
              { key: "slack", name: "Slack Webhooks", icon: MessageSquare, desc: "Posts real-time score alerts to #recruitment-feed" }
            ].map((item) => {
              const Icon = item.icon;
              const isConn = integrations[item.key];

              return (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "rgba(13, 19, 32, 0.6)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(0, 240, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-cyan)"
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#FFF" }}>{item.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.desc}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleIntegration(item.key)}
                    style={{
                      background: isConn ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      border: `1px solid ${isConn ? "#10B981" : "#EF4444"}`,
                      color: isConn ? "#10B981" : "#EF4444",
                      padding: "0.4rem 0.85rem",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {isConn ? "● Connected" : "Disconnected"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Settings Button */}
        <button
          onClick={saveSettings}
          className="btn-demo"
          style={{ padding: "0.85rem", fontSize: "0.95rem", justifyContent: "center" }}
        >
          <Save size={18} />
          <span>Save System Configurations</span>
        </button>
      </div>
    </div>
  );
};
