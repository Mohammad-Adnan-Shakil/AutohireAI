import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const MetricCard = ({ title, value, change, isPositive = true, icon: Icon, subtitle }) => {
  return (
    <div className="glass-card metric-card">
      <div className="metric-header">
        <span>{title}</span>
        {Icon && (
          <div className="metric-icon-box">
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="metric-value-row">
        <div className="metric-value">{value}</div>
        {change && (
          <div className={`metric-change ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "-0.5rem" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};
