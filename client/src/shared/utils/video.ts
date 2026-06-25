// Convert a YouTube watch/short/embed URL to an embeddable URL, or null if it
// isn't a recognised YouTube link.
export function toYoutubeEmbed(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

// Only allow http(s) or root-relative URLs (blocks javascript:, data:, etc.).
export function isSafeUrl(url: string): boolean {
  return /^(https?:\/\/|\/)/i.test(url);
}
