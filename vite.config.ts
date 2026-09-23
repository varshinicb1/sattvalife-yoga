import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // Inline small assets as base64 to save round trips on mobile
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate async chunks
        // so the initial JS mobile devices download is minimal
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-motion': ['framer-motion', 'lenis'],
        },
      },
    },
  },
});
