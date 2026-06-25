import type { Content, Lesson } from "../../shared/types";
import Markdown from "../../shared/components/Markdown";
import VideoEmbed from "../../shared/components/VideoEmbed";

// Mobile: a lesson's contents stacked full-width.
export default function ContentView({
  lesson,
  contents,
  loading,
  onBack,
}: {
  lesson: Lesson;
  contents: Content[];
  loading: boolean;
  onBack: () => void;
}) {
  return (
    <div>
      <button onClick={onBack} className="mb-3 text-sm text-neutral-400">
        ← Zurück
      </button>
      <h2 className="mb-1 text-xl font-semibold">{lesson.name}</h2>
      {lesson.description && <p className="mb-4 text-sm text-neutral-400">{lesson.description}</p>}

      {loading ? (
        <div className="text-neutral-400">Lädt…</div>
      ) : contents.length === 0 ? (
        <div className="text-neutral-500">Kein Inhalt vorhanden.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {contents.map((c) => (
            <article key={c.id}>
              <VideoEmbed youtubeId={c.youtube_id} internalVideo={c.internal_video} />
              {c.text && <div className="mt-2"><Markdown text={c.text} /></div>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
