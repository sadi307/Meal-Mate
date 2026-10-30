import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend only — there is no API server to proxy to.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true, // lets you open the site from your phone on the same wifi
  },
  build: { outDir: 'dist', sourcemap: false },
})
