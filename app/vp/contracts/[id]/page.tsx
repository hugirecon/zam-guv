"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

interface Contract {
  id: string;
  solicNumber: string;
  title: string;
  agency: string;
  subAgency: string | null;
  description: string;
  requirements: string;
  naicsCode: string;
  setAside: string | null;
  valueMin: number;
  valueMax: number;
  dueDate: string;
  pob: string;
  securityClear: string;
  type: string;
}

interface Proposal {
  id: string;
  status: string;
  executiveSummary: string;
  technicalApproach: string;
  managementApproach: string;
  pricingNarrative: string;
  pastPerformance: string;
  proposedValue: number;
  aiScore: number | null;
  aiFeedback: string | null;
  aiScoreBreakdown: string | null;
  submittedAt: string | null;
  autoSubmitted: boolean;
}

const FIELDS = [
  { key: "executiveSummary", label: "Executive Summary", placeholder: "Provide a compelling executive summary that highlights your company's qualifications, understanding of the requirement, and value proposition..." },
  { key: "technicalApproach", label: "Technical Approach", placeholder: "Describe your technical approach in detail, including methodology, tools, processes, and how you will meet each requirement..." },
  { key: "managementApproach", label: "Management Approach", placeholder: "Outline your management plan, key personnel, organizational structure, risk mitigation, and quality assurance processes..." },
  { key: "pricingNarrative", label: "Pricing Narrative", placeholder: "Explain your pricing methodology, cost basis, labor categories, and basis of estimate to justify your proposed value..." },
  { key: "pastPerformance", label: "Past Performance", placeholder: "Describe 3-5 relevant past performance examples with contract numbers, scope, value, and outcome..." },
];

function formatValue(min: number, max: number) {
  const fmt = (n: number) => n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(0)}M` : `$${(n / 1e3).toFixed(0)}K`;
  if (min === 0 && max > 0) return `Up to ${fmt(max)}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

