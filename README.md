# FontSVG — Google Font & Custom Font to SVG Path

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deploy-Cloudflare-F38020.svg)](https://fontsvg.ceda.is/)
[![AI Ready](https://img.shields.io/badge/llms.txt-available-0ea5e9.svg)](https://fontsvg.ceda.is/llms.txt)

> Convert Google Fonts and custom fonts (TTF, OTF, WOFF) into clean SVG vector paths and CAD DXF outlines directly in your browser. 100% private, client-side processing with zero server dependencies.

**Live Tool**: [https://fontsvg.ceda.is/](https://fontsvg.ceda.is/) | **中文版**: [https://fontsvg.ceda.is/zh/](https://fontsvg.ceda.is/zh/)

---

## Features

- **1,500+ Google Fonts**: Instantly search, select, and render typography from Google's entire open-source library.
- **Custom Font Upload**: Upload local `.ttf`, `.otf`, and `.woff` font files for private vectorization.
- **Multi-line Text Support**: Type or paste multi-line paragraphs with customizable `Line Height` multipliers and empty line skipping.
- **Boolean Union (Overlap Merging)**: Automatically merge overlapping glyph outlines into a single continuous vector boundary using [Maker.js](https://maker.js.org/). Crucial for laser cutting and vinyl routing of script/cursive fonts.
- **CAD DXF Export**: Export Autodesk DXF files formatted for CNC routers, vinyl cutters, and 3D CAD extrusions with customizable units (`mm`, `cm`, `m`, `inch`, `foot`).
- **One-Click Clipboard Copy**: Instantly copy raw `<path d="..." />` data using the modern `navigator.clipboard` API.
- **100% Client-Side Privacy**: All font parsing and geometric calculations happen in your browser engine via [OpenType.js](https://opentype.js.org/). No font files or text strings are ever uploaded to any server.

---

## Parameters

| Parameter | Description |
| :--- | :--- |
| **Text** | Multi-line textarea for entering text (press Enter for new lines) |
| **Font Family** | Choose any Google Font or switch to custom uploaded font |
| **Font Upload** | Select local `.ttf`, `.otf`, or `.woff` files from your device |
| **Size** | Font size in dimensional units |
| **Line Height** | Vertical line spacing multiplier (default: 1.2 = 120% of font size) |
| **Union** | Merge overlapping glyph contours into a unified outer perimeter |
| **Kerning** | Apply font metric kerning pairs for natural letter spacing |
| **Bezier Accuracy**| Approximation tolerance for quadratic and cubic bezier curves |
| **DXF Units** | Physical units for exported CAD DXF drawings (`mm`, `cm`, `m`, `inch`, `foot`) |
| **Fill / Stroke** | Visual stroke width, color, fill rules, and non-scaling stroke styling |

---

## API & CLI Integration

In addition to the web UI, FontSVG provides multiple interfaces for external callers and automation:

### 1. Command-Line Interface (CLI)
```bash
# Generate standalone SVG
node bin/font-to-svg.mjs --text "Cedaric" --font "Arial" --fill "#2563eb" -o ./output.svg

# Extract only SVG path data ("M ... Z") for React / HTML embedding
node bin/font-to-svg.mjs --text "Logo" --font "Georgia" --format path

# Weld overlapping cursive letter outlines with boolean union
node bin/font-to-svg.mjs --text "Signature" --font "Apple Chancery" --union -o ./cursive.svg

# Export CAD DXF drawing for laser / CNC cutting
node bin/font-to-svg.mjs --text "CUT" --font "Impact" --format dxf --dxf-units mm -o ./cut.dxf
```

### 2. Programmatic Node.js SDK
```javascript
import { convertTextToSvg } from 'google-font-to-svg-path';

const { svg, path, bounds } = await convertTextToSvg({
  text: 'Cedaric',
  font: 'Arial', // Google Font name, system font, or path to .ttf file
  size: 100,
  union: true,   // Boolean union for cursive fonts
  filled: true,
  fill: '#2563eb',
  format: 'svg'
});
```

### 3. Local REST API Server
```bash
# Start API server on port 3000
npm run api

# 1. Fetch live SVG image directly
curl "http://localhost:3000/api/svg?text=Cedaric&font=Arial&fill=%232563eb"

# 2. Fetch JSON path and dimensions
curl "http://localhost:3000/api/path?text=Cedaric&font=Arial"

# 3. POST JSON conversion
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Cedaric", "font": "Arial", "union": true, "fill": "#2563eb"}'
```

---

## AI Agent Skill (Antigravity)

The project includes an Antigravity Agent Skill at [`.agents/skills/font-to-svg/`](.agents/skills/font-to-svg/SKILL.md). AI coding agents can automatically invoke this skill to generate SVG vectors, choose fonts, weld cursive typography, and inline path data into codebases.

---

## AI & Agent Integration (GEO)

FontSVG provides standardized endpoints for LLM and AI agent retrieval:
- **LLM Summary**: [https://fontsvg.ceda.is/llms.txt](https://fontsvg.ceda.is/llms.txt)
- **Extended Technical Spec**: [https://fontsvg.ceda.is/llms-full.txt](https://fontsvg.ceda.is/llms-full.txt)

---

## Local Development

```bash
# Clone the repository
git [email protected]:OwenCedaric/google-font-to-svg-path.git
cd google-font-to-svg-path

# Install dependencies
npm install

# Start local Astro development server
npm run dev

# Build production static site
npm run build

# Preview production build locally
npm run preview
```

---

## License

This project is licensed under the [MIT License](LICENSE).  
Created and maintained by [Cedar](https://github.com/OwenCedaric). Original Maker.js prototype by Dan Marshall.
