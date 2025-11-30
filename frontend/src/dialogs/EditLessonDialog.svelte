<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { user } from "../lib/global";
  import { putLesson, deleteLesson } from "../lib/lessonApi";
  
  let {
    lesson = null,
    onsuccess = () => {},
    onerror = () => {},
    oncancel = () => {},
    ondeleted = () => {}
  } = $props();

  let name = $state(lesson?.name || "");
  let description = $state(lesson?.description || "");
  let order = $state(lesson?.order ?? null);
  let error = $state("");

  function close() {
    oncancel();
  }

  async function submit() {
    error = "";

    const payload = {
      ...lesson,
      name,
      description,
      order,
    };

    try {
      // Verwende die LessonAPI-Funktion statt direktem fetch
      const result = await putLesson(lesson.id, payload);
      onsuccess(result);
    } catch (e) {
      console.error("API Fehler:", e);
      console.log("e.message:", e.message);
      onerror(e.message);
    }
  }

  async function deleteLessonHandler() {
    const confirmed = confirm("Lektion wirklich löschen?");
    if (!confirmed) return;

    try {
      // Verwende die LessonAPI-Funktion statt direktem fetch
      await deleteLesson(lesson.id);
      ondeleted({ deleted: true, id: lesson.id });
    } catch (e) {
      console.error("Löschfehler:", e);
      onerror(e.message);
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Lektion bearbeiten</h2>

  <div class="form-grid">
    <label>ID:</label>
    <input type="text" value={lesson?.id} readonly />

    <label>Name:</label>
    <input type="text" bind:value={name} />

    <label>Beschreibung:</label>
    <textarea bind:value={description} rows="3" />

    <label>Reihenfolge:</label>
    <input type="text" bind:value={order} />
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button class="danger" onclick={deleteLessonHandler}>Löschen</button>
    <button onclick={submit}>Speichern</button>
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
