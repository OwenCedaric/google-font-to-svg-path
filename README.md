# FontSVG — Google Font & Custom Font to SVG Path

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deploy-Cloudflare-F38020.svg)](https://fontsvg.ceda.is/)
[![AI Ready](https://img.shields.io/badge/llms.txt-available-0ea5e9.svg)](https://fontsvg.ceda.is/llms.txt)

> Convert Google Fonts and custom fonts (TTF, OTF, WOFF) into clean SVG vector paths and CAD DXF outlines directly in your browser. 100% private, client-side processing with zero server dependencies.

**Live Tool**: [https://fontsvg.ceda.is/](https://fontsvg.ceda.is/)

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
