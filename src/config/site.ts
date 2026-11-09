export const siteConfig = {
  name: 'FontSVG',
  shortName: 'FontSVG',
  tagline: 'Google Font & Custom Font to SVG Path',
  title: 'FontSVG — Google Font & Custom Font to SVG Path / CAD DXF Converter',
  description:
    'Free online vector font converter. Convert 1,500+ Google Fonts or upload custom font files (TTF, OTF, WOFF) into clean vector SVG paths (<path d="...">) and CAD DXF outlines. Features script union welding, kerning, multi-line formatting, and 100% private in-browser processing.',
  keywords:
    'google font to svg, font to svg path, upload font to svg, custom font to svg, ttf to svg, otf to svg converter, woff to svg, convert font to vector, text to svg path, font to dxf, text to vector outline, font vectorizer, cnc font path, laser cutting text vector, cursive font union, svg path generator, font outline extractor',
  
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
