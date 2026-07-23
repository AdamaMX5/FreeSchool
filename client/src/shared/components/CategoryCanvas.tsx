// The category "canvas": the (default-aware) background image scaled to fit, with
// the category's lessons placed on it by their position (percentage of the
// background image, issue #31). Shared by desktop and mobile. Lesson positions are
// held locally so dragging re-renders smoothly; on release the new position is
// persisted via ObjectService.
import { useEffect, useState } from "react";
import type { Category, Lesson } from "../types";
import type { OpenContent } from "../hooks/useContentBrowser";
import { updateLessonPosition, migrateLegacyLessonPosition } from "../services/objectApi";
import { categoryBackgroundSrc } from "../utils/css";
import { useCanvasLayout } from "../hooks/useCanvasLayout";
import LessonIcon from "./LessonIcon";

interface Props {
  category: Category;
  lessons: Lesson[];
  /** Move mode is only enabled for admins/moderators via the toolbar. */
  moveMode: boolean;
  /** Edit mode (admins/moderators): clicking a lesson opens its edit modal. */
  editMode?: boolean;
  /** ADMIN/MODERATOR: content add/edit/delete controls in the lesson popover. */
  canManageContent?: boolean;
  isMobile?: boolean;
  onEditLesson?: (lesson: Lesson) => void;
  /** Content opened via the URL (?co=<id>); its lesson's popover auto-opens. */
  openContent?: OpenContent | null;
  /** Report a content as opened (URL sync). */
  onOpenContent?: (lessonId: string, contentId: string) => void;
  /** Report the open content as closed (URL sync). */
  onCloseContent?: () => void;
}

export default function CategoryCanvas({
  category,
  lessons,
  moveMode,
  editMode = false,
  canManageContent = false,
  isMobile = false,
  onEditLesson,
  openContent,
  onOpenContent,
  onCloseContent,
}: Props) {
  // Keyed off the background image itself: CategoryCanvas isn't remounted when
  // navigating between categories, so the layout must be explicitly told the image
  // changed (see useCanvasLayout's resetKey doc).
  const layout = useCanvasLayout(category.background_link);
  // Local, mutable copy so a drag updates the rendered position immediately.
  const [items, setItems] = useState<Lesson[]>(lessons);

  // Re-sync when the lesson set changes (navigating between categories).
  useEffect(() => setItems(lessons), [lessons]);

  // Legacy-position migration (issue #31): once the background image's natural size
  // is known, convert any lesson still stored in absolute pixels to the percentage
  // scheme, clamping positions that fall outside the *current* image (this is what
  // "loses" lessons when a smaller background is chosen) to its edge. Runs for every
  // viewer so the icons render in the right place immediately; only admins/moderators
  // (canManageContent) actually persist the fix, since ObjectService's edit ACL would
  // reject the PATCH for anyone else.
  useEffect(() => {
    if (!layout.ready) return;
    const hasLegacy = items.some((l) => l.position_unit !== "percent");
    if (!hasLegacy) return;
    setItems((prev) =>
      prev.map((l) => {
        const migrated = migrateLegacyLessonPosition(l, layout.naturalWidth, layout.naturalHeight);
        if (!migrated) return l;
        if (canManageContent) {
          updateLessonPosition(l.docId, migrated.x, migrated.y).catch((e) => {
            console.error("Legacy-Position konnte nicht migriert werden:", e);
          });
        }
        return { ...l, position_x: migrated.x, position_y: migrated.y, position_unit: "percent" };
      })
    );
  }, [layout.ready, layout.naturalWidth, layout.naturalHeight, items, canManageContent]);

  function moveLesson(id: string, x: number, y: number) {
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, position_x: x, position_y: y } : l)));
  }

  function commitLesson(lesson: Lesson, x: number, y: number) {
    updateLessonPosition(lesson.docId, x, y).catch((e) => {
      // Surface to the console; position stays applied client-side either way.
      console.error("Position konnte nicht gespeichert werden:", e);
    });
  }

  return (
    <div ref={layout.containerRef} className="relative h-full w-full overflow-hidden">
      <img
        src={categoryBackgroundSrc(category.background_link)}
        alt={category.name}
        onLoad={layout.onImageLoad}
        draggable={false}
        className="pointer-events-none absolute select-none"
        style={{
          left: layout.offsetX,
          top: layout.offsetY,
          width: layout.scaledWidth,
          height: layout.scaledHeight,
        }}
      />

      {layout.ready &&
        items.map((lesson) => (
          <LessonIcon
            key={lesson.id}
            lesson={lesson}
            scale={layout.scale}
            offsetX={layout.offsetX}
            offsetY={layout.offsetY}
            scaledWidth={layout.scaledWidth}
            scaledHeight={layout.scaledHeight}
            moveMode={moveMode}
            editMode={editMode}
            canManageContent={canManageContent}
            isMobile={isMobile}
            openContentId={openContent?.lessonId === lesson.id ? openContent.contentId : undefined}
            onOpenContent={(contentId) => onOpenContent?.(lesson.id, contentId)}
            onCloseContent={onCloseContent}
            onEdit={() => onEditLesson?.(lesson)}
            onMove={(x, y) => moveLesson(lesson.id, x, y)}
            onCommit={(x, y) => commitLesson(lesson, x, y)}
          />
        ))}
    </div>
  );
}
