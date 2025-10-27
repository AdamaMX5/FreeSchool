import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default ({ mode }) => {
  // Lade Umgebungsvariablen aus Haupt-.env
  const env = loadEnv(mode, process.cwd() + '/..')  // Gehe eine Ebene höher für root .env
  
  return defineConfig({
    plugins: [svelte()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components'
      }
    },
    server: {
      host: '0.0.0.0'
    }
  })
}