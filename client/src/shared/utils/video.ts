// Convert a YouTube watch/short/embed URL — or a bare 11-char video id — to an
// embeddable URL, or null if it isn't recognisable. (The migrated youtube_id field
// can hold either a full URL or just the id.)
export function toYoutubeEmbed(value: string): string | null {
  const v = value.trim();
  if (/^[\w-]{11}$/.test(v)) return `https://www.youtube.com/embed/${v}`;
  const m = v.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

// Only allow http(s) or root-relative URLs (blocks javascript:, data: and
// protocol-relative //host URLs that would load a third-party origin).
export function isSafeUrl(url: string): boolean {
  return /^(https?:\/\/|\/(?!\/))/i.test(url);
}
