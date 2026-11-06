export interface ConvertTextOptions {
  /** Text to render, supports multi-line with \n */
  text: string;
  /** Font family name, system font name, or path to local .ttf / .otf / .woff file */
  font?: string;
  /** Font variant (e.g. 'regular', 'bold', '700', 'italic') */
  variant?: string;
  /** Font size in units (default: 100) */
  size?: number;
  /** Line height multiplier for multi-line text (default: 1.2) */
  lineHeight?: number;
  /** Whether to perform boolean union on overlapping glyphs (default: false, recommended true for script/cursive fonts) */
  union?: boolean;
  /** Whether to enable font kerning metrics (default: true) */
  kerning?: boolean;
  /** Whether to fill the glyph shapes (default: false) */
  filled?: boolean;
  /** Fill color hex/rgba (default: '#000000') */
  fill?: string;
  /** Stroke color hex/rgba (default: '#000000') */
  stroke?: string;
  /** Stroke width with units (default: '0.25mm') */
  strokeWidth?: string | number;
  /** Whether stroke width should remain constant regardless of scaling (default: true) */
  strokeNonScaling?: boolean;
  /** Fill rule: 'evenodd' | 'nonzero' (default: 'evenodd') */
  fillRule?: 'evenodd' | 'nonzero';
  /** Put each character into a distinct layer in DXF / SVG (default: false) */
  separate?: boolean;
  /** Bezier approximation tolerance accuracy */
  bezierAccuracy?: number | string;
  /** Target DXF unit ('mm', 'cm', 'm', 'inch', 'foot') */
  dxfUnits?: string;
  /** Primary output format ('svg' | 'path' | 'dxf' | 'all') */
  format?: 'svg' | 'path' | 'dxf' | 'all';
}

export interface ConvertBounds {
  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface ConvertResult {
  /** Complete <svg ...> XML string */
  svg: string;
  /** Raw SVG path data ('d' attribute string, e.g. "M ... Z") */
  path: string;
  /** CAD DXF interchange content */
  dxf: string;
  /** Calculated dimensional bounds of the vector model */
  bounds: ConvertBounds;
  /** Primary output according to requested format */
  output: string;
  /** Information about the resolved font */
  font: {
    family: string;
    source: string;
    path?: string;
  };
  /** Optional warning message if font fell back or encountered non-critical issues */
  warning?: string;
}

export function convertTextToSvg(options?: ConvertTextOptions): Promise<ConvertResult>;
export function resolveFont(fontInput?: string, variant?: string): Promise<any>;
export function findLocalFont(name?: string): string | null;
export function listAvailableFonts(): string[];
