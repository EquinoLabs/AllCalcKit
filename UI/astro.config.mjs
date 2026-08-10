// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    // Prevent the Cloudflare adapter's wrangler run-time state (written on every
    // request) from triggering infinite Vite program reloads during `astro dev`.
    server: {
      watch: {
        ignored: ['**/.wrangler/**', '**/.astro/**', '**/dist/**'],
      },
    },
  },
});