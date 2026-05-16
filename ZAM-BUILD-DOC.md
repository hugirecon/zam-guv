# Zam.guv — Build Document & Features Reference

**Version:** 3.0  
**Updated:** 2026-05-16  
**Live:** https://zam-guv.vercel.app  
**Repo:** https://github.com/hugirecon/zam-guv  
**Purpose:** Government contracting assessment and training platform for KDT VP candidate evaluation

---

## What It Is

Zam.guv is a realistic simulation of SAM.gov — the U.S. federal government's contract opportunity portal. VP candidates use it as both a learning tool and a timed assessment environment.

**As a training platform:** Candidates read educational modules covering GovCon terminology, contract vehicles, compliance frameworks, and the full proposal process. They can practice hands-on in the simulation with no time pressure.

**As an assessment tool:** Candidates are given 30 minutes to browse realistic federal solicitations, make bid/no-bid decisions, and write proposals. Every action is recorded. Every proposal is AI-scored across five dimensions. The countdown is real.

The platform has seven modules, each tied to a specific government contracting vehicle. A leaderboard visible to all users shows real-time ranking by composite AI score.

---

## Live URLs & Repository

| Resource | URL |
|---|---|
| Live platform | https://zam-guv.vercel.app |
| GitHub repo | https://github.com/hugirecon/zam-guv |
| Vercel project | https://vercel.com/hugi-recons-projects/zam-guv |
| Neon DB | `neon-cordovan-house` (via Vercel Marketplace integration) |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Neon Serverless PostgreSQL |
| ORM | Prisma with `@prisma/adapter-neon` |
| Auth | JWT via `jsonwebtoken`, bcrypt passwords |
| AI Scoring | Anthropic Claude — model: `claude-opus-4-5` (`@anthropic-ai/sdk`) |
| PDF Generation | `@react-pdf/renderer` (Node.js runtime, server-side) |
| Hosting | Vercel (auto-deploy from `main` branch) |
| Styling | Tailwind CSS |

