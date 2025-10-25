import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../wwwroot/js'),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'], // build ra ES module
      fileName: () => 'assets/main.js'
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/style.css'
      }
    }
  },
  plugins: [tailwindcss()]
});