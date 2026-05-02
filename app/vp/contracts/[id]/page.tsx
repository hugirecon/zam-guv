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

function fmt(n: number) {
  return n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1e3).toFixed(0)}K`;
}

function generateExampleProposal(contract: Contract): Record<string, string> {
  const agency = contract.agency;
  const subAgency = contract.subAgency || agency;
  const title = contract.title;
  const setAside = contract.setAside || "full and open competition";
  const secClear = contract.securityClear;
  const naics = contract.naicsCode;
  const midVal = contract.valueMin > 0
    ? Math.round((contract.valueMin + contract.valueMax) / 2)
    : Math.round(contract.valueMax * 0.82);
  const midFmt = fmt(midVal);

  const executiveSummary = `Apex Federal Solutions, LLC (AFS) is a Service-Disabled Veteran-Owned Small Business (SDVOSB) with twelve years of continuous performance on mission-critical contracts across the Federal Government. Headquartered in Tysons Corner, VA with operational offices in San Antonio, TX and Huntsville, AL, AFS brings a proven delivery model purpose-built for the complexity and rigor demanded by ${agency}. We are uniquely qualified to perform the ${title} requirement because our core competencies — systems engineering, program management, and technical services delivery — map directly to the stated scope, and our existing cleared workforce eliminates the ramp-up risk that plagues less experienced offerors. AFS holds active Top Secret facility clearance, and all proposed key personnel carry ${secClear} clearances with current polygraphs where required.

Our understanding of the ${title} requirement is grounded in careful analysis of the solicitation, the ${agency} mission, and the operational environment in which this work will be performed. ${subAgency} requires a contractor that can operate with minimal direction, deliver consistent results against aggressive timelines, and scale capacity in response to evolving Government priorities. The scope demands a blend of technical depth and program management discipline that few small businesses can credibly offer — AFS is among that select group. We have reviewed the NAICS ${naics} classification and confirm this work aligns precisely with our registered capabilities and past performance portfolio. Our team has executed analogous scopes under ${setAside} set-aside vehicles and full-and-open IDIQs alike, giving the Government confidence in our competitive pricing and delivery track record.

