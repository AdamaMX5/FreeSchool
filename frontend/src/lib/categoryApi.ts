import { user } from "./global";
import { get } from "svelte/store"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CategoryDto {
  id?: number;
  name: string;
  background_link: string;
  parents: number[];
  children: number[];
}

export async function getLearningHubs() {
  try {
    const res = await fetch(`${API_BASE_URL}/category/asLearningHubs`);
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Laden der Kategorien:", e);
    return [];
  }
}

export async function getChildCategories(id: number){
  try{
    const res = await fetch(`${API_BASE_URL}/category/${id}/children`);
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Laden der Unterkategorien:", e);
    return [];
  }
}

export async function postCategory(category: CategoryDto){
  try {
    const jwt = get(user)?.jwt;
    const res = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(category)
    });
    return res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Erstellen einer Kategorie:", e);
    return [];
  }
}