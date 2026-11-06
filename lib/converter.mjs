import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';
// @ts-ignore
import makerjs from 'makerjs';

const GOOGLE_FONTS_API_KEY = 'AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc';
const CACHE_DIR = path.resolve(process.cwd(), '.cache/fonts');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  } catch (_) {}
}

const SYSTEM_FONT_DIRS = [
  path.resolve(process.cwd(), 'fonts'),
  CACHE_DIR,
  '/System/Library/Fonts/Supplemental',
  '/System/Library/Fonts',
  '/Library/Fonts',
  path.join(process.env.HOME || '', 'Library/Fonts'),
  '/usr/share/fonts',
  '/usr/local/share/fonts',
  path.join(process.env.HOME || '', '.fonts'),
  path.join(process.env.HOME || '', '.local/share/fonts'),
  'C:\\Windows\\Fonts'
];

/**
 * Searches system and local directories for a matching font file (.ttf / .otf)
 */
export function findLocalFont(name) {
  if (!name) return null;
  
  // Direct file path
  if (fs.existsSync(name)) {
    return path.resolve(name);
  }

  const normalizedTarget = name.toLowerCase().replace(/[\s_-]+/g, '');
  let partialMatch = null;

  for (const dir of SYSTEM_FONT_DIRS) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ext !== '.ttf' && ext !== '.otf') continue;

        const base = path.basename(file, ext).toLowerCase().replace(/[\s_-]+/g, '');
        if (base === normalizedTarget) {
          return path.join(dir, file);
        }
        if (!partialMatch && (base.startsWith(normalizedTarget) || base.includes(normalizedTarget))) {
          partialMatch = path.join(dir, file);
        }
      }
    } catch (_) {}
  }

  return partialMatch;
}

/**
 * Resolves an opentype.Font instance from a name, file path, or Google Font identifier.
 */
