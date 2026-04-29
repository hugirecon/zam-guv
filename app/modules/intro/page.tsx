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
            {/* Skip button in header */}
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

      {/* Already-completed banner */}
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
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>15–20 minutes</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required to read</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-blue-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-200 uppercase tracking-wide text-sm">Welcome</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              Before you touch the simulation, read this. It will take 15–20 minutes and will make the difference between a strong assessment and a wasted one.
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

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Portals & Systems</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["SAM.gov", "System for Award Management. Official federal portal. Every company doing federal business must be registered here."],
                  ["DSBS", "Dynamic Small Business Search. SBA directory used by contracting officers to find small businesses."],
                  ["eBuy / GSA eBuy", "GSA's RFQ tool for Schedule contractors."],
                  ["FPDS", "Federal Procurement Data System. Database of all federal awards. Used for market research."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Contract Identifiers</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Solicitation Number", "Unique ID for a specific opportunity (e.g. W15P7T-25-R-0012). On every Zam.guv listing."],
                  ["NAICS Code", "6-digit industry classification. Agency assigns one per opportunity. KDT must hold the code to be competitive."],
                  ["PSC Code", "4-character Product Service Code. More granular than NAICS. Heavy in defense."],
                  ["CAGE Code", "5-character company identifier from DLA. Required for DoD contracting."],
                  ["UEI", "12-character Unique Entity Identifier. Replaced DUNS in 2022. Your primary SAM.gov ID."],
                  ["DUNS", "Predecessor to UEI. Phased out but still referenced."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Contract Types</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["FFP", "Firm Fixed Price. Set price, government pays regardless of your costs. Most common."],
                  ["T&M", "Time & Materials. Billed by actual labor hours + materials. Used when scope is uncertain."],
                  ["CPFF", "Cost Plus Fixed Fee. Government reimburses costs + fixed profit. Requires DCAA-compliant accounting."],
                  ["IDIQ", "Umbrella vehicle for task orders over time (typically 5 years). Getting on an IDIQ = pre-approved vendor status."],
                  ["BPA", "Blanket Purchase Agreement. Pre-negotiated agreement for recurring purchases, typically under GSA Schedule."],
                  ["Task Order", "Specific order placed against an IDIQ or BPA."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Solicitation Types</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["RFP", "Request for Proposal. Most formal. Full technical + price proposals required."],
                  ["RFQ", "Request for Quotation. Less formal. Used for simpler/lower-value buys."],
                  ["Sources Sought / RFI", "Market research only. No award. Responding builds positioning."],
                  ["Notice Types", "Presolicitation → Combined Synopsis → Award Notice → Intent to Sole Source"],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-amber-700 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Set-Asides — If KDT doesn&apos;t hold the cert, you cannot bid</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["SDVOSB", "Service-Disabled Veteran-Owned Small Business"],
                  ["VOSB", "Veteran-Owned Small Business"],
                  ["8(a)", "SBA disadvantaged business program"],
                  ["WOSB", "Woman-Owned Small Business"],
                  ["HUBZone", "Historically Underutilized Business Zone"],
                  ["SB", "General Small Business set-aside"],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Proposal & Performance Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["PWS", "Performance Work Statement. Outcomes-focused scope document."],
                  ["SOW", "Statement of Work. Task-focused, more prescriptive."],
                  ["Past Performance", "Record of prior contract work. Heavily weighted. KDT addresses gaps through teaming."],
                  ["Teaming Agreement", "Prime + sub arrangement. Lets newer companies leverage established partners' past performance."],
                  ["LPTA", "Lowest Price Technically Acceptable. Price wins if you meet minimums."],
                  ["Best Value", "Technical merit + past performance + price all weighed. Better approach can beat lower price."],
                  ["DCAA", "Defense Contract Audit Agency. Required for cost-reimbursable contracts."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-700 px-6 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">KDT-Specific Terms</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["VP Focus", "As a KDT VP, you're responsible for opportunity identification and pursuit within a defined vertical/market. In the simulation, you're functioning in that role — identifying fits, making bid/no-bid calls, writing proposals. Your performance here reflects how you'd perform in the actual role."],
                  ["KDT Verticals", "Defense services, private security, cybersecurity, logistics, construction, supply/equipment."],
                  ["Bid/No-Bid Decision", "Formal go/no-go on a specific opportunity. Factors: NAICS fit, set-aside eligibility, past performance, capability, value of pursuit."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-36 flex-shrink-0">{term}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Read a Contract Listing</h2>
          <p className="text-gray-600 mb-6">Check these fields in order — don&apos;t read every word on every listing, scan these key fields first.</p>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {[
              ["1", "Title & Description", "What is the government actually buying?"],
              ["2", "NAICS Code", "Does KDT hold this?"],
              ["3", "Set-Aside", "Can KDT compete?"],
              ["4", "Contract Type", "FFP, T&M, IDIQ?"],
              ["5", "Period of Performance", "How long?"],
              ["6", "Place of Performance", "Can KDT operate there?"],
              ["7", "Response Deadline", "How much time?"],
              ["8", "Evaluation Criteria", "LPTA or Best Value?"],
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
          <p className="text-gray-600 mb-6">Your session is AI-scored on four dimensions. These are the same dimensions KDT uses on real proposals. Write like you mean to win.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { num: "01", title: "Strategic Clarity", desc: "Did you pick the right opportunities?" },
              { num: "02", title: "Persuasion", desc: "Is your writing compelling to a government evaluator?" },
              { num: "03", title: "Technical Credibility", desc: "Does your proposal show real understanding of the requirement?" },
              { num: "04", title: "Competitive Awareness", desc: "Did you address set-asides, eval criteria, competitive factors?" },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-3xl font-black text-gray-100 mb-2">{num}</p>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — Module 1 Complete */}
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
          /* Not logged in — show static link */
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
