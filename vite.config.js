import { defineConfig } from 'vite';
import path from 'path';
// import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    // compression()
  ], // Removed react() plugin
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), // Updated entry point
      name: 'WorkleisureIconLibrary',
      fileName: (format) => `workleisure-icon-library.${format}.js`,
    },
    rollupOptions: {
      // Removed react, react-dom, and react/jsx-dev-runtime from external and globals
      external: [],
      output: {
        globals: {},
      },
    },
  },
});