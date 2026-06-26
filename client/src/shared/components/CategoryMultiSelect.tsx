// Searchable checkbox list to pick a set of categories (by their legacy id), used in
// the category edit modal for the parents and children relationships.
import { useState } from "react";
import type { Category } from "../types";

interface Props {
  label: string;
  options: Category[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function CategoryMultiSelect({ label, options, selected, onChange }: Props) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const filtered = needle
    ? options.filter((o) => (o.name || o.id).toLowerCase().includes(needle))
    : options;

  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-300">
        {label} {selected.length > 0 && <span className="text-neutral-500">({selected.length})</span>}
      </label>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Suchen…"
        className="mb-1 w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-1.5 text-sm outline-none focus:border-red-400"
      />
      <div className="max-h-32 overflow-y-auto rounded-lg border border-neutral-600 bg-neutral-900">
        {filtered.length === 0 ? (
          <div className="p-2 text-sm text-neutral-500">Keine Kategorien</div>
        ) : (
          filtered.map((o) => (
            <label
              key={o.id}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-neutral-700"
            >
              <input
                type="checkbox"
                checked={selected.includes(o.id)}
                onChange={() => toggle(o.id)}
                className="accent-red-600"
              />
              {o.name || o.id}
            </label>
          ))
        )}
      </div>
    </div>
  );
}
