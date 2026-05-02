import Link from "next/link";

export const metadata = {
  title: "Module 05 — Other Transaction Authority (OTA) | Zam.guv",
};

export default function OTAPage() {
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
            <span className="text-sm text-gray-500 hidden sm:block">Other Transaction Authority (OTA)</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-cyan-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 05</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Other Transaction Authority (OTA)</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>20–25 min</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-teal-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-sm font-bold mb-4 text-cyan-300 uppercase tracking-wide">Why OTA Is KDT's Fastest Path to DoD Revenue</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              As of March 2025, DoD has formally directed that OTA and CSO (Commercial Solutions Opening) be the <strong>default acquisition mechanism</strong> for software and technology prototype work — not FAR-based contracts. This changes everything.
            </p>
            <p className="text-cyan-200 leading-relaxed mb-4">
              Other Transaction Authority (OTA) allows DoD to enter agreements for prototype projects without following the FAR or DFARS. That means: no sealed bidding, no complex proposal formats, faster awards, and access to non-traditional defense contractors who have never navigated federal procurement before. KDT qualifies.
            </p>
            <div className="mt-6 pt-6 border-t border-teal-800">
              <p className="text-amber-300 font-semibold">
                ⚠️ OTA agreements are not contracts in the FAR sense — they&apos;re &ldquo;other transactions.&rdquo; They have different legal structures, different IP rights provisions, and different follow-on production rules. Understand the vehicle before signing.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an OTA</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Other Transaction Authority is a statutory authority granted to certain federal agencies — primarily DoD — that allows them to enter into <strong>agreements</strong> (not contracts) for research, prototype, and limited follow-on production projects without being subject to the FAR or DFARS. The primary DoD authority is <strong>10 USC 4022</strong> (formerly 10 USC 2371b), which covers prototype projects.
            </p>

            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 my-6">
              <p className="text-cyan-800 font-medium">
                OTA is not a loophole or an exception — it is a deliberate policy tool to accelerate defense acquisition for innovative capabilities. The intent is to reach companies that would not compete in the traditional FAR environment.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">OTA Core Concepts</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["10 USC 4022", "The primary statutory authority for DoD prototype OTAs. Authorizes DoD to enter agreements for prototype projects — not subject to FAR/DFARS. Each OTA is a unique negotiated agreement."],
                  ["Prototype Project", "The statutory trigger for OTA use. Work must constitute a prototype — a proof of concept, pilot, demonstration, or initial operational capability. Not for steady-state operations."],
                  ["Not Subject to FAR", "OTA agreements are not governed by the Federal Acquisition Regulation. No mandatory clauses, no sealed bidding, no standard contract formats. Terms are negotiated directly."],
                  ["Non-Traditional Defense Contractor", "A company that has not performed, in the preceding 1-year period, a DoD contract or subcontract subject to full CAS coverage. Most small businesses and tech startups qualify. KDT likely qualifies initially."],
                  ["Follow-On Production", "If a prototype is successfully demonstrated, the agency can enter a follow-on production contract or OTA without competitive procedures — sole-source based on the prototype. This is the revenue multiplier."],
                  ["IP Rights", "OTA agreements allow more flexible IP rights negotiations than FAR contracts. Contractors can often retain more IP, making OTA attractive for technology companies protecting proprietary methods."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 my-6 border-l-4 border-cyan-400">
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Real-World Example</p>
              <p className="text-white leading-relaxed text-sm">
                Army wants a prototype for a <strong className="text-cyan-300">mobile personnel security vetting system</strong> that integrates biometric data with existing access control systems. They post a white paper solicitation through NSTXL. KDT submits a 5-page white paper describing their approach. NSTXL manages the review — no sealed bidding, no 100-page proposal. Army invites KDT to negotiate. Six weeks later, KDT has a $2.1M OTA agreement. If the prototype works, Army can award a follow-on production OTA to KDT directly — no re-competition.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DoD&apos;s OTA Mandate</h2>
          <p className="text-gray-600 mb-6">The policy landscape shifted decisively in 2025. Understanding the mandate is essential context for KDT's acquisition strategy.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-teal-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">March 2025 DoD Policy Memo — Key Provisions</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Default Mechanism", "OTA and CSO are now the default acquisition pathway for software development and technology prototype work. FAR-based contracts require justification to use for these categories."],
                ["Speed Mandate", "Award timelines target 60–90 days from white paper to agreement. Traditional FAR acquisitions for comparable work often take 12–18 months."],
                ["Non-Traditional Preference", "Preference for non-traditional defense contractors to participate, including small businesses, startups, and companies new to federal contracting."],
                ["Consortium Model", "DoD directs use of established OTA consortia (NSTXL, AFWERX, DIU, Army RCCTO, NavalX) as the primary vehicle for OTA transactions."],
                ["Reduced Administrative Burden", "Minimal reporting requirements compared to FAR contracts. No cost accounting standards (CAS) required for most OTAs under $150M."],
                ["Why This Matters for KDT", "KDT's technology-forward security and defense services capabilities — especially in areas like force protection technology, personnel security systems, and training — can be prototyped under OTA. The March 2025 mandate makes this a high-priority pursuit channel."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <p className="text-teal-900 font-semibold text-sm mb-2">What the Mandate Changes for KDT:</p>
            <p className="text-teal-800 text-sm">Previously, a company like KDT might focus exclusively on FAR-based contracts. The March 2025 mandate means that for DoD technology-adjacent work — security systems, training platforms, force protection tech — OTA is now the first door to knock on, not the last resort.</p>
          </div>
        </section>

        {/* PART 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Consortium Model</h2>
          <p className="text-gray-600 mb-6">Most DoD OTA transactions flow through established OTA consortium managers. These organizations serve as intermediaries between DoD agencies and industry, managing the OTA process end-to-end.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-cyan-900 px-6 py-3">
              <p className="text-white font-semibold text-sm uppercase tracking-wide">Major OTA Consortia — KDT Reference</p>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["NSTXL", "National Security Technology Accelerator. Based in South Bend, IN — near KDT's operational area. Manages OTA agreements for multiple DoD components. Annual membership: ~$2,500. Access to Army, Navy, Air Force, SOCOM OTA opportunities."],
                ["AFWERX", "Air Force innovation hub. Focuses on commercial technology adoption for Air Force missions. SBIR/STTR and OTA opportunities. Strong cyber, autonomy, and training focus."],
                ["NavalX", "Navy's OTA and innovation arm. Manages rapid prototype agreements for NAVSEA, NAVAIR, USMC. Maritime security, systems integration, logistics."],
                ["Army RCCTO", "Rapid Capabilities and Critical Technologies Office. Army's primary OTA execution body for urgent capability needs. High-tempo, fast awards for priority programs."],
                ["DIU", "Defense Innovation Unit. Pentagon-level office connecting commercial technology to DoD problems. OTA is DIU's primary contract vehicle. Focuses on software, AI, autonomy, space — high-tech overlap."],
              ].map(([org, def]) => (
                <div key={org} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-32 flex-shrink-0">{org}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border-l-4 border-cyan-400 mb-6">
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">📌 How Consortium Membership Works</p>
            <p className="text-white leading-relaxed text-sm mb-3">
              KDT joins NSTXL by paying the annual membership fee (~$2,500). As a member, KDT:
            </p>
            <ol className="text-cyan-100 space-y-2 list-none">
              {[
                "Receives all opportunity notifications — white paper calls, invitation to negotiate, prototype solicitations",
                "Can respond to opportunities directly without going through open competition",
                "Has access to NSTXL&apos;s consortium portal, upcoming opportunity pipeline, and past award data",
                "Can team with other consortium members on proposals",
                "Maintains standing for all DoD components NSTXL supports",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-cyan-700 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5">
            <p className="text-cyan-900 font-semibold text-sm mb-1">Membership ROI:</p>
            <p className="text-cyan-800 text-sm">A single $500K OTA prototype agreement more than justifies the $2,500/year NSTXL membership cost. The question is not whether to join — it&apos;s which consortia to prioritize. For KDT: NSTXL (geographic proximity + Army/DoD breadth) first, AFWERX second.</p>
          </div>
        </section>

        {/* PART 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">OTA Process</h2>
          <p className="text-gray-600 mb-6">OTA acquisition follows a fundamentally different path than FAR-based contracting. No sealed bidding. No standard solicitation formats. Negotiated agreement, not award of a contract.</p>

          {/* Process Flow */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">OTA Agreement Process</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { stage: "White Paper Call", note: "5–10 pages", color: "bg-cyan-100 text-cyan-800 border border-cyan-200" },
                { stage: "Gov&apos;t Review", note: "Days to weeks", color: "bg-blue-100 text-blue-800 border border-blue-200" },
                { stage: "Invitation to Negotiate", note: "Select candidates", color: "bg-indigo-100 text-indigo-800 border border-indigo-200" },
                { stage: "Negotiation", note: "SOW + price + IP", color: "bg-amber-100 text-amber-800 border border-amber-200" },
                { stage: "Agreement Award", note: "60–90 day target", color: "bg-green-600 text-white" },
                { stage: "Prototype Performance", note: "Deliver & demo", color: "bg-teal-100 text-teal-800 border border-teal-200" },
                { stage: "Follow-On Production", note: "Sole-source available", color: "bg-cyan-600 text-white" },
              ].map(({ stage, note, color }, i, arr) => (
                <div key={stage} className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`${color} rounded-lg px-3 py-2 text-center`}>
                    <p className="font-bold text-xs whitespace-nowrap" dangerouslySetInnerHTML={{ __html: stage }}></p>
                    <p className="text-xs opacity-70 whitespace-nowrap">{note}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-gray-400 text-sm font-bold">→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                stage: "White Paper",
                color: "bg-cyan-800",
                body: "Most OTA opportunities start with a white paper (concept paper) — typically 5–10 pages. No standard format required. Describe the problem you're solving, your technical approach, your team's qualifications, and a rough cost estimate. This is your first impression — make it specific, credible, and aligned to the stated requirement."
              },
              {
                stage: "Invitation to Negotiate (ITN)",
                color: "bg-slate-700",
                body: "Selected white paper submitters receive an ITN — an invitation to discuss their approach and negotiate terms. This is not an award. It's a conversation. Prepare to explain your approach in detail, justify your price, and negotiate IP rights, deliverables, and performance milestones. Not all ITN recipients get awards."
              },
              {
                stage: "Negotiation",
                color: "bg-teal-800",
                body: "OTA terms are negotiated — SOW scope, total price, milestone payments, IP ownership, data rights, and deliverables. Unlike FAR contracts, there are no mandatory clauses. Review the proposed agreement language carefully. Engage legal counsel experienced in OTA agreements. IP rights in particular require careful negotiation."
              },
              {
                stage: "Follow-On Production",
                color: "bg-cyan-700",
                body: "If prototype is successfully demonstrated, the agency may award a follow-on production contract or OTA without competition — directly to the prototype performer. This is the OTA revenue multiplier. The prototype is your proof of performance. Design your prototype execution to position aggressively for the follow-on."
              },
            ].map(({ stage, color, body }) => (
              <div key={stage} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className={`${color} px-6 py-3`}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{stage}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 5</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">NSTXL & Indiana Connection</h2>
          <p className="text-gray-600 mb-6">KDT has a geographic and network advantage that most OTA competitors lack. Understanding the regional ecosystem is a competitive asset.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Indiana OTA Ecosystem</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["NSWC Crane", "Naval Surface Warfare Center Crane Division, located in southern Indiana. One of the largest DoD installations in the Midwest. Electronic warfare, cyber, special operations support, and systems integration. NSTXL manages many NSWC Crane OTA opportunities. KDT is 60–90 minutes from Crane."],
                ["NSTXL HQ", "Based in South Bend, IN. Manages over $2B in OTA transactions annually. Strong relationships with Indiana congressional delegation and regional defense industrial base. KDT's proximity enables face-to-face consortium engagement — a real advantage."],
                ["Purdue Applied Research Institute (PARI)", "Purdue University's applied research arm. Active participant in DoD OTA programs, particularly AI/ML, autonomy, and defense systems. Potential teaming partner for technology-intensive OTA proposals."],
                ["Tessa Two", "Indiana-based defense contractor that has successfully won multiple NSTXL-managed OTA agreements in physical security and force protection technology. Demonstrates the OTA pathway is real and accessible for Indiana-based firms in KDT's space."],
                ["Camp Atterbury / Indiana National Guard", "State-level training installation with DoD contract activity. Platform for KDT to build past performance and relationships in the Indiana defense community — feeds into OTA credibility."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
            <p className="text-teal-900 font-semibold text-sm mb-2">KDT&apos;s Geographic Advantage:</p>
            <p className="text-teal-800 text-sm">Companies that win OTA agreements through NSTXL often have direct relationships with the consortium staff. Being in Indiana — attending NSTXL events, building relationships with program managers at NSWC Crane, teaming with Purdue ARI — compounds over time into a pipeline that out-of-state competitors can&apos;t replicate from Washington D.C.</p>
          </div>
        </section>

        {/* PART 6 */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 6</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CMMC & OTAs</h2>
          <p className="text-gray-600 mb-6">Cybersecurity Maturity Model Certification (CMMC) is not contractually required for most OTA agreements — but it is increasingly expected and strategically advantageous.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">CMMC & OTA — What to Know</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["CMMC Not Required by Default", "OTA agreements are not FAR contracts and do not automatically include DFARS clauses — including CMMC flow-down requirements. Most OTAs for prototype work do not mandate CMMC certification."],
                ["CUI Handling", "If your OTA work involves handling Controlled Unclassified Information (CUI), the government will likely include data protection requirements in the agreement — even if not CMMC-labeled. Understand what data you'll be touching."],
                ["Positioning Advantage", "Companies that voluntarily hold CMMC Level 2 or are pursuing certification are viewed more favorably on OTA proposals — it signals maturity. On competitive white paper evaluations, CMMC posture differentiates."],
                ["Follow-On Production Risk", "If KDT wins an OTA prototype and the program transitions to a production contract (FAR-based), CMMC will apply to that follow-on. Get ahead of certification before the prototype ends."],
                ["KDT Recommendation", "Pursue CMMC Level 2 certification as part of KDT's overall DoD market posture — not just for FAR contracts. It positions KDT for OTA follow-on transitions and differentiates on white paper evaluations."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-cyan-200 rounded-xl p-5">
              <h4 className="font-bold text-cyan-800 text-sm mb-3">OTA Advantages for KDT</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "No FAR compliance overhead",
                  "Faster awards (60–90 days)",
                  "Non-traditional contractor preference",
                  "IP rights more negotiable",
                  "Follow-on production sole-source potential",
                  "White paper vs. full proposal (lower bid cost)",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-cyan-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3">OTA Risks to Manage</h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "No FAR protections (double-edged)",
                  "Agreement terms vary — read carefully",
                  "Follow-on not guaranteed",
                  "IP rights require active negotiation",
                  "Prototype must actually demonstrate capability",
                  "Consortium membership fees and processes",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-slate-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-950 to-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready for the OTA Simulation?</h2>
          <p className="text-cyan-200 mb-6 text-sm">
            Practice white paper writing, consortium navigation, and OTA agreement pursuit in a realistic environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?vehicle=ota&ready=true"
              className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Begin OTA Simulation →
            </Link>
            <Link
              href="/modules/ota-training"
              className="inline-block bg-transparent border border-cyan-400 hover:border-cyan-200 text-cyan-300 hover:text-cyan-100 font-medium py-3 px-6 rounded-lg transition-colors text-sm"
            >
              OTA Training First →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
