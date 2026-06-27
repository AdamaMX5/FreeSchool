// Left category menu (desktop). Shows the learning hubs at the top level, or the
// child categories of the currently open category. Clicking a card navigates into
// it; moderators/admins get a pencil to edit the card image. Width and collapse are
// owned by the layout shell — this component just fills the given column.
import { categoryBackgroundImage } from "../../shared/utils/css";
import PencilIcon from "../../shared/components/PencilIcon";
import type { Category } from "../../shared/types";

interface Props {
  categories: Category[];
  loading: boolean;
  canEdit: boolean;
  onOpen: (cat: Category) => void;
  onEdit: (cat: Category) => void;
}

export default function CategorySidebar({ categories, loading, canEdit, onOpen, onEdit }: Props) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {loading ? (
        <div className="px-1 text-sm text-neutral-400">Lädt…</div>
      ) : categories.length === 0 ? (
        <div className="px-1 text-sm text-neutral-500">Keine Einträge.</div>
      ) : (
        categories.map((cat) => {
          const bg = categoryBackgroundImage(cat.background_link);
          return (
            <div key={cat.id} className="group relative h-20 overflow-hidden rounded-lg bg-neutral-700 shadow">
              <button onClick={() => onOpen(cat)} className="absolute inset-0 h-full w-full text-left">
                {bg && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 transition group-hover:opacity-90"
                    style={{ backgroundImage: bg }}
                  />
                )}
                <h3 className="absolute inset-x-0 bottom-0 z-10 truncate bg-black/60 px-2 py-1 text-sm font-semibold">
                  {cat.name}
                </h3>
              </button>
              {canEdit && (
                <button
                  onClick={() => onEdit(cat)}
                  title="Bild bearbeiten"
                  aria-label="Bild bearbeiten"
                  className="absolute right-1.5 top-1.5 z-20 rounded-full bg-black/60 p-1.5 text-red-500 opacity-0 transition hover:bg-black/80 hover:text-red-400 group-hover:opacity-100"
                >
                  <PencilIcon />
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
