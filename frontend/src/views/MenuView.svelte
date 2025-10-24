<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '../lib/global';
  import CategoryEdit from '../components/CategoryEdit.svelte';
  import CategoryNew from '../components/CategoryNew.svelte';
  import { getLearningHubs, getChildCategories } from "../lib/categoryApi";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let{
    navCategory = null,
    oncategorySelected = () => {},
    menuVisible = true
  } = $props();

  let categories = $state([]);
  let childCategories = $state([]);
  let currentCategory = $state(null);

  // For Mods
  let showCategoryPopup = false;

  let isModerator = $state(false);

  user.subscribe(value => {
    const roles = value.roles ?? [];
    isModerator = roles.includes('MODERATOR');
  });

  onMount(() => {
    if (!navCategory || isHomeButton(navCategory)) {
      loadLearningHubs();
    }
  });

  async function loadLearningHubs() {
    console.log("lade Lernbüros");
    categories = await getLearningHubs();
    console.log("Lernbüros: "+categories);
    currentCategory = null;
    childCategories = [];
    oncategorySelected(null); // Wichtig: MainView zurücksetzen
  }

  async function loadChildCategories(categoryId) {
    console.log("lade Kategorien des Lernbüros: "+categoryId);
    childCategories = await getChildCategories(categoryId);
  }

  async function onselectCategory(category) {
    oncategorySelected(category); // Event auslösen
    setCurrentCategory(category);
  }

  async function setCurrentCategory(category){
    currentCategory = category;
    await loadChildCategories(category.id);
  }

  function isHomeButton(category) {
    return category === "__home__";
  }

  $effect(() => {
    if (isHomeButton(navCategory)) {
      loadLearningHubs();
    } else if (navCategory && navCategory !== currentCategory) {
      setCurrentCategory(navCategory);
    }
  });
</script>

{#if menuVisible}
<aside class="menu">
  <div class="menu-scroll">
    {#if currentCategory}
      {#each childCategories as category}
        <div class="learning-hub" onclick={() => onselectCategory(category)}>
          <h3>{category.name}</h3>
          {#if category.background_link}
            <div class="hub-background"
                 style="background-image: url('{category.background_link}')"
                 alt={category.name}></div>
          {/if}
          {#if isModerator}
            <CategoryEdit category={category} onsuccess={() => loadChildCategories(currentCategory.id)} />
          {/if}
        </div>
      {/each}
    {:else}
      {#each categories as category}
        <div class="learning-hub" onclick={() => onselectCategory(category)}>
          <h3>{category.name}</h3>
          {#if category.background_link}
            <div class="hub-background"
                 style="background-image: url('{category.background_link}')"
                 alt={category.name}></div>
          {/if}
          {#if isModerator}
            <CategoryEdit category={category} onsuccess={loadLearningHubs} />
          {/if}
        </div>
      {/each}
    {/if}

    <div class="scroll-spacer"></div>
  </div>
  {#if isModerator}
    {#if currentCategory}
      <CategoryNew parent={currentCategory} onsuccess={() => loadChildCategories(currentCategory?.id)} />
    {:else}
      <CategoryNew onsuccess={loadLearningHubs} />
    {/if}
  {/if}
</aside>
{/if}


<style>
  /* Linkes Menü - fixiert positioniert */
  .menu {
    position: fixed;
    top: 50px; /* Unter der Navigationsleiste */
    left: 0;
    bottom: 0;
    width: 260px;
    background-color: #1e1e1e;
    display: flex;
    flex-direction: column;
    z-index: 900;
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
    background: rgb(209, 209, 209);
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
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
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

  .scroll-spacer {
    height: 260px;
    width: 100%;
    flex-shrink: 0;
  }
</style>
