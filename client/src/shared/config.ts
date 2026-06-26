// The client talks directly to the microservices — no FreeSchool backend / no own API.
export const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL || "https://auth.freischule.info";
export const OBJECT_BASE_URL =
  import.meta.env.VITE_OBJECT_BASE_URL || "https://object.freischule.info";
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL || "https://media.freischule.info";
