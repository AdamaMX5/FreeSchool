// Extract the 11-char YouTube video id from a watch/short/embed URL — or from a
// bare id — or null if it isn't recognisable. (The migrated youtube_id field can
// hold either a full URL or just the id.)
export function youtubeId(value: string): string | null {
  const v = value.trim();
  if (/^[\w-]{11}$/.test(v)) return v;
  const m = v.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
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