**Required environment variables:**
- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` — JWT signing key
- `ANTHROPIC_API_KEY` — Claude API key for proposal scoring

---

## Database Schema

Seven models as of v3.0.

### User
```
id             CUID (primary key)
email          String (unique)
name           String
role           "vp" | "admin"
passwordHash   String (bcrypt)
currentModule  Int (default: 1)  — tracks progression 1→4
module1Done    Boolean (default: false)
module2Done    Boolean (default: false)
module3Done    Boolean (default: false)
```

`currentModule` drives session mode on login:
- `<= 2` → training mode (24-hour session, no timer pressure)
- `> 2` → assessment mode (30-minute countdown session)

**Added in v3.0:**
```
cohortId  String? (FK → Cohort, optional) — cohort assignment for grouped leaderboards
```

### Contract
```
id             CUID (primary key)
solicNumber    String (unique) — e.g. "FA8617-26-R-0021"
title          String
agency         String
subAgency      String?
description    String
requirements   String (JSON array of key requirements)
naicsCode      String
setAside       String? — "8(a)" | "SDVOSB" | "HUBZone" | "WOSB" | "SB" | "Unrestricted"
valueMin       Float
valueMax       Float
dueDate        DateTime
postedDate     DateTime (default: now)
pob            String — place of performance
securityClear  String — "None" | "Secret" | "Top Secret" | "TS/SCI"
type           String — "FFP" | "T&M" | "CPFF" | "IDIQ" | "BPA"
vehicleType    String — "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
status         String — "active" | "closed" | "awarded"
```

**152 contracts total:** 52 Standard + 25 IDIQ + 25 OTA + 25 GSA + 25 SBIR.

### Session
```
id             CUID (primary key)
userId         String (FK → User)
token          String (unique)
startedAt      DateTime
expiresAt      DateTime — startedAt + 30min (assessment) or +24h (training)
locked         Boolean (default: false) — true when session has ended
lockedAt       DateTime?
mode           String — "assessment" | "training"
vehicleType    String — "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
loginToken     String? — UUID generated at login; ties session to a specific login event (v3.0)
tabSwitchCount Int (default: 0) — denormalized tab-switch event count (v3.0)
```

One active session per vehicle per mode at a time. A new session is only created when the existing one for that vehicle/mode is expired or locked.

### Proposal
```
id                 CUID (primary key)
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
autoSubmitted      Boolean — true if force-submitted when session expired
aiScore              Float?    — 0–100 composite score
aiScoreBreakdown     String?   — JSON: { technical, management, pricing, past_performance, compliance }
aiFeedback           String?   — JSON: { strengths[], weaknesses[], recommendation, feedback }
aiScoredAt           DateTime?
aiInterviewQuestions String?   — JSON array of 3–5 interview questions generated after scoring (v3.0)
adminScore           Float?    — admin override score; shown in place of aiScore when set (v3.0)
adminNotes           String?   — admin commentary on the override (v3.0)
adminScoredAt        DateTime? (v3.0)
createdAt            DateTime
updatedAt            DateTime
```

**Unique constraint:** `(contractId, userId)` — one proposal per contract per VP, ever.

### ContractView *(added v3.0)*
```
id          CUID (primary key)
userId      String (FK → User)
contractId  String (FK → Contract)
sessionId   String (FK → Session)
viewedAt    DateTime (default: now)
timeSpentMs Int? — milliseconds on the contract page before navigating away
```

**Unique constraint:** `(contractId, userId, sessionId)`. Upserted when a VP opens a contract. Time spent updated via `PATCH /api/contracts/[id]/view`.

### Cohort *(added v3.0)*
```
id          CUID (primary key)
name        String
description String?
createdAt   DateTime (default: now)
```

Admin creates cohorts and assigns VPs to them. One cohort per user. Drives cohort-scoped leaderboard.

### TabSwitchEvent *(added v3.0)*
```
id         CUID (primary key)
userId     String (FK → User)
sessionId  String (FK → Session)
occurredAt DateTime (default: now)
```

One record per event. `Session.tabSwitchCount` is incremented on each insert for fast admin display.

---

## Authentication

**JWT-based, httpOnly cookie.**

Token payload: `{ userId, role, sessionId }`

The `sessionId` in the token scopes all proposal reads/writes to the active session. When a VP enters a different vehicle simulation, a new token is issued with the new session's ID.

Cookie config:
- `httpOnly: true`
- `maxAge: 8 * 60 * 60` (8 hours)
- `sameSite: "lax"`
- Cookie name: `zam-token`

**Login flow (v3.0):**
1. Verify email + bcrypt password match
2. Generate `loginToken = crypto.randomUUID()`
3. Determine mode: `currentModule <= 2` → training (24h session), else → assessment (30-min session)
4. Call `getOrCreateVPSession(userId, trainingMode, vehicleType, loginToken)` — reuses active session or creates new one with loginToken stored
5. Sign JWT with `{ userId, role, sessionId, loginToken }`
6. Set `zam-token` cookie, return user data
7. Redirect: VP → `/vp/hub`, Admin → `/admin`

**Per-request auth:**
```typescript
getAuthUser() → reads "zam-token" cookie → verifies JWT → returns { id, name, email, role, sessionId, loginToken }
```

---

## Module System

Seven modules. No prerequisites enforced in code — candidates can access any module directly. The intended sequence is enforced editorially. Modules 01–02 are reading and training. Modules 03–07 are timed assessment simulations per vehicle type.

---

### Module 01 — KDT GovCon Introduction

**Route:** `/modules/intro`  
**Auth required:** No  
**Type:** Reading / reference  
**Estimated time:** 20–25 minutes

A comprehensive GovCon knowledge base covering terminology, market landscape, contract vehicles, and compliance. No login required, no session created. Intended to be read before any simulation.

#### Tab System

The module has three tabs across the top:

**Overview tab (default)**  
Previously named "Natural," then renamed "All," then renamed "Overview" during the 2026-05-15 audit. Organized chronologically — terms appear in the order a VP would encounter them moving through a real contracting pipeline. Six pipeline stages with a clickable navigation strip at the top:

1. The Market — GovCon landscape, agencies, federal spend overview
2. Register — SAM.gov, UEI, CAGE, portals (PIEE, FPDS, DSBS, eBuy)
3. Vehicles & Types — contract types (FFP/T&M/CPFF/IDIQ), all contract vehicles
4. Find & Qualify — solicitation types (RFP/RFQ/Sources Sought), set-asides
5. Pursue & Propose — key roles (CO, COR, PCO), proposal structure, lifecycle terms, pricing terms
6. Win & Execute — PIEE sub-systems (WAWF/iRAPT, EDA, CPARS, SPRS, FAPIIS, MOCAS), financial terms, regulatory framework

PIEE is covered as a full expandable block with nine sub-systems documented individually. The SPRS entry ties back to the compliance content in the Compliance tab.

The All tab also contains the "KDT Vehicle On-Ramp Sequence" — a numbered priority order for how KDT should pursue vehicles from Open Market through Big GWACs, with rationale at each step.

**Contract Vehicles tab**  
Organized by vehicle category. Each vehicle is a card with: definition, key facts (ceiling, base period, eligible entities, competition mechanism), and a KDT-specific note on whether and how to pursue it.

Vehicles covered: Open Market / SAM.gov Direct, Major GWACs (Alliant 3, OASIS+, Polaris, SEWP VI), DoD-Specific IDIQs (SeaPort-NxG, STARS III, CIO-SP4), Army Vehicles (CHESS, RS3, MSD, R2, ARL MAC IDIQ), DHS Vehicles (EAGLE II, PACTS), Intelligence Community Vehicles (Glasswing, Janus, Eagle Pass — marked Restricted), OTA/Innovation Pathways (AFWERX, SOFWERX, NavalX, DIU, NSTXL, C5, S2MARTS, MD5/NSIN), SBIR/STTR, GSA Stars, IAC/MAC/MATOCs.

**Compliance tab**  
Organized by compliance framework family (not timeline). Six blocks with a clickable framework nav strip at top:

| Block | Color | Contents |
|---|---|---|
| 🔐 Cybersecurity Maturity | Blue | NIST SP 800-171, Rev 2, SP 800-53, SP 800-172, CMMC L1, CMMC L2, CMMC L3, C3PAO, DIBCAC, SPRS, SSP, POA&M |
| 📋 Contract Regulatory Framework | Purple | FAR, DFARS, DFARS 252.204-7012, DFARS 252.204-7021, NDAA, SCA, Davis-Bacon Act, FAR Part 31, CAS, FAR 52.212-4 |
| 🗄️ CUI & Data Handling | Cyan | CUI, 32 CFR Part 2002, FCI, FedRAMP, DIBNet, CUI Marking, SPRS (CUI context) |
| 🏛️ Facility & Personnel Security | Green | FCL, DCSA, NISP, FSO, Confidential, Secret, Top Secret, SCI, SAP/SAR, SF-86, DISS |
| 🌐 Export Controls | Orange | ITAR, EAR, DDTC, USML, CCL, TAA, OFAC, Deemed Export |
| 💰 Financial Compliance | Red | DCAA, Adequate Accounting System, ICS, FPRA, CAS, FAR Part 31, ACRN, False Claims Act |

Each block has a one-line description of how the frameworks in it relate to each other. Each term has a full definition written for a GovCon professional, not a compliance attorney — practical, KDT-relevant, no jargon without explanation.

A KDT Compliance Priority Timeline at the bottom of the Compliance tab gives a five-stage roadmap (Immediate → Year 1 → Year 1–2 → Year 2–3 → Ongoing) without assuming current compliance status.

> **Implemented (2026-05-14):** Natural/Timeline toggle on the Compliance and Contract Vehicles tabs. Both tabs have a two-button toggle at the top — Natural view (current framework/category organization) and Timeline view (same terms, reorganized chronologically by when a VP would encounter them in the contracting pipeline). No terms are exclusive to either view; the toggle is a presentation mode only.

---

### Module 02 — KDT GovCon Training

**Route:** `/modules/training`  
**Auth required:** Yes (login creates 24-hour session)  
**Type:** Guided walkthrough + live portal access  
**Estimated time:** Variable (self-paced)

A structured guide to the GovCon process. Candidates work through the portal hands-on with no time pressure alongside the written material. The "Launch Training Portal →" button creates a 24-hour training session.

#### Four Stages + Compliance Section

**Stage 1 — Opportunity Identification**  
How to scan the contract listing page efficiently. Uses a four-check filter for every listing:
1. Set-aside — open competition or does KDT hold the required certification?
2. NAICS code — KDT vertical match?
3. Scope fit — does this sound like KDT's work?
4. Compliance flags — does this solicitation carry requirements that need to be surfaced?

Includes the "three-bucket" sort system (Pursue / Maybe / Skip) and a strong/weak candidate checklist.

**Compliance Flag Check callout** appears below Stage 1 targets. A dark amber card listing six specific triggers to scan for while browsing listings:
- `DFARS 252.204-7021` — CMMC requirement clause, note the level
- `DFARS 252.204-7012` — CUI handling requirement, cyber incident reporting
- `"FCL required"` / `"Secret facility clearance"` — facility clearance needed
- `"Personnel must possess [level] clearance"` — individual clearances required
- `Wage Determination No.` — SCA wage determination attached, pass to pricing
- `"ITAR"` / `"export-controlled"` / `"foreign nationals may not access"` — export controls, flag to legal

**Stage 2 — Bid/No-Bid Decision**  
Five-question framework for each flagged candidate (in order):
1. Can we compete? (NAICS, set-aside, past performance)
2. Can we win? (LPTA vs. Best Value approach)
3. Can we perform? (people, equipment, capability)
4. Is it worth it? (contract value vs. proposal investment)
5. Are there compliance requirements to flag? (CMMC, FCL, SCA, ITAR — surface before writing)

Decision rule: Yes to all five → bid. One strong no → reconsider. Two or more → skip.

**Compliance Section — "What You'll Encounter in DoD Solicitations"**  
Appears between Stage 2 and Stage 3. Four detailed compliance cards:

| Card | Color | Contents |
|---|---|---|
| 🔐 CMMC | Blue | Where DFARS 252.204-7021 appears, what Level 1/2/3 means, "your job = flag it" |
| 💼 SCA Wage Determinations | Green | Where WD appears in Section J, what mandatory minimums mean for pricing, pass to pricing team |
| 🏛️ Security Clearances & FCL | Green | FCL vs personnel clearances, where clearance language appears in Section H, flag to leadership |
| 🌐 ITAR & Export Controls | Orange | What phrases to look for in Section H/PWS, criminal penalties, flag to legal immediately |

**Framing throughout:** All compliance content is written from the VP's perspective — what you encounter and recognize in a solicitation. Zam.guv does not assume any compliance status for KDT. The VP's job is recognition and escalation, not resolution.

**Stage 3 — Proposal Writing**  
Five-section proposal structure with templates:
1. Executive Summary (2–3 sentences, template provided)
2. Technical Approach (methods, personnel, equipment, risk mitigation)
3. Past Performance (similar contracts, teaming if limited)
4. Pricing (total + brief rationale, LPTA vs. Best Value guidance)
5. Why KDT (closing paragraph)

Includes strong vs. weak proposal examples and Do/Don't checklist.

**Stage 4 — Submission**  
Pre-submission checklist (eight items). Compliance items appear first:
1. Compliance flags identified and escalated?
2. SCA wage determination located and passed to pricing?
3. Full PWS/SOW scope addressed?
4. Every eval criterion answered?
5. Technical approach specific to this contract?
6. Past performance relevant?
7. Price clearly stated?
8. Executive summary makes a compelling case?

**Time Management section** — 30-minute assessment day breakdown:
- 0:00–0:08: Scan all 52 listings, flag 3–6 candidates
- 0:08–0:12: Bid/no-bid decisions, settle on 2–4 to pursue
- 0:12–0:28: Write and submit (4–8 min per proposal)
- 0:28–0:30: Final review, submit anything still in draft

---

### Module 03 — Standard GovCon Simulation

**Route:** Assessment triggered from `/login` or `/login?ready=true`  
**Auth required:** Yes  
**Type:** Timed assessment — 30-minute countdown  
**Contracts:** 52 Standard contracts (mixed agencies, mixed types)  
**Color:** Red

The primary assessment. Covers open-market federal contracting across KDT's verticals: defense services, private security (armed/unarmed), cybersecurity, logistics, construction, supply procurement. Mix of realistic KDT fits and deliberate mismatches to test bid/no-bid judgment.

---

### Module 04 — IDIQ Contracts & Task Orders

**Route:** `/modules/idiq` (reading) + `/modules/idiq-training` (training guide)  
**Simulation:** `/login?vehicle=idiq&ready=true`  
**Auth required:** Yes  
**Type:** Timed assessment — 30-minute countdown  
**Contracts:** 25 IDIQ task order solicitations  
**Color:** Indigo

Reading module covers: IDIQ mechanics (base contract vs. task order), key IDIQ vehicles (OASIS+, SeaPort-NxG, Agency MACs), fair opportunity requirement, labor rate structure, on-ramp strategy.

Training guide covers: TO bid/no-bid framework with IDIQ-specific factors — ceiling analysis, incumbent identification, competition level, response window management.

The 25 IDIQ contracts are task order competitions across Army, DHS, and DoD agency MACs.

---

### Module 05 — Other Transaction Authority (OTA)

**Route:** `/modules/ota` (reading) + `/modules/ota-training` (training guide)  
**Simulation:** `/login?vehicle=ota&ready=true`  
**Auth required:** Yes  
**Type:** Timed assessment — 30-minute countdown  
**Contracts:** 25 OTA prototype solicitations  
**Color:** Cyan

Reading module covers: OTA mechanics, NSTXL/Indiana angle, March 2025 DoD mandate requiring OTA consideration for all rapid acquisition, consortium navigation.

Training guide covers: White paper writing (5-step structure with strong vs. weak examples), agreement negotiation (IP rights, milestone payments, data rights, follow-on production language), and prototype execution.

The 25 OTA contracts are prototype opportunities across Army/DARPA/Air Force domains.

---

### Module 06 — GSA Schedule (MAS)

**Route:** `/modules/gsa` (reading) + `/modules/gsa-training` (training guide)  
**Simulation:** `/login?vehicle=gsa&ready=true`  
**Auth required:** Yes  
**Type:** Timed assessment — 30-minute countdown  
**Contracts:** 25 GSA Schedule task orders  
**Color:** Violet

Reading module covers: GSA MAS application process, eBuy dynamics, catalog and pricing strategy, schedule compliance requirements, SIN selection.

Training guide covers: Compliance-aware quote writing, eBuy response best practices.

The 25 GSA contracts are schedule task orders from civilian agencies via eBuy.

---

### Module 07 — SBIR/STTR

**Route:** `/modules/sbir` (reading) + `/modules/sbir-training` (training guide)  
**Simulation:** `/login?vehicle=sbir&ready=true`  
**Auth required:** Yes  
**Type:** Timed assessment — 30-minute countdown  
**Contracts:** 25 SBIR/STTR opportunities  
**Color:** Orange

Reading module covers: SBIR Phase I/II/III strategy, AFWERX, SOFWERX, and DIU pathways, technical proposal structure for R&D contracts, Indiana/NSTXL angle for regional access.

Training guide covers: Phase I white paper vs. Phase II full proposal, how to write to DoD innovation criteria.

The 25 SBIR contracts are Phase I and II solicitations from AFWERX, DIU, DARPA, and Army SBIR offices.

---

## VP Simulation Hub

**Route:** `/vp/hub`  
**Auth required:** VP role

The central control panel after login. Shows all five vehicle simulation cards plus the leaderboard. Status for each vehicle is fetched from `GET /api/sessions/status` on page load.

### Vehicle Status Labels

| Status | Condition | Color |
|---|---|---|
| Not Started | No session exists for this vehicle | Gray |
| In Progress — X min left | Active session, not expired | Yellow |
| Completed | Session locked OR expired | Green |

### Vehicle Card Buttons

Each card has two buttons:
- **Enter Simulation** — `POST /api/sessions/select` with `{ vehicleType }`. Assessment mode (30-min). Creates new session or reuses active one. Redirects to `/vp/sim`.
- **Enter Training** — `POST /api/sessions/select` with `{ vehicleType, mode: "training" }`. Training mode (24h). Redirects to `/vp/sim`.

### Leaderboard

Appears below the vehicle cards. Visible to all logged-in users (VPs and admins). Loaded on hub page load from `GET /api/leaderboard`.

**Columns:**
| Column | Description |
|---|---|
| # (Rank) | 🥇🥈🥉 for top 3, numbered rank thereafter. Ties share a rank. |
| Name | Display name. "You" badge on current user's row. |
| Score | Composite AI score — average of all submitted, AI-scored proposals. Color-coded: green ≥80, blue ≥60, amber ≥40, red <40. |
| Best | Highest single proposal score across all submissions. |
| Proposals | Total submitted proposal count (scored + unscored). |
| Vehicles | Number of distinct vehicle types with at least one scored proposal in a locked session. |

**Current user's row** is highlighted with an amber left border and amber name text. "You" badge appears next to their name.

Unscored users (no submitted proposals yet) appear at the bottom of the table with `—` in score columns.

---

## Simulation Portal

**Route:** `/vp/sim` (contract list) + `/vp/contracts/[id]` (contract detail + proposal editor)  
**Auth required:** VP role with active session

The portal replicates the SAM.gov aesthetic — U.S. government banner, navigation tabs, and a filter sidebar.

### Contract List (`/vp/sim`)

Fetches from `GET /api/contracts?vehicleType=X` where vehicleType is read from the session in the JWT cookie. The vehicle type ensures each simulation track shows only its own 25 or 52 contracts.

Sidebar filters: keyword search (Any Words / All Words / Exact Phrase), Federal Organizations, Dates, Notice Type, Product/Service Information, Set Aside, Place of Performance, Contract Awardee, Status.

A live countdown timer displays in the header (assessment mode only).

### Contract Detail (`/vp/contracts/[id]`)

Full SAM.gov-style listing:
- General Information table (Notice ID, department, contract type, due date, value range, place of performance)
- Classification table (NAICS code, set-aside type, contract type, security clearance requirement)
- Description and key requirements list
- Contact information

### Proposal Editor

Six-section proposal form accessed from the contract detail page. Tab-navigated:

1. Executive Summary
2. Technical Approach
3. Management Approach
4. Pricing Narrative
5. Past Performance
6. Pricing (proposed dollar value input)

**Save Draft** → `POST /api/proposals` — upserts proposal as `status: "draft"`. One proposal per contract per user enforced by unique constraint.

**Submit Proposal** → `POST /api/proposals/[id]/submit` — marks submitted, triggers synchronous AI scoring. In assessment mode, advances user's `currentModule` to 4 and sets `module3Done: true`.

**Training mode enhancement:** "Load Example Proposal" button populates the form with a gold-standard contract-specific example for learning. AI feedback displays inline with auto-scroll after training-mode submissions. Score is shown in a sticky panel with a "Revise & Resubmit" option.

---

## Session Timer

**Component:** `components/vp/SessionTimer.tsx`  
**Used in:** `app/vp/layout.tsx` (assessment sessions only)

Counts down from `session.expiresAt`. Updates every second client-side.

**Visual states:**
| State | Condition | Appearance |
|---|---|---|
| Normal | > 5 min remaining | Gray pill with clock icon |
| Warning | ≤ 5 min remaining | Red background, yellow border |
| Critical | ≤ 1 min remaining | Pulsing animation |
| Expired | 0:00 reached | Red "Session Expired" pill |

**On expiry:**
1. Client calls `POST /api/sessions/lock` with `{ sessionId }`
2. Lock route finds all `status: "draft"` proposals for that session and force-submits them (`autoSubmitted: true`)
3. Lock route sets `session.locked = true` and `session.lockedAt = now`
4. Client renders session-expired lock screen

> **Known bug:** Auto-submitted proposals (force-submitted via the lock route) are not AI-scored. The lock route submits them but does not call the scoring function. Only manually submitted proposals receive AI scores and appear on the leaderboard. **Fix:** Add AI scoring loop to `/api/sessions/lock/route.ts` for each auto-submitted proposal.

---

## AI Scoring

**Triggered by:** `POST /api/proposals/[id]/submit`  
**Model:** `claude-opus-4-5` (via `@anthropic-ai/sdk`)  
**Scoring dimensions:** `technical`, `management`, `pricing`, `past_performance`, `compliance`  
**Output:** Composite `aiScore` (0–100) + per-dimension `aiScoreBreakdown` (JSON) + `aiFeedback` (JSON)

Claude evaluates each proposal against the actual contract's description, requirements list, NAICS code, set-aside type, and value range. The evaluation is contract-specific — a generic proposal scores poorly by design.

Scoring is **synchronous** — called with `await` before the API response is returned. This is intentional: Vercel terminates async fire-and-forget tasks after the response is sent.

`aiFeedback` is stored as a JSON object with four fields: `strengths` (string array), `weaknesses` (string array), `recommendation` (one of: "Award" / "High Competitive" / "Competitive" / "Non-Competitive"), and `feedback` (narrative string).

If `ANTHROPIC_API_KEY` is not set, scoring is silently skipped. Proposals are submitted and marked as such, but `aiScore` remains `null`. They appear in admin proposals view as submitted but unscored and do not affect the leaderboard.

---

## Leaderboard API

**Route:** `GET /api/leaderboard`  
**Auth required:** Yes (any role)

Returns ranked entries for all VP users. Calculation per user:
- **Composite Score:** Average of all `aiScore` values across all `status: "submitted"` proposals where `aiScore IS NOT NULL`. Rounded to one decimal. `null` if no scored proposals.
- **Best Score:** `MAX(aiScore)` across all scored submitted proposals. Rounded to one decimal.
- **Vehicles Completed:** Count of distinct `vehicleType` values from proposals where the associated session is `locked: true`.
- **Proposal Count:** Total submitted proposals (scored and unscored).

**Ranking:** Sorted by `compositeScore` descending. Users with no score appear at the bottom. Ties share a rank (e.g., two users at 82.4 are both Rank 2; the next user is Rank 4).

**Current user identification:** `isCurrentUser: true` flag set by comparing authenticated user ID to each entry. Used by the hub component to apply the amber highlight row.

---

## Admin Portal

**Route:** `/admin`  
**Auth required:** Admin role  
**Default admin credentials:** `admin@zam.guv` / `Admin@2026!`

Five sections:

### Dashboard (`/admin`)
Live stats from `GET /api/admin/stats`:
- Total active contracts (152 across all vehicles)
- Total proposals / submitted / AI-scored
- VP assessors count
- Active sessions (unlocked, not expired)
- Top-scored proposals (highest `aiScore`)
- Contract distribution by agency
- Contract distribution by vehicle type (Standard: 52, IDIQ: 25, OTA: 25, GSA: 25, SBIR: 25)

### Contracts (`/admin/contracts`)
Full 152-contract table. Columns: solicitation number, title, agency, set-aside badge, vehicle type badge, status. Search by title or agency. Read-only — contracts are seeded, not created via the UI.

### Proposals (`/admin/proposals`)
All proposals across all VPs. Columns: VP name, contract title, status (draft / submitted / auto-submitted), AI score, submitted timestamp. Score breakdown available per proposal row. "(auto)" label on force-submitted proposals.

### Sessions (`/admin/sessions`)
All sessions. Columns: VP name, module (current `currentModule` value for that user), vehicle type badge, started timestamp, expires/locked timestamp, time remaining or completion status, proposal count. Sorted newest first.

### Users (`/admin/users`)
All VP accounts. Columns: name, email, session count, proposal count, last session timestamp, last vehicle type, delete button.

Create new VP via form at the top: name, email, password. Creates with `role: "vp"`, `currentModule: 1`.

---

## API Routes

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Verify credentials, create/reuse session, set JWT cookie |
| POST | `/api/auth/logout` | Clear `zam-token` cookie |
| GET | `/api/auth/me` | Return current user + session info |

### Sessions
| Method | Route | Description |
|---|---|---|
| GET | `/api/sessions/status` | Return session status for all 5 vehicle tracks for current VP |
| POST | `/api/sessions/select` | Create/reuse session for given vehicleType + mode |
| POST | `/api/sessions/lock` | Lock session, force-submit all drafts (called by timer on expiry) |

### Contracts
| Method | Route | Description |
|---|---|---|
| GET | `/api/contracts` | List contracts filtered by vehicleType from session |
| GET | `/api/contracts/[id]` | Single contract detail |

### Proposals
| Method | Route | Description |
|---|---|---|
| GET | `/api/proposals` | VP: own proposals. Admin: all proposals |
| POST | `/api/proposals` | Create or update draft proposal |
| GET | `/api/proposals/[id]` | Single proposal |
| POST | `/api/proposals/[id]/submit` | Submit proposal + trigger AI scoring |

### User
| Method | Route | Description |
|---|---|---|
| GET | `/api/user/progress` | Get `currentModule` and completion flags |
| POST | `/api/user/progress` | Advance `currentModule` (action: "complete" or "skip") |

### Leaderboard
| Method | Route | Description |
|---|---|---|
| GET | `/api/leaderboard` | Ranked VP leaderboard with composite scores and stats |

### Admin
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard aggregate stats |
| GET | `/api/admin/sessions` | All sessions with user data |
| GET | `/api/admin/users` | All VP users with activity data |
| POST | `/api/admin/users` | Create VP account |
| DELETE | `/api/admin/users` | Delete VP account (user `id` passed in request body, not URL) |

---

## Contract Seeding

Two seed scripts in `/prisma/`:

### `prisma/seed.ts` — 52 Standard Contracts
Mixed-agency, mixed-type federal contracts designed for Module 03. Intentional mix of strong KDT fits and mismatches across: armed security, cybersecurity, logistics, construction, supply. Some include CMMC/clearance requirements and SCA wage determination references for realism.

### `prisma/seed-vehicles.ts` — 100 Vehicle-Specific Contracts
25 contracts per vehicle track, each reflecting the procurement characteristics of that vehicle type:
- **IDIQ (25):** Task orders across OASIS+, SeaPort-NxG, and agency MACs. Army/DHS/DoD focus. Reflects task order structure with ceiling analysis, LCAT labor categories, and fair opportunity periods.
- **OTA (25):** Prototype opportunities across DARPA, AFWERX, and Army RDECOM. Technology-heavy, white-paper-driven, non-FAR structure.
- **GSA (25):** MAS task orders via eBuy. Civilian agency focus. SIN-specific, schedule-price compliant.
- **SBIR (25):** Phase I and II solicitations from AFWERX, DIU, DARPA, and Army SBIR offices. R&D-structured with technical evaluation criteria.

**Run seeds:**
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-vehicles.ts
```

