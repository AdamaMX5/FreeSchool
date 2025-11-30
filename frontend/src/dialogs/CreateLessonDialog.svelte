<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { user } from '../lib/global';
  import { onMount } from 'svelte';
  import { getTeachersAll } from "../lib/teacherApi";
  import { postContent } from "../lib/contentApi";
  import { postLesson } from "../lib/lessonApi";

  let {
    category,
    x = 10,
    y = 10,
    oncancel = () => {},
    onsuccess = () => {},
    onerror = () => {}
  } = $props();

  let title = "";
  let description = "";
  let order = null;
  let error = "";

  // Content-Felder
  let language = $state("de");
  let contentText = $state("");
  let youtubeId = $state("");
  let internalVideo = $state("");
  let teacherId = $state(null);
  let teachers = $state([]);

  onMount(async () => {
    try {
      // Lehrer über die exportierte Funktion laden
      teachers = await getTeachersAll();
    } catch (e) {
      console.error("Fehler beim Laden der Lehrer:", e);
    }
  });

  function close() {
    oncancel();
  }

  async function submit() {
    if (!title.trim()) {
      error = "Titel darf nicht leer sein.";
      return;
    }

    try {
      const payload = {
        name: title,
        description,
        category_id: category.id,
        position_x: Math.trunc(x),
        position_y: Math.trunc(y),
        order,
        contents: []
      };

      const lessonResult = await postLesson(payload);
      // Wenn Content-Felder ausgefüllt sind, Content mit der exportierten Funktion erstellen
      if (youtubeId && youtubeId.trim() !== ""){
        await postContent(language, contentText.trim(), youtubeId, internalVideo.trim(), lessonResult.id, teacherId);
      }
      onsuccess();
    } catch (e) {
      onerror(e);
    }
  }
</script>

<Dialog on:close={close}>
  <h2>Neue Lektion erstellen</h2>

  <div class="form-grid">
    <label>Titel*:</label>
    <input type="text" bind:value={title} />

    <label>Beschreibung:</label>
    <input type="text" bind:value={description} />

    <label>Reihenfolge:</label>
    <input type="text" bind:value={order} />
  </div>
  <h3>Inhalt erstellen</h3>
  <div class="form-grid">
      
      
    <label>Sprache:</label>
    <input type="text" bind:value={language} placeholder="z.B. de, en" />

    <label>Text (Markdown):</label>
    <textarea bind:value={contentText} rows="4" placeholder="Optional: Markdown-Inhalt" />

    <label>YouTube Video ID/Link*:</label>
    <input type="text" bind:value={youtubeId} placeholder="YouTube ID oder gesamten Link" />
    <!--
    <label>Interne Video-URL:</label>
    <input type="text" bind:value={internalVideo} placeholder="wird später vom Server automatisch gesetzt (nach dem Download des YT-Videos)" />
    -->
    <label>Lehrer:</label>
    <select bind:value={teacherId}>
      <option value={null}>-- Optional: Lehrer auswählen --</option>
      {#each teachers as teacher}
        <option value={teacher.id}>{teacher.name}</option>
      {/each}
    </select>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button onclick={submit}>Speichern</button>
    <button onclick={close}>Abbrechen</button>
  </div>
</Dialog>

<style>
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 500px;
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

  input, textarea, select {
    width: 100%;
    padding: 0.5rem;
  }
  
  .help-text {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: #777;
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

  .actions .danger {
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  .actions .danger:hover {
    background-color: #b71c1c;
  }
</style>
