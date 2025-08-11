<script>
  import MenuView from './views/MenuView.svelte';
  import MainView from './views/MainView.svelte';

  let selectedCategory = null;

  function handleCategorySelected(event) {
    selectedCategory = event.detail;
  }
</script>

<div class="app-container">
  <MenuView on:categorySelected={handleCategorySelected} />
  <div class="main-view-container">
    <MainView {selectedCategory} />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #1e1e1e; /* Dunkler Hintergrund */
    overflow: hidden;
  }

  /* Gesamtes Layout */
   .app-container {
    display: flex;
    height: 100vh;
    background-color: #1e1e1e; /* Dunkler Container-Hintergrund */
  }



  /* Hauptbereich */
  .content {
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .error {
    color: red;
  }
</style>