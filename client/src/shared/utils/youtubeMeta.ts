// Fetch public YouTube video metadata client-side via the oEmbed endpoint. This
// endpoint is CORS-enabled and needs no API key, so it works straight from the
// browser. It only exposes the title and author — the description is NOT available
// here and would require the YouTube Data API v3 (key) or a server-side proxy.
// All failures (private video, network, rate limit) resolve to null so callers can
// fall back to manual input without breaking the flow.
import { youtubeId } from "./video";

export interface YoutubeMeta {
  title: string;
  author: string;
}

export async function fetchYoutubeMeta(
  value: string,
  signal?: AbortSignal
): Promise<YoutubeMeta | null> {
  const id = youtubeId(value);
  if (!id) return null;
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    watchUrl
  )}&format=json`;
  try {
    const res = await fetch(oembed, { signal });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!data || typeof data !== "object") return null;
    const { title, author_name } = data as Record<string, unknown>;
    if (typeof title !== "string" || !title) return null;
    return { title, author: typeof author_name === "string" ? author_name : "" };
  } catch {
    return null;
  }
}
