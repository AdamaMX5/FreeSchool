// Full category view shared by desktop and mobile: an optional row of child-category
// cards on top, the lesson canvas filling the remaining height, and — for
// admins/moderators — a bottom toolbar with the editing tools. The toolbar lives in
// the flex column, so when present it shortens the canvas (which the canvas scaling
// accounts for automatically).
import { useState } from "react";
import type { Category, Lesson } from "../types";
import { categoryBackgroundImage } from "../utils/css";
import CategoryCanvas from "./CategoryCanvas";
import CategoryToolbar from "./CategoryToolbar";
import SendImprovementModal from "./SendImprovementModal";

interface Props {
  category: Category;
  childCategories: Category[];
  lessons: Lesson[];
  onOpenCategory: (cat: Category) => void;
  /** ADMIN or MODERATOR — gets the editing toolbar. */
  canEdit: boolean;
  isMobile?: boolean;
}

export default function CategoryView({
  category,
  childCategories,
  lessons,
  onOpenCategory,
  canEdit,
  isMobile = false,
}: Props) {
  const [moveMode, setMoveMode] = useState(false);
  const [improving, setImproving] = useState(false);

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
        <CategoryCanvas category={category} lessons={lessons} moveMode={moveMode} isMobile={isMobile} />
      </div>

      {canEdit && (
        <CategoryToolbar
          moveMode={moveMode}
          onToggleMove={() => setMoveMode((m) => !m)}
          onSendImprovement={() => setImproving(true)}
        />
      )}

      {improving && (
        <SendImprovementModal categoryName={category.name} onClose={() => setImproving(false)} />
      )}
    </div>
  );
}
