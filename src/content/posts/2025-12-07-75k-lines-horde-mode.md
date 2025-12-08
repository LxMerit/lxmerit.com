---
title: "Two Years of Software Development Work in One Sunday Afternoon"
date: "2025-12-07"
author: "Patrick J. Hardiman II"
description: "One developer, 8 Claude Code windows, and a custom ORChestration layer shipped 5 sprints and 71 tickets in a single session."
tags: ["dev-diary", "claude", "velocity", "ai-development", "lms", "startup"]
velocity:
  core: 69730
  docs: 5269
  ccli: 355
---

I started building the homeschool platform our family needed 26 days ago.
Today was the final push that turned a big idea into a finished product.

In one Sunday — mostly after lunch — I shipped what would normally take a team two full years:

## The L(earn)² Platform Features

- **Mastery Assessment Engine** — Measures Learning Velocity (Speed × Depth × Retention) to identify when real mastery is attained.
- **LxLedger** — Velocity data from every assessment, recorded forever. That's the transcript.
- **Parent coaching dashboards** — Know how to structure your day, see where your kids actually are, and get clear guidance on what to do next.
- **Complete student workflow** — courses, assignments, submissions, grading, calendar, progress tracking. Everything in one place.
- **"Student Is The Sun" architecture** — Unlike traditional schools where the institution owns student records, your child owns their learning data. You control who gets access — teachers, tutors, co-ops only see what you grant them.

26 days from first line of code to finished product.
Today was the last big push: two years of work in one afternoon.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Tickets closed | 71 |
| Commits | 18 |
| Files changed | 325 |
| Lines added | +69,730 |
| Claude Code windows | 8 (Strategist + PM + 6 Workers) |
| Average per ticket | 3.5 minutes |

---

## How I Did It

A custom ORChestration layer ("Orc Horde") turns Claude Code instances into a fire-and-forget development team:

- One strategist plans and dispatches
- Up to 6 worker windows execute tickets in parallel
- A shared event bus coordinates everything
- When a session dies, a new one resurrects with one paste and zero lost momentum

---

## Architecture

```
        USER (Warchief)
             |
      STRATEGIST (Chief of Staff)
             |
          PM (Taskmaster)
             |
    +--------+--------+--------+--------+--------+
    |        |        |        |        |        |
   W1       W2       W3       W4       W5       W6
```

---

## Sample Bus Events

```json
{"ts":"2025-12-07T20:36:32","src":"w2","type":"subtask.completed","ticket":"L2DEV-392","task":"Built calendar API endpoint"}
{"ts":"2025-12-07T20:39:29","src":"w2","type":"task.completed","ticket":"L2DEV-392","summary":"Calendar view done. 6 files."}
{"ts":"2025-12-07T20:39:51","src":"spawner","type":"worker.killed","notes":"Killed w2"}
{"ts":"2025-12-07T20:44:23","src":"strategist","type":"dispatch.issued","workers":["w1","w2","w3"],"tickets":["L2DEV-197","L2DEV-198","L2DEV-201"]}
```

---

## What's Left

Two short sprints tomorrow morning:

- Final hardening + Stripe integration (already partially done)
- Production deploy (Fly.io, Neon, CI/CD, DNS)

One developer. Eight Claude Code windows. One Sunday. 69,730 lines.

**Patrick J. Hardiman II**
Founder, LxMerit

**L(earn)² = Merit**
