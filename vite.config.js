import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/GameOfLife/', // Ensures correct asset paths when deployed on GitHub Pages
  plugins: [react()],
  server: {
    port: 3000, // You can change this if needed
  },
  build: {
    outDir: 'dist', // Default output directory
    sourcemap: true, // Useful for debugging production errors
  }
});
