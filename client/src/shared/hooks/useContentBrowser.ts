// Browsing behaviour for the learning content tree, shared by the visually separate
// desktop and mobile views: learning hubs -> child categories + lessons. Lessons are
// rendered on the category canvas and load their own contents (see LessonIcon), so
// this hook no longer tracks a selected lesson / its contents.
//
// Navigation is mirrored into the URL (?ca=<categoryId>) and the browser history, so
// the browser back/forward buttons step through the visited categories instead of
// leaving the app, and a deep link / reload restores the right category.
import { useEffect, useState } from "react";
import {
  listLearningHubs,
  getChildCategories,
  listLessonsByCategory,
  getCategoryPath,
} from "../services/objectApi";
import type { Category, Lesson } from "../types";
import { errMessage as msg } from "../utils/errors";

/** Read the current category id from the URL (?ca=<id>), or null at the root. */
function categoryIdFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get("ca");
}

/** Write the current category id to the URL, pushing a new history entry or replacing it. */
function syncUrl(categoryId: string | null, push: boolean) {
  const url = categoryId
    ? `${window.location.pathname}?ca=${encodeURIComponent(categoryId)}`
    : window.location.pathname;
  const state = { ca: categoryId };
  if (push) window.history.pushState(state, "", url);
  else window.history.replaceState(state, "", url);
}

export function useContentBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [path, setPath] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the content for a given breadcrumb path and apply it. The deepest entry is the
  // open category (null/empty = learning-hub root). Does not touch the URL itself.
  async function loadPath(newPath: Category[]) {
    const cat = newPath[newPath.length - 1] ?? null;
    setLoading(true);
    setError("");
    try {
      if (!cat) {
        setCategories(await listLearningHubs());
        setLessons([]);
      } else {
        const [children, ls] = await Promise.all([
          getChildCategories(cat.id),
          listLessonsByCategory(cat.id),
        ]);
        setCategories(children);
        setLessons(ls);
      }
      setPath(newPath);
    } catch (e) {
      setError(msg(e));
    } finally {
      setLoading(false);
    }
  }

  function goHome() {
    syncUrl(null, true);
    return loadPath([]);
  }

  function openCategory(cat: Category) {
    syncUrl(cat.id, true);
    return loadPath([...path, cat]);
  }

  /** Navigate to an ancestor in the breadcrumb (path index): keep [root … target]. */
  function goToDepth(index: number) {
    const target = path[index];
    if (!target) return goHome();
    syncUrl(target.id, true);
    return loadPath(path.slice(0, index + 1));
  }

  /** Reload the current category's lessons (after a create/edit/delete). */
  async function reloadLessons() {
    const cat = path[path.length - 1];
    if (!cat) return;
    try {
      setLessons(await listLessonsByCategory(cat.id));
    } catch (e) {
      setError(msg(e));
    }
  }

  /** Reload the visible category list — child categories, or learning hubs at the root
   *  (after creating a new category/learning hub). */
  async function reloadCategories() {
    const cat = path[path.length - 1];
    try {
      setCategories(cat ? await getChildCategories(cat.id) : await listLearningHubs());
    } catch (e) {
      setError(msg(e));
    }
  }

  /** Update one category in the currently displayed list (e.g. after an edit). */
  function updateCategory(updated: Category) {
    setCategories((cs) => cs.map((c) => (c.id === updated.id ? updated : c)));
    setPath((p) => p.map((c) => (c.id === updated.id ? updated : c)));
  }

  // Restore the navigation from the URL on first load, and follow browser back/forward
  // (popstate) afterwards. Both rebuild the full path from the ?ca id without writing
  // the URL (the URL is already where it should be).
  useEffect(() => {
    async function restoreFromUrl() {
      const id = categoryIdFromUrl();
      if (!id) {
        await loadPath([]);
        return;
      }
      const catPath = await getCategoryPath(id);
      await loadPath(catPath);
      // If the id was stale (category gone), reflect the fallback-to-root in the URL.
      if (catPath.length === 0) syncUrl(null, false);
    }
    // Ensure the initial entry carries a state object so the first back press is handled.
    syncUrl(categoryIdFromUrl(), false);
    restoreFromUrl();
    window.addEventListener("popstate", restoreFromUrl);
    return () => window.removeEventListener("popstate", restoreFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    reloadLessons,
    reloadCategories,
    updateCategory,
  };
}
