import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">ZAM.GOV</span>
            <span className="ml-3 text-blue-300 text-xs uppercase tracking-widest font-medium">KDT Government Contracting Assessment System</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-6 py-16">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold mb-3">Knight Division Tactical</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              GovCon Assessment System
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Three-module program: learn the landscape, train on the process, then take the live simulation.
            </p>
          </div>

          {/* ── Core Track ── */}
          <div className="mb-12">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Core Track</h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Module 01 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950 border border-blue-800 px-2.5 py-1 rounded-full">Module 01</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">KDT GovCon Introduction</h2>
                <p className="text-slate-400 text-sm mb-1">Pre-reading · 15–20 min · No login required</p>
                <p className="text-slate-300 text-sm mb-6 flex-1">
                  Terminology, landscape, and assessment criteria. Read this before touching the portal.
                </p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>The GovCon landscape</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>Core terminology (NAICS, set-asides, contract types)</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>How to read a contract listing</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>What you're being assessed on</div>
                </div>
                <Link
                  href="/modules/intro"
                  className="block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Introduction →
                </Link>
              </div>

              {/* Module 02 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950 border border-amber-800 px-2.5 py-1 rounded-full">Module 02</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">KDT GovCon Training</h2>
                <p className="text-slate-400 text-sm mb-1">Guided walkthrough · No timer · Login required</p>
                <p className="text-slate-300 text-sm mb-6 flex-1">
                  Full process: Opportunity ID → Bid/No-Bid → Proposal → Submit. Practice without pressure.
                </p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>Stage 1: Opportunity identification</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>Stage 2: Bid/no-bid decision framework</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>Stage 3: Proposal writing</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>Stage 4: Submission</div>
                </div>
                <Link
                  href="/modules/training"
                  className="block text-center bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Training →
                </Link>
              </div>

              {/* Module 03 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-950 border border-red-800 px-2.5 py-1 rounded-full">Module 03</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Zam.guv — GovCon Simulation</h2>
                <p className="text-slate-400 text-sm mb-1">Live assessment · 30-minute timer · Login required</p>
                <p className="text-slate-300 text-sm mb-6 flex-1">
                  52 active contract opportunities. Timer starts on login. Every decision is recorded and AI-scored.
                </p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>Browse 52 live contract listings</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>Identify KDT-aligned opportunities</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>Write and submit proposals</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>AI-scored on 4 dimensions</div>
                </div>
                <Link
                  href="/login"
                  className="block text-center bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Simulation →
                </Link>
              </div>

            </div>
          </div>

          {/* ── Vehicle-Specific Tracks ── */}
          <div className="mb-10">
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">Vehicle-Specific Tracks</h2>
              <p className="text-slate-500 text-sm">Deep-dive simulations for each major contract vehicle</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Module 04 — IDIQ */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950 border border-indigo-800 px-2.5 py-1 rounded-full">Module 04</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">IDIQ Contracts &amp; Task Orders</h2>
                <p className="text-slate-400 text-sm mb-1">20-25 min · Login required for simulation</p>
                <p className="text-slate-300 text-sm mb-6 flex-1"></p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></span>Browse 25 live IDIQ task orders</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></span>Task order bid/no-bid framework</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></span>Write and submit TO proposals</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></span>AI-scored on 4 dimensions</div>
                </div>
                <Link
                  href="/modules/idiq"
                  className="block text-center bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Module →
                </Link>
              </div>

              {/* Module 05 — OTA */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 border border-cyan-800 px-2.5 py-1 rounded-full">Module 05</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Other Transaction Authority</h2>
                <p className="text-slate-400 text-sm mb-1">20-25 min · Login required for simulation</p>
                <p className="text-slate-300 text-sm mb-6 flex-1"></p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>25 OTA prototype opportunities</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>Consortium-based pursuit strategy</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>Write OTA white papers</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>AI-scored evaluation</div>
                </div>
                <Link
                  href="/modules/ota"
                  className="block text-center bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Module →
                </Link>
              </div>

              {/* Module 06 — GSA */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-widest bg-violet-950 border border-violet-800 px-2.5 py-1 rounded-full">Module 06</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">GSA Schedule (MAS)</h2>
                <p className="text-slate-400 text-sm mb-1">15-20 min · Login required for simulation</p>
                <p className="text-slate-300 text-sm mb-6 flex-1"></p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></span>25 GSA Schedule task orders</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></span>eBuy and catalog strategy</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></span>Write compliant quotes</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></span>Pricing compliance check</div>
                </div>
                <Link
                  href="/modules/gsa"
                  className="block text-center bg-violet-700 hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Module →
                </Link>
              </div>

              {/* Module 07 — SBIR */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-950 border border-orange-800 px-2.5 py-1 rounded-full">Module 07</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">SBIR/STTR</h2>
                <p className="text-slate-400 text-sm mb-1">20-25 min · Login required for simulation</p>
                <p className="text-slate-300 text-sm mb-6 flex-1"></p>
                <div className="space-y-2 text-xs text-slate-400 mb-7">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>25 SBIR/STTR opportunities</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>Phase I/II strategy</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>Write technical proposals</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>AI-scored feasibility</div>
                </div>
                <Link
                  href="/modules/sbir"
                  className="block text-center bg-orange-700 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
                >
                  Begin Module →
                </Link>
              </div>

            </div>
          </div>

          {/* Sequence note */}
          <p className="text-center text-slate-500 text-sm mt-4">
            Recommended sequence: Introduction → Training → Simulation
          </p>
        </div>
      </main>

      <footer className="border-t border-white/10 py-4 px-6 text-center">
        <p className="text-slate-600 text-xs">Secure Government Contract Assessment System · Powered by Zam.guv · Knight Division Tactical</p>
      </footer>
    </div>
  );
}
