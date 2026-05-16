"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Proposal {
  id: string;
  status: string;
  proposedValue: number;
  submittedAt: string | null;
  autoSubmitted: boolean;
  aiScore: number | null;
  aiScoreBreakdown: string | null;
  aiFeedback: string | null;
  aiScoredAt: string | null;
  aiInterviewQuestions: string | null;
  adminScore: number | null;
  adminNotes: string | null;
  adminScoredAt: string | null;
  executiveSummary: string;
  technicalApproach: string;
  managementApproach: string;
  pricingNarrative: string;
  pastPerformance: string;
  contract: { id: string; title: string; solicNumber: string; agency: string; vehicleType: string };
  user: { id: string; name: string; email: string };
  session: { id: string; tabSwitchCount: number; mode: string; vehicleType: string };
}

type Tab = "overview" | "proposal" | "override";

export default function AdminProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");

  // Override form state
  const [overrideScore, setOverrideScore] = useState("");
  const [overrideNotes, setOverrideNotes] = useState("");
  const [overrideSubmitting, setOverrideSubmitting] = useState(false);
  const [overrideMsg, setOverrideMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/proposals/${id}`)
      .then((r) => {
        if (r.status === 403 || r.status === 401) { router.replace("/login"); return null; }
        if (!r.ok) return null;
        return r.json();
      })
      .then((d) => {
        if (d) {
          setProposal(d);
          if (d.adminScore != null) setOverrideScore(String(d.adminScore));
          if (d.adminNotes) setOverrideNotes(d.adminNotes);
        }
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleOverride(e: React.FormEvent) {
    e.preventDefault();
    setOverrideSubmitting(true);
    setOverrideMsg(null);
    try {
      const res = await fetch(`/api/admin/proposals/${id}/score`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminScore: parseFloat(overrideScore),
          adminNotes: overrideNotes,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProposal((p) => p ? { ...p, ...updated } : p);
        setOverrideMsg("Score saved successfully.");
      } else {
        setOverrideMsg("Failed to save score.");
      }
    } finally {
      setOverrideSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!proposal) return <div className="text-gray-500 py-20 text-center">Proposal not found.</div>;

  const scoreColor = (s: number | null) => {
    if (s == null) return "text-gray-400";
    return s >= 80 ? "text-green-600" : s >= 60 ? "text-yellow-600" : "text-red-600";
  };

  const breakdown = proposal.aiScoreBreakdown ? JSON.parse(proposal.aiScoreBreakdown) : null;
  const feedback = proposal.aiFeedback ? JSON.parse(proposal.aiFeedback) : null;
  const interviewQs: string[] = proposal.aiInterviewQuestions
    ? JSON.parse(proposal.aiInterviewQuestions)
    : [];
  const displayScore = proposal.adminScore ?? proposal.aiScore;

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "proposal", label: "Proposal Text" },
    { key: "override", label: "Admin Override" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/proposals" className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block">
          ← Back to Proposals
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{proposal.contract.title}</h1>
            <p className="text-gray-500 font-mono text-sm mt-1">{proposal.contract.solicNumber}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">by</span>
              <Link href={`/admin/candidates/${proposal.user.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                {proposal.user.name}
              </Link>
              <Badge variant={proposal.status === "submitted" ? "success" : "warning"}>{proposal.status}</Badge>
              {proposal.autoSubmitted && <span className="text-xs text-gray-400">(auto-submitted)</span>}
            </div>
          </div>
          <div className="text-right">
            <p className={`text-5xl font-bold ${scoreColor(displayScore)}`}>
              {displayScore != null ? displayScore.toFixed(0) : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {proposal.adminScore != null ? "Admin Score ✎" : "AI Score"} / 100
            </p>
          </div>
        </div>
      </div>

      {/* Behavioral flags */}
      {proposal.session.tabSwitchCount > 0 && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
          proposal.session.tabSwitchCount > 2
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-yellow-50 border-yellow-200 text-yellow-700"
        }`}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium">
            {proposal.session.tabSwitchCount} tab switch{proposal.session.tabSwitchCount !== 1 ? "es" : ""} detected during session
            {proposal.session.tabSwitchCount > 2 && " — flagged for review"}
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* AI Score Breakdown */}
          {breakdown && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">AI Score Breakdown</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(breakdown).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 capitalize">{k.replace("_", " ")}</span>
                      <span className={`text-sm font-bold ${scoreColor(v as number)}`}>{v as number}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${(v as number) >= 80 ? "bg-green-500" : (v as number) >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${v as number}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Strengths & Weaknesses */}
          {feedback && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">AI Feedback</h2>
                  {feedback.recommendation && (
                    <Badge variant={
                      feedback.recommendation === "Award" ? "success" :
                      feedback.recommendation === "High Competitive" ? "info" : "warning"
                    }>
                      {feedback.recommendation}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedback.feedback && (
                  <p className="text-sm text-gray-700">{feedback.feedback}</p>
                )}
                {feedback.strengths?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase mb-2">Strengths</p>
                    <ul className="space-y-1">
                      {feedback.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {feedback.weaknesses?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-red-700 uppercase mb-2">Weaknesses</p>
                    <ul className="space-y-1">
                      {feedback.weaknesses.map((w: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">✗</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Interview Questions */}
          {interviewQs.length > 0 && (
            <Card className="xl:col-span-2">
              <CardHeader>
                <h2 className="font-semibold text-gray-900">AI-Generated Interview Questions</h2>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {interviewQs.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="font-bold text-blue-600 flex-shrink-0">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {/* Meta */}
          <Card>
            <CardHeader><h2 className="font-semibold text-gray-900">Metadata</h2></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Proposed Value</span>
                <span className="font-medium">{proposal.proposedValue ? `$${proposal.proposedValue.toLocaleString()}` : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Submitted</span>
                <span className="font-medium">{proposal.submittedAt ? new Date(proposal.submittedAt).toLocaleString() : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">AI Scored</span>
                <span className="font-medium">{proposal.aiScoredAt ? new Date(proposal.aiScoredAt).toLocaleString() : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mode</span>
                <span className="font-medium capitalize">{proposal.session.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tab Switches</span>
                <span className={`font-medium ${proposal.session.tabSwitchCount > 2 ? "text-red-600" : "text-gray-900"}`}>
                  {proposal.session.tabSwitchCount}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Proposal Text Tab */}
      {tab === "proposal" && (
        <div className="space-y-4">
          {[
            { label: "Executive Summary", key: "executiveSummary" },
            { label: "Technical Approach", key: "technicalApproach" },
            { label: "Management Approach", key: "managementApproach" },
            { label: "Pricing Narrative", key: "pricingNarrative" },
            { label: "Past Performance", key: "pastPerformance" },
          ].map(({ label, key }) => (
            <Card key={key}>
              <CardHeader><h2 className="font-semibold text-gray-900">{label}</h2></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {proposal[key as keyof Proposal] as string || <span className="text-gray-400 italic">Not provided</span>}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Admin Override Tab */}
      {tab === "override" && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Admin Score Override</h2>
            <p className="text-sm text-gray-500 mt-1">Override the AI score with your own assessment. The override score will appear on the leaderboard with a ✎ indicator.</p>
          </CardHeader>
          <CardContent>
            {proposal.adminScoredAt && (
              <div className="mb-4 text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
                Last overridden: {new Date(proposal.adminScoredAt).toLocaleString()}
              </div>
            )}
            <form onSubmit={handleOverride} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Override Score (0–100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 78.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Notes
                </label>
                <textarea
                  rows={4}
                  value={overrideNotes}
                  onChange={(e) => setOverrideNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Notes about why you overrode the score..."
                />
              </div>
              {overrideMsg && (
                <p className={`text-sm ${overrideMsg.includes("success") ? "text-green-600" : "text-red-600"}`}>
                  {overrideMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={overrideSubmitting}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {overrideSubmitting ? "Saving…" : "Save Override Score"}
              </button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
