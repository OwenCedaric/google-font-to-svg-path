import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { POPULAR_FONTS } from '../data/fontsData';
import { USE_CASES } from '../data/useCasesData';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = siteConfig.url;

  const toolSlugs = Object.keys(USE_CASES);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Specialized Tool Workflows
  for (const slug of toolSlugs) {
    const enUrl = `${baseUrl}/tools/${slug}/`;
    const zhUrl = `${baseUrl}/zh/tools/${slug}/`;
    xml += `  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${zhUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }

  // Popular Font Detail Pages (pSEO)
  for (const font of POPULAR_FONTS) {
    const enUrl = `${baseUrl}/fonts/${font.slug}/`;
    const zhUrl = `${baseUrl}/zh/fonts/${font.slug}/`;
    xml += `  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${zhUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // Font Directory Index Pages
  xml += `  <url>
    <loc>${baseUrl}/fonts/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/fonts/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/fonts/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/fonts/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/fonts/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/fonts/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/fonts/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/fonts/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;

  // Documentation / About Pages
  xml += `  <url>
    <loc>${baseUrl}/about/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/about/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/about/" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/zh/about/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/about/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/zh/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/about/" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
