# Zam.guv — Build Document & Features Reference

**Version:** 1.0  
**Live:** https://zam-guv.vercel.app  
**Repo:** https://github.com/hugirecon/zam-guv  
**Purpose:** Government contracting assessment platform for KDT VP candidate evaluation

---

## What It Is

Zam.guv is a realistic simulation of SAM.gov — the US federal government's contract opportunity portal. VP candidates are dropped into the system and given 30 minutes to browse real-looking federal solicitations, make bid/no-bid decisions, and write proposals. Every action is recorded. Every proposal is AI-scored. The whole thing runs on a countdown.

The system is also a learning tool. Before the timed assessment, candidates can read educational modules and practice with no timer through training portals. The assessment is Module 3. But the platform has expanded to 7 modules total — each one tied to a specific government contracting vehicle.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Neon Serverless PostgreSQL |
| ORM | Prisma with `@prisma/adapter-neon` |
| Auth | JWT via `jsonwebtoken`, bcrypt passwords |
| AI Scoring | Anthropic Claude (`@anthropic-ai/sdk`) |
| Hosting | Vercel (auto-deploy from `main` branch) |
| Styling | Tailwind CSS |

**Environment variables required:**
- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` — JWT signing key
- `ANTHROPIC_API_KEY` — Claude API key for proposal scoring

---

## Database Schema

Four models. Everything flows through them.

### User
```
id             CUID
email          String (unique)
name           String
role           "vp" | "admin"
passwordHash   String (bcrypt)
currentModule  Int (default: 1)  — tracks progression 1→4
module1Done    Boolean
module2Done    Boolean
module3Done    Boolean
```

`currentModule` drives whether a login creates a training or assessment session:
- `<= 2` → training mode (24-hour session, no timer pressure)
- `> 2` → assessment mode (30-minute session)

### Contract
```
id             CUID
solicNumber    String (unique) — e.g. "FA8617-26-R-0021"
title          String
agency         String
subAgency      String?
description    String
requirements   String (JSON array)
naicsCode      String
setAside       String? — "8(a)" | "SDVOSB" | "HUBZone" | "WOSB" | "SB" | "Unrestricted"
valueMin       Float
valueMax       Float
dueDate        DateTime
pob            String — place of performance
securityClear  String — "None" | "Secret" | "Top Secret" | "TS/SCI"
type           String — "FFP" | "T&M" | "CPFF" | "IDIQ" | "BPA"
vehicleType    String — "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
status         String — "active" | "closed" | "awarded"
```

152 contracts total: 52 Standard + 25 each for IDIQ, OTA, GSA, SBIR.

### Session
```
id          CUID
userId      String (FK → User)
token       String (unique)
startedAt   DateTime
expiresAt   DateTime  — startedAt + 30min (assessment) or +24h (training)
locked      Boolean   — true when timer hits 0 and drafts auto-submitted
lockedAt    DateTime?
mode        String    — "assessment" | "training"
vehicleType String    — "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
```

One session per vehicle per mode (active). A new session is only created when the existing one for that vehicle/mode is expired or locked.

### Proposal
```
id                 CUID
contractId         String (FK → Contract)
userId             String (FK → User)
sessionId          String (FK → Session)
executiveSummary   String
technicalApproach  String
managementApproach String
pricingNarrative   String
pastPerformance    String
proposedValue      Float
status             "draft" | "submitted"
submittedAt        DateTime?
autoSubmitted      Boolean  — true if session expired mid-draft
aiScore            Float?   — 0–100 composite
aiScoreBreakdown   String?  — JSON with per-dimension scores
aiFeedback         String?
aiScoredAt         DateTime?
```

Unique constraint on `(contractId, userId)` — one proposal per contract per VP, ever.

---

## Authentication

**JWT-based, httpOnly cookie.**

Token payload: `{ userId, role, sessionId }`

The `sessionId` in the token is critical — it scopes all proposal reads/writes to the active session. When a VP enters a different vehicle simulation, a new token is issued with the new session's ID.

Cookie config:
- `httpOnly: true`
- `maxAge: 8 * 60 * 60` (8 hours)
- `sameSite: "lax"`

**Auth flow on login:**
1. Verify email + bcrypt password
2. Determine mode from `user.currentModule <= 2` (training) or `> 2` (assessment)
3. Call `getOrCreateVPSession(userId, trainingMode, vehicleType)` — reuses active session if one exists for that vehicle/mode combination
4. Sign JWT with userId + role + sessionId
5. Set cookie, return user data
6. VP → redirect to `/vp/hub`, Admin → redirect to `/admin`

**Auth on each request:**
```
getAuthUser() → reads cookie → verifies JWT → returns { userId, role, sessionId }
```

---

## Module System

7 modules. No prerequisites enforced in code — candidates can jump to any module. The intended sequence is enforced editorially, not technically.

### Module 01 — KDT GovCon Introduction
**Route:** `/modules/intro`  
**Auth required:** No  
**Type:** Reading only

Terminology, landscape, KDT-specific context. Three tab views: Natural (chronological by contracting year), Contract Vehicles, Compliance. Covers SAM.gov, PIEE, CPARS, FPDS, SPRS — all the portals a GovCon professional touches. Also covers the KDT vehicle on-ramp sequence (Open Market → GSA MAS → SBIR → OTA → 8(a) → Subcontracting → Big GWACs).

No login required. No session created.

### Module 02 — KDT GovCon Training
**Route:** `/modules/training`  
**Auth required:** Yes (login creates 24h session)  
**Type:** Guided walkthrough + live portal access

Four-stage walkthrough: Opportunity Identification → Bid/No-Bid → Proposal Writing → Submission. Each stage has explicit decision frameworks and templates. Candidates access the full 52-contract standard portal with no timer to practice the process before the assessment.

The "Launch Training Portal →" link goes to `/login?mode=training`. Session created on login is 24-hour (training mode).

### Module 03 — Zam.guv GovCon Simulation
**Route:** Assessment triggered from `/login` or `/login?ready=true`  
**Auth required:** Yes (login creates 30-min session)  
**Type:** Live timed assessment

52 contracts. 30-minute countdown starts on login. Every contract view, every draft save, every submission is recorded. Session locks at timer zero, auto-submitting any open drafts. Proposals are AI-scored immediately on submission.

### Module 04 — IDIQ Contracts & Task Orders
**Route:** `/modules/idiq` (reading) + `/modules/idiq-training` (training guide)  
**Simulation:** `/login?vehicle=idiq&ready=true`  
**Contracts:** 25 IDIQ task order solicitations  
**Color:** Indigo

Deep-dive into IDIQ mechanics: base contract vs task order, key vehicles (OASIS+, SeaPort-NxG, Agency MACs), fair opportunity requirement, labor rate structure, on-ramp strategy. Training guide covers TO bid/no-bid framework with IDIQ-specific factors (ceiling analysis, prior award incumbents, competition level, response window).

### Module 05 — Other Transaction Authority
**Route:** `/modules/ota` (reading) + `/modules/ota-training` (training guide)  
**Simulation:** `/login?vehicle=ota&ready=true`  
**Contracts:** 25 OTA prototype solicitations  
**Color:** Cyan

OTA mechanics, NSTXL/Indiana angle, March 2025 DoD mandate, consortium navigation. Training guide covers white paper writing (5-step structure with strong vs. weak examples), agreement negotiation (IP rights, milestone payments, data rights, follow-on language), and prototype execution. The 25 OTA contracts are all prototype opportunities across Army/DARPA/Air Force domains.

### Module 06 — GSA Schedule (MAS)
**Route:** `/modules/gsa` (reading) + `/modules/gsa-training` (training guide)  
**Simulation:** `/login?vehicle=gsa&ready=true`  
**Contracts:** 25 GSA Schedule task orders  
**Color:** Violet

GSA MAS application process, eBuy dynamics, catalog strategy, pricing compliance. Training guide covers schedule compliance, SIN selection, and quote writing.

### Module 07 — SBIR/STTR
**Route:** `/modules/sbir` (reading) + `/modules/sbir-training` (training guide)  
**Simulation:** `/login?vehicle=sbir&ready=true`  
**Contracts:** 25 SBIR/STTR opportunities  
**Color:** Orange

SBIR Phase I/II strategy, AFWERX/SOFWERX/DIU pathways, technical proposal structure for R&D contracts. Indiana-specific angle for NSTXL. Training guide covers Phase I white paper vs. Phase II full proposal.

---

## VP Simulation Hub

**Route:** `/vp/hub`  
**Auth required:** VP role

The central control panel after login. Shows all 5 vehicle tracks as cards with live status badges:

| Status | Condition | Color |
|---|---|---|
| Not Started | No session exists for this vehicle | Gray |
| In Progress — X min left | Active session, not expired | Yellow |
| Completed | Session locked OR expired | Green |

Status is fetched from `GET /api/sessions/status` on page load. Returns the most recent session for each vehicle type.

Each card has two buttons:
- **Enter Simulation** — calls `POST /api/sessions/select` with `{ vehicleType }` (assessment mode). Creates new session or reuses active one.
- **Enter Training** — calls `POST /api/sessions/select` with `{ vehicleType, mode: "training" }`. Creates/reuses 24-hour training session.

Both redirect to `/vp/sim` after session selection, where the simulation portal loads using the session from the JWT cookie.

---

## Simulation Portal

**Route:** `/vp/sim` (contract list) + `/vp/contracts/[id]` (contract detail + proposal editor)  
**Auth required:** VP role with active session

The portal is a faithful recreation of the SAM.gov aesthetic — US government banner, navigation tabs (Contract Opportunities / Contract Awards / Subcontract Reports), filter sidebar on the left.

### Contract List (`/vp/sim`)
Fetches from `GET /api/contracts?vehicleType=X` where vehicleType comes from the session in the JWT. Sidebar filters: keyword search (Any Words / All Words / Exact Phrase), Federal Organizations, Dates, Notice Type, Product/Service Information, Set Aside, Place of Performance, Contract Awardee, Status (Active/Inactive).

Header shows live countdown timer.

### Contract Detail (`/vp/contracts/[id]`)
Full SAM.gov-style listing with:
- General Information table (Notice ID, department, contract type, due date, value range, place of performance)
- Classification table (NAICS, set-aside, contract type, security clearance)
- Description + Key Requirements list
- Contact Information

### Proposal Editor
Six-section proposal form, tab-navigated:
1. Executive Summary
2. Technical Approach
3. Management Approach
4. Pricing Narrative
5. Past Performance
6. Pricing (proposed value input)

**Save Draft** — `POST /api/proposals` — upserts proposal with `status: "draft"`. Constraint: one proposal per contract per user.

**Submit Proposal** — calls `POST /api/proposals/[id]/submit`. Marks as submitted, triggers synchronous AI scoring, advances `user.currentModule` to 4 if assessment mode.

Draft proposals auto-submit when session timer reaches zero (see Session Timer section).

---

## Session Timer

**Component:** `components/vp/SessionTimer.tsx`  
**Rendered in:** VP layout (`app/vp/layout.tsx`) for assessment sessions

Counts down from session `expiresAt`. Updates every second.

Visual states:
- Normal: gray pill with clock icon
- Warning (≤5 min): red background, yellow border
- Critical (≤1 min): pulsing animation
- Expired: red "Session Expired" pill

**On expiry (when countdown hits 0):**
1. Calls `POST /api/sessions/lock` with `{ sessionId }`
2. Lock route auto-submits all `status: "draft"` proposals for that session
3. Lock route sets `session.locked = true`, records `lockedAt`
4. Client shows session-expired lock screen

The timer only fires if the browser tab is open. If a candidate closes the tab before time is up, the session expires naturally but is never locked and drafts are never submitted. No server-side cleanup process exists for this case.

> **Known Bug:** Auto-submitted proposals (via session lock) are not AI-scored. The lock route marks them as submitted but does not call the scoring function. Only manually submitted proposals get AI scores. Fix: add AI scoring call to `/api/sessions/lock/route.ts` for each auto-submitted proposal.

---

## AI Scoring

**Triggered by:** `POST /api/proposals/[id]/submit`  
**Model:** Anthropic Claude (`claude-*`)  
**Scoring dimensions:** Strategic Clarity, Executive Persuasion, Technical Credibility, Competitive Awareness

Claude evaluates each proposal against the contract's actual description, requirements, NAICS code, and value range. Returns:
- `aiScore` — composite 0–100
- `aiScoreBreakdown` — JSON with per-dimension scores
- `aiFeedback` — narrative feedback

Scoring is synchronous (called with `await` before the API response). This is intentional — Vercel kills async fire-and-forget tasks after the response is sent.

If `ANTHROPIC_API_KEY` is not set, scoring is silently skipped (proposals are submitted but unscored).

Score data is stored on the Proposal record and surfaced in the Admin proposals view.

---

## Admin Portal

**Route:** `/admin`  
**Auth required:** Admin role  
**Default admin credentials:** `admin@zam.guv` / `Admin@2026!`

Five sections:

### Dashboard (`/admin`)
Live stats pulled from `GET /api/admin/stats`:
- Total active contracts (152)
- Total proposals / submitted / AI-scored
- VP assessors count
- Active sessions count (sessions where `locked=false` and `expiresAt > now`)
- Top scored proposals (highest `aiScore`)
- Contracts by agency (bar breakdown)
- Contracts by vehicle type (Standard: 52, IDIQ: 25, OTA: 25, GSA: 25, SBIR: 25)

### Contracts (`/admin/contracts`)
Full 152-contract table with search, agency column, set-aside badge, vehicle type badge. Read-only — contracts are seeded, not created via UI.

### Proposals (`/admin/proposals`)
All proposals across all VPs. Columns: VP name, contract, status (draft/submitted/auto-submitted), AI score, submitted timestamp. Score breakdown available per proposal. "(auto)" label appears on auto-submitted proposals.

### Sessions (`/admin/sessions`)
All sessions across all VPs. Columns: VP name, module (user's current module), vehicle type badge, started timestamp, expires/locked timestamp, time remaining or lock status, proposal count. Sorted newest first.

### Users (`/admin/users`)
All VP accounts. Columns: name, email, sessions count, proposals count, last session timestamp, last vehicle type, delete button. Create new VP via form at top of page — creates user with `role: "vp"`, `currentModule: 1`, specified name/email/password.

---

## API Routes

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Login, create/reuse session, set JWT cookie |
| POST | `/api/auth/logout` | Clear JWT cookie |
| GET | `/api/auth/me` | Return current user + session info |

### Sessions
| Method | Route | Description |
|---|---|---|
| GET | `/api/sessions/status` | Return status of all 5 vehicle tracks for current VP |
| POST | `/api/sessions/select` | Create/reuse session for given vehicleType + mode |
| POST | `/api/sessions/lock` | Lock session, auto-submit drafts, called by timer component |

### Contracts
| Method | Route | Description |
|---|---|---|
| GET | `/api/contracts` | List contracts, filtered by vehicleType from session |
| GET | `/api/contracts/[id]` | Single contract detail |

### Proposals
| Method | Route | Description |
|---|---|---|
| GET | `/api/proposals` | List proposals (VP: own only, admin: all) |
| POST | `/api/proposals` | Create/update draft proposal |
| GET | `/api/proposals/[id]` | Single proposal |
| POST | `/api/proposals/[id]/submit` | Submit proposal + trigger AI scoring |

### User
| Method | Route | Description |
|---|---|---|
| GET | `/api/user/progress` | Get currentModule + completion flags |
| POST | `/api/user/progress` | Advance currentModule (action: "complete" or "skip") |

### Admin
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/sessions` | All sessions with user data |
| GET | `/api/admin/users` | All VP users |
| POST | `/api/admin/users` | Create VP |
| DELETE | `/api/admin/users/[id]` | Delete VP |

