const { defineConfig } = require('vite')
const { createVuePlugin } = require('vite-plugin-vue2')
const path = require('path')
const { visualizer } = require('rollup-plugin-visualizer')

module.exports = defineConfig({
  plugins: [
    createVuePlugin(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vuetify'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          mdi: ['@mdi/js']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@mdi/js'],
    exclude: ['firebase/app', 'firebase/auth', 'firebase/firestore']
  }
}) 