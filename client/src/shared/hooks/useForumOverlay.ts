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
 * a full URL like `?forum=1&thema=<id>` reopens the overlay on the exact topic on *reload* - that
 * remembered position isn't re-validated (the topic may since have been deleted), so it's only
 * trusted when it was already sitting in the URL when the page loaded. The desktop shell has no
 * router (see DesktopApp.tsx), so this talks to `window.history` directly - the same way
 * ForumThread's own useDeepLinkParams hook does.
 */
export function useForumOverlay() {
  const [isOpen, setIsOpen] = useState(isForumOpenInUrl);

  useEffect(() => {
    const onPopState = () => setIsOpen(isForumOpenInUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Explicitly opening (the header button) always lands on the Themenübersicht, clearing any
  // leftover ?thema=/?fokus=/?kommentare= from an earlier visit - those aren't re-validated, so
  // keeping them here would retry whatever topic we last had open, even a since-deleted one.
  const open = useCallback(() => {
    const search = new URLSearchParams(window.location.search);
    search.set(PARAM, "1");
    search.delete("thema");
    search.delete("fokus");
    search.delete("kommentare");
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

  const toggle = useCallback(() => {
    if (isForumOpenInUrl()) close();
    else open();
  }, [open, close]);

  return { isOpen, open, close, toggle };
}
