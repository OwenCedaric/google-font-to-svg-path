import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteConfig.url}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/zh/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/zh/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/zh/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/about/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/about/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/zh/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/about/" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/zh/about/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteConfig.url}/about/" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${siteConfig.url}/zh/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteConfig.url}/about/" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
