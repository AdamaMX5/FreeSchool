<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { user } from '../lib/global';

  let {
    category = null,
    onsuccess = () => {},
    oncancel = () => {},
    onerror = () => {}
  } = $props();


  let name = $state(category?.name || "");
  let backgroundLink = $state(category?.backgroundLink || "");
  let parentsStr = $state(JSON.stringify(category?.parents || []));
  let childrenStr = $state(JSON.stringify(category?.children || []));
  let error = $state("");

  function close() {
    oncancel()
  }

  async function submit() {
    let parents, children;
    error = "";

    try {
      parents = JSON.parse(parentsStr);
      if (!Array.isArray(parents)) throw new Error("Parents muss ein Array sein.");
    } catch (e) {
      error = "Fehler im Parents-Feld: " + e.message;
      return;
    }

    try {
      children = JSON.parse(childrenStr);
      if (!Array.isArray(children)) throw new Error("Children muss ein Array sein.");
    } catch (e) {
      error = "Fehler im Children-Feld: " + e.message;
      return;
    }

    const payload = {
      ...category,
      name,
      backgroundLink,
      parents,
      children
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/category/${category.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${$user.jwt}`  // JWT-Token hinzufügen
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Fehler beim Bearbeiten");

      onsuccess(result);
    } catch (e) {
      console.error("API Fehler:", e);
      onerror(e.message);
    }
  }

  async function deleteCategory() {
    const confirmed = confirm("Kategorie wirklich löschen?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/category/${category.id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Fehler beim Löschen");
      }

      onsuccess({ deleted: true, id: category.id });
    } catch (e) {
      console.error("Löschfehler:", e);
      onerror(e.message);
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Kategorie bearbeiten</h2>

  <div class="form-grid">
    <label>ID:</label>
    <input type="text" value={category?.id} readonly />

    <label>Name:</label>
    <input type="text" bind:value={name} />

    <label>Hintergrundbild:</label>
    <div>
      <input type="text" bind:value={backgroundLink} />
      <small class="help-text">Pfad z.B.: <code>/ressources/background/</code></small>
    </div>

    <label>Parents (z.B. [1, 2]):</label>
    <input type="text" bind:value={parentsStr} />

    <label>Children (z.B. [3, 4]):</label>
    <input type="text" bind:value={childrenStr} />
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button class="danger" onclick={deleteCategory}>Löschen</button>
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
