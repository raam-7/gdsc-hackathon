import React, { useState } from "react";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("phase1");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Hackathon Leaderboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("phase1")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "phase1"
              ? "bg-indigo-600 text-white"
              : "bg-white"
          }`}
        >
          Phase 1 Leaderboard
        </button>

        <button
          onClick={() => setActiveTab("final")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "final"
              ? "bg-indigo-600 text-white"
              : "bg-white"
          }`}
        >
          Final Round Leaderboard
        </button>
      </div>

      {/* Content */}
      {activeTab === "phase1" && <Phase1Leaderboard />}
      {activeTab === "final" && <FinalLeaderboard />}
    </div>
  );
}

/* ================= PHASE 1 ================= */

function Phase1Leaderboard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Phase 1 – Shortlisted Teams
      </h2>

      <p className="text-gray-500">
        Phase 1 leaderboard coming next step...
      </p>
    </div>
  );
}

/* ================= FINAL ROUND ================= */

function FinalLeaderboard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Final Round Rankings
      </h2>

      <p className="text-gray-500">
        Final leaderboard coming next step...
      </p>
    </div>
  );
}
