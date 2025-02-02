import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/m7mdselim.github.io/', // This should match your GitHub Pages URL
});
