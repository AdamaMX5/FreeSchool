import { authFetch } from "./authApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LessonDto {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  order?: string;
  position_x: number;
  position_y: number;
  contents: string[];
  progress?: number;
}

// GET - Lessons by Category
export async function getLessonsByCategory(category_id: string): Promise<LessonDto[]> {
  // authFetch sends the bearer token only when logged in and refreshes it on 401.
  const res = await authFetch(`${API_BASE_URL}/lesson/by_category/${category_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Laden der Lessons");
  return result;
}

// POST - Create new Lesson
export async function postLesson(lessonData: Omit<LessonDto, 'id'>): Promise<LessonDto> {
  const res = await authFetch(`${API_BASE_URL}/lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData)
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Erstellen der Lesson");
  return result;
}

// PUT - Update Lesson
export async function putLesson(lesson_id: string, lessonData: LessonDto): Promise<LessonDto> {
  const res = await authFetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData)
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Aktualisieren der Lesson");
  return result;
}

// PUT - Update Lesson Position
export async function updateLessonPosition(lesson_id: string, position: { x: number; y: number }): Promise<LessonDto> {
  // Zuerst die aktuelle Lesson laden
  const currentLessonRes = await authFetch(`${API_BASE_URL}/lesson/${lesson_id}`, {});

  if (!currentLessonRes.ok) {
    throw new Error("Fehler beim Laden der Lesson");
  }

  const currentLesson = await currentLessonRes.json();

  // Dann mit aktualisierter Position speichern
  const updatedLesson = {
    ...currentLesson,
    position_x: position.x,
    position_y: position.y
  };
  const res = await authFetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedLesson)
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Aktualisieren der Lesson");
  return result;
}

// DELETE - Delete Lesson
export async function deleteLesson(lesson_id: string): Promise<{detail: string}> {
  const res = await authFetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "DELETE"
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Löschen der Lesson");
  return result;
}
