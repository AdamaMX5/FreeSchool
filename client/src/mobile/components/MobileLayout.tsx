import type { ReactNode } from "react";
import LoginSheet from "./LoginMenu";
import ChatBubblesIcon from "../../shared/components/ChatBubblesIcon";
import DiscussionForumOverlay from "../../shared/components/DiscussionForumOverlay";
import { useForumOverlay } from "../../shared/hooks/useForumOverlay";

export default function MobileLayout({ children }: { children: ReactNode }) {
  const forum = useForumOverlay();

  return (
    <div className="min-h-full bg-neutral-900 text-neutral-100">
      <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4">
        <span className="text-base font-semibold">FreeSchool</span>
        <div className="flex items-center gap-2">
          <button
            onClick={forum.open}
            title="Diskussionsforum"
            aria-label="Diskussionsforum öffnen"
            className="rounded px-1.5 py-1 hover:bg-neutral-700"
          >
            <ChatBubblesIcon />
          </button>
          <LoginSheet />
        </div>
      </header>

      {forum.isOpen ? (
        <DiscussionForumOverlay onClose={forum.close} topClassName="top-12" />
      ) : (
        <main className="px-3 pb-6 pt-16">{children}</main>
      )}
    </div>
  );
}
