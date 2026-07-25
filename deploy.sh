#!/bin/bash
#
# deploy.sh - Build and deploy lxmerit.com (corporate site) to Cloudflare Pages.
#             PRODUCTION → https://lxmerit.com
#
# Build + deploy only. The velocity-snapshot step was removed 2026-07-25 —
# it fed the retired Dev Diary numbers, which are gone.
#
# AUTH: wrangler needs Cloudflare credentials. In a non-interactive shell set
#   export CLOUDFLARE_API_TOKEN=<Pages:Edit token>
# or run `wrangler login` once interactively (OAuth, opens a browser).
#
# Runbook: LxMerit/docs/runbooks/CORP_SITE_DEPLOY.md
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🔨 Building site..."
npm run build

echo "🚀 Deploying to Cloudflare Pages (project: lxmerit → PRODUCTION)..."
wrangler pages deploy .svelte-kit/cloudflare --project-name=lxmerit --commit-dirty=true

echo "✅ Deploy complete!"
echo "   Preview:    https://lxmerit.pages.dev"
echo "   Production: https://lxmerit.com"
