"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LeaderboardEntry {
  rank: number | null;
  userId: string;
  name: string;
  compositeScore: number | null;
  proposalCount: number;
  vehiclesCompleted: number;
  bestScore: number | null;
  hasAdminOverride: boolean;
  isCurrentUser: boolean;
}

interface VehicleStatus {
  sessionId: string;
  mode: string;
  locked: boolean;
  expiresAt: string;
  proposalCount: number;
  completedThisLogin: boolean;
}

type StatusMap = Record<string, VehicleStatus | null>;

const VEHICLES = [
  {
    key: "Standard",
    module: "Standard",
    name: "Standard",
    subtitle: "GovCon Simulation",
    contracts: "52 contracts",
    color: "red",
    border: "border-red-700",
    badge: "text-red-400 bg-red-950 border-red-700",
    btn: "bg-red-600 hover:bg-red-700",
    btnOutline: "border-red-600 text-red-400 hover:bg-red-950",
    glow: "shadow-red-500/20",
    icon: "bg-red-600",
  },
  {
    key: "IDIQ",
    module: "IDIQ",
    name: "IDIQ",
    subtitle: "Task Order Simulation",
    contracts: "25 contracts",
    color: "indigo",
    border: "border-indigo-700",
    badge: "text-indigo-400 bg-indigo-950 border-indigo-700",
    btn: "bg-indigo-600 hover:bg-indigo-700",
    btnOutline: "border-indigo-600 text-indigo-400 hover:bg-indigo-950",
    glow: "shadow-indigo-500/20",
    icon: "bg-indigo-600",
  },
  {
    key: "OTA",
    module: "OTA",
    name: "OTA",
    subtitle: "Prototype Simulation",
    contracts: "25 contracts",
    color: "cyan",
    border: "border-cyan-700",
    badge: "text-cyan-400 bg-cyan-950 border-cyan-700",
    btn: "bg-cyan-600 hover:bg-cyan-700",
    btnOutline: "border-cyan-600 text-cyan-400 hover:bg-cyan-950",
    glow: "shadow-cyan-500/20",
    icon: "bg-cyan-600",
  },
  {
    key: "GSA",
    module: "GSA",
    name: "GSA",
    subtitle: "Schedule Simulation",
    contracts: "25 contracts",
    color: "violet",
    border: "border-violet-700",
    badge: "text-violet-400 bg-violet-950 border-violet-700",
    btn: "bg-violet-600 hover:bg-violet-700",
    btnOutline: "border-violet-600 text-violet-400 hover:bg-violet-950",
    glow: "shadow-violet-500/20",
    icon: "bg-violet-600",
  },
  {
    key: "SBIR",
    module: "SBIR",
    name: "SBIR",
    subtitle: "R&D Simulation",
    contracts: "25 contracts",
    color: "orange",
    border: "border-orange-700",
    badge: "text-orange-400 bg-orange-950 border-orange-700",
    btn: "bg-orange-600 hover:bg-orange-700",
    btnOutline: "border-orange-600 text-orange-400 hover:bg-orange-950",
    glow: "shadow-orange-500/20",
    icon: "bg-orange-600",
  },
] as const;

function getStatusLabel(status: VehicleStatus | null): {
  label: string;
  class: string;
} {
  if (!status) return { label: "Not Started", class: "text-slate-400 bg-slate-800 border-slate-600" };
  if (status.completedThisLogin) return { label: "Completed ✓", class: "text-green-400 bg-green-950 border-green-700" };
  if (status.locked) return { label: "Completed", class: "text-green-400 bg-green-950 border-green-700" };
  const now = new Date();
  const expires = new Date(status.expiresAt);
  if (expires > now) {
    const minsLeft = Math.ceil((expires.getTime() - now.getTime()) / 60000);
    return {
      label: `In Progress — ${minsLeft} min left`,
      class: "text-yellow-400 bg-yellow-950 border-yellow-700",
    };
  }
  return { label: "Completed", class: "text-green-400 bg-green-950 border-green-700" };
}

