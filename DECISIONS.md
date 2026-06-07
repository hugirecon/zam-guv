# Zam.guv — Decisions & Project History

## What It Is
A fake SAM.gov simulation portal for assessing govcon VP candidates. Named **Zam.guv** by Michael Schulz.
Used to test judgment under time pressure — candidates browse a pool of government contracts and submit proposals within 30 minutes.

**Live:** https://zam-guv.vercel.app
**Repo:** https://github.com/hugirecon/zam-guv
**Vercel:** hugirecon account, project: zam-guv (auto-deploys from main)

---

## Stack
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM + @prisma/adapter-neon
- Neon Serverless Postgres (Vercel Marketplace integration, env: DATABASE_URL)
- Tailwind CSS (SAM.gov aesthetic — navy/white/bureaucratic)
- JWT auth via `jose` (cookie: `zam-token`, httpOnly, 8h)
- Anthropic Claude API (scoring: `claude-opus-4-5` — **open question: needs review/update**)

---

## Credentials

### Admin
- `admin@zam.guv` / `Admin@2026!`
- Dashboard: `/admin`

### VP Test Users (password: `VP@Secure2026!`)
- sarah.chen@company.gov
- james.walker@company.gov
- marcus.johnson@company.gov
- emily.rodriguez@company.gov
- david.kim@company.gov

### Demo Users (password: `KDT-Demo2026!`)
- demetrios@kdt.mil
- clark@kdt.mil
- simeon@kdt.mil

---

## Key Design Decisions

### Contract Pool
- **Same pool for all VPs** — Michael's call. Controls for luck; performance differences = pure candidate signal.
- 152 total contracts: 52 Standard + 25 each IDIQ / OTA / GSA / SBIR
- Mix of defense services, cyber, logistics, construction, supply — some KDT-relevant, most noise

### Timer
- 30-minute hard timer — locks portal and auto-submits on expiry
- **Known bug:** Auto-submitted proposals are NOT AI-scored (documented, not yet fixed)

### Modules
- 5 simulation vehicles, all independently accessible (no prerequisites)
- Module 01 — Standard / GovCon Intro (with Compliance Tab, Overview Tab, All Tab)
- Module 04 — IDIQ / Task Orders
- Module 05 — OTA / Other Transaction Authority (includes NSTXL/Indiana angle, March 2025 DoD mandate)
- Module 06 — GSA Schedule / MAS
- Module 07 — SBIR/STTR

### Compliance Framing Rule
- Zam does NOT assume KDT is or is not compliant. VPs learn recognition + escalation only.

### AI Scoring
- `aiFeedback` structure: JSON object with `strengths` / `weaknesses` / `recommendation` / `feedback`
- `aiScoreBreakdown` dimensions: `technical`, `management`, `pricing`, `past_performance`, `compliance`
- Login session mode: derived from `currentModule` server-side (NOT from URL `mode` param) — documented as known bug

### Tab Naming
- "Natural" tab was renamed to "All" (2026-05-14). Michael said: "Natural" is reserved for something else going forward.
- "All" tab = same pipeline-chronological organization as before

### Leaderboard
- Auth: requires any valid logged-in user (VP or admin), NOT unauthenticated
- Unscored users appear at bottom with `—`
- Ties share a rank

---

## Feature History

### Launch (2026-04-29)
- Initial build: SAM.gov simulation for VP candidate assessment
- 52 standard contracts, 5 VP test users, 30-min timer, AI scoring
- Named Zam.guv by Michael

### Vehicle Modules (2026-05-02)
- 4 new modules added: IDIQ, OTA, GSA, SBIR
- 100 new contracts seeded (25 per vehicle)
- VP Hub created: single login, all 5 vehicles accessible with status badges
- Admin updated: vehicle type tracking, per-vehicle stats

### Module 01 + Leaderboard (2026-05-14)
- Compliance Tab rebuilt: 6 framework-family blocks with nav strip
- "Natural" tab renamed to "All"
- Pipeline stage nav strip added to All tab
- Module 02 compliance integration (flags, callout blocks, checklist)
- Leaderboard added to VP hub
- ZAM-BUILD-DOC rewritten to v2.0

### 8-Feature Sprint (2026-05-16)
- Claude Code built 8 features in one shot (2,700 lines, 29 files):
  1. Behavioral analytics
  2. Admin proposal viewer
  3. Score override
  4. Cohort grouping
  5. Candidate PDF report
  6. Attempt limiting
  7. Tab-switch detection
  8. AI interview questions
- Full code audit run after: found 4 bugs, all fixed
- Build doc updated to v3.0

### Second Audit — Creative Pass (2026-05-16)
- Adversarial/edge-case review, 3 additional bugs found and fixed:
  1. Admin score override — unhandled P2025 crash (Prisma 404 fix)
  2. Delete cascade — sequential deletes replaced with `prisma.$transaction([...])`
  3. Double leaderboard fetch on hub load — useEffect dep array stabilized
- State: all TypeScript clean, all known bugs patched

---

## Known Bugs / Pending Work
- Auto-submitted proposals not AI-scored
- Server-side session expiry cleanup not implemented
- `claude-opus-4-5` hardcoded in scoring route — Michael flagged, needs review
- Natural/Timeline toggle on Compliance tab and Contract Vehicles tab (approved, not built)

---

## DB Notes
- Database: neon-cordovan-house (Neon Serverless Postgres)
- Seed script: `prisma/seed.ts` (standard), `prisma/seed-vehicles.ts` (vehicle modules)

---

## Competitor Landscape
- Vervoe — AI-graded work simulation (closest concept, no govcon)
- Pymetrics — neuroscience-based games
- TestGorilla — generic skills tests
- **Nothing like Zam.guv exists for govcon specifically**
