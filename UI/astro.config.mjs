// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { generateSW } from 'workbox-build';
import { fileURLToPath } from 'node:url';

/** @returns {import('astro').AstroIntegration} */
function customPwaIntegration() {
  return {
    name: 'allcalckit-pwa',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              VitePWA({
                registerType: 'autoUpdate',
                injectRegister: null,
                manifest: false,
                workbox: {
                  globPatterns: []
                }
              })
            ]
          }
        });
      },
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        console.log(`[pwa] Generating service worker in ${outDir}...`);
        const { count, size } = await generateSW({
          globDirectory: outDir,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2,json,txt}'],
          swDest: `${outDir}/sw.js`,
          navigateFallback: null,
          navigateFallbackDenylist: [/^\/api/],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /.*(?:googletagmanager|google-analytics|pagead2\.googlesyndication|adservice\.google)\.com\/.*/i,
              handler: 'NetworkOnly',
            }
          ]
        });
        console.log(`[pwa] ✨ Precache build successfully: ${count} entries (${Math.round(size / 1024)} KiB)`);
      }
    }
  };
}

export default defineConfig({
  integrations: [
    customPwaIntegration()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});