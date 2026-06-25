// Build a CSS background-image url() value safely from a (migrated) link.
// Only allow http(s) URLs and percent-encode characters that could otherwise
// break out of url("...") (quotes, parens, backslash, whitespace) -> no CSS injection.
export function cssBackgroundImage(link: string): string | undefined {
  if (!link || !/^https?:\/\//i.test(link)) return undefined;
  const safe = link.replace(/["'()\\\s]/g, (c) => encodeURIComponent(c));
  return `url("${safe}")`;
}
