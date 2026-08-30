import { useCallback, useEffect, useState } from "react";

const PARAM = "forum";

function isForumOpenInUrl(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get(PARAM) === "1";
}

/**
 * Mirrors the site-wide discussion overlay's open/closed state in the URL (`?forum=1`), so a
 * reload reopens it instead of dropping back to the lesson browser. Combined with ForumThread's
 * own `?thema=`/`?fokus=`/`?kommentare=` deep-link params (see ForumService.md, "Deep-Linking"),
 * a full URL like `?forum=1&thema=<id>` reopens the overlay on the exact topic. The desktop shell
 * has no router (see DesktopApp.tsx), so this talks to `window.history` directly - the same way
 * ForumThread's own useDeepLinkParams hook does.
 */
export function useForumOverlay() {
  const [isOpen, setIsOpen] = useState(isForumOpenInUrl);

  useEffect(() => {
    const onPopState = () => setIsOpen(isForumOpenInUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const open = useCallback(() => {
    const search = new URLSearchParams(window.location.search);
    search.set(PARAM, "1");
    window.history.pushState(null, "", `${window.location.pathname}?${search}${window.location.hash}`);
    setIsOpen(true);
  }, []);

  // Clears the forum's own deep-link params too, so closing always returns to a clean URL
  // instead of leaving a stale ?thema=/?fokus=/?kommentare= behind.
  const close = useCallback(() => {
    const search = new URLSearchParams(window.location.search);
    search.delete(PARAM);
    search.delete("thema");
    search.delete("fokus");
    search.delete("kommentare");
    const qs = search.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
}
