import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Reemplaza TODO el contenido de tu vite.config.js con esto
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})