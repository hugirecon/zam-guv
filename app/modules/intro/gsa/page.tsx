import Link from "next/link";

export const metadata = {
  title: "Module 06 — GSA Schedule (MAS) | Zam.guv",
};

export default function GSAPage() {
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
            <span className="text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 06</span>
            <span className="text-sm text-gray-500 hidden sm:block">GSA Schedule (MAS)</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 06</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">GSA Schedule (MAS)</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>15–20 min</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-violet-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-sm font-bold mb-4 text-violet-300 uppercase tracking-wide">Why GSA Schedule Is KDT&apos;s Broadest Commercial Pathway</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              The GSA Multiple Award Schedule (MAS) is the federal government&apos;s largest acquisition program — used by every federal agency to buy commercial products and services without running a full FAR competition. Over 11 million line items, 19,000+ vendors, $45B+ in annual spend.
            </p>
            <p className="text-violet-200 leading-relaxed mb-4">
              For KDT, a GSA Schedule contract is a credential. It signals that GSA has reviewed and pre-approved your pricing, vetted your business, and accepted your company as a commercial vendor of record. Once on Schedule, any federal buyer can issue a task order directly to KDT — across civilian and DoD agencies — without a new competitive procurement.
            </p>
            <div className="mt-6 pt-6 border-t border-violet-800">
              <p className="text-amber-300 font-semibold">
                ⚠️ A GSA Schedule contract does not guarantee revenue. It opens the door. You still have to market to agencies, respond to RFQs, and compete on task orders. Being on Schedule with no agency relationships is a dormant asset.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the GSA MAS</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The GSA Multiple Award Schedule (MAS) — formerly a collection of individual schedules, now consolidated into one — is a long-term government-wide contract vehicle that allows federal agencies to purchase commercial products and services at pre-negotiated prices. It is authorized under FAR Subpart 8.4 and operates outside the normal FAR Part 15 competitive negotiation process.
            </p>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 my-6">
              <p className="text-violet-800 font-medium">
                The Schedule is not a contract for a specific project — it&apos;s a standing offer from a vendor to sell commercial items to the government at agreed pricing. Agencies place orders against the Schedule the way a commercial buyer would place a purchase order against a catalog agreement.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">GSA MAS — Core Concepts</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["MAS Contract", "A long-term IDIQ contract (up to 20 years: 5-year base + three 5-year options) between GSA and a vendor, establishing pre-negotiated pricing for commercial items. Each awardee has their own Schedule contract."],
                  ["Commercial Item", "GSA Schedule is for commercial items — goods or services sold in the commercial marketplace. KDT's security services, training, and consulting qualify as commercial services under FAR Part 12."],
                  ["Pre-Negotiated Pricing", "GSA reviews and approves your pricing against your Most Favored Customer (MFC) pricing before award. Your Schedule rates become the maximum ceiling prices for all orders — agencies can negotiate lower, not higher."],
                  ["Agency Orders (Task Orders)", "Agencies browse GSA Advantage or post RFQs on eBuy. They can place orders directly against your Schedule (under $25K simplified acquisition) or run a competitive RFQ among Schedule holders for larger requirements."],
                  ["Ordering Period", "Up to 20-year contract life. Orders can be placed at any time during the Schedule contract period. The government is not obligated to order anything — there is no minimum order guarantee."],
                  ["GSA as Contracting Vehicle", "GSA establishes the Schedule contract; agencies issue task orders. Your contracting officer relationship is with the agency placing the order, not GSA. GSA only manages your Schedule contract terms."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-48 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 my-6 border-l-4 border-violet-400">
              <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Real-World Example</p>
              <p className="text-white leading-relaxed text-sm">
                DHS Customs and Border Protection needs physical security assessment services at 3 ports of entry. Rather than running a 12-month FAR Part 15 competition, the contracting officer posts an RFQ on eBuy to GSA MAS holders under the <strong className="text-violet-300">Special Item Number (SIN) for security services</strong>. KDT, as a Schedule holder, receives the RFQ, submits a quote within 10 days, and is evaluated against 4 other vendors. Award in 3 weeks. This is the Schedule at work.
              </p>
            </div>
          </div>
        </section>

        {/* PART 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 2</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Schedules & SINs for KDT</h2>
          <p className="text-gray-600 mb-6">Under the consolidated MAS, offerings are organized by Special Item Numbers (SINs) rather than separate schedules. Knowing which SINs align to KDT&apos;s capabilities determines where to focus your Schedule application.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-violet-900 px-6 py-3">
              <p className="text-white font-semibold text-sm uppercase tracking-wide">MAS SINs — KDT Relevance Map</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Former Schedule</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">SIN Category</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Scope</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">KDT Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Schedule 84", "541690 / 246 series", "Law enforcement, security, facilities defense, counter-drug, emergency response", "High — direct match for physical security, force protection, armed guard services"],
                    ["00CORP", "541611 / 541612", "Professional services: management consulting, program management, training", "High — security consulting, training programs, program management support"],
                    ["IT Schedule 70 (MAS IT)", "54151S / 518210C", "IT products, software, cloud, cybersecurity", "Medium — cyber-adjacent capabilities only"],
                    ["Schedule 03FAC", "561210FAC", "Facilities maintenance, janitorial, grounds, security guard base support", "Medium — installation security guard services"],
                  ].map(([sched, sin, scope, fit]) => (
                    <tr key={sched} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-violet-700">{sched}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">{sin}</td>
                      <td className="px-6 py-4 text-gray-600">{scope}</td>
                      <td className="px-6 py-4 text-gray-600">{fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Schedule 84 / Security & Law Enforcement SINs",
                color: "bg-violet-800",
                body: "The former Schedule 84 SINs under MAS are KDT's primary target. They cover armed and unarmed guard services, physical security surveys, access control systems, surveillance equipment, law enforcement equipment, and counter-terrorism support. These SINs are used by DHS, DoD installations, federal courts, the Capitol Police, and civilian agencies with physical security requirements.",
                kdtNote: "KDT should pursue the security services SINs under the MAS that cover manned guarding, physical security assessments, and training. These generate the most direct revenue from Schedule task orders for security-focused companies."
              },
              {
                name: "00CORP / Professional Services",
                color: "bg-slate-700",
                body: "The Professional Services category (formerly Schedule 00CORP) covers management consulting, program management, training, facilitation, and professional support services. KDT's security consulting, risk assessments, and training program development fit here. Agencies use this category when they need expertise deliverables rather than physical security presence.",
                kdtNote: "Training development, curriculum design, risk assessment consulting, and security program development for federal agencies are billable under 00CORP SINs. This opens a different buyer segment — program offices and staff offices vs. security operations."
              },
            ].map(({ name, color, body, kdtNote }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className={`${color} px-6 py-3`}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{name}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{body}</p>
                  <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">
                    <p className="text-xs font-bold text-violet-800 uppercase tracking-wide mb-1">KDT Note</p>
                    <p className="text-violet-900 text-sm">{kdtNote}</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting on Schedule vs. Using Schedule</h2>
          <p className="text-gray-600 mb-6">The GSA MAS has two distinct sides: the <strong>offeror path</strong> (vendor becoming a Schedule holder) and the <strong>buyer path</strong> (agency issuing task orders). KDT needs to understand both — how to get on, and how agency buyers use the Schedule to find vendors.</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-violet-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-violet-800 px-5 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Offeror Path — Getting on Schedule</h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  ["Submit Offer", "Apply via GSA eOffer portal. Select SINs, provide pricing, submit financial and past performance documentation."],
                  ["GSA Review", "GSA contracting officer reviews offer. Verifies pricing against your MFC pricing. Requests clarifications. Timeline: 4–12 months."],
                  ["Price Negotiation", "GSA negotiates your Schedule rates to ensure government pays no more than your best commercial customer. Your basis of award customer is the benchmark."],
                  ["Award", "GSA issues Schedule contract. You're listed on GSA Advantage. Agencies can now order from you."],
                  ["Ongoing Compliance", "Annual sales reports, price reductions, modification requests, contractor assistance visits (CAVs). An active Schedule requires active management."],
                ].map(([step, desc]) => (
                  <div key={step} className="flex gap-3">
                    <span className="font-bold text-violet-700 text-sm w-36 flex-shrink-0">{step}</span>
                    <span className="text-gray-600 text-sm">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-700 px-5 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Buyer Path — How Agencies Order</h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  ["Direct Order (<$25K)", "Agency can place order directly from GSA Advantage without competitive quotes. No RFQ required at this threshold."],
                  ["3 Quotes ($25K–$250K)", "For simplified acquisition threshold range, agency must get quotes from 3 Schedule holders. eBuy is the common posting platform."],
                  ["Full RFQ (>$250K)", "Above $250K, agency posts RFQ on eBuy to all Schedule holders under the relevant SIN. Response period typically 30 days. Price and technical factors evaluated."],
                  ["Streamlined Award", "Awards are faster than FAR Part 15 — no source selection authority, no competitive range. Streamlined evaluation: best value to the government."],
                ].map(([step, desc]) => (
                  <div key={step} className="flex gap-3">
                    <span className="font-bold text-slate-700 text-sm w-36 flex-shrink-0">{step}</span>
                    <span className="text-gray-600 text-sm">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border-l-4 border-violet-400">
            <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Application Strategy</p>
            <p className="text-white leading-relaxed text-sm">
              GSA Schedule applications are self-service via eOffer. The most common rejection reasons: <strong className="text-violet-300">insufficient past performance (need 2 years in business)</strong>, pricing not competitive vs. commercial rates, and missing financial statements. KDT should prepare 3 past performance references at relevant scope, a complete price list for all SIN offerings, and two years of financial statements before starting the application. Plan 6–9 months from submission to award.
            </p>
          </div>
        </section>

        {/* PART 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Task Orders Work Under Schedule</h2>
          <p className="text-gray-600 mb-6">Once KDT has a GSA Schedule, revenue flows through task orders placed by individual agencies. Understanding how these orders are structured and competed is how you win on Schedule.</p>

          {/* TO Thresholds */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Schedule Order Thresholds — FAR 8.405</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Micro-Purchase (<$10K)", "Agency can buy from any Schedule holder without competition. No RFQ. Direct purchase. Common for products; less common for services."],
                ["Simplified Acquisition ($10K–$250K)", "Agency must get quotes from multiple Schedule holders (at least 3 for orders >$25K). Often posted on eBuy. Streamlined evaluation."],
                ["Above Simplified Acquisition (>$250K)", "Fair opportunity required — all Schedule holders under the relevant SIN must receive notice of the opportunity. RFQ posted on eBuy with full statement of work. Evaluation criteria specified."],
                ["Fair Opportunity Exceptions", "Like IDIQ vehicles, exceptions exist: urgency, one source uniquely capable, follow-on for continuity of services, or classified requirements."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TO Process Visual */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">GSA Schedule Task Order Process</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { stage: "RFQ Posted on eBuy", note: "To SIN holders", color: "bg-violet-100 text-violet-800 border border-violet-200" },
                { stage: "Q&A Period", note: "Clarifications", color: "bg-blue-100 text-blue-800 border border-blue-200" },
                { stage: "Quotes Due", note: "Price + technical", color: "bg-red-600 text-white" },
                { stage: "Evaluation", note: "Best value", color: "bg-purple-100 text-purple-800 border border-purple-200" },
                { stage: "Order Award", note: "SAM notice", color: "bg-green-600 text-white" },
                { stage: "Performance", note: "Invoice via WAWF", color: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
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

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-violet-900 font-semibold text-sm mb-2">Schedule vs. IDIQ Task Orders:</p>
            <p className="text-violet-800 text-sm">Schedule task orders under $250K can be awarded faster than any other procurement mechanism — sometimes within a week of RFQ posting. This speed advantage is real, and agencies use it. KDT should be set up to respond within 5 business days on any eBuy RFQ that fits the capability.</p>
          </div>
        </section>

        {/* PART 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 5</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">GSA Advantage & eBuy</h2>
          <p className="text-gray-600 mb-6">Two platforms are central to working the GSA Schedule as a vendor: <strong>GSA Advantage</strong> (catalog and direct purchase) and <strong>eBuy</strong> (competitive RFQs). Mastering both is essential for active Schedule revenue generation.</p>

          <div className="space-y-4 mb-6">
            {[
              {
                n: "1",
                title: "GSA Advantage — Your Digital Catalog",
                body: "Once on Schedule, your services are listed on GSA Advantage (gsaadvantage.gov). Agencies browse Advantage like a commercial e-commerce catalog. Your listing includes your SINs, descriptions, and prices. An accurate, well-written Advantage catalog page drives inbound interest from agency contracting officers searching for vendors. Keep it current and descriptive."
              },
              {
                n: "2",
                title: "eBuy — The RFQ Platform",
                body: "eBuy (ebuy.gsa.gov) is where agencies post formal RFQs to Schedule holders. As a Schedule holder, you log in to eBuy and see all RFQs posted under your SINs. You must actively monitor eBuy — RFQs are not emailed to you automatically. Set up email notifications in your eBuy account profile and check the platform daily during active pursuit periods."
              },
              {
                n: "3",
                title: "eBuy Monitoring Strategy",
                body: "Filter eBuy by your active SINs. Review every new RFQ within 24 hours of posting. Assess fit: does the SOW match KDT capabilities? Is the location serviceable? Is the response window sufficient? For tight-fit RFQs, prioritize. For marginal fits, evaluate competition level before investing proposal time. A no-bid notice to the agency CO is always appropriate and maintains the relationship."
              },
              {
                n: "4",
                title: "Market Intelligence via eBuy & FPDS",
                body: "Use eBuy awarded order data and FPDS (Federal Procurement Data System) to map where Schedule revenue flows in your SINs. Which agencies are buying? What values? Who are the incumbents? This intelligence shapes KDT's agency-targeting outreach strategy. The agencies spending on your SINs are the ones to build relationships with before the RFQ drops."
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Compliance</h2>
          <p className="text-gray-600 mb-6">GSA Schedule pricing is not a one-time negotiation — it is an ongoing compliance obligation. Understanding Most Favored Customer pricing, TAA requirements, and GSA audits is critical to maintaining a clean Schedule contract.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Pricing & Compliance Requirements</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Most Favored Customer (MFC) Pricing", "GSA must receive pricing equal to or better than your Most Favored Customer — the commercial customer who receives your best pricing for similar scope and volume. If you lower prices to a commercial client below your Schedule rates, you must notify GSA and reduce your Schedule pricing to match (Price Reduction clause)."],
                ["Price Reduction Clause", "GSA Schedule contracts include a Price Reduction clause. If you give a better price to your basis-of-award customer for a substantially similar purchase, you must reduce your Schedule price accordingly. Failure to do so is a Contractor Assisted Visit (CAV) finding — potentially a False Claims Act exposure."],
                ["Trade Agreements Act (TAA)", "GSA Schedule products and services must comply with the Trade Agreements Act — they must be manufactured or substantially transformed in the U.S. or a TAA-designated country. For services, the work must be performed by personnel in qualifying countries. Non-compliance = immediate suspension of affected SIN items."],
                ["Catalog Management", "Your GSA Advantage catalog must be current. Add new services by modification request. Remove discontinued items. Price changes require modification with justification. An outdated catalog generates orders you can't fulfill — a compliance and relationship problem."],
                ["Industrial Funding Fee (IFF)", "GSA charges an Industrial Funding Fee (currently 0.75% of net Schedule sales) that vendors remit quarterly. This is included in your Schedule pricing — factor it into your cost structure. Failure to report and remit IFF accurately is a compliance issue."],
                ["Contractor Assistance Visits (CAVs)", "GSA conducts periodic CAVs — essentially audits of your Schedule compliance. Reviewers examine your pricing practices, sales reporting accuracy, and contract clause adherence. Prepare by maintaining clean records of all Schedule orders, IFF payments, and pricing rationale."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-violet-200 rounded-xl p-5">
              <h4 className="font-bold text-violet-800 text-sm mb-3">GSA Schedule Advantages for KDT</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Access to all federal agencies with one contract",
                  "Streamlined ordering — faster awards than FAR Part 15",
                  "Pre-negotiated pricing builds agency confidence",
                  "GSA credential signals commercial legitimacy",
                  "Teaming and subcontracting pathways",
                  "Small business set-aside orders under Schedule",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3">Schedule Compliance Watch Points</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Monitor commercial pricing changes — Price Reduction clause",
                  "Verify TAA compliance for every SIN offering",
                  "Remit IFF quarterly — accurate sales reporting",
                  "Keep Advantage catalog current",
                  "Respond to CAV requests promptly",
                  "Document all modification requests and approvals",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-slate-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-950 to-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready for the GSA Schedule Simulation?</h2>
          <p className="text-violet-200 mb-6 text-sm">
            Practice navigating eBuy RFQs, writing Schedule quotes, and managing Schedule compliance in a realistic environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?vehicle=gsa&ready=true"
              className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Begin GSA Schedule Simulation →
            </Link>
            <Link
              href="/modules/gsa-training"
              className="inline-block bg-transparent border border-violet-400 hover:border-violet-200 text-violet-300 hover:text-violet-100 font-medium py-3 px-6 rounded-lg transition-colors text-sm"
            >
              GSA Training First →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
