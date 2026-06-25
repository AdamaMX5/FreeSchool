import { useEffect, useState } from "react";
import { listLearningHubs, getChildCategories } from "../../shared/services/objectApi";
import type { Category } from "../../shared/types";

// Mobile: learning hubs as a full-width vertical list; tap drills into child categories.
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
          {items.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => open(cat)}
                className="relative flex h-20 w-full items-end overflow-hidden rounded-xl bg-neutral-700 text-left"
              >
                {cat.background_link && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url('${cat.background_link}')` }}
                  />
                )}
                <h3 className="relative z-10 w-full bg-black/60 p-2 text-base font-semibold">{cat.name}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
