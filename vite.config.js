import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: 'commonHelpers.js',
      },
    },
    outDir: 'dist',
  },
  plugins: [injectHTML(), FullReload(['./*.html'])],
}));
