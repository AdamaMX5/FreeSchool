// Create / edit / delete a single content of a lesson (admins/moderators). Fields:
// YouTube link or id, markdown text and language. Like the lesson-create modal, the
// create mode pre-fills from the clipboard (link -> YouTube, other text -> markdown).
import { useState } from "react";
import type { Content } from "../types";
import { createContent, updateContent, deleteContent } from "../services/objectApi";
import { errMessage as msg } from "../utils/errors";
import { useClipboardPrefill } from "../hooks/useClipboardPrefill";

interface Props {
  mode: "create" | "edit";
  /** Target lesson id (legacyId) — required for create. */
  lessonId: string;
  content?: Content;
  onClose: () => void;
  onSaved: () => void;
}

export default function ContentEditModal({ mode, lessonId, content, onClose, onSaved }: Props) {
  const [language, setLanguage] = useState(content?.language ?? "de");
  const [youtube, setYoutube] = useState(content?.youtube_id ?? "");
  const [text, setText] = useState(content?.text ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useClipboardPrefill(mode === "create", setYoutube, setText);

  async function onSubmit() {
    if (!youtube.trim() && !text.trim()) {
      setError("Bitte mindestens einen Link oder Text angeben.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (mode === "create") {
        await createContent(lessonId, {
          language: language.trim() || "de",
          text: text.trim(),
          youtube_id: youtube.trim(),
          internal_video: "",
        });
      } else if (content) {
        await updateContent(content.docId, {
          language: language.trim() || "de",
          text: text.trim(),
          youtube_id: youtube.trim(),
        });
      }
      onSaved();
      onClose();
    } catch (e) {
      setError(msg(e));
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!content) return;
    if (!window.confirm("Diesen Inhalt wirklich löschen?")) return;
    setBusy(true);
    setError("");
    try {
      await deleteContent(content.docId);
      onSaved();
      onClose();
    } catch (e) {
      setError(msg(e));
      setBusy(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-neutral-800 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{mode === "create" ? "Inhalt hinzufügen" : "Inhalt bearbeiten"}</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">YouTube-Link oder Video-ID</label>
            <input type="text" value={youtube} maxLength={500} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtu.be/… oder 11-stellige ID" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Text (Markdown)</label>
            <textarea value={text} rows={5} maxLength={8000} onChange={(e) => setText(e.target.value)} placeholder="Optionaler Markdown-Inhalt" className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Sprache</label>
            <input type="text" value={language} maxLength={10} onChange={(e) => setLanguage(e.target.value)} placeholder="de" className={inputClass} />
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="mt-5 flex items-center justify-end gap-2">
          {mode === "edit" && (
            <button
              disabled={busy}
              onClick={onDelete}
              className="mr-auto rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
            >
              Löschen
            </button>
          )}
          <button disabled={busy} onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:text-white disabled:opacity-50">
            Abbrechen
          </button>
          <button
            disabled={busy || (!youtube.trim() && !text.trim())}
            onClick={onSubmit}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"
          >
            {busy ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
