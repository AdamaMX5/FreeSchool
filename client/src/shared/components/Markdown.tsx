import { marked } from "marked";
import DOMPurify from "dompurify";

// Render moderator-authored Markdown. marked -> HTML -> DOMPurify sanitise removes
// any XSS payload before it reaches the DOM.
export default function Markdown({ text }: { text: string }) {
  const rawHtml = marked.parse(text, { async: false }) as string;
  const clean = DOMPurify.sanitize(rawHtml);
  return (
    <div
      className="markdown leading-relaxed [&_a]:text-sky-400 [&_a]:underline [&_h1]:mb-2 [&_h1]:text-xl [&_h2]:mb-2 [&_h2]:text-lg [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
