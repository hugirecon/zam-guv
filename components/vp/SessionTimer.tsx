"use client";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SessionTimerProps {
  expiresAt: string; // ISO string
  sessionId: string;
  onExpire: () => void;
}

export function SessionTimer({ expiresAt, sessionId, onExpire }: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);
  const [lockCalled, setLockCalled] = useState(false);

  const lockSession = useCallback(async () => {
    if (lockCalled) return;
    setLockCalled(true);
    try {
      await fetch("/api/sessions/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch (err) {
      console.error("Failed to lock session:", err);
    }
    onExpire();
  }, [lockCalled, sessionId, onExpire]);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const end = new Date(expiresAt).getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setSecondsLeft(diff);

      if (diff === 0 && !expired) {
        setExpired(true);
        lockSession();
      }
    };

    update(); // immediate
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, expired, lockSession]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Warning thresholds
  const isWarning = secondsLeft <= 5 * 60 && secondsLeft > 0; // ≤5 minutes
  const isCritical = secondsLeft <= 60 && secondsLeft > 0;    // ≤1 minute

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-sm transition-colors",
        expired
          ? "bg-red-600 text-white"
          : isWarning
          ? cn(
              "bg-red-100 text-red-700 border border-red-300",
              isCritical && "animate-pulse"
            )
          : "bg-slate-100 text-slate-700 border border-slate-200"
      )}
      title="Time remaining in this assessment session"
    >
      <svg
        className={cn("w-4 h-4", isWarning && !expired && "text-red-500")}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {expired ? "Session Expired" : `Time Remaining: ${display}`}
      </span>
    </div>
  );
}
