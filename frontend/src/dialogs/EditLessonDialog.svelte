<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { user } from "../lib/global";

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
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/lesson/${lesson.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${$user.jwt}`, // JWT-Token hinzufügen
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Fehler beim Bearbeiten");

      onsuccess(result);
    } catch (e) {
      console.error("API Fehler:", e);
      onerror(e.message);
    }
  }

  async function deleteLesson() {
    const confirmed = confirm("Lektion wirklich löschen?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/lesson/${lesson.id}`,
        {
          method: "DELETE", 
          headers: {
            Authorization: `Bearer ${$user.jwt}`
          },
        },
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Fehler beim Löschen");
      }

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
    <input type="number" bind:value={order} />
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button class="danger" onclick={deleteLesson}>Löschen</button>
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
