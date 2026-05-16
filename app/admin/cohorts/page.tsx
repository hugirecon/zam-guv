"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

interface Cohort {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count: { users: number };
}

export default function AdminCohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/admin/cohorts")
      .then((r) => r.json())
      .then(setCohorts)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/cohorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", description: "" });
        setShowForm(false);
        load();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete cohort "${name}"? Users will be unassigned.`)) return;
    await fetch(`/api/admin/cohorts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cohorts</h1>
          <p className="text-gray-500 mt-1">Group VP candidates into cohorts for tracking</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "New Cohort"}
        </button>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleCreate} className="p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Create Cohort</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Spring 2026 Cohort"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional description"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? "Creating…" : "Create"}
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
        ) : cohorts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No cohorts yet. Create one to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Description</th>
                  <th className="text-left px-6 py-3 font-medium">Members</th>
                  <th className="text-left px-6 py-3 font-medium">Created</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cohorts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/admin/cohorts/${c.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.description ?? <span className="text-gray-400">—</span>}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{c._count.users}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/admin/cohorts/${c.id}`} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
