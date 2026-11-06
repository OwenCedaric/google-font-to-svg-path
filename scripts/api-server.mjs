#!/usr/bin/env node

import http from 'http';
import { URL } from 'url';
import { convertTextToSvg, listAvailableFonts } from '../lib/converter.mjs';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error(`Invalid JSON: ${err.message}`));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;

  try {
    // 1. Health check
    if (pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
      return;
    }

    // 2. List available local & cached fonts
    if (pathname === '/api/fonts' && req.method === 'GET') {
      const fonts = listAvailableFonts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ count: fonts.length, fonts }));
      return;
    }

    // 3. GET /api/svg — Direct image/svg+xml output
    if (pathname === '/api/svg' && req.method === 'GET') {
      const text = reqUrl.searchParams.get('text') || 'Cedaric';
      const font = reqUrl.searchParams.get('font') || 'Arial';
      const variant = reqUrl.searchParams.get('variant') || 'regular';
      const size = parseFloat(reqUrl.searchParams.get('size') || '100');
      const union = reqUrl.searchParams.get('union') === 'true' || reqUrl.searchParams.get('union') === '1';
      const fill = reqUrl.searchParams.get('fill');
      const stroke = reqUrl.searchParams.get('stroke') || '#000000';
      const strokeWidth = reqUrl.searchParams.get('strokeWidth') || reqUrl.searchParams.get('stroke_width') || '0.25mm';
      const lineHeight = parseFloat(reqUrl.searchParams.get('lineHeight') || '1.2');

      const result = await convertTextToSvg({
        text,
        font,
        variant,
        size,
        union,
        filled: !!fill,
        fill: fill || '#000000',
        stroke,
        strokeWidth,
        lineHeight,
        format: 'svg'
      });

      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      res.end(result.svg);
      return;
    }

    // 4. GET /api/path — JSON with path data and bounds
    if (pathname === '/api/path' && req.method === 'GET') {
      const text = reqUrl.searchParams.get('text') || 'Cedaric';
      const font = reqUrl.searchParams.get('font') || 'Arial';
      const size = parseFloat(reqUrl.searchParams.get('size') || '100');
      const union = reqUrl.searchParams.get('union') === 'true';

      const result = await convertTextToSvg({
        text,
        font,
        size,
        union,
        format: 'path'
      });

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        text,
        font: result.font,
        path: result.path,
        bounds: result.bounds,
        warning: result.warning
      }, null, 2));
      return;
    }

    // 5. POST /api/convert — Comprehensive conversion API
    if (pathname === '/api/convert' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const result = await convertTextToSvg(body);

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        success: true,
        ...result
      }, null, 2));
      return;
    }

    // 6. Root / or documentation
    if (pathname === '/' || pathname === '/docs' || pathname === '/api') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FontSVG API Server</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; background: #f8fafc; }
    h1 { color: #0f172a; margin-bottom: 8px; }
    .badge { display: inline-block; background: #3b82f6; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 13px; font-weight: 600; }
    pre { background: #1e293b; color: #f1f5f9; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
    code { font-family: ui-monospace, Menlo, Monaco, monospace; color: #0284c7; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; }
    pre code { background: none; color: inherit; padding: 0; }
    .endpoint { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .method { font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 13px; margin-right: 8px; }
    .get { background: #dcfce7; color: #166534; }
    .post { background: #e0e7ff; color: #3730a3; }
  </style>
</head>
<body>
  <span class="badge">FontSVG REST API</span>
  <h1>Font-to-SVG Vector API Server</h1>
  <p>Convert Google Fonts, local fonts, and text into clean vector SVG paths, SVG files, or CAD DXF outlines via HTTP.</p>

  <div class="endpoint">
    <h3><span class="method get">GET</span> <code>/api/svg</code></h3>
    <p>Renders text directly as an SVG image with <code>image/svg+xml</code> response.</p>
    <p><strong>Example:</strong> <a href="/api/svg?text=Cedaric&font=Arial&size=80&fill=%232563eb" target="_blank"><code>/api/svg?text=Cedaric&amp;font=Arial&amp;size=80&amp;fill=%232563eb</code></a></p>
  </div>

  <div class="endpoint">
    <h3><span class="method get">GET</span> <code>/api/path</code></h3>
    <p>Returns JSON containing raw SVG <code>d="..."</code> path data and bounding dimensions.</p>
    <p><strong>Example:</strong> <a href="/api/path?text=Cedaric&font=Arial" target="_blank"><code>/api/path?text=Cedaric&amp;font=Arial</code></a></p>
  </div>

  <div class="endpoint">
    <h3><span class="method post">POST</span> <code>/api/convert</code></h3>
    <p>Flexible JSON conversion supporting full parameter customization (multi-line, union, fill, stroke, separate, dxfUnits).</p>
    <pre><code>curl -X POST http://localhost:${PORT}/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Cedaric", "font": "Arial", "union": true, "fill": "#2563eb"}'</code></pre>
  </div>

  <div class="endpoint">
    <h3><span class="method get">GET</span> <code>/api/fonts</code></h3>
    <p>Lists all discovered local system fonts and cached Google Fonts.</p>
    <p><strong>Example:</strong> <a href="/api/fonts" target="_blank"><code>/api/fonts</code></a></p>
  </div>
</body>
</html>`);
      return;
    }

    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[FontSVG API] Server running at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`[FontSVG API] Live endpoints:`);
  console.log(`  - GET  http://localhost:${PORT}/api/svg?text=Cedaric`);
  console.log(`  - GET  http://localhost:${PORT}/api/path?text=Cedaric`);
  console.log(`  - POST http://localhost:${PORT}/api/convert`);
  console.log(`  - GET  http://localhost:${PORT}/api/fonts`);
});
