"use client";
import { useEffect, useRef } from "react";

interface TabSwitchMonitorProps {
  sessionId: string | undefined;
  isAssessment: boolean;
}

/**
 * Invisible component that listens to visibilitychange events during VP assessment sessions.
 * Posts to /api/sessions/tab-switch whenever the tab is hidden.
 */
export function TabSwitchMonitor({ sessionId, isAssessment }: TabSwitchMonitorProps) {
  const sessionIdRef = useRef(sessionId);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    if (!isAssessment || !sessionId) return;

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && sessionIdRef.current) {
        // Use sendBeacon for reliability during page unload; fallback to fetch
        const url = "/api/sessions/tab-switch";
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob(["{}"], { type: "application/json" }));
        } else {
          fetch(url, { method: "POST" }).catch(() => {});
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAssessment, sessionId]);

  return null;
}
