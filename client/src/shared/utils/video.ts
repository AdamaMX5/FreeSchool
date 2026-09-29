// Extract the 11-char YouTube video id from a watch/short/embed URL — or from a
// bare id (optionally still carrying a share-link tracking suffix, e.g.
// "s7CJ35FLLsI?si=...", which YouTube's own "Share" button appends even to a
// copied plain id) — or null if it isn't recognisable. (The migrated youtube_id
// field can hold either a full URL or just the id.)
export function youtubeId(value: string): string | null {
  const v = value.trim();
  const bare = v.match(/^([\w-]{11})(?:[?&]\S*)?$/);
  if (bare) return bare[1];
  const m = v.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

// Normalizes a value destined for storage in youtube_id: the bare id when one can
// be extracted, otherwise the trimmed input unchanged (e.g. a non-YouTube video
// link, kept as-is so VideoEmbed's safe-link fallback still works for it).
export function normalizeYoutubeValue(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return youtubeId(trimmed) ?? trimmed;
}

// Convert a YouTube watch/short/embed URL — or a bare 11-char video id — to an
// embeddable URL, or null if it isn't recognisable.
export function toYoutubeEmbed(value: string): string | null {
  const id = youtubeId(value);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

// Only allow http(s) or root-relative URLs (blocks javascript:, data: and
// protocol-relative //host URLs that would load a third-party origin).
export function isSafeUrl(url: string): boolean {
  return /^(https?:\/\/|\/(?!\/))/i.test(url);
}
