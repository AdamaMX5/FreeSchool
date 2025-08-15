<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { user } from "../lib/global";

  const API_BASE_URL = "/api";

  let {
    content = null,
    onsuccess = () => {},
    onerror = () => {},
    oncancel = () => {},
  } = $props();

  let text = $state(content?.text || "");
  let youtube_id = $state(content?.youtube_id || "");
  let internal_video = $state(content?.internal_video || "");
  let error = $state("");

  function close() {
    oncancel();
  }

  async function submit() {
    error = "";

    const payload = {
      ...content,
      text,
      youtube_id,
      internal_video,
    };

    try {
      const res = await fetch(
        `${API_BASE_URL}/content/${content.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${$user.jwt}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Fehler beim Bearbeiten");

      onsuccess(result);
    } catch (e) {
      console.error("API Fehler:", e);
      error = e.message;
      onerror(e);
    }
  }

  async function deleteContent() {
    const confirmed = confirm("Inhalt wirklich löschen?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/content/${content.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${$user.jwt}`,
          },
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Fehler beim Löschen");
      }

      onsuccess({ deleted: true, id: content.id });
    } catch (e) {
      console.error("Löschfehler:", e);
      error = e.message;
      onerror(e);
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Inhalt bearbeiten</h2>

  <div class="form-grid">
    <label>ID:</label>
    <input type="text" value={content?.id} readonly />

    <label>YouTube-ID/Link:</label>
    <input type="text" bind:value={youtube_id} placeholder="https://youtube.com/watch?v=..." />

    <label>Alternativ: Video-Upload (URL):</label>
    <input type="text" bind:value={internal_video} placeholder="/videos/mein-video.mp4" />

    <label>Markdown-Inhalt:</label>
    <textarea bind:value={text} rows="10" />
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button class="danger" on:click={deleteContent}>Löschen</button>
    <button on:click={submit}>Speichern</button>
    <button on:click={close}>Abbrechen</button>
  </div>
</Dialog>

<style>
  /* Gleiche Styles wie in EditLessonDialog */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0.5rem 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  textarea {
    min-height: 200px;
  }

  /* Rest der Styles identisch zu EditLessonDialog */
</style>