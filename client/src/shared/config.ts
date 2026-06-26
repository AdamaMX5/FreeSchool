// The client talks directly to the microservices — no FreeSchool backend / no own API.
export const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL || "https://auth.freischule.info";
export const OBJECT_BASE_URL =
  import.meta.env.VITE_OBJECT_BASE_URL || "https://object.freischule.info";
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL || "https://media.freischule.info";
export const GIT_BASE_URL =
  import.meta.env.VITE_GIT_BASE_URL || "https://git.freischule.info";

// Fallback background for categories that have no own background_link. Upload an
// image once via the category edit dialog (it lands in MediaService), then paste
// the returned public URL here — or set VITE_DEFAULT_CATEGORY_BG. Empty = no
// fallback (categories without a background render plain, as before).
export const DEFAULT_CATEGORY_BG =
  import.meta.env.VITE_DEFAULT_CATEGORY_BG ||
  "https://media.freischule.info/files/FreeSchool/categories/4103671f-2d27-4e2a-83a9-64be951875c7.jpg";
