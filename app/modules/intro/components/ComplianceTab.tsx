export default function ComplianceTab() {
  const domains = [
    {
      id: "cyber",
      title: "Cybersecurity & CUI",
      headerBg: "bg-blue-900",
      borderColor: "border-blue-300",
      badgeColor: "bg-blue-100 text-blue-800",
      terms: [
        ["CMMC", "Cybersecurity Maturity Model Certification. DoD's mandatory cybersecurity standard for contractors handling CUI. Level 1 (17 basic practices) · Level 2 (110 NIST 800-171 practices, requires C3PAO third-party assessment) · Level 3 (expert, DoD-led assessment). Required on most DoD contracts as of 2025. KDT must know its required level and achieve it before bidding."],
        ["NIST SP 800-171", "110-practice standard for protecting CUI in non-federal systems. The technical backbone of CMMC Level 2. KDT must implement all 110 practices and document them in an SSP."],
        ["NIST SP 800-53", "Broader federal information security standard used primarily by agencies themselves (FedRAMP, etc.). Contractors may reference it for CPFF/R&D contracts. More comprehensive than 800-171."],
        ["CUI", "Controlled Unclassified Information. Government-designated sensitive information that isn't classified but requires protection. Examples: law enforcement sensitive data, export-controlled data, contractor proprietary info marked by agency. If your contract involves CUI, CMMC applies."],
        ["SSP", "System Security Plan. Required document mapping your IT systems, security controls, and CMMC compliance status. Must be current and accurate before any assessment."],
        ["POA&M", "Plan of Action & Milestones. Documents known security gaps and your remediation timeline. Required alongside the SSP. Open POA&M items are acceptable if milestones are realistic — lying on your SSP is not."],
        ["FedRAMP", "Federal Risk and Authorization Management Program. Cloud security authorization standard. If KDT uses cloud services that handle CUI, those services must be FedRAMP authorized."],
      ],
    },
    {
      id: "export",
      title: "Export Control",
      headerBg: "bg-orange-900",
      borderColor: "border-orange-300",
      badgeColor: "bg-orange-100 text-orange-800",
      terms: [
        ["ITAR", "International Traffic in Arms Regulations. Controls export of defense articles and services on the US Munitions List (USML). Administered by State Dept / DDTC. Criminal penalties for violations. If KDT contracts involve weapons systems, military training, or certain security tech — ITAR likely applies. OCONUS work especially."],
        ["EAR", "Export Administration Regulations. Controls dual-use items on the Commerce Control List (CCL). Administered by Commerce Dept / BIS. Less strict than ITAR but equally serious. Covers technology with both commercial and military applications."],
        ["DDTC", "Directorate of Defense Trade Controls (State Dept). Administers ITAR. KDT must register with DDTC ($2,750/yr) if it manufactures, exports, or brokers ITAR-controlled items or services."],
        ["USML", "US Munitions List. The list of articles, services, and data controlled under ITAR. If KDT's services appear on the USML (e.g., military training, certain firearms), ITAR registration and licensing required."],
        ["TAA", "Technology Assistance Agreement. Required ITAR license for providing ITAR-controlled technical data or defense services to a foreign person (even within the US). KDT needs this for training or services involving foreign national employees or clients."],
        ["OFAC", "Office of Foreign Assets Control. Administers US sanctions programs. Before any international contract, screen all parties against OFAC's SDN list (Specially Designated Nationals)."],
      ],
    },
    {
      id: "regulatory",
      title: "Regulatory / Contract Compliance",
      headerBg: "bg-purple-900",
      borderColor: "border-purple-300",
      badgeColor: "bg-purple-100 text-purple-800",
      terms: [
        ["FAR", "Federal Acquisition Regulation. The master rulebook. Every federal contract includes FAR clauses. Non-compliance with FAR terms = breach of contract."],
        ["DFARS", "Defense FAR Supplement. DoD-specific additions to FAR. Adds CMMC, cybersecurity reporting, counterfeit parts, and IP provisions. Every DoD contract."],
        ["NDAA", "National Defense Authorization Act. Annual law shaping DoD contracting. Sets spending priorities, mandates (e.g., CMMC rollout), and restrictions (e.g., certain foreign vendors banned). Read annual NDAA summaries — they shift the market year to year."],
        ["SCA", "Service Contract Act. Requires contractors to pay prevailing wages and fringe benefits to service employees (guards, janitors, etc.) per DOL wage determinations. Every security guard contract includes an SCA wage determination — your pricing must absorb it."],
        ["Davis-Bacon Act", "Prevailing wage law for construction contracts. If KDT does facility construction or renovation work under a federal contract, Davis-Bacon wage rates apply to all laborers and mechanics."],
        ["FAR Part 31", "Contract Cost Principles. Defines allowable vs. unallowable costs on cost-reimbursable contracts. Unallowable: entertainment, marketing, fines, lobbying, alcohol."],
        ["CAS", "Cost Accounting Standards. Applies to contracts over $2M on cost-type work. Requires consistent cost accounting practices across contracts and periods."],
      ],
    },
    {
      id: "clearance",
      title: "Security Clearances & Facility",
      headerBg: "bg-green-900",
      borderColor: "border-green-300",
      badgeColor: "bg-green-100 text-green-800",
      terms: [
        ["Confidential", "Lowest classified level. Unauthorized disclosure could cause damage to national security. Rarely the ceiling — most DoD security contracts require Secret minimum."],
        ["Secret", "Mid-level classification. Unauthorized disclosure could cause serious damage to national security. Standard minimum for armed security at DoD facilities. Investigation: NACLC (5-year scope)."],
        ["Top Secret (TS)", "Unauthorized disclosure could cause exceptionally grave damage. Required for C4ISR, intelligence, and sensitive facility contracts. Investigation: SSBI (10-year scope)."],
        ["SCI", "Sensitive Compartmented Information. TS-level access to intelligence sources, methods, or programs. Requires separate adjudication and SCIF access."],
        ["FCL", "Facility Clearance. Organizational clearance granted to a company (not just individuals) by DCSA. Required before company employees can access classified information on a contract. KDT must pursue FCL when beginning classified work."],
        ["SAP / SAR", "Special Access Program / Special Access Required. Beyond TS/SCI. Extremely limited access requiring specific program nomination. Not a near-term KDT concern but worth knowing exists."],
        ["DCSA", "Defense Counterintelligence and Security Agency. Administers personnel and facility security clearances for DoD contractors. KDT's clearance sponsor is the CO on the first contract requiring a clearance."],
        ["SF-86", "Standard Form 86. The security clearance application form for individuals. Covers 10 years of history: employment, foreign contacts, financials, legal history."],
      ],
    },
    {
      id: "financial",
      title: "Financial Compliance",
      headerBg: "bg-red-900",
      borderColor: "border-red-300",
      badgeColor: "bg-red-100 text-red-800",
      terms: [
        ["DCAA", "Defense Contract Audit Agency. Audits contractor accounting systems, incurred costs, and proposals on cost-type contracts. If KDT bids CPFF or T&M above $750K, expect DCAA involvement. An adequate accounting system is required before award."],
        ["Adequate Accounting System", "DCAA designation for a contractor's financial system meeting government audit standards. Required for cost-reimbursable contracts. Without it, CPFF contracts cannot be awarded — period."],
        ["Allowable Costs (FAR 31)", "Costs the government reimburses on cost-type contracts: direct labor, fringe, overhead, G&A, travel per diem. Unallowable: entertainment, marketing, fines, lobbying, alcohol."],
        ["Incurred Cost Submission (ICS)", "Annual report filed with DCAA detailing all costs incurred under cost-type contracts. Required within 6 months of fiscal year end. Failure to file = contract breach."],
        ["FPRA", "Forward Pricing Rate Agreement. Pre-negotiated agreement on indirect rates for upcoming periods. Avoids re-negotiating rates on every proposal. Establishes credibility with large agencies."],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-slate-700 text-sm leading-relaxed">
          Federal contracting carries a significant compliance burden. Know which frameworks apply to KDT&apos;s work — non-compliance can disqualify a proposal, void a contract, or trigger debarment. Terms are grouped by domain.
        </p>
      </div>

      {domains.map((domain) => (
        <div key={domain.id} className={`bg-white border-2 ${domain.borderColor} rounded-xl overflow-hidden shadow-sm`}>
          <div className={`${domain.headerBg} px-6 py-3 flex items-center justify-between`}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{domain.title}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${domain.badgeColor}`}>
              {domain.terms.length} terms
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {domain.terms.map(([term, def]) => (
              <div key={term} className="px-6 py-4 flex gap-4">
                <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                <span className="text-gray-600 text-sm leading-relaxed">{def}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">📌 KDT Compliance Priority</p>
        <div className="space-y-2">
          {[
            ["Immediate", "SCA wage determinations on every guard contract — price it in before you bid."],
            ["Year 1", "SAM.gov active registration + UEI. ITAR registration if pursuing any defense tech or training contracts."],
            ["Year 1–2", "CMMC Level 1 self-assessment. Build toward Level 2 as DoD contract volume grows."],
            ["Year 2–3", "Facility Clearance (FCL) application when pursuing first classified work. Adequate Accounting System before any CPFF bids."],
            ["Ongoing", "Annual NDAA review. OFAC screening on all international work. ICS filing on cost-type contracts."],
          ].map(([timeline, note]) => (
            <div key={timeline} className="flex items-start gap-3">
              <span className="text-amber-400 font-bold text-xs w-20 flex-shrink-0 mt-0.5">{timeline}</span>
              <span className="text-slate-300 text-sm">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
