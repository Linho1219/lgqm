// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lgqm.halu.lu',
  integrations: [sitemap()],
  // Static output by default in Astro - no server needed
  redirects: {
    '/archive': '/',
    '/catalog': '/',
  },
});
