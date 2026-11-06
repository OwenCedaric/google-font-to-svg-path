export const siteConfig = {
  name: 'FontSVG',
  shortName: 'FontSVG',
  tagline: 'Google Font to SVG Path',
  title: 'Google Font to SVG Path & Custom Font Vectorizer | Free Online Tool',
  description:
    'Convert Google Fonts and custom fonts (TTF, OTF, WOFF) into clean SVG paths and CAD DXF outlines online for free. Features multi-line text, kerning, union path merging, and layer separation for CAD, CNC, and UI design.',
  keywords:
    'google font to svg, font to svg path, ttf to svg, otf to svg converter, font to dxf, text to vector outline, cnc font path, laser cutting text vector',
  
  // Production URL and Base Path
  url: 'https://fontsvg.ceda.is',
  base: '/',

  // Author & Attribution
  author: {
    name: 'Cedar',
    url: 'https://github.com/OwenCedaric',
  },

  // Project Links
  links: {
    github: 'https://github.com/OwenCedaric/google-font-to-svg-path',
    upstream: 'https://github.com/danmarshall/google-font-to-svg-path',
    googleFonts: 'https://fonts.google.com',
    sitemap: '/sitemap.xml',
    llms: '/llms.txt',
    llmsFull: '/llms-full.txt',
  },

  // Assets
  ogImage: '/og-image.png',
  themeColor: '#ffffff',
} as const;

export type SiteConfig = typeof siteConfig;
