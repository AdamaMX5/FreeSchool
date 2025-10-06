<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { putCategory, deleteCategory } from '../lib/categoryApi';

  let {
    category = null,
    onsuccess = () => {},
    oncancel = () => {},
    onerror = () => {}
  } = $props();

  let name = $state(category?.name || "");
  let background_link = $state(category?.background_link || "/ressources/background/");
  let parentsStr = $state(JSON.stringify(category?.parents || []));
  let childrenStr = $state(JSON.stringify(category?.children || []));
  let error = $state("");
  let isLoading = $state(false);

  function close() {
    oncancel()
  }

  function addBackgroundLinkForPayload(link){
    console.log("Checking Link of Category: "+link)
    if (link && link != "/ressources/background/") {
      console.log("Link wird übernommen.")
      return link;
    }
    console.log("Link scheint kein Bild zu sein, deswegen gebe ich leer zurück.")
    return "";
  }

  async function submit() {
    let parents, children;
    error = "";
    isLoading = true;

    try {
      parents = JSON.parse(parentsStr);
      if (!Array.isArray(parents)) throw new Error("Parents muss ein Array sein.");
    } catch (e) {
      error = "Fehler im Parents-Feld: " + e.message;
      isLoading = false;
      return;
    }

    try {
      children = JSON.parse(childrenStr);
      if (!Array.isArray(children)) throw new Error("Children muss ein Array sein.");
    } catch (e) {
      error = "Fehler im Children-Feld: " + e.message;
      isLoading = false;
      return;
    }

    const payload = {
      ...category,
      name,
      background_link: addBackgroundLinkForPayload(background_link),
      parents,
      children
    };

     try {
      const result = await putCategory(payload);
      onsuccess(result);
    } catch (e) {
      console.error("API Fehler:", e);
      error = e.message;
      onerror(e.message);
    } finally {
      isLoading = false;
    }
  }

  async function handleDeleteCategory() {
    const confirmed = confirm("Kategorie wirklich löschen?");
    if (!confirmed) return;

    isLoading = true;
    try {
      await deleteCategory(category.id);
      onsuccess({ deleted: true, id: category.id });
    } catch (e) {
      console.error("Löschfehler:", e);
      error = e.message;
      onerror(e.message);
    } finally {
      isLoading = false;
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
      <input type="text" bind:value={background_link} />
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
    <button class="danger" onclick={handleDeleteCategory} disabled={isLoading}>
      {#if isLoading}Lädt...{:else}Löschen{/if}
    </button>
    <button onclick={submit} disabled={isLoading}>
      {#if isLoading}Speichert...{:else}Speichern{/if}
    </button>
    <button onclick={close} disabled={isLoading}>Abbrechen</button>
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
    color: #ffffff;
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

  .actions .danger:disabled,
  .actions button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
