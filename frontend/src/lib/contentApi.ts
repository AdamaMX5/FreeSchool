import { user } from "./global";
import { get } from "svelte/store"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function postContent(
  language: string,
  text: string,
  youtube_id: string,
  internal_video: string,
  lesson_id: number,
  teacher_id: number | null
) {
  const jwt = get(user)?.jwt;
  const res = await fetch(`${API_BASE_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
    body: JSON.stringify({ 
      language, text, youtube_id, internal_video, lesson_id, teacher_id 
    })
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Fehler beim Erstellen des Contents");
  return result;
}