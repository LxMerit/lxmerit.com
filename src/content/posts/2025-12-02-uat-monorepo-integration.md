---
title: "Corp Sites UAT Pipeline: Monorepo Preview Integration"
date: "2025-12-02"
author: "Patrick J. Hardiman II"
description: "Building a unified developer workbench for previewing corporate sites before production deployment to Cloudflare Pages."
tags: ["dev-diary", "infrastructure", "svelte", "devops"]
velocity:
  core: 449
  docs: 59
  ccli: 432
---

**December 2, 2025** — Today we shipped L2DEV-291: a complete UAT pipeline for previewing lxmerit.com and lxledger.com changes before pushing to production on Cloudflare Pages.

## The Problem

Previously, testing corp site changes meant:
1. Make changes locally
2. Build and deploy to Cloudflare
3. Hope nothing broke
4. Roll back if it did

We needed a preview environment integrated into our existing developer workbench, where changes could be reviewed and approved before going live.

## The Architecture

```
localhost:3000 (Caddy Reverse Proxy)
  /              -> Workbench (port 5173)
  /lxmerit/*     -> lxmerit.com UAT (port 5001)
  /lxledger/*    -> lxledger.com UAT (port 5002)
```

One command (`./start.sh`) spins up:
- The main workbench dashboard
- Both corp sites running with subpath prefixes
- Caddy handling routing between them

## The Challenge: SvelteKit BASE_PATH

The hard part wasn't the proxy config. It was making SvelteKit apps work at non-root paths.

Every internal link needed to change from:
```svelte
<a href="/blog">Blog</a>
```

To:
```svelte
<script>
  import { base } from '$app/paths';
</script>
<a href={`${base}/blog`}>Blog</a>
```

This applies to:
- Navigation links
- Asset paths (logos, favicons)
- Blog post links
- Error page links
- Anything that references another route

## Files Modified

**lxmerit.com:**
- `svelte.config.js` - BASE_PATH env var support
- `+layout.ts` - trailingSlash config (SvelteKit 2.x moved this from config)
- `+layout.svelte` - All nav links, favicons
- `+page.svelte` - Homepage links
- `+error.svelte` - Error page links
- `blog/+page.svelte` - Blog listing links
- `blog/[slug]/+page.svelte` - Blog post back links

**lxledger.com:**
- Same pattern applied

**bench-svelte:**
- `Caddyfile` - Reverse proxy routes
- `start.sh` - Unified startup script
- Dashboard card for quick UAT access

## The Gotcha: SvelteKit 2.x

We hit this error:
```
Unexpected option config.kit.trailingSlash
```

Turns out SvelteKit 2.x moved `trailingSlash` from `svelte.config.js` to route-level exports:

```typescript
// +layout.ts
export const prerender = true;
export const trailingSlash = 'always';
```

Not documented prominently. Cost us 20 minutes.

## The Workflow

Now the process is:

1. **Develop** - Make changes to corp site code
2. **Preview** - View at `/lxmerit/` or `/lxledger/` on workbench
3. **Approve** - Visual review and sign-off
4. **Deploy** - `wrangler pages deploy build --project-name=lxmerit`

No BASE_PATH for production builds. The env var only applies during UAT dev mode.

## What's Next

This UAT pipeline supports the broader goal: everything previewed before production. Next up:
- OG card preview (social sharing images)
- Dev diary entry preview
- Automated deployment approval workflow

---

*Commits: lxmerit.com 19be9b4, lxledger.com c4ca715, bench-svelte 71b67b6f*
*Jira: L2DEV-291*
