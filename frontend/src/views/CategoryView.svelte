<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import LessonComponent from "../components/LessonComponent.svelte";
  import { isEditMode, isMoveMode, isModerator } from "../lib/global";
  import { user } from "../lib/global";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  export let mainViewDiv = null;
  export let currentCategory = null;
  export let isStudentLoggedIn = false;
  export let imageSize = { width: 0, height: 0 };

  export let lessons = [];
  let containerSize = { width: 0, height: 0 };
  let scaleFactor = 1;
  let isLoading = false;
  let error = null;

  $: {
    if (currentCategory) {
      lessons = []; // Sofortige UI-Aktualisierung
      loadLessons(); // Neue Daten laden
    } else {
      lessons = []; // Zurücksetzen wenn keine Kategorie
    }
  }

  $: if (scaleFactor) {
    // Dieser Block wird ausgeführt, wenn sich scaleFactor ändert
    // Die Lessons werden neu gerendert und ihre Positionen aktualisiert
    lessons = [...lessons];
  }

  export async function loadLessons() {
    if (!currentCategory?.id) return

    try {
      isLoading = true;
      error = null;
      const headers = {};
      if ($user?.jwt) {
          headers['Authorization'] = `Bearer ${$user.jwt}`;
      }
      
      const response = await fetch(
        `${API_BASE_URL}/lesson/by_category/${currentCategory.id}/`,
        {
            headers: headers
        }
      );

      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

      lessons = await response.json();
    } catch (err) {
      error = "Fehler beim Laden der Lektionen";
      console.error("API Fehler:", err);
    } finally {
      isLoading = false;
    }
  }

  async function updateLessonPosition({ id, x, y }) {
    const lessonToUpdate = lessons.find((l) => l.id === id);
    if (!lessonToUpdate) return;

    const headers = {};
    headers['Content-Type'] = `application/json`;
    if ($user?.jwt) {
        headers['Authorization'] = `Bearer ${$user.jwt}`;
    }

    const payload = {
      id,
      category_id: lessonToUpdate.category_id,
      name: lessonToUpdate.name,
      description: lessonToUpdate.description,
      order: lessonToUpdate.order,
      position_x: x,
      position_y: y,
      contents: lessonToUpdate.contents?.map((c) => c.id ?? c) ?? [],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/lesson/${id}`, {
        method: "PUT",
        headers:  headers,
        body: JSON.stringify(payload),
      });
      $user.jwt;

      if (!response.ok)
        throw new Error(`Fehler beim Aktualisieren: ${response.status}`);
      loadLessons();
    } catch (err) {
      console.error("Fehler beim Speichern der Position:", err);
    }
  }

  function handleImageLoad(event) {
    const img = event.target;
    imageSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
    updateLayout();
  }

  function updateLayout() {
    const menuWidth = 260;
    const navHeight = 50;
    const toolbarHeight = 66;
    const padding = 40;

    const availableWidth = window.innerWidth - menuWidth - padding;
    const availableHeight = window.innerHeight - navHeight - toolbarHeight - padding;

    if (mainViewDiv) {
      mainViewDiv.style.width = `${availableWidth}px`;
      mainViewDiv.style.height = `${availableHeight}px`;
    }

    if (imageSize.width > 0 && imageSize.height > 0) {
      const newScaleFactor = Math.min(
        1,
        availableWidth / imageSize.width,
        availableHeight / imageSize.height,
      );

      // Nur aktualisieren, wenn sich der scaleFactor tatsächlich geändert hat
      if (Math.abs(newScaleFactor - scaleFactor) > 0.001) {
        scaleFactor = newScaleFactor;
        containerSize = {
          width: imageSize.width * scaleFactor,
          height: imageSize.height * scaleFactor,
        };
        
        // Positionen neu berechnen lassen
        lessons = [...lessons];
      }
    }
  }

  onMount(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateLayout);
  });
</script>

{#if currentCategory}
  <div
    class="image-container"
    style="width: {containerSize.width}px; height: {containerSize.height}px;"
  >
    {#if currentCategory?.background_link}
      <img
        class="background-image"
        src={currentCategory.background_link}
        alt={currentCategory.name}
        on:load={handleImageLoad}
        style="width: {containerSize.width}px; height: {containerSize.height}px;"
      />
    {:else}
      <div
        class="background-placeholder"
        style="width: {containerSize.width}px; height: {containerSize.height}px;"
      ></div>
    {/if}

    {#each lessons as lesson}
      <LessonComponent
        {lesson}
        {scaleFactor}
        {isStudentLoggedIn}
        editable={$isEditMode}
        draggable={$isMoveMode}
        onPositionChanged={({ id, x, y }) => updateLessonPosition({ id, x, y })}
        onLessonDeleted={loadLessons}
      />
    {/each}
  </div>
{:else}
  <div class="empty-state">
    <h1>Willkommen in der Freischule</h1>
    <p>Bitte wähle ein Lernbüro</p>
  </div>
{/if}

<style>
  .image-container {
    position: relative;
    background-color: #2a2a2a;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  }

  .background-image {
    display: block;
    object-fit: contain;
  }

  .background-placeholder {
    background-color: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: 4px;
  }

  .empty-state {
    color: #aaa;
    font-size: 1.2rem;
  }
</style>
