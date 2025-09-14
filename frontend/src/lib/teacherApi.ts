import { user } from "./global";
import { get } from "svelte/store"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTeachersAll() {
  try {
    const jwt = get(user)?.jwt;
    const res = await fetch(`${API_BASE_URL}/teacher/all/`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.warn("Fehler beim Laden der Lehrerliste:", data.error);
      throw new Error(data.error || "Fehler beim Laden der Lehrer");
    }
  } catch (e) {
    console.error("Netzwerkfehler beim Laden der Lehrer:", e);
    throw e;
  }
}