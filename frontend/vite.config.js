import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { execSync } from 'child_process'

function getGitVersion() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim()
    const date = execSync('git log -1 --format=%cd --date=format:%Y-%m-%d').toString().trim()
    return `${date} (${hash})`
  } catch {
    return 'unknown'
  }
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd() + '/..', '')
  const version = getGitVersion()

  return defineConfig({
    plugins: [svelte()],
    define: {
      __APP_VERSION__: JSON.stringify(version)
    },
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