Note: `seed-vehicles.ts` must run after `seed.ts`. Both scripts are idempotent (upsert by `solicNumber`). The `prisma.seed` entry in `package.json` only registers `seed.ts` — run `seed-vehicles.ts` manually using the same `ts-node` command.

---

## Known Bugs & Open Items

### 🔴 Critical

**Auto-submitted proposals not AI-scored**  
`/api/sessions/lock` force-submits all draft proposals when the session timer expires, but never calls the AI scoring function. Only manually submitted proposals receive scores. Auto-submitted proposals appear in admin as submitted but unscored, do not affect the leaderboard, and are tagged `autoSubmitted: true`.  
**Fix:** Add AI scoring loop to `/api/sessions/lock/route.ts` for each auto-submitted proposal.

### 🟠 Medium

**Training mode links broken for users past Module 2**  
Reading modules for Modules 04–07 have "Enter Training" links that include `?mode=training` in the URL. The login client reads `vehicle` and `ready` params but ignores `mode`. The server falls back to `currentModule` to determine mode — any user with `currentModule > 2` following these links gets a 30-minute assessment session instead of a 24-hour training session.  
**Fix:** Pass `mode` param from URL through to the `POST /api/auth/login` body, and have the server accept an explicit `mode` override.

**No server-side session expiry cleanup**  
If a candidate closes the browser before the timer reaches zero, the session expires naturally but is never locked and drafts are never submitted. The lock only fires client-side when the countdown reaches zero. Sessions remain in a "expired but not locked" limbo state.  
**Fix:** Vercel cron job to lock expired-but-unlocked assessment sessions and force-submit their drafts.

