// A single lesson rendered as a circular icon positioned on the (scaled) category
// background. Two interaction modes:
//   - normal: clicking toggles a popover that lazily loads the lesson's contents
//     (videos + markdown), mirroring the old Svelte LessonComponent.
//   - move (admins/moderators via the toolbar): the icon is draggable; dragging
//     reports new *original-image* pixel coordinates live (onMove) and persists on
//     release (onCommit).
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Content, Lesson } from "../types";
import { listContentsByLesson } from "../services/objectApi";
import Markdown from "./Markdown";
import VideoEmbed from "./VideoEmbed";
import ContentEditModal from "./ContentEditModal";

interface Props {
  lesson: Lesson;
  scale: number;
  offsetX: number;
  offsetY: number;
  moveMode: boolean;
  editMode?: boolean;
  isMobile?: boolean;
  /** ADMIN/MODERATOR: show add/edit/delete controls for the lesson's contents. */
  canManageContent?: boolean;
  /** Open this lesson's edit modal (edit mode). */
  onEdit?: () => void;
  /** Live position while dragging (original-image pixels). */
  onMove: (x: number, y: number) => void;
  /** Persist the final position on drag release. */
  onCommit: (x: number, y: number) => void;
}

export default function LessonIcon({
  lesson,
  scale,
  offsetX,
  offsetY,
  moveMode,
  editMode = false,
  isMobile = false,
  canManageContent = false,
  onEdit,
  onMove,
  onCommit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState<Content[] | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [error, setError] = useState("");
  // Content management modals (admins/moderators).
  const [addingContent, setAddingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  // Drag bookkeeping kept in refs so pointer moves don't trigger re-renders.
  const drag = useRef<{ startX: number; startY: number; px: number; py: number } | null>(null);
  const moved = useRef(false);
  // Latest dragged position — committed on release (props lag a render behind).
  const last = useRef<{ x: number; y: number } | null>(null);

  // Load (or reload, after a content change) the lesson's contents, keeping the
  // current selection if it still exists.
  const loadContents = useCallback(() => {
    return listContentsByLesson(lesson.id)
      .then((cs) => {
        setContents(cs);
        setSelectedId((prev) => (cs.some((c) => c.id === prev) ? prev : cs[0]?.id ?? ""));
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, [lesson.id]);

  // Lazy-load contents the first time the popover opens.
  useEffect(() => {
    if (!open || contents !== null) return;
    loadContents();
  }, [open, contents, loadContents]);

  const screenX = lesson.position_x * scale + offsetX;
  const screenY = lesson.position_y * scale + offsetY;
  const iconSize = Math.max(28, 40 * scale);
  const fontSize = Math.max(11, 14 * scale);

  function onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!moveMode) return;
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    moved.current = false;
    last.current = null;
    drag.current = { startX: e.clientX, startY: e.clientY, px: lesson.position_x, py: lesson.position_y };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || scale <= 0) return;
    const dx = (e.clientX - d.startX) / scale;
    const dy = (e.clientY - d.startY) / scale;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) moved.current = true;
    const x = Math.round(d.px + dx);
    const y = Math.round(d.py + dy);
    last.current = { x, y };
    onMove(x, y);
  }

  function endDrag(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    drag.current = null;
    if (moved.current && last.current) onCommit(last.current.x, last.current.y);
  }

  function onClick() {
    // In move mode a click is the tail end of a drag — never open the popover.
    if (moveMode || moved.current) return;
    // In edit mode a click opens the lesson's edit modal instead of the content.
    if (editMode) {
      onEdit?.();
      return;
    }
    setOpen((o) => !o);
  }

  const selected = contents?.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <button
        type="button"
        title={lesson.name}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="absolute z-10 flex items-center justify-center rounded-full border-2 border-white/70 bg-red-600 font-bold text-white shadow-lg transition hover:scale-110"
        style={{
          left: screenX - iconSize / 2,
          top: screenY - iconSize / 2,
          width: iconSize,
          height: iconSize,
          fontSize,
          cursor: moveMode ? "grab" : "pointer",
          touchAction: "none",
        }}
      >
        {lesson.display_order || "•"}
      </button>

      {open && !moveMode && (
        <div
          className={
            isMobile
              ? "fixed inset-x-2 top-14 z-30 mx-auto max-w-md rounded-xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl ring-1 ring-black/40"
              : "absolute z-30 w-[360px] max-w-[90vw] rounded-xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl ring-1 ring-black/40"
          }
          style={
            isMobile
              ? undefined
              : {
                  // Anchor near the icon but keep the 360px panel off the left edge.
                  // Right overflow is handled by max-w-[90vw].
                  left: Math.max(8, screenX - 180),
                  top: screenY + iconSize / 2 + 8,
                }
          }
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold">{lesson.name}</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Schließen"
              className="text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {error && <div className="mb-2 text-sm text-red-400">{error}</div>}

          {canManageContent && (
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                onClick={() => setAddingContent(true)}
                className="rounded-lg bg-neutral-700 px-2.5 py-1 text-xs font-medium hover:bg-neutral-600"
              >
                ＋ Inhalt
              </button>
              {selected && (
                <button
                  onClick={() => setEditingContent(selected)}
                  className="rounded-lg bg-neutral-700 px-2.5 py-1 text-xs font-medium hover:bg-neutral-600"
                >
                  ✏️ Inhalt bearbeiten
                </button>
              )}
            </div>
          )}

          {contents === null ? (
            <div className="text-sm text-neutral-400">Lädt…</div>
          ) : contents.length === 0 ? (
            <div className="text-sm text-neutral-500">Kein Inhalt vorhanden.</div>
          ) : (
            <>
              {contents.length > 1 && (
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="mb-3 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-2 py-1.5 text-sm"
                >
                  {contents.map((c, i) => (
                    <option key={c.id} value={c.id}>
                      {`Inhalt ${i + 1}${c.language ? ` (${c.language})` : ""}`}
                    </option>
                  ))}
                </select>
              )}
              {selected && (
                <div className="max-h-[60vh] overflow-y-auto">
                  <VideoEmbed youtubeId={selected.youtube_id} internalVideo={selected.internal_video} />
                  {selected.text && (
                    <div className="mt-3">
                      <Markdown text={selected.text} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {addingContent && (
        <ContentEditModal
          mode="create"
          lessonId={lesson.id}
          onClose={() => setAddingContent(false)}
          onSaved={loadContents}
        />
      )}

      {editingContent && (
        <ContentEditModal
          mode="edit"
          lessonId={lesson.id}
          content={editingContent}
          onClose={() => setEditingContent(null)}
          onSaved={loadContents}
        />
      )}
    </>
  );
}
