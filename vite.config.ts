import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Opsi registerType: 'autoUpdate' akan otomatis refresh
      // 'prompt' akan memberi tombol pada user untuk update
      registerType: 'prompt', 
      
      // Mengaktifkan PWA di mode development (opsional, untuk testing)
      devOptions: {
        enabled: true
      },

      // Konfigurasi Web App Manifest
      manifest: {
        name: 'React PWA Tailwind App', // Nama lengkap aplikasi
        short_name: 'ReactPWA', // Nama pendek (untuk ikon homescreen)
        description: 'Aplikasi PWA saya dengan React dan Tailwind',
        theme_color: '#1a202c', // Sesuaikan dengan warna tema dark Anda
        background_color: '#1a202c',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png', // Path relatif terhadap folder public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            // Ikon 'maskable' penting untuk tampilan ikon adaptif di Android
            src: 'pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})