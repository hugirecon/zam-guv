"use client";
import { useState } from "react";

// ─── Shared term data ─────────────────────────────────────────────────────────

const TERMS = {
  // Cybersecurity Maturity
  nist171:   ["NIST SP 800-171", "110-practice security standard for protecting Controlled Unclassified Information (CUI) in non-federal systems. Published by NIST, mandated by DFARS. Organized across 14 control families: Access Control, Audit & Accountability, Configuration Management, Identification & Authentication, Incident Response, Maintenance, Media Protection, Personnel Security, Physical Protection, Risk Assessment, Security Assessment, System & Communications Protection, System & Information Integrity, Awareness & Training. This is the technical backbone of CMMC Level 2 — every CMMC L2 practice maps directly to 800-171. KDT must implement all 110 and document them in an SSP."],
  nist171r2: ["NIST SP 800-171 Rev 2", "The current active revision (2020). Rev 3 is in final draft as of 2025 but CMMC 2.0 is anchored to Rev 2. When C3PAOs conduct CMMC Level 2 assessments, they assess against Rev 2 controls. Do not implement Rev 3 ahead of official CMMC transition."],
  nist53:    ["NIST SP 800-53", "Broader federal information security catalog — 1,000+ controls across 20 families. Used primarily by federal agencies for their own systems (FedRAMP, FISMA). Contractors reference it on CPFF/R&D contracts and classified program work. More comprehensive than 800-171 and not directly required of typical contractors unless the contract specifies it."],
  nist172:   ["NIST SP 800-172", "Enhanced security requirements for CUI in critical programs or high value assets. Supplements 800-171 for contractors on the most sensitive DoD programs. Maps to CMMC Level 3. Not a near-term KDT requirement unless pursuing highest-sensitivity programs."],
  cmmc1:     ["CMMC Level 1", "Foundational cybersecurity. 17 basic safeguarding practices drawn from FAR 52.204-21. Required for all DoD contractors handling Federal Contract Information (FCI). Annual self-assessment — no third party required. Score must be posted to SPRS. Cost: minimal — mostly documentation of basic cyber hygiene: anti-virus, password policy, access controls, screen lock, backup, and physical protection of devices."],
  cmmc2:     ["CMMC Level 2", "Advanced cybersecurity. Full implementation of all 110 NIST SP 800-171 Rev 2 practices. Required for contractors handling CUI. As of 2025, required on most significant DoD contracts. Triennial third-party assessment by a C3PAO — self-assessment is not accepted for Level 2. Score posted to SPRS. Cost: significant — typically $50K–$300K+ depending on system complexity and gap remediation needed before the assessment."],
  cmmc3:     ["CMMC Level 3", "Expert cybersecurity for contractors on the highest-sensitivity DoD programs. Built on CMMC L2 + 24 additional practices from NIST SP 800-172. Government-led assessment by DIBCAC — no C3PAO involved. Very limited contractor population. Not a near-term KDT requirement."],
  c3pao:     ["C3PAO", "Certified Third Party Assessment Organization. CMMC-AB accredited firms that conduct CMMC Level 2 assessments. KDT must hire a C3PAO for Level 2 — self-assessment is not permitted. C3PAO findings are binding: pass, conditional pass with a POA&M, or fail. A failed assessment blocks contract award. Full list at cyberAB.org."],
  dibcac:    ["DIBCAC", "Defense Industrial Base Cybersecurity Assessment Center. DoD's own assessment team for CMMC Level 3 and spot-check audits of Level 2 self-assessments. Government-led, not C3PAO-conducted. DIBCAC findings directly affect contract eligibility."],
  sprs:      ["SPRS", "Supplier Performance Risk System. DoD's online contractor risk database. KDT must post its NIST SP 800-171 self-assessment score here before any DoD contract award. Scores range from -203 (all controls missing) to +110 (full compliance). Contracting officers check SPRS before award — a missing or critically low score can disqualify KDT outright."],
  ssp:       ["SSP", "System Security Plan. Required document mapping all IT systems, users, network topology, data flows, and how each of the 110 NIST SP 800-171 controls is implemented (or not). Must be current and accurate before any CMMC assessment. The SSP is the primary evidence artifact — vague or incomplete SSPs fail assessments."],
  poam:      ["POA&M", "Plan of Action & Milestones. Documents known security gaps and your remediation timeline. Open POA&M items are acceptable under CMMC L2 if milestones are realistic and the SPRS score stays above the contract threshold. Closing POA&Ms without actually remediating them is a False Claims Act violation."],
  // Regulatory
  far:       ["FAR", "Federal Acquisition Regulation. The master rulebook for all U.S. federal procurement — codified in Title 48 of the CFR. Every federal contract includes FAR clauses by reference. Non-compliance = breach of contract or grounds for debarment. Know: Part 12 (commercial items), Part 15 (negotiated acquisition), Part 31 (cost principles), Part 52 (standard contract clauses)."],
  dfars:     ["DFARS", "Defense Federal Acquisition Regulation Supplement. DoD-specific rules layered on top of FAR. Every DoD contract references both FAR and DFARS. Key additions: cybersecurity reporting (252.204-7012), CMMC requirements (252.204-7021), counterfeit electronic parts (252.246-7007), IP and technical data rights, and specialized acquisition procedures for sensitive programs."],
  dfars7012: ["DFARS 252.204-7012", "Safeguarding Covered Defense Information and Cyber Incident Reporting. The foundational DFARS cybersecurity clause. Requires NIST SP 800-171 compliance and cyber incident reporting to DoD within 72 hours of discovery. If this clause is in your contract, CMMC compliance follows automatically. Scan every DoD solicitation for this clause — its presence is the trigger."],
  dfars7021: ["DFARS 252.204-7021", "Cybersecurity Maturity Model Certification Requirements. The CMMC mandate clause. Specifies which CMMC level (1, 2, or 3) is required for the specific contract. If Level 2 is specified, C3PAO assessment is required before award. If this clause appears in a solicitation, stop and determine your CMMC readiness before investing in the proposal."],
  ndaa:      ["NDAA", "National Defense Authorization Act. Annual law authorizing DoD spending and setting contracting policy. Passed each December. Key provisions shift the entire DoD market for the year: CMMC rollout timelines, banned vendors (§889: Huawei, ZTE, Hikvision), small business set-aside requirements, and new mandatory contract clauses. Read the annual NDAA summary — missing a key provision costs you contracts."],
  sca:       ["SCA", "Service Contract Act (41 U.S.C. §6701). Mandatory for all service contracts over $2,500 where service employees (guards, technicians, custodians) perform the work. Requires paying prevailing wages and fringe benefits per DOL Wage Determinations specific to each geographic area and occupational classification. Every security guard contract includes a Wage Determination — your bid pricing must absorb it in full. Underbidding SCA is a compliance violation and a financial disaster."],
  davisBacon:["Davis-Bacon Act", "Prevailing wage law for federal construction contracts over $2,000. Applies to laborers and mechanics on construction, alteration, or repair work under a federal contract. If KDT performs facility construction or renovation, Davis-Bacon wage rates apply. Like SCA, pricing must absorb the wage determination."],
  far31:     ["FAR Part 31", "Contract Cost Principles. Defines allowable vs. unallowable costs on cost-reimbursable contracts. Allowable costs must be reasonable, allocable, consistent with GAAP, and not specifically prohibited. Key unallowable costs: entertainment (31.205-14), lobbying (31.205-22), fines and penalties (31.205-15), interest charges (31.205-20), executive compensation above the ACRN ceiling (31.205-6(p))."],
  cas:       ["CAS", "Cost Accounting Standards (48 CFR 9900). Applies to single contracts over $2M or cumulative cost-type awards over $50M. Requires consistent, documented cost accounting practices across contracts and periods. Four key standards: CAS 401, 402, 405, 406. DCAA audits CAS compliance."],
  far5224:   ["FAR 52.212-4", "Contract Terms and Conditions — Commercial Items. Governs core terms when a contract is awarded under FAR Part 12: inspection, acceptance, payment, disputes, changes, termination. One of the most cited FAR clauses — often incorporated by reference."],
  // CUI
  cui:       ["CUI", "Controlled Unclassified Information. Government-designated sensitive information that isn't classified but requires safeguarding. Categories include: Law Enforcement Sensitive (LES), Export Controlled, Privacy/PII, Proprietary Business Information, Critical Infrastructure. The National Archives (NARA) maintains the CUI Registry. If your contract involves CUI → CMMC Level 2 applies."],
  cfr2002:   ["32 CFR Part 2002", "The federal regulation establishing the CUI Program. Published by NARA. Defines CUI categories, handling requirements, marking standards, and decontrol procedures. The legal basis for all CUI requirements."],
  fci:       ["FCI", "Federal Contract Information. Information provided by or generated for the government under a contract that is not intended for public release. Less sensitive than CUI — triggers CMMC Level 1 (not Level 2). If you have any federal contract with deliverables or system access, you almost certainly handle FCI."],
  fedramp:   ["FedRAMP", "Federal Risk and Authorization Management Program. Cloud security authorization standard. If KDT uses cloud services to store or process CUI, those services must be FedRAMP Authorized at the appropriate impact level (Low, Moderate, or High). Using a non-FedRAMP commercial cloud instance for CUI is a DFARS 252.204-7012 violation."],
  dibnet:    ["DIBNet", "Defense Industrial Base Network. DoD's portal for cybersecurity threat intelligence sharing and incident reporting. Required reporting destination for cyber incidents under DFARS 252.204-7012 within 72 hours."],
  cuiMark:   ["CUI Marking", "CUI documents must be marked per NARA standards: 'CUI' banner on cover page, page footer on each page, and category indicator for specific categories. Improperly marked CUI is still CUI — failure to mark is its own violation."],
  // Clearances
  fcl:       ["FCL", "Facility Clearance. Organization-level security clearance granted to a company by DCSA. Required before any KDT employee can access classified information under a government contract. Sponsorship comes from the CO on the first classified contract requiring it. FCL level (Secret or TS) must match the contract requirement. Without an FCL, the company cannot hold a classified contract."],
  dcsa:      ["DCSA", "Defense Counterintelligence and Security Agency. DoD agency administering personnel and facility security clearances for defense contractors. Processes FCL applications, conducts facility inspections, and manages the NISP."],
  nisp:      ["NISP", "National Industrial Security Program. The framework governing how cleared contractors protect classified information. Governed by NISPOM (DoD Manual 5220.22-M). FCL holders must comply — including designating a qualified FSO."],
  fso:       ["FSO", "Facility Security Officer. Designated individual responsible for administering the security program at a cleared contractor facility. Required for all FCL holders. Manages clearance requests, visit authorizations, reports incidents to DCSA, and maintains NISPOM compliance."],
  confidential:["Confidential", "Lowest classified level. Unauthorized disclosure reasonably expected to cause damage to national security. Investigation: Tier 3 (T3), 5-year scope."],
  secret:    ["Secret", "Mid-level classification. Unauthorized disclosure reasonably expected to cause serious damage to national security. Standard minimum for armed security at DoD installations. Investigation: Tier 3 (T3), 5-year scope."],
  ts:        ["Top Secret (TS)", "Unauthorized disclosure reasonably expected to cause exceptionally grave damage to national security. Required for C4ISR program support, SCIF access, intelligence-adjacent contracts. Investigation: Tier 5 (T5), 10-year scope."],
  sci:       ["SCI", "Sensitive Compartmented Information. TS-level access to intelligence sources, methods, or programs. Requires separate DNI adjudication beyond TS. Requires physical access to a SCIF."],
  sap:       ["SAP / SAR", "Special Access Program / Special Access Required. Access beyond TS/SCI — program-specific with extremely limited need-to-know lists. Nominations come from the program office; access cannot be requested."],
  sf86:      ["SF-86", "Standard Form 86. The security clearance application (completed electronically via eQIP). Covers 10 years of history: employment, education, residences, foreign contacts, foreign travel, financial history, legal history, mental health treatment, drug use. Completeness and accuracy are legally required."],
  diss:      ["DISS", "Defense Information System for Security. DoD's enterprise system for managing personnel security clearances — replaced JPAS in 2021. FSOs use DISS to submit clearance requests, visit authorizations, and incident reports."],
  // Export
  itar:      ["ITAR", "International Traffic in Arms Regulations (22 CFR 120–130). Controls export of defense articles and services on the US Munitions List (USML). Administered by State Dept / DDTC. Criminal penalties: up to 20 years imprisonment + $1M per violation. If KDT's contracts involve weapons systems, military training, protective services for defense programs, or certain security technologies — ITAR likely applies."],
  ear:       ["EAR", "Export Administration Regulations (15 CFR 730–774). Controls dual-use items on the Commerce Control List (CCL). Administered by Commerce Dept / BIS. Less restrictive than ITAR but equally serious in violations. Covers technology with both commercial and military applications."],
  ddtc:      ["DDTC", "Directorate of Defense Trade Controls (State Dept). Administers ITAR. KDT must register with DDTC ($2,750/yr) if it manufactures, exports, or brokers ITAR-controlled defense articles or services. Registration alone does not authorize exports — a license or exemption is required for each transaction."],
  usml:      ["USML", "US Munitions List. The list of articles, services, and technical data controlled under ITAR — organized into 21 categories (I–XXI). If KDT's services or technologies appear on any USML category, ITAR registration and export licensing are mandatory before sharing with any foreign person."],
  ccl:       ["CCL", "Commerce Control List. The EAR equivalent of the USML — dual-use items controlled by Commerce Dept. Each entry has an Export Control Classification Number (ECCN). Items not on the USML but with military applications often land on the CCL."],
  taa:       ["TAA", "Technical Assistance Agreement. ITAR license required for providing ITAR-controlled technical data or defense services to a foreign person (even within the US). KDT needs a TAA for training foreign nationals, providing security consulting to foreign government clients, or sharing operational TTPs with allied forces."],
  ofac:      ["OFAC", "Office of Foreign Assets Control (Treasury Dept). Administers US sanctions programs including the SDN list and country-based embargoes. Screen all parties against the SDN list before any international engagement. Violations are strict liability — intent is irrelevant. Penalties: up to $1M per civil violation."],
  deemedExport:["Deemed Export", "Sharing ITAR/EAR-controlled technology with a foreign national on US soil is legally treated as an export to their home country. This affects KDT if employing or subcontracting with foreign nationals who access controlled technology, even domestically. Requires a license or applicable exemption."],
  // Financial
  dcaa:      ["DCAA", "Defense Contract Audit Agency. Audits contractor accounting systems, incurred costs, and proposals on cost-type contracts. If KDT bids CPFF or T&M above $750K, expect DCAA involvement. An 'adequate' accounting system designation from DCAA is required before award of any cost-type contract."],
  adequateAcct:["Adequate Accounting System", "DCAA's designation that a contractor's financial system meets government audit standards (DFARS 252.242-7006). Required before award of any cost-reimbursable contract. Adequacy criteria: tracks costs by contract and CLIN, segregates direct vs. indirect costs, identifies unallowable costs, and produces timely and accurate financial reports."],
  ics:       ["ICS", "Incurred Cost Submission. Annual report filed with DCAA detailing all costs incurred under cost-type contracts for the fiscal year. Due within 6 months of fiscal year end. Failure to file on time = contract breach. DCAA has 6 years to audit a submitted ICS."],
  fpra:      ["FPRA", "Forward Pricing Rate Agreement. Pre-negotiated agreement between KDT and the cognizant DCAA/DCMA on indirect rates for upcoming fiscal periods. Eliminates the need to renegotiate rates on every cost-type proposal."],
  acrn:      ["ACRN", "Accounting Classification Reference Number. Identifies the funding source (appropriation, fiscal year, program element) for each payment line on a contract. KDT must track costs at the ACRN level on cost-type contracts — mischarging to the wrong ACRN is a False Claims Act issue."],
  fca:       ["False Claims Act", "31 U.S.C. §3729. Federal law imposing treble damages and per-claim penalties for knowingly submitting false claims to the government. Applies to: inflated invoices, billing unallowable costs, misrepresenting technical capability, and overstating CMMC compliance on a SPRS self-assessment. Both civil and criminal exposure."],
} as const;

