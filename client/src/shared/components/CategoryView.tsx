// Full category view shared by desktop and mobile: an optional row of child-category
// cards on top, the lesson canvas filling the remaining height, and — for
// admins/moderators — a bottom toolbar with the editing tools. The toolbar lives in
// the flex column, so when present it shortens the canvas (which the canvas scaling
// accounts for automatically).
//
// Move and edit are mutually exclusive modes. New lessons are placed at the centre
// of the original image (once its natural size is known) and can be dragged from
// there in move mode.
import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, Lesson } from "../types";
import type { OpenContent } from "../hooks/useContentBrowser";
import { categoryBackgroundImage } from "../utils/css";
import CategoryCanvas from "./CategoryCanvas";
import CategoryToolbar from "./CategoryToolbar";
import SendImprovementModal from "./SendImprovementModal";
import LessonEditModal from "./LessonEditModal";

interface Props {
  category: Category;
  childCategories: Category[];
  lessons: Lesson[];
  onOpenCategory: (cat: Category) => void;
  /** Reload the lesson list after a create/edit/delete. */
  onLessonsChanged: () => void;
  /** ADMIN or MODERATOR — gets the editing toolbar. */
  canEdit: boolean;
  isMobile?: boolean;
  /** Content opened via the URL (?co=<id>); forwarded to the canvas. */
  openContent?: OpenContent | null;
  /** Report a content as opened (URL sync). */
  onOpenContent?: (lessonId: string, contentId: string) => void;
  /** Report the open content as closed (URL sync). */
  onCloseContent?: () => void;
}

export default function CategoryView({
  category,
  childCategories,
  lessons,
  onOpenCategory,
  onLessonsChanged,
  canEdit,
  isMobile = false,
  openContent,
  onOpenContent,
  onCloseContent,
}: Props) {
  const [moveMode, setMoveMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [improving, setImproving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  // Original image size (kept in a ref; only needed at create time).
  const natural = useRef({ w: 0, h: 0 });

  const onNaturalSize = useCallback((w: number, h: number) => {
    natural.current = { w, h };
  }, []);

  // Reset transient modes/modals when navigating to another category, so a stale
  // edit modal can't point at a lesson from the previous category.
  useEffect(() => {
    setMoveMode(false);
    setEditMode(false);
    setCreating(false);
    setEditingLesson(null);
  }, [category.id]);

  // Move and edit are mutually exclusive.
  const toggleMove = () => {
    setMoveMode((m) => !m);
    setEditMode(false);
  };
  const toggleEdit = () => {
    setEditMode((e) => !e);
    setMoveMode(false);
  };

  // Centre of the original image (with a small cascade so successive new lessons
  // don't land exactly on top of each other), or a default before the image loaded.
  const newLessonPosition = () => {
    const cascade = (lessons.length % 6) * 24;
    return natural.current.w > 0
      ? {
          x: Math.round(natural.current.w / 2) + cascade,
          y: Math.round(natural.current.h / 2) + cascade,
        }
      : { x: 20 + cascade, y: 20 + cascade };
  };

  return (
    <div className="flex h-full w-full flex-col">
      {childCategories.length > 0 && (
        <div className="mb-2 flex shrink-0 gap-2 overflow-x-auto pb-1">
          {childCategories.map((c) => {
            const bg = categoryBackgroundImage(c.background_link);
            return (
              <button
                key={c.id}
                onClick={() => onOpenCategory(c)}
                className="relative h-16 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-700 text-left shadow"
              >
                {bg && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 transition hover:opacity-90"
                    style={{ backgroundImage: bg }}
                  />
                )}
                <span className="absolute inset-x-0 bottom-0 z-10 truncate bg-black/60 px-2 py-1 text-xs font-semibold">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="relative min-h-0 flex-1 rounded-lg bg-neutral-900/40">
        <CategoryCanvas
          category={category}
          lessons={lessons}
          moveMode={moveMode}
          editMode={editMode}
          canManageContent={canEdit}
          isMobile={isMobile}
          onEditLesson={setEditingLesson}
          onNaturalSize={onNaturalSize}
          openContent={openContent}
          onOpenContent={onOpenContent}
          onCloseContent={onCloseContent}
        />
      </div>

      {canEdit && (
        <CategoryToolbar
          moveMode={moveMode}
          editMode={editMode}
          onToggleMove={toggleMove}
          onToggleEdit={toggleEdit}
          onAddLesson={() => setCreating(true)}
          onSendImprovement={() => setImproving(true)}
        />
      )}

      {improving && (
        <SendImprovementModal categoryName={category.name} onClose={() => setImproving(false)} />
      )}

      {creating && (
        <LessonEditModal
          mode="create"
          category={category}
          defaultPosition={newLessonPosition()}
          defaultOrder={String(lessons.length + 1)}
          onClose={() => setCreating(false)}
          // After creating a lesson, switch straight into move mode so the new
          // lesson (placed at the image centre) can be dragged to its spot.
          onSaved={() => {
            onLessonsChanged();
            setMoveMode(true);
            setEditMode(false);
          }}
        />
      )}

      {editingLesson && (
        <LessonEditModal
          mode="edit"
          category={category}
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onSaved={onLessonsChanged}
        />
      )}
    </div>
  );
}
