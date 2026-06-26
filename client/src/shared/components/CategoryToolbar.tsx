// Bottom toolbar for the category view. Rendered only for admins/moderators, who
// get the editing tools. It sits in the normal flow below the canvas, which
// shortens the canvas container and is therefore accounted for automatically by
// the canvas scaling (useCanvasLayout measures the container, not the window).
interface Props {
  moveMode: boolean;
  onToggleMove: () => void;
  onSendImprovement: () => void;
}

export default function CategoryToolbar({ moveMode, onToggleMove, onSendImprovement }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-neutral-700 bg-neutral-800 px-4 py-2">
      <button
        onClick={onToggleMove}
        aria-pressed={moveMode}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
          moveMode ? "bg-red-600 text-white hover:bg-red-500" : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
        }`}
      >
        ✋ Lektionen verschieben{moveMode ? " (aktiv)" : ""}
      </button>

      <div className="flex-1" />

      <button
        onClick={onSendImprovement}
        className="rounded-lg bg-neutral-700 px-3 py-1.5 text-sm font-medium text-neutral-200 hover:bg-neutral-600"
      >
        💡 Verbesserung senden
      </button>
    </div>
  );
}
