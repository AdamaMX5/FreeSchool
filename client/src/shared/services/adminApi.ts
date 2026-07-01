// AuthService admin client (https://auth.freischule.info/admin) — ADMIN-only user and
// role management. This UI previously talked to the removed FreeSchool backend; issue
// #19 moved it to the AuthService, which owns users / roles / permissions. Every request
// carries the ADMIN access token via authFetch; the AuthService enforces the ADMIN role
// server-side (the client-side gating is convenience only, not the security boundary).
import { AUTH_BASE_URL } from "../config";
import type { AdminUser, Role } from "../types";
import { authFetch } from "./authFetch";

/** All assignable roles, in display order (mirrors the Role union in types.ts). */
export const ALL_ROLES: Role[] = [
  "STUDENT",
  "TEACHER",
  "TUTOR",
  "PROJECTMANAGER",
  "SCHOOLDIRECTOR",
  "MODERATOR",
  "ADMIN",
];

/** Pull the user array out of whatever envelope AuthService wraps it in. */
function extractUsers(body: unknown): Record<string, unknown>[] {
  if (Array.isArray(body)) return body as Record<string, unknown>[];
  if (body && typeof body === "object") {
    for (const key of ["users", "data", "items", "results"]) {
      const value = (body as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value as Record<string, unknown>[];
    }
  }
  return [];
}

function mapUser(u: Record<string, unknown>): AdminUser {
  const perms = u.permissions;
  return {
    id: Number(u.id ?? 0),
    email: String(u.email ?? ""),
    // Keep only known roles, so an unexpected server value can't reach the role UI.
    roles: Array.isArray(u.roles)
      ? (u.roles as unknown[]).filter((r): r is Role => ALL_ROLES.includes(r as Role))
      : [],
    permissions: perms && typeof perms === "object" ? (perms as Record<string, unknown>) : {},
    is_email_verify: Boolean(u.is_email_verify),
    last_login: u.last_login ? String(u.last_login) : null,
    // Keep the untouched document so the JSON export reflects AuthService exactly.
    raw: u,
  };
}

// Per-user fields that must never be written to a downloaded file (password hashes,
// token material). AuthService is the boundary and should already omit these, but the
// client-side export strips them defensively so secrets can't leak into a .json on disk.
const SENSITIVE_EXPORT_KEYS = [
  "hashed_password",
  "password",
  "refresh_token",
  "refresh_tokens",
  "csrf_token",
  "reset_token",
  "verify_token",
];

/** The user's raw server object minus sensitive fields, for the client-side JSON export. */
export function userExportRecord(user: AdminUser): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(user.raw).filter(([key]) => !SENSITIVE_EXPORT_KEYS.includes(key))
  );
}

/** All users with full data (AuthService GET /admin/users). Requires an ADMIN JWT. */
export async function listUsers(): Promise<AdminUser[]> {
  const res = await authFetch(`${AUTH_BASE_URL}/admin/users`);
  if (!res.ok) throw new Error(`AuthService ${res.status}`);
  return extractUsers(await res.json()).map(mapUser);
}

/**
 * Replace a user's entire role set (AuthService POST /admin/set_roles). The endpoint
 * overwrites all roles wholesale ("Alle Rollen eines Nutzers ersetzen"), so `roles`
 * must be the complete desired set, not a delta. Requires an ADMIN JWT (enforced
 * server-side by the AuthService).
 */
export async function setUserRoles(userId: number, roles: Role[]): Promise<void> {
  const res = await authFetch(`${AUTH_BASE_URL}/admin/set_roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, roles }),
  });
  if (!res.ok) throw new Error(`AuthService ${res.status}`);
}
