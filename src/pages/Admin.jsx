import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get("/admin/teams");
        setTeams(res.data);
      } catch (err) {
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Handle accept / reject
  const updateStatus = async (teamId, status) => {
    try {
      // API call
      await api.patch(`/admin/teams/${teamId}`, {
        status,
      });

      // Optimistic UI update
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId
            ? { ...team, status }
            : team
        )
      );
    } catch (err) {
      alert("Action failed. Try again.");
    }
  };

  const statusBadge = (status) => {
    if (status === "accepted")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Admin Panel – Teams
      </h1>

      {loading && (
        <div className="bg-white p-6 rounded-xl shadow">
          Loading teams...
        </div>
      )}

      {error && (
        <div className="bg-white p-6 rounded-xl shadow text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Team Name</th>
                <th className="p-3 text-left">Team ID</th>
                <th className="p-3 text-left">Problem</th>
                <th className="p-3 text-left">Submission</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {teams.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    No teams found
                  </td>
                </tr>
              )}

              {teams.map((team) => (
                <tr key={team.id} className="border-b">
                  <td className="p-3">{team.teamName}</td>
                  <td className="p-3">{team.teamId}</td>
                  <td className="p-3">{team.problemStatement}</td>

                  <td className="p-3">
                    {team.submissionLink ? (
                      <a
                        href={team.submissionLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "Not submitted"
                    )}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusBadge(
                        team.status
                      )}`}
                    >
                      {team.status}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      disabled={team.status !== "pending"}
                      onClick={() =>
                        updateStatus(team.id, "accepted")
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-40"
                    >
                      Accept
                    </button>

                    <button
                      disabled={team.status !== "pending"}
                      onClick={() =>
                        updateStatus(team.id, "rejected")
                      }
                      className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
