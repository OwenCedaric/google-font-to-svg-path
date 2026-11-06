import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const content = `# ${siteConfig.name} — Full Technical & Specification Document

## Overview
${siteConfig.name} (${siteConfig.url}/) is an open-source web application designed for vector typography conversion. It bridges the gap between digital web fonts and vector-based physical/digital manufacturing workflows.

## Algorithmic Workflow
1. **Font Loading**:
   - Google Fonts: Fetches standard WOFF/TTF font files directly from Google Fonts CDN based on family and variant selection.
   - Custom Fonts: Reads user-uploaded \`ArrayBuffer\` from \`.ttf\`, \`.otf\`, or \`.woff\` files via \`opentype.parse(buffer)\`.
2. **Glyph Decomposition**:
   - For each character in the input string, OpenType.js decomposes the glyph into primitive outline commands (\`moveTo\`, \`lineTo\`, \`quadraticCurveTo\`, \`bezierCurveTo\`).
3. **Multi-Line Positioning & Kerning**:
   - Consecutive glyphs are spaced according to font metrics and kerning tables.
   - Newline characters trigger vertical translation based on \`font.size * lineHeight\`.
4. **CAD Model Construction (Maker.js)**:
   - Glyph outlines are translated into Maker.js models.
   - If \`union\` is enabled, boolean union algorithms (\`makerjs.model.combineUnion\`) compute the perimeter boundary of overlapping letterforms, removing internal line intersections.
5. **Path Output Generation**:
   - \`makerjs.exporter.toSVGPathData()\` generates the clean SVG path string.
   - \`makerjs.exporter.toDXF()\` creates the CAD-compliant drawing interchange file.

## Configuration Parameters
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| \`text\` | string | "Cedaric" | Target text string, supports multi-line |
| \`size\` | number | 100 | Target font size in units |
| \`lineHeight\` | number | 1.2 | Multiplier for line spacing |
| \`kerning\` | boolean | true | Whether to apply font metric kerning pairs |
| \`union\` | boolean | false | Merge overlapping vector paths into single outline |
| \`filled\` | boolean | false | Include fill color and rule in SVG output |
| \`separate\` | boolean | false | Place each character into distinct layers |
| \`bezierAccuracy\`| number | 0.25 | Curve subdivision tolerance for arc/spline segments |
| \`dxfUnits\` | string | "mm" | Target dimension unit for DXF CAD export |

## Comparison with Proprietary Alternatives
Unlike cloud-based converters, ${siteConfig.name} operates entirely within WebAssembly and JavaScript in the user's browser:
- Zero data transmission to third parties.
- Infinite file size limit bounded only by client memory.
- No sign-ups, subscriptions, or credit card requirements.

## Author & Attribution
- Original Maker.js integration: Dan Marshall (${siteConfig.links.upstream})
- UI/UX Redesign, Custom Font Engine & Modern Web Architecture: ${siteConfig.author.name} (${siteConfig.links.github})
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
