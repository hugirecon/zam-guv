"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Stats {
  totalContracts: number;
  totalProposals: number;
  submittedProposals: number;
  scoredProposals: number;
  totalVPs: number;
  activeSessions: number;
  topScored: {
    id: string;
    aiScore: number;
    contract: { title: string; solicNumber: string };
    user: { name: string };
  }[];
  byAgency: {
    agency: string;
    _count: number;
  }[];
  byVehicleType: {
    vehicleType: string;
    _count: number;
  }[];
}

function StatCard({ label, value, sub, color = "blue" }: { label: string; value: number | string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    yellow: "bg-yellow-50 text-yellow-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };
  return (
    <Card>
      <CardContent className="pt-5">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colors[color]} mb-3`}>
          <span className="text-xl font-bold">{String(value).slice(0, 1)}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!stats) return <div className="text-red-600">Failed to load stats.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
        <p className="text-gray-500 mt-1">Real-time overview of all assessment activity.</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Active Contracts" value={stats.totalContracts} color="blue" />
        <StatCard label="Total Proposals" value={stats.totalProposals} color="purple" />
        <StatCard label="Submitted" value={stats.submittedProposals} sub={`${stats.totalProposals ? Math.round((stats.submittedProposals / stats.totalProposals) * 100) : 0}% submission rate`} color="green" />
        <StatCard label="AI Scored" value={stats.scoredProposals} sub="by Claude" color="cyan" />
        <StatCard label="VP Assessors" value={stats.totalVPs} color="orange" />
        <StatCard label="Active Sessions" value={stats.activeSessions} sub="30-min timer running" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top scored proposals */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">🏆 Top Scored Proposals</h2>
            <p className="text-sm text-gray-500">Highest AI assessment scores</p>
          </CardHeader>
          <CardContent className="p-0">
            {stats.topScored.length === 0 ? (
              <p className="text-sm text-gray-500 px-6 py-4">No scored proposals yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {stats.topScored.map((p, i) => (
                  <div key={p.id} className="px-6 py-3 flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.contract.title}</p>
                      <p className="text-xs text-gray-500">{p.user.name} · {p.contract.solicNumber}</p>
                    </div>
                    <div className={`text-lg font-bold ${p.aiScore >= 80 ? "text-green-600" : p.aiScore >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                      {p.aiScore.toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contracts by agency */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">🏛️ Contracts by Agency</h2>
            <p className="text-sm text-gray-500">Top agencies in the pool</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.byAgency.map((a) => {
              const pct = Math.round((a._count / stats.totalContracts) * 100);
              return (
                <div key={a.agency}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate max-w-52">{a.agency}</span>
                    <span className="text-gray-500 font-medium">{a._count}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Contracts by vehicle type */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">🚗 By Vehicle Type</h2>
            <p className="text-sm text-gray-500">Contract vehicle breakdown</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.byVehicleType.map((v) => {
              const pct = Math.round((v._count / stats.totalContracts) * 100);
              const barColors: Record<string, string> = {
                IDIQ: "bg-indigo-500",
                OTA: "bg-cyan-500",
                GSA: "bg-violet-500",
                SBIR: "bg-orange-500",
                Standard: "bg-gray-400",
              };
              const labelColors: Record<string, string> = {
                IDIQ: "text-indigo-700",
                OTA: "text-cyan-700",
                GSA: "text-violet-700",
                SBIR: "text-orange-700",
                Standard: "text-gray-600",
              };
              const bar = barColors[v.vehicleType] ?? "bg-gray-400";
              const label = labelColors[v.vehicleType] ?? "text-gray-700";
              return (
                <div key={v.vehicleType}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`font-medium ${label}`}>{v.vehicleType}</span>
                    <span className="text-gray-500 font-medium">{v._count}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className={`${bar} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
