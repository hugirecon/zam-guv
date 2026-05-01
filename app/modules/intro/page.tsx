"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Progress {
  currentModule: number;
  module1Done: boolean;
  module2Done: boolean;
  module3Done: boolean;
}

export default function IntroPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    fetch("/api/user/progress", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setProgress(data))
      .catch(() => setProgress(null));
  }, []);

  const handleAdvance = async (action: "complete" | "skip") => {
    setAdvancing(true);
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action }),
      });
      router.push("/vp");
    } catch {
      setAdvancing(false);
    }
  };

  const isAlreadyDone = progress?.module1Done || (progress?.currentModule ?? 1) > 1;

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
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 01</span>
            <span className="text-sm text-gray-500 hidden sm:block">KDT GovCon Introduction</span>
            {progress && !isAlreadyDone && (
              <button
                onClick={() => handleAdvance("skip")}
                disabled={advancing}
                className="text-xs text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {advancing ? "…" : "Skip →"}
              </button>
            )}
            {isAlreadyDone && (
              <Link href="/vp" className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors">
                ← Return to where I left off
              </Link>
            )}
          </div>
        </div>
      </header>

      {isAlreadyDone && (
        <div className="bg-emerald-50 border-b border-emerald-200">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 text-sm">✓</span>
              <span className="text-emerald-800 text-sm font-medium">You&apos;ve completed this module.</span>
            </div>
            <Link href="/vp" className="text-emerald-700 hover:text-emerald-900 text-sm font-semibold underline">
              Go to Module 2 →
            </Link>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 01</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">KDT GovCon Introduction</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>20–25 minutes</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required to read</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-blue-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-200 uppercase tracking-wide text-sm">Welcome</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              Before you touch the simulation, read this. It will take 20–25 minutes and will make the difference between a strong assessment and a wasted one.
            </p>
            <p className="text-blue-200 leading-relaxed mb-4">
              Zam.guv is a realistic government contracting simulation portal built by Knight Division Tactical. It mirrors the real SAM.gov environment where the U.S. federal government posts contract opportunities. In the simulation, you will have <strong className="text-white">30 minutes</strong> to:
            </p>
            <ol className="text-blue-100 space-y-2 list-none">
              {[
                "Browse 52 active contract opportunities across multiple industries",
                "Identify which opportunities align with KDT's capabilities",
                "Write and submit proposals for the opportunities you pursue",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-6 border-t border-blue-800">
              <p className="text-amber-300 font-semibold">
                ⚠️ Your session is tracked. Every contract you view, every decision you make, and every proposal you submit is recorded and AI-scored. This is an assessment — treat it like one.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The GovCon Landscape</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Government contracting (GovCon) is the process by which federal agencies procure goods and services from private companies. The federal government spends over <strong>$700 billion annually</strong> — from cybersecurity to construction to private security. For KDT, government contracts are a primary revenue pathway.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="text-emerald-800 font-medium">
                Federal agencies post opportunities on <strong>SAM.gov</strong> (System for Award Management) — the official portal for every solicitation. Zam.guv simulates this with 52 realistic listings across KDT&apos;s core verticals.
              </p>
            </div>

            {/* KDT Example Callout */}
            <div className="bg-slate-900 rounded-xl p-6 my-6 border-l-4 border-amber-400">
              <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Real-World Example</p>
              <p className="text-white leading-relaxed text-sm">
                A federal agency needs armed security guards at a military installation. They post an RFP on SAM.gov under <strong className="text-amber-300">NAICS 561612</strong> (Security Guards and Patrol Services). KDT sees the listing, makes a bid/no-bid decision based on set-aside eligibility, location, contract value, and capability match. If the decision is &ldquo;pursue,&rdquo; KDT submits a proposal within the deadline. If awarded, KDT is now a <strong className="text-amber-300">prime contractor</strong> on a federal security services contract — a direct revenue vehicle.
              </p>
            </div>

            {/* Market snapshot visual */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">Federal Market Overview — Key Agency Buyers for KDT</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["DoD / Military", "$400B+/yr", "Security services, logistics, training, construction, tech"],
                  ["DHS", "$25B+/yr", "Border security, cyber, infrastructure protection, guard services"],
                  ["DOS (State Dept)", "$15B+/yr", "Diplomatic security, overseas protective services, logistics"],
                  ["DOJ / FBI", "$10B+/yr", "Investigations support, security, IT, training"],
                  ["VA", "$20B+/yr", "Healthcare, IT, facility security, construction"],
                ].map(([agency, spend, scope]) => (
                  <div key={agency} className="px-6 py-4 flex items-start gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{agency}</span>
                    <span className="text-emerald-700 font-bold text-sm w-24 flex-shrink-0">{spend}</span>
                    <span className="text-gray-500 text-sm">{scope}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Core GovCon Terminology</h2>

          <div className="space-y-8">

            {/* Portals & Systems */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Portals & Systems</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["SAM.gov", "System for Award Management. Official federal portal. Every company doing federal business must be registered here. Search here to find real contract opportunities."],
                  ["DSBS", "Dynamic Small Business Search. SBA directory used by contracting officers to find small businesses for set-aside opportunities."],
                  ["eBuy / GSA eBuy", "GSA's RFQ tool for Schedule contractors. Used for orders against GSA Multiple Award Schedules."],
                  ["FPDS", "Federal Procurement Data System. Database of all federal awards. Used for competitive intelligence — see what your competitors won and at what price."],
                  ["beta.SAM.gov", "The modernized version of SAM.gov. Same data, better search. This is what you'll actually use day-to-day."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Identifiers */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Contract Identifiers</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Solicitation Number", "Unique ID for a specific opportunity. Format varies by agency — e.g. W15P7T-25-R-0012 (Army), FA8617-26-R-0021 (Air Force). Every Zam.guv listing has one."],
                  ["NAICS Code", "6-digit industry classification. Agency assigns one per opportunity. Example: NAICS 561612 = Security Guards and Patrol Services. KDT must hold the code and meet the size standard to be eligible."],
                  ["PSC Code", "4-character Product Service Code. More granular than NAICS. Heavy in defense procurement. Example: PSC U099 = Other Education and Training."],
                  ["CAGE Code", "5-character company identifier from DLA. Required for DoD contracting. Think of it as your DoD business ID card."],
                  ["UEI", "12-character Unique Entity Identifier. Replaced DUNS in 2022. Your primary SAM.gov registration ID — required before you can receive any federal award."],
                  ["DUNS", "Predecessor to UEI. Phased out April 2022 but still referenced in older documents."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Types */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Contract Types</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["FFP", "Firm Fixed Price. Set price, government pays regardless of your actual costs. Most common type in services. Profit/loss is 100% on you."],
                  ["T&M", "Time & Materials. Billed by actual labor hours + materials at negotiated rates. Used when scope is uncertain — e.g., ongoing investigation support where the number of hours isn't predictable."],
                  ["CPFF", "Cost Plus Fixed Fee. Government reimburses all allowable costs plus a pre-negotiated fee. Used for R&D, complex system development. Requires DCAA-compliant accounting system."],
                  ["IDIQ", "Indefinite Delivery, Indefinite Quantity. Umbrella vehicle for task orders over time (typically 5 years). Getting on an IDIQ = pre-approved vendor. Work flows via individual Task Orders competed among holders."],
                  ["BPA", "Blanket Purchase Agreement. Pre-negotiated agreement for recurring purchases, typically under a GSA Schedule. Faster ordering, less paperwork per transaction."],
                  ["Task Order", "Specific order placed against an IDIQ or BPA. Has its own scope, price, and period of performance. IDIQ holders compete for Task Orders."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
              {/* Contract type example callout */}
              <div className="bg-slate-50 border-t border-gray-200 px-6 py-4">
                <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-2">📌 Example</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  KDT provides armed security guards at a DoD facility. Under <strong>FFP</strong>: KDT bills $65/hr per guard — fixed. If a guard works overtime, that&apos;s KDT&apos;s cost, not the government&apos;s. Under <strong>T&M</strong>: KDT bills the actual hours worked at a negotiated rate of $68/hr, and the government pays for exactly what was used — KDT can&apos;t lose money if scope grows, but profit margins are capped.
                </p>
              </div>
              {/* Contract Type Visual Comparison */}
              <div className="bg-slate-900 px-6 py-5 border-t border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contract Type Quick Comparison</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: "FFP", risk: "🟢 Low", scope: "Defined", when: "Guard services, equipment", color: "bg-green-900/40 border-green-700" },
                    { type: "T&M", risk: "🟡 Medium", scope: "Evolving", when: "Consulting, investigations, IT", color: "bg-yellow-900/40 border-yellow-700" },
                    { type: "CPFF", risk: "🔴 High", scope: "Uncertain", when: "R&D, system integration", color: "bg-red-900/40 border-red-700" },
                  ].map(({ type, risk, scope, when, color }) => (
                    <div key={type} className={`${color} border rounded-lg p-4`}>
                      <p className="font-black text-white text-xl mb-3">{type}</p>
                      <div className="space-y-2 text-xs">
                        <div><span className="text-slate-400">Your risk: </span><span className="text-white">{risk}</span></div>
                        <div><span className="text-slate-400">Scope: </span><span className="text-white">{scope}</span></div>
                        <div><span className="text-slate-400">Used for: </span><span className="text-slate-300">{when}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Solicitation Types */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Solicitation Types</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["RFP", "Request for Proposal. Most formal. Full technical proposal + price/cost volumes required. Used for complex services and major acquisitions. This is what you'll see most on Zam.guv."],
                  ["RFQ", "Request for Quotation. Less formal. Price quote + brief capability statement. Typically used for simpler, lower-value buys under the simplified acquisition threshold ($250K)."],
                  ["Sources Sought / RFI", "Market research only — no award will result. Government is checking what companies exist and what they can do. Responding gets you on the CO's radar before the formal RFP drops."],
                  ["Pre-Solicitation", "Advance notice that an RFP is coming. Not yet released — but now you know to prepare."],
                  ["Combined Synopsis/Solicitation", "Single document that serves as both the announcement and the solicitation. Common for commercial item buys under FAR Part 12."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
              {/* Lifecycle visual */}
              <div className="bg-white border-t border-gray-200 px-6 py-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Typical Solicitation Lifecycle</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { stage: "Sources Sought", note: "Market research", color: "bg-gray-100 text-gray-700 border border-gray-300" },
                    { stage: "Pre-Sol Notice", note: "RFP is coming", color: "bg-blue-100 text-blue-800 border border-blue-200" },
                    { stage: "RFP Released", note: "Q&A opens", color: "bg-blue-600 text-white" },
                    { stage: "Q&A Closes", note: "Last questions", color: "bg-amber-100 text-amber-800 border border-amber-200" },
                    { stage: "Amendment(s)", note: "Scope clarified", color: "bg-orange-100 text-orange-800 border border-orange-200" },
                    { stage: "Proposals Due", note: "Submit or out", color: "bg-red-600 text-white" },
                    { stage: "Evaluations", note: "Weeks to months", color: "bg-purple-100 text-purple-800 border border-purple-200" },
                    { stage: "Award", note: "SAM.gov notice", color: "bg-green-600 text-white" },
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
            </div>

            {/* Set-Asides */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-amber-700 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Set-Asides — If KDT doesn&apos;t hold the cert, skip immediately. No exceptions.</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["SDVOSB", "Service-Disabled Veteran-Owned Small Business. Veterans with service-connected disabilities. DoD contracts use this heavily."],
                  ["VOSB", "Veteran-Owned Small Business. Broader veteran category. Less common as a standalone set-aside than SDVOSB."],
                  ["8(a)", "SBA Business Development Program. Socially and economically disadvantaged businesses. 9-year program with solo-source authority."],
                  ["WOSB / EDWOSB", "Woman-Owned Small Business / Economically Disadvantaged WOSB. Limited to specific NAICS codes where women are underrepresented."],
                  ["HUBZone", "Historically Underutilized Business Zone. Principal office + 35% of employees must be in a designated HUBZone area."],
                  ["SB", "General Small Business set-aside. Most common. Any company that meets the size standard for that NAICS code qualifies."],
                  ["Unrestricted / Full & Open", "No set-aside. Any company can bid. Large businesses dominate these — KDT competes on merit."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
                <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-2">📌 Example</p>
                <p className="text-amber-900 text-sm leading-relaxed">
                  A DoD contract is set aside exclusively for <strong>SDVOSB</strong>. Only companies with SDVOSB certification in SAM.gov can submit a proposal. The contracting officer cannot accept a bid from a non-certified company — it will be rejected without review. If KDT doesn&apos;t hold SDVOSB: move on immediately. Time spent writing that proposal is time wasted.
                </p>
              </div>
            </div>

            {/* Key Roles & Personnel — NEW */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-indigo-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Key Roles & Personnel</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["CO / KO", "Contracting Officer. The only person legally authorized to sign, modify, or terminate a federal contract. Every acquisition has one. If it didn't come from the CO, it's not official."],
                  ["PCO", "Procuring Contracting Officer. CO responsible for awarding new contracts. Runs the competition you're responding to."],
                  ["ACO", "Administrative Contracting Officer. CO responsible for managing contracts after award — modifications, invoicing, closeout."],
                  ["COR / COTR", "Contracting Officer's Representative (or Technical Representative). The agency's day-to-day technical point of contact after award. They monitor your performance, not the CO. Build the relationship here."],
                  ["PM", "Program Manager (agency side). Owns the requirement — the person who actually needs what you're providing. Often the one who originated the requirement."],
                  ["DCAA Auditor", "Defense Contract Audit Agency. Audits contractor accounting systems and cost proposals on cost-type contracts. If you bid CPFF, expect DCAA involvement."],
                  ["SBA PCR", "SBA Procurement Center Representative. SBA official who advocates for small business opportunities at major agencies. Can push for set-asides."],
                  ["CO's Legal Counsel", "Agency attorney who advises on protests, conflicts of interest, and contract disputes. You won't interact directly, but their opinions shape decisions."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Lifecycle & Process — NEW */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-teal-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Contract Lifecycle & Process Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Sources Sought / RFI", "Government market research notice. Respond to show capability and get on the CO's radar before the formal RFP. No award results — purely intelligence gathering for both sides."],
                  ["Q&A Period", "Window after RFP release where offerors can submit questions. Government responds via Amendment. Example: 'Can subcontractors hold the required clearances?' — if you don't ask, you don't know."],
                  ["Amendment", "Official modification to the RFP. Changes scope, pricing requirements, response date, or clarifies questions. Always read every amendment — they can completely change whether you bid."],
                  ["Oral Presentation", "Some acquisitions require an in-person or virtual presentation to the evaluation board before or after written proposal. High-stakes — usually reserved for high-value contracts."],
                  ["BAFO", "Best and Final Offer. Government may request a BAFO after initial proposal review to allow offerors to revise price and/or technical approach. This is your last shot — price aggressively."],
                  ["Option Year", "Government's contractual right to extend performance for an additional year at pre-negotiated terms. Standard structure: 1 base year + 4 option years (5 total). Government doesn't have to exercise them — they can cancel."],
                  ["Recompete", "When an existing contract expires and the requirement goes back out for competition. The incumbent (current contractor) has an advantage — they know the work. The challenge: unseat them with a superior offer."],
                  ["Incumbent", "The current contractor holding the work. Hardest competitor to beat. They have past performance, established relationships, and institutional knowledge. Your proposal must show clearly why you're worth the transition risk."],
                  ["Award Notice", "SAM.gov notice announcing contract award. Shows winner, award amount, and NAICS code. Study your competitors' award notices to understand pricing and win strategy."],
                  ["Protest", "Formal legal challenge to an award decision filed with GAO or the Court of Federal Claims. Any offeror can protest. Government must respond within 100 days (GAO)."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
              <div className="bg-teal-50 border-t border-teal-200 px-6 py-4">
                <p className="text-xs font-black text-teal-800 uppercase tracking-widest mb-2">📌 Example</p>
                <p className="text-teal-900 text-sm leading-relaxed">
                  DHS has an IDIQ for security services — <strong>5-year, $50M ceiling</strong>. Getting on this vehicle means KDT is a pre-approved vendor. Individual task orders (e.g., &ldquo;armed guards at the Port of Baltimore for 12 months, $1.2M&rdquo;) are then competed only among IDIQ holders. Getting on the vehicle is the hard part. After that, every task order is an opportunity.
                </p>
              </div>
            </div>

            {/* Financial Terms — NEW */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-emerald-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Financial & Pricing Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["CLIN", "Contract Line Item Number. Every deliverable or service gets its own CLIN with its own price. Example: CLIN 0001 = Base Year Guard Services ($480K), CLIN 0002 = Option Year 1 Guard Services ($495K), CLIN 0003 = Travel & ODC ($15K)."],
                  ["BOE", "Basis of Estimate. Justification document showing how you calculated your price for each CLIN. On cost-type contracts, the government audits this. On FFP, it's internal — but you need it to price accurately."],
                  ["Wrap Rate", "Fully-loaded hourly labor rate including all indirect costs. Example: Guard's direct salary = $22/hr. Add fringe (benefits), overhead, G&A, and fee — wrap rate might land at $65–$72/hr billed to government."],
                  ["Indirect Rates", "Costs not tied to a specific contract — G&A (corporate overhead), fringe (benefits), facilities overhead. Applied as a percentage on top of direct costs. Example: 25% fringe + 12% overhead + 8% G&A on a $22/hr labor rate."],
                  ["G&A", "General & Administrative. Corporate overhead costs (HR, accounting, legal, executive salaries) spread across all contracts as a percentage."],
                  ["Fee / Profit", "Your profit margin on a contract. On FFP, fee is implicit (built into your price). On CPFF, fee is explicitly negotiated — typically 6–12% of estimated cost."],
                  ["DCAA-Compliant Accounting", "Accounting system that meets government audit standards. Required for cost-reimbursable contracts. Without it, you cannot bid CPFF or CPAF contracts — period."],
                  ["Price-to-Win (PTW)", "Competitive intelligence analysis to determine the price you need to submit to win. Uses FPDS data, incumbent pricing, and competitive landscape analysis."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Framework — NEW */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-700 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Regulatory Framework</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["FAR", "Federal Acquisition Regulation. The master rulebook for all U.S. federal procurement. Every agency follows it. If a solicitation says 'FAR 52.212-4 applies,' that clause governs your contract terms."],
                  ["DFARS", "Defense Federal Acquisition Regulation Supplement. DoD-specific rules layered on top of FAR. Adds requirements for cybersecurity (CMMC), IP rights, counterfeit parts, and more. Every DoD contract references DFARS."],
                  ["FAR Part 15", "Contracting by Negotiation. Governs competitive acquisitions where proposals are evaluated and negotiated. Most complex services contracts are procured under Part 15."],
                  ["FAR Part 12", "Commercial Items. Streamlined process for buying commercial products/services. Fewer government-specific clauses, faster awards. Preferred when the requirement can be met commercially."],
                  ["FAR Part 8", "Required Sources. Governs GSA Schedule (MAS) orders. Agencies must consider Schedule before other methods for commercial items."],
                  ["NDAA", "National Defense Authorization Act. Annual law authorizing DoD funding and setting contracting policy. Shapes priorities, set-aside requirements, and cybersecurity mandates for the entire DoD market each year."],
                  ["CMMC", "Cybersecurity Maturity Model Certification. DoD requirement for contractors handling Controlled Unclassified Information (CUI). As of 2025, required on most DoD contracts. KDT must understand its level requirements."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposal & Performance Terms */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Proposal & Performance Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["PWS", "Performance Work Statement. Outcomes-focused scope document — government tells you what they want achieved, not how. Gives contractors flexibility in approach. Common in service contracts."],
                  ["SOW", "Statement of Work. Task-focused, prescriptive — government tells you exactly what tasks to perform. Less flexibility than PWS but clearer scope."],
                  ["Past Performance", "Record of prior contract work. Heavily weighted in Best Value evaluations. If KDT is new to federal contracting, address gaps through teaming with an experienced prime."],
                  ["Teaming Agreement", "Formal agreement between a prime contractor and subcontractor(s). Lets KDT leverage a partner's past performance, clearances, or certifications to strengthen a proposal it couldn't win alone."],
                  ["LPTA", "Lowest Price Technically Acceptable. The lowest-priced proposal that meets all minimum requirements wins — period. Technical superiority doesn't matter beyond the threshold. Price aggressively."],
                  ["Best Value", "Technical merit + past performance + price are all evaluated and weighed. A superior technical approach can justify a higher price. Write to win, not just to comply."],
                  ["Volume", "Distinct section of a proposal. Standard structure: Volume 1 = Technical, Volume 2 = Management, Volume 3 = Past Performance, Volume 4 = Price/Cost. Each has its own page limit."],
                  ["Executive Summary", "Opening section of your technical volume. The evaluation board reads this first. If it's weak, the impression carries through. Make it sharp."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KDT-Specific Terms */}
            <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-700 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">KDT-Specific Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["VP Focus", "As a KDT VP, you're responsible for opportunity identification and pursuit within your vertical/market. In the simulation, you're functioning in that role — identifying fits, making bid/no-bid calls, writing proposals. Your performance here reflects how you'd perform in the actual role."],
                  ["KDT Verticals", "Defense services, private security (armed/unarmed), cybersecurity, logistics, construction, supply chain / equipment procurement."],
                  ["Bid/No-Bid Decision", "Formal go/no-go on a specific opportunity. Run the 4-question framework: (1) Are we eligible? (2) Can we do the work? (3) Is the value worth the pursuit cost? (4) Can we win?"],
                  ["Prime Contractor", "The company holding the direct contract with the government. Responsible for all performance, even if using subcontractors. KDT pursues prime roles."],
                  ["Sub-Contractor", "Company supporting a prime. Takes direction from prime, not directly from government. Useful for KDT to break into markets through established primes before going prime independently."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-40 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* PART 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Read a Contract Listing</h2>
          <p className="text-gray-600 mb-8">Don&apos;t read every word on every listing. Scan these key fields in order — if any are disqualifying, stop and move on. Time is your scarcest resource in the simulation.</p>

          {/* Annotated Sample Listing */}
          <div className="bg-white border-2 border-blue-300 rounded-2xl overflow-hidden shadow-lg mb-8">
            <div className="bg-blue-900 text-white px-6 py-3 flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest">📋 Example Contract Listing — Annotated</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-1">FA8617-26-R-0021 · Posted 2026-04-15 · AMENDMENT 0002</p>
                  <h3 className="text-xl font-bold text-gray-900">Protective Security Detail Services — Eglin AFB, FL</h3>
                  <p className="text-sm text-blue-700 font-semibold mt-1">Department of the Air Force · Air Force Materiel Command</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 whitespace-nowrap">● Active</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Contract Type</p>
                  <p className="font-bold text-gray-900 text-sm">FFP</p>
                  <p className="text-xs text-gray-400">Firm Fixed Price</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Est. Value</p>
                  <p className="font-bold text-gray-900 text-sm">$2.4M–$3.1M</p>
                  <p className="text-xs text-gray-400">5-year period</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">NAICS Code</p>
                  <p className="font-bold text-gray-900 text-sm">561612</p>
                  <p className="text-xs text-gray-400">Security Guards</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-600 mb-1">Set-Aside ⚠️</p>
                  <p className="font-bold text-red-800 text-sm">SDVOSB</p>
                  <p className="text-xs text-red-500">Cert required</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-sm">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Security Clearance</p>
                  <p className="font-semibold text-gray-800">Secret</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Response Deadline</p>
                  <p className="font-semibold text-gray-800">2026-05-30 · 14:00 EST</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Eval Method</p>
                  <p className="font-semibold text-gray-800">Best Value (LPTA)</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Description:</strong> Provide armed protective security detail (PSD) services for senior flag officers and civilian equivalents at Eglin AFB, FL. Services include threat assessment, advance work, motorcade operations, and 24/7 rotating coverage. All personnel must hold active Secret clearance. 1 base year + 4 option years.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border-t-2 border-amber-300 px-6 py-5">
              <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-4">🔍 Apply the 8-Step Framework to This Listing</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["1", "SDVOSB set-aside", "First check. If KDT doesn't hold SDVOSB cert — skip immediately. Time is zero-sum."],
                  ["2", "NAICS 561612", "Security Guards. KDT's core vertical. Strong capability match — flag as Pursue candidate."],
                  ["3", "FFP contract type", "Fixed price. KDT prices per guard per hour. Defined scope = manageable risk."],
                  ["4", "Secret clearance required", "All guards need active Secret clearance. Does KDT's workforce carry this? Factor into bid decision."],
                  ["5", "$2.4M–$3.1M / 5 yr", "~$500K/year. Worth pursuing if guards can be staffed at 15–20% margin."],
                  ["6", "Eglin AFB, FL", "Can KDT source and staff this location? Local workforce availability matters."],
                  ["7", "Best Value (LPTA)", "Lowest price that meets minimums wins. Price aggressively — technical writing effort is secondary here."],
                  ["8", "Due 2026-05-30", "30 days. Check for Q&A deadline (usually 14 days before response). Note Amendment 0002 exists — read it."],
                ].map(([num, label, note]) => (
                  <div key={num} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">{num}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{label}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 8-step checklist */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-800 px-6 py-3">
              <p className="text-white font-semibold text-sm uppercase tracking-wide">The 8-Step Scanning Framework</p>
            </div>
            {[
              ["1", "Title & Description", "What is the government actually buying? Does it match KDT's capabilities?"],
              ["2", "NAICS Code", "Does KDT hold this code? Are we within the size standard?"],
              ["3", "Set-Aside", "Can KDT legally compete? What cert does this require?"],
              ["4", "Contract Type", "FFP, T&M, IDIQ — what are the financial mechanics?"],
              ["5", "Period of Performance", "Base year + options. How long is the commitment?"],
              ["6", "Place of Performance", "Can KDT operate, staff, and support this location?"],
              ["7", "Response Deadline", "How much time to build a competitive proposal?"],
              ["8", "Evaluation Criteria", "LPTA (price wins) or Best Value (merit matters)?"],
            ].map(([num, label, question]) => (
              <div key={num} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-500 text-sm">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART 4 */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;re Being Assessed On</h2>
          <p className="text-gray-600 mb-6">Your session is AI-scored on four dimensions. These are the same dimensions KDT uses on real proposals. Write like you mean to win — vague, generic proposals score low. Specific, well-reasoned proposals score high.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { num: "01", title: "Strategic Clarity", desc: "Did you pick the right opportunities? Did you pass on contracts KDT can't win? Quality of bid/no-bid reasoning matters more than volume." },
              { num: "02", title: "Persuasion", desc: "Is your writing compelling to a government evaluator? Does it speak to their requirements, not just KDT's capabilities? Government evaluators score against a rubric — write to that rubric." },
              { num: "03", title: "Technical Credibility", desc: "Does your proposal show real understanding of the requirement? Can you demonstrate how KDT will deliver — not just that KDT can? Specific methodologies, tools, and personnel plans score higher." },
              { num: "04", title: "Competitive Awareness", desc: "Did you address set-asides, eval criteria, and competitive factors explicitly? Acknowledging LPTA means pricing tight. Best Value means investing in technical narrative. Know the game before you play." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-3xl font-black text-gray-100 mb-2">{num}</p>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* What good looks like */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">What a High-Scoring Proposal Looks Like</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4">
                <p className="text-green-400 font-bold text-sm mb-2">✓ Strong</p>
                <p className="text-green-100 text-sm leading-relaxed italic">
                  &ldquo;KDT will deploy a 12-person armed PSD team with a minimum Secret clearance across three rotating shifts. All team members are prior military with 4+ years protective detail experience. Our Post Commander, [Name], managed a 24-person detail at Bagram AB under FA4890-21-C-0034. We will achieve a 99.5% post-fill rate through our 3-person bench roster and a 4-hour callout protocol.&rdquo;
                </p>
              </div>
              <div className="bg-red-900/40 border border-red-700 rounded-xl p-4">
                <p className="text-red-400 font-bold text-sm mb-2">✗ Weak</p>
                <p className="text-red-100 text-sm leading-relaxed italic">
                  &ldquo;Knight Division Tactical is a security company with extensive experience providing security services to government clients. We are highly qualified to perform this contract and will ensure all requirements are met to the highest standard. Our team of experienced professionals will deliver superior results.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        {progress && !isAlreadyDone ? (
          <div className="bg-gradient-to-r from-blue-950 to-slate-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Ready for Module 2?</h2>
            <p className="text-blue-200 mb-6 text-sm">
              Next up: the full process walkthrough. You&apos;ll use Zam.guv hands-on — no timer, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleAdvance("complete")}
                disabled={advancing}
                className="inline-block bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                {advancing ? "Saving…" : "Mark Complete & Proceed to Module 2 →"}
              </button>
              <button
                onClick={() => handleAdvance("skip")}
                disabled={advancing}
                className="inline-block bg-transparent border border-blue-400 hover:border-blue-200 disabled:opacity-50 text-blue-300 hover:text-blue-100 font-medium py-3 px-6 rounded-lg transition-colors text-sm"
              >
                Skip Module 2 → Go straight to Simulation
              </button>
            </div>
          </div>
        ) : isAlreadyDone ? (
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Module 1 Complete ✓</h2>
            <p className="text-emerald-200 mb-6 text-sm">
              You&apos;ve already completed this module. Continue where you left off.
            </p>
            <Link
              href="/vp"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              ← Return to Training Portal
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-950 to-slate-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Ready for Module 2?</h2>
            <p className="text-blue-200 mb-6 text-sm">
              Next up: the full process walkthrough. You&apos;ll use Zam.guv hands-on — no timer, no pressure.
            </p>
            <Link
              href="/modules/training"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Proceed to Module 2 →
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}
