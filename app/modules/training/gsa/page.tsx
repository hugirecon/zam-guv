import Link from "next/link";

export const metadata = {
  title: "Module 06 Training — GSA Schedule Task Order Training | Zam.guv",
};

export default function GSATrainingPage() {
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
            <span className="text-sm text-gray-500 hidden sm:block">GSA Schedule Task Order Training</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 06</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">GSA Schedule Task Order Training</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>Guided walkthrough — Schedule task order focus</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>No timer</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>Login required</span>
          </div>
          {/* Training mode launch banner */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-violet-900 mb-1">GSA Training Mode — Timer Disabled</h2>
              <p className="text-violet-700 text-sm mb-3">
                Work through eBuy RFQ identification, quote evaluation, Schedule pricing, and submission without time pressure. Use the GSA Schedule context to practice decisions you&apos;ll make in the live simulation.
              </p>
              <Link
                href="/login?vehicle=gsa&mode=training"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
              >
                Launch GSA Training Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-6">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-4">Overview</h2>
            <p className="text-white leading-relaxed mb-4">
              This training module focuses on the GSA Schedule task order pursuit cycle — from monitoring eBuy for RFQs through evaluating fit, writing a competitive Schedule quote, and submitting correctly. By the end, you&apos;ll know how to identify high-value eBuy opportunities, write a Schedule-compliant quote, price within your Schedule rates, and avoid the common disqualifiers.
            </p>
            <p className="text-slate-400 text-sm mb-4">Work through each stage in the GSA training portal as you read. You are not being timed yet.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["FINDING RFQs ON eBUY", "EVALUATING THE OPPORTUNITY", "WRITING THE QUOTE", "SUBMISSION & FOLLOW-UP"].map((stage, i) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding RFQs on eBuy</h2>
          <p className="text-gray-500 mb-6">eBuy is the primary source of GSA Schedule task order opportunities. Active Schedule holders who monitor eBuy daily generate significantly more revenue than passive holders who wait for agencies to find them on GSA Advantage.</p>

          <div className="space-y-3 mb-6">
            {[
              { n: "1", text: "eBuy Login & SIN Filters — Log in to ebuy.gsa.gov with your Schedule contract credentials. Configure your SIN profile to receive email notifications for all RFQs posted under your active SINs. Check the eBuy dashboard at the start of each business day. New RFQs appear immediately upon posting — agencies do not notify you directly." },
              { n: "2", text: "RFQ Identification — Review every new RFQ that appears under your SINs. Key fields to check first: due date (how much time to respond?), estimated value (is it worth the proposal investment?), set-aside type (small business, SDVOSB, WOSB — does KDT qualify?), agency and location (can KDT perform there?)." },
              { n: "3", text: "SAM.gov Cross-Reference — When you see a relevant eBuy RFQ, search SAM.gov for the solicitation number to find any pre-solicitation notices, scope clarifications, or prior award history. Past awards on the same requirement reveal incumbent pricing, scope, and duration — valuable competitive intelligence." },
              { n: "4", text: "Market Intelligence via FPDS — Use FPDS (fpds.gov) to track all prior Schedule orders at the same agency under the same SIN. What has the agency bought in the past 3 years? Who were the vendors? At what values? This tells you whether the agency is a reliable Schedule buyer and who you'd be competing against." },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-4">
            <p className="text-violet-800 font-semibold text-sm mb-2">🎯 Target: Monitor eBuy every business day once on Schedule. Response windows can be as short as 5 days — a missed RFQ cannot be recovered.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ High-Value RFQ Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "SOW matches KDT's core security SINs directly",
                  "Issuing agency KDT has prior relationship with",
                  "Response window 10+ days (time for quality quote)",
                  "Estimated value $100K+ (worth proposal investment)",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Low-Value / Skip Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "3-day response window (incumbent likely pre-selected)",
                  "Location KDT cannot staff or subcontract",
                  "Set-aside type KDT doesn't qualify for",
                  "Scope requiring clearances KDT doesn't hold",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Evaluating the Schedule RFQ</h2>
          <p className="text-gray-500 mb-6">A Schedule RFQ bid/no-bid decision has specific factors beyond basic capability fit. The Schedule context introduces pricing constraints and competition dynamics unique to the vehicle.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Schedule RFQ Evaluation Framework</h3>
            </div>
            {[
              ["1", "Schedule Rate Ceiling Check", "Does the SOW scope match your active SINs? Can you price the work at or below your negotiated Schedule ceiling rates? If the agency&apos;s budget estimate is below your Schedule rates for equivalent scope, you cannot win without a rate modification — which takes months."],
              ["2", "Evaluation Criteria", "Read the evaluation criteria. Is this LPTA (Lowest Price Technically Acceptable) or Best Value? LPTA means price wins if you meet technical threshold — sharpen your pencil. Best Value means technical quality matters — invest in the approach, not just price."],
              ["3", "Incumbent Analysis", "Check FPDS for prior awards on the same requirement. If there&apos;s a strong incumbent with deep agency relationships, assess whether your price and technical approach can overcome the incumbency advantage — or whether this is a no-bid."],
              ["4", "Quote Investment vs. Value", "Estimate the hours required to write a competitive quote. For a $50K order requiring 20 hours of proposal work, the economics are marginal. For a $500K multi-year order, invest fully. Match your proposal effort to the opportunity value."],
            ].map(([n, q, a]) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-7 h-7 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-violet-900 text-sm font-medium mb-1">Schedule No-Bid Practice:</p>
            <p className="text-violet-800 text-sm">When no-bidding an eBuy RFQ, use the eBuy platform to submit a no-bid response with a brief explanation. This is a professional courtesy to the CO and keeps KDT visible for future requirements. A pattern of no-responses with no explanation signals a non-responsive vendor.</p>
          </div>
        </section>

        {/* STAGE 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Writing the Schedule Quote</h2>
          <p className="text-gray-500 mb-6">Schedule quotes are shorter and more streamlined than IDIQ Task Order proposals — but the evaluation is specific. Misalignment with Schedule terms or rates is an automatic disqualifier.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "Technical Approach",
                sub: "Section 1",
                body: "Respond specifically to every requirement in the RFQ SOW. Use the agency's own language and requirement numbers. For security services, describe your staffing model, supervision structure, post relief plan, and quality control methodology. Concrete and specific beats general every time.",
              },
              {
                n: "2",
                title: "Schedule Rate Compliance",
                sub: "Section 2",
                body: "Every labor category in your quote must reference the corresponding SIN and labor category from your Schedule contract. Your prices must be at or below your negotiated Schedule ceiling rates. Prices above your Schedule rates — even by a few cents — are non-compliant and will be rejected. Show the Schedule contract number, SIN, and catalog rate for each line item.",
                template: `Schedule Contract: GS-07F-XXXXX
SIN: 246 53 — Security Guard Services
Labor Category: Security Officer I
Catalog Rate: $62.50/hr | Proposed Rate: $61.00/hr
Hours: 2,080/yr | Annual Value: $126,880`,
              },
              {
                n: "3",
                title: "Price Summary",
                sub: "Section 3",
                body: "Present a clean price summary: base year + option years, broken out by labor category and any ODCs (Other Direct Costs). For multi-year Schedule orders, apply reasonable escalation between option years — typically CPI-based or consistent with your Schedule modification history. A flat price across 5 years signals inexperience.",
              },
              {
                n: "4",
                title: "Past Performance",
                sub: "Section 4",
                body: "Most Schedule RFQs request 2–3 past performance references relevant to the SOW scope. Provide references from federal agencies where possible — they carry more weight with government evaluators than commercial references. For each reference: contract number, agency, scope, period, value, and CO contact information. Do not provide references that will give mixed reviews.",
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
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ Schedule Quote Do:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Reference Schedule contract number and SIN on every price line",
                  "Price at or below Schedule ceiling rates — always",
                  "Address every RFQ requirement explicitly",
                  "Show escalation on multi-year orders",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Schedule Quote Don&apos;t:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Price above Schedule ceiling rates (automatic rejection)",
                  "Quote labor categories not on your Schedule",
                  "Submit past performance from unrelated industries",
                  "Ignore page limits or format requirements in the RFQ",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission & Award Follow-Up</h2>
          <p className="text-gray-500 mb-6">Schedule quote submission is done through eBuy. Post-submission follow-up and debriefs are how you improve win rate over time and build CO relationships.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Submission Process — GSA eBuy</h3>
            </div>
            {[
              ["eBuy Portal Submission", "All Schedule quotes respond through the eBuy portal — not email, not SAM.gov. Your quote is uploaded directly in eBuy under the specific RFQ. Confirm successful submission with a eBuy confirmation number."],
              ["File Format", "RFQ instructions typically specify format: PDF preferred, specific naming conventions (e.g., 'KDT_Quote_RFQ123456.pdf'). Follow instructions exactly. Noncompliant file format is a technical rejection risk."],
              ["Submission Timing", "Submit no later than 30 minutes before the stated deadline. eBuy portal load issues at deadline are your problem — not the CO's. Late submissions are rejected regardless of reason."],
              ["Award Notice", "Award notices appear in eBuy and are posted on SAM.gov. If you didn't win, review the SAM.gov award notice: who won, at what value? This is your competitive intelligence for next time."],
            ].map(([term, def]) => (
              <div key={term} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                <p className="text-gray-500 text-sm">{def}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Pre-Submission Checklist — GSA Schedule Quote</h3>
            </div>
            {[
              "Schedule contract number and SIN referenced on every price line?",
              "All labor category rates at or below Schedule ceiling rates?",
              "Every RFQ SOW requirement addressed explicitly?",
              "Past performance references complete with CO contact info?",
              "Price summary balances to line-item breakdown?",
              "File format and naming matches RFQ instructions?",
              "eBuy account active — portal access tested before deadline?",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-violet-900 text-sm font-medium mb-1">Post-Award Debrief Practice:</p>
            <p className="text-violet-800 text-sm">When you lose a Schedule order, request a brief debrief from the CO — most are willing to share award rationale informally. Understanding why you lost (price too high, technical approach weaker, incumbent advantage) shapes your next quote. Vendors who ask for debriefs improve; vendors who don&apos;t, repeat the same losses.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl p-8 text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Ready to practice GSA Schedule orders?</h2>
          <p className="text-violet-100 mb-6 text-sm">
            Launch the GSA training portal — work through eBuy RFQs, write Schedule quotes, no countdown.
          </p>
          <Link
            href="/login?vehicle=gsa&mode=training"
            className="inline-block bg-white text-violet-700 hover:bg-violet-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Launch GSA Training Portal →
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">When you&apos;re ready for the live assessment:</p>
          <Link
            href="/login?vehicle=gsa&ready=true"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 py-2.5 px-6 rounded-lg transition-colors"
          >
            GSA Schedule Simulation (Live) →
          </Link>
        </div>

      </main>
    </div>
  );
}
