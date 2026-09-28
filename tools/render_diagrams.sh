#!/usr/bin/env bash
# Render every src/content/**/*.mmd to <name>-light.svg and <name>-dark.svg next to it.
# Requires Node.js (npx). Set PUPPETEER_EXECUTABLE_PATH to use a local Chromium.
set -euo pipefail

cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Theme tokens: edge-label background matches the project page (daisyUI base-200).
theme() {
  cat <<JSON
{
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Arial, Helvetica, sans-serif",
    "fontSize": "16px",
    "primaryColor": "$1",
    "primaryBorderColor": "$2",
    "primaryTextColor": "$3",
    "lineColor": "$4",
    "edgeLabelBackground": "$5"
  },
  "look": "classic",
  "flowchart": { "wrappingWidth": 400, "curve": "basis" }
}
JSON
}
theme "#e9ecf0" "#9aa3ae" "#1f2937" "#4b5563" "#f8f8f8" > "$tmp/light.json"
theme "#2a323c" "#56606c" "#e5e7eb" "#9ca3af" "#191e24" > "$tmp/dark.json"
echo '{"args":["--no-sandbox"]}' > "$tmp/puppeteer.json"

mapfile -t files < <(find src/content -name '*.mmd' | sort)
[[ ${#files[@]} -gt 0 ]] || { echo "No .mmd files under src/content" >&2; exit 1; }

for f in "${files[@]}"; do
  for mode in light dark; do
    out="${f%.mmd}-$mode.svg"
    npx -y @mermaid-js/mermaid-cli@12.0.0 -q -p "$tmp/puppeteer.json" \
      -c "$tmp/$mode.json" -b transparent -i "$f" -o "$out"
    echo "$out"
  done
done
