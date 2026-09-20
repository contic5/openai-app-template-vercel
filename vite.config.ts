import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
   build: {
    outDir: 'dist' // Optional — only if you want `build` instead of `dist`
  },
  plugins: [react()],
})
