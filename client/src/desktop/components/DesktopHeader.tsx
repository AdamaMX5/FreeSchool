// Top header (desktop): hamburger to toggle the category sidebar, the home button
// followed by the breadcrumb path, and the login menu on the right. While no learning
// hub is open the breadcrumb shows "FreeSchool"; once a category is active only the
// category path is shown.
import LoginMenu from "./LoginMenu";
import type { Category } from "../../shared/types";

interface Props {
  path: Category[];
  onToggleSidebar: () => void;
  onHome: () => void;
  onGoToDepth: (index: number) => void;
}

export default function DesktopHeader({ path, onToggleSidebar, onHome, onGoToDepth }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-2 border-b border-neutral-700 bg-neutral-800 px-3">
      <button
        onClick={onToggleSidebar}
        title="Menü ein-/ausblenden"
        aria-label="Menü ein-/ausblenden"
        className="rounded px-2 py-1 text-xl leading-none hover:bg-neutral-700"
      >
        ☰
      </button>

      <nav className="flex min-w-0 flex-1 items-center gap-1 text-sm text-neutral-300">
        <button onClick={onHome} title="Startseite" aria-label="Startseite" className="rounded px-1 hover:text-white">
          🏠
        </button>
        {path.length === 0 ? (
          <span className="font-semibold text-white">FreeSchool</span>
        ) : (
          path.map((c, i) => (
            <span key={c.id} className="flex min-w-0 items-center gap-1">
              <span className="text-neutral-600">›</span>
              {i === path.length - 1 ? (
                <span className="truncate font-semibold text-white">{c.name}</span>
              ) : (
                <button onClick={() => onGoToDepth(i)} className="truncate hover:text-white">
                  {c.name}
                </button>
              )}
            </span>
          ))
        )}
      </nav>

      <LoginMenu />
    </header>
  );
}
