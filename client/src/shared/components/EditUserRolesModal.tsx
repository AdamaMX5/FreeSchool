// Edit a single user's roles — the React replacement for the old Svelte EditUserDialog.
// A checkbox per role; saving replaces the user's whole role set via AuthService
// POST /admin/set_roles. Reachable only from AdminUsersModal (ADMIN-only).
import { useState } from "react";
import type { AdminUser, Role } from "../types";
import { ALL_ROLES, setUserRoles } from "../services/adminApi";
import { useAuth } from "../context/AuthContext";
import { errMessage as msg } from "../utils/errors";

interface Props {
  user: AdminUser;
  onClose: () => void;
  /** Report the saved role set so the list can update without a full reload. */
  onSaved: (userId: number, roles: Role[]) => void;
}

export default function EditUserRolesModal({ user, onClose, onSaved }: Props) {
  const { user: current } = useAuth();
  const [roles, setRoles] = useState<Role[]>(user.roles);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function toggle(role: Role) {
    setRoles((rs) => (rs.includes(role) ? rs.filter((r) => r !== role) : [...rs, role]));
  }

  async function onSubmit() {
    // set_roles replaces the whole set, so guard the two irreversible-feeling cases:
    // stripping every role, and admins locking themselves out of the admin area.
    if (roles.length === 0 && !window.confirm(`„${user.email}" alle Rollen entziehen?`)) return;
    const removingOwnAdmin =
      current.id === user.id && user.roles.includes("ADMIN") && !roles.includes("ADMIN");
    if (removingOwnAdmin && !window.confirm("Du entziehst dir selbst die ADMIN-Rolle. Fortfahren?"))
      return;
    setBusy(true);
    setError("");
    try {
      await setUserRoles(user.id, roles);
      onSaved(user.id, roles);
      onClose();
    } catch (e) {
      setError(msg(e));
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-xl bg-neutral-800 p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Rollen bearbeiten</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        <p className="mb-3 truncate text-sm text-neutral-400">{user.email}</p>

        <div className="grid grid-cols-2 gap-2">
          {ALL_ROLES.map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => toggle(role)}
                className="h-4 w-4 accent-red-500"
              />
              {role}
            </label>
          ))}
        </div>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            disabled={busy}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:text-white disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            disabled={busy}
            onClick={onSubmit}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"
          >
            {busy ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
