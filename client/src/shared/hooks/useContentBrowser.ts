// Browsing behaviour for the learning content tree, shared by the visually separate
// desktop and mobile views: learning hubs -> child categories + lessons -> contents.
import { useEffect, useState } from "react";
import {
  listLearningHubs,
  getChildCategories,
  listLessonsByCategory,
  listContentsByLesson,
} from "../services/objectApi";
import type { Category, Lesson, Content } from "../types";

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export function useContentBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [path, setPath] = useState<Category[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function goHome() {
    setLoading(true);
    setError("");
    setSelectedLesson(null);
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
    setSelectedLesson(null);
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

  async function openLesson(lesson: Lesson) {
    setSelectedLesson(lesson);
    setLoading(true);
    setError("");
    try {
      setContents(await listContentsByLesson(lesson.id));
    } catch (e) {
      setError(msg(e));
    } finally {
      setLoading(false);
    }
  }

  function closeLesson() {
    setSelectedLesson(null);
    setContents([]);
  }

  /** Update one category in the currently displayed list (e.g. after an edit). */
  function updateCategory(updated: Category) {
    setCategories((cs) => cs.map((c) => (c.id === updated.id ? updated : c)));
    setPath((p) => p.map((c) => (c.id === updated.id ? updated : c)));
  }

  useEffect(() => {
    goHome();
  }, []);

  return {
    categories,
    lessons,
    path,
    selectedLesson,
    contents,
    loading,
    error,
    goHome,
    openCategory,
    openLesson,
    closeLesson,
    updateCategory,
  };
}
