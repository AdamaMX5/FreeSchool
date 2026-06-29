// Edit modal for a category: title, background image, and the parent/children
// relationships. The background image can be supplied three ways, all of which upload
// the bytes to MediaService and yield a MediaService URL:
//   1. pick a file from the computer
//   2. drag & drop a file onto the drop zone
//   3. paste an internet link (mirrored into MediaService)
// Title, parents and children are stored alongside the MediaService link on the
// category document (data.name / data.parents / data.children).
import { useEffect, useRef, useState, type DragEvent } from "react";
import type { Category } from "../types";
import { uploadImageFile, uploadImageFromUrl } from "../services/mediaApi";
import { updateCategoryData, listAllCategories } from "../services/objectApi";
import { cssBackgroundImage } from "../utils/css";
import CategoryMultiSelect from "./CategoryMultiSelect";

interface Props {
  category: Category;
  onClose: () => void;
  onSaved: (updated: Category) => void;
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/** Order-insensitive equality of two id lists. */
function sameIds(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sb = [...b].sort();
  return [...a].sort().every((v, i) => v === sb[i]);
}

export default function CategoryEditModal({ category, onClose, onSaved }: Props) {
  const [name, setName] = useState(category.name);
  // Link currently staged for saving (starts from the existing background).
  const [link, setLink] = useState(category.background_link);
  const [parents, setParents] = useState<string[]>(category.parents);
  const [children, setChildren] = useState<string[]>(category.children);
  const [urlInput, setUrlInput] = useState("");
  const [allCats, setAllCats] = useState<Category[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const preview = cssBackgroundImage(link);
  const dirty =
    name !== category.name ||
    link !== category.background_link ||
    !sameIds(parents, category.parents) ||
    !sameIds(children, category.children);

  // Load the category list for the parent/children pickers (excluding self).
  useEffect(() => {
    listAllCategories()
      .then((cs) => setAllCats(cs.filter((c) => c.id !== category.id)))
      .catch((e) => setError(msg(e)));
  }, [category.id]);

  async function run(task: () => Promise<string>) {
    setBusy(true);
    setError("");
    try {
      setLink(await task());
    } catch (e) {
      setError(msg(e));
    } finally {
      setBusy(false);
    }
  }

  function onPickFile(file: File | undefined) {
    if (file) run(() => uploadImageFile(file));
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (busy) return;
    const file = e.dataTransfer.files?.[0];
    if (file) run(() => uploadImageFile(file));
  }

  function onUploadUrl() {
    const u = urlInput.trim();
    if (u) run(() => uploadImageFromUrl(u));
  }

  async function onSave() {
    setBusy(true);
    setError("");
    try {
      await updateCategoryData(category.docId, { name, background_link: link, parents, children });
      onSaved({ ...category, name, background_link: link, parents, children });
      onClose();
    } catch (e) {
      setError(msg(e));
      setBusy(false);
    }
  }

  return (
    // No backdrop click-to-close: it would discard entered content. Use ✕ / Abbrechen.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-neutral-800 p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Kategorie bearbeiten</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-neutral-300">Titel</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name der Kategorie"
            className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
          />
        </div>

        {/* Live preview of the staged image */}
        <div
          className={`relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition ${
            dragOver ? "border-red-400 bg-neutral-700" : "border-neutral-600 bg-neutral-900"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {preview && (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: preview }} />
          )}
          <span className="relative z-10 rounded bg-black/60 px-3 py-1 text-sm text-neutral-300">
            {busy ? "Lädt hoch…" : "Bild hierher ziehen"}
          </span>
        </div>

        {/* 1) Local file picker */}
        <div className="mb-3">
          <button
            disabled={busy}
            onClick={() => fileInput.current?.click()}
            className="rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-600 disabled:opacity-50"
          >
            📁 Datei vom PC wählen
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0])}
          />
        </div>

        {/* 3) Internet link */}
        <div className="mb-4 flex gap-2">
          <input
            type="url"
            placeholder="https://… Bild-Link"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
          />
          <button
            disabled={busy || !urlInput.trim()}
            onClick={onUploadUrl}
            className="rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-600 disabled:opacity-50"
          >
            Laden
          </button>
        </div>

        {/* Parent / children relationships */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CategoryMultiSelect label="Parents" options={allCats} selected={parents} onChange={setParents} />
          <CategoryMultiSelect label="Children" options={allCats} selected={children} onChange={setChildren} />
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
            disabled={busy || !dirty || !name.trim()}
            onClick={onSave}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
