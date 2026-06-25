import { authFetch } from "./authApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function postContent(
  language: string,
  text: string,
  youtube_id: string,
  internal_video: string,
  lesson_id: string,
  teacher_id: string | null
) {
  const res = await authFetch(`${API_BASE_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language, text, youtube_id, internal_video, lesson_id, teacher_id 
    })
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Erstellen des Contents");
  return result;
}