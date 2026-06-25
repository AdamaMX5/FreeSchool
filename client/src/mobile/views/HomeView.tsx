import { useContentBrowser } from "../../shared/hooks/useContentBrowser";
import { cssBackgroundImage } from "../../shared/utils/css";
import ContentView from "./ContentView";

// Mobile: categories and lessons as full-width vertical lists; selecting a lesson
// opens its contents.
export default function HomeView() {
  const b = useContentBrowser();

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
      <button className="mb-3 text-sm text-neutral-400" onClick={b.goHome}>
        🏠 {b.path.length > 0 ? b.path.map((c) => c.name).join(" › ") : "Lernbüros"}
      </button>

      {b.error && <div className="mb-3 text-red-400">{b.error}</div>}
      {b.loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : (
        <>
          {b.categories.length > 0 && (
            <ul className="mb-4 flex flex-col gap-2">
              {b.categories.map((cat) => {
                const bg = cssBackgroundImage(cat.background_link);
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => b.openCategory(cat)}
                      className="relative flex h-20 w-full items-end overflow-hidden rounded-xl bg-neutral-700 text-left"
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
                  </li>
                );
              })}
            </ul>
          )}

          {b.lessons.length > 0 && (
            <ul className="flex flex-col gap-2">
              {b.lessons.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => b.openLesson(l)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-left active:bg-neutral-700"
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
    </div>
  );
}
