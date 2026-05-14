function VehicleCard({
  name,
  abbr,
  headerBg,
  definition,
  facts,
  kdtNote,
  priority,
}: {
  name: string;
  abbr?: string;
  headerBg: string;
  definition: string;
  facts: [string, string][];
  kdtNote: string;
  priority?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className={`${headerBg} px-6 py-3 flex items-center justify-between`}>
        <div>
          <span className="text-white font-bold text-sm">{name}</span>
          {abbr && <span className="text-white/60 text-xs ml-2">· {abbr}</span>}
        </div>
        {priority && (
          <span className="bg-amber-400 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
            {priority}
          </span>
        )}
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{definition}</p>
          <div className="space-y-1.5">
            {facts.map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-gray-400 w-32 flex-shrink-0">{k}:</span>
                <span className="text-gray-700">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-2">📌 KDT</p>
          <p className="text-slate-200 text-sm leading-relaxed">{kdtNote}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mt-8 mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function VehicleList({
  headerBg,
  title,
  note,
  items,
}: {
  headerBg: string;
  title: string;
  note?: string;
  items: { name: string; desc: string }[];
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className={`${headerBg} px-6 py-3`}>
        <h4 className="text-white font-semibold text-sm uppercase tracking-wide">{title}</h4>
        {note && <p className="text-white/70 text-xs mt-1">{note}</p>}
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.name} className="px-6 py-3.5 flex gap-4">
            <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0">{item.name}</span>
            <span className="text-gray-600 text-sm leading-relaxed">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

function ViewToggle({ view, setView }: { view: "natural" | "timeline"; setView: (v: "natural" | "timeline") => void }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
        {(["natural", "timeline"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              view === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {v === "natural" ? "Natural" : "Timeline"}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400">
        {view === "natural"
          ? "Grouped by vehicle category — what type of contract it is."
          : "Grouped by when KDT should pursue it — realistic on-ramp sequence."}
      </p>
    </div>
  );
}

function TimelineView() {
  const stages = [
    {
      stage: "Stage 1",
      label: "Start Here — Open Market",
      color: "bg-slate-800",
      border: "border-slate-500",
      badge: "bg-slate-100 text-slate-800",
      btn: "bg-slate-700 hover:bg-slate-600",
      desc: "Zero barrier. No vehicle seat required. Any eligible company can respond to any open-market RFP on SAM.gov. This is where KDT's first wins, first past performance, and first past performance citations come from.",
      vehicles: [
        { name: "Open Market / SAM.gov Direct", note: "Direct RFP response under NAICS 561612 (security services) or KDT's other verticals. No vehicle access needed — just eligibility and a competitive proposal. Every guard contract, logistics bid, and construction opportunity starts here." },
      ],
    },
    {
      stage: "Stage 2",
      label: "First Vehicle — GSA Schedule (MAS)",
      color: "bg-violet-800",
      border: "border-violet-400",
      badge: "bg-violet-100 text-violet-800",
      btn: "bg-violet-700 hover:bg-violet-600",
      desc: "The most accessible vehicle. A 6–12 month application process unlocks all-agency ordering without a full competitive solicitation each time. Start the application in Year 1 — it takes time but pays off for years.",
      vehicles: [
        { name: "GSA Multiple Award Schedule (MAS)", note: "Agencies buy directly from Schedule via eBuy without running a full RFP. Once on Schedule, KDT competes for task orders in a smaller pool and can establish BPAs for recurring work. Security services SINs: PSS / SIN 541690, SIN 561210." },
        { name: "BPA (Blanket Purchase Agreement)", note: "Often established after Schedule award. Agency sets up a BPA with KDT and calls off orders against it for years — the highest-volume mechanism for repeat work." },
      ],
    },
    {
      stage: "Stage 3",
      label: "Innovation On-Ramp — SBIR / OTA",
      color: "bg-cyan-800",
      border: "border-cyan-400",
      badge: "bg-cyan-100 text-cyan-800",
      btn: "bg-cyan-700 hover:bg-cyan-600",
      desc: "Funded R&D with no price competition on prototype OTAs. SBIR builds past performance with DoD money. OTA consortium membership is affordable and opens prototype work faster than FAR-based vehicles.",
      vehicles: [
        { name: "SBIR / STTR", note: "Phase I (~$275K, 6 months) → Phase II (~$1–2M, 2 years) → Phase III (sole-source production, no competition). AFWERX, SOFWERX, DIU are KDT's primary pathways given its SOCOM-adjacent capabilities and security tech focus." },
        { name: "OTA — Other Transaction Authority", note: "Prototype agreements outside FAR. No price competition required. Faster than traditional contracts. Access through consortium membership — join NSTXL, SOFWERX, or AFWERX to open the door." },
        { name: "AFWERX", note: "Air Force innovation hub. AI, autonomy, cyber. Strong SBIR and OTA pathways." },
        { name: "SOFWERX", note: "SOCOM's innovation arm. Directly relevant to KDT's defense/security focus. Rapid prototyping for special operations capabilities." },
        { name: "DIU (Defense Innovation Unit)", note: "DoD commercial tech accelerator. Fastest path from commercial product to DoD prototype contract via Commercial Solutions Opening (CSO)." },
        { name: "NSTXL", note: "Largest OTA consortium. Single membership opens access to multiple portfolios: C5, S2MARTS, MCDC, and more." },
        { name: "NavalX / Army xTechSearch", note: "Service-specific innovation hubs. Lower barrier for new entrants building DoD past performance." },
      ],
    },
    {
      stage: "Stage 4",
      label: "Leverage Primes — IDIQs & Special Programs",
      color: "bg-amber-800",
      border: "border-amber-400",
      badge: "bg-amber-100 text-amber-800",
      btn: "bg-amber-700 hover:bg-amber-600",
      desc: "Get on big vehicles through established primes while building the past performance needed to compete for seats directly. 8(a) is a massive accelerant if KDT qualifies — check eligibility early.",
      vehicles: [
        { name: "Subcontracting Under Prime-Held IDIQs", note: "Prime has the vehicle, KDT delivers the work. KDT cites the contract as past performance for future pursuits. Best path onto GWACs you can't access directly yet." },
        { name: "Agency IDIQ / Task Orders", note: "Once past performance exists, compete for IDIQ seats directly. Pre-approved vendor pool for 5+ years of task orders. First seat is hardest — after that, task order competitions run in a small pool." },
        { name: "8(a) Program (if eligible)", note: "SBA Business Development Program. 9-year term. Sole-source authority up to $4.5M for services. Major accelerant for winning early classified work, DoD contracts, and GWAC seats. Check eligibility immediately if KDT qualifies." },
        { name: "MATOC (USACE)", note: "Multiple Award Task Order Contract for construction. If KDT pursues facility construction or renovation under federal contracts, MATOC seats are the path to steady construction pipeline." },
      ],
    },
    {
      stage: "Stage 5",
      label: "Major GWACs — Year 3–5+",
      color: "bg-emerald-800",
      border: "border-emerald-400",
      badge: "bg-emerald-100 text-emerald-800",
      btn: "bg-emerald-700 hover:bg-emerald-600",
      desc: "Government-Wide Acquisition Contracts — any federal agency can use these. High-value, long-term pipelines. Require 3–5 years of documented past performance and six-figure proposal investments. These are the target, not the start.",
      vehicles: [
        { name: "OASIS+", note: "GSA flagship non-IT professional services GWAC. No ceiling. Covers professional, management, and technical services across all agencies. KDT's primary GWAC target for security and program management services." },
        { name: "Alliant 3", note: "GSA flagship IT GWAC (~$75B ceiling, 10-yr PoP, started March 2026). Relevant if KDT builds out cyber and IT capabilities." },
        { name: "Polaris", note: "GSA small business IT GWAC. 4 pools: SB, WOSB, SDVOSB, 8(a). KDT's likely IT/cyber GWAC target." },
        { name: "SEWP VI", note: "NASA IT products and product-based services. Fast catalog-style ordering." },
        { name: "CIO-SP4", note: "NIH health IT and general IT. Heavily used across civilian agencies." },
        { name: "SeaPort-NxG", note: "Navy services vehicle. Engineering, PM, logistics. Relevant for KDT Navy security and support work." },
        { name: "MAPS / RS3 / Encore III", note: "DoD-specific IDIQs (Army, DISA). High-value vehicles with strong KDT alignment once past performance exists. Encore III especially requires CMMC Level 2 posture." },
        { name: "IAC/MAC", note: "DTIC-administered RDT&E vehicle ($28–48B ceiling, 9-yr PoP). For KDT's technology and cyber capabilities. Requires significant technical depth." },
      ],
    },
    {
      stage: "Stage 6",
      label: "Classified / IC — With Clearances",
      color: "bg-red-900",
      border: "border-red-600",
      badge: "bg-red-100 text-red-800",
      btn: "bg-red-800 hover:bg-red-700",
      desc: "Most IC procurement never appears on SAM.gov. Entry requires TS/SCI clearances, an active agency sponsor relationship, and usually a cleared prime to sub through first. Build cleared capabilities first — then pursue through relationships.",
      vehicles: [
        { name: "Glasswing (CIA)", note: "CIA commercial solutions vehicle. AI, analytics, data. Requires TS/SCI and active IC relationship." },
        { name: "Janus (NGA)", note: "Geospatial intelligence and imagery analysis. TS/SCI + sponsor required." },
        { name: "SIA", note: "Defense Intelligence Enterprise IDIQ (~$17B). Analysis and analytic enabling capabilities. TS/SCI required." },
        { name: "Eagle Pass / IC General", note: "Classified IC procurement. Details restricted. Entry path: cleared team → cleared prime relationship → sponsor agency." },
        { name: "DHS EAGLE II / PACTS", note: "DHS-wide IT and professional services vehicles. Recompete upcoming on EAGLE II — watch for on-ramp opportunities. Lower clearance bar than IC vehicles." },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stage nav strip */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex gap-2 min-w-max">
          {stages.map((s) => (
            <button
              key={s.stage}
              onClick={() => {
                const el = document.getElementById(`veh-tl-${s.stage.replace(" ", "")}`);
                if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 88; window.scrollTo({ top: y, behavior: "smooth" }); }
              }}
              className={`${s.btn} text-white text-xs font-bold px-3 py-2.5 rounded-lg transition-opacity whitespace-nowrap`}
            >
              {s.stage}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-0.5">KDT on-ramp sequence — jump to any stage ↑</p>
      </div>

      {stages.map((s) => (
        <div key={s.stage} id={`veh-tl-${s.stage.replace(" ", "")}`} className={`bg-white border-2 ${s.border} rounded-xl overflow-hidden shadow-sm scroll-mt-24`}>
          <div className={`${s.color} px-6 py-4`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                  <span className="opacity-60 mr-1">{s.stage} —</span>{s.label}
                </h3>
                <p className="text-white/70 text-xs mt-1 leading-relaxed">{s.desc}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge} flex-shrink-0 mt-0.5`}>
                {s.vehicles.length} vehicles
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {s.vehicles.map((v) => (
              <div key={v.name} className="px-6 py-4 flex gap-4">
                <span className="font-bold text-gray-900 text-sm w-52 flex-shrink-0 leading-snug">{v.name}</span>
                <span className="text-gray-600 text-sm leading-relaxed">{v.note}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VehiclesTab() {
  const [view, setView] = useState<"natural" | "timeline">("natural");

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-slate-700 text-sm leading-relaxed">
          Not all contracts work the same way. The <strong>contract vehicle</strong> determines how work is competed, how task orders flow, and what it takes to get on — and stay on. All vehicles appear in both views.
        </p>
      </div>

      <ViewToggle view={view} setView={setView} />

      {view === "timeline" ? <TimelineView /> : <div className="space-y-4">

      {/* PRIMARY VEHICLES */}
      <SectionHeader title="Primary Entry Points" subtitle="No or low barrier — pursue these first" />

      <VehicleCard
        name="Open Market / SAM.gov Direct"
        abbr="Standard FFP"
        headerBg="bg-slate-800"
        priority="KDT PRIORITY #1"
        definition="Direct solicitation — no vehicle membership required. Agency posts an RFP on SAM.gov, any eligible company responds. The most straightforward path into GovCon."
        facts={[
          ["Solicitation type", "RFP or RFQ"],
          ["Contract type", "Typically FFP"],
          ["Who can compete", "Any eligible company meeting set-aside/size requirements"],
          ["Best for", "Security services, guard contracts, logistics, supplies"],
        ]}
        kdtNote="KDT's primary entry point. Most armed security guard contracts on SAM.gov are standard open-market RFPs under NAICS 561612. No vehicle access required — just eligibility and a competitive proposal."
      />

      <VehicleCard
        name="GSA Multiple Award Schedule"
        abbr="MAS / GSA Schedule"
        headerBg="bg-violet-900"
        priority="KDT PRIORITY #2"
        definition="GSA's pre-negotiated vehicle covering commercial products and services. Agencies can buy from Schedule contractors without a full competitive solicitation. Orders via eBuy."
        facts={[
          ["Administered by", "General Services Administration (GSA)"],
          ["Security services SIN", "PSS / SIN 541690, SIN 561210 (Facilities)"],
          ["Ordering tool", "eBuy (GSA's RFQ platform)"],
          ["Application timeline", "6–12 months for initial schedule award"],
          ["SINs also relevant", "54151S (IT services), 54151HEAL (health IT), 54151HACS (highly adaptive cybersecurity), 541330 (engineering)"],
        ]}
        kdtNote="Most accessible vehicle. Getting on GSA Schedule lets agencies buy from KDT without full RFP process. Long-term investment — apply in Year 1, start seeing orders in Year 2. Also unlocks BPAs for recurring work."
      />

      <VehicleCard
        name="SBIR / STTR"
        abbr="Small Business Innovation Research / Tech Transfer"
        headerBg="bg-orange-900"
        priority="KDT PRIORITY #3"
        definition="Federal program funding small businesses to develop and commercialize innovative technologies. Phase I (feasibility) → Phase II (prototype) → Phase III (sole-source commercialization). No vehicle seat required — apply directly per agency."
        facts={[
          ["Phase I", "~$50K–$275K · 6 months · feasibility study"],
          ["Phase II", "~$1–2M · 2 years · prototype development"],
          ["Phase III", "Commercialization — no SBIR funding, but sole-source eligible"],
          ["Eligibility", "US-owned small business, <500 employees"],
          ["Key programs", "AFWERX (Air Force), SOFWERX (SOCOM), DIU, Army xTechSearch"],
        ]}
        kdtNote="If KDT is developing technology (surveillance AI, threat detection, training systems), SBIR is a funded path to build and prove it — then convert Phase III into production contracts with no competition. SOFWERX is especially relevant given KDT's SOCOM-adjacent capabilities."
      />

      <SectionHeader title="OTA / Innovation Pathways" subtitle="No FAR required — faster, more flexible" />

      <VehicleCard
        name="OTA — Other Transaction Authority"
        abbr="OTA"
        headerBg="bg-cyan-900"
        priority="KDT PRIORITY #4"
        definition="Legal authority allowing DoD and certain agencies to enter agreements outside FAR/DFARS. Used for prototype development, R&D, and rapid capability acquisition. Not a contract — an 'Other Transaction Agreement.' Access is typically through a consortium."
        facts={[
          ["Authority", "10 U.S.C. § 4021 (prototype OTs), § 4022 (follow-on production)"],
          ["Key consortia", "NSTXL, AFWERX, SOFWERX, NavalX, DIU, S2MARTS, C5"],
          ["Consortium fees", "Relatively affordable to join (~$1K–$10K/yr)"],
          ["No FAR/DFARS", "Faster award, more flexible terms"],
          ["DoD mandate", "March 2025 directive expanded OTA usage for emerging capabilities"],
        ]}
        kdtNote="Entry through consortium is affordable and opens prototype work with DoD. SOFWERX (SOCOM) and AFWERX (Air Force) are KDT's best targets given its defense/security focus. Innovation track — not for standard guard services, but critical for any tech KDT develops."
      />

      <VehicleList
        headerBg="bg-cyan-950"
        title="OTA Consortium Directory"
        note="Joining a consortium gives you access to that consortium's OTA opportunities"
        items={[
          { name: "AFWERX", desc: "Air Force innovation hub — SBIR, challenge grants, direct OTAs. Strong for AI, autonomy, cyber." },
          { name: "SOFWERX", desc: "SOCOM's innovation arm. Directly relevant to KDT — special operations capability development, rapid prototyping." },
          { name: "NavalX", desc: "Naval innovation accelerator. Sea systems, unmanned, cyber." },
          { name: "Army xTechSearch", desc: "Army prize competition for technology development. Competitive but visible." },
          { name: "DIU (Defense Innovation Unit)", desc: "DoD commercial tech accelerator. AI, autonomy, space, cyber, human systems. Civilian-focused DoD buying." },
          { name: "NSTXL", desc: "Largest OTA consortium. Manages MCDC, S2MARTS, C5, and more. Single membership opens multiple portfolios." },
          { name: "C5", desc: "Command, Control, Communications, Computers & Combat Systems. NSTXL-managed. C4ISR focus." },
          { name: "S2MARTS", desc: "Sea, Submarine & Maritime R&T. NSTXL-managed. Navy/undersea systems." },
          { name: "MD5 / NSIN", desc: "National Security Innovation Network. Connects universities, startups, and non-traditional defense companies to DoD problems." },
        ]}
      />

      <SectionHeader title="IDIQ Vehicles" subtitle="Get on contract once — compete for task orders over 5+ years" />

      <VehicleCard
        name="Agency IDIQ / Task Orders"
        abbr="IDIQ"
        headerBg="bg-indigo-900"
        priority="KDT PRIORITY #5"
        definition="Indefinite Delivery, Indefinite Quantity. An umbrella vehicle with a ceiling (e.g., $50M over 5 years). Getting 'on contract' = pre-approved vendor. Work flows through individually competed Task Orders among holders."
        facts={[
          ["Structure", "Base IDIQ → Task Orders competed among holders only"],
          ["Typical ceiling", "$10M–$500M+"],
          ["Period of performance", "Usually 5 years (1 base + 4 options)"],
          ["On-ramp", "Periodic re-opening to add new vendors to the pool"],
        ]}
        kdtNote="High-value target once past performance exists. Getting on a DoD IDIQ for security services = steady task order pipeline for 5 years. Hard to win a seat initially — but each subsequent task order competes in a small pool of pre-approved vendors, not the open market."
      />

      <SectionHeader title="GWACs — Government-Wide Acquisition Contracts" subtitle="Multi-agency IDIQs — any federal agency can use these" />

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-sm text-amber-900">
        <strong>Reality check for KDT:</strong> Most GWACs require extensive past performance and six-figure proposal investments. These are Year 3–5+ targets — build past performance first via open market wins, GSA Schedule, and subcontracting.
      </div>

      <VehicleList
        headerBg="bg-slate-700"
        title="IT & Professional Services GWACs"
        items={[
          { name: "Alliant 3", desc: "GSA's new flagship IT GWAC (~$75B ceiling, 10-yr PoP starting March 2026). Replaces Alliant 2. Large and small business pools. Requires significant IT past performance." },
          { name: "Alliant 2", desc: "GSA, large business IT services. Active predecessor to Alliant 3 — still in use during transition." },
          { name: "Polaris", desc: "GSA small business IT GWAC. 4 pools: SB, WOSB, SDVOSB, 8(a). KDT's likely GWAC target for IT/cyber work when eligible." },
          { name: "8(a) STARS III", desc: "GSA, 8(a) certified small business IT. Requires active 8(a) program status." },
          { name: "VETS 2", desc: "GSA, SDVOSB IT services. Requires SDVOSB certification. Strong for veteran-owned tech companies." },
          { name: "OASIS+", desc: "GSA's flagship non-IT professional services GWAC (no ceiling). Replaces original OASIS. Covers professional, management, and technical services across all agencies." },
          { name: "CIO-SP4", desc: "NIH, health IT and general IT. One of the most heavily used civilian agency vehicles." },
          { name: "SEWP VI", desc: "NASA, IT products and product-based services. Catalog-style — fast ordering for commoditized IT." },
        ]}
      />

      <VehicleList
        headerBg="bg-slate-700"
        title="Specialized GWACs / Agency-Wide Vehicles"
        items={[
          { name: "ASTRO", desc: "GSA/DoD, manned/unmanned/optionally manned platforms and robotics. Family of MA-IDIQs covering unmanned systems, autonomous platforms." },
          { name: "Ascend BPA", desc: "GSA, $5B cloud services BPA for Schedule holders with SIN 518210C. Fast-path cloud orders." },
          { name: "USA Contact", desc: "GWAC for citizen-facing contact center solutions. Relevant if KDT enters government call center or citizen engagement work." },
        ]}
      />

      <SectionHeader title="DoD-Specific Vehicles" subtitle="Branch-level IDIQs — pre-approved pool for that branch's work" />

      <VehicleList
        headerBg="bg-slate-800"
        title="Navy"
        items={[
          { name: "SeaPort-NxG", desc: "Navy services vehicle. Broad scope: engineering, program management, analysis, logistics. Relevant for KDT Navy security/protective services work." },
        ]}
      />

      <VehicleList
        headerBg="bg-slate-800"
        title="Army"
        items={[
          { name: "MAPS", desc: "Merges ITES-3S and RS3. Umbrella Army IT and professional services vehicle." },
          { name: "RS3", desc: "Army Responsive Strategic Sourcing for Services. C5ISR engineering and RDT&E. Strong for KDT's tech capabilities." },
          { name: "MSD", desc: "Army Modern Software Development. $10B IDIQ for agile software, customization, and modernization." },
          { name: "R2", desc: "CECOM, engineering/IT/logistics. Known for fast 45-day task order awards." },
          { name: "Army Research Lab MAC", desc: "Applied research for Army Modernization priorities: soldier lethality, vertical lift, networks. RDT&E focus." },
          { name: "CHESS ITES-3H", desc: "Army IT hardware procurement." },
          { name: "CHESS ITES-SW2", desc: "Army software procurement." },
          { name: "CHESS ITES-3S", desc: "Army IT services. Being absorbed into MAPS." },
        ]}
      />

      <VehicleList
        headerBg="bg-slate-800"
        title="Air Force / DISA / Other DoD"
        items={[
          { name: "NETCENTS-2", desc: "Air Force networking and IT services." },
          { name: "Encore III", desc: "DISA IT services. Requires high cybersecurity posture — CMMC Level 2 expected." },
          { name: "SETI", desc: "DISA systems engineering and technical innovation." },
          { name: "Tradewind Solutions Marketplace", desc: "CDAO (Chief Digital and AI Office). AI/ML prototyping and data services. New vehicle — relevant for KDT's AI/tech capabilities." },
        ]}
      />

      <SectionHeader title="IAC/MAC — Research & Development" subtitle="DTIC-administered · DoD's preferred RDT&E vehicle" />

      <VehicleCard
        name="IAC/MAC"
        abbr="Information Analysis Center Multiple Award Contract"
        headerBg="bg-teal-900"
        definition="DTIC (Defense Technical Information Center) administered IDIQ for research, development, testing & evaluation (RDT&E). DoD's preferred vehicle for S&T work. $28–48B ceiling, 9-year period of performance."
        facts={[
          ["Administered by", "DTIC under DoD"],
          ["3 domains", "Defense Systems · Cybersecurity & Info Systems · Homeland Defense & Security"],
          ["22 focus areas", "C4ISR, cyber, autonomous systems, advanced materials, directed energy, M&S"],
          ["Clearance support", "Classified work up to TS/SCI · CONUS + OCONUS"],
          ["STI mandate", "New S&T information generated must be shared across government"],
        ]}
        kdtNote="Long-term track for KDT's tech division. Relevant for cyber capabilities, security technology, or C4ISR solutions. Requires significant technical depth and RDT&E past performance. Not a day-one vehicle."
      />

      <SectionHeader title="DHS Vehicles" subtitle="Department of Homeland Security" />

      <VehicleList
        headerBg="bg-slate-700"
        title="DHS-Specific"
        items={[
          { name: "EAGLE II", desc: "DHS-wide IT solutions vehicle. Recompete upcoming — watch for on-ramp opportunities." },
          { name: "DHS PACTS", desc: "Program management, administrative, and technical services across DHS components." },
          { name: "DHS S&T Vehicles", desc: "Science and Technology Directorate support vehicles. R&D focus for border security, cyber, infrastructure protection." },
        ]}
      />

      <SectionHeader title="Intelligence Community" subtitle="Classified and restricted access — awareness only" />

      <div className="bg-gray-900 border border-red-800 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-900 border-b border-red-700 px-6 py-3 flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide">IC Contract Vehicles</h4>
          <span className="bg-red-700 text-red-100 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Restricted Access</span>
        </div>
        <div className="divide-y divide-gray-800 px-6">
          {[
            ["Glasswing (CIA)", "CIA's commercial solutions opening vehicle. AI, analytics, data tools. Requires TS/SCI and active IC relationship."],
            ["Janus (NGA)", "National Geospatial-Intelligence Agency vehicle for geospatial and imagery analysis services."],
            ["SIA", "Defense Intelligence Enterprise IDIQ (~$17B). Analysis and analytic enabling capabilities for the defense intel community."],
            ["Eagle Pass", "Classified IC vehicle. Details not publicly available."],
            ["Classified IC Vehicles", "Most IC procurement happens through vehicles not listed on SAM.gov. Access requires TS/SCI clearance and a sponsor agency relationship."],
          ].map(([name, desc]) => (
            <div key={name} className="py-3.5 flex gap-4">
              <span className="font-bold text-gray-100 text-sm w-52 flex-shrink-0">{name}</span>
              <span className="text-gray-400 text-sm leading-relaxed">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader title="Other Mechanisms" subtitle="High-volume, often overlooked" />

      <VehicleList
        headerBg="bg-slate-700"
        title="Other Worth Knowing"
        items={[
          { name: "BPA", desc: "Blanket Purchase Agreement. Pre-negotiated ordering arrangement under a Schedule or open market. Often the highest-volume mechanism for repeat work — agencies set one up and call off orders for years." },
          { name: "MATOC", desc: "Multiple Award Task Order Contract. Used heavily by USACE for construction and engineering. Similar structure to IDIQ but construction-focused." },
          { name: "PRISM", desc: "$1.8B MATOC for personnel and readiness with military systems." },
          { name: "MDA Contracts", desc: "Missile Defense Agency IT and engineering vehicles. Niche but high-value if KDT pursues directed energy or missile defense tech." },
          { name: "GSA Stars", desc: "Newer GSA cloud and emerging tech vehicle family being rolled out." },
          { name: '"The Store"', desc: "Flexible OEM/VAR vehicle for products and services. Fast-path commercial item purchasing." },
        ]}
      />

      <SectionHeader title="Set-Aside Programs" subtitle="Eligibility gates — not vehicles themselves" />

      <div className="bg-white border-2 border-amber-300 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-amber-800 px-6 py-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Set-Aside Certifications</h4>
          <p className="text-amber-200 text-xs mt-1">These restrict competition to companies holding a specific certification. Check your eligibility before pursuing set-aside vehicles.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            ["Small Business (SB)", "Must meet the size standard for the NAICS code (revenue or employee threshold). Most common set-aside. KDT's current lane."],
            ["SDVOSB", "Service-Disabled Veteran-Owned Small Business. Verified through VA VetCert. Heavy use on DoD and VA contracts."],
            ["8(a)", "SBA Business Development Program for socially/economically disadvantaged businesses. 9-year program with sole-source authority up to $4.5M (services). Massive accelerant if KDT qualifies."],
            ["HUBZone", "Historically Underutilized Business Zone. Principal office + 35% employees must be in designated HUBZone area."],
            ["WOSB", "Women-Owned Small Business. Must be at least 51% women-owned and controlled."],
          ].map(([cert, desc]) => (
            <div key={cert} className="px-6 py-4 flex gap-4">
              <span className="font-bold text-gray-900 text-sm w-44 flex-shrink-0">{cert}</span>
              <span className="text-gray-600 text-sm leading-relaxed">{desc}</span>
            </div>
          ))}
        </div>
      </div>
      </div>}
    </div>
  );
}
