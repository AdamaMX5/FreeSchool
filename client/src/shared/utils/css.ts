import { DEFAULT_CATEGORY_BG } from "../config";

// Build a CSS background-image url() value safely from a (migrated) link.
// Only allow http(s) URLs and percent-encode characters that could otherwise
// break out of url("...") (quotes, parens, backslash, whitespace) -> no CSS injection.
export function cssBackgroundImage(link: string): string | undefined {
  if (!link || !/^https?:\/\//i.test(link)) return undefined;
  const safe = link.replace(/["'()\\\s]/g, (c) => encodeURIComponent(c));
  return `url("${safe}")`;
}

// Resolve a category's background, falling back to the configured global default
// (DEFAULT_CATEGORY_BG) when the category has no own background_link. Use this for
// rendering category surfaces; the raw cssBackgroundImage stays for the edit
// preview, which must reflect only the staged link (no default leaking in).
export function categoryBackgroundImage(link: string): string | undefined {
  return cssBackgroundImage(link || DEFAULT_CATEGORY_BG);
}

// Resolve a category's background to a plain URL for an <img src> (same default
// fallback as categoryBackgroundImage, but for the canvas which needs the natural
// image dimensions via the loaded <img>, not a CSS background). Only http(s) links
// are accepted — mirrors cssBackgroundImage's whitelist so a non-http link (data:,
// relative, …) can never be loaded; everything else falls back to the default.
export function categoryBackgroundSrc(link: string): string {
  return /^https?:\/\//i.test(link) ? link : DEFAULT_CATEGORY_BG;
}