### 🟡 Low Priority / UX

**Hub shows "Completed" for abandoned sessions**  
`getStatusLabel()` returns "Completed" for any session where `expiresAt < now`, regardless of whether it was properly completed or just abandoned mid-timer.  
**Fix:** Distinguish `locked = true` (Completed) from `expired + locked = false` (Timed Out / Abandoned).

**Admin Sessions table missing Mode column**  
No way to visually distinguish training (24h) sessions from assessment (30-min) sessions in the admin table. Requires cross-referencing `expiresAt - startedAt` manually.  
**Fix:** Add "Mode" badge column based on session `mode` field.

**VP Hub status does not live-update**  
Hub loads session status once on page load. The "In Progress — X min left" countdown label does not tick while the user remains on the hub. Minor in practice since candidates typically enter the simulation immediately.

**Leaderboard does not update during active sessions**  
The leaderboard fetches once on hub load. A VP who just completed a simulation and returns to the hub will not see updated scores until they refresh.  
**Fix:** Add a manual refresh button on the leaderboard, or use a short polling interval.

### 🔵 Planned / Not Yet Built

**Natural/Timeline toggle** — implemented 2026-05-14. See Module 01 tab system documentation.

---

## Deployment

Vercel auto-deploys on every push to the `main` branch. No manual deployment steps required.

