---
title: "Day 1: Six Sprints Shipped"
date: "2025-11-30"
author: "Patrick J. Hardiman II"
description: "One developer and 6 coordinated Claude Code CLI windows shipped 6 complete sprints and 281 smoke tests in a single day."
tags: ["dev-diary", "claude", "velocity", "ai-development"]
velocity:
  core: 0
  docs: 0
  ccli: 0
---

> **Methodology Note:** This was Day 19 of LxMerit development (started Nov 12, 2025).
> The original title claimed "57k lines in one day" based on `git --stat` output, which
> double-counts churn and includes auto-generated files. We've updated to honest accounting.
> See the Velocity Methodology section at the end of this post.

**November 30, 2025** — One developer and 6 coordinated Claude Code CLI windows shipped 6 complete sprints and 281 smoke tests in a single day. This is the first entry in the LxMerit dev diary.

## What We Shipped

Six complete sprints in a single day:

1. **v0.1.0** — Role System + API + Admin UI
2. **v0.2.0** — Students Sprint (SITS Access Model)
3. **v0.2.1** — Hardening Sprint (Security Fixes)
4. **v0.3.0-p1** — Courses API (178 smoke tests)
5. **v0.3.0-p2** — Content Storage + PDF Viewer (228 smoke tests)
6. **v0.3.0-p3** — Batch Import Pipeline (281 smoke tests)

## Architecture Delivered

- **FastAPI backend** with row-level security
- **SvelteKit admin UI** for platform management
- **PostgreSQL schema** with RLS policies
- **Content storage abstraction** (local + Cloudflare R2)
- **PDF/video/image viewer** components
- **Batch course import** with ZIP upload
- **SSE real-time progress** streaming
- **CLI tool** with Rich progress bars

### Key Patterns

- **SITS Access Model**: Student Is The Sun — a gravitational data model where the student record is central and all access radiates outward. Records stay with the student, enabling organization-agnostic portability.
- **18 roles across 4 contexts**: Platform, Organization, Course, Student
- **Content deduplication** via SHA-256 hash registry
- **Manifest-driven course population**: Upload YAML, create a course
- **SKIP LOCKED job queue**: PostgreSQL-native async processing

## The Process

### 6-Window Configuration

I ran 6 Claude Code CLI windows in parallel, each with a specialized role:

- **Strategist**: Architecture decisions, blocker resolution
- **PM**: Progress tracking, Jira updates, handoff management
- **W1-W4**: Worker windows executing tickets

### Coordination Bus

All windows communicate via a JSONL event bus. Events look like:

```json
{"ts":"2025-11-30T21:11:55","src":"w1","type":"task.completed","ticket":"L2DEV-268","summary":"ZIP Import integration complete"}
{"ts":"2025-11-30T21:12:36","src":"strategist","type":"blocker.resolved","for":"all","action":"Docker rebuild complete"}
```

Workers emit status. Strategist handles infrastructure. PM tracks completion.

### Session Continuity

Each Claude session has limited context. To maintain continuity across sessions, I use structured handoff files and resurrection scripts that capture:

- Work completed and in-progress
- Key decisions and their rationale
- Blockers and next priorities
- File paths and context needed to resume

When a session ends or context fills, the active window writes a handoff. Resurrection scripts provide bootstrap instructions for fresh sessions — which handoff to load, which tickets to work, which role to assume. The next session reads these files, restoring working memory. This enables multi-day initiatives without losing the thread — AI-assisted stream of consciousness development.

### Workflow

1. Strategist reviews epic, decomposes into tickets
2. PM dispatches tickets to workers via bus
3. Workers execute, emit progress events
4. Blocked workers signal strategist
5. Strategist resolves blockers (Docker rebuilds, architecture decisions)
6. PM tracks completion, updates Jira
7. Repeat until sprint complete

## Why This Matters

This demonstrates that **one developer with coordinated AI agents can ship production software at unprecedented velocity**.

The output is production-grade:
- Fully typed (Python + TypeScript)
- Tested (281 smoke tests passing)
- Secure (RLS, authentication, input validation)
- Documented (API docs, architecture decisions)

I'm building LxMerit — an AI-powered merit-based learning platform. Today's work delivers:
- Complete course management API
- Content upload and delivery
- Batch import for curriculum at scale
- Real-time progress tracking

## What's Next

The batch import pipeline enables populating entire 36-week courses from a single manifest file. Next sprint: connect to real curriculum content.

This dev diary will track velocity as I build — an impromptu LxLedger data point demonstrating that merit can be measured.

## Velocity Methodology

The original version of this post claimed "57,415 lines in one day." That number came from `git diff --stat`, which has problems:

1. **Counts churn**: If you add 100 lines, delete 50, then re-add 30, git counts 180 lines of activity
2. **Includes auto-generated files**: package-lock.json, API documentation exports, test fixtures
3. **No category breakdown**: Mixing code, docs, and config inflates the "code" perception

As of December 2, 2025, we implemented honest velocity tracking:

- **tokei** for accurate line counting (excludes comments, blanks correctly)
- **Category separation**: Core code vs. docs vs. config vs. CCLI infrastructure
- **Exclusion of auto-generated files**: package-lock.json, *.lock, exported HTML docs
- **Current state counting**: What's actually in the repo, not cumulative churn

**The honest numbers for the full LxMerit project (Nov 12 - Dec 2, 2025):**

| Category | Lines | Description |
|----------|-------|-------------|
| Core Code | 78,655 | ts/tsx/svelte/py/sql/sh/js |
| Documentation | 106,341 | Markdown files |
| **Total** | **184,996** | Human-authored content |

That's ~185,000 lines across 21 days — still ~8,800 lines/day average, which is legitimately impressive. But it's the *honest* number.

**Trust is the brand. Merit is as merit does.**

---

*One developer. Six Claude Code windows. Six sprints shipped.*

**Patrick J. Hardiman II**<br>
*Founder, LxMerit*

**L(earn)² = Merit**
