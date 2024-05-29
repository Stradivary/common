import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import nodePolyfills from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {

      entry: resolve(__dirname, 'lib/index.mjs'), 
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [nodePolyfills({
        buffer: true,
        crypto: true,
      })],
      external: ['react', 'react/jsx-runtime', 'react-dom', 'react-router-dom', 'crypto', 'history'],
      // input: Object.fromEntries(
      //   glob.sync('lib/**/*.{js,jsx}', {
      //     ignore: ["lib/**/*.d.ts", 'lib/__fixtures__/**'],
      //   }).map(file => [
      //     // The name of the entry point
      //     relative(
      //       'lib',
      //       file.slice(0, file.length - extname(file).length)
      //     ),
      //     // The absolute path to the entry file
      //     fileURLToPath(new URL(file, import.meta.url))
      //   ])
      // ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
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