**Local development:**
```bash
npm install
npm run dev        # starts on localhost:3000
```

**Vercel project:** `zam-guv` under the `hugirecon` account  
**Neon DB:** Connected via Vercel Marketplace integration. Database name: `neon-cordovan-house`. No manual DB connection required in Vercel.

---

## Test Users

| Name | Email | Password | Role | Notes |
|---|---|---|---|---|
| System Administrator | admin@zam.guv | Admin@2026! | admin | Admin portal access |
VP test users are **not seeded** — they are created via Admin → Users. The seed script only creates the admin account. The following accounts exist in the live Neon DB (created via admin UI):

| Name | Email | Role | Notes |
|---|---|---|---|
| Demetrios Tsirigotis | demetrios.tsirigotis@kdt.guv | vp | — |
| Clark Donalson | clark.donalson@kdt.guv | vp | — |
| Austin Losurdo | austin.losurdo@kdt.guv | vp | — |
| Nicholas Norman | nicholas.norman@kdt.guv | vp | Active |
| Santiago Telleria | santiago.telleria@kdt.guv | vp | Active |
| Matthew McCalla | matthew.mccalla@kdt.guv | vp | Active |

Passwords are set at creation time by the admin. To reset a password, delete and recreate the user via Admin → Users.

---

## Changelog

### 2026-05-16 — Admin Features Sprint (v3.0)

8 new features built and pushed to main (commit `0d14152`). 2,700 lines added across 29 files.

**New models:** `ContractView`, `Cohort`, `TabSwitchEvent`  
**New fields:** `Session.loginToken`, `Session.tabSwitchCount`, `Proposal.aiInterviewQuestions`, `Proposal.adminScore/Notes/ScoredAt`, `User.cohortId`  
**New package:** `@react-pdf/renderer`

| Feature | What was built |
|---|---|
| Behavioral analytics | `ContractView` tracking; `/admin/candidates/[userId]` with views, bid rate, timing, tab switches |
| Admin proposal viewer | `/admin/proposals/[id]` with full text, dimension scores, feedback, interview questions |
| Score override | `PATCH /api/admin/proposals/[id]/score`; ✎ indicator on leaderboard when overridden |
| Cohort grouping | `/admin/cohorts`, cohort leaderboard, VP hub "My Cohort" toggle |
| Candidate PDF report | `GET /api/admin/candidates/[userId]/report` via `@react-pdf/renderer`; auto-scales |
| Attempt limiting | `loginToken` in JWT + Session; one assessment per vehicle per login; training exempt |
| Tab-switch detection | `TabSwitchMonitor.tsx` + `sendBeacon`; `TabSwitchEvent` records; admin warning at >2 |
| AI interview questions | Second Claude call after scoring; stored in `Proposal.aiInterviewQuestions` |

---

### 2026-05-16 — Build Doc Corrections (v2.1)

- Version header date corrected (was 2026-05-14, now reflects last actual update)
- Module 01 tab renamed from "All" → "Overview" during 2026-05-15 audit — doc now reflects this correctly
- Natural/Timeline toggle removed from "Planned / Not Yet Built" section — it was implemented 2026-05-14 (commit `e4c366e`)
- Added implementation note to Module 01 tab system documentation

---

### 2026-05-15 — UI/UX Audit Fixes + Mobile Optimization

#### UI/UX Audit Fixes (10 items)

**Landing page — Terminology**
- Subtitle corrected from "Seven-module assessment system: core GovCon track plus four vehicle-specific deep-dive simulations" → "3-module GovCon assessment system plus 4 vehicle-specific sub-module simulations"
- Section heading changed from "Vehicle-Specific Tracks" → "Sub-Modules"
- All four sub-module cards rebadged from "Module 04–07" → "IDIQ Sub-Module", "OTA Sub-Module", "GSA Sub-Module", "SBIR Sub-Module"
- All four sub-module CTA buttons changed from "Begin Module →" → "🔒 Begin Sub-Module →"

