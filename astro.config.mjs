// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ashorepainting.com',
  output: 'static',
  integrations: [
    sanity({
      projectId: 'h85qpyij',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2025-01-28',
      // Studio hosted separately via `npx sanity deploy` (free)
      // or access at sanity.io/manage. Cannot embed in static builds.
    }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/privacy-policy'),
    }),
  ],
  image: {
    domains: ['cdn.sanity.io'],
  },
});
