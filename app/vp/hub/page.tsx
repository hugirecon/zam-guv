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

interface VehicleStatus {
  sessionId: string;
  mode: string;
  locked: boolean;
  expiresAt: string;
  proposalCount: number;
}

type StatusMap = Record<string, VehicleStatus | null>;

const VEHICLES = [
  {
    key: "Standard",
    module: "Module 03",
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
    module: "Module 04",
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
    module: "Module 05",
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
    module: "Module 06",
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
    module: "Module 07",
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

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/sessions/status").then((r) => r.json()),
    ])
      .then(([meData, statusData]) => {
        if (!meData.user || meData.user.role !== "vp") {
          router.replace("/login");
          return;
        }
        setUser(meData.user);
        setStatuses(statusData);
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-300 transition-colors">
                ZAM<span className="text-red-500">.GOV</span>
                <sup className="text-xs text-red-500 font-bold">®</sup>
              </span>
            </Link>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-sm font-medium">Simulation Hub</span>
          </div>
          <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">VP Simulation Hub</h1>
        <p className="text-slate-400 text-lg">
          Choose a vehicle track to enter the simulation. Each track is a separate 30-minute timed assessment.
        </p>
      </div>

      {/* Cards grid — 3 top, 2 bottom */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
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
        <button
          onClick={() => onEnter(v.key)}
          disabled={!!entering}
          className={`w-full text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${v.btn}`}
        >
          {isEnteringSim ? "Loading…" : "Enter Simulation"}
        </button>
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
