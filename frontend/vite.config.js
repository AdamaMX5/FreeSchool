import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default ({ mode }) => {
  // Lade Umgebungsvariablen aus Haupt-.env und frontend/.env
  const env = loadEnv(mode, process.cwd() + '/..', '')  // Gehe eine Ebene höher für root .env
  
  return defineConfig({
    plugins: [svelte()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components'
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}