type TermKey = keyof typeof TERMS;

// ─── Natural view config (framework families) ─────────────────────────────────

const naturalFrameworks = [
  {
    id: "cyber",
    label: "Cybersecurity Maturity",
    shortLabel: "Cyber Maturity",
    icon: "🔐",
    btnColor: "bg-blue-700 hover:bg-blue-600",
    headerBg: "bg-blue-900",
    borderColor: "border-blue-300",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    desc: "NIST is the standard. CMMC is the enforcement. They are one stack — you cannot have CMMC without NIST.",
    keys: ["nist171","nist171r2","nist53","nist172","cmmc1","cmmc2","cmmc3","c3pao","dibcac","sprs","ssp","poam"] as TermKey[],
  },
  {
    id: "regulatory",
    label: "Contract Regulatory Framework",
    shortLabel: "FAR / DFARS",
    icon: "📋",
    btnColor: "bg-purple-700 hover:bg-purple-600",
    headerBg: "bg-purple-900",
    borderColor: "border-purple-300",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    desc: "FAR is the master rulebook for all federal contracts. DFARS layers DoD-specific requirements on top.",
    keys: ["far","dfars","dfars7012","dfars7021","ndaa","sca","davisBacon","far31","cas","far5224"] as TermKey[],
  },
  {
    id: "cui",
    label: "CUI & Data Handling",
    shortLabel: "CUI / Data",
    icon: "🗄️",
    btnColor: "bg-cyan-700 hover:bg-cyan-600",
    headerBg: "bg-cyan-900",
    borderColor: "border-cyan-300",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-800",
    desc: "What counts as controlled information, how it must be handled, and what happens when there's a breach.",
    keys: ["cui","cfr2002","fci","fedramp","dibnet","cuiMark","sprs"] as TermKey[],
  },
  {
    id: "clearance",
    label: "Facility & Personnel Security",
    shortLabel: "Clearances / FCL",
    icon: "🏛️",
    btnColor: "bg-green-700 hover:bg-green-600",
    headerBg: "bg-green-900",
    borderColor: "border-green-300",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    desc: "FCL is the company clearance. Personnel clearances are for individuals. You need the FCL before individual clearances matter on a contract.",
    keys: ["fcl","dcsa","nisp","fso","confidential","secret","ts","sci","sap","sf86","diss"] as TermKey[],
  },
  {
    id: "export",
    label: "Export Controls",
    shortLabel: "Export",
    icon: "🌐",
    btnColor: "bg-orange-700 hover:bg-orange-600",
    headerBg: "bg-orange-900",
    borderColor: "border-orange-300",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-800",
    desc: "Controls on defense articles, dual-use technology, and services provided to or shared with foreign persons or governments.",
    keys: ["itar","ear","ddtc","usml","ccl","taa","ofac","deemedExport"] as TermKey[],
  },
  {
    id: "financial",
    label: "Financial Compliance",
    shortLabel: "Financial",
    icon: "💰",
    btnColor: "bg-red-700 hover:bg-red-600",
    headerBg: "bg-red-900",
    borderColor: "border-red-300",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    desc: "Audit readiness, cost accounting, and financial reporting for cost-type and large contracts.",
    keys: ["dcaa","adequateAcct","ics","fpra","cas","far31","acrn","fca"] as TermKey[],
  },
];

