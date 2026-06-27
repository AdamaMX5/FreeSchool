// Bottom toolbar (desktop), shown only to admins/moderators. Three zones:
//   left   – create a new category / learning hub
//   center – the lesson tools (only inside a category): move, edit, add lesson
//   right  – send an improvement
// All controls are icon buttons with a title tooltip describing what they do.

interface Props {
  /** True when a category is open (enables the lesson tools). */
  inCategory: boolean;
  moveMode: boolean;
  editMode: boolean;
  /** "Neue Kategorie" inside a category, "Neues Lernbüro" at the root. */
  addCategoryLabel: string;
  onAddCategory: () => void;
  onToggleMove: () => void;
  onToggleEdit: () => void;
  onAddLesson: () => void;
  onSendImprovement: () => void;
}

const iconClass = (active = false) =>
  `rounded-lg px-3 py-1.5 text-xl leading-none transition ${
    active ? "bg-red-600 text-white hover:bg-red-500" : "text-neutral-200 hover:bg-neutral-700"
  }`;

export default function DesktopToolbar({
  inCategory,
  moveMode,
  editMode,
  addCategoryLabel,
  onAddCategory,
  onToggleMove,
  onToggleEdit,
  onAddLesson,
  onSendImprovement,
}: Props) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 flex h-14 items-center border-t border-neutral-700 bg-neutral-800 px-3">
      {/* left: new category / learning hub */}
      <div className="flex flex-1 items-center justify-start gap-1">
        <button onClick={onAddCategory} title={addCategoryLabel} aria-label={addCategoryLabel} className={iconClass()}>
          🗂️
        </button>
      </div>

      {/* center: lesson tools (only inside a category) */}
      <div className="flex flex-1 items-center justify-center gap-1">
        {inCategory && (
          <>
            <button
              onClick={onToggleMove}
              aria-pressed={moveMode}
              title="Verschiebemodus"
              aria-label="Verschiebemodus"
              className={iconClass(moveMode)}
            >
              ✋
            </button>
            <button
              onClick={onToggleEdit}
              aria-pressed={editMode}
              title="Bearbeitungsmodus"
              aria-label="Bearbeitungsmodus"
              className={iconClass(editMode)}
            >
              ✏️
            </button>
            <button onClick={onAddLesson} title="Neue Lektion" aria-label="Neue Lektion" className={iconClass()}>
              📖
            </button>
          </>
        )}
      </div>

      {/* right: send improvement */}
      <div className="flex flex-1 items-center justify-end gap-1">
        <button
          onClick={onSendImprovement}
          title="Verbesserung senden"
          aria-label="Verbesserung senden"
          className={iconClass()}
        >
          💡
        </button>
      </div>
    </footer>
  );
}
