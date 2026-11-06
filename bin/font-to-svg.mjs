#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { convertTextToSvg, listAvailableFonts } from '../lib/converter.mjs';

function printHelp() {
  console.log(`
FontSVG CLI — Convert text to clean vector SVG paths and CAD DXF drawings

Usage:
  font-to-svg --text <text> [options]
  echo "Hello" | font-to-svg [options]

Options:
  -t, --text <string>        Text to convert (supports multi-line with \\n)
  -f, --font <font>          Font name or local .ttf/.otf file path (default: Arial)
  -v, --variant <variant>    Font variant (e.g. regular, bold, italic)
  -s, --size <number>        Font size in units (default: 100)
  -l, --line-height <num>    Line height multiplier for multi-line text (default: 1.2)
  -u, --union                Merge overlapping letter outlines (recommended for cursive)
      --fill <color>         Enable fill with color (e.g. "#3b82f6" or "red")
      --stroke <color>       Stroke color (default: "#000000")
      --stroke-width <val>   Stroke width with units (default: "0.25mm")
      --no-kerning           Disable typographic kerning pairs
      --separate             Place each character into its own layer
      --bezier <acc>         Bezier approximation accuracy
      --dxf-units <unit>     DXF physical units ("mm", "cm", "m", "inch", "foot")
      --format <format>      Output format: "svg" (default), "path", "dxf", "json"
  -o, --out <file>           Output destination file (default: stdout)
      --list-fonts           Print all discovered local and cached fonts
  -h, --help                 Display this help information

Examples:
  # Generate full SVG file
  font-to-svg --text "Cedaric" --font "Arial" --union --out ./output.svg

  # Extract only SVG path data ("M ... Z")
  font-to-svg --text "Logo Text" --font "Georgia" --format path

  # Render multi-line text with custom colors
  font-to-svg -t "Line 1\\nLine 2" --fill "#2563eb" -o ./badge.svg

  # Generate CAD DXF for laser cutting
  font-to-svg --text "CUT ME" --font "Impact" --format dxf --dxf-units mm -o ./cut.dxf
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('--list-fonts')) {
    const fonts = listAvailableFonts();
    console.log(`Discovered ${fonts.length} fonts:\n`);
    fonts.forEach(f => console.log(`  - ${f}`));
    process.exit(0);
  }

  // Parse arguments
  let text = '';
  let font = 'Arial';
  let variant = 'regular';
  let size = 100;
  let lineHeight = 1.2;
  let union = false;
  let kerning = true;
  let filled = false;
  let fill = '#000000';
  let stroke = '#000000';
  let strokeWidth = '0.25mm';
  let separate = false;
  let bezierAccuracy;
  let dxfUnits = '';
  let format = 'svg';
  let outFile = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    if (arg === '-t' || arg === '--text') {
      text = next || '';
      i++;
    } else if (arg === '-f' || arg === '--font') {
      font = next || 'Arial';
      i++;
    } else if (arg === '-v' || arg === '--variant') {
      variant = next || 'regular';
      i++;
    } else if (arg === '-s' || arg === '--size') {
      size = parseFloat(next) || 100;
      i++;
    } else if (arg === '-l' || arg === '--line-height') {
      lineHeight = parseFloat(next) || 1.2;
      i++;
    } else if (arg === '-u' || arg === '--union') {
      union = true;
    } else if (arg === '--no-kerning') {
      kerning = false;
    } else if (arg === '--fill') {
      filled = true;
      fill = next || '#000000';
      i++;
    } else if (arg === '--stroke') {
      stroke = next || '#000000';
      i++;
    } else if (arg === '--stroke-width') {
      strokeWidth = next || '0.25mm';
      i++;
    } else if (arg === '--separate') {
      separate = true;
    } else if (arg === '--bezier') {
      bezierAccuracy = parseFloat(next) || undefined;
      i++;
    } else if (arg === '--dxf-units') {
      dxfUnits = next || '';
      i++;
    } else if (arg === '--format') {
      format = (next || 'svg').toLowerCase();
      i++;
    } else if (arg === '-o' || arg === '--out') {
      outFile = next || null;
      i++;
    }
  }

  // Handle stdin piping if text is not provided via flag
  if (!text && !process.stdin.isTTY) {
    text = fs.readFileSync(0, 'utf-8').trim();
  }

  if (!text) {
    text = 'Cedaric';
  }

  // Unescape literal \n
  text = text.replace(/\\n/g, '\n');

  try {
    const result = await convertTextToSvg({
      text,
      font,
      variant,
      size,
      lineHeight,
      union,
      kerning,
      filled,
      fill,
      stroke,
      strokeWidth,
      separate,
      bezierAccuracy,
      dxfUnits,
      format
    });

    let contentToOutput = '';

    if (format === 'json') {
      contentToOutput = JSON.stringify(result, null, 2);
    } else if (format === 'path') {
      contentToOutput = result.path;
    } else if (format === 'dxf') {
      contentToOutput = result.dxf;
    } else {
      contentToOutput = result.svg;
    }

    if (outFile) {
      const resolvedOut = path.resolve(process.cwd(), outFile);
      fs.mkdirSync(path.dirname(resolvedOut), { recursive: true });
      fs.writeFileSync(resolvedOut, contentToOutput, 'utf-8');
      console.error(`[FontSVG] Successfully wrote ${format.toUpperCase()} to ${outFile} (Font: ${result.font.family})`);
    } else {
      process.stdout.write(contentToOutput + (format === 'path' ? '\n' : ''));
    }

    if (result.warning) {
      console.error(`[FontSVG Warning] ${result.warning}`);
    }
  } catch (err) {
    console.error(`[FontSVG Error] ${err.message}`);
    process.exit(1);
  }
}

main();