**Landing page — Visual Hierarchy**
- Sub-module cards visually de-emphasized from core module cards: lighter background (`bg-white/3`), lighter border (`border-white/8`), reduced padding (`p-6`)
- Border separator added between Core Track and Sub-Modules sections
- Login gate indicators added to all cards: 🔓 "No login required" on Module 01; 🔒 "Login required" on Modules 02 and 03; 🔒 on all sub-module CTA buttons
- Module 03 card now shows "Login required · Timer starts immediately"

**Login page**
- "Back to Modules" link changed to "Back to Home" (it links to `/`, not a modules list)
- Email placeholder changed from `you@agency.gov` → `firstname.lastname@kdt.guv`
- Password visibility toggle added (show/hide eye icon button inside the password field)

**Module 01 — Intro page**
- "All" tab label changed to "Overview" for clarity on first visit

---

#### Mobile Optimization (8 items)

**1. Sim page — Filter sidebar drawer**
- On mobile (< 768px), the fixed-width 250px sidebar is hidden by default
- A "☰ Filters" button appears in the breadcrumb bar on mobile; tapping it opens the sidebar as a slide-in drawer (fullscreen overlay, `min(300px, 88vw)` wide, fixed position, z-index 200)
- A semi-transparent backdrop overlay closes the drawer on tap
- A ✕ close button added inside the sidebar header (mobile only)
- CSS classes `.filter-sidebar`, `.filter-sidebar.drawer-open`, `.filter-mobile-btn`, `.filter-sidebar-close`, `.filter-sidebar-overlay` added to `globals.css`
- Desktop behavior unchanged

**2. Hub leaderboard**
- On mobile: collapses to 3 columns (Rank / First Name / Score)
- On desktop: full 5-column layout (Rank / Name / Score / Proposals / Vehicles)
- Implemented via separate `sm:hidden` and `hidden sm:grid` row variants per entry

**3. Hub header navigation**
- On mobile: shows logo + user first name + hamburger icon (☰/✕ toggle)
- Tapping hamburger opens a dropdown with full name, ← Main Site link, and Logout
- "|" divider and "Simulation Hub" label hidden on mobile (`hidden sm:inline`)
- Desktop nav unchanged