AFS's value proposition for this award rests on three pillars: a resident workforce of cleared, mission-experienced professionals who will not require months to onboard; a proven Program Management framework (CMMI-DEV Level 3 appraised) that drives predictable outcomes and early issue identification; and a price-to-win strategy that delivers best value without sacrificing technical quality. We propose a total contract value of ${midFmt}, which reflects a fully-burdened, market-calibrated cost structure validated against recent comparable awards. Our approach ensures that ${agency} receives maximum mission impact per dollar obligated, and our commitment to quality is backed by an ISO 9001:2015-certified Quality Management System that governs every deliverable we produce.`;

  const technicalApproach = `SECTION 1 — UNDERSTANDING OF REQUIREMENTS

AFS has performed a thorough analysis of the Performance Work Statement (PWS) and all incorporated attachments. The core requirement for ${title} demands a contractor capable of delivering sustained, high-quality technical and programmatic support to ${subAgency} across the full contract period of performance. We understand that ${agency} prioritizes on-time delivery, seamless continuity of operations, and rigorous adherence to applicable standards and regulatory frameworks. The requirement under NAICS ${naics} places this work squarely within our demonstrated competency domain. Critically, the ${secClear} security clearance requirement underscores the sensitive nature of the mission environment — AFS treats security not as a compliance checkbox but as a fundamental operating principle embedded in our culture and processes.

SECTION 2 — TECHNICAL SOLUTION AND METHODOLOGY

AFS will execute this requirement using our proprietary Integrated Delivery Framework (IDF), a structured methodology that combines Agile sprint cycles with traditional milestone-driven program management. During Phase 1 (Transition and Mobilization, Days 1–30), AFS will conduct a comprehensive baseline assessment, establish secure communications infrastructure, onboard all key personnel, and hold a formal kickoff meeting with the Contracting Officer's Representative (COR). We will deliver a Transition Plan within five business days of award that documents assumptions, risks, and a detailed 90-day roadmap. Phase 2 (Steady-State Operations) employs two-week sprint cycles with structured backlog prioritization, daily stand-ups, and bi-weekly stakeholder reviews. All work products will be version-controlled in a Government-approved collaboration environment and subject to peer review before delivery. Phase 3 (Continuous Improvement) runs concurrently with steady-state operations and captures lessons learned, process metrics, and cost efficiency opportunities on a quarterly basis.

SECTION 3 — QUALITY AND COMPLIANCE

Quality is not an afterthought at AFS — it is architecturally embedded in our delivery model. Our ISO 9001:2015-certified QMS mandates independent quality review of all Contract Deliverable Requirements List (CDRL) items prior to submission. We maintain a non-conformance tracking system that captures every deficiency, root cause, and corrective action, with closure verified by our Quality Assurance Manager before the item is closed. Compliance with applicable Federal standards — including NIST SP 800-171, DFARS cybersecurity clauses, and agency-specific directives — is mapped to our internal control matrix and audited quarterly. We will provide the COR with monthly quality metrics reports and a rolling risk register updated no less than bi-weekly.

SECTION 4 — INNOVATION AND DIFFERENTIATORS

AFS brings three specific innovations that distinguish our technical approach from the competition. First, we have developed an AI-assisted anomaly detection tool (Patent Pending) that reduces quality escape rates on complex technical deliverables by 34% compared to manual review — validated across three active Federal contracts. Second, our cleared talent pipeline includes 47 bench-strength candidates within the ${secClear} clearance tier who can be onboarded within 30 days of task order award, eliminating the typical 6–12 month clearance wait that creates performance risk. Third, our mature subcontractor teaming arrangement with two 8(a)-certified firms provides surge capacity and specialized niche expertise without adding program management overhead.`;

  const managementApproach = `ORGANIZATIONAL STRUCTURE AND KEY PERSONNEL

AFS proposes a lean, experienced management team calibrated to the scope and complexity of the ${title} requirement. Mr. James Reinholt, PMP, will serve as Program Manager (PM). Mr. Reinholt holds an active ${secClear} clearance, a Project Management Professional certification, and 18 years of Federal contracting experience including six years managing analogous efforts for ${agency}. He has direct, recent experience leading teams of 15–40 personnel on cost-plus and fixed-price contracts in similar mission environments, and he maintains existing relationships with key ${subAgency} stakeholders that will accelerate the transition period. Ms. Priya Nambiar, CISSP, will serve as Deputy Program Manager and Technical Lead, responsible for day-to-day task management, deliverable quality, and technical solutioning. Ms. Nambiar brings a ${secClear} clearance and 14 years of specialized experience directly relevant to this scope. Both PM and Deputy PM are committed 100% to this contract and will not be reassigned without written Government consent.

RISK MITIGATION

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|---------------------|
| Key personnel turnover | Medium | High | Bench strength pipeline of 47 cleared candidates; 30-day replacement guarantee clause in all offer letters; retention bonuses tied to PoP milestones |
| Security clearance delays for new hires | Medium | Medium | All proposed personnel hold current clearances; AFS maintains an active facility clearance with ${secClear} capability; backfill candidates pre-screened |
| Scope growth without commensurate funding | Low | High | Rigorous PWS change control process; weekly COR touchpoints to surface emerging requirements; formal ECP process initiated within 48 hours of identified out-of-scope work |
| Subcontractor performance risk | Low | Medium | Monthly subcontractor performance reviews; contractual flow-down of all quality and security requirements; 90-day cure notice provisions in all teaming agreements |

QUALITY ASSURANCE PROCESS

AFS's QA process for this contract follows a four-gate review model: (1) Author Self-Review against acceptance criteria within 48 hours of draft completion; (2) Peer Technical Review by a subject matter expert not involved in drafting; (3) QA Manager Compliance Review against PWS requirements and applicable standards; (4) PM Final Approval before Government submission. All reviews are documented in our electronic QMS with timestamps and reviewer attestations. Non-conformances are logged, root-caused within 24 hours, and corrected before resubmission. Our target quality metric is a First-Article Acceptance Rate of ≥95% across all CDRL items.

REPORTING AND COMMUNICATION

AFS will maintain proactive, transparent communication with ${agency} stakeholders throughout the period of performance. Weekly status reports will be delivered every Monday by 9:00 AM local time, covering accomplishments, upcoming milestones, risks/issues, and action items. Monthly Program Reviews will be conducted in person or via secure video teleconference, presenting detailed metrics, cost performance, and a forward-looking 60-day look-ahead. The PM maintains an open-door policy with the COR and will respond to all Government inquiries within two business hours. An after-action review will be conducted at the conclusion of each contract year to capture lessons learned and incorporate improvements into the next performance period.`;

  const pricingNarrative = `PRICING METHODOLOGY

AFS proposes a Firm-Fixed-Price (FFP) contract structure for all performance-based task areas, which aligns with ${agency}'s preference for cost certainty and reduces administrative burden on the Government. FFP pricing is appropriate here because the scope is well-defined, measurable outcomes are specified in the PWS, and AFS has sufficient historical cost data from analogous contracts to price accurately without excessive contingency. Where the PWS identifies variable or undefined surge requirements, AFS proposes a hybrid structure with a Time-and-Materials (T&M) ceiling for surge labor, ensuring the Government pays only for hours actually delivered against a pre-negotiated labor category rate schedule.

LABOR CATEGORIES AND NOTIONAL RATES

Our cost model is built around the following labor categories, priced at fully-burdened rates reflecting current market data from the Bureau of Labor Statistics Occupational Outlook, GSA professional services benchmarks, and AFS's internal compensation database:

| Labor Category | Level | Loaded Rate/Hour | Est. Hours/Year |
|----------------|-------|-----------------|-----------------|
| Program Manager | Senior | $185.00 | 1,920 |
| Deputy PM / Tech Lead | Senior | $162.00 | 1,920 |
| Subject Matter Expert | Mid-Senior | $138.00 | 3,840 |
| Systems Analyst | Mid | $115.00 | 5,760 |
| Quality Assurance Specialist | Mid | $108.00 | 1,920 |
| Administrative Support | Junior | $72.00 | 960 |

All rates include salary, fringe benefits (28.4%), overhead (22.1%), G&A (11.3%), and a fee of 8.0%, consistent with competitive market margins for ${setAside} procurements under NAICS ${naics}.

BASIS OF ESTIMATE

Our proposed total contract value of ${midFmt} was derived through a bottom-up build: we staffed each PWS task area against the labor category mix described above, applied our validated productivity factors from three comparable active contracts, and calibrated the result against publicly available award data for analogous scopes at ${agency}. We applied a 5% cost reserve within our ceiling to address minor scope variations without requiring contract modifications. We did not pad our direct labor hours to create hidden contingency; the reserve is explicitly identified and subject to Government audit.

PRICE-TO-WIN STRATEGY

AFS's price represents the intersection of technical realism and competitive positioning. We benchmarked our proposal against recent SAM.gov award data and market intelligence from our teaming partners to confirm our price falls within the competitive range. We deliberately avoided the low-price trap — an artificially deflated bid that wins on paper but creates performance risk and cost overruns that ultimately harm the Government. Our ${midFmt} total reflects the true cost of delivering this scope at the quality level ${agency} expects, with sufficient margin to retain top talent, invest in quality infrastructure, and sustain the program through potential scope adjustments. We are confident this price will be evaluated as best value by a Source Selection Authority applying a trade-off methodology.`;

  const pastPerformance = `PAST PERFORMANCE EXAMPLE 1
Contract Number: ${contract.agency.includes("Air Force") || contract.agency.includes("DoD") || contract.agency.includes("Defense") ? "FA8650" : "W52P1J"}-22-C-1041
Customer: ${agency} / ${subAgency}
Period of Performance: March 2022 – March 2025 (3 years, exercised all options)
Contract Value: ${fmt(Math.round(midVal * 0.72))} (FFP, IDIQ)
Scope: AFS provided program management support, technical advisory services, and systems integration support in direct support of mission operations. The scope included production of over 140 formal deliverables, management of a 22-person cross-functional team, and coordination with five Government stakeholders across two geographic locations. Security clearances required at the ${secClear} level throughout performance.
Outcome / Result: Delivered 100% of CDRLs on time or ahead of schedule with a First-Article Acceptance Rate of 97.3%. Received "Exceptional" CPARS ratings in all three evaluated performance areas (Quality, Schedule, Management). Customer exercised all available options without competitive re-solicitation, a strong indicator of Government satisfaction. Zero security incidents over 36 months of cleared facility operations.
POC: Col. (Ret.) Sandra Whitmore, (703) 555-0147, s.whitmore@gov.example — available for reference.

PAST PERFORMANCE EXAMPLE 2
Contract Number: 47QTCA-21-D-0089-0012
Customer: General Services Administration, Federal Acquisition Service
Period of Performance: September 2021 – September 2024 (Base + 2 options)
Contract Value: ${fmt(Math.round(midVal * 0.55))} (T&M, BPA call)
Scope: Professional services and technical support for enterprise IT modernization initiative, including process reengineering, stakeholder engagement, and documentation development aligned with NAICS ${naics}. AFS managed a team of 18 analysts and engineers, delivered quarterly performance reports, and maintained a risk register tracking 32 active program risks throughout performance.
Outcome / Result: Achieved all program milestones within budget. Independent Government Cost Estimate variance was +2.1%, demonstrating accurate cost forecasting. Customer awarded AFS two sole-source follow-on task orders based on demonstrated performance and institutional knowledge. CPARS rating: "Very Good" across all categories.
POC: Mr. Derek Okafor, Contracting Officer, (202) 555-0293 — available for reference.

PAST PERFORMANCE EXAMPLE 3
Contract Number: N00178-20-D-7742-FP03
Customer: Department of the Navy, Naval Sea Systems Command (NAVSEA)
Period of Performance: January 2020 – January 2023
Contract Value: ${fmt(Math.round(midVal * 0.43))} (FFP, Task Order)
Scope: AFS provided full-spectrum technical support services under a seaport-e vehicle, delivering systems engineering, configuration management, and test and evaluation support for a major acquisition program. The work required ${secClear} clearances for all personnel and strict adherence to DoD 5000.02 acquisition lifecycle requirements. AFS managed 14 direct personnel and two subcontractors across the period of performance.
Outcome / Result: Zero cost overruns; delivered all 67 technical reports and engineering change proposals on time. Supported successful Milestone C decision review with no major deficiency findings attributable to contractor deliverables. Received "Exceptional" rating in Technical Quality and "Very Good" in Cost Control. AFS was invited to respond to a sole-source J&A for a follow-on effort, which was ultimately competed at agency direction.
POC: LCDR Tiffany Reyes (Ret.), Program Manager, (619) 555-0382 — available for reference.`;

  return {
    executiveSummary,
    technicalApproach,
    managementApproach,
    pricingNarrative,
    pastPerformance,
    proposedValue: String(midVal),
  };
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
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [exampleLoaded, setExampleLoaded] = useState(false);

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

    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data?.session?.mode === "training") {
          setIsTrainingMode(true);
        }
      })
      .catch(() => {/* ignore */});
  }, [id]);

  const handleLoadExample = () => {
    if (!contract) return;
    const example = generateExampleProposal(contract);
    setFormData({
      executiveSummary: example.executiveSummary,
      technicalApproach: example.technicalApproach,
      managementApproach: example.managementApproach,
      pricingNarrative: example.pricingNarrative,
      pastPerformance: example.pastPerformance,
      proposedValue: example.proposedValue,
    });
    setActiveTab(0);
    setExampleLoaded(true);
    setTimeout(() => setExampleLoaded(false), 5000);
  };

  const handleClearExample = () => {
    setFormData({
      executiveSummary: "",
      technicalApproach: "",
      managementApproach: "",
      pricingNarrative: "",
      pastPerformance: "",
      proposedValue: "",
    });
    setExampleLoaded(false);
  };

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
    // Resubmission is allowed — no confirm dialog needed
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

          {/* Training mode banner */}
          {isTrainingMode && (
            <div style={{
              background: "#faf3d1",
              border: "1px solid #e6c84a",
              borderBottom: "none",
              borderRadius: "2px 2px 0 0",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#e6a817",
                color: "#ffffff",
                borderRadius: "2px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
              }}>
                💡 Training Mode
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, flexWrap: "wrap" }}>
                <button
                  onClick={handleLoadExample}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#e6a817",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "2px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  📋 Load Example Proposal
                </button>
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <p style={{ fontSize: "13px", color: "#7a4800", margin: 0, fontWeight: "600" }}>
                    See what a gold-standard proposal looks like for this contract
                  </p>
                  {exampleLoaded && (
                    <p style={{ fontSize: "12px", color: "#168216", margin: "3px 0 0", fontWeight: "700" }}>
                      ✓ Example loaded — review each section to see what great looks like
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClearExample}
                  style={{
                    background: "transparent",
                    color: "#7a4800",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    textDecoration: "underline",
                    padding: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Banner */}
          <div style={{
            background: "#005ea2",
            color: "#ffffff",
            padding: "16px 20px",
            marginBottom: "0",
            borderRadius: isTrainingMode ? "0" : "2px 2px 0 0",
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
