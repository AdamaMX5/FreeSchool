<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { onMount } from 'svelte';
  import { getRepos, createIssue } from '../lib/gitApi';

  let {
    oncancel = () => {},
    onsuccess = () => {},
    onerror = () => {}
  } = $props();

  const DEFAULT_REPO = "FreeSchool";

  let repos = $state([{ name: DEFAULT_REPO, fullName: DEFAULT_REPO, url: "" }]);
  let repo = $state(DEFAULT_REPO);
  let title = $state("");
  let body = $state("");
  let error = $state("");
  let submitting = $state(false);

  onMount(async () => {
    try {
      const loaded = await getRepos();
      if (loaded.length > 0) {
        repos = loaded;
        if (!loaded.some(r => r.name === DEFAULT_REPO)) {
          repo = loaded[0].name;
        }
      }
    } catch (e) {
      console.error("Fehler beim Laden der Repositories:", e);
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
    if (!body.trim()) {
      error = "Beschreibung darf nicht leer sein.";
      return;
    }

    submitting = true;
    try {
      await createIssue(repo, title.trim(), body.trim(), ["enhancement"]);
      onsuccess();
    } catch (e) {
      onerror(e);
    } finally {
      submitting = false;
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Verbesserung als Issue melden</h2>

  <div class="form-grid">
    <label>Repository:</label>
    <select bind:value={repo}>
      {#each repos as r}
        <option value={r.name}>{r.name}</option>
      {/each}
    </select>

    <label>Titel*:</label>
    <input type="text" bind:value={title} placeholder="Kurze Zusammenfassung der Verbesserung" />

    <label>Beschreibung*:</label>
    <textarea bind:value={body} rows="6" placeholder="Was soll verbessert werden?"></textarea>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button onclick={submit} disabled={submitting}>{submitting ? "Wird erstellt…" : "Issue erstellen"}</button>
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
