import { authFetch } from "./authApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CategoryDto {
  id?: string;
  name: string;
  background_link: string;
  parents: string[];
  children: string[];
}

export async function getCategoryById(id: string | number): Promise<CategoryDto | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/category/${id}`);
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error("Fehler beim Laden der Kategorie:", e);
    return null;
  }
}

export async function getCategoryPath(id: string | number): Promise<CategoryDto[]> {
  const category = await getCategoryById(id);
  if (!category) return [];
  if (!category.parents || category.parents.length === 0) return [category];
  const parentPath = await getCategoryPath(category.parents[0]);
  return [...parentPath, category];
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
    const res = await authFetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    });
    return res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Erstellen einer Kategorie:", e);
    return [];
  }
}
export async function putCategory(category: CategoryDto) {
  try {
    const res = await authFetch(`${API_BASE_URL}/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP-Fehler: ${res.status}`);
    }
    
    return await res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Aktualisieren der Kategorie:", e);
    throw e;
  }
}

export async function deleteCategory(id: number) {
  try {
    const res = await authFetch(`${API_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP-Fehler: ${res.status}`);
    }
    
    return { success: true, id };
  } catch (e) {
    console.error("Netzwerkfehler beim Löschen der Kategorie:", e);
    throw e;
  }
}