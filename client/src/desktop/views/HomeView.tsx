import { useEffect, useState } from "react";
import { listLearningHubs, getChildCategories } from "../../shared/services/objectApi";
import type { Category } from "../../shared/types";

// Desktop: learning hubs as a card grid; click drills into child categories.
export default function HomeView() {
  const [items, setItems] = useState<Category[]>([]);
  const [path, setPath] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadHubs() {
    setLoading(true);
    setError("");
    try {
      setItems(await listLearningHubs());
      setPath([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function open(cat: Category) {
    setLoading(true);
    setError("");
    try {
      setItems(await getChildCategories(cat.id));
      setPath((p) => [...p, cat]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHubs();
  }, []);

  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-400">
        <button className="hover:text-white" onClick={loadHubs}>
          🏠 Lernbüros
        </button>
        {path.map((c) => (
          <span key={c.id}>
            <span className="mx-1 text-neutral-600">›</span>
            {c.name}
          </span>
        ))}
      </nav>

      {error && <div className="mb-4 text-red-400">{error}</div>}
      {loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : items.length === 0 ? (
        <div className="text-neutral-500">Keine Einträge.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {items.map((cat) => (
            <button
              key={cat.id}
              onClick={() => open(cat)}
              className="group relative h-32 overflow-hidden rounded-lg bg-neutral-700 text-left shadow"
            >
              {cat.background_link && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 transition group-hover:opacity-90"
                  style={{ backgroundImage: `url('${cat.background_link}')` }}
                />
              )}
              <h3 className="relative z-10 bg-black/60 p-2 text-sm font-semibold">{cat.name}</h3>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
