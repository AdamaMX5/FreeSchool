// Start page shown in the main area while no learning hub is selected. Plain HTML
// content (welcome + intro video); the actual learning hubs live in the left sidebar.
export default function StartPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-10 text-center text-neutral-300">
      <h1 className="mb-6 text-3xl font-semibold text-white">Willkommen in der Freischule</h1>

      <div className="aspect-video w-full max-w-2xl">
        <iframe
          className="h-full w-full rounded-lg"
          src="https://www.youtube.com/embed/HUMMr4icLeY"
          title="Freischule"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <p className="mt-8 text-neutral-400">
        Wähle links ein Lernbüro aus, um mit den Lektionen zu starten.
      </p>
    </div>
  );
}
