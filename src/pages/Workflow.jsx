import React, { useState } from "react";
import { WORKFLOW_NODES } from "../data/mockData";
import { WorkflowNode } from "../components/WorkflowNode";
import {
  GitBranch,
  CheckCircle2,
  ArrowRight,
  Clock,
  Zap,
  Activity,
  Layers,
  Terminal
} from "lucide-react";

export const Workflow = () => {
  const [selectedNode, setSelectedNode] = useState(WORKFLOW_NODES[3]); // Default Groq node

  return (
    <div className="page-container">
      {/* Page Title & Status Banner */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFF" }}>
          Autonomous Recruitment Workflow
        </h1>
        <p style={{ fontSize: "0.88rem", color: "var(--accent-cyan)", marginTop: "4px" }}>
          n8n Orchestrated Microservice Architecture & Automation Pipeline
        </p>
      </div>

      {/* Workflow Operational Status Header */}
      <div
        className="glass-card"
        style={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          borderLeft: "4px solid var(--accent-cyan)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(0, 240, 255, 0.1)",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-cyan)"
            }}
          >
            <GitBranch size={24} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                WORKFLOW STATUS
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10B981" }}>
                ● All systems operational
              </span>
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF", marginTop: "2px" }}>
              n8n Event-Driven Pipeline Active
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
          <div>
            <span style={{ color: "var(--text-muted)" }}>Last execution: </span>
            <span style={{ color: "#FFF", fontWeight: 700 }}>21 seconds ago</span>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)" }}>Average execution: </span>
            <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>52 sec</span>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graph Nodes Grid */}
      <div className="glass-card" style={{ marginBottom: "2rem", overflowX: "auto" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
          Pipeline Architecture Diagram (Click nodes to inspect JSON schema)
        </h3>

        {/* Pipeline Diagram Sequence */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Row 1: Intake & AI Analysis */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <WorkflowNode node={WORKFLOW_NODES[0]} isSelected={selectedNode.id === WORKFLOW_NODES[0].id} onClick={() => setSelectedNode(WORKFLOW_NODES[0])} />
            <ArrowRight size={20} style={{ color: "var(--accent-cyan)" }} />
            <WorkflowNode node={WORKFLOW_NODES[1]} isSelected={selectedNode.id === WORKFLOW_NODES[1].id} onClick={() => setSelectedNode(WORKFLOW_NODES[1])} />
            <ArrowRight size={20} style={{ color: "var(--accent-cyan)" }} />
            <WorkflowNode node={WORKFLOW_NODES[2]} isSelected={selectedNode.id === WORKFLOW_NODES[2].id} onClick={() => setSelectedNode(WORKFLOW_NODES[2])} />
            <ArrowRight size={20} style={{ color: "var(--accent-cyan)" }} />
            <WorkflowNode node={WORKFLOW_NODES[3]} isSelected={selectedNode.id === WORKFLOW_NODES[3].id} onClick={() => setSelectedNode(WORKFLOW_NODES[3])} />
          </div>

          {/* Switch Node Router */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingLeft: "12rem" }}>
            <ArrowRight size={20} style={{ color: "var(--accent-cyan)", transform: "rotate(90deg)" }} />
          </div>

          {/* Row 2: Switch Router & Action Dispatchers */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <WorkflowNode node={WORKFLOW_NODES[4]} isSelected={selectedNode.id === WORKFLOW_NODES[4].id} onClick={() => setSelectedNode(WORKFLOW_NODES[4])} />
            <ArrowRight size={20} style={{ color: "var(--accent-cyan)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <WorkflowNode node={WORKFLOW_NODES[5]} isSelected={selectedNode.id === WORKFLOW_NODES[5].id} onClick={() => setSelectedNode(WORKFLOW_NODES[5])} />
                <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                <WorkflowNode node={WORKFLOW_NODES[6]} isSelected={selectedNode.id === WORKFLOW_NODES[6].id} onClick={() => setSelectedNode(WORKFLOW_NODES[6])} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <WorkflowNode node={WORKFLOW_NODES[7]} isSelected={selectedNode.id === WORKFLOW_NODES[7].id} onClick={() => setSelectedNode(WORKFLOW_NODES[7])} />
                <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                <WorkflowNode node={WORKFLOW_NODES[8]} isSelected={selectedNode.id === WORKFLOW_NODES[8].id} onClick={() => setSelectedNode(WORKFLOW_NODES[8])} />
                <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                <WorkflowNode node={WORKFLOW_NODES[9]} isSelected={selectedNode.id === WORKFLOW_NODES[9].id} onClick={() => setSelectedNode(WORKFLOW_NODES[9])} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Inspector Panel */}
      {selectedNode && (
        <div className="glass-card" style={{ border: "1px solid var(--accent-cyan)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Terminal size={20} style={{ color: "var(--accent-cyan)" }} />
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFF" }}>
                  Node Inspector: {selectedNode.name}
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Type: {selectedNode.type.toUpperCase()} • Provider: {selectedNode.provider}
                </span>
              </div>
            </div>
            <span className="badge badge-tier-a">STATUS: {selectedNode.status.toUpperCase()}</span>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            {selectedNode.description}
          </p>

          <div
            style={{
              background: "#070B14",
              border: "1px solid var(--border-color)",
              borderRadius: "10px",
              padding: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent-cyan)"
            }}
          >
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`// n8n Node Configuration Schema
{
  "nodeId": "${selectedNode.id}",
  "name": "${selectedNode.name}",
  "provider": "${selectedNode.provider}",
  "retryOnFailure": true,
  "maxTries": 3,
  "timeout": 60000,
  "executionMetrics": {
    "totalExecutions": "${selectedNode.execCount}",
    "errorRate": "0.008%",
    "avgLatency": "420ms"
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
