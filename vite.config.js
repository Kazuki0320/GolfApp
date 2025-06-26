import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    // visualizer({
    //   open: true,
    //   filename: 'dist/stats.html',
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          '@import "vuetify/src/styles/styles.sass"',
        ]
      }
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