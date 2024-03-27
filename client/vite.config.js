import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'https://kalles-backend.onrender.com',
      // '/api/v1': 'http://localhost:5173',
    },
  },
})
