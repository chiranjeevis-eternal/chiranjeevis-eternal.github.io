import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets load correctly on GitHub Pages sub-paths
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Keeps assets separate for easier debugging
  }
});
