"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Member {
  id: string;
  name: string;
  email: string;
  currentModule: number;
  proposals: { aiScore: number | null; adminScore: number | null }[];
  sessions: { vehicleType: string; locked: boolean }[];
}

interface Cohort {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  users: Member[];
}

export default function CohortDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/cohorts/${id}`)
      .then((r) => {
        if (!r.ok) { router.replace("/admin/cohorts"); return null; }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setCohort(d);
          setEditName(d.name);
          setEditDesc(d.description ?? "");
        }
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cohorts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, description: editDesc }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCohort((c) => c ? { ...c, name: updated.name, description: updated.description } : c);
        setEditing(false);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!cohort) return null;

  const scoreColor = (s: number | null) => {
    if (s == null) return "text-gray-400";
    return s >= 80 ? "text-green-600" : s >= 60 ? "text-yellow-600" : "text-red-600";
  };

  // Cohort leaderboard
  const leaderboard = cohort.users.map((m) => {
    const scoredProposals = m.proposals.filter((p) => p.adminScore != null || p.aiScore != null);
    const scores = scoredProposals.map((p) => p.adminScore ?? p.aiScore!);
    const composite = scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
      : null;
    const vehiclesCompleted = new Set(
      m.sessions.filter((s) => s.locked).map((s) => s.vehicleType)
    ).size;
    return { ...m, composite, proposalCount: m.proposals.length, vehiclesCompleted };
  }).sort((a, b) => {
    if (a.composite === null && b.composite === null) return 0;
    if (a.composite === null) return 1;
    if (b.composite === null) return -1;
    return b.composite - a.composite;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/cohorts" className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block">
          ← Back to Cohorts
        </Link>
        <div className="flex items-start justify-between">
          <div>
            {editing ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-b border-blue-500 focus:outline-none w-full"
                />
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="text-sm text-gray-500 border-b border-gray-300 focus:outline-none w-full"
                  placeholder="Description (optional)"
                />
                <div className="flex gap-2">
                  <button type="submit" disabled={saving} className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50">
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900">{cohort.name}</h1>
                {cohort.description && <p className="text-gray-500 mt-1">{cohort.description}</p>}
                <button onClick={() => setEditing(true)} className="text-xs text-blue-600 hover:underline mt-1">
                  Edit
                </button>
              </>
            )}
          </div>
          <Badge variant="info">{cohort.users.length} member{cohort.users.length !== 1 ? "s" : ""}</Badge>
        </div>
      </div>

      {/* Cohort Leaderboard */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Cohort Leaderboard</h2>
        </CardHeader>
        {leaderboard.length === 0 ? (
          <CardContent>
            <p className="text-gray-400 text-sm">No members in this cohort.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">#</th>
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Score</th>
                  <th className="text-left px-6 py-3 font-medium">Proposals</th>
                  <th className="text-left px-6 py-3 font-medium">Vehicles</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaderboard.map((m, i) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.email}</p>
                    </td>
                    <td className={`px-6 py-4 text-lg font-bold ${scoreColor(m.composite)}`}>
                      {m.composite != null ? m.composite : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{m.proposalCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{m.vehiclesCompleted}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/candidates/${m.id}`} className="text-xs text-blue-600 hover:underline font-medium">
                        View →
                      </Link>
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
