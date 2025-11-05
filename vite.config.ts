import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@lib': '/src/lib',
      '@theme': '/src/theme',
      '@routes': '/src/routes',
      '@services': '/src/services',
      '@store': '/src/store',
      '@types': '/src/types',
    },
  },
});
