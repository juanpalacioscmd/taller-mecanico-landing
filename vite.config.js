import { defineConfig } from 'vite'

export default defineConfig({
  // Configuración optimizada para producción
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  
  // Configuración para desarrollo
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Optimización de assets
  assetsInclude: ['**/*.webp', '**/*.jpg', '**/*.png', '**/*.svg'],
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
})