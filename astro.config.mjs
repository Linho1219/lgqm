// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Static output by default in Astro - no server needed
  redirects: {
    '/archive': '/',
    '/catalog': '/',
  },
});
