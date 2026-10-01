import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ToastContainer } from "./components/Toast";
import { DemoModal } from "./components/DemoModal";

import { Dashboard } from "./pages/Dashboard";
import { Candidates } from "./pages/Candidates";
import { CandidateDetails } from "./pages/CandidateDetails";
import { AIScreening } from "./pages/AIScreening";
import { Workflow } from "./pages/Workflow";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/candidates/:id" element={<CandidateDetails />} />
                <Route path="/screening" element={<AIScreening />} />
                <Route path="/workflow" element={<Workflow />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Global Toast Notifications & Hackathon Demo Modal */}
        <ToastContainer />
        <DemoModal />
      </Router>
    </AppProvider>
  );
}
