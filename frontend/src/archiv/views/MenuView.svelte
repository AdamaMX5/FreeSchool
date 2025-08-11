<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let categories = [];
  let childCategories = [];
  let currentCategory = null;
  let isLoading = false;
  let error = null;

  onMount(() => {
    loadLearningHubs();
  });

  async function loadLearningHubs() {
    try {
      isLoading = true;
      error = null;
      const response = await fetch(`${API_BASE_URL}/category/asLearningHubs/`);
      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
      categories = await response.json();
      currentCategory = null;
      childCategories = [];
      dispatch("categorySelected", null); // Wichtig: MainView zurücksetzen
    } catch (err) {
      error = "Fehler beim Laden der Lernbüros";
      console.error("API Fehler:", err);
    } finally {
      isLoading = false;
    }
  }

  async function loadChildCategories(categoryId) {
    try {
      isLoading = true;
      error = null;
      const response = await fetch(`${API_BASE_URL}/category/${categoryId}/children/`);
      if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
      childCategories = await response.json();
    } catch (err) {
      error = "Fehler beim Laden der Unterkategorien";
      console.error("API Fehler:", err);
    } finally {
      isLoading = false;
    }
  }

  async function selectCategory(category) {
    currentCategory = category;
    dispatch("categorySelected", category); // 🎯 Event auslösen
    await loadChildCategories(category.id);
  }
</script>

<aside class="menu">
  <div class="menu-header">
    {#if currentCategory}
      <button class="home-button" on:click={loadLearningHubs}>🏠</button>
      <h2>{currentCategory.name}</h2>
    {:else}
      <h2>Lernbüros</h2>
    {/if}
  </div>

  <div class="menu-scroll">
    {#if currentCategory}
      {#each childCategories as category}
        <div class="learning-hub" on:click={() => selectCategory(category)}>
          <h3>{category.name}</h3>
          {#if category.backgroundLink}
            <div class="hub-background"
                 style="background-image: url('{category.backgroundLink}')"
                 alt={category.name}></div>
          {/if}
        </div>
      {/each}
    {:else}
      {#each categories as category}
        <div class="learning-hub" on:click={() => selectCategory(category)}>
          <h3>{category.name}</h3>
          {#if category.backgroundLink}
            <div class="hub-background"
                 style="background-image: url('{category.backgroundLink}')"
                 alt={category.name}></div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</aside>

<style>
  /* Linkes Menü */
  .menu {
    width: 260px;
    flex-shrink: 0;
    background-color: #1e1e1e; /* Dunkles Menü */
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  /* MainView nimmt restlichen Platz ein */
  .main-view-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
     align-items: center;
    overflow: auto;
    padding: 0px;
  }

  .menu-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #e0e0e0;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .home-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0;
  }

  .menu h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  /* Scroll-Verhalten */
  .menu-scroll {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    padding: 0;
  }

  /* Lernbüro-Karten */
  .learning-hub {
    width: 250px;
    margin: 5px;
    background: white;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }

  .learning-hub:hover {
    transform: scale(1.02);
  }

  .learning-hub h3 {
    margin: 0;
    padding: 0.5rem;
    font-size: 1rem;
    background: rgba(255,255,255,0.7);
    position: relative;
    z-index: 1;
  }

  .hub-background {
    width: 100%;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin-top: -2rem;
  }
</style>