// Framework-agnostic session store (in-memory + localStorage) so non-React modules
// (authFetch, objectApi) can read the access token, while React subscribes for re-render.
import type { SessionUser } from "../types";

const EMPTY: SessionUser = { id: 0, email: "", accessToken: "", roles: [], permissions: {} };

const listeners = new Set<() => void>();
let current: SessionUser = load();

function load(): SessionUser {
  try {
    const jwt = localStorage.getItem("user.jwt") ?? "";
    if (!jwt) return { ...EMPTY };
    return {
      id: Number(localStorage.getItem("user.id")) || 0,
      email: localStorage.getItem("user.email") ?? "",
      accessToken: jwt,
      roles: JSON.parse(localStorage.getItem("user.roles") ?? "[]"),
      permissions: JSON.parse(localStorage.getItem("user.permissions") ?? "{}"),
    };
  } catch {
    return { ...EMPTY };
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function getSession(): SessionUser {
  return current;
}

export function getAccessToken(): string {
  return current.accessToken;
}

export function setSession(user: SessionUser): void {
  current = user;
  localStorage.setItem("user.id", String(user.id));
  localStorage.setItem("user.email", user.email);
  localStorage.setItem("user.jwt", user.accessToken);
  localStorage.setItem("user.roles", JSON.stringify(user.roles));
  localStorage.setItem("user.permissions", JSON.stringify(user.permissions));
  emit();
}

export function clearSession(): void {
  current = { ...EMPTY };
  ["user.id", "user.email", "user.jwt", "user.roles", "user.permissions"].forEach((k) =>
    localStorage.removeItem(k)
  );
  emit();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
