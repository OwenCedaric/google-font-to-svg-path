import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { siteConfig } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: siteConfig.url,
  base: siteConfig.base,
  vite: {
    build: {
      minify: true
    }
  }
});
