// Category browsing behaviour (learning hubs + drill into children), shared by the
// visually separate desktop and mobile HomeViews.
import { useEffect, useState } from "react";
import { listLearningHubs, getChildCategories } from "../services/objectApi";
import type { Category } from "../types";

export function useCategoryBrowser() {
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

  return { items, path, loading, error, loadHubs, open };
}
