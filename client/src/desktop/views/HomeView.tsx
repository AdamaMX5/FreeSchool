import { useState } from "react";
import { useContentBrowser } from "../../shared/hooks/useContentBrowser";
import { useAuth } from "../../shared/context/AuthContext";
import { cssBackgroundImage } from "../../shared/utils/css";
import CategoryEditModal from "../../shared/components/CategoryEditModal";
import PencilIcon from "../../shared/components/PencilIcon";
import type { Category } from "../../shared/types";
import ContentView from "./ContentView";

// Desktop: learning hubs / child categories as a card grid, lessons as a list below;
// selecting a lesson opens its contents.
export default function HomeView() {
  const b = useContentBrowser();
  const { canManageCategories } = useAuth();
  const [editing, setEditing] = useState<Category | null>(null);

  if (b.selectedLesson) {
    return (
      <ContentView
        lesson={b.selectedLesson}
        contents={b.contents}
        loading={b.loading}
        onBack={b.closeLesson}
      />
    );
  }

  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-400">
        <button className="hover:text-white" onClick={b.goHome}>
          🏠 Lernbüros
        </button>
        {b.path.map((c) => (
          <span key={c.id}>
            <span className="mx-1 text-neutral-600">›</span>
            {c.name}
          </span>
        ))}
      </nav>

      {b.error && <div className="mb-4 text-red-400">{b.error}</div>}
      {b.loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : (
        <>
          {b.categories.length > 0 && (
            <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {b.categories.map((cat) => {
                const bg = cssBackgroundImage(cat.background_link);
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

          {b.lessons.length > 0 && (
            <ul className="flex max-w-3xl flex-col gap-2">
              {b.lessons.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => b.openLesson(l)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-left hover:bg-neutral-700"
                  >
                    <div className="font-medium">{l.name}</div>
                    {l.description && <div className="text-sm text-neutral-400">{l.description}</div>}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {b.categories.length === 0 && b.lessons.length === 0 && (
            <div className="text-neutral-500">Keine Einträge.</div>
          )}
        </>
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
