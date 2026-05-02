import Link from "next/link";

export const metadata = {
  title: "Module 07 Training — SBIR/STTR Proposal Training | Zam.guv",
};

export default function SBIRTrainingPage() {
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
            <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-widest">Module 07</span>
            <span className="text-sm text-gray-500 hidden sm:block">SBIR/STTR Proposal Training</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-10 pb-10 border-b border-gray-200">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 07</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">SBIR/STTR Proposal Training</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>Guided walkthrough — Phase I proposal focus</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>No timer</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>Login required</span>
          </div>
          {/* Training mode launch banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-orange-900 mb-1">SBIR Training Mode — Timer Disabled</h2>
              <p className="text-orange-700 text-sm mb-3">
                Walk through SBIR topic research, Phase I proposal writing, execution discipline, and Phase II strategy without time pressure. Use the training portal to practice the decisions that separate funded proposals from rejections.
              </p>
              <Link
                href="/login?vehicle=sbir&mode=training"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm"
              >
                Launch SBIR Training Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-6">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-4">Overview</h2>
            <p className="text-white leading-relaxed mb-4">
              This training module covers the SBIR proposal process from end to end — finding the right topics, writing a Phase I proposal that wins, executing Phase I to set up Phase II, and building a Phase II strategy. By the end, you&apos;ll understand what agency reviewers look for, how to write a commercially compelling proposal, and how to position for the Phase III production award that makes SBIR financially transformative.
            </p>
            <p className="text-slate-400 text-sm mb-4">Work through each stage in the SBIR training portal as you read. You are not being timed yet.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["FINDING TOPICS", "WRITING PHASE I PROPOSAL", "EXECUTING PHASE I", "PHASE II STRATEGY"].map((stage, i) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Finding the Right SBIR Topics</h2>
          <p className="text-gray-500 mb-6">Not all SBIR topics are equal. Finding topics that align precisely with KDT&apos;s existing capabilities — rather than forcing a fit — is the difference between winning Phase I and wasting 200 hours on a rejected proposal.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                text: "sbir.gov/solicitations — The official portal for all SBIR and STTR solicitations across all 11 agencies. Search by agency (select DoD for KDT focus), keyword, and fiscal year. Topics include a full description: background, objective, description of Phase I/II work, key words, and questions the government wants answered. Read every word of any topic you consider pursuing."
              },
              {
                n: "2",
                text: "Keyword Topic Research — Use sbir.gov's search with keywords: 'force protection,' 'physical security,' 'entry control,' 'access control,' 'personnel vetting,' 'training simulation,' 'small unit tactics,' 'installation security.' Pull all relevant topics from the past 3 years of DoD solicitations. Build a spreadsheet: agency, topic number, topic title, key requirement, award history (were prior year topics funded?), alignment to KDT capabilities."
              },
              {
                n: "3",
                text: "Program Manager Contact — Most SBIR topic descriptions include a Technical Point of Contact (TPOC) — the program manager who wrote the topic and who cares about it. Before submitting, contact the TPOC. Introduce KDT's relevant capability. Ask a clarifying question about the topic. A pre-submission conversation with the TPOC gives you insight no competitor has — and puts your company name in the reviewer's mind before the proposal arrives."
              },
              {
                n: "4",
                text: "Prior Award Research — Search sbir.gov/awards for prior awards on the same or similar topics. Who won? At what value? What was the company's approach (abstract is public)? Prior winners on the same topic are your primary competition on the next solicitation. Understanding their approach tells you where to differentiate. If the same company has won Phase I and Phase II on a topic repeatedly, they are the incumbent — factor that into your bid/no-bid."
              },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-gray-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-4">
            <p className="text-orange-800 font-semibold text-sm mb-2">🎯 Topic Selection Rule: Only pursue topics where KDT has genuine, demonstrable technical capability today — not capabilities you plan to build. Phase I reviewers can tell the difference between a company that knows this technology and one that learned about it from the topic description.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <h4 className="font-bold text-emerald-800 text-sm mb-3">✅ Strong Topic Selection Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "KDT has directly relevant prior work or technology",
                  "Topic aligns with KDT's core security/defense domain",
                  "TPOC is reachable and responsive to pre-contact",
                  "Prior year topic had few or no prior awards (less incumbent)",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-emerald-500 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h4 className="font-bold text-red-800 text-sm mb-3">❌ Skip / Weak Fit Signals:</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "Topic requires deep expertise KDT doesn't have in-house",
                  "Same company has won this topic 3 years running",
                  "Topic requires security clearances KDT doesn't hold",
                  "You can't name specific KDT capability that matches the objective",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Writing the Phase I Proposal</h2>
          <p className="text-gray-500 mb-6">Phase I proposals are evaluated on three primary dimensions: technical merit (can this work?), commercial potential (is there a real market?), and team qualifications (can this company do it?). All three must be strong. A brilliant technical approach with weak commercialization scores poorly — and vice versa.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">What Phase I Reviewers Evaluate</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Technical Merit", "Is the technical approach scientifically sound? Is the proposed research plan executable in Phase I timeframe? Are the milestones measurable? Does the team have the expertise to do this work? Generic approaches and vague methodologies score low."],
                ["Commercial Potential", "Is there a real market for this technology beyond the SBIR sponsor? Who are the customers? What is the revenue model? How large is the addressable market? Reviewers want to see that Phase III production is a realistic path, not an afterthought."],
                ["Team Qualifications", "PI experience in the technical area. Key personnel credentials. Relevant prior work — including non-federal commercial work. Facilities and equipment available. Small companies with deep, specific expertise beat large teams with shallow coverage."],
                ["Responsiveness to Topic", "Does the proposal actually address the specific problem stated in the topic description? Proposals that use the topic as a loose pretext to pitch an existing product are easy to identify and score low. Mirror the topic language."],
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
                title: "Technical Volume",
                sub: "Section 1",
                body: "Describe your technical approach to the Phase I feasibility study or prototype. What will you do? What methods will you use? What will Phase I prove? Structure your approach around measurable milestones — not a narrative. Reviewers want to see a logical research sequence with specific deliverables at each milestone.",
                template: `Phase I Milestone Structure:
Month 1–2: Requirements analysis & system architecture design
Month 3–4: Prototype development — core component integration
Month 5: Lab testing & performance characterization
Month 6: Final report + Phase II proposal preparation

Phase I Exit Criteria: [Technology] demonstrated at [specific performance metric] under [specific condition], validated against [government test standard].`,
              },
              {
                n: "2",
                title: "Commercialization Plan",
                sub: "Section 2",
                body: "This section is underinvested in most losing proposals. Be specific: Who are the target customers (DoD production programs, allied nations, commercial security market)? What is the revenue model? What has KDT done to validate demand — customer interviews, letters of intent, prior sales? What is the TAM? A credible commercialization plan demonstrates that Phase III is a real business plan, not a hope.",
              },
              {
                n: "3",
                title: "Team & Qualifications",
                sub: "Section 3",
                body: "Lead with the PI's most relevant credentials — not their full CV. What specific prior work makes this person the right lead for this topic? For key personnel: one paragraph each, specific and relevant. If subcontracting a university (STTR) or technical partner, describe their specific role and the credentials that matter for this topic. State SBIR/STTR eligibility explicitly.",
              },
              {
                n: "4",
                title: "Budget Justification",
                sub: "Section 4",
                body: "Phase I budgets must be defensible. Show effort hours by labor category, ODCs, and indirect rates. Don't underestimate to appear cheap — unrealistically low budgets signal inexperience. Don't overprice — reviewers know Phase I market rates. For DoD: Phase I awards typically $50K–$300K. Budget to the actual scope, not to the maximum.",
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

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Phase I Proposal — Strong vs. Weak</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4">
                <p className="text-green-400 font-bold text-sm mb-2">✓ Strong</p>
                <p className="text-green-100 text-sm leading-relaxed italic">
                  &ldquo;KDT proposes to develop a portable biometric access control unit for expeditionary entry control points. Phase I will demonstrate edge-compute identity matching at &lt;3 second latency without network dependency, validated against NIST IREX biometric performance standards. PI Dr. [Name] has 8 years developing biometric systems for CBP. Commercial path: DHS procurement program (POR $12M FY2027, CO relationship established), allied-nation export (4 letters of intent on file), and commercial stadium market (1 existing deployment).&rdquo;
                </p>
              </div>
              <div className="bg-red-900/40 border border-red-700 rounded-xl p-4">
                <p className="text-red-400 font-bold text-sm mb-2">✗ Weak</p>
                <p className="text-red-100 text-sm leading-relaxed italic">
                  &ldquo;KDT has significant experience in security and technology. We propose to research and develop an innovative solution to address the government&apos;s needs in this important topic area. Our experienced team has the capabilities to deliver Phase I results on time and within budget. We believe there is a large commercial market for this technology going forward.&rdquo;
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Executing Phase I</h2>
          <p className="text-gray-500 mb-6">Phase I execution is the audition for Phase II. How you perform — technically, administratively, and in your relationship with the program manager — determines whether you get invited to compete for Phase II funding.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Phase I Execution Priorities</h3>
            </div>
            {[
              ["1", "Milestone Discipline", "Deliver on every milestone in your Phase I timeline. The TPOC is tracking. Late milestones without proactive communication = red flag on your Phase II evaluation. If a milestone will slip, tell the TPOC before the due date — not after."],
              ["2", "TPOC Relationship", "Your Technical Point of Contact is your champion inside the agency. Brief them proactively — short email updates between formal milestones. Invite them to see progress. Make their job easy: give them content to support your Phase II recommendation. COs award Phase II in part based on TPOC enthusiasm."],
              ["3", "Final Report Quality", "The Phase I final report is evaluated in Phase II scoring. A rigorous, well-documented report that clearly demonstrates feasibility — with data, test results, and analysis — sets up your Phase II proposal better than any marketing will. Write the report as if it will be read by the Phase II selection panel. Because it will."],
              ["4", "Phase II Proposal Start", "Begin drafting your Phase II proposal at Phase I month 4 — not month 6. You typically have 30–60 days after Phase I completion to submit Phase II. That is not enough time to write a strong Phase II proposal from scratch. Use Phase I execution data to build your Phase II technical approach in parallel."],
            ].map(([n, q, a]) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
                <span className="w-7 h-7 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-orange-900 text-sm font-medium mb-1">Phase I Performance Rule:</p>
            <p className="text-orange-800 text-sm">The Phase II selection panel includes your TPOC&apos;s recommendation. A Phase I performer who delivered on time, communicated proactively, and built a relationship with the program office starts Phase II evaluation with a significant advantage over a technically equivalent but disengaged competitor. Do the technical work, and do the relationship work.</p>
          </div>
        </section>

        {/* STAGE 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Phase II Strategy</h2>
          <p className="text-gray-500 mb-6">Phase II is where the real R&D investment happens — and where KDT&apos;s long-term technology position is built. Phase II strategy means thinking about Phase III and commercialization from day one of Phase II, not day 500.</p>

          <div className="space-y-3 mb-6">
            {[
              {
                n: "1",
                title: "Phase II Proposal — Stronger Bar",
                body: "Phase II proposals are longer, more detailed, and evaluated more rigorously than Phase I. Technical volume should demonstrate Phase I results directly — reviewers want to see what you proved. Commercialization plan must be more developed: specific customers, purchase commitments or LOIs if available, detailed revenue projections, IP strategy. Budget must reflect 24 months of real R&D effort — often $750K–$2M. Under-scoping Phase II is a common mistake by Phase I winners who get nervous about the funding ask."
              },
              {
                n: "2",
                title: "Phase III Positioning During Phase II",
                body: "From Phase II month 1, actively develop your Phase III production pathway. Identify the specific acquisition program that would buy the technology — the Program of Record (POR). Build relationships with the POR program office. Understand their acquisition timeline and budget profile. A Phase III award doesn't happen automatically — it happens because you worked the relationship and made the Phase III case before Phase II ends."
              },
              {
                n: "3",
                title: "IP Filing During Phase II",
                body: "File provisional patents during Phase II for key innovations developed under the award. The patent clock starts at invention disclosure — don't wait until Phase II ends. Use the 4-year SBIR data rights window to establish commercial IP position before government purpose rights activate. Your IP portfolio is the commercial asset that Phase III and commercial customers are buying. Build it deliberately."
              },
              {
                n: "4",
                title: "Commercial Validation During Phase II",
                body: "Use Phase II performance to generate commercial evidence: pilot deployments with commercial customers, letters of intent, early-stage commercial contracts. These serve two purposes: they validate your commercialization plan (making Phase III stronger) and they generate revenue alongside the SBIR award. Some SBIR companies generate more Phase II commercial revenue than the SBIR award itself. That is the model."
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                <span className="w-7 h-7 bg-orange-700 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Phase II Completion Checklist</h3>
            </div>
            {[
              "All Phase II milestones delivered and documented with data?",
              "Final report completed to Phase I quality standard or higher?",
              "Key innovations identified and provisional patents filed?",
              "Phase III production pathway identified — POR, timeline, budget?",
              "Phase III relationship built with agency production program office?",
              "Commercial customers engaged — LOIs or early revenue evidence?",
              "IP rights inventory updated — background vs. foreground IP documented?",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-orange-900 text-sm font-medium">The SBIR Principle:</p>
            <p className="text-orange-800 text-sm mt-1">Every SBIR decision — topic selection, Phase I execution, Phase II strategy, IP filings — should be evaluated against one question: &ldquo;Does this strengthen KDT&apos;s position for Phase III and commercial revenue?&rdquo; The R&D is the means. The IP and Phase III contract are the ends.</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Ready to practice SBIR proposals?</h2>
          <p className="text-orange-100 mb-6 text-sm">
            Launch the SBIR training portal — research topics, write Phase I proposals, no countdown.
          </p>
          <Link
            href="/login?vehicle=sbir&mode=training"
            className="inline-block bg-white text-orange-700 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Launch SBIR Training Portal →
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">When you&apos;re ready for the live assessment:</p>
          <Link
            href="/login?vehicle=sbir&ready=true"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 py-2.5 px-6 rounded-lg transition-colors"
          >
            SBIR/STTR Simulation (Live) →
          </Link>
        </div>

      </main>
    </div>
  );
}
