#!/usr/bin/env node

/**
 * Skill Helper Script: Generates vector SVG from font & text.
 * Can be directly invoked by Antigravity AI agents or CLI commands.
 */

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.resolve(__dirname, '../../../../bin/font-to-svg.mjs');

await import(pathToFileURL(cliPath).href);
