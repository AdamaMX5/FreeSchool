// ObjectService client (https://object.freischule.info). Reads the FreeSchool data
// migrated by the backend migrator (#16): collections keyed by the legacy id in
// refs.selfId, foreign keys as refs.*. Public reads (isPublic:true) work unauthenticated.
import { OBJECT_BASE_URL } from "../config";
import type { Category, Lesson, Content } from "../types";
import { authFetch } from "./authFetch";

interface ObjectDoc {
  _id?: string;
  id?: string;
  data?: Record<string, unknown>;
  refs?: Record<string, unknown>;
}

function extractList(body: unknown): ObjectDoc[] {
  if (Array.isArray(body)) return body as ObjectDoc[];
  if (body && typeof body === "object") {
    for (const key of ["data", "items", "objects", "results"]) {
      const value = (body as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value as ObjectDoc[];
    }
  }
  return [];
}

function mapCategory(doc: ObjectDoc): Category {
  const d = (doc.data ?? {}) as Record<string, unknown>;
  return {
    id: String(d.legacyId ?? ""),
    name: String(d.name ?? ""),
    background_link: String(d.background_link ?? ""),
    parents: Array.isArray(d.parents) ? (d.parents as string[]) : [],
    children: Array.isArray(d.children) ? (d.children as string[]) : [],
  };
}

/** Learning hubs = categories without parents. */
export async function listLearningHubs(): Promise<Category[]> {
  const res = await authFetch(`${OBJECT_BASE_URL}/objects/categories?limit=100`);
  if (!res.ok) throw new Error(`ObjectService ${res.status}`);
  return extractList(await res.json())
    .map(mapCategory)
    .filter((c) => c.id && c.parents.length === 0);
}

export async function getCategoryBySelfId(selfId: string): Promise<Category | null> {
  const res = await authFetch(
    `${OBJECT_BASE_URL}/objects/categories?ref[selfId]=${encodeURIComponent(selfId)}&limit=1`
  );
  if (!res.ok) return null;
  const docs = extractList(await res.json());
  return docs.length ? mapCategory(docs[0]) : null;
}

function mapLesson(doc: ObjectDoc): Lesson {
  const d = (doc.data ?? {}) as Record<string, unknown>;
  return {
    id: String(d.legacyId ?? ""),
    name: String(d.name ?? ""),
    description: String(d.description ?? ""),
    display_order: String(d.display_order ?? ""),
    position_x: Number(d.position_x ?? 0),
    position_y: Number(d.position_y ?? 0),
  };
}

function mapContent(doc: ObjectDoc): Content {
  const d = (doc.data ?? {}) as Record<string, unknown>;
  const refs = (doc.refs ?? {}) as Record<string, unknown>;
  return {
    id: String(d.legacyId ?? ""),
    language: String(d.language ?? ""),
    text: String(d.text ?? ""),
    youtube_id: String(d.youtube_id ?? ""),
    internal_video: String(d.internal_video ?? ""),
    teacherId: refs.teacherId ? String(refs.teacherId) : undefined,
  };
}

/** Lessons of a category, sorted by display_order (ObjectService has no native sort). */
export async function listLessonsByCategory(categoryId: string): Promise<Lesson[]> {
  const res = await authFetch(
    `${OBJECT_BASE_URL}/objects/lessons?ref[categoryId]=${encodeURIComponent(categoryId)}&limit=100`
  );
  if (!res.ok) throw new Error(`ObjectService ${res.status}`);
  return extractList(await res.json())
    .map(mapLesson)
    .filter((l) => l.id)
    .sort((a, b) => {
      const na = Number(a.display_order);
      const nb = Number(b.display_order);
      if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
      return a.display_order.localeCompare(b.display_order);
    });
}

/** Contents of a lesson. */
export async function listContentsByLesson(lessonId: string): Promise<Content[]> {
  const res = await authFetch(
    `${OBJECT_BASE_URL}/objects/contents?ref[lessonId]=${encodeURIComponent(lessonId)}&limit=100`
  );
  if (!res.ok) throw new Error(`ObjectService ${res.status}`);
  return extractList(await res.json())
    .map(mapContent)
    .filter((c) => c.id);
}

/**
 * Child categories of a category, resolved from its data.children array.
 * NOTE: known N+1 (one request per child) — acceptable for now; revisit with a
 * batch/multi-ref query if categories grow wide.
 */
export async function getChildCategories(parentSelfId: string): Promise<Category[]> {
  const parent = await getCategoryBySelfId(parentSelfId);
  if (!parent || parent.children.length === 0) return [];
  const results = await Promise.all(parent.children.map((id) => getCategoryBySelfId(id)));
  return results.filter((c): c is Category => c !== null);
}
