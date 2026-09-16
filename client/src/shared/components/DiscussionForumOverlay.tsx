// Full-window site-wide discussion forum (ForumService), opened from the header
// chat-bubbles button. Reuses the FreeSchool login session instead of letting
// ForumThread run its own standalone login/refresh flow, so the two never race
// AuthService's rotating refresh token (see ForumService/ForumService.md,
// "externalAuth"). No own header/close button: ForumThread renders its own always-
// visible, always-clickable "Diskussionsforum" heading (→ Themenübersicht); closing
// the overlay itself is done via the (now active-highlighted) header forum button or
// the home button, both of which stay visible above this overlay.
import { ForumThread } from "@forumservice/frontend";
import "@forumservice/frontend/style.css";
import { useAuth } from "../context/AuthContext";
import { applyToken, refresh } from "../services/authApi";
import { FORUM_BASE_URL, FORUM_ROOT_NODE_ID } from "../config";

interface Props {
  /** Tailwind `top-*` class matching the host header's height (default: desktop's h-14). */
  topClassName?: string;
}

async function onNeedRefresh(): Promise<string> {
  const token = await refresh();
  if (!token) throw new Error("Sitzung abgelaufen");
  applyToken(token);
  return token;
}

export default function DiscussionForumOverlay({ topClassName = "top-14" }: Props) {
  const { user } = useAuth();

  return (
    <div
      id="forum-overlay"
      className={`fixed inset-x-0 bottom-0 ${topClassName} z-40 overflow-y-auto bg-white dark:bg-neutral-900`}
    >
      {/* nodeId is optional: without VITE_FORUM_ROOT_NODE_ID (no fixed topic configured),
          ForumThread shows its own Themen start page (list of all topics + a "+" button to
          create the first/a new one) instead of a single thread - see ForumService.md,
          "Frontend / Einbindung". */}
      <ForumThread
        nodeId={FORUM_ROOT_NODE_ID || undefined}
        forumApiBaseUrl={FORUM_BASE_URL}
        externalAuth={{ accessToken: user.accessToken || null, onNeedRefresh }}
      />
    </div>
  );
}
