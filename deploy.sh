#!/bin/bash
#
# deploy.sh - Build and deploy lxmerit.com to Cloudflare Pages
#
# This script:
# 1. Runs velocity snapshot (ensures latest count)
# 2. Updates velocity.json with latest numbers
# 3. Builds the site
# 4. Deploys to Cloudflare Pages
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LXMERIT_ROOT="${HOME}/LxMerit"
VELOCITY_TSV="${LXMERIT_ROOT}/.velocity-history.tsv"
VELOCITY_JSON="${SCRIPT_DIR}/src/lib/velocity.json"

echo "📊 Running velocity snapshot..."
cd "$LXMERIT_ROOT"
./tools/dev-velocity/snapshot.sh

echo "📝 Extracting latest velocity data..."
# Get the last non-comment line from TSV
LATEST=$(grep -v '^#' "$VELOCITY_TSV" | tail -1)
DATE=$(echo "$LATEST" | cut -f1)
TOTAL=$(echo "$LATEST" | cut -f2)
CORE=$(echo "$LATEST" | cut -f3)
DOCS=$(echo "$LATEST" | cut -f4)
CCLI=$(echo "$LATEST" | cut -f5)

# Count days tracked
DAYS_TRACKED=$(grep -v '^#' "$VELOCITY_TSV" | wc -l)

# Write velocity.json for build
cat > "$VELOCITY_JSON" << EOF
{
  "allTime": $TOTAL,
  "core": $CORE,
  "docs": $DOCS,
  "ccli": $CCLI,
  "since": "2025-11-12",
  "trackingBegan": "2025-12-02",
  "lastSnapshot": "$DATE",
  "daysTracked": $DAYS_TRACKED
}
EOF

echo "   Total: $TOTAL | Core: $CORE | Docs: $DOCS | CCLI: $CCLI"

echo "🔨 Building site..."
cd "$SCRIPT_DIR"
npm run build

echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy build --project-name=lxmerit

echo "✅ Deploy complete!"
echo "   Preview: https://lxmerit.pages.dev"
echo "   Production: https://lxmerit.com"
