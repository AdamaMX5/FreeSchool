// Thin Node static server: serves the built SPA (client/dist) with SPA fallback.
// No API endpoints — all data goes through the microservices (AuthService, ObjectService, …).
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(distDir));

// SPA fallback: any non-file route returns index.html so client-side routing works.
app.get("*", (_req, res) => {
  res.sendFile(join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`FreeSchool client served on :${port}`);
});
