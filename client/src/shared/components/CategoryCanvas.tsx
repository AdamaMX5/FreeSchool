// The category "canvas": the (default-aware) background image scaled to fit, with
// the category's lessons placed on it by their original-image pixel coordinates.
// Shared by desktop and mobile. Lesson positions are held locally so dragging
// re-renders smoothly; on release the new position is persisted via ObjectService.
import { useEffect, useState } from "react";
import type { Category, Lesson } from "../types";
import { updateLessonPosition } from "../services/objectApi";
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
  /** Reports the original image dimensions once loaded (for default placement). */
  onNaturalSize?: (width: number, height: number) => void;
}

export default function CategoryCanvas({
  category,
  lessons,
  moveMode,
  editMode = false,
  canManageContent = false,
  isMobile = false,
  onEditLesson,
  onNaturalSize,
}: Props) {
  const layout = useCanvasLayout();
  // Local, mutable copy so a drag updates the rendered position immediately.
  const [items, setItems] = useState<Lesson[]>(lessons);

  // Re-sync when the lesson set changes (navigating between categories).
  useEffect(() => setItems(lessons), [lessons]);

  // Bubble the natural image size up once known (used to centre new lessons).
  useEffect(() => {
    if (layout.naturalWidth > 0 && layout.naturalHeight > 0) {
      onNaturalSize?.(layout.naturalWidth, layout.naturalHeight);
    }
  }, [layout.naturalWidth, layout.naturalHeight, onNaturalSize]);

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
            moveMode={moveMode}
            editMode={editMode}
            canManageContent={canManageContent}
            isMobile={isMobile}
            onEdit={() => onEditLesson?.(lesson)}
            onMove={(x, y) => moveLesson(lesson.id, x, y)}
            onCommit={(x, y) => commitLesson(lesson, x, y)}
          />
        ))}
    </div>
  );
}
