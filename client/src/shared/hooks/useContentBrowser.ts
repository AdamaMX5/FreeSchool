// Browsing behaviour for the learning content tree, shared by the visually separate
// desktop and mobile views: learning hubs -> child categories + lessons. Lessons are
// rendered on the category canvas and load their own contents (see LessonIcon), so
// this hook no longer tracks a selected lesson / its contents.
import { useEffect, useState } from "react";
import {
  listLearningHubs,
  getChildCategories,
  listLessonsByCategory,
} from "../services/objectApi";
import type { Category, Lesson } from "../types";

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export function useContentBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [path, setPath] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function goHome() {
    setLoading(true);
    setError("");
    try {
      setCategories(await listLearningHubs());
      setLessons([]);
      setPath([]);
    } catch (e) {
      setError(msg(e));
    } finally {
      setLoading(false);
    }
  }

  async function openCategory(cat: Category) {
    setLoading(true);
    setError("");
    try {
      const [children, ls] = await Promise.all([
        getChildCategories(cat.id),
        listLessonsByCategory(cat.id),
      ]);
      setCategories(children);
      setLessons(ls);
      setPath((p) => [...p, cat]);
    } catch (e) {
      setError(msg(e));
    } finally {
      setLoading(false);
    }
  }

  /**
   * Navigate to an ancestor in the breadcrumb (path index). slice(0, index) drops
   * the target *and* everything below it; openCategory then re-appends the target,
   * so the resulting path is [...up to index-1, target]. Index out of range falls
   * back to the learning-hub home.
   */
  async function goToDepth(index: number) {
    const target = path[index];
    if (!target) {
      await goHome();
      return;
    }
    setPath((p) => p.slice(0, index));
    await openCategory(target);
  }

  /** Update one category in the currently displayed list (e.g. after an edit). */
  function updateCategory(updated: Category) {
    setCategories((cs) => cs.map((c) => (c.id === updated.id ? updated : c)));
    setPath((p) => p.map((c) => (c.id === updated.id ? updated : c)));
  }

  useEffect(() => {
    goHome();
  }, []);

  // The category currently open (deepest in the breadcrumb), or null at the top.
  const currentCategory = path.length > 0 ? path[path.length - 1] : null;

  return {
    categories,
    lessons,
    path,
    currentCategory,
    loading,
    error,
    goHome,
    openCategory,
    goToDepth,
    updateCategory,
  };
}
