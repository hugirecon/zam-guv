import Link from "next/link";

export const metadata = {
  title: "Module 02 — KDT GovCon Training | Zam.guv",
};

export default function TrainingPage() {
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
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 02</span>
            <span className="text-sm text-gray-500 hidden sm:block">KDT GovCon Training</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 02</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">KDT GovCon Training</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>Guided walkthrough</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>No timer</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>Login required</span>
          </div>
          {/* Training mode launch banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-amber-900 mb-1">Training Mode — Timer Disabled</h2>
              <p className="text-amber-700 text-sm mb-3">
                When you launch the training portal, the 30-minute countdown is disabled. You'll have full access to all 52 contracts and the proposal editor without time pressure. Work through each stage in Zam.guv as you read this guide.
              </p>
              <Link
                href="/login?mode=training"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
              >
                Launch Training Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-6">
            <h2 className="text-lg font-bold text-slate-200 uppercase tracking-wide text-sm mb-4">Overview</h2>
            <p className="text-white leading-relaxed mb-4">
              This module walks you through the complete GovCon process using Zam.guv as your hands-on environment. By the end, you'll know exactly what to do when the 30-minute timer starts.
            </p>
            <p className="text-slate-400 text-sm mb-4">Work through each step in Zam.guv as you read. You are not being timed yet.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["OPPORTUNITY IDENTIFICATION", "BID/NO-BID", "PROPOSAL WRITING", "SUBMISSION"].map((stage, i) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Opportunity Identification</h2>
          <p className="text-gray-500 mb-6">You're scanning 52 listings to find KDT fits. Most won't qualify. Your job is to find the ones that do — fast.</p>

          <div className="space-y-3 mb-6">
            {[
              { n: "1", text: "Log in. Timer starts on login — but in training mode, get familiar first." },
              { n: "2", text: "Scan listings. Don't read every word. Scan." },
              { n: "3", text: "Three-check filter per listing: Set-aside (open or restricted?), NAICS code (KDT vertical match?), Scope fit (does this sound like KDT's work?)." },
              { n: "4", text: "Sort into three buckets: Pursue (strong fit, write a proposal), Maybe (partial fit, revisit if time allows), Skip (wrong NAICS, wrong set-aside, wrong scope)." },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-4">
            <p className="text-emerald-800 font-semibold text-sm mb-2">🎯 Target: 3–6 strong candidates, proposals for 2–4. Quality beats quantity.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ Strong Candidate Has:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "KDT-aligned NAICS",
                  "Open competition or qualifying set-aside",
                  "Scope KDT can perform",
                  "Realistic period and place of performance",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Weak Candidate Has:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Cert KDT doesn't hold",
                  "Scope outside KDT's capabilities",
                  "Impractical geography",
                  "Value too low to justify proposal effort",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bid/No-Bid Decision</h2>
          <p className="text-gray-500 mb-6">For each flagged candidate, make a deliberate go/no-go. This is a business decision.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Four Questions — In Order</h3>
            </div>
            {[
              ["1", "Can we compete?", "Right NAICS? Meet set-aside? Have past performance?"],
              ["2", "Can we win?", "LPTA or Best Value? Can KDT price to win on LPTA? Does our technical approach differentiate on Best Value?"],
              ["3", "Can we perform?", "Do we have the people, equipment, capability to execute?"],
              ["4", "Is it worth it?", "Contract value justify proposal investment? Strategic positioning value?"],
            ].map(([n, q, a]) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-blue-900 text-sm font-medium mb-1">Decision Rule:</p>
            <p className="text-blue-800 text-sm">Yes to all four → bid. One strong no → reconsider. Two or more → skip, move to stronger opportunities.</p>
            <p className="text-blue-700 text-sm mt-2">In Zam.guv: make the call before opening the proposal editor. Don't draft unless you've decided to bid. Time is limited.</p>
          </div>
        </section>

        {/* STAGE 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposal Writing</h2>
          <p className="text-gray-500 mb-6">This is the most important stage. A perfect bid/no-bid decision means nothing with a weak proposal.</p>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide text-slate-600">What Evaluators Look For</h3>
            <ul className="space-y-2">
              {[
                "Direct responsiveness to the PWS/SOW",
                "Technical credibility (specific, not generic)",
                "Relevant past performance",
                "Price reasonableness",
                "Risk mitigation",
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "Executive Summary",
                sub: "2–3 sentences",
                body: "Who is KDT, what are you proposing, why KDT?",
                template: `"Knight Division Tactical is a premier defense services firm with demonstrated experience delivering [relevant scope]. We propose a [FFP/T&M] solution to meet [agency]'s requirement for [scope], leveraging [capability/past performance]. Our approach prioritizes [key eval criterion]."`,
              },
              {
                n: "2",
                title: "Technical Approach",
                sub: "",
                body: "How will KDT do the work? Be specific. Methods, personnel, equipment. Execution timeline. Key risks + mitigation.",
              },
              {
                n: "3",
                title: "Past Performance",
                sub: "",
                body: "What has KDT done that's similar? Contract type, scope similarity, outcome. If limited: acknowledge it, explain how teaming bridges the gap.",
              },
              {
                n: "4",
                title: "Pricing",
                sub: "",
                body: "Total proposed price + brief rationale. LPTA: price sharp. Best Value: competitive but don't race to the bottom.",
              },
              {
                n: "5",
                title: "Why KDT",
                sub: "",
                body: "One paragraph close. Make it count.",
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
                          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">Template</p>
                          <p className="text-slate-700 text-xs italic leading-relaxed">{template}</p>
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
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ Do</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Mirror solicitation language",
                  "Be specific with numbers and contract types",
                  "Address every eval criterion",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Don't</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Write generic boilerplate",
                  "Ignore eval criteria",
                  "Oversell or leave questions unanswered",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission</h2>
          <p className="text-gray-500 mb-6">Review once, then submit.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Pre-Submission Checklist</h3>
            </div>
            {[
              "Full PWS/SOW scope addressed?",
              "Every eval criterion answered?",
              "Technical approach specific to this contract?",
              "Past performance relevant?",
              "Price clearly stated?",
              "Executive summary makes a compelling case?",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5">
            <p className="text-slate-700 text-sm font-medium">Once submitted → move to next opportunity.</p>
          </div>
        </section>

        {/* Time Management */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Management</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Day — 30 Minutes</h2>

          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            {[
              { time: "0:00–0:08", action: "Scan all 52 listings", detail: "Flag 3–6 candidates" },
              { time: "0:08–0:12", action: "Bid/no-bid decisions", detail: "Settle on 2–4 to pursue" },
              { time: "0:12–0:28", action: "Write and submit", detail: "Budget 4–8 min per proposal" },
              { time: "0:28–0:30", action: "Final review", detail: "Submit anything still in draft" },
            ].map(({ time, action, detail }, i) => (
              <div key={i} className="flex items-center gap-5 px-6 py-4 border-b border-slate-800 last:border-0">
                <span className="text-amber-400 font-mono font-bold text-sm w-20 flex-shrink-0">{time}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{action}</p>
                  <p className="text-slate-400 text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-5">
            <p className="text-blue-900 font-bold text-sm">Key principle: A strong 2-proposal session beats a weak 5-proposal session.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Ready to practice?</h2>
          <p className="text-amber-100 mb-6 text-sm">
            Launch the training portal — all 52 contracts, no countdown.
          </p>
          <Link
            href="/login?mode=training"
            className="inline-block bg-white text-amber-700 hover:bg-amber-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Launch Training Portal →
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">When you're ready for the real thing:</p>
          <Link
            href="/login"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 py-2.5 px-6 rounded-lg transition-colors"
          >
            Module 3 — Begin Simulation (30-min timer) →
          </Link>
        </div>

      </main>
    </div>
  );
}
