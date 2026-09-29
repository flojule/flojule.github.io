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

# Portable to macOS bash 3.2 (no mapfile).
files="$(find src/content -name '*.mmd' | sort)"
[[ -n "$files" ]] || { echo "No .mmd files under src/content" >&2; exit 1; }

while IFS= read -r f; do
  for mode in light dark; do
    out="${f%.mmd}-$mode.svg"
    npx -y @mermaid-js/mermaid-cli@12.0.0 -q -p "$tmp/puppeteer.json" \
      -c "$tmp/$mode.json" -b transparent -i "$f" -o "$out"
    # Fixed width/height from the viewBox so the SVG has an intrinsic size (Mermaid writes width="100%").
    node -e '
      const fs = require("fs"), p = process.argv[1];
      const s = fs.readFileSync(p, "utf8");
      const m = s.match(/<svg[^>]*?viewBox="[-\d.]+ [-\d.]+ ([\d.]+) ([\d.]+)"/);
      if (!m) { console.error(`No viewBox in ${p}`); process.exit(1); }
      const [w, h] = [Math.ceil(m[1]), Math.ceil(m[2])];
      const root = /<svg([^>]*?) width="100%"([^>]*?) style="[^"]*"/;
      if (!root.test(s)) { console.error(`Unexpected <svg> root in ${p}`); process.exit(1); }
      fs.writeFileSync(p, s.replace(root, `<svg$1 width="${w}" height="${h}"$2`));
    ' "$out"
    echo "$out"
  done
done <<< "$files"
