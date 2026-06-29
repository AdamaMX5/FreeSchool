// src/lib/authApi.ts
// Central client for the AuthService (https://auth.freischule.info).
// Handles login / registration / logout, JWT decoding and silent refresh
// of short-lived access tokens via the HttpOnly refresh cookie + CSRF token.
import { get } from 'svelte/store';
import { user, setUser, unsetUser, type Role } from './global';

const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL || 'https://auth.freischule.info';

export interface AuthSession {
  id: number;
  email: string;
  roles: Role[];
  access_token: string;
  status: string;
  last_login?: string;
}

export interface JwtPayload {
  sub?: string;
  email?: string;
  roles?: Role[];
  permissions?: Record<string, unknown>;
  exp?: number;
}

// --- helpers ---------------------------------------------------------------

/** Decode the payload of a JWT without verifying the signature (display only). */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
}

/** True if the token is missing, malformed or expired (incl. a safety skew). */
export function isExpired(token: string | null | undefined, skewSeconds = 30): boolean {
  if (!token || token.trim() === '') return true;
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now + skewSeconds;
}

/** Read a non-HttpOnly cookie value by name (used for the CSRF token). */
export function getCookie(name: string): string {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : '';
}

function deviceFingerprint(): string {
  // Lightweight, non-PII fingerprint sufficient for device labelling.
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
  const detail = data?.detail;
  if (Array.isArray(detail)) return detail.map((d: { msg?: string }) => d.msg).join(', ');
  return detail || `HTTP ${res.status}`;
}

// --- public auth endpoints -------------------------------------------------

/** Email-first step: tells whether the email belongs to login or register. */
export async function checkEmail(email: string): Promise<'login' | 'register'> {
  const res = await fetch(`${AUTH_BASE_URL}/user/check-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return data.status === 'register' ? 'register' : 'login';
}

export async function login(email: string, password: string): Promise<AuthSession> {
  const res = await fetch(`${AUTH_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      device_fingerprint: deviceFingerprint(),
      device_name: deviceName()
    })
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
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      repassword,
      device_fingerprint: deviceFingerprint(),
      device_name: deviceName()
    })
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

// Shared in-flight refresh: when several requests notice an expired token at
// once, they must not each POST /user/refresh. The AuthService rotates the
// refresh cookie on every call, so concurrent refreshes would invalidate each
// other and log the user out. Funnelling them through one promise fixes that.
let inflightRefresh: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/user/refresh`, {
      method: 'POST',
      headers: { 'X-CSRF-Token': getCookie('csrf_token') },
      credentials: 'include'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Silent refresh: exchanges the HttpOnly refresh cookie (+ CSRF token) for a
 * fresh access token. Returns the new token or null if the session is gone.
 * Concurrent callers share a single in-flight request (see above).
 */
export async function refresh(): Promise<string | null> {
  if (!inflightRefresh) {
    inflightRefresh = doRefresh().finally(() => {
      inflightRefresh = null;
    });
  }
  return inflightRefresh;
}

export async function logout(): Promise<void> {
  await fetch(`${AUTH_BASE_URL}/user/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).catch(() => {});
}

export async function logoutAll(): Promise<void> {
  const token = get(user)?.jwt;
  await fetch(`${AUTH_BASE_URL}/user/logout-all`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include'
  }).catch(() => {});
}

// --- session helpers used by views / api libs ------------------------------

/** Write a session into the store and localStorage (single source of truth). */
function persistSession(
  id: number,
  email: string,
  token: string,
  roles: Role[],
  permissions?: Record<string, unknown>
): void {
  setUser(id, email, token, roles, permissions);
  localStorage.setItem('user.id', String(id));
  localStorage.setItem('user.email', email);
  localStorage.setItem('user.jwt', token);
  localStorage.setItem('user.roles', JSON.stringify(roles));
}

/** Persist a full session payload (from login/register). */
export function applySession(session: AuthSession): void {
  const payload = decodeJwt(session.access_token);
  const roles = session.roles ?? payload?.roles ?? [];
  persistSession(session.id, session.email, session.access_token, roles, payload?.permissions);
}

/** Rebuild the store from a refreshed access token (no full session payload). */
function applyToken(token: string): void {
  const payload = decodeJwt(token);
  if (!payload) return;
  const id = payload.sub ? Number(payload.sub) : get(user)?.id ?? 0;
  const email = payload.email ?? get(user)?.email ?? '';
  const roles = payload.roles ?? [];
  persistSession(id, email, token, roles, payload.permissions);
}

export function clearSession(): void {
  unsetUser();
  localStorage.removeItem('user.jwt');
  localStorage.removeItem('user.id');
  localStorage.removeItem('user.email');
  localStorage.removeItem('user.roles');
}

/**
 * Ensures a valid access token exists, refreshing via cookie if the stored one
 * is missing/expired. Returns true if the user ends up authenticated.
 */
export async function ensureValidToken(): Promise<boolean> {
  const current = get(user)?.jwt;
  if (current && !isExpired(current)) return true;
  const token = await refresh();
  if (!token) {
    clearSession();
    return false;
  }
  applyToken(token);
  return true;
}

/**
 * fetch wrapper that attaches the bearer access token and transparently
 * refreshes it once on a 401 before retrying. URL-agnostic: works for any
 * backend that trusts the AuthService-issued RS256 JWT.
 */
export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const buildInit = (token: string | undefined): RequestInit => ({
    ...init,
    headers: token
      ? { ...(init.headers ?? {}), Authorization: `Bearer ${token}` }
      : { ...(init.headers ?? {}) }
  });

  let token = get(user)?.jwt;

  // Proactive refresh: the 15-min access token expires while the tab stays open,
  // so a stored-but-expired token would otherwise guarantee a 401 on the next
  // request (e.g. adding content). Refresh up front instead of failing first.
  if (token && isExpired(token)) {
    const refreshed = await refresh();
    if (refreshed) {
      applyToken(refreshed);
      token = get(user)?.jwt;
    }
  }

  let res = await fetch(input, buildInit(token));
  if (res.status !== 401) return res;

  // Reactive fallback: an unexpected 401 (e.g. token revoked) – refresh once and retry.
  const newToken = await refresh();
  if (!newToken) {
    clearSession();
    return res;
  }
  applyToken(newToken);
  token = get(user)?.jwt;
  res = await fetch(input, buildInit(token));
  return res;
}
