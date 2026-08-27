// Full-window site-wide discussion forum (ForumService), opened from the header
// chat-bubbles button. Reuses the FreeSchool login session instead of letting
// ForumThread run its own standalone login/refresh flow, so the two never race
// AuthService's rotating refresh token (see ForumService/ForumService.md,
// "externalAuth").
import { ForumThread } from "@forumservice/frontend";
import "@forumservice/frontend/style.css";
import { useAuth } from "../context/AuthContext";
import { applyToken, refresh } from "../services/authApi";
import { FORUM_BASE_URL, FORUM_ROOT_NODE_ID } from "../config";

interface Props {
  onClose: () => void;
  /** Tailwind `top-*` class matching the host header's height (default: desktop's h-14). */
  topClassName?: string;
}

async function onNeedRefresh(): Promise<string> {
  const token = await refresh();
  if (!token) throw new Error("Sitzung abgelaufen");
  applyToken(token);
  return token;
}

export default function DiscussionForumOverlay({ onClose, topClassName = "top-14" }: Props) {
  const { user } = useAuth();

  return (
    <div className={`fixed inset-x-0 bottom-0 ${topClassName} z-40 overflow-y-auto bg-white dark:bg-neutral-900`}>
      <div className="sticky top-0 z-10 flex justify-end bg-white/90 px-3 py-2 backdrop-blur dark:bg-neutral-900/90">
        <button
          onClick={onClose}
          title="Schließen"
          aria-label="Diskussionsforum schließen"
          className="rounded-full bg-neutral-800 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-neutral-700"
        >
          ✕
        </button>
      </div>

      {FORUM_ROOT_NODE_ID ? (
        <ForumThread
          nodeId={FORUM_ROOT_NODE_ID}
          forumApiBaseUrl={FORUM_BASE_URL}
          externalAuth={{ accessToken: user.accessToken || null, onNeedRefresh }}
        />
      ) : (
        <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
          Für das Diskussionsforum ist noch kein Thema konfiguriert
          (VITE_FORUM_ROOT_NODE_ID).
        </div>
      )}
    </div>
  );
}
