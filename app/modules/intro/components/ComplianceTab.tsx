"use client";

const frameworks = [
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
    terms: [
      ["NIST SP 800-171", "110-practice security standard for protecting Controlled Unclassified Information (CUI) in non-federal systems. Published by NIST, mandated by DFARS. Organized across 14 control families: Access Control, Audit & Accountability, Configuration Management, Identification & Authentication, Incident Response, Maintenance, Media Protection, Personnel Security, Physical Protection, Risk Assessment, Security Assessment, System & Communications Protection, System & Information Integrity, Awareness & Training. This is the technical backbone of CMMC Level 2 — every CMMC L2 practice maps directly to 800-171. KDT must implement all 110 and document them in an SSP."],
      ["NIST SP 800-171 Rev 2", "The current active revision (2020). Rev 3 is in final draft as of 2025 but CMMC 2.0 is anchored to Rev 2. When C3PAOs conduct CMMC Level 2 assessments, they assess against Rev 2 controls. Do not implement Rev 3 ahead of official CMMC transition."],
      ["NIST SP 800-53", "Broader federal information security catalog — 1,000+ controls across 20 families. Used primarily by federal agencies for their own systems (FedRAMP, FISMA). Contractors reference it on CPFF/R&D contracts and classified program work. More comprehensive than 800-171 and not directly required of typical contractors unless the contract specifies it."],
      ["NIST SP 800-172", "Enhanced security requirements for CUI in critical programs or high value assets. Supplements 800-171 for contractors on the most sensitive DoD programs. Maps to CMMC Level 3. Not a near-term KDT requirement unless pursuing highest-sensitivity programs."],
      ["CMMC Level 1", "Foundational cybersecurity. 17 basic safeguarding practices drawn from FAR 52.204-21. Required for all DoD contractors handling Federal Contract Information (FCI). Annual self-assessment — no third party required. Score must be posted to SPRS. Cost: minimal — mostly documentation of basic cyber hygiene: anti-virus, password policy, access controls, screen lock, backup, and physical protection of devices."],
      ["CMMC Level 2", "Advanced cybersecurity. Full implementation of all 110 NIST SP 800-171 Rev 2 practices. Required for contractors handling CUI. As of 2025, required on most significant DoD contracts. Triennial third-party assessment by a C3PAO — self-assessment is not accepted for Level 2. Score posted to SPRS. Cost: significant — typically $50K–$300K+ depending on system complexity and gap remediation needed before the assessment."],
      ["CMMC Level 3", "Expert cybersecurity for contractors on the highest-sensitivity DoD programs. Built on CMMC L2 + 24 additional practices from NIST SP 800-172. Government-led assessment by DIBCAC — no C3PAO involved. Very limited contractor population. Not a near-term KDT requirement."],
      ["C3PAO", "Certified Third Party Assessment Organization. CMMC-AB accredited firms that conduct CMMC Level 2 assessments. KDT must hire a C3PAO for Level 2 — self-assessment is not permitted. C3PAO findings are binding: pass, conditional pass with a POA&M, or fail. A failed assessment blocks contract award. Full list of accredited C3PAOs at cyberAB.org."],
      ["DIBCAC", "Defense Industrial Base Cybersecurity Assessment Center. DoD's own assessment team for CMMC Level 3 and spot-check audits of Level 2 self-assessments. Government-led, not C3PAO-conducted. DIBCAC findings directly affect contract eligibility."],
      ["SPRS", "Supplier Performance Risk System. DoD's online contractor risk database. KDT must post its NIST SP 800-171 self-assessment score here before any DoD contract award. Scores range from -203 (all controls missing) to +110 (full compliance). Contracting officers check SPRS before award — a missing or critically low score can disqualify KDT outright."],
      ["SSP", "System Security Plan. Required document mapping all IT systems, users, network topology, data flows, and how each of the 110 NIST SP 800-171 controls is implemented (or not). Must be current and accurate before any CMMC assessment. The SSP is the primary evidence artifact — vague or incomplete SSPs fail assessments."],
      ["POA&M", "Plan of Action & Milestones. Documents known security gaps and your remediation timeline. Open POA&M items are acceptable under CMMC L2 if milestones are realistic and the SPRS score stays above the contract threshold. Closing POA&Ms without actually remediating them is a False Claims Act violation."],
    ],
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
    desc: "FAR is the master rulebook for all federal contracts. DFARS layers DoD-specific requirements on top. Every contract clause traces back to one of these.",
    terms: [
      ["FAR", "Federal Acquisition Regulation. The master rulebook for all U.S. federal procurement — codified in Title 48 of the CFR. Every federal contract includes FAR clauses by reference. Non-compliance = breach of contract or grounds for debarment. Know: Part 12 (commercial items), Part 15 (negotiated acquisition), Part 31 (cost principles), Part 52 (standard contract clauses)."],
      ["DFARS", "Defense Federal Acquisition Regulation Supplement. DoD-specific rules layered on top of FAR. Every DoD contract references both FAR and DFARS. Key additions: cybersecurity reporting (252.204-7012), CMMC requirements (252.204-7021), counterfeit electronic parts (252.246-7007), IP and technical data rights, and specialized acquisition procedures for sensitive programs."],
      ["DFARS 252.204-7012", "Safeguarding Covered Defense Information and Cyber Incident Reporting. The foundational DFARS cybersecurity clause. Requires NIST SP 800-171 compliance and cyber incident reporting to DoD within 72 hours of discovery. If this clause is in your contract, CMMC compliance follows automatically. Scan every DoD solicitation for this clause — its presence is the trigger."],
      ["DFARS 252.204-7021", "Cybersecurity Maturity Model Certification Requirements. The CMMC mandate clause. Specifies which CMMC level (1, 2, or 3) is required for the specific contract. If Level 2 is specified, C3PAO assessment is required before award. If this clause appears in a solicitation, stop and determine your CMMC readiness before investing in the proposal."],
      ["NDAA", "National Defense Authorization Act. Annual law authorizing DoD spending and setting contracting policy. Passed each December. Key provisions shift the entire DoD market for the year: CMMC rollout timelines, banned vendors (Huawei, ZTE, Hikvision per §889), small business set-aside requirements, and new mandatory contract clauses. Read the annual NDAA summary — missing a key provision costs you contracts."],
      ["SCA", "Service Contract Act (41 U.S.C. §6701). Mandatory for all service contracts over $2,500 where service employees (guards, technicians, custodians) perform the work. Requires paying prevailing wages and fringe benefits per DOL Wage Determinations specific to each geographic area and occupational classification. Every security guard contract includes a Wage Determination — your bid pricing must absorb it in full. Underbidding SCA is a compliance violation and a financial disaster."],
      ["Davis-Bacon Act", "Prevailing wage law for federal construction contracts over $2,000. Applies to laborers and mechanics on construction, alteration, or repair work under a federal contract. If KDT performs facility construction or renovation, Davis-Bacon wage rates apply. Like SCA, pricing must absorb the wage determination — you cannot negotiate below it."],
      ["FAR Part 31", "Contract Cost Principles. Defines allowable vs. unallowable costs on cost-reimbursable contracts. Allowable costs must be reasonable, allocable, consistent with GAAP, and not specifically prohibited. Key unallowable costs: entertainment (31.205-14), lobbying (31.205-22), fines and penalties (31.205-15), interest charges (31.205-20), executive compensation above the ACRN ceiling (31.205-6(p)). Know this before bidding any CPFF or T&M contract."],
      ["CAS", "Cost Accounting Standards (48 CFR 9900). Applies to single contracts over $2M or cumulative cost-type awards over $50M. Requires consistent, documented cost accounting practices across contracts and periods. Four key standards apply to most contractors: CAS 401 (Consistency in estimating), CAS 402 (Consistency in direct/indirect allocation), CAS 405 (Identification of unallowable costs), CAS 406 (Cost accounting period). DCAA audits CAS compliance."],
      ["FAR 52.212-4", "Contract Terms and Conditions — Commercial Items. Governs core terms when a contract is awarded under FAR Part 12 (commercial items treatment): inspection, acceptance, payment, disputes, changes, termination. One of the most cited FAR clauses — often incorporated by reference without being fully printed in the solicitation."],
    ],
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
    terms: [
      ["CUI", "Controlled Unclassified Information. Government-designated sensitive information that isn't classified but requires safeguarding and dissemination controls. Categories include: Law Enforcement Sensitive (LES), Export Controlled, Privacy/PII, Proprietary Business Information, Critical Infrastructure, and others. The National Archives (NARA) maintains the CUI Registry. If your contract involves CUI → CMMC applies. Storing CUI on an unprotected personal device is a violation."],
      ["32 CFR Part 2002", "The federal regulation establishing the CUI Program. Published by NARA. Defines CUI categories, handling requirements, marking standards, and decontrol procedures. The legal basis for all CUI requirements. If a document is marked 'CUI//SP-CTI' or 'CUI//PRVCY' — that marking comes from this regulation. KDT employees must understand basic CUI marking and handling before touching any government-provided sensitive material."],
      ["FCI", "Federal Contract Information. Information provided by or generated for the government under a contract that is not intended for public release. Less sensitive than CUI — triggers CMMC Level 1 (not Level 2). If you have any federal contract with deliverables or system access, you almost certainly handle FCI."],
      ["FedRAMP", "Federal Risk and Authorization Management Program. Cloud security authorization standard managed by GSA. If KDT uses cloud services (AWS GovCloud, Azure Government, Google Cloud, Salesforce, etc.) to store or process CUI, those services must be FedRAMP Authorized at the appropriate impact level (Low, Moderate, or High). Using a non-FedRAMP commercial cloud instance for CUI is a DFARS 252.204-7012 violation."],
      ["DIBNet", "Defense Industrial Base Network. DoD's portal for cybersecurity threat intelligence sharing and incident reporting. Required reporting destination for cyber incidents under DFARS 252.204-7012. After any qualifying cyber incident on a DoD contract: report to DIBNet within 72 hours, preserve forensic images of compromised systems, and cooperate with DoD incident response."],
      ["CUI Marking", "CUI documents must be marked per NARA standards: 'CUI' banner on cover page, page footer on each page, and category indicator for specific categories (e.g., 'CUI//LES' for Law Enforcement Sensitive, 'CUI//SP-CTI' for cyber threat info). Improperly marked CUI is still CUI — failure to mark is its own violation and is auditable."],
      ["SPRS (CUI context)", "Contractors handling CUI under any DoD contract must post a current NIST SP 800-171 self-assessment score to SPRS before contract award. An absent or expired SPRS score for a CUI-handling contract can block award, regardless of all other qualifications."],
    ],
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
    desc: "FCL is the company clearance. Personnel clearances are for individuals. You need the FCL before the individual clearances matter on a contract.",
    terms: [
      ["FCL", "Facility Clearance. Organization-level security clearance granted to a company by DCSA. Required before any KDT employee can access classified information under a government contract. Sponsorship comes from the CO on the first classified contract requiring it. FCL level (Secret or TS) must match the contract requirement. Without an FCL, the company legally cannot hold a classified contract — no exceptions."],
      ["DCSA", "Defense Counterintelligence and Security Agency. DoD agency administering personnel and facility security clearances for defense contractors. Processes FCL applications, conducts facility inspections, and manages the NISP. KDT's primary point of contact for all clearance-related compliance on DoD contracts."],
      ["NISP", "National Industrial Security Program. The framework governing how cleared contractors protect classified information. Governed by NISPOM (DoD Manual 5220.22-M). FCL holders must comply with NISP — including designating a qualified FSO, maintaining physical security standards, and reporting security incidents."],
      ["FSO", "Facility Security Officer. Designated individual responsible for administering the security program at a cleared contractor facility. Required for all FCL holders. The FSO manages personnel clearance requests and renewals, handles visit authorizations, reports security incidents to DCSA, and maintains NISPOM compliance. When KDT pursues its first classified contract, designating and training an FSO is a prerequisite."],
      ["Confidential", "Lowest classified level. Unauthorized disclosure reasonably expected to cause damage to national security. Rarely the ceiling on security contracts — most DoD facility guard contracts require Secret minimum. Investigation: Tier 3 (T3), 5-year scope."],
      ["Secret", "Mid-level classification. Unauthorized disclosure reasonably expected to cause serious damage to national security. Standard minimum for armed security at DoD installations. Required for SIPRNet access and most operational planning material. Investigation: Tier 3 (T3), 5-year scope. Most common clearance level for KDT guard and protection contracts."],
      ["Top Secret (TS)", "Unauthorized disclosure reasonably expected to cause exceptionally grave damage to national security. Required for C4ISR program support, SCIF access, intelligence-adjacent contracts, and protection of the highest-value assets. Investigation: Tier 5 (T5), 10-year scope. Budget 12–18+ months for initial T5 investigations."],
      ["SCI", "Sensitive Compartmented Information. TS-level access to intelligence sources, methods, or programs. Requires separate DNI adjudication beyond TS. Requires physical access to a SCIF. Personnel cannot access SCI until formally read into the specific compartment by the program office — TS alone does not grant SCI access."],
      ["SAP / SAR", "Special Access Program / Special Access Required. Access beyond TS/SCI — program-specific with extremely limited need-to-know lists. Nominations come from the program office; access cannot be requested. Not a near-term KDT concern but important to recognize as a distinct category when it appears in a solicitation."],
      ["SF-86", "Standard Form 86. The security clearance application (completed electronically via eQIP). Covers 10 years of history: employment, education, residences, foreign contacts, foreign travel, financial history, legal history, mental health treatment, and drug use. Completeness and accuracy are legally required — deliberate omission or false statements are federal crimes."],
      ["DISS", "Defense Information System for Security. DoD's enterprise system for managing personnel security clearances — replaced JPAS in 2021. FSOs use DISS to submit clearance requests, visit authorizations, and incident reports."],
    ],
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
    terms: [
      ["ITAR", "International Traffic in Arms Regulations (22 CFR 120–130). Controls export of defense articles and services on the US Munitions List (USML). Administered by State Dept / DDTC. Criminal penalties: up to 20 years imprisonment + $1M per violation. If KDT's contracts involve weapons systems, military training, protective services for defense programs, or certain security technologies — ITAR likely applies. OCONUS work especially. Foreign national employees in proximity to controlled technology may trigger 'deemed export' issues."],
      ["EAR", "Export Administration Regulations (15 CFR 730–774). Controls dual-use items on the Commerce Control List (CCL). Administered by Commerce Dept / BIS. Less restrictive than ITAR but equally serious in violations. Covers technology with both commercial and military applications — software, electronics, cybersecurity tools, encryption. Review CCL classifications for any technology KDT develops or sells."],
      ["DDTC", "Directorate of Defense Trade Controls (State Dept). Administers ITAR. KDT must register with DDTC ($2,750/yr) if it manufactures, exports, or brokers ITAR-controlled defense articles or services. Registration alone does not authorize exports — a license or applicable exemption is required for each transaction."],
      ["USML", "US Munitions List. The list of articles, services, and technical data controlled under ITAR — organized into 21 categories (I–XXI). Category XI = Military Electronics. Category XIII = Military Training Equipment. Category XIV = Toxicological Agents. Category XVI = Nuclear Weapons. If KDT's services or technologies appear on any USML category, ITAR registration and export licensing are mandatory before sharing with any foreign person."],
      ["CCL", "Commerce Control List. The EAR equivalent of the USML — dual-use items controlled by Commerce Dept. Each entry has an Export Control Classification Number (ECCN). Items not on the USML but with military applications often land on the CCL. KDT must determine the ECCN for any technology product or service before export or foreign sharing."],
      ["TAA", "Technical Assistance Agreement. ITAR license required for providing ITAR-controlled technical data or defense services to a foreign person (even within the US). KDT needs a TAA for: training foreign nationals on controlled tactics, providing security consulting to foreign government clients, sharing operational TTPs with allied forces. State Dept approval required — allow 30–90 days minimum."],
      ["OFAC", "Office of Foreign Assets Control (Treasury Dept). Administers US sanctions programs including the SDN (Specially Designated Nationals) list and country-based embargoes. Before any international contract, screen all parties against the SDN list. Violations are strict liability — intent is irrelevant. Use OFAC's free online search tool for every new international client, partner, or vendor. Penalties: up to $1M per civil violation, plus criminal exposure."],
      ["Deemed Export", "Sharing ITAR/EAR-controlled technology with a foreign national on US soil is legally treated as an export to their home country. This affects KDT if employing or subcontracting with foreign nationals who access controlled technology, even domestically. Requires an export license or applicable exemption. This is a frequently missed compliance gap for growing contractors."],
    ],
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
    desc: "Audit readiness, cost accounting, and financial reporting for cost-type and large contracts. Failure here blocks contract awards and triggers federal liability.",
    terms: [
      ["DCAA", "Defense Contract Audit Agency. Audits contractor accounting systems, incurred costs, and proposals on cost-type contracts. If KDT bids CPFF or T&M above $750K, expect DCAA involvement. DCAA can conduct pre-award audits (accounting system adequacy), post-award incurred cost audits, and forward pricing rate reviews at any time. Without an 'adequate' accounting system designation, cost-type contracts cannot be awarded to KDT."],
      ["Adequate Accounting System", "DCAA's designation that a contractor's financial system meets government audit standards (DFARS 252.242-7006). Required before award of any cost-reimbursable contract. Adequacy criteria: tracks costs by contract and CLIN, segregates direct vs. indirect costs, identifies unallowable costs, and produces timely and accurate financial reports. Without this designation, CPFF and CPAF contracts cannot be awarded to KDT — period."],
      ["ICS", "Incurred Cost Submission. Annual report filed with DCAA detailing all costs incurred under cost-type contracts for the fiscal year. Due within 6 months of fiscal year end. Contains: direct costs by contract, indirect cost pool schedules, and reconciliation to KDT's financial statements. Failure to file on time = contract breach. DCAA has 6 years to audit a submitted ICS."],
      ["FPRA", "Forward Pricing Rate Agreement. Pre-negotiated agreement between KDT and the cognizant DCAA/DCMA on indirect rates (fringe, overhead, G&A) for upcoming fiscal periods. Eliminates the need to renegotiate rates on every cost-type proposal. Establishes credibility with large agencies and speeds proposal evaluation cycles. Requires at least 2–3 years of stable indirect cost history to negotiate."],
      ["CAS", "Cost Accounting Standards. Applies to single contracts over $2M or cumulative cost-type awards over $50M. Requires consistent, documented cost accounting practices across all contracts and periods. Four key standards: CAS 401 (Consistency in estimating vs. accumulating), CAS 402 (Consistency in direct/indirect allocation), CAS 405 (Identifying unallowable costs), CAS 406 (Cost accounting period). DCAA audits CAS compliance — non-compliant cost accounting leads to disallowed costs and contract disputes."],
      ["FAR Part 31", "Contract Cost Principles. Defines allowable vs. unallowable costs on cost-reimbursable contracts. Allowable costs must be: reasonable, allocable to the contract, consistent with GAAP, and not specifically prohibited. Key unallowable categories: entertainment (31.205-14), advertising/PR above baseline (31.205-1), interest charges (31.205-20), fines and penalties (31.205-15), lobbying (31.205-22), executive compensation above the ACRN ceiling (31.205-6(p))."],
      ["ACRN", "Accounting Classification Reference Number. Identifies the funding source (appropriation, fiscal year, program element) for each payment line on a contract. Multiple CLINs can draw from different ACRNs (different fiscal years of appropriated funds). KDT must track costs at the ACRN level on cost-type contracts — mischarging to the wrong ACRN is a False Claims Act issue."],
      ["False Claims Act", "31 U.S.C. §3729. Federal law imposing treble damages and per-claim penalties for knowingly submitting false claims to the government. Applies to: inflated invoices, billing unallowable costs, misrepresenting technical capability, and — critically — overstating CMMC compliance on a SPRS self-assessment. FCA qui tam provisions allow employees to sue on the government's behalf. Both civil and criminal exposure. This is why SSP honesty and SPRS accuracy matter."],
    ],
  },
];

