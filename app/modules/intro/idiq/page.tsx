import Link from "next/link";

export const metadata = {
  title: "Module 04 — IDIQ Contracts & Task Orders | Zam.guv",
};

export default function IDIQPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Back to Modules</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 04</span>
            <span className="text-sm text-gray-500 hidden sm:block">IDIQ Contracts & Task Orders</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 04</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">IDIQ Contracts & Task Orders</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>20–25 minutes</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-indigo-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-sm font-bold mb-4 text-indigo-300 uppercase tracking-wide">Why IDIQ Matters for KDT</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              Most DoD and civilian agency contract revenue doesn't flow through standalone RFPs — it flows through IDIQ vehicles. Understanding the IDIQ structure is the difference between chasing one-off contracts and building a recurring revenue engine.
            </p>
            <p className="text-indigo-200 leading-relaxed mb-4">
              An IDIQ (Indefinite Delivery, Indefinite Quantity) contract is a master vehicle that pre-qualifies vendors. Once you're on the vehicle, work flows via individual Task Orders competed only among holders. Getting on the vehicle is the hard part. After that, every task order is an opportunity.
            </p>
            <div className="mt-6 pt-6 border-t border-indigo-800">
              <p className="text-amber-300 font-semibold">
                ⚠️ IDIQ ceiling values are not the same as actual revenue. A $50M IDIQ ceiling means the government can order up to $50M — it does not guarantee any minimum beyond the statutory minimum order (often as low as $1).
              </p>
            </div>
          </div>
        </section>

        {/* PART 1 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 1</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an IDIQ Contract</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              An Indefinite Delivery, Indefinite Quantity (IDIQ) contract is a type of federal contract used when the exact quantities and delivery dates of supplies or services are not known at the time of award. The government establishes a <strong>base contract</strong> that defines the terms, pricing structure, and ordering rules — then issues individual <strong>Task Orders</strong> (for services) or Delivery Orders (for products) against that base contract over time.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-6">
              <p className="text-indigo-800 font-medium">
                Think of the IDIQ base contract as a pre-approved vendor relationship. The Task Order is the actual statement of work and price for a specific job. Winning an IDIQ = getting in the door. Winning Task Orders = getting paid.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">IDIQ Structure — Base Contract vs. Task Order</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Base Contract", "Establishes terms, pricing structure, ordering rules, period of performance, and ceiling value. Awarded to one or more vendors (single-award vs. multi-award)."],
                  ["Ceiling Value", "The maximum total amount the government may order under the entire IDIQ over its life. Not a guarantee. Example: $500M IDIQ ceiling across 10 awardees = ~$50M per vendor in theory, but distribution is uneven."],
                  ["Minimum Order", "Statutory requirement: government must order at least this amount. Often as low as $1,000–$2,500. Don't count on this — it's a floor, not a floor you can build on."],
                  ["Ordering Period", "The window during which the government can issue Task Orders. Typically 5 years (1 base + 4 options). Orders placed before expiration can be performed after."],
                  ["Task Order (TO)", "The executable work unit. Has its own SOW, deliverables, period of performance, and price. Competed among IDIQ holders (fair opportunity requirement)."],
                  ["Single-Award IDIQ", "One vendor holds the entire vehicle. All TOs go to that vendor without further competition. High value, high accountability. Example: large system integration contract."],
                  ["Multi-Award IDIQ (MAIDIQ)", "Multiple vendors hold the vehicle. Each TO is competed (fair opportunity) among all holders. Most common for services. Getting on the vehicle matters; winning TOs matters more."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 my-6 border-l-4 border-indigo-400">
              <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Real-World Example</p>
              <p className="text-white leading-relaxed text-sm">
                DHS has an IDIQ for physical security services — <strong className="text-indigo-300">5-year, $200M ceiling, 8 awardees</strong>. KDT wins a spot on the vehicle. Six months later, DHS issues Task Order 0003: &ldquo;Armed security guards at Port of Baltimore, 12 months, FFP, estimated value $1.4M.&rdquo; Only the 8 IDIQ holders receive this TO solicitation. KDT now competes against 7 others — not the entire market. Getting on the vehicle was the moat.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">Why DoD Uses IDIQs</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Flexibility", "Requirements are recurring but unpredictable in volume — security services, IT support, professional services. IDIQ handles variability without re-competing the whole contract each time."],
                  ["Speed", "Once the vehicle is established, TOs can be awarded in days vs. months for a new contract. Critical for mission-urgent requirements."],
                  ["Reduced Admin Burden", "One set of terms, multiple orders. Contracting office overhead is dramatically lower per order than running separate procurements."],
                  ["Pre-Vetted Vendors", "IDIQ holders have already passed capability review, past performance evaluation, and pricing scrutiny. Government trusts the pool."],
                  ["Budget Flexibility", "Agencies can award a large IDIQ ceiling and spend against it as budget becomes available over the ordering period."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PART 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 2</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key IDIQ Programs</h2>
          <p className="text-gray-600 mb-6">These are the primary government-wide and DoD IDIQ vehicles relevant to KDT's service areas. Each has different entry requirements, scope, and competition dynamics.</p>

          {/* Vehicle comparison table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-indigo-900 px-6 py-3">
              <p className="text-white font-semibold text-sm uppercase tracking-wide">Major IDIQ Vehicles — Quick Reference</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Vehicle</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Agency</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Scope</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Ceiling</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">KDT Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["OASIS+", "GSA", "Professional services (logistics, security, management, facilities)", "$60B+", "High — LS pool covers logistics/security"],
                    ["SEWP VI", "NASA", "IT hardware, software, solutions", "$20B+", "Low — outside KDT core"],
                    ["Alliant 3", "GSA", "IT services and solutions", "$75B+", "Low-Medium — cyber angle only"],
                    ["SeaPort-NxG", "Navy", "Navy/Marine professional services", "$50B+", "Medium — defense services"],
                    ["CIO-SP4", "NIH/HHS", "Health IT, cybersecurity, analytics", "$20B+", "Low — health focus"],
                    ["OASIS+ LS", "GSA", "Logistics & supply chain services", "$20B+", "High — direct KDT match"],
                    ["MAC Vehicles (agency-specific)", "Various DoD", "Mission-specific services at command level", "Varies", "High — targeted pursuit"],
                  ].map(([vehicle, agency, scope, ceiling, relevance]) => (
                    <tr key={vehicle} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-indigo-700">{vehicle}</td>
                      <td className="px-6 py-4 text-gray-600">{agency}</td>
                      <td className="px-6 py-4 text-gray-600">{scope}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{ceiling}</td>
                      <td className="px-6 py-4 text-gray-600">{relevance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "OASIS+",
                full: "One Acquisition Solution for Integrated Services Plus",
                color: "bg-indigo-800",
                body: "GSA's flagship professional services IDIQ. Replaces the original OASIS. Multiple pools by small business status and service domain. OASIS+ LS (Logistics & Supply Chain) is the most relevant for KDT. Pool 1 = unrestricted, Pools 2–6 = small business set-asides. TO competition is fierce — hundreds of holders per pool.",
                kdtNote: "KDT should target OASIS+ LS Pool 2 (Small Business) or Pool 1 depending on size classification. Key capabilities: transportation management, supply chain operations, physical distribution, security support to logistics."
              },
              {
                name: "SeaPort-NxG",
                full: "SeaPort Next Generation",
                color: "bg-slate-700",
                body: "Navy SYSCOM's primary IDIQ for professional, engineering, and technical services across the Navy and Marine Corps. Administered by NAVSEA. Task Orders issued by NAVSEA, NAVAIR, SPAWAR, and other Navy commands. Strong focus on defense services.",
                kdtNote: "Relevant for KDT's defense-facing services — physical security, force protection support, personnel security, training support. Entry via periodic on-ramping."
              },
              {
                name: "Agency MAC Vehicles",
                full: "Multiple Award Contracts — Command/Agency Specific",
                color: "bg-indigo-700",
                body: "Many DoD commands run their own IDIQ vehicles rather than using government-wide contracts. Examples: Army ITES-3S (IT services), Air Force NETCENTS-2, DISA ENCORE III. Command-specific vehicles have less competition (smaller pools) and stronger mission alignment.",
                kdtNote: "Watch SAM.gov for open seasons on MAC vehicles at commands aligned to KDT capabilities: INSCOM, USSOCOM, Army Installation Management Command (IMCOM), etc."
              },
            ].map(({ name, full, color, body, kdtNote }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className={`${color} px-6 py-3`}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{name} — {full}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{body}</p>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                    <p className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">KDT Note</p>
                    <p className="text-indigo-900 text-sm">{kdtNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Task Orders Work</h2>
          <p className="text-gray-600 mb-6">Once you're on an IDIQ vehicle, the actual work and revenue comes through Task Orders. Here's the mechanics of how TOs are solicited, competed, and awarded.</p>

          {/* Fair Opportunity */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Fair Opportunity Requirement</h3>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                FAR 16.505 requires that when a Task Order exceeds the simplified acquisition threshold ($250K), the contracting officer must provide <strong>fair opportunity</strong> to all IDIQ holders to be considered. This means all holders get the TO solicitation and have a reasonable time to respond.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-900 text-sm"><strong>Exceptions to fair opportunity</strong> (when government can sole-source a TO): urgent requirement; only one holder is capable; the order must be issued to satisfy a minimum order guarantee; or using fair opportunity would compromise national security.</p>
              </div>
            </div>
          </div>

          {/* TO Types */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-indigo-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Task Order Contract Types</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["FFP TO", "Firm Fixed Price Task Order. Defined scope, fixed price. Most common for recurring services. KDT prices per guard/hour, per deliverable, or lump sum. Risk is on the contractor."],
                ["T&M TO", "Time & Materials Task Order. Labor hours + materials billed at negotiated rates. Used when scope is variable — investigations, surge staffing, consulting. Hours ceiling is usually set to limit government exposure."],
                ["CPFF TO", "Cost Plus Fixed Fee Task Order. Government reimburses allowable costs + fixed fee. Used for R&D, system development, complex analysis work. Requires DCAA-compliant accounting — mandatory."],
                ["CPAF TO", "Cost Plus Award Fee. Like CPFF but fee is partially variable based on performance evaluation. Incentivizes performance on longer-duration task orders."],
                ["Hybrid TO", "Combination types — common on large TOs. E.g., base services on FFP + surge capacity on T&M + travel as ODC cost-reimbursable."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-28 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TO Process Visual */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Typical Task Order Process</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { stage: "TO Solicitation", note: "Issued to all holders", color: "bg-indigo-100 text-indigo-800 border border-indigo-200" },
                { stage: "Q&A Period", note: "Clarifications", color: "bg-blue-100 text-blue-800 border border-blue-200" },
                { stage: "Proposals Due", note: "Price + technical", color: "bg-red-600 text-white" },
                { stage: "Evaluation", note: "Hours to days", color: "bg-purple-100 text-purple-800 border border-purple-200" },
                { stage: "TO Award", note: "SAM.gov notice", color: "bg-green-600 text-white" },
                { stage: "Performance", note: "Execute & invoice", color: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
              ].map(({ stage, note, color }, i, arr) => (
                <div key={stage} className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`${color} rounded-lg px-3 py-2 text-center`}>
                    <p className="font-bold text-xs whitespace-nowrap">{stage}</p>
                    <p className="text-xs opacity-70 whitespace-nowrap">{note}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-gray-400 text-sm font-bold">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PART 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reading an IDIQ Solicitation</h2>
          <p className="text-gray-600 mb-6">An IDIQ base contract solicitation is structurally different from a standalone RFP. Knowing what to look for prevents misreads and wasted proposal effort.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Key Differences from Standalone Contracts</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Base CLINs vs TO CLINs", "The base contract has CLINs for the base award itself (often a minimum order CLIN + administrative CLINs). The actual work CLINs are in individual Task Orders. Don't confuse the base CLIN structure with your actual pricing opportunity."],
                ["Ordering Period", "The period during which TOs can be issued — distinct from any single TO's period of performance. A 5-year IDIQ ordering period means TOs issued in Year 4 can extend up to the contract ceiling."],
                ["Ceiling vs Guaranteed", "The solicitation states a ceiling value and a minimum guaranteed amount. Read both carefully. The ceiling is aspirational; the minimum is contractual. Plan your business case on realistic task order projections, not the ceiling."],
                ["Pool Structure", "Multi-award IDIQs often have pools by size category, functional domain, or clearance level. Your proposal must qualify you for specific pool(s). Read pool eligibility requirements carefully — they vary."],
                ["Pricing Approach", "Many IDIQ base solicitations ask for loaded labor rates by labor category rather than a total price. These rates are evaluated and become your ceiling rates for Task Order pricing. Don't over-price — your TO proposals must come in at or below these rates."],
                ["Past Performance", "Evaluated at the vehicle level to qualify you. Separate from TO-level past performance evaluation. Make sure your base contract past performance aligns with the vehicle's scope — not just general GovCon experience."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-48 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border-l-4 border-indigo-400">
            <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Example</p>
            <p className="text-white leading-relaxed text-sm">
              OASIS+ LS solicitation requires proposing loaded labor rates for 15 standard labor categories (PM, logistics analyst, supply chain specialist, etc.). KDT proposes these rates competitively. If awarded, every OASIS+ LS Task Order KDT bids must price using rates at or below those ceiling rates. Setting rates too high in the base = losing TO competitions. Setting rates too low = cutting your own margin. The rate structure decision at the base contract level determines profitability across the entire ordering period.
            </p>
          </div>
        </section>

        {/* PART 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 5</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting on an IDIQ Vehicle</h2>
          <p className="text-gray-600 mb-6">IDIQ vehicles have periodic on-ramp opportunities where new vendors can join the vehicle. Missing the open season means waiting — sometimes years. Preparation is everything.</p>

          <div className="space-y-4 mb-6">
            {[
              {
                n: "1",
                title: "Meet Qualifications",
                body: "Each vehicle has minimum requirements: years in business, revenue thresholds, technical capability certifications (ISO, CMMI), security clearances. Verify eligibility before investing in a proposal."
              },
              {
                n: "2",
                title: "Past Performance",
                body: "Most IDIQs require 3–5 relevant past performance references at a comparable scope and dollar value. For OASIS+ LS, references should show logistics/supply chain services or related support. Thin past performance = rejection. Teaming with an experienced prime can bridge this gap."
              },
              {
                n: "3",
                title: "Teaming Strategy",
                body: "If KDT lacks depth in a pool's requirements, team with a company that has the past performance and certifications needed. As a teaming partner, KDT brings specific capabilities while the prime's record anchors the proposal. Over time, build direct past performance to pursue independently."
              },
              {
                n: "4",
                title: "Labor Rate Structure",
                body: "Develop a defensible, competitive labor rate structure before the solicitation drops. Research FPDS awards under similar vehicles to understand market rates. Build your rates from actual cost structure, not guesswork — you'll live with these for 5 years."
              },
              {
                n: "5",
                title: "Monitor Open Seasons",
                body: "Most government-wide IDIQs run on-ramp periods. Set SAM.gov alerts for the vehicle names. OASIS+ LS had its initial award in 2024 with on-ramp provisions. SeaPort-NxG runs periodic on-ramps. Don't miss the window."
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART 6 */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 6</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What KDT Should Know</h2>

          <div className="bg-indigo-950 text-white rounded-2xl p-7 mb-6">
            <h3 className="text-indigo-300 font-bold text-sm uppercase tracking-wide mb-4">KDT's IDIQ Priority Targets</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Based on KDT's service verticals — defense services, physical security, logistics, personnel security, and training — these IDIQ vehicles represent the highest-value pursuit targets:
            </p>
            <div className="space-y-3">
              {[
                { vehicle: "OASIS+ LS (Pool 2 — SB)", ceiling: "$20B ceiling", note: "Logistics & supply chain services. KDT's strongest fit. Target for initial IDIQ entry." },
                { vehicle: "SeaPort-NxG", ceiling: "$50B ceiling", note: "Navy professional services. High demand for force protection, physical security, training support." },
                { vehicle: "Agency MAC Vehicles (IMCOM, INSCOM)", ceiling: "Varies per award", note: "Installation-level services. Often less competition, stronger relationships with mission owners." },
              ].map(({ vehicle, ceiling, note }) => (
                <div key={vehicle} className="bg-indigo-900/50 border border-indigo-700 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-bold text-white text-sm">{vehicle}</p>
                    <span className="text-indigo-300 font-mono text-xs bg-indigo-950 px-2.5 py-1 rounded">{ceiling}</span>
                  </div>
                  <p className="text-indigo-200 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-indigo-200 rounded-xl p-5">
              <h4 className="font-bold text-indigo-800 text-sm mb-3">Realistic Revenue Model</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "IDIQ ceiling ≠ KDT revenue",
                  "Plan on 5–15% of ceiling being your realistic share",
                  "Year 1 Task Orders are often small — prove performance",
                  "Incumbency compounds: win first TO, win more",
                  "Task Order win rate: target 30–40% of bids on vehicle",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-indigo-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3">IDIQ Entry Timeline</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Monitor open seasons 12 months in advance",
                  "Build past performance portfolio now",
                  "Identify teaming partners with existing vehicle access",
                  "Develop labor rate models before solicitation",
                  "First TOs on a vehicle: price to win, not to profit",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-slate-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready for the IDIQ Simulation?</h2>
          <p className="text-indigo-200 mb-6 text-sm">
            Practice identifying and pursuing IDIQ task order opportunities in a realistic environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?vehicle=idiq&ready=true"
              className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Begin IDIQ Simulation →
            </Link>
            <Link
              href="/modules/idiq-training"
              className="inline-block bg-transparent border border-indigo-400 hover:border-indigo-200 text-indigo-300 hover:text-indigo-100 font-medium py-3 px-6 rounded-lg transition-colors text-sm"
            >
              IDIQ Training First →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
