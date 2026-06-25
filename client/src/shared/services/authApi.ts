// AuthService client (https://auth.freischule.info) — ported from the Svelte app.
// Email-first login flow + short-lived access token with silent refresh via the
// HttpOnly refresh cookie + CSRF token.
import { AUTH_BASE_URL } from "../config";
import type { AuthSession, JwtPayload } from "../types";
import { getSession, setSession, clearSession } from "./session";

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
}

export function isExpired(token: string | null | undefined, skewSeconds = 30): boolean {
  if (!token || token.trim() === "") return true;
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now + skewSeconds;
}

export function getCookie(name: string): string {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : "";
}

function deviceFingerprint(): string {
  const raw = `${navigator.userAgent}|${navigator.language}|${screen.width}x${screen.height}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return `fp_${Math.abs(hash)}`;
}

function deviceName(): string {
  return navigator.userAgent.slice(0, 120);
}

async function parseError(res: Response): Promise<string> {
  const data = await res.json().catch(() => ({}));
  const detail = (data as { detail?: unknown })?.detail;
  if (Array.isArray(detail)) return detail.map((d: { msg?: string }) => d.msg).join(", ");
  return (detail as string) || `HTTP ${res.status}`;
}

export async function checkEmail(email: string): Promise<"login" | "register"> {
  const res = await fetch(`${AUTH_BASE_URL}/user/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return data.status === "register" ? "register" : "login";
}

export async function login(email: string, password: string): Promise<AuthSession> {
  const res = await fetch(`${AUTH_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      device_fingerprint: deviceFingerprint(),
      device_name: deviceName(),
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function registerComplete(
  email: string,
  password: string,
  repassword: string
): Promise<AuthSession> {
  const res = await fetch(`${AUTH_BASE_URL}/user/register-complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      repassword,
      device_fingerprint: deviceFingerprint(),
      device_name: deviceName(),
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function refresh(): Promise<string | null> {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/user/refresh`, {
      method: "POST",
      headers: { "X-CSRF-Token": getCookie("csrf_token") },
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await fetch(`${AUTH_BASE_URL}/user/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).catch(() => {});
}

/** Persist a full session payload (from login / register). */
export function applySession(session: AuthSession): void {
  const payload = decodeJwt(session.access_token);
  const roles = session.roles ?? payload?.roles ?? [];
  setSession({
    id: session.id,
    email: session.email,
    accessToken: session.access_token,
    roles,
    permissions: payload?.permissions ?? {},
  });
}

/** Rebuild the session from a refreshed access token (no full payload). */
export function applyToken(token: string): void {
  const payload = decodeJwt(token);
  if (!payload) return;
  const prev = getSession();
  setSession({
    id: payload.sub ? Number(payload.sub) : prev.id,
    email: payload.email ?? prev.email,
    accessToken: token,
    roles: payload.roles ?? [],
    permissions: payload.permissions ?? {},
  });
}

/** Ensure a valid access token exists, refreshing via cookie if needed. */
export async function ensureValidToken(): Promise<boolean> {
  const token = getSession().accessToken;
  if (token && !isExpired(token)) return true;
  const newToken = await refresh();
  if (!newToken) {
    clearSession();
    return false;
  }
  applyToken(newToken);
  return true;
}
