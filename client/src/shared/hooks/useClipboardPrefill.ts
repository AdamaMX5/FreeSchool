// Convenience prefill from the clipboard, shared by the lesson- and content-create
// modals: a copied http(s) link fills the YouTube field, any other text fills the
// markdown field. Only runs while `enabled`, only fills empty fields (the setters
// use `p || t`), and stays silent on failure (no permission / not HTTPS). The state
// setters are stable, so the effect runs once per enable.
import { useEffect, type Dispatch, type SetStateAction } from "react";

export function useClipboardPrefill(
  enabled: boolean,
  setLink: Dispatch<SetStateAction<string>>,
  setText: Dispatch<SetStateAction<string>>
) {
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    navigator.clipboard
      ?.readText?.()
      .then((raw) => {
        if (!alive) return;
        const t = raw.trim();
        if (!t) return;
        if (/^https?:\/\//i.test(t)) setLink((p) => p || t);
        else setText((p) => p || t);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [enabled, setLink, setText]);
}
