import { user } from "./global";
import { get } from "svelte/store"

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
  const jwt = get(user)?.jwt;
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const res = await fetch(`${API_BASE_URL}/lesson/by_category/${category_id}`, {
    method: "GET",
    headers
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Laden der Lessons");
  return result;
}

// POST - Create new Lesson
export async function postLesson(lessonData: Omit<LessonDto, 'id'>): Promise<LessonDto> {
  const jwt = get(user)?.jwt;
  if (!jwt) throw new Error("Nicht autorisiert");

  const res = await fetch(`${API_BASE_URL}/lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify(lessonData)
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Erstellen der Lesson");
  return result;
}

// PUT - Update Lesson
export async function putLesson(lesson_id: string, lessonData: LessonDto): Promise<LessonDto> {
  const jwt = get(user)?.jwt;
  if (!jwt) throw new Error("Nicht autorisiert");

  const res = await fetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify(lessonData)
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Aktualisieren der Lesson");
  return result;
}

// PUT - Update Lesson Position
export async function updateLessonPosition(lesson_id: string, position: { x: number; y: number }): Promise<LessonDto> {
  const jwt = get(user)?.jwt;
  if (!jwt) throw new Error("Nicht autorisiert");

  // Zuerst die aktuelle Lesson laden
  const currentLessonRes = await fetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    }
  });

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

  const res = await fetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify(updatedLesson)
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Fehler beim Aktualisieren der Lesson");
  }
  
  return await res.json();
}

// DELETE - Delete Lesson
export async function deleteLesson(lesson_id: string): Promise<{detail: string}> {
  const jwt = get(user)?.jwt;
  if (!jwt) throw new Error("Nicht autorisiert");

  const res = await fetch(`${API_BASE_URL}/lesson/${lesson_id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${jwt}`,
    }
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Löschen der Lesson");
  return result;
}
