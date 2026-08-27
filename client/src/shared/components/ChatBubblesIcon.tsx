// Two overlapping speech bubbles — used on the header button that opens the
// site-wide discussion forum (distinct from the 💬 emoji used for the
// per-lesson pro/contra discussion).
export default function ChatBubblesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="9" y="3" width="12" height="8.5" rx="2.5" />
      <path d="M13 11.5v3l3.3-3" />
      <rect x="3" y="9.5" width="12" height="8.5" rx="2.5" />
      <path d="M7 18v3l3.3-3" />
    </svg>
  );
}