export async function resolveFont(fontInput = 'Arial', variant = 'regular') {
  let warning;

  // 1. If it's already an opentype font object
  if (typeof fontInput === 'object' && fontInput && fontInput.tables) {
    return { font: fontInput, source: 'object', family: fontInput.names?.fontFamily?.en || 'Custom' };
  }

  // 2. Local file path or system font match
  const localPath = findLocalFont(fontInput);
  if (localPath) {
    try {
      const font = opentype.loadSync(localPath);
      return {
        font,
        source: 'local',
        path: localPath,
        family: font.names?.fontFamily?.en || path.basename(localPath)
      };
    } catch (e) {
      warning = `Failed to load local font from ${localPath}: ${e.message}`;
    }
  }

  // 3. Cached Google Font file
  const cachedFile = path.join(CACHE_DIR, `${fontInput.toLowerCase().replace(/[\s_-]+/g, '')}-${variant}.ttf`);
  if (fs.existsSync(cachedFile)) {
    try {
      const font = opentype.loadSync(cachedFile);
      return {
        font,
        source: 'cache',
        path: cachedFile,
        family: font.names?.fontFamily?.en || fontInput
      };
    } catch (_) {}
  }

  // 4. Try Google Fonts API download (if network is available)
  try {
    const listRes = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`, {
      signal: AbortSignal.timeout(4000)
    });
    if (listRes.ok) {
      const data = await listRes.json();
      const fontItem = data.items?.find(
        (f) => f.family.toLowerCase() === fontInput.toLowerCase()
      );
      if (fontItem) {
        const fileUrl = (fontItem.files[variant] || Object.values(fontItem.files)[0])?.replace('http:', 'https:');
        if (fileUrl) {
          const fontRes = await fetch(fileUrl, { signal: AbortSignal.timeout(6000) });
          if (fontRes.ok) {
            const buffer = Buffer.from(await fontRes.arrayBuffer());
            const font = opentype.parse(buffer.buffer);
            try {
              fs.writeFileSync(cachedFile, buffer);
            } catch (_) {}
            return {
              font,
              source: 'google_fonts',
              family: font.names?.fontFamily?.en || fontItem.family
            };
          }
        }
      }
    }
  } catch (err) {
    // Network / fetch unavailable or offline
  }

  // 5. Fallback font: search for standard fallback
  const fallbacks = ['Arial', 'Helvetica', 'Geneva', 'DejaVuSans', 'LiberationSans'];
  for (const fb of fallbacks) {
    const fbPath = findLocalFont(fb);
    if (fbPath) {
      try {
        const font = opentype.loadSync(fbPath);
        return {
          font,
          source: 'fallback',
          path: fbPath,
          family: font.names?.fontFamily?.en || fb,
          warning: warning || `Font "${fontInput}" could not be resolved. Falling back to system font "${font.names?.fontFamily?.en || fb}".`
        };
      } catch (_) {}
    }
  }

  throw new Error(`Unable to resolve font "${fontInput}" and no system fallback font could be loaded.`);
}

/**
 * Core conversion function: transforms text to SVG paths, complete SVG XML, or DXF outlines.
 */
export async function convertTextToSvg(options = {}) {
  const {
    text = 'Cedaric',
    font: fontInput = 'Arial',
    variant = 'regular',
    size = 100,
    lineHeight = 1.2,
    union = false,
    kerning = true,
    filled = false,
    fill = '#000000',
    stroke = '#000000',
    strokeWidth = '0.25mm',
    strokeNonScaling = true,
    fillRule = 'evenodd',
    separate = false,
    bezierAccuracy,
    dxfUnits = '',
    format = 'svg' // 'svg' | 'path' | 'dxf' | 'all'
  } = options;

  const fontResolution = await resolveFont(fontInput, variant);
  const font = fontResolution.font;

  const lines = String(text).split('\n');
  const containerModel = { models: {} };

  lines.forEach((line, lineIndex) => {
    if (line.length === 0) return;

    const accuracy = typeof bezierAccuracy === 'number' ? bezierAccuracy : (parseFloat(bezierAccuracy) || undefined);
    const lineModel = new makerjs.models.Text(font, line, size, union, false, accuracy, { kerning });
    const yOffset = -lineIndex * size * lineHeight;

    makerjs.model.move(lineModel, [0, yOffset]);
    containerModel.models[`line_${lineIndex}`] = lineModel;
  });

  if (separate) {
    let charIndex = 0;
    for (const lineKey in containerModel.models) {
      const lineModel = containerModel.models[lineKey];
      for (const charKey in lineModel.models) {
        lineModel.models[charKey].layer = String(charIndex);
        charIndex++;
      }
    }
  }

  // Calculate model extents
  const extents = makerjs.measure.modelExtents(containerModel) || {
    width: 0,
    height: 0,
    low: [0, 0],
    high: [0, 0]
  };

  const svgXml = makerjs.exporter.toSVG(containerModel, {
    fill: filled ? fill : undefined,
    stroke: stroke ? stroke : undefined,
    strokeWidth: strokeWidth ? strokeWidth : undefined,
    fillRule: fillRule ? fillRule : undefined,
    scalingStroke: !strokeNonScaling
  });

  const pathData = makerjs.exporter.toSVGPathData(containerModel) || '';

  const dxfContent = makerjs.exporter.toDXF(containerModel, {
    units: dxfUnits || undefined,
    usePOLYLINE: true
  });

  const result = {
    svg: svgXml,
    path: pathData,
    dxf: dxfContent,
    bounds: {
      width: Math.round(extents.width * 1000) / 1000,
      height: Math.round(extents.height * 1000) / 1000,
      minX: Math.round(extents.low[0] * 1000) / 1000,
      minY: Math.round(extents.low[1] * 1000) / 1000,
      maxX: Math.round(extents.high[0] * 1000) / 1000,
      maxY: Math.round(extents.high[1] * 1000) / 1000,
    },
    font: {
      family: fontResolution.family,
      source: fontResolution.source,
      path: fontResolution.path
    },
    warning: fontResolution.warning
  };

  if (format === 'path') {
    return { ...result, output: pathData };
  } else if (format === 'dxf') {
    return { ...result, output: dxfContent };
  }

  return { ...result, output: svgXml };
}

/**
 * Returns a list of commonly available system and cached fonts.
 */
export function listAvailableFonts() {
  const fonts = new Set();

  for (const dir of SYSTEM_FONT_DIRS) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.ttf' || ext === '.otf') {
          fonts.add(path.basename(file, ext));
        }
      }
    } catch (_) {}
  }

  return Array.from(fonts).sort();
}