---

## Contract Seeding

Two seed files:

**`prisma/seed.ts`** — 52 Standard contracts. Mix of defense services, cyber, logistics, construction, supply. Some KDT-relevant, most noise. Designed for Module 03.

**`prisma/seed-vehicles.ts`** — 100 vehicle-specific contracts (25 each):
- IDIQ: Task orders across OASIS+, SeaPort-NxG, agency MAC vehicles. Army/DHS/DoD focus.
- OTA: Prototype opportunities across DARPA, AFWERX, Army RDECOM. Technology-heavy.
- GSA: MAS task orders via eBuy, schedule orders across civilian agencies.
- SBIR: Phase I and II solicitations from AFWERX, DIU, DARPA, Army SBIR offices.

Run seeds:
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-vehicles.ts
```

---

## Known Bugs & Open Items

### 🔴 Critical
**Auto-submitted proposals not AI-scored**  
`/api/sessions/lock` auto-submits drafts on timer expiry but never calls the scoring function. Manually submitted proposals are scored; auto-submitted ones are not. Fix: add `scoreProposalAsync(proposal.id, proposal)` loop to the lock route.

### 🟠 Medium
**Training links broken for users past Module 2**  
The "Training First →" CTA links from vehicle reading modules go to `/login?vehicle=X&mode=training`. The login client ignores `?mode=training` (reads `vehicle` and `ready` but not `mode`). The server uses `user.currentModule <= 2` to determine mode. Any user with `currentModule > 2` who follows these links gets a 30-minute assessment session instead of a no-timer training session. Fix: pass `mode` param from URL to the POST body, or have the server read a `mode` field from the request.

**No server-side session expiry cleanup**  
If a candidate closes the browser before the timer hits zero, the session expires naturally but is never locked and drafts are never submitted. The lock only triggers client-side when the countdown reaches zero. Fix: add a Vercel cron job to lock expired-but-unlocked sessions and auto-submit their drafts.

### 🟡 UX / Low Priority
**Hub shows "Completed" for abandoned sessions**  
`getStatusLabel()` returns "Completed" for any session where `expiresAt < now`, whether it was properly locked or just abandoned. Should distinguish: locked = "Completed", expired-unlocked = "Timed Out".

**Admin Sessions table missing Mode column**  
No way to tell training (24h) sessions from assessment (30-min) sessions in the admin table. Add a "Mode" badge column.

**Module badge in Admin Sessions reflects current user progression, not session-time progression**  
The module badge shows the user's current `currentModule` value. A user who advances after their session will show an incorrect module number on historical records.

**VP Hub status doesn't live-update**  
Hub loads status once. Countdown label ("In Progress — X min left") doesn't tick down while user stays on the hub page. Minor since candidates should enter the simulation immediately.

---

## Deployment

Auto-deploys to Vercel on push to `main` branch.

**Local development:**
```bash
npm install
npm run dev        # starts on localhost:3000
```

Vercel project: `zam-guv` (hugirecon account)  
Neon DB: connected via Vercel Marketplace integration (project: `neon-cordovan-house`)

---

## Test Users

| Name | Email | Password | Notes |
|---|---|---|---|
| System Administrator | admin@zam.guv | Admin@2026! | Admin portal access |
| Demetrios | demetrios@kdt.mil | KDT-Demo2026! | VP, multiple sessions |
| Clark | clark@kdt.mil | KDT-Demo2026! | VP |
| Simeon | simeon@kdt.mil | KDT-Demo2026! | VP, 0 sessions |
| Demetrios Tsirigotis | demetrios.tsirigotis@kdt.guv | (set on creation) | VP, unused |
| Clark Donalson | clark.donalson@kdt.guv | (set on creation) | VP, unused |
| Austin Losurdo | austin.losurdo@kdt.guv | (set on creation) | VP, unused |
| Nicholas Norman | nicholas.norman@kdt.guv | (set on creation) | VP |
| Santiago Telleria | santiago.telleria@kdt.guv | (set on creation) | VP |
| Matthew McCalla | matthew.mccalla@kdt.guv | (set on creation) | VP |
