import { useCategoryBrowser } from "../../shared/hooks/useCategoryBrowser";
import { cssBackgroundImage } from "../../shared/utils/css";

// Mobile: learning hubs as a full-width vertical list; tap drills into child categories.
export default function HomeView() {
  const { items, path, loading, error, loadHubs, open } = useCategoryBrowser();

  return (
    <div>
      <button className="mb-3 text-sm text-neutral-400" onClick={loadHubs}>
        🏠 {path.length > 0 ? path.map((c) => c.name).join(" › ") : "Lernbüros"}
      </button>

      {error && <div className="mb-3 text-red-400">{error}</div>}
      {loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : items.length === 0 ? (
        <div className="text-neutral-500">Keine Einträge.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((cat) => {
            const bg = cssBackgroundImage(cat.background_link);
            return (
              <li key={cat.id}>
                <button
                  onClick={() => open(cat)}
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
    </div>
  );
}
