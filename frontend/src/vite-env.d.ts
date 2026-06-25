/// <reference types="svelte" />
/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GIT_SERVICE_URL: string;
  readonly VITE_AUTH_BASE_URL: string;
  // weitere Variablen hier
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}