import Link from "next/link";

export const metadata = {
  title: "Module 05 Training — OTA Prototype Training | Zam.guv",
};

export default function OTATrainingPage() {
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
            <span className="text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 05</span>
            <span className="text-sm text-gray-500 hidden sm:block">OTA Prototype Training</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <p className="text-cyan-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 05</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">OTA Prototype Training</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>Guided walkthrough — OTA process</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>No timer</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>Login required</span>
          </div>
          {/* Training mode launch banner */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-cyan-900 mb-1">OTA Training Mode — Timer Disabled</h2>
              <p className="text-cyan-700 text-sm mb-3">
                Walk through the complete OTA process from white paper through agreement negotiation. Practice writing compelling white papers and positioning for follow-on production — without time pressure.
              </p>
              <Link
                href="/login?vehicle=ota&mode=training"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
              >
                Launch OTA Training Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-6">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-4">Overview</h2>
            <p className="text-white leading-relaxed mb-4">
              This training module walks you through the OTA prototype process end-to-end — from finding white paper opportunities through writing a competitive concept paper, navigating the consortium, and positioning for follow-on production. By the end, you&apos;ll understand what separates a winning OTA white paper from one that doesn&apos;t get invited to negotiate.
            </p>
            <p className="text-slate-400 text-sm mb-4">Work through each stage in the OTA training portal as you read. You are not being timed yet.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["WHITE PAPER", "CONSORTIUM NAVIGATION", "AGREEMENT NEGOTIATION", "PROTOTYPE EXECUTION"].map((stage, i) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding OTA Prototype Opportunities</h2>
          <p className="text-gray-500 mb-6">OTA opportunities are not posted on SAM.gov in the same way as FAR contracts. You need to know where to look — and most opportunities go only to consortium members.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                text: "NSTXL Portal — Once a consortium member, log in to the NSTXL platform to view active white paper calls, opportunity descriptions, and response instructions. Opportunities are posted here first — before any public notice. This is the primary source for KDT."
              },
              {
                n: "2",
                text: "AFWERX / SparkCell — AFWERX posts open topic calls on their website and through the SBIR/STTR solicitation system. Some AFWERX OTAs are open to non-consortium companies. Monitor afwerx.af.mil for current solicitations."
              },
              {
                n: "3",
                text: "DIU Solicitations — DIU posts Commercial Solutions Openings (CSOs) publicly. These are similar to OTA white paper calls and can lead to OTA awards. Monitor diu.mil/work-with-us for active solicitations."
              },
              {
                n: "4",
                text: "SAM.gov OTA Notices — While TOs are not posted on SAM.gov, some agencies post pre-solicitation notices and awarded OTA summaries. Search SAM.gov with 'Other Transaction' filter under Contract Opportunities. Use awarded notices for competitive intelligence — who is winning, on what topics, at what values."
              },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-cyan-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 mb-4">
            <p className="text-cyan-800 font-semibold text-sm mb-2">🎯 Priority Action: Join NSTXL before the next white paper call. Membership is $2,500/year. Don&apos;t wait for an opportunity to appear — it will be too late to respond.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ Strong OTA Opportunity Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Prototype language (not production or steady-state)",
                  "Non-traditional contractor preference stated",
                  "Response format: white paper (not full proposal)",
                  "Focus area aligns with KDT security/defense tech",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Weak Fit / Skip Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Steady-state operations (not prototypable)",
                  "Requires existing DoD Secret facility",
                  "Technology domain outside KDT core",
                  "Traditional defense contractor preferred — large systems",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Writing the White Paper</h2>
          <p className="text-gray-500 mb-6">The white paper is your entire pitch. It must be concise, technically credible, and clearly responsive to the stated requirement. Most calls allow 5–10 pages. Every page counts.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">What Reviewers Look For in a White Paper</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Problem Understanding", "Does the submitter actually understand the DoD problem being solved? Generic technology pitches score low. Specific operational problem statements score high."],
                ["Technical Approach", "Is the proposed solution credible and novel? OTA reviewers want innovation — not a repackaged legacy product. Explain your approach clearly without excessive jargon."],
                ["Team Qualifications", "Who will perform the work? Key personnel, relevant experience, prior DoD work (even as subcontractors). Non-traditional contractor status should be stated explicitly."],
                ["Prototype Feasibility", "Can this actually be prototyped within a reasonable timeline and budget? Unrealistic scope or cost estimates are red flags."],
                ["Follow-On Potential", "Reviewers mentally model whether this could scale to production. Position your white paper to make that path obvious."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "Executive Summary",
                sub: "Page 1",
                body: "State the problem, your solution, and why KDT is the right team in 3–4 sentences. Do not assume the reviewer knows your company. Make the relevance to the stated requirement unmistakable.",
                template: `"KDT proposes to prototype a [technology/capability] that addresses [specific DoD problem] for [Agency/Command]. Our approach leverages [specific KDT capability/method] to deliver [key capability outcome]. KDT is a non-traditional defense contractor with [relevant qualifier]. We estimate prototype delivery within [X months] at a cost of [rough estimate]."`,
              },
              {
                n: "2",
                title: "Technical Approach",
                sub: "Pages 2–5",
                body: "Describe your technical solution specifically. How will it work? What is your methodology? What technologies or methods will you use? What does the prototype look like at completion — what does it demonstrate? Include any preliminary data, prior work, or proof points that show feasibility.",
              },
              {
                n: "3",
                title: "Team & Qualifications",
                sub: "Pages 6–7",
                body: "Key personnel bios (relevant, not exhaustive). Prior relevant work — including commercial work, prior DoD work at sub tier, research. If teaming: prime and sub roles. State explicitly that KDT is a non-traditional defense contractor if applicable — this is a selection criterion advantage.",
              },
              {
                n: "4",
                title: "Cost Estimate & Timeline",
                sub: "Pages 8–9",
                body: "Rough order of magnitude cost by major task. Milestone-based timeline showing prototype delivery schedule. For OTA, detailed pricing is negotiated later — but the white paper estimate must be credible. Wild overestimates or underestimates signal lack of planning rigor.",
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

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">White Paper — Strong vs. Weak</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4">
                <p className="text-green-400 font-bold text-sm mb-2">✓ Strong</p>
                <p className="text-green-100 text-sm leading-relaxed italic">
                  &ldquo;KDT proposes to prototype a mobile biometric identity verification system for rapid access control at expeditionary operating bases. Our approach uses edge-compute biometric matching with encrypted local storage, delivering verification decisions in under 3 seconds without network connectivity. KDT&apos;s team includes two former military PMCS operators and a Purdue-ARI computer vision researcher. Prior work: commercial stadium access system deployed at 4 venues, 99.7% uptime. Prototype delivery: 9 months, $1.8M.&rdquo;
                </p>
              </div>
              <div className="bg-red-900/40 border border-red-700 rounded-xl p-4">
                <p className="text-red-400 font-bold text-sm mb-2">✗ Weak</p>
                <p className="text-red-100 text-sm leading-relaxed italic">
                  &ldquo;Knight Division Tactical is a highly experienced security company with extensive capabilities in technology and defense services. We are proposing an innovative solution to address the government&apos;s need for improved security capabilities. Our experienced team has the skills and knowledge to deliver a successful prototype within budget and on schedule.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Negotiating the OTA Agreement</h2>
          <p className="text-gray-500 mb-6">An Invitation to Negotiate (ITN) is not an award — it&apos;s an invitation to discuss. How you navigate the negotiation determines the final agreement terms and your position for follow-on.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Key Negotiation Points in an OTA Agreement</h3>
            </div>
            {[
              ["1", "Scope of Prototype", "Define precisely what the prototype demonstrates and what constitutes successful completion. Vague deliverables = disputed completion = delayed follow-on. Be specific."],
              ["2", "Milestone Payments", "OTA agreements typically pay on milestone completion, not time-based. Negotiate milestones that reflect genuine technical progress and that release funds as costs are incurred — not 90-day deferred payments."],
              ["3", "IP Rights", "Who owns what after the prototype? Background IP (what you bring in) vs. foreground IP (what's developed under the agreement). Negotiate hard here — if you develop a novel capability, retain commercial rights to apply it elsewhere."],
              ["4", "Data Rights", "Government will want rights to prototype data. Negotiate the scope: limited rights vs. government purpose rights vs. unlimited rights. Each category has different implications for KDT's ability to commercialize."],
              ["5", "Follow-On Language", "Request explicit language in the agreement acknowledging the prototype work establishes the basis for potential follow-on production. Not legally required, but creates a written record of the intended pathway."],
            ].map(([n, q, a]) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-7 h-7 bg-cyan-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5">
            <p className="text-cyan-900 text-sm font-medium mb-1">Negotiation Rule:</p>
            <p className="text-cyan-800 text-sm">Get legal counsel experienced in OTA agreements before signing. OTA terms are negotiated — not standard. What you don&apos;t negotiate, you accept. The IP rights clause in particular can make or break the long-term value of the prototype work for KDT.</p>
          </div>
        </section>

        {/* STAGE 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prototype Execution & Follow-On Positioning</h2>
          <p className="text-gray-500 mb-6">Winning the OTA agreement is the beginning, not the end. How you execute the prototype determines whether you get the follow-on production award — which is where the real revenue is.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "Milestone Discipline",
                body: "Deliver on every milestone — on time, to scope. Government program managers score execution. Their recommendation drives follow-on awards. A prototype that is technically brilliant but late and over-budget will not get the follow-on. Manage to the milestone schedule, not the overall deadline."
              },
              {
                n: "2",
                title: "Demonstration Planning",
                body: "The prototype must demonstrate capability — usually in front of the program office. Plan the demonstration like a sales event: scripted, polished, rehearsed. Show the operational use case. Make it easy for the PM to say 'this works, we need it in production.'"
              },
              {
                n: "3",
                title: "COR Relationship",
                body: "Build a strong relationship with the Contracting Officer's Representative monitoring your prototype. They are your day-to-day government contact and their performance assessment directly influences follow-on award decisions. Communicate proactively — share progress, flag risks early, don't surprise them."
              },
              {
                n: "4",
                title: "Follow-On Positioning",
                body: "Before prototype completion, begin building your follow-on proposal internally. Document lessons learned, refine your cost model, identify production scaling requirements. When the follow-on award is initiated, you should be able to respond within days — not weeks. The advantage is yours to lose."
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-teal-700 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Pre-Demo Checklist</h3>
            </div>
            {[
              "Milestone deliverables complete and documented?",
              "Demonstration environment tested and stable?",
              "Key personnel confirmed and briefed on demo script?",
              "Government PM and COR notified of demo logistics?",
              "Lessons learned documented for follow-on pricing?",
              "IP rights inventory updated as prototype work completed?",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <p className="text-teal-900 text-sm font-medium">The OTA Follow-On Principle:</p>
            <p className="text-teal-800 text-sm mt-1">Every decision you make during prototype execution should be evaluated against one question: &ldquo;Does this help or hurt my follow-on production position?&rdquo; The prototype is the audition. The production award is the job.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-700 rounded-2xl p-8 text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Ready to practice OTA?</h2>
          <p className="text-cyan-100 mb-6 text-sm">
            Launch the OTA training portal — write white papers, navigate consortium opportunities, no countdown.
          </p>
          <Link
            href="/login?vehicle=ota&mode=training"
            className="inline-block bg-white text-cyan-700 hover:bg-cyan-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Launch OTA Training Portal →
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">When you&apos;re ready for the live assessment:</p>
          <Link
            href="/login?vehicle=ota&ready=true"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 py-2.5 px-6 rounded-lg transition-colors"
          >
            OTA Simulation (Live) →
          </Link>
        </div>

      </main>
    </div>
  );
}
