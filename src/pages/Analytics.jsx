import React from "react";
import { useApp } from "../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { MetricCard } from "../components/MetricCard";
import { Zap, Clock, Users, CheckCircle2, BarChart2 } from "lucide-react";

export const Analytics = () => {
  const { metrics } = useApp();

  // Tier Pie chart data
  const pieData = [
    { name: "Tier A (Shortlist)", value: metrics.tierA, color: "#10B981" },
    { name: "Tier B (Waitlist)", value: metrics.tierB, color: "#F59E0B" },
    { name: "Tier C (Reject)", value: metrics.tierC, color: "#EF4444" }
  ];

  // Score distribution bar chart data
  const scoreData = [
    { range: "0–49 (Tier C)", count: metrics.tierC },
    { range: "50–64 (Tier B)", count: Math.round(metrics.tierB * 0.6) },
    { range: "65–74 (Tier B)", count: Math.round(metrics.tierB * 0.4) },
    { range: "75–84 (Tier A)", count: Math.round(metrics.tierA * 0.7) },
    { range: "85–100 (Tier A)", count: Math.round(metrics.tierA * 0.3) }
  ];

  // Processing speed line chart data
  const speedData = [
    { batch: "Batch 1", manual: 900, autohire: 58 },
    { batch: "Batch 2", manual: 850, autohire: 54 },
    { batch: "Batch 3", manual: 920, autohire: 51 },
    { batch: "Batch 4", manual: 880, autohire: 49 },
    { batch: "Batch 5", manual: 910, autohire: 47 }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFF" }}>Recruitment Analytics</h1>
        <p style={{ fontSize: "0.88rem", color: "var(--accent-cyan)", marginTop: "4px" }}>
          AI performance benchmarks, score distribution & speed metrics
        </p>
      </div>

      {/* Automation Impact 4 KPI Cards */}
      <div className="metrics-grid">
        <MetricCard
          title="Manual Effort Reduced"
          value={metrics.manualEffortReduced}
          change="+15%"
          isPositive={true}
          icon={Zap}
          subtitle="Hours saved per candidate"
        />
        <MetricCard
          title="Average Processing Time"
          value={metrics.avgProcessingTime}
          change="-31.6%"
          isPositive={true}
          icon={Clock}
          subtitle="From PDF upload to offer link"
        />
        <MetricCard
          title="Total Processed"
          value={metrics.candidatesProcessed.toLocaleString()}
          change="+18.4%"
          isPositive={true}
          icon={Users}
          subtitle="Autonomous screening runs"
        />
        <MetricCard
          title="Workflow Success Rate"
          value={metrics.workflowSuccessRate}
          change="+0.8%"
          isPositive={true}
          icon={CheckCircle2}
          subtitle="n8n execution reliability"
        />
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Tier Distribution Donut Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
            Candidate Tier Distribution
          </h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0D1320", borderColor: "var(--border-color)", borderRadius: "8px", color: "#FFF" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1rem" }}>
            {pieData.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.color }}></div>
                <span>{p.name}: <strong style={{ color: "#FFF" }}>{p.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Distribution Bar Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
            AI Score Distribution (Groq LLaMA 3)
          </h3>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={scoreData}>
                <XAxis dataKey="range" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "#0D1320", borderColor: "var(--border-color)", borderRadius: "8px", color: "#FFF" }}
                />
                <Bar dataKey="count" fill="var(--accent-cyan)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Speed Comparison Line Chart */}
      <div className="glass-card">
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFF", marginBottom: "1.25rem" }}>
          Processing Speed Comparison (Seconds per Candidate)
        </h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="batch" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ background: "#0D1320", borderColor: "var(--border-color)", borderRadius: "8px", color: "#FFF" }}
              />
              <Line type="monotone" dataKey="manual" name="Manual HR Review (sec)" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="autohire" name="AutoHire.AI Autonomous (sec)" stroke="#00F0FF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
