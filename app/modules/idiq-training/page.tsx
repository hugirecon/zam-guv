import Link from "next/link";

export const metadata = {
  title: "Module 04 Training — IDIQ Task Order Training | Zam.guv",
};

export default function IDIQTrainingPage() {
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
            <span className="text-sm text-gray-500 hidden sm:block">IDIQ Task Order Training</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <p className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 04</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">IDIQ Task Order Training</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>Guided walkthrough — Task Order focus</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>No timer</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>Login required</span>
          </div>
          {/* Training mode launch banner */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-indigo-900 mb-1">IDIQ Training Mode — Timer Disabled</h2>
              <p className="text-indigo-700 text-sm mb-3">
                Work through Task Order identification, bid/no-bid analysis, and proposal writing without time pressure. Use the IDIQ vehicle context to practice decisions you&apos;ll make on the live simulation.
              </p>
              <Link
                href="/login?vehicle=idiq&mode=training"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
              >
                Launch IDIQ Training Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-6">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-4">Overview</h2>
            <p className="text-white leading-relaxed mb-4">
              This training module focuses specifically on the Task Order process within IDIQ vehicles. By the end, you&apos;ll know how to find IDIQ task order opportunities, make a rigorous bid/no-bid call, write a competitive TO proposal, and navigate IDIQ-specific submission requirements.
            </p>
            <p className="text-slate-400 text-sm mb-4">Work through each stage in the IDIQ training portal as you read. You are not being timed yet.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["FINDING TOs", "BID/NO-BID", "WRITING THE TO PROPOSAL", "SUBMISSION"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  {i > 0 && <span className="text-slate-600">→</span>}
                  <span className="bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STAGE 1 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 1</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding IDIQ Task Order Opportunities</h2>
          <p className="text-gray-500 mb-6">Task Orders under IDIQ vehicles are not always posted publicly — they go directly to vehicle holders. But there are multiple sources where KDT can find and track TO activity.</p>

          <div className="space-y-3 mb-6">
            {[
              { n: "1", text: "eBuy (GSA) — For GSA Schedule and OASIS+ TOs. GSA's online portal where COs issue TO solicitations to pre-qualified holders. Requires active Schedule/vehicle status to view and respond. Log in daily during active pursuits." },
              { n: "2", text: "SAM.gov Task Orders — Post-award Task Order notices are publicly posted on SAM.gov under contract award notices. Use these for competitive intelligence: who won, at what value, for which agency. Filter by NAICS + contract type 'IDIQ' + award type 'Task Order'." },
              { n: "3", text: "Agency Portals — NAVSEA SeaPort-NxG portal, Army single-face portals, DISA ENCORE III portal. Each IDIQ vehicle has its own digital environment for posting TOs to holders. Know which portals are relevant to your active vehicles." },
              { n: "4", text: "Contracting Officer Relationships — COs will notify holders directly via email for time-sensitive TOs, especially on smaller vehicles. Build relationships with COs managing IDIQs you're on. Be responsive — slow responses to TOs damage your standing." },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-4">
            <p className="text-indigo-800 font-semibold text-sm mb-2">🎯 Target: Check eBuy and agency portals every business day once on a vehicle. Missed TO solicitations cannot be recovered.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ High-Value TO Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "TO aligns with KDT's core NAICS codes",
                  "Agency you've worked with before",
                  "FFP structure (defined scope = manageable risk)",
                  "Response window 10+ days (time to write a quality proposal)",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Low-Value TO Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "3-day response window (incumbent likely already selected)",
                  "Scope outside KDT's capability",
                  "Unusually low ceiling suggesting sole-source intent",
                  "Location KDT cannot staff competitively",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-red-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* STAGE 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 2</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Order Bid/No-Bid</h2>
          <p className="text-gray-500 mb-6">IDIQ Task Order bid/no-bid has unique factors beyond standard contract qualification. The vehicle context changes the analysis.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">IDIQ-Specific Bid/No-Bid Framework</h3>
            </div>
            {[
              ["1", "Ceiling Analysis", "Does the TO value fall within your base contract ceiling rates? If your OASIS+ LS rates are $185/hr for a PM and the TO requires $175/hr max — can you still make money?"],
              ["2", "Prior Award Incumbents", "Who held the work before? Check FPDS for prior awards under the parent IDIQ. An incumbent on a re-compete has strong advantage. Your proposal must explicitly justify the transition risk."],
              ["3", "Competition Level", "How many IDIQ holders are likely to respond? Large government-wide IDIQs (OASIS+) have hundreds of holders — you're fighting for share. Small agency MAC vehicles may have 5–8 holders — much better odds."],
              ["4", "Response Window", "Under fair opportunity, response windows can be short — sometimes 5 days for simple TOs. Assess whether you can write a credible proposal in the available time. A weak rushed proposal is worse than no-bid."],
            ].map(([n, q, a]) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <p className="text-indigo-900 text-sm font-medium mb-1">IDIQ Bid/No-Bid Rule:</p>
            <p className="text-indigo-800 text-sm">Being on the vehicle is not an obligation to bid every TO. Strategic no-bids (with a courtesy notice to the CO) maintain the relationship without wasting resources on unwinnable opportunities.</p>
          </div>
        </section>

        {/* STAGE 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Writing a Task Order Proposal</h2>
          <p className="text-gray-500 mb-6">Task Order proposals are shorter and faster than base contract proposals — but the evaluation is just as rigorous. Structure matters.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "SOW Alignment",
                sub: "Section 1",
                body: "Mirror every requirement in the TO SOW directly. Use the exact language. Government evaluators score against a checklist — if you don't address it explicitly, you get no credit. Map your proposal sections to SOW paragraphs.",
              },
              {
                n: "2",
                title: "Technical Approach",
                sub: "Section 2",
                body: "Describe specifically how KDT will perform this TO. Personnel plan, equipment, methodology, management structure, quality control. Use concrete numbers: 'KDT will deploy 4 licensed security officers per shift across 3 posts, achieving 100% post coverage.' Generic is fatal.",
              },
              {
                n: "3",
                title: "Staffing Matrix",
                sub: "Section 3",
                body: "Many TOs require a staffing plan tied to CLINs. For each labor category in the TO, show: hours per week, proposed labor rate (must be at or below your base contract ceiling rate), total loaded cost per period. Mismatched labor categories or rates above ceiling = disqualification.",
                template: `Labor Category: Security Officer I
Hours/Week: 40 | Rate: $58.25/hr | Annual: $121,160
Labor Category: Site Supervisor
Hours/Week: 40 | Rate: $72.50/hr | Annual: $150,800`,
              },
              {
                n: "4",
                title: "Pricing vs Ceiling",
                sub: "Section 4",
                body: "Total your proposed price clearly. Show base year + option years separately. For LPTA TOs, price as tight as you can while maintaining positive margin. For Best Value TOs, price competitively — don't sacrifice quality for price, but don't ignore it either. Verify every labor category is priced at or below your vehicle ceiling rates.",
              },
            ].map(({ n, title, sub, body, template }) => (
              <div key={n} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{title}</p>
                        {sub && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{sub}</span>}
                      </div>
                      <p className="text-gray-600 text-sm">{body}</p>
                      {template && (
                        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">Example Structure</p>
                          <pre className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{template}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ TO Proposal Do:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Address every SOW paragraph explicitly",
                  "Tie labor categories to base contract rates",
                  "Show specific personnel assignments or roster plan",
                  "Price at or below vehicle ceiling rates",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ TO Proposal Don&apos;t:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Re-submit your base contract technical approach",
                  "Price above vehicle ceiling rates (auto-disqualify)",
                  "Ignore the incumbent's known advantages",
                  "Assume evaluators know your base contract — they don't",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-red-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* STAGE 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission under IDIQ Vehicle</h2>
          <p className="text-gray-500 mb-6">IDIQ Task Order submission has vehicle-specific requirements. Not all TOs use SAM.gov — many use dedicated portals.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Submission Portals by Vehicle</h3>
            </div>
            {[
              ["OASIS+ / GSA Vehicles", "eBuy (buy.gsa.gov). Responses submitted directly in the eBuy system. File uploads + online form. No email submissions accepted."],
              ["SeaPort-NxG", "SeaPort portal (seaport.navy.mil). Holders must maintain active portal access. TOs posted and responded to within the portal."],
              ["Agency MAC Vehicles", "Varies by agency. Some use email to CO, some use PIEE (Procurement Integrated Enterprise Environment), some use SAM.gov contract module. Read the TO instructions."],
              ["PIEE / WAWF", "Many DoD TOs require proposal submission via PIEE and invoice submission via WAWF (Wide Area Workflow). Register for both early — account provisioning takes days."],
            ].map(([term, def]) => (
              <div key={term} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                <p className="text-gray-500 text-sm">{def}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Pre-Submission Checklist — IDIQ Task Order</h3>
            </div>
            {[
              "All SOW paragraphs addressed explicitly?",
              "All labor categories at or below vehicle ceiling rates?",
              "Staffing matrix aligns with CLINs in the TO?",
              "Period of performance matches the TO, not base contract?",
              "Submission portal account active and tested?",
              "Format requirements met (page limits, file format, naming)?",
              "Price summary matches detailed cost breakdown?",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <p className="text-indigo-900 text-sm font-medium mb-1">Submission Discipline:</p>
            <p className="text-indigo-800 text-sm">Submit 30 minutes before deadline — not at the deadline. Portal issues at deadline hour cost you the bid and the relationship. The CO cannot accept late submissions regardless of reason.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Ready to practice IDIQ Task Orders?</h2>
          <p className="text-indigo-100 mb-6 text-sm">
            Launch the IDIQ training portal — work through real Task Order scenarios, no countdown.
          </p>
          <Link
            href="/login?vehicle=idiq&mode=training"
            className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Launch IDIQ Training Portal →
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">When you&apos;re ready for the live assessment:</p>
          <Link
            href="/login?vehicle=idiq&ready=true"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 py-2.5 px-6 rounded-lg transition-colors"
          >
            IDIQ Simulation (Live) →
          </Link>
        </div>

      </main>
    </div>
  );
}
