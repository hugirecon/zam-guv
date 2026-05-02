"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const VEHICLE_CONFIG: Record<string, { module: string; label: string; color: string; badgeClass: string; iconBg: string }> = {
  idiq: { module: "Module 04", label: "IDIQ Contracts & Task Orders", color: "indigo", badgeClass: "text-indigo-400 bg-indigo-950 border-indigo-700", iconBg: "bg-indigo-600 shadow-indigo-500/25" },
  ota:  { module: "Module 05", label: "Other Transaction Authority", color: "cyan",   badgeClass: "text-cyan-400 bg-cyan-950 border-cyan-700",     iconBg: "bg-cyan-600 shadow-cyan-500/25"   },
  gsa:  { module: "Module 06", label: "GSA Schedule (MAS)",          color: "violet", badgeClass: "text-violet-400 bg-violet-950 border-violet-700", iconBg: "bg-violet-600 shadow-violet-500/25" },
  sbir: { module: "Module 07", label: "SBIR/STTR",                   color: "orange", badgeClass: "text-orange-400 bg-orange-950 border-orange-700", iconBg: "bg-orange-600 shadow-orange-500/25" },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isReady = searchParams.get("ready") === "true";
  const vehicleParam = searchParams.get("vehicle") || "";
  const vehicleConfig = VEHICLE_CONFIG[vehicleParam.toLowerCase()] ?? null;

  // Map vehicle param to vehicleType value for API
  const vehicleTypeMap: Record<string, string> = { idiq: "IDIQ", ota: "OTA", gsa: "GSA", sbir: "SBIR" };
  const vehicleType = vehicleTypeMap[vehicleParam.toLowerCase()] ?? "Standard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, vehicleType }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.user.role === "admin") {
        router.replace("/admin");
        return;
      }

      // Vehicle-specific logins always go straight to portal
      if (vehicleType !== "Standard") {
        router.replace("/vp");
        return;
      }
      // Core track: route based on currentModule
      const mod = data.currentModule ?? 1;
      if (mod === 1) {
        router.replace("/modules/intro");
      } else {
        router.replace("/vp");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Visual mode based on ?ready param: assessment incoming
  const isAssessmentMode = isReady;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-6">
          <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Modules
          </Link>
        </div>

        {/* Module badge */}
        {vehicleConfig ? (
          <div className="text-center mb-6">
            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border ${vehicleConfig.badgeClass}`}>
              {vehicleConfig.module} — {vehicleConfig.label}
            </span>
          </div>
        ) : isAssessmentMode ? (
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bold text-red-400 bg-red-950 border border-red-700 px-3 py-1.5 rounded-full uppercase tracking-widest">
              Module 03 — Zam.guv GovCon Simulation
            </span>
          </div>
        ) : (
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bold text-blue-400 bg-blue-950 border border-blue-700 px-3 py-1.5 rounded-full uppercase tracking-widest">
              Zam.guv — Sign In
            </span>
          </div>
        )}

        {/* Logo */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${vehicleConfig ? vehicleConfig.iconBg : isAssessmentMode ? "bg-red-600 shadow-red-500/25" : "bg-blue-600 shadow-blue-500/25"}`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Zam.guv</h1>
          <p className="text-slate-400 mt-1">Government Contract Assessment Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sign in</h2>
            {isReady ? (
              <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-red-800">
                  <strong>Training complete.</strong> This login will start your <strong>30-minute assessment</strong>. The timer begins immediately on sign-in.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                Sign in to continue your training or begin the assessment.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="you@agency.gov"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isAssessmentMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "Signing in…" : isAssessmentMode ? "Begin 30-Minute Assessment" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Secure Government Contract Assessment System · Powered by Zam.guv
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