// ─── Timeline view config (encounter order) ────────────────────────────────────

const timelinePhases = [
  {
    id: "phase1",
    phase: "Phase 1",
    label: "First Bids — The Rulebook",
    icon: "📋",
    headerBg: "bg-purple-900",
    borderColor: "border-purple-300",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    btnColor: "bg-purple-700 hover:bg-purple-600",
    desc: "Every federal contract references these. Know them before submitting your first proposal.",
    keys: ["far","dfars","ndaa","sca","davisBacon","far5224"] as TermKey[],
  },
  {
    id: "phase2",
    phase: "Phase 2",
    label: "First DoD Win — Cyber Baseline",
    icon: "🔐",
    headerBg: "bg-blue-900",
    borderColor: "border-blue-300",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    btnColor: "bg-blue-700 hover:bg-blue-600",
    desc: "Cyber compliance kicks in the moment a DoD contract involves controlled information. These hit together.",
    keys: ["fci","cui","cfr2002","cuiMark","dfars7012","dfars7021","cmmc1","nist171","nist171r2","sprs","ssp","poam"] as TermKey[],
  },
  {
    id: "phase3",
    phase: "Phase 3",
    label: "Growing DoD Work — Level 2 & Cloud",
    icon: "📈",
    headerBg: "bg-cyan-900",
    borderColor: "border-cyan-300",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-800",
    btnColor: "bg-cyan-700 hover:bg-cyan-600",
    desc: "Third-party assessment required. Cloud services handling CUI need FedRAMP. Incident reporting goes live.",
    keys: ["cmmc2","c3pao","dibcac","nist53","nist172","cmmc3","fedramp","dibnet"] as TermKey[],
  },
  {
    id: "phase4",
    phase: "Phase 4",
    label: "Classified Work — Clearances & FCL",
    icon: "🏛️",
    headerBg: "bg-green-900",
    borderColor: "border-green-300",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    btnColor: "bg-green-700 hover:bg-green-600",
    desc: "Once a contract requires classified access, the company and individuals both need clearances. FCL comes first.",
    keys: ["fcl","dcsa","nisp","fso","confidential","secret","ts","sci","sap","sf86","diss"] as TermKey[],
  },
  {
    id: "phase5",
    phase: "Phase 5",
    label: "Cost-Type Contracts — Financial Compliance",
    icon: "💰",
    headerBg: "bg-red-900",
    borderColor: "border-red-300",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    btnColor: "bg-red-700 hover:bg-red-600",
    desc: "CPFF and T&M contracts trigger a full audit trail. No adequate accounting system = no award.",
    keys: ["dcaa","adequateAcct","far31","cas","ics","fpra","acrn","fca"] as TermKey[],
  },
  {
    id: "phase6",
    phase: "Phase 6",
    label: "International / OCONUS — Export Controls",
    icon: "🌐",
    headerBg: "bg-orange-900",
    borderColor: "border-orange-300",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-800",
    btnColor: "bg-orange-700 hover:bg-orange-600",
    desc: "The moment work crosses a border or involves foreign nationals, export controls apply. Criminal penalties — flag to legal before proceeding.",
    keys: ["itar","ear","ddtc","usml","ccl","taa","ofac","deemedExport"] as TermKey[],
  },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function TermRow({ termKey }: { termKey: TermKey }) {
  const [term, def] = TERMS[termKey];
  return (
    <div className="px-6 py-4 flex gap-4">
      <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0 leading-snug">{term}</span>
      <span className="text-gray-600 text-sm leading-relaxed">{def}</span>
    </div>
  );
}

function ViewToggle({ view, setView }: { view: "natural" | "timeline"; setView: (v: "natural" | "timeline") => void }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
        {(["natural", "timeline"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              view === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {v === "natural" ? "Natural" : "Timeline"}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400">
        {view === "natural"
          ? "Grouped by framework type — what kind of compliance it is."
          : "Grouped by when you encounter it — the order it hits you in the real world."}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ComplianceTab() {
  const [view, setView] = useState<"natural" | "timeline">("natural");

  const scrollTo = (id: string) => {
    const el = document.getElementById(`comp-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const blocks = view === "natural" ? naturalFrameworks : timelinePhases;

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-slate-700 text-sm leading-relaxed">
          Federal contracting carries a significant compliance burden.{" "}
          <strong>Non-compliance can disqualify a proposal, void a contract, or trigger debarment.</strong>{" "}
          All terms appear in both views — same information, different organization.
        </p>
      </div>

      <ViewToggle view={view} setView={setView} />

      {/* Nav strip */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex gap-2 min-w-max">
          {blocks.map((b) => (
            <button
              key={b.id}
              onClick={() => scrollTo(b.id)}
              className={`${b.btnColor} text-white text-xs font-bold px-3 py-2.5 rounded-lg transition-opacity flex items-center gap-1.5 whitespace-nowrap`}
            >
              <span>{b.icon}</span>
              <span>{"shortLabel" in b ? b.shortLabel : b.phase}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-0.5">Jump to section ↑</p>
      </div>

      {/* Blocks */}
      {blocks.map((b) => {
        const keys = b.keys.filter((k, i, arr) => arr.indexOf(k) === i); // dedupe
        return (
          <div
            id={`comp-${b.id}`}
            key={b.id}
            className={`bg-white border-2 ${b.borderColor} rounded-xl overflow-hidden shadow-sm scroll-mt-24`}
          >
            <div className={`${b.headerBg} px-6 py-4`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                    {b.icon}{" "}
                    {"phase" in b ? <><span className="opacity-60 mr-1">{b.phase} —</span>{b.label}</> : b.label}
                  </h3>
                  <p className="text-white/70 text-xs mt-1 leading-relaxed">{b.desc}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${b.badgeBg} ${b.badgeText} flex-shrink-0 mt-0.5`}>
                  {keys.length} terms
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {keys.map((k) => <TermRow key={k} termKey={k} />)}
            </div>
          </div>
        );
      })}

      {/* KDT Priority Timeline */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          📌 KDT Compliance Priority Timeline
        </p>
        <div className="space-y-2.5">
          {[
            ["Immediate", "SAM.gov active registration + UEI. SCA wage determinations on every guard contract — price it in before you bid."],
            ["Year 1", "CMMC Level 1 self-assessment + SPRS score posted. ITAR registration if pursuing any defense tech, training contracts, or OCONUS work. CUI identification and basic handling procedures."],
            ["Year 1–2", "NIST SP 800-171 full implementation + SSP. CMMC Level 2 gap assessment — understand your remediation cost before bidding DoD at scale."],
            ["Year 2–3", "CMMC Level 2 C3PAO assessment when DoD contract volume justifies the cost. FCL application when first classified contract opportunity appears. Adequate Accounting System before any CPFF bids."],
            ["Ongoing", "Annual NDAA summary review. OFAC screening on every international engagement. ICS filing on cost-type contracts. SPRS score updates after any significant system or personnel changes."],
          ].map(([timeline, note]) => (
            <div key={timeline} className="flex items-start gap-3">
              <span className="text-amber-400 font-bold text-xs w-20 flex-shrink-0 mt-0.5">{timeline}</span>
              <span className="text-slate-300 text-sm leading-relaxed">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
