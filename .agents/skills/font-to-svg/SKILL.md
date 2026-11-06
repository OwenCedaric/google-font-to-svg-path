---
name: font-to-svg
description: >-
  Convert text and typography into clean vector SVG paths (<path d="...">), standalone SVG files,
  or CAD DXF drawings using Google Fonts or local font files. Use this skill when asked to create
  vector text, design typographic logos or wordmarks, generate SVG outlines from fonts, weld cursive
  strokes together with boolean union, or export CAD outlines for laser cutting and CNC machining.
---

# Font to SVG Vector Converter Skill

This skill enables the AI agent to transform any text string into mathematically precise, scalable vector SVG path data or standalone SVG graphics using Google Fonts or local font files (.ttf, .otf, .woff).

## Capabilities

1. **Clean SVG Path Extraction**: Generates raw `<path d="..." />` data for direct embedding into React/Vue components, HTML/CSS icons, or canvas visualizers.
2. **Boolean Union Merging**: Automatically welds overlapping cursive / script letterforms together into a continuous perimeter outline, preventing interior intersection lines.
3. **Multi-line Text Formatting**: Supports multi-line strings (`\n`) with adjustable line-height multipliers.
4. **CAD DXF Export**: Produces Autodesk DXF format for CNC routing, laser cutting, and vinyl plotting.
5. **Universal Font Support**: Resolves Google Fonts, local custom font files, and system fonts with graceful fallback.

---

## When to Use This Skill

- When the user asks to **generate a vector logo, wordmark, or typographic badge**.
- When the user asks to **convert text into an SVG `<path>`** (e.g., to inline into an icon or UI component without external font dependencies).
- When the user asks to **weld cursive / script typography** for laser cutting, CNC, or vinyl cutter plotters.
- When the user wants **Autodesk DXF outlines** of stylized text.
- When an external caller needs an **API or CLI invocation** to automate text-to-SVG workflows.

---

## Procedure: How to Generate SVGs

### Step 1: Select Appropriate Font Style & Options

Consult [typography-guide.md](./references/typography-guide.md) for font pairing and styling rules:
- **Cursive / Handwriting / Script**: Choose fonts like `Pacifico`, `Dancing Script`, `Caveat`, or `Apple Chancery`. **Always enable `--union`** to weld overlapping letterforms.
- **Modern / Clean / Tech**: Choose fonts like `Inter`, `Roboto`, `Montserrat`, or `Arial`.
- **Classic / Editorial / Serif**: Choose fonts like `Playfair Display`, `Georgia`, or `Times New Roman`.
- **Bold Display / Badge**: Choose fonts like `Impact`, `Bebas Neue`, or `Arial Black`.

### Step 2: Execute the Generator Script

Use `run_command` to execute the helper script:

```bash
# 1. Output a complete SVG file with styling
node .agents/skills/font-to-svg/scripts/generate-svg.mjs \
  --text "Cedaric" \
  --font "Arial" \
  --size 100 \
  --fill "#2563eb" \
  --out ./output.svg

# 2. Extract only the path data string (ideal for inlining into React/HTML)
node .agents/skills/font-to-svg/scripts/generate-svg.mjs \
  --text "Vector Text" \
  --font "Georgia" \
  --format path

# 3. Generate script / cursive typography with boolean union
node .agents/skills/font-to-svg/scripts/generate-svg.mjs \
  --text "Welcome Home" \
  --font "Apple Chancery" \
  --union \
  --fill "#10b981" \
  --out ./welcome.svg

# 4. Generate CAD DXF file for CNC / laser cutting
node .agents/skills/font-to-svg/scripts/generate-svg.mjs \
  --text "CUT-OUT" \
  --font "Impact" \
  --format dxf \
  --dxf-units mm \
  --out ./cutout.dxf
```

### Step 3: Programmatic Node.js Usage

If writing code inside the project or an external service:

```javascript
import { convertTextToSvg } from './lib/converter.mjs';

const result = await convertTextToSvg({
  text: 'Cedaric',
  font: 'Arial',
  size: 80,
  union: true,
  filled: true,
  fill: '#3b82f6'
});

console.log(result.svg);   // Standalone <svg ...> XML
console.log(result.path);  // Raw 'd' attribute string
console.log(result.bounds); // { width, height, minX, minY, maxX, maxY }
```

### Step 4: Standalone HTTP API Service

External callers can query the local REST API server:

```bash
# Start API service on port 3000
npm run api

# 1. Fetch raw SVG image
curl "http://localhost:3000/api/svg?text=Cedaric&font=Arial&fill=%232563eb"

# 2. Fetch JSON path and bounds
curl "http://localhost:3000/api/path?text=Cedaric&font=Arial"

# 3. Flexible POST request
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Cedaric", "font": "Arial", "union": true, "fill": "#2563eb"}'
```

---

## CLI Options Reference

| Option | Flag | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--text` | `-t` | string | "Cedaric" | Target text string, supports `\n` for multi-line |
| `--font` | `-f` | string | "Arial" | Font family name, system font, or path to `.ttf`/`.otf` file |
| `--variant`| `-v` | string | "regular" | Font weight/style variant (regular, bold, italic) |
| `--size` | `-s` | number | 100 | Target font size in units |
| `--line-height`| `-l` | number | 1.2 | Multiplier for line spacing in multi-line text |
| `--union`| `-u` | boolean | false | Merge overlapping glyph contours into a single outline |
| `--fill` | | string | "#000000" | Fill color hex or CSS color (enables fill mode) |
| `--stroke`| | string | "#000000" | Stroke outline color |
| `--stroke-width`| | string | "0.25mm" | Stroke width with units (e.g. `1px`, `0.5mm`) |
| `--no-kerning` | | boolean | false | Disable font kerning pair adjustments |
| `--separate` | | boolean | false | Separate each character into its own layer |
| `--dxf-units` | | string | "" | Dimension units for DXF CAD export (`mm`, `cm`, `inch`) |
| `--format`| | string | "svg" | Output format: `svg`, `path`, `dxf`, or `json` |
| `--out` | `-o` | string | stdout | Destination file path to save output |
| `--list-fonts`| | boolean | | List all detected local system and cached fonts |
