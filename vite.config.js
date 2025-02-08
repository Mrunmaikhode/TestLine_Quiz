import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.jsonserve.com/Uw5CrX", // Your API endpoint
        changeOrigin: true,
        secure: false, // Set to false if the target server is using self-signed SSL
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  
})
