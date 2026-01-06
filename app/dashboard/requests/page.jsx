"use client";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("admin"))
      : null;

  useEffect(() => {
    if (!admin || admin.role !== "SUPER_ADMIN") {
      setLoading(false);
      return;
    }

    fetch("/api/admin/requests")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch requests");
        }
        return res.json();
      })
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [admin?.role]);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }), 
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Action failed");
        return;
      }

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!admin || admin.role !== "SUPER_ADMIN") {
    return <p className="text-red-500">Access denied</p>;
  }

  return (
    <div>
      <h1 className="text-xl mb-4">Admin Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-400">No pending requests</p>
      )}

      {requests.map((r) => (
        <div
          key={r._id}
          className="border border-slate-700 p-3 mb-3 rounded"
        >
          <p className="mb-2">{r.email}</p>

          <button
            onClick={() => handleAction(r._id, "approve")}
            className="bg-green-600 px-3 py-1 mr-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={() => handleAction(r._id, "reject")}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
