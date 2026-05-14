import Link from "next/link";

export const metadata = {
  title: "Module 07 — SBIR/STTR R&D Programs | Zam.guv",
};

export default function SBIRPage() {
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
            <span className="text-sm text-gray-500 hidden sm:block">SBIR/STTR R&D Programs</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Title block */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Knight Division Tactical · Module 07</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">SBIR/STTR R&D Programs</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>15–20 min</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>No login required</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>Read before simulation</span>
          </div>
        </div>

        {/* WELCOME */}
        <section className="mb-12">
          <div className="bg-orange-950 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-sm font-bold mb-4 text-orange-300 uppercase tracking-wide">Why SBIR/STTR Is KDT&apos;s R&D Funding Engine</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              SBIR and STTR are not grants — they are competitive awards that fund small businesses to perform R&D for federal agencies. Equity-free, congressionally mandated, and reserved exclusively for small businesses. Over $4B per year flows through this program across 11 federal agencies.
            </p>
            <p className="text-orange-200 leading-relaxed mb-4">
              For KDT, SBIR is the path to funded technology development — building proprietary security systems, training platforms, and force protection capabilities using government dollars, retaining the IP, and then commercializing those technologies through Phase III production contracts and commercial sales. The program was designed for exactly this.
            </p>
            <div className="mt-6 pt-6 border-t border-orange-800">
              <p className="text-amber-300 font-semibold">
                ⚠️ The SBIR program has been in a funding pause since October 2025 due to congressional appropriations delays. As of May 2026, resumption is anticipated but not confirmed. Preparing now — topics research, proposal drafts, teaming — means KDT is first to respond when solicitations reopen.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is SBIR/STTR</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs are congressionally mandated set-asides requiring federal agencies above a certain extramural R&D budget threshold to allocate a percentage of that budget to small businesses. SBIR is 3.2% of an agency&apos;s extramural R&D budget; STTR is 0.45%. The programs are authorized under the Small Business Act, 15 U.S.C. § 638.
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 my-6">
              <p className="text-orange-800 font-medium">
                SBIR is not a grant in the traditional sense — it is a competitive procurement for R&D services. The government is the customer for the research. But unlike traditional contracts, you own the IP you develop. That&apos;s the deal: government funding, your intellectual property.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm my-6">
              <div className="bg-slate-800 px-6 py-3">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">SBIR/STTR — Core Concepts</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ["Small Business Only", "SBIR/STTR awards go exclusively to small businesses as defined by SBA size standards. The principal researcher (Principal Investigator) must be primarily employed by the small business. No large primes can be the awardee."],
                  ["Equity-Free Funding", "SBIR awards are not equity investments — the government does not take an ownership stake in your company. You receive the award, perform the R&D, and retain commercial rights to the developed technology. No dilution."],
                  ["Competitive", "SBIR/STTR is competitive. Agencies issue solicitations with specific technical topic areas. Companies submit proposals responsive to those topics. Awards are made on technical merit and commercial potential. Win rates typically range from 10–25% depending on agency and topic."],
                  ["Participating Agencies", "11 federal agencies participate: DoD (largest — ~$2.5B/year), HHS/NIH, NSF, NASA, DOE, USDA, EPA, ED, DOT, DHS, and the National Institute of Standards and Technology (NIST)."],
                  ["Technical Topic Areas", "Each solicitation lists specific Technical Topic Areas (TTAs) — the technology problems agencies want solved. Proposals must be responsive to a specific topic. You cannot submit a generic proposal; it must address the stated TTA."],
                  ["PI Primary Employment", "The Principal Investigator (PI) leading the SBIR work must be primarily employed (>50% of time) by the small business at the time of award and during Phase I performance. This rules out PI arrangements with a research university as the PI&apos;s primary employer."],
                ].map(([term, def]) => (
                  <div key={term} className="px-6 py-4 flex gap-4">
                    <span className="font-bold text-gray-900 text-sm w-48 flex-shrink-0">{term}</span>
                    <span className="text-gray-600 text-sm">{def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 my-6 border-l-4 border-orange-400">
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">📌 KDT Real-World Example</p>
              <p className="text-white leading-relaxed text-sm">
                AFRL (Air Force Research Laboratory) issues an SBIR solicitation with Topic AF24-002: <strong className="text-orange-300">Rapid Identity Verification for Contested Entry Control Points</strong>. KDT submits a Phase I proposal for a portable biometric verification system operable in GPS-denied environments. Award: $300K, 6 months. KDT performs the feasibility study, demonstrates a working prototype, and submits a Phase II proposal. Phase II: $1.8M, 24 months. KDT develops the full system. IP is KDT&apos;s. AFRL can now award a Phase III production contract — no competition required.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Structure</h2>
          <p className="text-gray-600 mb-6">SBIR/STTR has a three-phase structure designed to take a technology from feasibility through full development and into commercialization. Understanding each phase — what it funds, what it proves, and what it unlocks — is essential for planning.</p>

          <div className="space-y-4 mb-6">
            {[
              {
                phase: "Phase I — Feasibility",
                color: "bg-orange-800",
                badge: "$50K–$300K · 6 months",
                body: "Phase I funds a feasibility study or small prototype to demonstrate that the proposed concept is technically sound and that the company can perform the work. The government is testing both the idea and the team. Phase I proposals are shorter (typically 20–30 pages) and awards are made faster. Not all Phase I awardees automatically get Phase II — you must compete again."
              },
              {
                phase: "Phase II — Full R&D",
                color: "bg-orange-700",
                badge: "$750K–$2M · 24 months",
                body: "Phase II is the main funding phase. It funds full R&D to develop the technology to a demonstration-ready state. Proposals are more detailed — full technical approach, team qualifications, commercialization plan, and facilities. Phase II awardees have already proven Phase I feasibility, so the bar is higher. Only Phase I awardees can apply for Phase II."
              },
              {
                phase: "Phase III — Commercialization",
                color: "bg-slate-700",
                badge: "No SBIR funds · Production",
                body: "Phase III is commercialization — bringing the technology to market. There is no SBIR/STTR funding in Phase III. Revenue comes from production contracts, licenses, and commercial sales. The critical feature: the agency that funded Phase I/II can award a Phase III production contract to the SBIR company without competition. This is the Phase III sole-source provision — the most powerful feature of the SBIR program."
              },
            ].map(({ phase, color, badge, body }) => (
              <div key={phase} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className={`${color} px-6 py-3 flex items-center justify-between`}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{phase}</h3>
                  <span className="text-orange-200 text-xs font-mono bg-black/20 px-2.5 py-1 rounded">{badge}</span>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Phase Flow Visual */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">SBIR Program Flow</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { stage: "Topic Release", note: "Agency solicitation", color: "bg-orange-100 text-orange-800 border border-orange-200" },
                { stage: "Phase I Proposal", note: "Feasibility study", color: "bg-amber-100 text-amber-800 border border-amber-200" },
                { stage: "Phase I Award", note: "$50–300K · 6mo", color: "bg-orange-600 text-white" },
                { stage: "Phase II Proposal", note: "Full R&D plan", color: "bg-orange-100 text-orange-800 border border-orange-200" },
                { stage: "Phase II Award", note: "$750K–2M · 24mo", color: "bg-orange-700 text-white" },
                { stage: "Phase III", note: "Sole-source available", color: "bg-green-600 text-white" },
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

        {/* PART 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 3</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Status & Timing</h2>
          <p className="text-gray-600 mb-6">The SBIR program is currently in a funding pause that began in October 2025. Understanding the status, cause, and preparation strategy is critical for KDT to be positioned when solicitations reopen.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">SBIR Pause — What Happened & What It Means</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["The Pause", "In October 2025, SBA froze SBIR/STTR program administration following congressional appropriations delays and a policy review of the program's structure under the current administration. New solicitations were suspended; existing Phase I and II awardees continued their work, but no new solicitations were issued."],
                ["Agency Impact", "DoD (the largest SBIR participant) paused its FY2026 SBIR solicitations across all components — AFRL, ARL, ONR, DARPA, MDA, SOCOM. HHS/NIH maintained limited solicitations. NSF issued a reduced solicitation. Most DoD topics planned for FY2026 solicitation have not been released."],
                ["Current Status (May 2026)", "As of May 2026, SBA is expected to resume normal SBIR operations in Q3 2026, but no official restart date has been confirmed. Congressional pressure to restore the program is significant — bipartisan support remains strong. Watch sbir.gov and agency-specific websites for solicitation announcements."],
                ["Why Prepare Now", "When solicitations resume, competition will be intense — pent-up proposals from companies that have been waiting. Companies that have pre-researched relevant topics, drafted preliminary proposals, and established agency relationships will have a significant advantage over those who wait for the solicitation to start preparing. KDT should use this window to research topics and build the proposal infrastructure now."],
                ["Monitoring Sources", "sbir.gov/solicitations — official SBIR solicitation portal. AFRL SBIR/STTR: afrl.af.mil. ARL: arl.army.mil/sbir. ONR: onr.navy.mil/contracts-grants/sbir-sttr. Federal Register: watch for SBIR policy updates. Set Google alerts for 'SBIR FY2026 solicitation'."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-orange-900 font-semibold text-sm mb-2">KDT Preparation Checklist During the Pause:</p>
            <ul className="space-y-1.5 text-sm text-orange-800">
              {[
                "Research prior DoD SBIR topics in security, force protection, and training (2023–2025 solicitations are searchable on sbir.gov)",
                "Identify the specific agency components most likely to issue topics relevant to KDT capabilities",
                "Draft a Phase I proposal outline for 2–3 priority topic areas",
                "Identify and contact potential university partners for STTR options",
                "Ensure KDT meets SBIR eligibility: ≤500 employees, majority U.S.-owned and controlled",
              ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{item}</li>)}
            </ul>
          </div>
        </section>

        {/* PART 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 4</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DoD SBIR Components</h2>
          <p className="text-gray-600 mb-6">DoD SBIR accounts for roughly 60% of all SBIR funding. Each military component issues its own solicitation with its own Technical Topic Areas. Knowing which component aligns to KDT&apos;s capabilities focuses your pursuit.</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-orange-900 px-6 py-3">
              <p className="text-white font-semibold text-sm uppercase tracking-wide">DoD SBIR Components — KDT Relevance</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Component</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Focus Areas</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">KDT Fit</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-700 text-xs uppercase tracking-wide">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["AFRL (Air Force Research Lab)", "Force protection tech, personnel security, training simulation, autonomous systems", "High — force protection, access control, training tech", "High"],
                    ["ARL (Army Research Lab)", "Soldier systems, base security, counter-IED, physical protection tech", "High — installation security, guard force technology, threat detection", "High"],
                    ["ONR (Office of Naval Research)", "Maritime security, base protection, expeditionary systems, cyber-physical", "Medium — NSWC Crane connection, force protection", "Medium"],
                    ["DARPA", "Breakthrough R&D, high-risk/high-reward, advanced technology", "Low — requires very novel tech; not core KDT sweet spot", "Low"],
                    ["MDA (Missile Defense Agency)", "Sensor systems, physical protection, secure facilities", "Low-Medium — niche security technology applications", "Low"],
                    ["SOCOM (Special Operations Command)", "Special operations support, personnel vetting, training, force protection", "High — KDT's direct mission alignment with SOCOM requirements", "High"],
                  ].map(([comp, focus, fit, priority]) => (
                    <tr key={comp} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-orange-700">{comp}</td>
                      <td className="px-6 py-4 text-gray-600">{focus}</td>
                      <td className="px-6 py-4 text-gray-600">{fit}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${priority === 'High' ? 'bg-orange-100 text-orange-800' : priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>{priority}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border-l-4 border-orange-400">
            <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">📌 Finding Technical Topic Areas</p>
            <p className="text-white leading-relaxed text-sm mb-3">
              Prior solicitation topics are searchable at <strong className="text-orange-300">sbir.gov/solicitations</strong>. Search by agency, keyword, and fiscal year. Read the full topic description — it explains the problem, the desired solution approach, and the technical maturity level expected at Phase I. The topic description tells you what the agency&apos;s program manager actually wants to build. That context is everything.
            </p>
            <p className="text-slate-400 text-sm">
              KDT should search prior AFRL and ARL solicitations for topics containing: &quot;force protection,&quot; &quot;access control,&quot; &quot;personnel security,&quot; &quot;physical security,&quot; &quot;training simulation,&quot; and &quot;entry control.&quot; Build a topic database from prior solicitations to shape your Phase I proposal drafts before the next solicitation drops.
            </p>
          </div>
        </section>

        {/* PART 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 5</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">STTR vs. SBIR</h2>
          <p className="text-gray-600 mb-6">STTR (Small Business Technology Transfer) is the sister program to SBIR. It has one critical structural difference: a formal research partnership with a university or federal lab is required. Understanding when STTR is advantageous vs. a liability shapes KDT&apos;s program selection.</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-orange-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-orange-800 px-5 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">SBIR</h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  ["PI Employment", "PI must be primarily employed (>50%) by the small business"],
                  ["University Role", "No required university partnership. Subcontracts allowed but not required."],
                  ["IP Ownership", "Awardee small business retains IP with minimal obligation to share"],
                  ["Admin Burden", "Lower — no formal research institution agreement required"],
                  ["Best For", "KDT-developed technology where KDT has the core technical capability in-house"],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-3">
                    <span className="font-bold text-orange-700 text-sm w-32 flex-shrink-0">{label}</span>
                    <span className="text-gray-600 text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-700 px-5 py-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">STTR</h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  ["PI Employment", "PI can be employed by the research institution (university or federal lab)"],
                  ["University Role", "Formal subcontract required — university performs ≥30% of work; small business ≥40%"],
                  ["IP Ownership", "Must be negotiated in the teaming agreement — more complex than SBIR"],
                  ["Admin Burden", "Higher — formal institutional agreement, university indirect rates, IP negotiation"],
                  ["Best For", "Technology requiring university research capabilities KDT doesn't have in-house"],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-3">
                    <span className="font-bold text-slate-700 text-sm w-32 flex-shrink-0">{label}</span>
                    <span className="text-gray-600 text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">STTR IP & Teaming Considerations</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["IP Agreement Required", "Before submitting an STTR proposal, you must have a written agreement with the research institution covering IP allocation. Who owns the foreground IP? Background IP? Commercial licensing rights? This must be resolved before proposal submission."],
                ["Purdue University / PARI", "Purdue's Applied Research Institute (PARI) is experienced with DoD STTR teaming agreements. For KDT, a Purdue STTR partnership enables access to Purdue's defense-aligned research capabilities — AI/ML, sensor systems, autonomy — without KDT needing to build that expertise internally."],
                ["University Indirect Rates", "Universities charge substantial indirect rates on STTR subcontracts — often 50–70% of direct labor costs. Factor this into your STTR budget. The university&apos;s portion of the award (≥30%) will carry these overhead rates, which are not negotiable."],
                ["When to Choose STTR", "Choose STTR when: (1) your proposed technical approach genuinely requires university-level research capability, (2) you have an existing relationship with a research institution, and (3) you&apos;ve resolved IP ownership upfront. Don&apos;t choose STTR just because a topic is listed under STTR — SBIR is simpler when both program options exist."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-48 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PART 6 */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Part 6</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">IP & Data Rights</h2>
          <p className="text-gray-600 mb-6">SBIR&apos;s IP and data rights protections are among the most favorable in federal contracting. Understanding what you own, what the government can access, and how long the protection lasts is fundamental to building long-term commercial value from SBIR work.</p>

          <div className="bg-orange-950 text-white rounded-2xl p-7 mb-6">
            <h3 className="text-orange-300 font-bold text-sm uppercase tracking-wide mb-4">The SBIR IP Value Proposition</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              SBIR is one of the few federal R&D funding mechanisms where the performing company — not the government — retains ownership of the intellectual property developed under the award. This is not a side benefit; it is the entire commercial model. Fund development with government dollars, own the resulting IP, commercialize through Phase III and commercial sales.
            </p>
            <div className="space-y-3">
              {[
                { item: "SBIR Data Rights (4-Year Shield)", note: "For 4 years after Phase II completion, the government can only use SBIR-developed data for government purposes. You can license it commercially during this window without government competition." },
                { item: "IP Ownership Stays with Company", note: "The small business owns the patents, trade secrets, and technical data arising from SBIR work. The government receives a license — not ownership. You can file patents, commercialize, and license independently." },
                { item: "Phase III Sole-Source", note: "The agency that funded Phase I/II can award a Phase III production or follow-on contract without competition, based solely on the prior SBIR work. This is the monetization pathway. No other program offers this level of production contract access." },
              ].map(({ item, note }) => (
                <div key={item} className="bg-orange-900/50 border border-orange-700 rounded-xl p-4">
                  <p className="font-bold text-white text-sm mb-1">{item}</p>
                  <p className="text-orange-200 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="bg-slate-800 px-6 py-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Data Rights Categories — SBIR Context</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["Limited Rights", "Technical data developed exclusively at private expense — maximum protection. Government can only use internally and cannot disclose to third parties without permission."],
                ["SBIR Data Rights", "Technical data or software first produced under an SBIR contract. 4-year protection period after the SBIR award ends. During this period, government use is restricted and third-party disclosure is prohibited."],
                ["Government Purpose Rights", "After the SBIR protection period expires. Government can use the data for any government purpose — internal use and limited sharing with contractors for government purposes — but not for commercial competition."],
                ["Unlimited Rights", "What the government wants. Negotiated into contracts when possible. Avoid granting unlimited rights to SBIR-developed technology — it removes all commercial protection. Never grant by default."],
              ].map(([term, def]) => (
                <div key={term} className="px-6 py-4 flex gap-4">
                  <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{term}</span>
                  <span className="text-gray-600 text-sm">{def}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-orange-200 rounded-xl p-5">
              <h4 className="font-bold text-orange-800 text-sm mb-3">SBIR IP Advantages for KDT</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Government funds R&D, KDT keeps IP",
                  "4-year SBIR data rights shield for commercial window",
                  "Phase III sole-source — no competition for production",
                  "Patent rights vest with KDT, not the government",
                  "Can commercialize the technology independently",
                  "IP position strengthens with each phase",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-orange-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-3">IP Risks to Manage</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Inadvertently granting unlimited rights in proposal",
                  "STTR IP splits — negotiate before proposal submission",
                  "Government march-in rights if company fails to commercialize",
                  "Foreign ownership restrictions (SBIR eligibility)",
                  "Subcontractor IP claims — define in teaming agreements",
                  "Patent filing deadlines during Phase I performance",
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-slate-400 flex-shrink-0">•</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-950 to-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready for the SBIR/STTR Simulation?</h2>
          <p className="text-orange-200 mb-6 text-sm">
            Practice researching SBIR topics, writing Phase I proposals, and navigating the program structure in a realistic environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?vehicle=sbir&ready=true"
              className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Begin SBIR/STTR Simulation →
            </Link>
            <Link
              href="/modules/sbir-training"
              className="inline-block bg-transparent border border-orange-400 hover:border-orange-200 text-orange-300 hover:text-orange-100 font-medium py-3 px-6 rounded-lg transition-colors text-sm"
            >
              SBIR Training First →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
