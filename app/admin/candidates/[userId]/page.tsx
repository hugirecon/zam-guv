"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ContractView {
  id: string;
  contractId: string;
  viewedAt: string;
  timeSpentMs: number | null;
  contract: { title: string; solicNumber: string };
}

interface ProposalSummary {
  id: string;
  status: string;
  submittedAt: string | null;
  aiScore: number | null;
  adminScore: number | null;
  createdAt: string;
  contract: { id: string; title: string; solicNumber: string };
}

interface Session {
  id: string;
  vehicleType: string;
  mode: string;
  startedAt: string;
  expiresAt: string;
  locked: boolean;
  lockedAt: string | null;
  tabSwitchCount: number;
  proposals: ProposalSummary[];
  contractViews: ContractView[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  currentModule: number;
  cohort: { id: string; name: string } | null;
  sessions: Session[];
}

interface Stats {
  totalSessions: number;
  totalViews: number;
  uniqueContractsViewed: number;
  totalProposals: number;
  submittedProposals: number;
  bidRate: number | null;
  avgTimePerProposalMs: number | null;
  submissionTimings: { minutes: number; rushed: boolean }[];
  rushedCount: number;
}

function fmtMs(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
}

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [data, setData] = useState<{ candidate: Candidate; stats: Stats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSession, setOpenSession] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/candidates/${userId}`)
      .then((r) => {
        if (r.status === 403) { router.replace("/login"); return null; }
        return r.json();
      })
      .then((d) => { if (d) setData(d); })
      .finally(() => setLoading(false));
  }, [userId, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) return <div className="text-gray-500 py-20 text-center">Candidate not found.</div>;

  const { candidate, stats } = data;

  const scoreColor = (s: number | null) => {
    if (s == null) return "text-gray-400";
    return s >= 80 ? "text-green-600" : s >= 60 ? "text-yellow-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block">
            ← Back to Users
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-500 mt-1">{candidate.email}</p>
          {candidate.cohort && (
            <Badge variant="info" className="mt-2">{candidate.cohort.name}</Badge>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 space-y-2">
          <p>Joined: {new Date(candidate.createdAt).toLocaleDateString()}</p>
          <p>Module: {candidate.currentModule}</p>
          <a
            href={`/api/admin/candidates/${userId}/report`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Report (PDF)
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.totalSessions}</p>
            <p className="text-xs text-gray-500 mt-1">Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-indigo-600">{stats.uniqueContractsViewed}</p>
            <p className="text-xs text-gray-500 mt-1">Contracts Viewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className={`text-3xl font-bold ${stats.bidRate != null ? "text-emerald-600" : "text-gray-400"}`}>
              {stats.bidRate != null ? `${stats.bidRate}%` : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Bid Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-amber-600">
              {stats.avgTimePerProposalMs != null ? fmtMs(stats.avgTimePerProposalMs) : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Avg Time on Contract</p>
          </CardContent>
        </Card>
      </div>

      {/* Submission timing */}
      {stats.submissionTimings.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Submission Timing Behavior</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Minutes from session start when each proposal was submitted. {stats.rushedCount > 0 && <span className="text-orange-600 font-semibold">{stats.rushedCount} rushed (≥25 min)</span>}</p>
            <div className="flex flex-wrap gap-2">
              {stats.submissionTimings.map((t, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                  t.rushed ? "bg-orange-50 text-orange-700 border-orange-300" :
                  t.minutes < 15 ? "bg-green-50 text-green-700 border-green-200" :
                  "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}>
                  {t.minutes}m{t.rushed ? " ⚡" : ""}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sessions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Sessions</h2>
        <div className="space-y-4">
          {candidate.sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setOpenSession(openSession === session.id ? null : session.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      session.vehicleType === "IDIQ" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                      session.vehicleType === "OTA" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                      session.vehicleType === "GSA" ? "bg-violet-50 text-violet-700 border-violet-200" :
                      session.vehicleType === "SBIR" ? "bg-orange-50 text-orange-700 border-orange-200" :
                      "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>{session.vehicleType}</span>
                    <Badge variant={session.mode === "training" ? "warning" : "info"}>
                      {session.mode}
                    </Badge>
                    {session.locked && <Badge variant="success">Locked</Badge>}
                    {session.tabSwitchCount > 0 && (
                      <Badge variant={session.tabSwitchCount > 2 ? "danger" : "warning"}>
                        {session.tabSwitchCount} tab switch{session.tabSwitchCount !== 1 ? "es" : ""}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(session.startedAt).toLocaleString()}</span>
                    <span>{session.proposals.length} proposal{session.proposals.length !== 1 ? "s" : ""}</span>
                    <span>{session.contractViews.length} view{session.contractViews.length !== 1 ? "s" : ""}</span>
                    <svg className={`w-4 h-4 transition-transform ${openSession === session.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </CardHeader>

              {openSession === session.id && (
                <CardContent className="space-y-4">
                  {/* Contract views */}
                  {session.contractViews.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Contracts Viewed</p>
                      <div className="space-y-1">
                        {session.contractViews.map((v) => (
                          <div key={v.id} className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-lg text-sm">
                            <div>
                              <span className="font-medium text-gray-800">{v.contract.title}</span>
                              <span className="text-gray-400 font-mono text-xs ml-2">{v.contract.solicNumber}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 text-xs">
                              {v.timeSpentMs != null && <span>{fmtMs(v.timeSpentMs)}</span>}
                              <span>{new Date(v.viewedAt).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Proposals */}
                  {session.proposals.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Proposals</p>
                      <div className="space-y-1">
                        {session.proposals.map((p) => {
                          const displayScore = p.adminScore ?? p.aiScore;
                          return (
                            <div key={p.id} className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-lg text-sm">
                              <div>
                                <span className="font-medium text-gray-800">{p.contract.title}</span>
                                <span className="text-gray-400 font-mono text-xs ml-2">{p.contract.solicNumber}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant={p.status === "submitted" ? "success" : "warning"}>{p.status}</Badge>
                                {displayScore != null && (
                                  <span className={`font-bold text-base ${scoreColor(displayScore)}`}>
                                    {displayScore.toFixed(0)}
                                    {p.adminScore != null && <span className="text-xs ml-0.5">✎</span>}
                                  </span>
                                )}
                                <Link
                                  href={`/admin/proposals/${p.id}`}
                                  className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                >
                                  View →
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}

          {candidate.sessions.length === 0 && (
            <p className="text-gray-400 text-sm">No sessions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
