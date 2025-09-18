import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@board': path.resolve(__dirname, 'src/components/board'),
      '@layout': path.resolve(__dirname, 'src/components/layout'),
      '@context': path.resolve(__dirname, 'src/context'),
    },
  },
});
