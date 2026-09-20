import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/openai-app-template/', // match your repo name exactly
   build: {
    outDir: 'dist' // Optional — only if you want `build` instead of `dist`
  },
  plugins: [react()],
})
