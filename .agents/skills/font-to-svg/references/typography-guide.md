# Typography & SVG Vector Path Guide

When generating vector typography or converting text into SVG paths for UI, graphic design, or CAD, use this guide to select the optimal font style and parameters.

## Font Categories & Recommendations

| Style | Recommended Fonts | Key Attributes | When to Use | Union Recommended? |
| :--- | :--- | :--- | :--- | :--- |
| **Cursive / Script / Signature** | Pacifico, Dancing Script, Caveat, Great Vibes, Apple Chancery | Flowing, connected handwritten letterforms | Signatures, elegant headers, wedding/invitation cards, craft | **YES (`--union`)** — merges overlapping strokes into a continuous perimeter |
| **Modern Clean Sans-Serif** | Inter, Roboto, Montserrat, Arial, Helvetica, Open Sans | High legibility, neutral, clean geometric curves | Tech UI, dashboards, navigation, modern logos | No (unless letter spacing is tight and glyphs overlap) |
| **Elegant Serif** | Playfair Display, Merriweather, Georgia, Times New Roman, Baskerville | Classic serifs, high contrast strokes | Editorial, luxury branding, publishing, formal titles | No |
| **Bold Display / Headline** | Impact, Bebas Neue, Anton, Arial Black | Heavy weights, compact, high visual impact | Badges, banners, posters, punchy logos | No |
| **Monospace / Code** | JetBrains Mono, Fira Code, Monaco, Courier New | Fixed pitch, technical character forms | Developer tools, terminal mockups, data displays | No |

## Crucial Vector Parameters

### 1. Overlap Merging (`--union`)
In script/cursive fonts (like Pacifico or Apple Chancery), letters physically overlap so they appear joined.
- **Without Union**: Each glyph is an isolated outline. Laser cutters and vinyl plotters will cut inside the connecting strokes, damaging the output.
- **With Union**: A boolean 2D union algorithm computes the unified outer perimeter of all connected glyphs, creating a seamless single cut contour.

### 2. Output Formats
- **`--format svg`**: Complete standalone XML document with `width`, `height`, and `viewBox`. Ideal for saving to `.svg` files or using as `<img>` / background image.
- **`--format path`**: Extracts only the raw `d="..."` path string. Ideal for inlining into React icons (`<svg viewBox="..."><path d={pathData} /></svg>`), CSS `clip-path`, or HTML Canvas.
- **`--format dxf`**: Autodesk DXF CAD format with physical units (`--dxf-units mm`). Crucial for CNC mills and laser cutters.
- **`--format json`**: Full diagnostic object including bounds (`width`, `height`, `minX`, `minY`), font resolution info, and all formats.

### 3. Styling & Colors
- `--fill "#2563eb"`: Fills glyph interiors with specified color.
- `--stroke "#1e40af"`: Outlines the vector contours.
- `--stroke-width "1px"` or `"0.25mm"`: Sets stroke thickness.
- `--line-height 1.2`: Line spacing multiplier for multi-line strings (`\n`).
