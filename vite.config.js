import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'

// Imagetools only reveals the transformed hero URLs after bundling, so inject their preloads here.
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
          if (!file) throw new Error(`hero-preload: no emitted asset matched ${pattern}`)
          return {
            tag: 'link',
            injectTo: 'head',
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

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), heroPreload()],
  server: { port: 5177 },
  preview: { port: 5177 },
})
