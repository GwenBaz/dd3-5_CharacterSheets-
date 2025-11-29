import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Empêche Vite d'effacer l'écran, utile avec Tauri
  clearScreen: false,
  // Configuration pour le dev server de Tauri
  server: {
    port: 5173,
    strictPort: true,
  },
  // Variables d'env pour identifier l'environnement Tauri
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Cible pour les navigateurs supportés par Tauri
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // Ne pas minifier en dev pour un meilleur debug
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})