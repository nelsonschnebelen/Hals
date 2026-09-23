#!/usr/bin/env bash
set -euo pipefail
# Netlify build entrypoint. One repo powers two kinds of sites; pick the
# flavor with environment variables set per-site in the Netlify UI
# (Site configuration → Environment variables):
#
#   PROMO_ONLY=1          serve the /win game at the site root (game-only
#                         promo site; home links point at the main site)
#   NEXT_PUBLIC_REPLAY=1  review mode: every refresh deals a fresh game;
#                         remove it for launch so prizes lock per guest
#
# With neither set, this builds the full Hal's site with the game at /win.

export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-${URL:-https://halsthesteakhouse.com}}"

if [ "${PROMO_ONLY:-}" = "1" ]; then
  export NEXT_PUBLIC_HOME_URL="${NEXT_PUBLIC_HOME_URL:-https://www.halsthesteakhouse.com}"
fi

npm run build

if [ "${PROMO_ONLY:-}" = "1" ]; then
  # Promote the game to the root; keep /win working for old links/QRs.
  cp out/win/index.html out/index.html
  cp out/win/index.txt out/index.txt 2>/dev/null || true
  # Main-site-only assets the game never loads.
  rm -rf out/hero.jpg out/placeholders
fi