export default function ComplianceTab() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(`comp-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-slate-700 text-sm leading-relaxed">
          Federal contracting carries a significant compliance burden. Frameworks are grouped by type — not by when you encounter them.{" "}
          <strong>Non-compliance can disqualify a proposal, void a contract, or trigger debarment.</strong> Know which blocks apply to KDT's current work, and which are coming.
        </p>
      </div>

      {/* Framework nav strip */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex gap-2 min-w-max">
          {frameworks.map((f) => (
            <button
              key={f.id}
              onClick={() => scrollTo(f.id)}
              className={`${f.btnColor} text-white text-xs font-bold px-3 py-2.5 rounded-lg transition-opacity flex items-center gap-1.5 whitespace-nowrap`}
            >
              <span>{f.icon}</span>
              <span>{f.shortLabel}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-0.5">Jump to framework block ↑</p>
      </div>

      {/* Framework blocks */}
      {frameworks.map((f) => (
        <div
          id={`comp-${f.id}`}
          key={f.id}
          className={`bg-white border-2 ${f.borderColor} rounded-xl overflow-hidden shadow-sm scroll-mt-24`}
        >
          <div className={`${f.headerBg} px-6 py-4`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                  {f.icon} {f.label}
                </h3>
                <p className="text-white/70 text-xs mt-1 leading-relaxed">{f.desc}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${f.badgeBg} ${f.badgeText} flex-shrink-0 mt-0.5`}
              >
                {f.terms.length} terms
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {f.terms.map(([term, def]) => (
              <div key={term} className="px-6 py-4 flex gap-4">
                <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0 leading-snug">
                  {term}
                </span>
                <span className="text-gray-600 text-sm leading-relaxed">{def}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* KDT Priority Timeline */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          📌 KDT Compliance Priority Timeline
        </p>
        <div className="space-y-2.5">
          {[
            [
              "Immediate",
              "SAM.gov active registration + UEI. SCA wage determinations on every guard contract — price it in before you bid.",
            ],
            [
              "Year 1",
              "CMMC Level 1 self-assessment + SPRS score posted. ITAR registration if pursuing any defense tech, training contracts, or OCONUS work. CUI identification and basic handling procedures.",
            ],
            [
              "Year 1–2",
              "NIST SP 800-171 full implementation + SSP. CMMC Level 2 gap assessment — understand your remediation cost before bidding DoD at scale.",
            ],
            [
              "Year 2–3",
              "CMMC Level 2 C3PAO assessment when DoD contract volume justifies the cost. FCL application when first classified contract opportunity appears. Adequate Accounting System before any CPFF bids.",
            ],
            [
              "Ongoing",
              "Annual NDAA summary review. OFAC screening on every international engagement. ICS filing on cost-type contracts. SPRS score updates after any significant system or personnel changes.",
            ],
          ].map(([timeline, note]) => (
            <div key={timeline} className="flex items-start gap-3">
              <span className="text-amber-400 font-bold text-xs w-20 flex-shrink-0 mt-0.5">
                {timeline}
              </span>
              <span className="text-slate-300 text-sm leading-relaxed">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
