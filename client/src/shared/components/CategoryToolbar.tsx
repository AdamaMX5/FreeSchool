// Bottom toolbar for the category view. Rendered only for admins/moderators, who
// get the editing tools. It sits in the normal flow below the canvas, which
// shortens the canvas container and is therefore accounted for automatically by
// the canvas scaling (useCanvasLayout measures the container, not the window).
//
// Move and edit are mutually exclusive modes (the parent enforces this): move =
// drag lessons, edit = click a lesson to open its edit modal.
interface Props {
  moveMode: boolean;
  editMode: boolean;
  onToggleMove: () => void;
  onToggleEdit: () => void;
  onAddLesson: () => void;
  onSendImprovement: () => void;
}

const toggleClass = (active: boolean) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
    active ? "bg-red-600 text-white hover:bg-red-500" : "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
  }`;

export default function CategoryToolbar({
  moveMode,
  editMode,
  onToggleMove,
  onToggleEdit,
  onAddLesson,
  onSendImprovement,
}: Props) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-neutral-700 bg-neutral-800 px-4 py-2">
      <button onClick={onToggleMove} aria-pressed={moveMode} className={toggleClass(moveMode)}>
        ✋ Verschieben{moveMode ? " (aktiv)" : ""}
      </button>
      <button onClick={onToggleEdit} aria-pressed={editMode} className={toggleClass(editMode)}>
        ✏️ Bearbeiten{editMode ? " (aktiv)" : ""}
      </button>
      <button
        onClick={onAddLesson}
        className="rounded-lg bg-neutral-700 px-3 py-1.5 text-sm font-medium text-neutral-200 hover:bg-neutral-600"
      >
        ＋ Lektion
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
