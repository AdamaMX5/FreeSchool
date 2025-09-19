<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { onMount } from "svelte";
  import { user } from "../lib/global";
  import { getTeachersAll } from "../lib/teacherApi";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let {
    lesson,
    oncancel = () => {},
    onsuccess = () => {},
    onerror = () => {},
  } = $props();

  let language = $state("de");
  let text = $state("");
  let youtube_id = $state("");
  let internal_video = $state("");
  let teacherId = $state(null);
  let teachers = $state([]);
  let error = $state("");


  // Funktion zum Erstellen eines Contents (exportiert)
  export async function createContent(
    language: string,
    text: string,
    youtube_id: string,
    internal_video: string,
    lesson_id: number,
    teacher_id: number | null
  ) {
    try {
      const payload = {
        language,
        text,
        youtube_id,
        internal_video,
        lesson_id: lesson_id,
        teacher_id: teacher_id
      };
      
      const res = await fetch(`${API_BASE_URL}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${$user.jwt}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.detail || "Fehler beim Erstellen des Contents");
      }

      return result;
    } catch (e) {
      console.error("API Fehler:", e);
      throw e;
    }
  }

  onMount(async () => {
    // Automatisch Lehrer laden, wenn die Komponente als Dialog verwendet wird
    try {
      teachers = await getTeachersAll();
    } catch (e) {
      console.error("Fehler beim automatischen Laden der Lehrer:", e);
    }
  });

  function close() {
    oncancel();
  }

  async function submit() {
    error = "";

    try {
      const result = await createContent(language, text, youtube_id, internal_video, lesson?.id || null, teacherId);
      onsuccess(result);
    } catch (e) {
      error = e.message;
      onerror(e.message);
    }
  }
</script>

<Dialog on:close={close}>
  <h2>Neuen Inhalt erstellen</h2>

  <div class="form-grid">
    <label>Sprache:</label>
    <input type="text" bind:value={language} placeholder="z.B. de, en" />

    <label>Text (Markdown):</label>
    <textarea bind:value={text} rows="6" style="resize: vertical;"> </textarea>

    <label>Externe Video-URL:</label>
    <input type="text" bind:value={youtube_id} placeholder="https://..." />

    <label>Interne Video-URL:</label>
    <input type="text" bind:value={internal_video} placeholder="/videos/..." />

    <label>Teacher-ID:</label>
    <select bind:value={teacherId}>
      <option value={null}>-- Bitte auswählen --</option>
      {#each teachers as teacher}
        <option value={teacher.id}>{teacher.name}</option>
      {/each}
    </select>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button onclick={submit}>Erstellen</button>
    <button onclick={close}>Abbrechen</button>
  </div>
</Dialog>

<style>
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0.5rem 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    text-align: right;
    padding-right: 0.5rem;
    white-space: nowrap;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .error {
    color: red;
    margin-top: 0.5rem;
  }
</style>
