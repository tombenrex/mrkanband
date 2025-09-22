import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/mrkanband/' : '/',
  server: {
    open: '/',
  },

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@ui': resolve(__dirname, 'src/components/ui'),
      '@layout': resolve(__dirname, 'src/components/layout'),
      '@modal': resolve(__dirname, 'src/components/modal'),
      '@context': resolve(__dirname, 'src/context'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@store': resolve(__dirname, 'src/store'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@sections': resolve(__dirname, 'src/components/sections'),
    },
  },
}));
