import React from "react";

export const ScoreRing = ({ score = 82, size = 140, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = "#10B981"; // Tier A green
  if (score < 50) strokeColor = "#EF4444";
  else if (score < 75) strokeColor = "#F59E0B";

  return (
    <div style={{ position: "relative", width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Score Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ fontSize: `${size * 0.28}px`, fontWeight: 800, color: "#FFF", fontFamily: "var(--font-mono)" }}>
          {score}
        </span>
        <span style={{ fontSize: `${size * 0.1}px`, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
          / 100
        </span>
      </div>
    </div>
  );
};
