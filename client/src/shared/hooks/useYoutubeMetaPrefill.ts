// Convenience prefill for the lesson-create modal: when a valid YouTube link/id is
// present in the `youtube` field, fetch its public metadata (via oEmbed) and drop
// the video title into the lesson-title field — but only while it is still empty,
// so anything the user typed wins. Debounced so typing/pasting doesn't fire a
// request per keystroke, aborted on change/unmount, and silent on failure (the
// title stays manually editable). The setter is stable, the guard `setName(p => p || title)`
// guarantees a non-empty field is never overwritten.
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { youtubeId } from "../utils/video";
import { fetchYoutubeMeta } from "../utils/youtubeMeta";

// Wait out typing/pasting before hitting the network.
const DEBOUNCE_MS = 400;

export function useYoutubeMetaPrefill(
  enabled: boolean,
  youtube: string,
  setName: Dispatch<SetStateAction<string>>
) {
  // Re-run only when the resolved video id changes, not on every keystroke.
  const id = youtubeId(youtube);
  useEffect(() => {
    if (!enabled || !id) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchYoutubeMeta(id, controller.signal).then((meta) => {
        if (meta) setName((p) => p || meta.title);
      });
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enabled, id, setName]);
}
