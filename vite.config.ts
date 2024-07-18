import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills(),VitePWA({ registerType: "autoUpdate" })],
  define: {
    'process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE': '1000000',
    'process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS': '1000000',
  },
})
