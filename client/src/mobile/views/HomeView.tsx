import { useState } from "react";
import { useContentBrowser } from "../../shared/hooks/useContentBrowser";
import { useAuth } from "../../shared/context/AuthContext";
import { categoryBackgroundImage } from "../../shared/utils/css";
import CategoryEditModal from "../../shared/components/CategoryEditModal";
import CategoryView from "../../shared/components/CategoryView";
import PencilIcon from "../../shared/components/PencilIcon";
import type { Category } from "../../shared/types";

// Mobile: learning hubs as full-width cards at the top level; opening one switches
// to the category view (lessons placed on the scaled background image).
export default function HomeView() {
  const b = useContentBrowser();
  const { canManageCategories } = useAuth();
  const [editing, setEditing] = useState<Category | null>(null);

  // Inside a category: breadcrumb + lesson canvas, filling the viewport below the
  // header (header 3rem + main pt-16/pb-6 = 5.5rem of chrome).
  if (b.currentCategory) {
    return (
      <div className="flex h-[calc(100vh-5.5rem)] flex-col">
        <nav className="mb-2 flex shrink-0 flex-wrap items-center gap-1 text-sm text-neutral-400">
          <button className="hover:text-white" onClick={b.goHome}>
            🏠
          </button>
          {b.path.map((c, i) => (
            <span key={c.id} className="flex items-center gap-1">
              <span className="text-neutral-600">›</span>
              <button
                className={i === b.path.length - 1 ? "text-neutral-200" : "hover:text-white"}
                onClick={() => b.goToDepth(i)}
              >
                {c.name}
              </button>
            </span>
          ))}
        </nav>
        {b.error && <div className="mb-2 shrink-0 text-red-400">{b.error}</div>}
        <div className="min-h-0 flex-1">
          <CategoryView
            category={b.currentCategory}
            childCategories={b.categories}
            lessons={b.lessons}
            onOpenCategory={b.openCategory}
            onLessonsChanged={b.reloadLessons}
            canEdit={canManageCategories}
            isMobile
            openContent={b.openContent}
            onOpenContent={b.selectContent}
            onCloseContent={b.closeContent}
          />
        </div>
      </div>
    );
  }

  // Top level: learning hubs as full-width cards.
  return (
    <div>
      <div className="mb-3 text-sm text-neutral-400">🏠 Lernbüros</div>

      {b.error && <div className="mb-3 text-red-400">{b.error}</div>}
      {b.loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : b.categories.length === 0 ? (
        <div className="text-neutral-500">Keine Lernbüros.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {b.categories.map((cat) => {
            const bg = categoryBackgroundImage(cat.background_link);
            return (
              <li key={cat.id} className="relative">
                <button
                  onClick={() => b.openCategory(cat)}
                  className="relative flex h-20 w-full items-start overflow-hidden rounded-xl bg-neutral-700 text-left"
                >
                  {bg && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70"
                      style={{ backgroundImage: bg }}
                    />
                  )}
                  <h3 className="relative z-10 w-full bg-black/60 p-2 text-base font-semibold">
                    {cat.name}
                  </h3>
                </button>
                {canManageCategories && (
                  <button
                    onClick={() => setEditing(cat)}
                    aria-label="Bild bearbeiten"
                    className="absolute bottom-2 right-2 z-20 rounded-full bg-black/60 p-1.5 text-red-500 active:bg-black/80"
                  >
                    <PencilIcon />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <CategoryEditModal
          category={editing}
          onClose={() => setEditing(null)}
          onSaved={b.updateCategory}
          onDeleted={() => b.removeCategory(editing)}
        />
      )}
    </div>
  );
}
