import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let color = "#00F0FF";
        if (toast.type === "error") {
          Icon = AlertCircle;
          color = "#EF4444";
        } else if (toast.type === "success") {
          Icon = CheckCircle2;
          color = "#10B981";
        }

        return (
          <div key={toast.id} className="toast">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Icon size={18} style={{ color }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
