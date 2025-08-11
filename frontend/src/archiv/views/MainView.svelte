<script>
  import { onMount, onDestroy } from 'svelte';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  export let selectedCategory = null;

  let mainViewEl;
  let lessons = [];
  let imageSize = { width: 0, height: 0 };
  let containerSize = { width: 0, height: 0 };
  let scaleFactor = 1;
  let isLoading = false;
  let error = null;

  $: if (selectedCategory) loadLessons();

  async function loadLessons() {
    if (!selectedCategory?.id) return;

    try {
      isLoading = true;
      error = null;
      const response = await fetch(`${API_BASE_URL}/lesson/by_category/${selectedCategory.id}/`);

      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);

      lessons = await response.json();
    } catch (err) {
      error = "Fehler beim Laden der Lektionen";
      console.error("API Fehler:", err);
    } finally {
      isLoading = false;
    }
  }

  function handleImageLoad(event) {
    const img = event.target;
    imageSize = {
      width: img.naturalWidth,
      height: img.naturalHeight
    };
    updateLayout();
  }

function updateLayout() {
  const menuWidth = 260;
  const padding = 40;
  const availableWidth = window.innerWidth - menuWidth - padding;
  const availableHeight = window.innerHeight * 0.9;

  // Setze MainView-Container-Breite
  if (mainViewEl) {
    mainViewEl.style.width = `${availableWidth}px`;
  }

  // Bild skalieren
  if (imageSize.width > 0 && imageSize.height > 0) {
    scaleFactor = Math.min(
      1,
      availableWidth / imageSize.width,
      availableHeight / imageSize.height
    );

    containerSize = {
      width: imageSize.width * scaleFactor,
      height: imageSize.height * scaleFactor
    };
  }
}

onMount(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
});

onDestroy(() => {
    window.removeEventListener('resize', updateLayout);
});
</script>

<div bind:this={mainViewEl} class="main-view">
  {#if selectedCategory?.backgroundLink}
    <div class="image-container"
         style="width: {containerSize.width}px; height: {containerSize.height}px;">
      <img
        class="background-image"
        src={selectedCategory.backgroundLink}
        alt={selectedCategory.name}
        on:load={handleImageLoad}
        style="width: {containerSize.width}px; height: {containerSize.height}px;"
      >

      {#each lessons as lesson}
        <div
          class="lesson-icon"
          style="left: {lesson.position_x * scaleFactor}px; top: {lesson.position_y * scaleFactor}px;"
          title="{lesson.name}: {lesson.description}"
        >
          <div class="icon-circle"></div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <h1>Willkommen in der Freischule</h1>
      <p>Bitte wähle ein Lernbüro</p>
    </div>
  {/if}
</div>

<style>
  .main-view {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    overflow: auto;
    padding: 20px;
    width: 100%;
    height: 100vh;
  }

  .image-container {
    position: relative;
    background-color: #2a2a2a;
    box-shadow: 0 0 20px rgba(0,0,0,0.8);
  }

  .background-image {
    display: block;
    object-fit: contain;
  }

  .lesson-icon {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 2;
  }

  .icon-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ff3b30;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px rgba(255,59,48,0.5);
    transition: all 0.2s;
  }

  .lesson-icon:hover .icon-circle {
    transform: scale(1.5);
    box-shadow: 0 0 0 4px rgba(255,59,48,0.5);
  }

  .empty-state {
    color: #aaa;
    font-size: 1.2rem;
  }
</style>