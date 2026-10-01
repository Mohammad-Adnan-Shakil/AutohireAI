import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  GitBranch,
  BarChart3,
  Settings,
  Zap,
  Activity,
  Cpu
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/candidates", label: "Candidates", icon: Users },
  { path: "/screening", label: "AI Screening", icon: FileCheck },
  { path: "/workflow", label: "Workflow", icon: GitBranch },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings }
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <NavLink to="/" className="brand-logo">
            <div className="brand-icon">
              <Zap size={20} />
            </div>
            <div>
              <div className="brand-name">AutoHire.AI</div>
            </div>
          </NavLink>
          <div className="brand-subtitle">AI Recruitment Engine</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>System Online</span>
        </div>
        <div className="status-details">
          <div>n8n Connected</div>
          <div>AI Engine Active</div>
        </div>
      </div>
    </aside>
  );
};
