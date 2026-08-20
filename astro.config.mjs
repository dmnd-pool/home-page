// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output: the site is served from GitHub Pages, the same way dmnd.work is
// today. `site` feeds canonical URLs and the sitemap, so it must match the final
// domain rather than the *.github.io fallback.
export default defineConfig({
  site: 'https://www.dmnd.work',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
