import { toYoutubeEmbed, isSafeUrl } from "../utils/video";

// Renders a content video: internal video file, embedded YouTube, or a safe link.
export default function VideoEmbed({
  youtubeId,
  internalVideo,
}: {
  youtubeId?: string;
  internalVideo?: string;
}) {
  if (internalVideo && isSafeUrl(internalVideo)) {
    return <video controls src={internalVideo} className="w-full rounded-lg" />;
  }
  if (youtubeId) {
    const embed = toYoutubeEmbed(youtubeId);
    if (embed) {
      return (
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full rounded-lg"
            src={embed}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if (isSafeUrl(youtubeId)) {
      return (
        <a href={youtubeId} target="_blank" rel="noreferrer" className="text-sky-400 underline">
          Video öffnen
        </a>
      );
    }
  }
  return null;
}
