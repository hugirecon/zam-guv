"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SessionTimer } from "@/components/vp/SessionTimer";

function TrainingBanner() {
  const router = useRouter();
  const [advancing, setAdvancing] = useState(false);

  const handleBeginSimulation = async () => {
    setAdvancing(true);
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "complete" }),
      });
      // Log out first so next login creates assessment session
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login?ready=true");
    } catch {
      setAdvancing(false);
    }
  };

  return (
    <div style={{
      background: "#faf3d1",
      borderBottom: "2px solid #e6c84a",
      padding: "8px 16px",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#7a4800", textTransform: "uppercase", letterSpacing: "0.5px" }}>MODULE 2 — Training Mode</span>
          <span style={{ fontSize: "13px", color: "#7a4800" }}>· No timer · Browse and practice freely</span>
        </div>
        <button
          onClick={handleBeginSimulation}
          disabled={advancing}
          style={{
            background: advancing ? "#999" : "#b22234",
            color: "#ffffff",
            border: "none",
            borderRadius: "3px",
            padding: "6px 16px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: advancing ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {advancing ? "Saving…" : "Begin 30-Minute Simulation →"}
        </button>
      </div>
    </div>
  );
}

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

// ZAM.GOV Uncle Sam hat SVG icon
function ZamGovLogo() {
  return (
    <a href="/vp" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
      {/* Uncle Sam hat SVG */}
      <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Hat brim */}
        <rect x="2" y="28" width="32" height="5" rx="1" fill="#b22234"/>
        {/* Hat brim stripe */}
        <rect x="2" y="29.5" width="32" height="2" fill="#ffffff"/>
        {/* Hat body */}
        <rect x="8" y="8" width="20" height="20" fill="#1b2a6b"/>
        {/* Hat body stripes */}
        <rect x="8" y="12" width="20" height="2.5" fill="#ffffff" opacity="0.3"/>
        <rect x="8" y="17" width="20" height="2.5" fill="#ffffff" opacity="0.3"/>
        <rect x="8" y="22" width="20" height="2.5" fill="#ffffff" opacity="0.3"/>
        {/* Star on hat */}
        <text x="18" y="21" textAnchor="middle" fontSize="10" fill="#ffffff">★</text>
        {/* Hat band */}
        <rect x="6" y="26" width="24" height="3" fill="#b22234"/>
        {/* Hat top */}
        <rect x="8" y="5" width="20" height="4" rx="1" fill="#1b2a6b"/>
      </svg>
      <div style={{ lineHeight: "1" }}>
        <span style={{
          fontSize: "22px",
          fontWeight: "900",
          fontFamily: "Source Sans Pro, system-ui, sans-serif",
          letterSpacing: "-0.5px",
          color: "#1b2a6b",
        }}>
          ZAM
        </span>
        <span style={{
          fontSize: "22px",
          fontWeight: "900",
          fontFamily: "Source Sans Pro, system-ui, sans-serif",
          letterSpacing: "-0.5px",
          color: "#b22234",
        }}>
          .GOV
        </span>
        <sup style={{ fontSize: "10px", color: "#b22234", fontWeight: "700" }}>®</sup>
      </div>
    </a>
  );
}

export default function VPLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isSimPage = pathname?.includes("/vp/sim");
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

  // On non-sim pages (e.g. /vp/hub), skip the full SAM.gov layout — the page handles its own UI
  if (!isSimPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  // Session expired — show lock screen
  if (sessionExpired) {
    return (
      <div style={{ minHeight: "100vh", background: "#1b1b1b", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", background: "#b22234", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg style={{ width: "40px", height: "40px", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10M10 9V7a2 2 0 114 0v2M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "white", marginBottom: "12px" }}>Session Expired</h1>
          <p style={{ color: "#adadad", fontSize: "16px", marginBottom: "24px" }}>
            Your 30-minute assessment session has ended. All in-progress proposals have been automatically submitted for review.
          </p>
          <div style={{ background: "#2d2d2d", borderRadius: "8px", padding: "16px", textAlign: "left", marginBottom: "24px" }}>
            <p style={{ color: "#c9c9c9", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>What happens next:</p>
            <ul style={{ color: "#adadad", fontSize: "13px", paddingLeft: "16px" }}>
              <li style={{ marginBottom: "4px" }}>All submitted proposals are under administrative review</li>
              <li style={{ marginBottom: "4px" }}>AI scoring will complete within minutes</li>
              <li style={{ marginBottom: "4px" }}>Results will be communicated by your program manager</li>
              <li>No further modifications are permitted</li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            style={{ width: "100%", background: "#005ea2", color: "white", fontWeight: "600", padding: "12px 24px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "16px" }}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const isTraining = session?.mode === "training";
  const isAssessment = session && !session.locked && !isTraining;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", fontFamily: "Source Sans Pro, system-ui, -apple-system, sans-serif" }}>
      {/* Official government banner */}
      <div style={{ background: "#1b1b1b", padding: "4px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#ffffff" }}>🇺🇸</span>
          <span style={{ fontSize: "12px", color: "#dfe1e2" }}>
            An official website of the United States government
          </span>
          <span style={{ fontSize: "12px", color: "#71767a", marginLeft: "8px" }}>
            <a href="#" style={{ color: "#71767a", textDecoration: "none" }}>Here&apos;s how you know ▾</a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #dfe1e2", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <ZamGovLogo />

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Training mode badge */}
              {isTraining && (
                <span style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#7a4800",
                  background: "#faf3d1",
                  border: "1px solid #e6c84a",
                  padding: "4px 10px",
                  borderRadius: "2px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  ⚠ Training Mode
                </span>
              )}
              {/* Assessment timer */}
              {isAssessment && session && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SessionTimer
                    expiresAt={session.expiresAt}
                    sessionId={session.id}
                    onExpire={handleExpire}
                  />
                </div>
              )}
              <span style={{ fontSize: "14px", color: "#1b1b1b", fontWeight: "600" }}>{user.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  fontSize: "13px",
                  color: "#005ea2",
                  background: "transparent",
                  border: "1px solid #005ea2",
                  padding: "6px 14px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation bar */}
        <nav style={{ background: "#1b2a6b", borderTop: "none" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center" }}>
            {[
              { label: "Home", href: "/vp" },
              { label: "Search", href: "/vp", active: true },
              { label: "Data Bank", href: "#" },
              { label: "Data Services", href: "#" },
              { label: "Help", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: "inline-block",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: item.active ? "700" : "400",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderBottom: item.active ? "3px solid #00a91c" : "3px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Module 2 training banner */}
      {isTraining && <TrainingBanner />}

      {/* Main content */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px" }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: "#1b2a6b", marginTop: "48px", padding: "24px 16px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#dfe1e2", fontSize: "13px" }}>
            ZAM.GOV — Simulation Portal for Government Contracting Training · Knight Division Tactical
          </p>
        </div>
      </footer>
    </div>
  );
}
