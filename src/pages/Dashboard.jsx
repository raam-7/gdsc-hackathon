import React, { useEffect, useState } from "react";
import api from "../api/axios";

/* ================= DEMO MODE ================= */
// 🔹 Set to false when backend is ready
const DEMO_MODE = true;

const SAMPLE_TEAM = {
  teamName: "Code Warriors",
  teamId: "GDSC-HACK-102",
  problemStatement: "AI-Powered Smart Healthcare Platform",
};

/* ================= ICON WRAPPER ================= */

const IconWrapper = ({ color, children }) => (
  <div
    className={`p-2 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}
  >
    {children}
  </div>
);

export default function Dashboard() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMsg, setUploadMsg] = useState("");

  /* ================= FETCH TEAM ================= */

  useEffect(() => {
    const fetchTeam = async () => {
      if (DEMO_MODE) {
        setTimeout(() => {
          setTeam(SAMPLE_TEAM);
          setLoading(false);
        }, 600);
        return;
      }

      try {
        const res = await api.get("/team/me");
        setTeam(res.data);
      } catch (err) {
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  /* ================= FILE HANDLERS ================= */

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setUploadMsg("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMsg("Please select a file first.");
      return;
    }

    /* 🔹 DEMO UPLOAD */
    if (DEMO_MODE) {
      setUploading(true);
      setProgress(0);
      setUploadMsg("");

      let fake = 0;
      const interval = setInterval(() => {
        fake += 10;
        setProgress(fake);

        if (fake >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadMsg("File uploaded successfully! ✅ (Demo Mode)");
        }
      }, 300);

      return;
    }

    /* 🔹 REAL API UPLOAD */
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadMsg("");

      await api.post("/submission/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percent);
        },
      });

      setUploadMsg("File uploaded successfully! ✅");
      setFile(null);
    } catch (err) {
      setUploadMsg("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#3C4043]">
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-[#4285F4] rounded-full"></div>
            <div className="w-2 h-2 bg-[#EA4335] rounded-full"></div>
            <div className="w-2 h-2 bg-[#FBBC05] rounded-full"></div>
            <div className="w-2 h-2 bg-[#34A853] rounded-full"></div>
          </div>
          <h1 className="text-lg font-medium text-gray-700">
            GDSC Event Hub
          </h1>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-normal">
            Team:{" "}
            <span className="text-[#4285F4] font-semibold">
              {team.teamName}
            </span>
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* ================= SIDEBAR ================= */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-5">
                Overview
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <IconWrapper color="text-blue-600 bg-blue-600">
                    👥
                  </IconWrapper>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Team ID
                    </p>
                    <p className="text-sm font-mono font-bold">
                      {team.teamId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <IconWrapper color="text-green-600 bg-green-600">
                    💡
                  </IconWrapper>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Problem Statement
                    </p>
                    <p className="text-sm font-medium leading-tight">
                      {team.problemStatement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= UPLOAD ================= */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-medium mb-2">
                Phase 1 Submission
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Upload your ideation deck (PDF / PPT)
              </p>

              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.ppt,.pptx"
                className="mb-4"
              />

              {uploading && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-[#4285F4] h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadMsg && (
                <div className="mb-4 text-sm text-green-700">
                  {uploadMsg}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="w-full py-3 bg-[#4285F4] text-white rounded-xl font-semibold hover:bg-[#3367D6] disabled:bg-gray-300"
              >
                {uploading ? "Uploading..." : "Submit to Judges"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// Frontend dashboard ready for backend integration
