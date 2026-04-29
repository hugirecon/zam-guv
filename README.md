# Zam.guv — Government Contract Assessment Portal

A time-limited proposal drafting and assessment platform for government contracting opportunities. VPs have **30 minutes** per session to review contracts and submit proposals; an AI (Claude) scores each submission.

## Overview

```
/login       → All users authenticate here
/vp          → VP portal (30-minute countdown, contract browser, proposal editor)
/admin       → Admin dashboard (stats, contracts, proposals, sessions)
```

## Features

### VP Portal (30-Minute Session)
- **Countdown timer** in the header: `Time Remaining: MM:SS`
- Timer turns **red and pulses** at ≤5 minutes remaining
- At **0:00**: all in-progress drafts are auto-submitted; portal locks with "Session Expired" screen
- Browse **52 active government contracts** with filters (set-aside, contract type, clearance, keyword)
- Multi-tab proposal editor: Executive Summary, Technical Approach, Management Approach, Pricing, Past Performance
- Draft auto-save; manual submit with confirmation dialog
- AI scores appear after submission (powered by Claude)

### Admin Portal
- **Command Center**: KPI grid, top-scored proposals, contracts by agency
- **Contracts**: Searchable table of all 52 solicitations
- **Proposals**: All VP submissions with AI scores and drill-down detail panel
- **Sessions**: All 30-minute sessions with real-time countdown for active ones

### AI Scoring (Anthropic Claude)
Each submitted proposal is scored 0–100 across:
- Technical approach
- Management approach
- Pricing
- Past performance
- Compliance

With recommendation: `Award | High Competitive | Competitive | Non-Competitive`

## Setup

### Prerequisites
- Node.js 18+
- (Optional) Anthropic API key for AI scoring

### Install & Run

```bash
cd zam-guv
npm install

# Seed the database (52 contracts + demo users)
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# Start development server
npm run dev
```

App runs at `http://localhost:3000`

### Environment Variables (`.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
ANTHROPIC_API_KEY="sk-ant-..."   # Optional — enables AI scoring
```

## Demo Credentials

| Role  | Email                        | Password        |
|-------|------------------------------|-----------------|
| Admin | admin@zam.guv                | Admin@2026!     |
| VP    | sarah.chen@company.gov       | VP@Secure2026!  |
| VP    | james.walker@company.gov     | VP@Secure2026!  |
| VP    | priya.patel@company.gov      | VP@Secure2026!  |
| VP    | marcus.johnson@company.gov   | VP@Secure2026!  |
| VP    | elena.rodriguez@company.gov  | VP@Secure2026!  |

## Session Timer Behavior

| Time Remaining | State |
|----------------|-------|
| > 5:00         | Normal (slate/gray badge) |
| ≤ 5:00         | **Red badge** |
| ≤ 1:00         | Red badge + **pulse animation** |
| 0:00           | Auto-submit all drafts → lock session → show "Session Expired" screen |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite via Prisma 7 + libSQL adapter
- **Auth**: JWT (httpOnly cookies) + bcrypt
- **AI**: Anthropic Claude (claude-opus-4-5)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Contract Coverage

52 real-format solicitations across DoD, HHS, DHS, DOE, NASA, USDA, DOJ, EPA, DOS, and more. Categories include:
- Cybersecurity & IT ($3.5M–$500M)
- Defense & Intelligence (Secret / TS/SCI)
- Healthcare & Public Health
- Infrastructure & Logistics
- Environmental & Conservation
- Research & Development

Set-asides: 8(a), SDVOSB, HUBZone, WOSB, Small Business, Unrestricted
Contract types: FFP, T&M, CPFF, IDIQ, BPA
