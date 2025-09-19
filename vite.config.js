import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@board': resolve(__dirname, 'src/components/board'),
      '@layout': resolve(__dirname, 'src/components/layout'),
      '@context': resolve(__dirname, 'src/context'),
      '@pages': resolve(__dirname, 'src/pages'),
    },
  },
});
