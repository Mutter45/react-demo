import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 在 outDir 中生成 manifest.json
    manifest: true,
    // rollupOptions: {
    //   // 覆盖默认的 .html 入口
    //   input: '/path/to/main.js'
    // }
  }
})
