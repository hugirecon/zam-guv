# Zam.guv — Build Document & Features Reference

**Version:** 2.0  
**Updated:** 2026-05-14  
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
| AI Scoring | Anthropic Claude (`@anthropic-ai/sdk`) |
| Hosting | Vercel (auto-deploy from `main` branch) |
| Styling | Tailwind CSS |

**Required environment variables:**
- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` — JWT signing key
- `ANTHROPIC_API_KEY` — Claude API key for proposal scoring

---

## Database Schema

Four models. All platform data flows through them.

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
id          CUID (primary key)
userId      String (FK → User)
token       String (unique)
startedAt   DateTime
expiresAt   DateTime — startedAt + 30min (assessment) or +24h (training)
locked      Boolean (default: false) — true when session has ended
lockedAt    DateTime?
mode        String — "assessment" | "training"
vehicleType String — "Standard" | "IDIQ" | "OTA" | "GSA" | "SBIR"
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
aiScore            Float? — 0–100 composite score
aiScoreBreakdown   String? — JSON: { technical, management, pricing, past_performance, compliance }
aiFeedback         String? — narrative feedback from Claude
aiScoredAt         DateTime?
createdAt          DateTime
updatedAt          DateTime
```

**Unique constraint:** `(contractId, userId)` — one proposal per contract per VP, ever.

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

**Login flow:**
1. Verify email + bcrypt password match
2. Determine mode: `currentModule <= 2` → training (24h session), else → assessment (30-min session)
3. Call `getOrCreateVPSession(userId, trainingMode, vehicleType)` — reuses active session if one exists for that vehicle/mode
4. Sign JWT with `{ userId, role, sessionId }`
5. Set `zam-token` cookie, return user data
6. Redirect: VP → `/vp/hub`, Admin → `/admin`

**Per-request auth:**
```typescript
getAuthUser() → reads "zam-token" cookie → verifies JWT → returns { id, name, email, role, sessionId }
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

**All tab (default)**  
Previously named "Natural." Organized chronologically — terms appear in the order a VP would encounter them moving through a real contracting pipeline. Six pipeline stages with a clickable navigation strip at the top:

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

> **Pending feature:** Natural/Timeline toggle on the Compliance and Contract Vehicles tabs. Both tabs would gain a two-button toggle at the top — Natural view (current framework/category organization) and Timeline view (same terms, reorganized chronologically by when a VP would encounter them in the contracting pipeline). Approved, not yet built.

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

**Submit Proposal** → `POST /api/proposals/[id]/submit` — marks submitted, triggers synchronous AI scoring, advances user's `currentModule` to 4 if assessment mode.

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
**Model:** Anthropic Claude  
**Scoring dimensions:** Technical Credibility, Management Approach, Pricing, Past Performance, Compliance Awareness  
**Output:** Composite `aiScore` (0–100) + per-dimension `aiScoreBreakdown` (JSON) + `aiFeedback` (narrative)

Claude evaluates each proposal against the actual contract's description, requirements list, NAICS code, set-aside type, and value range. The evaluation is contract-specific — a generic proposal scores poorly by design.

Scoring is **synchronous** — called with `await` before the API response is returned. This is intentional: Vercel terminates async fire-and-forget tasks after the response is sent.

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
| DELETE | `/api/admin/users/[id]` | Delete VP account |

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

Note: `seed-vehicles.ts` must run after `seed.ts`. Both scripts are idempotent (upsert by `solicNumber`).

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

**Natural/Timeline toggle on Compliance and Contract Vehicles tabs (Module 01)**  
Both tabs will gain a two-button view toggle: Natural (current organization) and Timeline (same terms, organized by when a VP encounters them in the contracting pipeline). All terms appear in both views — no information is exclusive to either. Approved, not yet built.

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
| Demetrios | demetrios@kdt.mil | KDT-Demo2026! | vp | Multiple sessions across vehicles |
| Clark | clark@kdt.mil | KDT-Demo2026! | vp | Active |
| Simeon | simeon@kdt.mil | KDT-Demo2026! | vp | Minimal activity |
| Demetrios Tsirigotis | demetrios.tsirigotis@kdt.guv | (set on creation) | vp | — |
| Clark Donalson | clark.donalson@kdt.guv | (set on creation) | vp | — |
| Austin Losurdo | austin.losurdo@kdt.guv | (set on creation) | vp | — |
| Nicholas Norman | nicholas.norman@kdt.guv | (set on creation) | vp | Active |
| Santiago Telleria | santiago.telleria@kdt.guv | (set on creation) | vp | Active |
| Matthew McCalla | matthew.mccalla@kdt.guv | (set on creation) | vp | Active |

New VPs can be created from the Admin → Users page. No seed script required.
