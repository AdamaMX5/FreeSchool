import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// SPA build served by the thin Node static server (server/index.js).
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