**4. Contract card metadata (sim page)**
- Metadata row (Sol #, NAICS, Deadline, Value, PoP) switches from `flex-wrap` to a 2-column CSS grid on mobile via `.contract-meta` class
- Place of Performance spans full width on mobile via `.contract-meta-pob`
- Labels shortened on mobile (e.g., "Solicitation #:" → "Sol #:", "Response Deadline:" → "Deadline:")

**5. Landing page pipeline strip (Module 01 — Overview tab)**
- Right-edge fade gradient overlay added on mobile to indicate horizontal scroll
- Implemented as a `pointer-events-none` `bg-gradient-to-l from-slate-50` div, `sm:hidden`

**6. Login card padding**
- Changed from `p-8` to `p-6 sm:p-8` to prevent tightness on narrow screens

**7. Module 01 — Intro tab bar**
- Tabs stretch to full-width on mobile (`flex w-full`), each tab takes equal space (`flex-1`)
- On `sm+` reverts to `inline-flex w-auto` (auto-width)

**8. Module headers**
- Confirmed `hidden sm:block` already present on module label text in both Module 01 and Module 02 headers — no change required

---

## User Flow Map

The complete candidate journey from first visit to scored results.

```
Landing Page (/)
    │
    ├─▶ Module 01 — Introduction (/modules/intro)
    │       No login required. Candidate reads GovCon terminology,
    │       landscape, contract vehicles, compliance frameworks.
    │       Tab bar: Overview / Contract Vehicles / Compliance
    │       On completion → "Mark Complete & Proceed to Module 2"
    │       Updates: user.currentModule = 2, user.module1Done = true
    │
    ├─▶ Module 02 — Training (/modules/training)
    │       Login required. Guided walkthrough of the full
    │       Opportunity ID → Bid/No-Bid → Proposal → Submit process.
    │       "Launch Training Portal" → /login?mode=training
    │       Login creates a TRAINING session (24h expiry, no timer).
    │       Candidate uses Zam.guv hands-on with no time pressure.
    │
    └─▶ Module 03 — Simulation (/login → /vp/hub → /vp/sim)
            Login required. Timer starts on login.
            Login creates an ASSESSMENT session (30-min expiry).
            ↓
        VP Hub (/vp/hub)
            Candidate selects a vehicle (Standard, IDIQ, OTA, GSA, SBIR).
            POST /api/sessions/select — creates or resumes session for
            that vehicleType, re-signs JWT with new sessionId.
            ↓
        Simulation (/vp/sim)
            SAM.gov-style UI. Candidate browses contracts filtered
            to their active vehicleType. Countdown timer visible.
            Clicks contract → /vp/contracts/[id]
            ↓
        Contract Detail (/vp/contracts/[id])
            Full solicitation view. Proposal editor with 5 fields:
            Executive Summary, Technical Approach, Management Approach,
            Pricing Narrative, Past Performance + Proposed Value.
            Auto-saves on every field change (POST /api/proposals).
            Manual submit → POST /api/proposals/[id]/submit
            ↓
        Timer hits 0
            Client calls POST /api/sessions/lock
            All draft proposals → status: "submitted", autoSubmitted: true
            Session locked: true
            ⚠️ Known bug: auto-submitted proposals are NOT AI-scored.
            ↓
        Manual submit path
            POST /api/proposals/[id]/submit
            Marks proposal submitted, calls scoreProposalAsync()
            AI score stored on proposal record
            User.currentModule advanced to 4, module3Done: true
            ↓
        Results visible in Admin portal
            Admin sees score, breakdown, feedback per proposal
```

Sub-module paths (IDIQ / OTA / GSA / SBIR) follow the same flow but branch at the landing page:
```
Landing → Sub-Module intro page (/modules/intro/[vehicle])
       → Sub-Module training page (/modules/training/[vehicle])
       → Login with ?vehicle=[vehicle] param
       → Hub → select that vehicle → Sim (filtered to that vehicle's 25 contracts)
```

---

## AI Scoring System

Every manually submitted proposal is scored synchronously by Claude immediately after submission. Auto-submitted proposals (timer expiry) are currently **not** scored — see Known Bugs.

### Model
`claude-opus-4-5` via `@anthropic-ai/sdk`  
Route: `POST /api/proposals/[id]/submit` → `scoreProposalAsync()`

### Input sent to Claude
- Contract title, description, requirements (parsed from JSON array), NAICS code, value range
- All 5 proposal fields: Executive Summary, Technical Approach, Management Approach, Pricing Narrative, Past Performance
- Proposed dollar value

### Scoring dimensions (0–100 each)
| Dimension | What it measures |
|---|---|
| `technical` | Specificity, methodology, alignment to contract requirements |
| `management` | Key personnel, org structure, risk mitigation, QA |
| `pricing` | Cost basis, labor categories, BOE justification, market calibration |
| `past_performance` | Relevance of cited contracts, specificity (contract #s, values, outcomes) |
| `compliance` | Adherence to solicitation requirements, regulatory awareness |

**`overall`** — top-level 0–100 composite score stored as `proposal.aiScore`

### Output stored on proposal record
```
aiScore            INT      — overall 0-100
aiScoreBreakdown   JSON     — { technical, management, pricing, past_performance, compliance }
aiFeedback         JSON     — { strengths[], weaknesses[], recommendation, feedback }
aiScoredAt         DateTime
```

### Recommendation labels
Claude returns one of four labels:
- `Award` — strong, competitive proposal
- `High Competitive` — above average, good win probability
- `Competitive` — viable but not standout
- `Non-Competitive` — insufficient to win

### Grading philosophy (from system prompt)
> "Be rigorous. Grade based on specificity, relevance to requirements, and win probability."

Vague, generic proposals score low regardless of length. Specific proposals with contract numbers, measurable outcomes, and direct alignment to requirements score high.

### Leaderboard scoring
`GET /api/leaderboard` computes:
- `compositeScore` — average of all `aiScore` values across all submitted proposals for that user
- `bestScore` — highest single `aiScore`
- `proposalCount` — total submitted proposals
- `vehiclesCompleted` — count of distinct vehicleTypes with at least one submitted proposal

---

## Admin SOP

Standard procedures for the admin portal at `/admin`.

### Adding a candidate

1. Log in as `admin@zam.guv`
2. Navigate to **Admin → Users**
3. Click **Add User**
4. Enter: Full name, email (`firstname.lastname@kdt.guv`), password (`KDT-Demo2026!` or custom), role: `vp`
5. Click **Create** — user is immediately active

> Password is bcrypt-hashed at creation. There is no "forgot password" flow. To reset: delete the user and recreate with the same email and a new password. All their sessions and proposals are deleted with the user (cascade).

### Sending credentials to a candidate

Share manually:
- URL: https://zam-guv.vercel.app
- Email: their `@kdt.guv` address
- Password: whatever was set at creation
- Instructions: start at Module 01, read before touching the sim

### Monitoring an active session

1. **Admin → Sessions** — shows all sessions with: user name, vehicleType, mode, start time, expiry, locked status, proposal count
2. While a session is active: the `expiresAt` column shows when the timer runs out
3. There is currently no live "currently active" indicator — refresh the page to see current state

### Reviewing results after a session

1. **Admin → Proposals** — lists all proposals with: candidate name, contract title, status, AI score, submission time
2. Click a proposal to see full text + score breakdown + strengths/weaknesses/recommendation
3. **Admin → Sessions** — cross-reference to see which proposals belong to which timed session

### Reading scores

| Score range | Meaning |
|---|---|
| 80–100 | Award / High Competitive — strong candidate signal |
| 60–79 | Competitive — understands the process, some gaps |
| 40–59 | Basic awareness, significant gaps in execution |
| 0–39 | Non-Competitive — not ready for GovCon business development |

A candidate who submitted 0 proposals does not appear on the leaderboard. A candidate with all auto-submitted proposals (timer expired) will have unscored proposals — this is a known bug.

---

## Session Mechanics

Understanding how sessions work is critical to understanding the platform.

### Session record fields
```
id           CUID
userId       FK → User
vehicleType  "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
mode         "training" | "assessment"
startedAt    DateTime (creation time)
expiresAt    DateTime (startedAt + timer duration)
locked       Boolean (false until timer fires or admin locks)
lockedAt     DateTime | null
```

### Session creation
Sessions are created by `getOrCreateVPSession()` in `lib/auth.ts`.

**On login** (`POST /api/auth/login`):
- Mode is determined by `user.currentModule`:
  - `currentModule <= 2` → `training` mode
  - `currentModule > 2` → `assessment` mode
- This means: users who haven't completed Module 2 always get training sessions on login, regardless of what button they clicked

**On hub vehicle select** (`POST /api/sessions/select`):
- Explicit `mode` and `vehicleType` passed from the hub
- `getOrCreateVPSession()` first looks for an existing non-expired, non-locked session of the same `mode + vehicleType`
- If found: resumes it (same timer)
- If not found and mode is assessment: checks if a locked session exists for this `userId + vehicleType + loginToken` — if yes, blocks (attempt limit hit)
- If clear: creates a new session, stores the `loginToken`

### Timer durations
| Mode | Duration | Notes |
|---|---|---|
| `training` | 24 hours | Effectively no timer — candidates work at their own pace |
| `assessment` | 30 minutes | Hard deadline. Client-side countdown. |

### JWT and sessionId
The JWT cookie (`zam-token`, httpOnly, 8h, SameSite=lax) carries:
```json
{ "userId": "...", "role": "vp", "sessionId": "..." }
```
Every API call reads the cookie to determine which session is active. This means a candidate can only have one active session per JWT. If they log in again, they get a new JWT but `getOrCreateVPSession()` will resume an existing valid session for that vehicleType+mode combination.

### Session locking (timer expiry)
When the client-side countdown reaches 0, it calls `POST /api/sessions/lock`:
1. Finds all `draft` proposals in that session
2. Updates each to `status: "submitted"`, `autoSubmitted: true`, `submittedAt: now`
3. Sets `session.locked = true`, `session.lockedAt = now`

⚠️ **Known gap:** `lock` does not call `scoreProposalAsync()`. Auto-submitted proposals have no AI scores.

⚠️ **Known gap:** If the candidate closes the browser before time expires, the lock never fires client-side. The session sits expired-but-unlocked. No server-side cleanup job exists yet.

### Attempt Limiting (v3.0)

One assessment per vehicle per login. The `loginToken` ties the attempt to a specific login event.

**VP hub display:**
- Active session (not locked, not expired): "Resume (X:XX remaining)"
- Locked session from current loginToken: "Completed ✓"
- No session from current loginToken: "Start Assessment"

**Retry:** log out → log back in (new UUID = new attempt). Admin intervention not required.

**Training sessions are exempt** — `loginToken` check only applies for `mode=assessment`.

### Training vs Assessment — key behavioral differences

| Behavior | Training | Assessment |
|---|---|---|
| Timer shown | No | Yes (30 min countdown) |
| Session expiry | 24h | 30 min |
| Proposals AI-scored | Yes (if manually submitted) | Yes (if manually submitted) |
| Auto-submit on expiry | No | Yes (client-side) |
| Advances `currentModule` | No | Yes → module3Done, currentModule=4 |

---

## Admin Features (v3.0)

All admin routes live under `/admin/*` and `/api/admin/*`. Admin auth is enforced on every API route.

### Behavioral Analytics
**Route:** `/admin/candidates/[userId]` | **API:** `GET /api/admin/candidates/[userId]`

Per-session metrics:

| Metric | Source |
|---|---|
| Contracts viewed | `ContractView` count |
| Contracts bid on | `Proposal` count |
| Bid rate | proposals / views |
| Avg time per proposal | `ContractView.timeSpentMs` |
| Submission timing | whether most proposals came in last 5 min |
| Tab switches | `Session.tabSwitchCount` |

Linked from `/admin/users` ("View Candidate" per row).

### Admin Proposal Viewer
**Route:** `/admin/proposals/[id]`

Full proposal text + AI score per dimension as progress bars + AI feedback (strengths/weaknesses/recommendation) + AI interview questions + score override form + behavioral context. Linked from proposals list.

### Score Override
**API:** `PATCH /api/admin/proposals/[id]/score` | **Body:** `{ adminScore, adminNotes }`

If `adminScore` is set, displayed everywhere with ✎ indicator. `adminNotes` on hover. Stored as `adminScore` + `adminNotes` + `adminScoredAt`.

### Cohort Management
**Routes:** `/admin/cohorts` (list/create), `/admin/cohorts/[id]` (detail + cohort leaderboard)
**APIs:** `GET/POST /api/admin/cohorts`, `GET/PATCH/DELETE /api/admin/cohorts/[id]`

Admin creates named cohorts and assigns VPs. User assignment: `PATCH /api/admin/users/[id]` with `{ cohortId }` (pass `null` to remove).

VP hub shows "My Cohort" / "Global" leaderboard toggle when assigned to a cohort.

### Candidate Report (PDF)
**API:** `GET /api/admin/candidates/[userId]/report` — returns `[name]-zam-report.pdf`

Server-side PDF via `@react-pdf/renderer` (Node.js runtime). "Export Report" button on candidate detail page.

| Section | Contents |
|---|---|
| Cover | Name, email, cohort, report date |
| Executive Summary | Composite score, recommendation, proposal count, sessions |
| Score Breakdown | Per vehicle: date, views, bid rate, avg score, timing |
| Proposal Details | Per proposal: dimension table, strengths, weaknesses |
| Interview Questions | AI-generated questions per proposal |
| Admin Notes | Score overrides and notes |
| Footer | "Generated by Zam.guv — KDT Internal Assessment Platform" |

Live data — auto-scales as new proposals, cohorts, and features are added.

### Tab-Switch Detection
**Component:** `components/TabSwitchMonitor.tsx` | **API:** `POST /api/sessions/tab-switch`

Invisible component in VP assessment layout. Uses `visibilitychange` + `sendBeacon` (fetch fallback). Creates `TabSwitchEvent`, increments `Session.tabSwitchCount`. Only active during assessment sessions. Admin views show ⚠️ badge if count > 2.

### AI Interview Questions
**Stored:** `Proposal.aiInterviewQuestions` (JSON array) | **Generated:** after scoring (second Claude call)

3–5 specific questions targeting the proposal’s identified weaknesses. Surfaced on proposal detail page, candidate detail page, and PDF report.

---

## Module Map

All modules, their routes, content, and auth requirements.

### Core Track

| Module | Route | Login? | Content | Time |
|---|---|---|---|---|
| Module 01 — Introduction | `/modules/intro` | No | GovCon terminology, landscape, contract vehicles, compliance frameworks. Three tabs: Overview (pipeline-organized), Contract Vehicles, Compliance. | 20–25 min read |
| Module 02 — Training | `/modules/training` | Yes (training session) | Full process walkthrough: Opportunity ID → Bid/No-Bid → Proposal → Submit. Links to live training sim. | 30–45 min guided |
| Module 03 — Simulation | `/vp/sim` (via hub) | Yes (assessment session) | Live SAM.gov-style sim. 52 Standard contracts. 30-min timer. Every action recorded. AI-scored proposals. | 30 min timed |

### Sub-Modules

| Sub-Module | Intro Route | Training Route | Sim Vehicle | Contracts |
|---|---|---|---|---|
| IDIQ | `/modules/intro/idiq` | `/modules/training/idiq` | `IDIQ` | 25 task orders |
| OTA | `/modules/intro/ota` | `/modules/training/ota` | `OTA` | 25 prototype opportunities |
| GSA | `/modules/intro/gsa` | `/modules/training/gsa` | `GSA` | 25 MAS task orders |
| SBIR | `/modules/intro/sbir` | `/modules/training/sbir` | `SBIR` | 25 R&D solicitations |

Sub-modules use the same sim UI (`/vp/sim`) — the active vehicleType on the session determines which contract pool is shown.

### Progress tracking
`User.currentModule` tracks where the candidate is:
| Value | Meaning |
|---|---|
| 1 | Not started / reading Module 01 |
| 2 | Module 01 complete, on Module 02 |
| 3 | Module 02 complete, ready for assessment |
| 4 | Assessment complete (module3Done = true) |

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- A Neon account (or use local SQLite for dev — `dev.db` is already set up)

### Steps

```bash
# 1. Clone
git clone https://github.com/hugirecon/zam-guv.git
cd zam-guv

# 2. Install
npm install

# 3. Environment
# For local dev, .env already points to SQLite (file:./dev.db)
# Copy and fill in for production:
cp .env .env.local
# Set: DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY

# 4. Migrate + seed (local SQLite)
npx prisma migrate dev --name init
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-vehicles.ts

# 5. Run
npm run dev
# → http://localhost:3000
```

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon connection string (or `file:./dev.db` for local) |
| `JWT_SECRET` | Yes | Random secret for JWT signing. Any string works for dev. |
| `ANTHROPIC_API_KEY` | Yes for scoring | Claude API key. Without it, proposals submit but are not scored. |

### Local vs Production database
- **Local dev:** uses SQLite (`dev.db`) — fast, no setup, does not require Neon
- **Production (Vercel):** uses Neon Serverless Postgres via `.env.production.local`
- Never commit `.env.production.local` — it contains live DB credentials

### Prisma commands
```bash
npx prisma studio        # visual DB browser at localhost:5555
npx prisma migrate dev   # apply schema changes
npx prisma generate      # regenerate client after schema changes
```

---

## Design Decisions

Rationale for key technical choices, for future reference.

### JWT over NextAuth / sessions
NextAuth adds complexity (adapters, providers, callbacks) that wasn't needed for a simple email+password internal tool. JWT stored in an httpOnly cookie achieves the same security posture with less code. The `sessionId` embedded in the JWT is the key innovation — it ties every API call to a specific timed assessment session without a separate session lookup table query on every request.

### Neon Serverless Postgres over PlanetScale / Supabase / SQLite
Neon integrates directly with Vercel Marketplace — one-click, zero configuration, auto-scales to zero when idle (free tier). The Prisma adapter (`@prisma/adapter-neon`) handles the serverless connection pooling that traditional Postgres drivers can't do in serverless edge environments.

### claude-opus-4-5 for scoring
Chosen for scoring quality. Proposal evaluation requires nuanced judgment about specificity, GovCon domain knowledge, and win probability — tasks where stronger models produce meaningfully better discrimination between good and poor proposals. **This model name should be reviewed periodically** — newer Claude versions may offer equal quality at lower cost. See Known Bugs for the open issue on this.

### SAM.gov-style UI for the simulation
The sim deliberately mimics SAM.gov's actual visual design (blue sidebar, accordion filters, government typography). This is intentional: it reduces the learning curve for candidates who have used SAM.gov, and it tests whether candidates can navigate a realistic government portal under time pressure — not just whether they can answer GovCon trivia.

### One proposal per contract per user (upsert)
The proposal table uses a unique constraint on `(contractId, userId)`. Candidates can edit and resubmit the same proposal without creating duplicate records. This simplifies scoring (no need to pick "the latest" version) and admin review (one row per contract per candidate).

### `currentModule` as training/assessment gate
The login route determines session mode from `user.currentModule` rather than a URL parameter. This prevents candidates from bypassing the training sequence by directly hitting the assessment login URL. A candidate must have `currentModule > 2` (i.e., explicitly completed or skipped Module 02) before they get an assessment session.

### loginToken for attempt limiting (v3.0)
Each login generates `crypto.randomUUID()` stored in both the JWT and the Session record. Ties assessment sessions to a specific login event with no extra DB lookup per request. Log out → new token → fresh attempt. Training sessions are intentionally exempt.

### `sendBeacon` for tab-switch detection (v3.0)
`navigator.sendBeacon` is used over `fetch` in TabSwitchMonitor because browsers guarantee beacon delivery during page hide/unload. `fetch` can be aborted if the user immediately navigates away.

### `@react-pdf/renderer` for PDF reports (v3.0)
Chosen over Puppeteer (too heavy for serverless) and jsPDF (client-side only, poor layout control). Generates PDFs server-side in a Node.js runtime Vercel function using React component syntax. `export const runtime = "nodejs"` opts the route out of the default edge runtime.
