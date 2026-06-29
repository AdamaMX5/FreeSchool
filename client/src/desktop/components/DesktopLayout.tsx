// Desktop shell. Mirrors the Svelte layout:
//   - top header: hamburger (toggles the sidebar), home + breadcrumb path, login
//   - left sidebar (200px, collapsible): the category menu (hubs / child categories)
//   - main area: the start page while nothing is selected, otherwise the lesson canvas
//   - bottom toolbar (admins/moderators): new category | lesson tools | send improvement
// All cross-cutting state (navigation, sidebar, edit modes, modals) lives here so the
// header/sidebar/main/toolbar can stay presentational.
import { useCallback, useEffect, useRef, useState } from "react";
import { useContentBrowser } from "../../shared/hooks/useContentBrowser";
import { useAuth } from "../../shared/context/AuthContext";
import CategoryCanvas from "../../shared/components/CategoryCanvas";
import CategoryEditModal from "../../shared/components/CategoryEditModal";
import CreateCategoryModal from "../../shared/components/CreateCategoryModal";
import LessonEditModal from "../../shared/components/LessonEditModal";
import SendImprovementModal from "../../shared/components/SendImprovementModal";
import type { Category, Lesson } from "../../shared/types";
import DesktopHeader from "./DesktopHeader";
import CategorySidebar from "./CategorySidebar";
import DesktopToolbar from "./DesktopToolbar";
import StartPage from "../views/StartPage";

export default function DesktopLayout() {
  const b = useContentBrowser();
  const { canManageCategories } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [moveMode, setMoveMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [creatingLesson, setCreatingLesson] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [improving, setImproving] = useState(false);

  // Original image size, captured from the canvas; only needed when placing a new lesson.
  const natural = useRef({ w: 0, h: 0 });
  const onNaturalSize = useCallback((w: number, h: number) => {
    natural.current = { w, h };
  }, []);

  const current = b.currentCategory;

  // Reset transient modes/modals when navigating to another category (or back home),
  // so a stale modal can't point at a lesson from the previous category.
  useEffect(() => {
    setMoveMode(false);
    setEditMode(false);
    setCreatingLesson(false);
    setEditingLesson(null);
  }, [current?.id]);

  // Move and edit are mutually exclusive.
  const toggleMove = () => {
    setMoveMode((m) => !m);
    setEditMode(false);
  };
  const toggleEdit = () => {
    setEditMode((e) => !e);
    setMoveMode(false);
  };

  // Centre of the original image (with a small cascade so successive new lessons don't
  // land exactly on top of each other), or a default before the image has loaded.
  const newLessonPosition = () => {
    const cascade = (b.lessons.length % 6) * 24;
    return natural.current.w > 0
      ? {
          x: Math.round(natural.current.w / 2) + cascade,
          y: Math.round(natural.current.h / 2) + cascade,
        }
      : { x: 20 + cascade, y: 20 + cascade };
  };

  return (
    <div className="h-full bg-neutral-900 text-neutral-100">
      <DesktopHeader
        path={b.path}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        onHome={b.goHome}
        onGoToDepth={b.goToDepth}
      />

      {/* Left sidebar: the category menu (collapsible). */}
      {sidebarOpen && (
        <aside className="scrollbar-hide fixed bottom-14 left-0 top-14 z-40 w-[200px] overflow-y-auto border-r border-neutral-700 bg-neutral-900">
          <CategorySidebar
            categories={b.categories}
            loading={b.loading}
            canEdit={canManageCategories}
            onOpen={b.openCategory}
            onEdit={setEditingCategory}
          />
        </aside>
      )}

      {/* Main area: gets the rest of the screen between sidebar and toolbar. */}
      <main
        className={`fixed bottom-14 right-0 top-14 overflow-auto transition-[left] ${
          sidebarOpen ? "left-[200px]" : "left-0"
        }`}
      >
        {b.error && <div className="p-3 text-red-400">{b.error}</div>}
        {current ? (
          <div className="h-full w-full p-2">
            <CategoryCanvas
              category={current}
              lessons={b.lessons}
              moveMode={moveMode}
              editMode={editMode}
              canManageContent={canManageCategories}
              onEditLesson={setEditingLesson}
              onNaturalSize={onNaturalSize}
              openContent={b.openContent}
              onOpenContent={b.selectContent}
              onCloseContent={b.closeContent}
            />
          </div>
        ) : (
          <StartPage />
        )}
      </main>

      {/* Bottom toolbar for admins/moderators. */}
      {canManageCategories && (
        <DesktopToolbar
          inCategory={!!current}
          moveMode={moveMode}
          editMode={editMode}
          addCategoryLabel={current ? "Neue Kategorie" : "Neues Lernbüro"}
          onAddCategory={() => setCreatingCategory(true)}
          onToggleMove={toggleMove}
          onToggleEdit={toggleEdit}
          onAddLesson={() => setCreatingLesson(true)}
          onSendImprovement={() => setImproving(true)}
        />
      )}

      {/* Modals */}
      {creatingCategory && (
        <CreateCategoryModal
          parent={current}
          onClose={() => setCreatingCategory(false)}
          onCreated={b.reloadCategories}
        />
      )}

      {editingCategory && (
        <CategoryEditModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSaved={b.updateCategory}
          onDeleted={() => b.removeCategory(editingCategory)}
        />
      )}

      {creatingLesson && current && (
        <LessonEditModal
          mode="create"
          category={current}
          defaultPosition={newLessonPosition()}
          defaultOrder={String(b.lessons.length + 1)}
          onClose={() => setCreatingLesson(false)}
          onSaved={b.reloadLessons}
        />
      )}

      {editingLesson && current && (
        <LessonEditModal
          mode="edit"
          category={current}
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onSaved={b.reloadLessons}
        />
      )}

      {improving && current && (
        <SendImprovementModal categoryName={current.name} onClose={() => setImproving(false)} />
      )}
    </div>
  );
}
