"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SessionTimer } from "@/components/vp/SessionTimer";

interface SessionInfo {
  id: string;
  startedAt: string;
  expiresAt: string;
  locked: boolean;
  mode?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function VPLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== "vp") {
          router.replace("/login");
          return;
        }
        setUser(data.user);
        setSession(data.session);
        if (data.session?.locked) {
          setSessionExpired(true);
        }
      })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleExpire = useCallback(() => {
    setSessionExpired(true);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  // Session expired — show lock screen
  if (sessionExpired) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10M10 9V7a2 2 0 114 0v2M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Session Expired</h1>
            <p className="text-slate-400 text-lg">
              Your 30-minute assessment session has ended. All in-progress proposals have been automatically submitted for review.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-left space-y-2">
            <p className="text-slate-300 text-sm font-medium">What happens next:</p>
            <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>All submitted proposals are under administrative review</li>
              <li>AI scoring will complete within minutes</li>
              <li>Results will be communicated by your program manager</li>
              <li>No further modifications are permitted</li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">Zam.guv</span>
                <span className="ml-2 text-xs text-gray-500 uppercase tracking-wide">VP Assessment Portal</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {session && !session.locked && session.mode === "training" && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  Training Mode — No Timer
                </span>
              )}
              {session && !session.locked && session.mode !== "training" && (
                <SessionTimer
                  expiresAt={session.expiresAt}
                  sessionId={session.id}
                  onExpire={handleExpire}
                />
              )}
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
