"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface Session {
  id: string;
  startedAt: string;
  expiresAt: string;
  locked: boolean;
  lockedAt: string | null;
  mode?: string;
  user: { name: string; email: string; currentModule: number };
  _count: { proposals: number };
}

function ModuleBadge({ module }: { module: number }) {
  const labels: Record<number, string> = { 1: "Module 1", 2: "Module 2", 3: "Module 3", 4: "Complete" };
  const colors: Record<number, string> = {
    1: "bg-gray-100 text-gray-600 border-gray-200",
    2: "bg-amber-50 text-amber-700 border-amber-200",
    3: "bg-blue-50 text-blue-700 border-blue-200",
    4: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const label = labels[module] ?? `Module ${module}`;
  const color = colors[module] ?? colors[1];
  return (
    <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${color}`}>{label}</span>
  );
}

export default function AdminSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/sessions")
      .then(r => r.json())
      .then(setSessions)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assessment Sessions</h1>
        <p className="text-gray-500 mt-1">All 30-minute VP sessions — active and historical</p>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" /></div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No sessions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">VP</th>
                  <th className="text-left px-6 py-3 font-medium">Started</th>
                  <th className="text-left px-6 py-3 font-medium">Expires / Locked</th>
                  <th className="text-left px-6 py-3 font-medium">Duration</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Proposals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sessions.map(s => {
                  const started = new Date(s.startedAt);
                  const expires = new Date(s.expiresAt);
                  const isActive = !s.locked && expires > now;
                  const timeLeft = Math.max(0, Math.floor((expires.getTime() - now.getTime()) / 1000));
                  const mins = Math.floor(timeLeft / 60);
                  const secs = timeLeft % 60;

                  return (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-medium text-gray-900">{s.user.name}</p>
                          <ModuleBadge module={s.user.currentModule ?? 1} />
                        </div>
                        <p className="text-xs text-gray-500">{s.user.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {started.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {s.locked && s.lockedAt
                          ? `Locked at ${new Date(s.lockedAt).toLocaleString()}`
                          : expires.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-700">
                        {isActive
                          ? <span className="text-orange-600 font-bold">{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")} left</span>
                          : "30:00"}
                      </td>
                      <td className="px-6 py-4">
                        {isActive ? (
                          <Badge variant="warning">Active</Badge>
                        ) : s.locked ? (
                          <Badge variant="danger">Locked</Badge>
                        ) : (
                          <Badge variant="default">Expired</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${s._count.proposals > 0 ? "text-blue-600" : "text-gray-400"}`}>
                          {s._count.proposals}
                        </span>
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
