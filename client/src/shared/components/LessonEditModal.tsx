// Create / edit / delete a lesson. In "create" mode the modal also collects the
// first content (language, markdown text, YouTube link) and, as a convenience,
// pre-fills from the clipboard: a copied http(s) link goes into the YouTube field,
// other copied text goes into the markdown field. Create writes the lesson to
// ObjectService and, if a video/text was given, an attached content document.
import { useRef, useState } from "react";
import type { Category, Lesson } from "../types";
import {
  createLesson,
  updateLesson,
  deleteLessonAndOwnContents,
  createContent,
} from "../services/objectApi";
import { errMessage as msg } from "../utils/errors";
import { useClipboardPrefill } from "../hooks/useClipboardPrefill";
import { useYoutubeMetaPrefill } from "../hooks/useYoutubeMetaPrefill";

interface Props {
  mode: "create" | "edit";
  category: Category;
  lesson?: Lesson;
  /** Position for a newly created lesson (original-image pixels). */
  defaultPosition?: { x: number; y: number };
  /** Pre-filled display order for a new lesson (defaults it to the end). */
  defaultOrder?: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function LessonEditModal({
  mode,
  category,
  lesson,
  defaultPosition,
  defaultOrder = "",
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState(lesson?.name ?? "");
  const [description, setDescription] = useState(lesson?.description ?? "");
  const [order, setOrder] = useState(lesson?.display_order ?? defaultOrder);

  // Content fields (create mode only).
  const [language, setLanguage] = useState("de");
  const [youtube, setYoutube] = useState("");
  const [text, setText] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Remember a lesson already created in this session, so a failed content step
  // followed by a retry doesn't create a second lesson.
  const createdLessonId = useRef<string | null>(null);

  // Clipboard convenience: link -> YouTube field, plain text -> markdown field.
  useClipboardPrefill(mode === "create", setYoutube, setText);
  // Pull the video title from YouTube into the still-empty lesson-title field.
  useYoutubeMetaPrefill(mode === "create", youtube, setName);

  async function onSubmit() {
    if (!name.trim()) {
      setError("Titel darf nicht leer sein.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (mode === "create") {
        const pos = defaultPosition ?? { x: 20, y: 20 };
        // Reuse an already-created lesson on retry (e.g. after a content failure).
        if (!createdLessonId.current) {
          createdLessonId.current = await createLesson(category.id, {
            name: name.trim(),
            description: description.trim(),
            display_order: order.trim(),
            position_x: Math.round(pos.x),
            position_y: Math.round(pos.y),
          });
        }
        const lessonId = createdLessonId.current;
        // Only create a content when something was actually entered.
        if (youtube.trim() || text.trim()) {
          await createContent(lessonId, {
            language: language.trim() || "de",
            text: text.trim(),
            youtube_id: youtube.trim(),
            internal_video: "",
          });
        }
      } else if (lesson) {
        await updateLesson(lesson.docId, {
          name: name.trim(),
          description: description.trim(),
          display_order: order.trim(),
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
    if (!lesson) return;
    if (!window.confirm(`Lektion „${lesson.name}" inkl. ihrer Inhalte wirklich löschen?`)) return;
    setBusy(true);
    setError("");
    try {
      await deleteLessonAndOwnContents(lesson.docId, lesson.id);
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-neutral-800 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "Neue Lektion" : "Lektion bearbeiten"}
          </h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Titel</label>
            <input type="text" value={name} maxLength={200} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Beschreibung</label>
            <textarea value={description} rows={2} maxLength={2000} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-y`} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Reihenfolge</label>
            <input type="text" value={order} maxLength={20} onChange={(e) => setOrder(e.target.value)} placeholder="z.B. 1" className={inputClass} />
          </div>
        </div>

        {mode === "create" && (
          <>
            <h3 className="mb-2 mt-5 text-sm font-semibold text-neutral-200">Erster Inhalt (optional)</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-300">YouTube-Link oder Video-ID</label>
                <input type="text" value={youtube} maxLength={500} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtu.be/… oder 11-stellige ID" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-300">Text (Markdown)</label>
                <textarea value={text} rows={4} maxLength={8000} onChange={(e) => setText(e.target.value)} placeholder="Optionaler Markdown-Inhalt" className={`${inputClass} resize-y`} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-300">Sprache</label>
                <input type="text" value={language} maxLength={10} onChange={(e) => setLanguage(e.target.value)} placeholder="de" className={inputClass} />
              </div>
            </div>
          </>
        )}

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
          <button
            disabled={busy}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:text-white disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            disabled={busy || !name.trim()}
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
