<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { user } from '../lib/global';

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

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lesson`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${$user.jwt}`  // JWT-Token hinzufügen
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Fehler beim Erstellen");

      onsuccess();
    } catch (e) {
      onerror();
    }
  }
</script>

<Dialog on:close={close}>
  <h2>Neue Lesson erstellen</h2>

  <div class="form-grid">
    <label>Titel:</label>
    <input type="text" bind:value={title} />

    <label>Beschreibung:</label>
    <input type="text" bind:value={description} />

    <label>Reihenfolge:</label>
    <input type="text" bind:value={order} />
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

  input {
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