export default function VPHub() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [statuses, setStatuses] = useState<StatusMap>({});
  const [loading, setLoading] = useState(true);
  const [entering, setEntering] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/sessions/status").then((r) => r.json()),
      fetch("/api/leaderboard").then((r) => r.json()),
    ])
      .then(([meData, statusData, lbData]) => {
        if (!meData.user || meData.user.role !== "vp") {
          router.replace("/login");
          return;
        }
        setUser(meData.user);
        setStatuses(statusData);
        setLeaderboard(lbData.entries ?? []);
      })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleEnter = async (vehicleKey: string, mode?: string) => {
    const key = `${vehicleKey}-${mode ?? "sim"}`;
    setEntering(key);
    try {
      const res = await fetch("/api/sessions/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleType: vehicleKey, ...(mode ? { mode } : {}) }),
      });
      if (res.ok) {
        router.push("/vp/sim");
      }
    } finally {
      setEntering(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-300 transition-colors">
                ZAM<span className="text-red-500">.GOV</span>
                <sup className="text-xs text-red-500 font-bold">®</sup>
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400 text-sm font-medium">Simulation Hub</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">
              ← Main Site
            </Link>
            <span className="text-slate-300 text-sm font-semibold">{user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white px-4 py-1.5 rounded transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <span className="text-slate-400 text-sm">{user.name.split(" ")[0]}</span>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-slate-300 hover:text-white p-1.5 rounded transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-700/50 bg-slate-900/95 px-4 py-3 flex flex-col gap-3">
            <div className="text-slate-400 text-sm">{user.name}</div>
            <Link href="/" className="text-slate-300 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>
              ← Main Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-sm text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">VP Simulation Hub</h1>
        <p className="text-slate-400 text-lg">
          Choose a sub-module to enter the simulation. Each sub-module is a separate 30-minute timed assessment.
        </p>
      </div>

      {/* Cards grid — 3 top, 2 bottom */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {VEHICLES.slice(0, 3).map((v) => (
            <VehicleCard
              key={v.key}
              vehicle={v}
              status={statuses[v.key] ?? null}
              entering={entering}
              onEnter={handleEnter}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl md:mx-auto">
          {VEHICLES.slice(3).map((v) => (
            <VehicleCard
              key={v.key}
              vehicle={v}
              status={statuses[v.key] ?? null}
              entering={entering}
              onEnter={handleEnter}
            />
          ))}
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">🏆 Leaderboard</h2>
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-xs">Ranked by composite AI score</span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm">No scores yet. Complete a simulation to appear on the board.</p>
          </div>
        ) : (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
            {/* Desktop header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-700 bg-slate-900/50">
              <div className="col-span-1 text-xs font-bold text-slate-500 uppercase tracking-wider">#</div>
              <div className="col-span-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</div>
              <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Score</div>
              <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Props</div>
              <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Vehicles</div>
            </div>
            {/* Mobile header */}
            <div className="sm:hidden grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-700 bg-slate-900/50">
              <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider">#</div>
              <div className="col-span-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</div>
              <div className="col-span-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Score</div>
            </div>

            {leaderboard.map((entry, i) => {
              const rankMedal = entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : null;
              const rowBg = entry.isCurrentUser
                ? "bg-amber-500/10 border-l-4 border-l-amber-500"
                : i % 2 === 0
                ? "bg-slate-800/20"
                : "";

              return (
                <div key={entry.userId}>
                  {/* Desktop row */}
                  <div className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-700/50 last:border-0 ${rowBg}`}>
                    <div className="col-span-1">
                      {rankMedal ? <span className="text-lg leading-none">{rankMedal}</span> : <span className="text-slate-500 font-mono text-sm">{entry.rank ?? "—"}</span>}
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <span className={`text-sm font-semibold ${entry.isCurrentUser ? "text-amber-300" : "text-slate-200"}`}>{entry.name}</span>
                      {entry.isCurrentUser && <span className="text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded-full">You</span>}
                    </div>
                    <div className="col-span-2 text-right">
                      {entry.compositeScore !== null ? (
                        <span className={`text-sm font-bold ${
                          entry.compositeScore >= 80 ? "text-emerald-400" : entry.compositeScore >= 60 ? "text-blue-400" : entry.compositeScore >= 40 ? "text-amber-400" : "text-red-400"
                        }`}>
                          {entry.compositeScore}
                          {entry.hasAdminOverride && <span className="text-xs ml-0.5 opacity-70">✎</span>}
                        </span>
                      ) : <span className="text-slate-600 text-sm">—</span>}
                    </div>
                    <div className="col-span-2 text-right"><span className="text-slate-400 text-sm">{entry.proposalCount}</span></div>
                    <div className="col-span-2 text-right"><span className="text-slate-400 text-sm">{entry.vehiclesCompleted}</span></div>
                  </div>
                  {/* Mobile row */}
                  <div className={`sm:hidden grid grid-cols-12 gap-2 px-4 py-3 items-center border-b border-slate-700/50 last:border-0 ${rowBg}`}>
                    <div className="col-span-2">
                      {rankMedal ? <span className="text-base leading-none">{rankMedal}</span> : <span className="text-slate-500 font-mono text-sm">{entry.rank ?? "—"}</span>}
                    </div>
                    <div className="col-span-6 flex items-center gap-1.5 min-w-0">
                      <span className={`text-sm font-semibold truncate ${entry.isCurrentUser ? "text-amber-300" : "text-slate-200"}`}>{entry.name.split(" ")[0]}</span>
                      {entry.isCurrentUser && <span className="text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1 py-0.5 rounded-full flex-shrink-0">You</span>}
                    </div>
                    <div className="col-span-4 text-right">
                      {entry.compositeScore !== null ? (
                        <span className={`text-sm font-bold ${
                          entry.compositeScore >= 80 ? "text-emerald-400" : entry.compositeScore >= 60 ? "text-blue-400" : entry.compositeScore >= 40 ? "text-amber-400" : "text-red-400"
                        }`}>
                          {entry.compositeScore}
                          {entry.hasAdminOverride && <span className="text-xs ml-0.5 opacity-70">✎</span>}
                        </span>
                      ) : <span className="text-slate-600 text-sm">—</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleCard({
  vehicle: v,
  status,
  entering,
  onEnter,
}: {
  vehicle: (typeof VEHICLES)[number];
  status: VehicleStatus | null;
  entering: string | null;
  onEnter: (key: string, mode?: string) => void;
}) {
  const statusInfo = getStatusLabel(status);
  const isEnteringSim = entering === `${v.key}-sim`;
  const isEnteringTraining = entering === `${v.key}-training`;

  return (
    <div
      className={`bg-slate-800/60 border ${v.border} rounded-2xl p-6 flex flex-col gap-4 shadow-xl ${v.glow} hover:bg-slate-800/80 transition-colors`}
    >
      {/* Top row: module badge + status */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${v.badge}`}
        >
          {v.module}
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusInfo.class}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Vehicle name */}
      <div>
        <h2 className="text-xl font-bold text-white">{v.name}</h2>
        <p className="text-slate-400 text-sm">{v.subtitle}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
        {v.key !== "Standard" && <span>⏱ 30-min timer</span>}
        <span>📄 {v.contracts}</span>
        {status?.proposalCount ? (
          <span className="text-slate-400">{status.proposalCount} proposal{status.proposalCount !== 1 ? "s" : ""}</span>
        ) : null}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-auto pt-2">
        {status?.completedThisLogin ? (
          <div className="w-full text-center text-sm font-semibold py-2.5 px-4 rounded-lg bg-green-950 border border-green-700 text-green-400 cursor-not-allowed">
            Assessment Completed ✓
          </div>
        ) : (
          <button
            onClick={() => onEnter(v.key)}
            disabled={!!entering}
            className={`w-full text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${v.btn}`}
          >
            {isEnteringSim ? "Loading…" : "Enter Simulation"}
          </button>
        )}
        <button
          onClick={() => onEnter(v.key, "training")}
          disabled={!!entering}
          className={`w-full text-sm font-semibold py-2.5 px-4 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent ${v.btnOutline}`}
        >
          {isEnteringTraining ? "Loading…" : "Enter Training"}
        </button>
      </div>
    </div>
  );
}