export default function ContractDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [formData, setFormData] = useState({
    executiveSummary: "",
    technicalApproach: "",
    managementApproach: "",
    pricingNarrative: "",
    pastPerformance: "",
    proposedValue: "",
  });
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saved" | "error">("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch(`/api/contracts/${id}`)
      .then((r) => r.json())
      .then(setContract);

    fetch(`/api/proposals?contractId=${id}`)
      .then((r) => r.json())
      .then((proposals: Proposal[]) => {
        if (proposals[0]) {
          setProposal(proposals[0]);
          setFormData({
            executiveSummary: proposals[0].executiveSummary,
            technicalApproach: proposals[0].technicalApproach,
            managementApproach: proposals[0].managementApproach,
            pricingNarrative: proposals[0].pricingNarrative,
            pastPerformance: proposals[0].pastPerformance,
            proposedValue: String(proposals[0].proposedValue || ""),
          });
        }
      });
  }, [id]);

  const handleSave = async () => {
    if (!contract) return;
    setSaving(true);
    setSaveStatus("");
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId: contract.id, ...formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      setProposal(saved);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!proposal) {
      await handleSave();
      return;
    }
    if (!confirm("Submit this proposal? You cannot edit it after submission.")) return;
    setSubmitting(true);
    try {
      // Save latest first
      await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId: contract!.id, ...formData }),
      });
      const res = await fetch(`/api/proposals/${proposal.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error("Submit failed");
      const submitted = await res.json();
      setProposal(submitted);
    } catch (e) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!contract) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const requirements: string[] = JSON.parse(contract.requirements || "[]");
  const isSubmitted = false; // VPs can always edit and resubmit proposals

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Contracts
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Contract info panel */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <p className="text-xs text-gray-500 font-mono">{contract.solicNumber}</p>
              <h1 className="text-lg font-bold text-gray-900 mt-1">{contract.title}</h1>
              <p className="text-sm text-gray-500">{contract.agency}{contract.subAgency ? ` · ${contract.subAgency}` : ""}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{contract.setAside || "Unrestricted"}</Badge>
                <Badge>{contract.type}</Badge>
                {contract.securityClear !== "None" && <Badge variant="danger">{contract.securityClear}</Badge>}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Value Range</span>
                  <span className="font-medium text-gray-900">{formatValue(contract.valueMin, contract.valueMax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Due Date</span>
                  <span className="font-medium text-gray-900">{new Date(contract.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">NAICS</span>
                  <span className="font-medium text-gray-900">{contract.naicsCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-900 text-right max-w-36">{contract.pob}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                <p className="text-sm text-gray-600">{contract.description}</p>
              </div>

              {requirements.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements</p>
                  <ul className="space-y-1">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-0.5">▸</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Score Card (after submission) */}
          {isSubmitted && proposal.aiScore !== null && (
            <AIScoreCard proposal={proposal} />
          )}
          {isSubmitted && proposal.aiScore === null && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-sm text-gray-600">AI scoring in progress…</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Proposal editor */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">Proposal</h2>
                  {isSubmitted ? (
                    <p className="text-sm text-green-600 font-medium mt-0.5">
                      ✓ Submitted {proposal.autoSubmitted ? "(auto-submitted at session end)" : ""}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-0.5">Draft — auto-submitted when session expires</p>
                  )}
                </div>
                {!isSubmitted && (
                  <div className="flex items-center gap-2">
                    {saveStatus === "saved" && <span className="text-xs text-green-600">✓ Saved</span>}
                    {saveStatus === "error" && <span className="text-xs text-red-600">Save failed</span>}
                    <Button variant="outline" size="sm" onClick={handleSave} loading={saving}>
                      Save Draft
                    </Button>
                    <Button size="sm" onClick={handleSubmit} loading={submitting}>
                      Submit Proposal
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <nav className="flex gap-1 -mb-px overflow-x-auto">
                {FIELDS.map((f, i) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveTab(i)}
                    className={`py-3 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === i
                        ? "border-blue-600 text-blue-700"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <button
                  onClick={() => setActiveTab(FIELDS.length)}
                  className={`py-3 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === FIELDS.length
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pricing
                </button>
              </nav>
            </div>

            <CardContent>
              {activeTab < FIELDS.length ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {FIELDS[activeTab].label}
                  </label>
                  <textarea
                    value={formData[FIELDS[activeTab].key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [FIELDS[activeTab].key]: e.target.value })
                    }
                    placeholder={FIELDS[activeTab].placeholder}
                    rows={18}
                    disabled={isSubmitted}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {formData[FIELDS[activeTab].key as keyof typeof formData].length} characters
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposed Contract Value ($)
                    </label>
                    <input
                      type="number"
                      value={formData.proposedValue}
                      onChange={(e) => setFormData({ ...formData, proposedValue: e.target.value })}
                      placeholder="e.g. 42500000"
                      disabled={isSubmitted}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                    {formData.proposedValue && (
                      <p className="text-sm text-gray-500 mt-1">
                        = {Number(formData.proposedValue).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pricing Narrative
                    </label>
                    <textarea
                      value={formData.pricingNarrative}
                      onChange={(e) => setFormData({ ...formData, pricingNarrative: e.target.value })}
                      placeholder="Explain your pricing methodology, cost basis, labor categories, and basis of estimate..."
                      rows={12}
                      disabled={isSubmitted}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              )}
            </CardContent>

            {/* Navigation between tabs */}
            {!isSubmitted && (
              <div className="px-6 pb-4 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                >
                  ← Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(Math.min(FIELDS.length, activeTab + 1))}
                  disabled={activeTab === FIELDS.length}
                >
                  Next →
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function AIScoreCard({ proposal }: { proposal: Proposal }) {
  const breakdown = proposal.aiScoreBreakdown ? JSON.parse(proposal.aiScoreBreakdown) : null;
  const feedback = proposal.aiFeedback ? JSON.parse(proposal.aiFeedback) : null;
  const score = proposal.aiScore || 0;

  const scoreColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
  const scoreBg = score >= 80 ? "bg-green-50 border-green-200" : score >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";

  return (
    <Card className={`border ${scoreBg}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">AI Assessment Score</h3>
          <span className={`text-2xl font-bold ${scoreColor}`}>{score.toFixed(0)}/100</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {breakdown && (
          <div className="space-y-2">
            {Object.entries(breakdown).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-28 capitalize">{key.replace("_", " ")}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${val as number}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 w-8 text-right">{val as number}</span>
              </div>
            ))}
          </div>
        )}
        {feedback && (
          <>
            {feedback.recommendation && (
              <Badge variant={
                feedback.recommendation === "Award" ? "success" :
                feedback.recommendation === "High Competitive" ? "info" :
                feedback.recommendation === "Competitive" ? "warning" : "danger"
              }>
                {feedback.recommendation}
              </Badge>
            )}
            {feedback.feedback && (
              <p className="text-sm text-gray-600">{feedback.feedback}</p>
            )}
            {feedback.strengths?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">Strengths</p>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {feedback.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex gap-1.5"><span className="text-green-500">+</span>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {feedback.weaknesses?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">Areas to Improve</p>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {feedback.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="flex gap-1.5"><span className="text-red-500">−</span>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
