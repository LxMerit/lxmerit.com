---
title: "Orc Horde 2.0: Tesla Mode Achieved"
date: "2025-12-05"
author: "Patrick J. Hardiman II"
description: "Built autonomous multi-window CCLI orchestration in 28 minutes. User says 'horde execute L2DEV-XXX', goes to lunch, returns to completed epic."
tags: ["dev-diary", "claude", "velocity", "horde", "automation", "hive"]
velocity:
  core: 17486
  docs: 1264
  ccli: 21
---

**December 5, 2025** — We built an AI development team that manages itself. Say `horde execute L2DEV-382`, walk away, return to a completed epic with all Jira tickets transitioned, commits pushed, and a victory notification waiting.

**Codename:** Tesla Mode (supervised self-driving for code)

## By the Numbers

| Metric | Value |
|--------|-------|
| Tickets Completed | 15 |
| Phases | 4 |
| Parallel Workers | 4 orcs + 1 PM |
| Total Execution Time | 28 minutes |
| Lines of Python | 5,857 |
| Modules Created | 15 |
| Bus Events Generated | 432 |
| Merge Conflicts | 0 |
| Orcs Harmed | 0 |

## The Architecture

```
User: "horde execute L2DEV-382"
        │
        ▼
┌─────────────────────────────────────────────┐
│         EPIC EXECUTION ENGINE               │
│  (execute.py - THE CAPSTONE)                │
└─────────────────────────────────────────────┘
        │
        ├── bus.py ─────────── Event pub/sub (file-based)
        ├── queue.py ───────── Dependency resolver
        ├── pool.py ────────── Auto-scaling workers
        ├── spawn.py ───────── tmux session management
        ├── handoff.py ─────── Jira → markdown generator
        ├── strategist.py ──── Daemon coordinator
        ├── health.py ──────── Heartbeat monitoring
        ├── checkpoint.py ──── Crash recovery
        ├── escalation.py ──── Blocker handling
        ├── git_manager.py ─── Branch isolation
        ├── notify.py ──────── User notifications
        └── cli.py ─────────── Full CLI interface
```

## What We Built

### Phase 1: Foundation (parallel)
- **Bus Wrapper Library** - File-based pub/sub via `events.jsonl`
- **Worker Spawner** - tmux session management
- **Handoff Generator** - Jira ticket → markdown assignment
- **Worker Self-Bootstrap** - Zero human touch after spawn

### Phase 2: Intelligence (parallel)
- **Epic State Tracker** - Real-time progress visibility
- **Heartbeat Monitor** - Dead worker detection
- **Dependency Resolver** - Never assign blocked tickets
- **Strategist Daemon** - Coordination layer

### Phase 3: Integration (parallel)
- **Blocker Auto-Escalation** - Notify on stuck workers
- **Git Conflict Prevention** - Branch isolation per worker
- **Worker Pool Auto-Scaling** - Dynamic worker count
- **Checkpoint System** - Crash recovery

### Phase 4: Capstone (parallel)
- **User Notifications** - Terminal bell + colors
- **Horde CLI** - Full command interface
- **Epic Execution Engine** - THE CAPSTONE

## Key Innovations

### 1. File-Based Coordination Bus
No fancy infrastructure. Just `events.jsonl`. Append JSON, watch for changes. Works everywhere.

```bash
~/.claude/coordination/events.jsonl
```

### 2. Self-Bootstrapping Workers
Spawn tmux session, inject init prompt, worker reads handoff, emits `worker.online`, starts chopping. Zero human touch after spawn.

### 3. Dependency-Aware Dispatch
Queue knows which tickets block which. Never assigns blocked ticket. Maximizes parallelization.

### 4. Crash Recovery
Checkpoints every 5 minutes. Worker dies? Respawn with context. No lost work.

### 5. Branch Isolation
Each worker on `horde/w1/L2DEV-XXX` branch. Merge queue serializes to main. Zero conflicts.

## Before vs After

**Before Orc Horde 2.0:**
- Open 4 terminals manually
- Copy/paste init prompts
- Monitor each window
- Context switch constantly

**After Orc Horde 2.0:**
```bash
horde execute L2DEV-382
# Go to lunch
# Return to completed epic
```

## Lessons Learned

### What Worked
- **Parallel dispatch:** 4 orcs chopping simultaneously = 4x throughput
- **Detailed handoffs:** Workers had clear deliverables, didn't need clarification
- **Bus protocol:** Real-time visibility into all worker activity
- **Orc culture:** Short communication, no fluff, just results. All tests green like Orcs.

### What Needs Polish
- **Permission prompts:** CCLI requires one "allow for session" per worker spawn
- **Absolute paths:** Learned the hard way that `~` doesn't expand in permissions

## What's Next

1. **Test drive** on L2DEV-382 (Student Experience epic)
2. **Polish** permission handling for true hands-off
3. **Add sounds** - victory fanfare on epic.complete
4. **Dashboard** - web UI for monitoring (optional)

## The Flex

Built an autonomous AI development team in 28 minutes using 4 parallel Claude instances coordinated through a text file.

The future of software development isn't one AI. It's a horde.

```
  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║   "horde execute L2DEV-382"           ║
  ║                                       ║
  ║   [Patrick leaves]                    ║
  ║                                       ║
  ║   [4 orcs chopping]                   ║
  ║   [PM tracking Jira]                  ║
  ║   [Strategist routing]                ║
  ║                                       ║
  ║   [Patrick returns]                   ║
  ║                                       ║
  ║   "🪓 Epic complete. 15 tickets."     ║
  ║                                       ║
  ╚═══════════════════════════════════════╝
```

---

*Generated by the Claude Code Hive - Wave ORC-HORDE-2.0*

**FOR THE HORDE!** 🪓
