export const siteConfig = {
  name: 'FontSVG',
  shortName: 'FontSVG',
  tagline: 'Google Font to SVG Path & CAD DXF Converter',
  title: 'Google Font to SVG Path Converter — Free Online Tool | FontSVG',
  description:
    'Convert Google Fonts and custom fonts (TTF, OTF, WOFF) to clean vector SVG paths (<path d="...">) and CAD DXF outlines for free. 100% private in-browser.',
  keywords:
    'google font to svg path, google font svg path, google font to svg, google fonts to svg, google fonts to svg path, font to svg path, font to svg, upload font to svg, custom font to svg, ttf to svg, otf to svg converter, woff to svg, convert font to vector, text to svg path, font to dxf, laser cutting text vector, cursive font union, svg path generator, font outline extractor, cjk font to svg',
  
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
