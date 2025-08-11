import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true
      }
    }
  }
})