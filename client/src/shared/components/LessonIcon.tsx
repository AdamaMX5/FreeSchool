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
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Content, Lesson } from "../types";
import { listContentsByLesson } from "../services/objectApi";
import Markdown from "./Markdown";
import VideoEmbed from "./VideoEmbed";
import ContentEditModal from "./ContentEditModal";

// Desktop popover geometry: nominal width (matches the `w-[540px]` class) and the
// gap kept to the icon and the canvas edges. Used both for clamping and for the
// pre-measure anchor so the two stay in sync.
const POPOVER_WIDTH = 540;
const POPOVER_MARGIN = 8;

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
  /** When set (shared ?co=<id> link), auto-open the popover with this content selected. */
  openContentId?: string;
  /** Report the currently open content so the URL can mirror it (?co=<id>). */
  onOpenContent?: (contentId: string) => void;
  /** Report that the popover was closed so ?co can be dropped from the URL. */
  onCloseContent?: () => void;
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
  openContentId,
  onOpenContent,
  onCloseContent,
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

  // Desktop popover placement, computed after render so the panel always stays
  // inside the (overflow-hidden) canvas — see the useLayoutEffect below.
  const popoverRef = useRef<HTMLDivElement>(null);
  const [desktopPos, setDesktopPos] = useState<{
    left: number;
    top: number;
    maxHeight: number;
  } | null>(null);

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

  // Auto-open from a shared URL (?co=<id>): open this lesson's popover and preselect
  // the requested content. loadContents keeps the selection if the id exists.
  useEffect(() => {
    if (openContentId) {
      setSelectedId(openContentId);
      setOpen(true);
    }
  }, [openContentId]);

  // Mirror the open content into the URL (?co=<id>) whenever the selection changes
  // while the popover is open; closing reports via closePopover() below.
  useEffect(() => {
    if (open && selectedId) onOpenContent?.(selectedId);
    // onOpenContent is a fresh closure each render; the open/selectedId pair is the
    // real trigger, so it is intentionally excluded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedId]);

  function closePopover() {
    setOpen(false);
    onCloseContent?.();
  }

  const screenX = lesson.position_x * scale + offsetX;
  const screenY = lesson.position_y * scale + offsetY;
  const iconSize = Math.max(28, 40 * scale);
  const fontSize = Math.max(11, 14 * scale);

  // Place the desktop popover so it stays within the canvas: open below the icon
  // by default, flip above when it would overflow the bottom, and clamp to the
  // container with a max-height so the body scrolls instead of running off-screen.
  // Runs before paint (useLayoutEffect) to avoid a visible jump; re-measures when
  // the content (and thus the panel height) changes.
  useLayoutEffect(() => {
    if (!open || isMobile) {
      setDesktopPos(null);
      return;
    }
    const el = popoverRef.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return;
    const margin = POPOVER_MARGIN;
    const containerH = parent.clientHeight;
    const containerW = parent.clientWidth;
    const maxHeight = containerH - margin * 2;
    const popH = Math.min(el.offsetHeight, maxHeight);
    const left = Math.max(
      margin,
      Math.min(screenX - el.offsetWidth / 2, containerW - el.offsetWidth - margin),
    );
    let top = screenY + iconSize / 2 + margin;
    if (top + popH > containerH - margin) {
      const aboveTop = screenY - iconSize / 2 - margin - popH;
      top = aboveTop >= margin ? aboveTop : margin;
    }
    top = Math.max(margin, Math.min(top, containerH - margin - popH));
    setDesktopPos({ left, top, maxHeight });
    // `error` is included because it can appear asynchronously after open and
    // changes the panel height (and thus the flip/clamp decision). Container
    // resizes are covered indirectly via screenX/screenY (useCanvasLayout).
  }, [open, isMobile, screenX, screenY, iconSize, contents, selectedId, error]);

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
    if (open) closePopover();
    else setOpen(true);
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
          ref={popoverRef}
          className={
            isMobile
              ? "fixed inset-x-2 top-14 z-30 mx-auto flex max-h-[calc(100vh-5rem)] max-w-lg flex-col rounded-xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl ring-1 ring-black/40"
              : "absolute z-30 flex w-[540px] max-w-[90vw] flex-col rounded-xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl ring-1 ring-black/40"
          }
          style={
            isMobile
              ? undefined
              : desktopPos
                ? {
                    left: desktopPos.left,
                    top: desktopPos.top,
                    maxHeight: desktopPos.maxHeight,
                  }
                : {
                    // Pre-measure anchor; corrected in useLayoutEffect before paint.
                    left: Math.max(POPOVER_MARGIN, screenX - POPOVER_WIDTH / 2),
                    top: screenY + iconSize / 2 + POPOVER_MARGIN,
                  }
          }
        >
          <div className="mb-2 flex shrink-0 items-start justify-between gap-2">
            <h3 className="text-base font-semibold">{lesson.name}</h3>
            <button
              onClick={closePopover}
              aria-label="Schließen"
              className="text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {error && <div className="mb-2 shrink-0 text-sm text-red-400">{error}</div>}

          {canManageContent && (
            <div className="mb-3 flex shrink-0 flex-wrap gap-2">
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
                  className="mb-3 w-full shrink-0 rounded-lg border border-neutral-600 bg-neutral-900 px-2 py-1.5 text-sm"
                >
                  {contents.map((c, i) => (
                    <option key={c.id} value={c.id}>
                      {`Inhalt ${i + 1}${c.language ? ` (${c.language})` : ""}`}
                    </option>
                  ))}
                </select>
              )}
              {selected && (
                <div className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto">
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
