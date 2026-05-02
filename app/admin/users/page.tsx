"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

interface VPUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  currentModule: number;
  _count: { sessions: number; proposals: number };
  sessions: { startedAt: string; vehicleType: string; locked: boolean }[];
}

function VehicleBadge({ vehicleType }: { vehicleType?: string | null }) {
  if (!vehicleType) return null;
  const colors: Record<string, string> = {
    IDIQ: "bg-indigo-50 text-indigo-700 border-indigo-200",
    OTA: "bg-cyan-50 text-cyan-700 border-cyan-200",
    GSA: "bg-violet-50 text-violet-700 border-violet-200",
    SBIR: "bg-orange-50 text-orange-700 border-orange-200",
    Standard: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const color = colors[vehicleType] ?? colors["Standard"];
  return (
    <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${color}`}>
      {vehicleType}
    </span>
  );
}

const VEHICLE_OPTIONS = ["Any", "IDIQ", "OTA", "GSA", "SBIR"];

export default function AdminUsers() {
  const [users, setUsers] = useState<VPUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    vehicleHint: "Any",
  });

  function loadUsers() {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 409) {
        setError("A user with that email already exists.");
        return;
      }
      if (!res.ok) {
        setError("Failed to create user.");
        return;
      }
      setForm({ name: "", email: "", password: "", vehicleHint: "Any" });
      setShowForm(false);
      loadUsers();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user: VPUser) {
    if (!window.confirm(`Delete ${user.name} (${user.email})? This will also delete all their sessions and proposals.`)) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    });
    loadUsers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">VP Users</h1>
          <p className="text-gray-500 mt-1">Manage vendor partner accounts</p>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setError(null); }}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "Add VP"}
        </button>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleAdd} className="p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-900">New VP User</h2>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Track</label>
                <select
                  value={form.vehicleHint}
                  onChange={(e) => setForm((f) => ({ ...f, vehicleHint: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? "Creating…" : "Create VP"}
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No VP users yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Email</th>
                  <th className="text-left px-6 py-3 font-medium">Sessions</th>
                  <th className="text-left px-6 py-3 font-medium">Proposals</th>
                  <th className="text-left px-6 py-3 font-medium">Last Active</th>
                  <th className="text-left px-6 py-3 font-medium">Vehicle</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const lastSession = u.sessions[0] ?? null;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">{u._count.sessions}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${u._count.proposals > 0 ? "text-blue-600" : "text-gray-400"}`}>
                          {u._count.proposals}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lastSession
                          ? new Date(lastSession.startedAt).toLocaleString()
                          : <span className="text-gray-400">Never</span>}
                      </td>
                      <td className="px-6 py-4">
                        {lastSession ? (
                          <VehicleBadge vehicleType={lastSession.vehicleType} />
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(u)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
