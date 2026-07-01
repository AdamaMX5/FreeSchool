// Admin user management — the React replacement for the old Svelte AdminView. Lists all
// users from the AuthService (GET /admin/users), lets an ADMIN edit a user's roles
// (POST /admin/set_roles, via EditUserRolesModal) and export the list as JSON on the
// client (the AuthService has no export endpoint — the blob is built from the fetched
// users). ADMIN-only; opened from the login menu.
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminUser, Role } from "../types";
import { listUsers, userExportRecord } from "../services/adminApi";
import { errMessage as msg } from "../utils/errors";
import EditUserRolesModal from "./EditUserRolesModal";

interface Props {
  onClose: () => void;
}

export default function AdminUsersModal({ onClose }: Props) {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const load = useCallback(() => {
    setError("");
    listUsers()
      .then(setUsers)
      .catch((e) => setError(msg(e)));
  }, []);

  useEffect(() => load(), [load]);

  // Case-insensitive filter over email (client-side; the full list is already loaded).
  const filtered = useMemo(() => {
    if (!users) return [];
    const q = query.trim().toLowerCase();
    return q ? users.filter((u) => u.email.toLowerCase().includes(q)) : users;
  }, [users, query]);

  // Client-side JSON export from the fetched users (no AuthService export endpoint).
  // Exports the server objects minus sensitive fields (see userExportRecord) so no
  // password hashes / token material land in a file on disk.
  function exportUsers() {
    if (!users) return;
    const blob = new Blob([JSON.stringify(users.map(userExportRecord), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Reflect a saved role change in the list without a full reload.
  function applyRoles(userId: number, roles: Role[]) {
    setUsers((us) => (us ? us.map((u) => (u.id === userId ? { ...u, roles } : u)) : us));
  }

  return (
    // z-[70] so it sits above the login dropdown/sheet (z-[60]) it is opened from.
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-neutral-800 p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Nutzerverwaltung</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nach E-Mail filtern…"
            className="min-w-0 flex-1 rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
          />
          <button
            onClick={load}
            className="rounded-lg bg-neutral-700 px-3 py-2 text-sm font-medium hover:bg-neutral-600"
          >
            Aktualisieren
          </button>
          <button
            onClick={exportUsers}
            disabled={!users || users.length === 0}
            className="rounded-lg bg-neutral-700 px-3 py-2 text-sm font-medium hover:bg-neutral-600 disabled:opacity-50"
          >
            Export (JSON)
          </button>
        </div>

        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}

        <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-neutral-700">
          {users === null ? (
            <div className="p-4 text-sm text-neutral-400">Lädt…</div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-sm text-neutral-500">Keine Nutzer gefunden.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-neutral-900 text-neutral-400">
                <tr>
                  <th className="px-3 py-2 font-medium">E-Mail</th>
                  <th className="px-3 py-2 font-medium">Rollen</th>
                  <th className="px-3 py-2 font-medium">Verifiziert</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t border-neutral-700/70">
                    <td className="max-w-[16rem] truncate px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2 text-neutral-300">
                      {u.roles.length ? u.roles.join(", ") : <span className="text-neutral-600">—</span>}
                    </td>
                    <td className="px-3 py-2">{u.is_email_verify ? "✅" : "—"}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => setEditing(u)}
                        className="rounded-lg bg-neutral-700 px-2.5 py-1 text-xs font-medium hover:bg-neutral-600"
                      >
                        Rollen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-3 shrink-0 text-right text-xs text-neutral-500">
          {users ? `${filtered.length} / ${users.length} Nutzer` : ""}
        </div>
      </div>

      {editing && (
        <EditUserRolesModal
          user={editing}
          onClose={() => setEditing(null)}
          onSaved={applyRoles}
        />
      )}
    </div>
  );
}
