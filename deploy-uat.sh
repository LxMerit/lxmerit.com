#!/bin/bash
#
# deploy-uat.sh - Build and deploy lxmerit.com (corporate site) to Cloudflare
#                 Pages UAT branch → https://uat.lxmerit.pages.dev
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

echo "🧪 DEPLOYING TO UAT (not production)"
echo ""

echo "🔨 Building site..."
npm run build

echo "🚀 Deploying to Cloudflare Pages (project: lxmerit, branch: uat)..."
wrangler pages deploy .svelte-kit/cloudflare --project-name=lxmerit --branch=uat --commit-dirty=true

echo ""
echo "✅ UAT Deploy complete!"
echo "   UAT: https://uat.lxmerit.pages.dev"
echo ""
echo "⚠️  Test before deploying to production!"
echo "   Run ./deploy.sh to push to production after approval."
