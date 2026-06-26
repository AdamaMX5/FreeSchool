// MediaService client (https://media.freischule.info). Uploads images and returns a
// public, browser-usable URL. All three category-image paths (local file, drag&drop,
// internet link) funnel through uploadImageFile so the bytes always live in MediaService
// and the category only ever stores a MediaService link.
import { MEDIA_BASE_URL } from "../config";
import { authFetch } from "./authFetch";

const APP_NAME = "FreeSchool";
const CATEGORY_FOLDER = "categories";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB upload cap

interface MediaDoc {
  url?: string;
  [key: string]: unknown;
}

function assertImage(file: Blob): void {
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Nur Bilddateien werden unterstützt.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Bild ist zu groß (max. 10 MB).");
  }
}

/** Upload a binary image to MediaService; returns the public file URL. */
export async function uploadImageFile(file: File | Blob, name?: string): Promise<string> {
  assertImage(file);
  const form = new FormData();
  form.append("file", file, name ?? (file instanceof File ? file.name : "image"));
  form.append("app_name", APP_NAME);
  form.append("folder", CATEGORY_FOLDER);
  if (name) form.append("name", name);

  const res = await authFetch(`${MEDIA_BASE_URL}/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`MediaService ${res.status}`);
  const doc = (await res.json()) as MediaDoc;
  if (!doc.url) throw new Error("MediaService lieferte keine URL.");
  return doc.url;
}

/**
 * Fetch an image from an arbitrary internet URL and re-upload it to MediaService.
 * The category never references the external host directly — we mirror the bytes so
 * the link stays stable and same-origin to the rest of the media. May fail on hosts
 * that block cross-origin fetches (CORS); the caller surfaces that to the user.
 */
export async function uploadImageFromUrl(url: string): Promise<string> {
  if (!/^https?:\/\//i.test(url)) throw new Error("Bitte eine http(s)-Adresse angeben.");
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Bild konnte nicht geladen werden (CORS oder Netzwerk).");
  }
  if (!res.ok) throw new Error(`Bild-URL antwortete mit ${res.status}.`);
  // Reject oversized remote files before buffering the whole body, when the host
  // advertises a length (assertImage still re-checks the actual blob below).
  const declared = Number(res.headers.get("content-length"));
  if (declared > MAX_BYTES) throw new Error("Bild ist zu groß (max. 10 MB).");
  const blob = await res.blob();
  const name = url.split("/").pop()?.split("?")[0] || "image";
  return uploadImageFile(blob, name);
}
