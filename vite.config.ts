import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'Logo KEVA_Horiz.png', 'resume.pdf'],
      manifest: {
        name: 'KevaINITIATIVE',
        short_name: 'Keva',
        description: 'Promouvoir le Gabon Vert et la biodiversité.',
        theme_color: '#0f291e',
        icons: [
          {
            src: 'favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
  },
});
