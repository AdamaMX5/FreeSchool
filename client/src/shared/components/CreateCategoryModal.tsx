// Minimal modal to create a category: just a name. A learning hub is created when
// there is no parent (top level), otherwise a sub-category of the given parent.
// Image, parents and children can be set afterwards via the category edit modal.
import { useState } from "react";
import type { Category } from "../types";
import { createCategory } from "../services/objectApi";
import { errMessage as msg } from "../utils/errors";

interface Props {
  /** Parent category, or null to create a top-level learning hub. */
  parent: Category | null;
  onClose: () => void;
  /** Called after the category was created (reload the list). */
  onCreated: () => void;
}

export default function CreateCategoryModal({ parent, onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const title = parent ? "Neue Kategorie" : "Neues Lernbüro";

  async function onSave() {
    setBusy(true);
    setError("");
    try {
      await createCategory(parent, name.trim());
      onCreated();
      onClose();
    } catch (e) {
      setError(msg(e));
      setBusy(false);
    }
  }

  return (
    // No backdrop click-to-close: it would discard entered content. Use ✕ / Abbrechen.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-xl bg-neutral-800 p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-neutral-300">Titel</label>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim() && !busy) onSave();
            }}
            placeholder={parent ? "Name der Kategorie" : "Name des Lernbüros"}
            className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
          />
        </div>

        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}

        <div className="flex justify-end gap-2">
          <button
            disabled={busy}
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:text-white disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            disabled={busy || !name.trim()}
            onClick={onSave}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"
          >
            {busy ? "Erstellt…" : "Erstellen"}
          </button>
        </div>
      </div>
    </div>
  );
}
