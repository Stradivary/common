import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import nodePolyfills from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {
      
      entry: resolve(__dirname, 'lib/index.mjs'),
      name: 'CommonLib',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      plugins: [nodePolyfills({
        buffer: true,
        crypto: true,
      })],
      external: ['react', 'react-dom', 'react-router-dom', 'crypto', 'history'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          history: 'history',
          crypto: 'crypto',
        },
      },
    },
  },
});
