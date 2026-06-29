# FreeSchool

FreeSchool is a free online school that offers courses to anyone who wants to learn.
We offer courses in a wide range of topics, from computer programming to history to art.
Our goal is to make high-quality education accessible to everyone, regardless of their
background or financial situation.

---

## Architecture

The app is a **React single-page client** (`client/`) that talks **directly to the
microservices** — there is no FreeSchool-specific backend. Persistence, auth and media
are provided by:

| Service       | Base URL                          | Purpose                          |
|---------------|-----------------------------------|----------------------------------|
| AuthService   | `https://auth.freischule.info`    | Login, JWT, roles                |
| ObjectService | `https://object.freischule.info`  | Categories / lessons / contents  |
| MediaService  | `https://media.freischule.info`   | Images and videos                |
| GitService    | `https://git.freischule.info`     | Issue creation from the client   |

The built SPA is served by a thin Node/Express static server (`client/server/index.js`).

---

## Run the client (development)

```bash
cd client
cp .env.example .env   # adjust the VITE_*_BASE_URL values if needed
npm install
npm run dev            # Vite dev server on http://localhost:5173
```

Environment variables (see `client/.env.example`):

```
VITE_AUTH_BASE_URL=https://auth.freischule.info
VITE_OBJECT_BASE_URL=https://object.freischule.info
```

`VITE_MEDIA_BASE_URL` and `VITE_GIT_BASE_URL` can be overridden the same way; they
default to the production URLs above.

---

## Build & type-check

```bash
cd client
npm run build       # production build into client/dist
npm run typecheck   # tsc --noEmit
npm run preview     # preview the production build locally
```

---

## Deployment (Docker)

The client ships with its own multi-stage `Dockerfile` that builds the SPA and serves
it via the Express static server on port `3000`:

```bash
cd client
docker build -t freeschool-client .
docker run -p 3000:3000 freeschool-client
```

Put a reverse proxy (e.g. nginx) with TLS in front of port `3000`.
