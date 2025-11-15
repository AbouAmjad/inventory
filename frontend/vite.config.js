import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  // Add this to handle module type correctly
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
