// Lets a logged-in user file an improvement issue to the GitService. Loads the
// available repos (FreeSchool preselected), takes a title + description, and posts
// to GitService POST /issue. The current category name is appended to the body for
// context. GitService validates repo/title/body and stores the creator e-mail.
import { useEffect, useState } from "react";
import { listRepos, createIssue, type GitRepo } from "../services/gitApi";

interface Props {
  /** Category name appended to the issue body for context. */
  categoryName: string;
  onClose: () => void;
}

const PREFERRED_REPO = "FreeSchool";

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export default function SendImprovementModal({ categoryName, onClose }: Props) {
  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [repo, setRepo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneUrl, setDoneUrl] = useState("");

  useEffect(() => {
    listRepos()
      .then((rs) => {
        setRepos(rs);
        const preferred = rs.find((r) => r.name === PREFERRED_REPO);
        setRepo(preferred?.name ?? rs[0]?.name ?? "");
      })
      .catch((e) => setError(msg(e)));
  }, []);

  async function onSubmit() {
    if (!repo || !title.trim() || !body.trim()) return;
    setBusy(true);
    setError("");
    try {
      const fullBody = `${body.trim()}\n\n---\n_Eingereicht aus Kategorie: ${categoryName}_`;
      const issue = await createIssue(repo, title.trim(), fullBody, ["improvement"]);
      setDoneUrl(issue.url);
    } catch (e) {
      setError(msg(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-xl bg-neutral-800 p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Verbesserung vorschlagen</h2>
          <button className="text-neutral-400 hover:text-white" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        {doneUrl ? (
          <div className="space-y-4">
            <div className="text-sm text-green-400">Danke! Dein Vorschlag wurde angelegt.</div>
            <a
              href={doneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-red-400 underline hover:text-red-300"
            >
              Issue ansehen ↗
            </a>
            <div className="flex justify-end">
              <button onClick={onClose} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500">
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-neutral-300">Repository</label>
              <select
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
              >
                {repos.length === 0 && <option value="">Lädt…</option>}
                {repos.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-neutral-300">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                placeholder="Kurz und konkret"
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-300">Beschreibung</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                maxLength={8000}
                placeholder="Was sollte verbessert werden?"
                className="w-full resize-y rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-red-400"
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
                disabled={busy || !repo || !title.trim() || !body.trim()}
                onClick={onSubmit}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 disabled:opacity-50"
              >
                {busy ? "Senden…" : "Absenden"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
