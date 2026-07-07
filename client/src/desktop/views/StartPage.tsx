// Start page shown in the main area while no learning hub is selected. Plain HTML
// content (welcome + intro video); the actual learning hubs live in the left sidebar.

// Concept PDFs hosted on MediaService (app_name=FreeSchool, folder=welcome), uploaded once.
const KONZEPT_PDF_DE = "https://media.freischule.info/files/FreeSchool/welcome/f680bb2e-6a00-4d07-956c-85b9f52d1bf6.pdf";
const KONZEPT_PDF_EN = "https://media.freischule.info/files/FreeSchool/welcome/77f337f6-d86d-450d-865e-8e8670b6e646.pdf";

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

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={KONZEPT_PDF_DE}
          download
          className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
        >
          📥 Freischul-Konzept herunterladen
        </a>
        <a
          href={KONZEPT_PDF_EN}
          download
          className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
        >
          📥 Download Free School Conception
        </a>
      </div>

      <p className="mt-8 text-neutral-400">
        Wähle links ein Lernbüro aus, um mit den Lektionen zu starten.
      </p>
    </div>
  );
}
