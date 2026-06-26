import { useState } from "react";
import { useContentBrowser } from "../../shared/hooks/useContentBrowser";
import { useAuth } from "../../shared/context/AuthContext";
import { categoryBackgroundImage } from "../../shared/utils/css";
import CategoryEditModal from "../../shared/components/CategoryEditModal";
import CategoryView from "../../shared/components/CategoryView";
import PencilIcon from "../../shared/components/PencilIcon";
import type { Category } from "../../shared/types";

// Desktop: learning hubs as a card grid at the top level; opening one switches to
// the category view (lessons placed on the scaled background image).
export default function HomeView() {
  const b = useContentBrowser();
  const { canManageCategories } = useAuth();
  const [editing, setEditing] = useState<Category | null>(null);

  // Inside a category: breadcrumb + lesson canvas, filling the viewport below the
  // header (header 3.5rem + main pt-20/pb-8 = 7rem of chrome).
  if (b.currentCategory) {
    return (
      <div className="flex h-[calc(100vh-7rem)] flex-col">
        <nav className="mb-2 flex shrink-0 flex-wrap items-center gap-1 text-sm text-neutral-400">
          <button className="hover:text-white" onClick={b.goHome}>
            🏠 Lernbüros
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
            canEdit={canManageCategories}
          />
        </div>
      </div>
    );
  }

  // Top level: learning hubs as a card grid.
  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-400">
        <span>🏠 Lernbüros</span>
      </nav>

      {b.error && <div className="mb-4 text-red-400">{b.error}</div>}
      {b.loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : b.categories.length === 0 ? (
        <div className="text-neutral-500">Keine Lernbüros.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {b.categories.map((cat) => {
            const bg = categoryBackgroundImage(cat.background_link);
            return (
              <div key={cat.id} className="group relative h-32 overflow-hidden rounded-lg bg-neutral-700 shadow">
                <button
                  onClick={() => b.openCategory(cat)}
                  className="absolute inset-0 h-full w-full text-left"
                >
                  {bg && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 transition group-hover:opacity-90"
                      style={{ backgroundImage: bg }}
                    />
                  )}
                  <h3 className="relative z-10 bg-black/60 p-2 text-sm font-semibold">{cat.name}</h3>
                </button>
                {canManageCategories && (
                  <button
                    onClick={() => setEditing(cat)}
                    title="Bild bearbeiten"
                    aria-label="Bild bearbeiten"
                    className="absolute right-2 top-2 z-20 rounded-full bg-black/60 p-1.5 text-red-500 hover:bg-black/80 hover:text-red-400"
                  >
                    <PencilIcon />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <CategoryEditModal
          category={editing}
          onClose={() => setEditing(null)}
          onSaved={b.updateCategory}
        />
      )}
    </div>
  );
}
