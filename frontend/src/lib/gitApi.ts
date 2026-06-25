import { authFetch } from "./authApi";

const GIT_SERVICE_URL = import.meta.env.VITE_GIT_SERVICE_URL;

export interface RepoDto {
  name: string;
  fullName: string;
  url: string;
}

export async function getRepos(): Promise<RepoDto[]> {
  try {
    const res = await authFetch(`${GIT_SERVICE_URL}/repos`, {});
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    return res.json();
  } catch (e) {
    console.error("Netzwerkfehler beim Laden der Repositories:", e);
    return [];
  }
}

export async function createIssue(repo: string, title: string, body: string, labels: string[] = []) {
  const res = await authFetch(`${GIT_SERVICE_URL}/issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ repo, title, body, labels })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP-Fehler: ${res.status}`);
  }

  return res.json();
}
