import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'

/**
 * Injects the hero artwork's `<link rel="preload">`.
 *
 * The font preloads sitting in index.html need no help: Vite resolves a plain
 * href and rewrites it to the hashed file it emits. The hero cannot be written
 * the same way, because its href has to pass through `imagetools` to become an
 * AVIF and `imagetools` only hooks the module pipeline, not HTML asset
 * references -- Vite would copy the PNG across, leave the query string on it, and
 * preload 216KB of the wrong format. So the URL is read back out of the bundle
 * once it has been emitted.
 *
 * It is worth the twenty lines: the page renders from JS into an empty #root, so
 * the browser cannot discover the hero <img> until the bundle has downloaded,
 * parsed and run. The preload starts that fetch alongside the bundle instead of
 * behind it.
 *
 * `-mobile` is excluded from the desktop pattern explicitly -- a content hash can
 * contain letters and hyphens, so a bare `art-hero-warehouse-<hash>.avif` would
 * match the mobile crop too.
 */
function heroPreload() {
  const CROPS = [
    { pattern: /art-hero-warehouse-(?!mobile-)[\w-]+\.avif$/, media: '(min-width: 1024px)' },
    { pattern: /art-hero-warehouse-mobile-[\w-]+\.avif$/, media: '(max-width: 1023.98px)' },
  ]
  let base = '/'

  return {
    name: 'dmnd-hero-preload',
    apply: 'build',
    configResolved: (config) => void (base = config.base ?? '/'),
    transformIndexHtml: {
      order: 'post',
      handler: (_html, ctx) =>
        CROPS.map(({ pattern, media }) => {
          const file = Object.keys(ctx.bundle ?? {}).find((name) => pattern.test(name))
          // Loud on purpose. The font preloads this sits next to shipped for
          // months with no href at all, doing nothing and saying nothing.
          if (!file) throw new Error(`hero-preload: no emitted asset matched ${pattern}`)
          return {
            tag: 'link',
            injectTo: 'head',
            // Typed as AVIF so a browser without it skips the link and takes the
            // WebP or PNG <source>; `media` mirrors the <picture> in Art.jsx, so
            // exactly one of the two crops is ever fetched.
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/avif',
              href: base + file,
              media,
              fetchpriority: 'high',
            },
          }
        }),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // `imagetools` runs sharp behind the `?format=avif` style import queries used in
  // src/lib/art.js. Without it every picture on the page would ship at source
  // resolution as PNG or JPEG -- about 2.4MB rather than 700KB.
  plugins: [react(), tailwindcss(), imagetools(), heroPreload()],
  server: { port: 5177 },
  preview: { port: 5177 },
})
