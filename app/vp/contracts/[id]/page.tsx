"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

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

// Sidebar nav link
function SidebarNavLink({ label, sectionRef }: { label: string; sectionRef: React.RefObject<HTMLElement | null> }) {
  const handleClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <button
      onClick={handleClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "8px 12px",
        fontSize: "13px",
        color: "#005ea2",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline",
        borderBottom: "1px solid #dfe1e2",
      }}
    >
      {label}
    </button>
  );
}

// AI Score Card
function AIScoreCard({ proposal }: { proposal: Proposal }) {
  const breakdown = proposal.aiScoreBreakdown ? JSON.parse(proposal.aiScoreBreakdown) : null;
  const feedback = proposal.aiFeedback ? JSON.parse(proposal.aiFeedback) : null;
  const score = proposal.aiScore || 0;

  const scoreColor = score >= 80 ? "#168216" : score >= 60 ? "#7a4800" : "#b22234";
  const scoreBg = score >= 80 ? "#e7f2e7" : score >= 60 ? "#faf3d1" : "#fde9e9";
  const scoreBorder = score >= 80 ? "#9ad29a" : score >= 60 ? "#e6c84a" : "#f5aeae";

  return (
    <div style={{ border: `1px solid ${scoreBorder}`, background: scoreBg, borderRadius: "2px", padding: "16px", marginTop: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#1b1b1b" }}>AI Assessment Score</span>
        <span style={{ fontSize: "24px", fontWeight: "900", color: scoreColor }}>{score.toFixed(0)}/100</span>
      </div>
      {breakdown && (
        <div style={{ marginBottom: "12px" }}>
          {Object.entries(breakdown).map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", color: "#565c65", width: "110px", textTransform: "capitalize" }}>{key.replace("_", " ")}</span>
              <div style={{ flex: 1, background: "#dfe1e2", borderRadius: "2px", height: "6px" }}>
                <div style={{ width: `${val}%`, background: "#005ea2", height: "6px", borderRadius: "2px" }} />
              </div>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#1b1b1b", width: "28px", textAlign: "right" }}>{val as number}</span>
            </div>
          ))}
        </div>
      )}
      {feedback && (
        <div>
          {feedback.recommendation && (
            <span style={{
              display: "inline-block",
              background: "#e8f1f9",
              color: "#1a4480",
              border: "1px solid #b9d0e8",
              borderRadius: "2px",
              padding: "2px 10px",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "8px",
            }}>
              {feedback.recommendation}
            </span>
          )}
          {feedback.feedback && <p style={{ fontSize: "13px", color: "#1b1b1b", marginBottom: "8px" }}>{feedback.feedback}</p>}
          {feedback.strengths?.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#1b1b1b", marginBottom: "4px" }}>Strengths</p>
              {feedback.strengths.map((s: string, i: number) => (
                <p key={i} style={{ fontSize: "12px", color: "#1b1b1b", margin: "2px 0" }}><span style={{ color: "#168216" }}>+</span> {s}</p>
              ))}
            </div>
          )}
          {feedback.weaknesses?.length > 0 && (
            <div>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#1b1b1b", marginBottom: "4px" }}>Areas to Improve</p>
              {feedback.weaknesses.map((w: string, i: number) => (
                <p key={i} style={{ fontSize: "12px", color: "#1b1b1b", margin: "2px 0" }}><span style={{ color: "#b22234" }}>−</span> {w}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
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

  // Section refs for sidebar nav
  const generalRef = useRef<HTMLDivElement>(null);
  const classificationRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);

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
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!contract) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "64px 0" }}>
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const requirements: string[] = JSON.parse(contract.requirements || "[]");
  const isSubmitted = false;

  const dueDate = new Date(contract.dueDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div style={{ display: "flex", gap: "0", alignItems: "flex-start", paddingTop: "0" }}>
      {/* LEFT SIDEBAR — sticky nav */}
      <aside style={{
        width: "240px",
        minWidth: "240px",
        position: "sticky",
        top: "120px",
        background: "#ffffff",
        border: "1px solid #dfe1e2",
        marginTop: "20px",
        marginBottom: "20px",
        alignSelf: "flex-start",
      }}>
        {/* Agency seal placeholder */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #dfe1e2", textAlign: "center" }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#dfe1e2",
            border: "2px solid #c9c9c9",
            margin: "0 auto 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: "24px" }}>🏛️</span>
          </div>
          <p style={{ fontSize: "11px", color: "#565c65", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "700", margin: 0 }}>
            Contract Opportunity
          </p>
        </div>

        {/* Section navigation */}
        <div>
          <div style={{ padding: "8px 12px", fontSize: "11px", fontWeight: "700", color: "#565c65", textTransform: "uppercase", letterSpacing: "0.5px", background: "#f0f0f0", borderBottom: "1px solid #dfe1e2" }}>
            Sections
          </div>
          <SidebarNavLink label="General Information" sectionRef={generalRef} />
          <SidebarNavLink label="Classification" sectionRef={classificationRef} />
          <SidebarNavLink label="Description" sectionRef={descriptionRef} />
          <SidebarNavLink label="Contact Information" sectionRef={contactRef} />
          <SidebarNavLink label="Submit Proposal" sectionRef={proposalRef} />
        </div>

        {/* Back link */}
        <div style={{ padding: "12px" }}>
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#005ea2",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            ← Back to Search
          </button>
        </div>
      </aside>

      {/* RIGHT — Contract detail content */}
      <div style={{ flex: 1, minWidth: 0, padding: "20px 24px 40px" }}>
        {/* Notice type + title */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#565c65", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {contract.type || "Solicitation"} — Contract Opportunity
          </p>
          <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#1b1b1b", margin: "0 0 12px", lineHeight: "1.2" }}>
            {contract.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Active badge */}
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "#e7f2e7",
              color: "#168216",
              border: "1px solid #9ad29a",
              borderRadius: "2px",
              padding: "3px 10px",
              fontSize: "13px",
              fontWeight: "700",
            }}>
              ● ACTIVE
            </span>
            {/* Contract type badge */}
            <span style={{
              display: "inline-block",
              background: "#e8f1f9",
              color: "#1a4480",
              border: "1px solid #b9d0e8",
              borderRadius: "2px",
              padding: "3px 10px",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.3px",
            }}>
              Contract Opportunity
            </span>
          </div>
        </div>

        {/* General Information */}
        <div ref={generalRef} style={{ background: "#ffffff", border: "1px solid #dfe1e2", marginBottom: "16px" }}>
          <div style={{ background: "#1b2a6b", color: "#ffffff", padding: "10px 16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", margin: 0 }}>General Information</h2>
          </div>
          <div style={{ padding: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <tbody>
                <InfoRow label="Notice ID" value={contract.solicNumber} />
                <InfoRow label="Department / Ind. Agency" value={contract.agency} />
                {contract.subAgency && <InfoRow label="Sub-Tier" value={contract.subAgency} />}
                <InfoRow label="Contract Opportunity Type" value={contract.type || "Solicitation"} />
                <InfoRow label="Date Offers Due" value={dueDate} />
                {(contract.valueMin > 0 || contract.valueMax > 0) && (
                  <InfoRow label="Contract Value" value={formatValue(contract.valueMin, contract.valueMax)} />
                )}
                <InfoRow label="Place of Performance" value={contract.pob} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Classification */}
        <div ref={classificationRef} style={{ background: "#ffffff", border: "1px solid #dfe1e2", marginBottom: "16px" }}>
          <div style={{ background: "#1b2a6b", color: "#ffffff", padding: "10px 16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", margin: 0 }}>Classification</h2>
          </div>
          <div style={{ padding: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <tbody>
                <InfoRow label="NAICS Code" value={contract.naicsCode} />
                <InfoRow label="Set Aside" value={contract.setAside || "Unrestricted"} />
                <InfoRow label="Contract Type" value={contract.type} />
                <InfoRow label="Security Clearance" value={contract.securityClear} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Description */}
        <div ref={descriptionRef} style={{ background: "#ffffff", border: "1px solid #dfe1e2", marginBottom: "16px" }}>
          <div style={{ background: "#1b2a6b", color: "#ffffff", padding: "10px 16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", margin: 0 }}>Description</h2>
          </div>
          <div style={{ padding: "20px 16px" }}>
            <p style={{ fontSize: "14px", color: "#1b1b1b", lineHeight: "1.6", margin: "0 0 16px" }}>
              {contract.description}
            </p>
            {requirements.length > 0 && (
              <div>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#1b1b1b", marginBottom: "10px" }}>Key Requirements:</p>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {requirements.map((req, i) => (
                    <li key={i} style={{ fontSize: "14px", color: "#1b1b1b", lineHeight: "1.6", marginBottom: "6px" }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div ref={contactRef} style={{ background: "#ffffff", border: "1px solid #dfe1e2", marginBottom: "16px" }}>
          <div style={{ background: "#1b2a6b", color: "#ffffff", padding: "10px 16px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", margin: 0 }}>Contact Information</h2>
          </div>
          <div style={{ padding: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <tbody>
                <InfoRow label="Primary POC" value="Contracting Officer" />
                <InfoRow label="Organization" value={contract.agency} />
                <InfoRow label="Email" value="[Available upon registration]" />
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== KDT Simulation — Submit Proposal ===== */}
        <div ref={proposalRef} style={{ marginTop: "32px" }}>
          {/* Banner */}
          <div style={{
            background: "#005ea2",
            color: "#ffffff",
            padding: "16px 20px",
            marginBottom: "0",
            borderRadius: "2px 2px 0 0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📋</span>
              <div>
                <p style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 2px" }}>This is a ZAM.GOV simulation.</p>
                <p style={{ fontSize: "13px", margin: 0, opacity: 0.9 }}>Submit your proposal below. This is a training exercise — Knight Division Tactical.</p>
              </div>
            </div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #dfe1e2", borderTop: "none" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #dfe1e2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1b1b1b", margin: "0 0 4px" }}>Proposal Submission</h3>
                {proposal?.status === "submitted" ? (
                  <p style={{ fontSize: "13px", color: "#168216", fontWeight: "600", margin: 0 }}>
                    ✓ Submitted {proposal?.autoSubmitted ? "(auto-submitted at session end)" : ""}
                  </p>
                ) : (
                  <p style={{ fontSize: "13px", color: "#565c65", margin: 0 }}>Draft — auto-submitted when session expires</p>
                )}
              </div>
              {!isSubmitted && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {saveStatus === "saved" && <span style={{ fontSize: "12px", color: "#168216" }}>✓ Saved</span>}
                  {saveStatus === "error" && <span style={{ fontSize: "12px", color: "#b22234" }}>Save failed</span>}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      background: "#ffffff",
                      color: "#005ea2",
                      border: "2px solid #005ea2",
                      borderRadius: "2px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: saving ? "not-allowed" : "pointer",
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? "Saving…" : "Save Draft"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      background: "#005ea2",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "2px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Submitting…" : "Submit Proposal"}
                  </button>
                </div>
              )}
            </div>

            {/* Proposal tabs */}
            <div style={{ borderBottom: "1px solid #dfe1e2", padding: "0 20px", background: "#f0f0f0", display: "flex", overflowX: "auto" }}>
              {FIELDS.map((f, i) => (
                <button
                  key={f.key}
                  onClick={() => setActiveTab(i)}
                  style={{
                    padding: "12px 14px",
                    fontSize: "13px",
                    fontWeight: activeTab === i ? "700" : "400",
                    color: activeTab === i ? "#1b2a6b" : "#565c65",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === i ? "3px solid #1b2a6b" : "3px solid transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={() => setActiveTab(FIELDS.length)}
                style={{
                  padding: "12px 14px",
                  fontSize: "13px",
                  fontWeight: activeTab === FIELDS.length ? "700" : "400",
                  color: activeTab === FIELDS.length ? "#1b2a6b" : "#565c65",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === FIELDS.length ? "3px solid #1b2a6b" : "3px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Pricing
              </button>
            </div>

            {/* Proposal form content */}
            <div style={{ padding: "20px" }}>
              {activeTab < FIELDS.length ? (
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#1b1b1b", marginBottom: "8px" }}>
                    {FIELDS[activeTab].label}
                  </label>
                  <textarea
                    value={formData[FIELDS[activeTab].key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [FIELDS[activeTab].key]: e.target.value })}
                    placeholder={FIELDS[activeTab].placeholder}
                    rows={16}
                    disabled={isSubmitted}
                    style={{
                      width: "100%",
                      border: "1px solid #adadad",
                      borderRadius: "2px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      resize: "vertical",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      background: isSubmitted ? "#f0f0f0" : "#ffffff",
                    }}
                  />
                  <p style={{ fontSize: "12px", color: "#71767a", textAlign: "right", margin: "4px 0 0" }}>
                    {formData[FIELDS[activeTab].key as keyof typeof formData].length} characters
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#1b1b1b", marginBottom: "8px" }}>
                      Proposed Contract Value ($)
                    </label>
                    <input
                      type="number"
                      value={formData.proposedValue}
                      onChange={(e) => setFormData({ ...formData, proposedValue: e.target.value })}
                      placeholder="e.g. 42500000"
                      disabled={isSubmitted}
                      style={{
                        width: "100%",
                        border: "1px solid #adadad",
                        borderRadius: "2px",
                        padding: "10px 12px",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        background: isSubmitted ? "#f0f0f0" : "#ffffff",
                      }}
                    />
                    {formData.proposedValue && (
                      <p style={{ fontSize: "13px", color: "#565c65", margin: "6px 0 0" }}>
                        = {Number(formData.proposedValue).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#1b1b1b", marginBottom: "8px" }}>
                      Pricing Narrative
                    </label>
                    <textarea
                      value={formData.pricingNarrative}
                      onChange={(e) => setFormData({ ...formData, pricingNarrative: e.target.value })}
                      placeholder="Explain your pricing methodology, cost basis, labor categories, and basis of estimate..."
                      rows={12}
                      disabled={isSubmitted}
                      style={{
                        width: "100%",
                        border: "1px solid #adadad",
                        borderRadius: "2px",
                        padding: "10px 12px",
                        fontSize: "14px",
                        resize: "vertical",
                        outline: "none",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        background: isSubmitted ? "#f0f0f0" : "#ffffff",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tab navigation buttons */}
            {!isSubmitted && (
              <div style={{ padding: "0 20px 20px", display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                  style={{
                    background: "transparent",
                    color: activeTab === 0 ? "#c9c9c9" : "#005ea2",
                    border: "none",
                    cursor: activeTab === 0 ? "default" : "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "4px 0",
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveTab(Math.min(FIELDS.length, activeTab + 1))}
                  disabled={activeTab === FIELDS.length}
                  style={{
                    background: "transparent",
                    color: activeTab === FIELDS.length ? "#c9c9c9" : "#005ea2",
                    border: "none",
                    cursor: activeTab === FIELDS.length ? "default" : "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "4px 0",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* AI Score card (post-submission) */}
          {proposal?.status === "submitted" && proposal.aiScore !== null && (
            <AIScoreCard proposal={proposal} />
          )}
          {proposal?.status === "submitted" && proposal.aiScore === null && (
            <div style={{ background: "#ffffff", border: "1px solid #dfe1e2", padding: "24px", textAlign: "center", marginTop: "16px" }}>
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full" style={{ margin: "0 auto 12px" }} />
              <p style={{ fontSize: "14px", color: "#565c65" }}>AI scoring in progress…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{
        padding: "8px 12px 8px 0",
        fontSize: "13px",
        fontWeight: "700",
        color: "#565c65",
        verticalAlign: "top",
        whiteSpace: "nowrap",
        width: "200px",
        borderBottom: "1px solid #f0f0f0",
      }}>
        {label}:
      </td>
      <td style={{
        padding: "8px 0",
        fontSize: "14px",
        color: "#1b1b1b",
        verticalAlign: "top",
        borderBottom: "1px solid #f0f0f0",
      }}>
        {value}
      </td>
    </tr>
  );
}
