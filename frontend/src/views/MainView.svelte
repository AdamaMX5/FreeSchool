<script lang="ts">
  import ToolbarView from './ToolbarView.svelte';
  import CategoryView from './CategoryView.svelte';
  import TeacherView from './TeacherView.svelte';
  import AdminView from './AdminView.svelte';

  export let currentCategory = null;
  export let isStudentLoggedIn = false;
  export let imageSize = { width: 0, height: 0 };
  export let menuVisible = true; // Neue Property für Menü-Sichtbarkeit

  let mainViewDiv;
  let categoryViewRef;
  let activeView = 'category';

  function handleLessonCreated() {
    if (categoryViewRef && categoryViewRef.loadLessons) {
      categoryViewRef.loadLessons();
    }
  }

  function handleTeacherView(){
    activeView = activeView === 'teacher' ? 'category' : 'teacher';
  }

  function handleAdminView() {
    console.log('Admin View wurde aufgerufen');
    activeView = activeView === 'admin' ? 'category' : 'admin';
  }


</script>

<div bind:this={mainViewDiv} class="main-view" class:menu-visible={menuVisible}>
  {#if activeView === 'admin'}
    <AdminView on:close={() => activeView = 'category'} />
  {:else if activeView === 'teacher'}
    <TeacherView on:close={() => activeView = 'category'} />
  {:else}
    <CategoryView
      bind:this={categoryViewRef}
      {mainViewDiv}
      {currentCategory}
      {isStudentLoggedIn}
      {imageSize}
    />
  {/if}

  <ToolbarView
    {currentCategory}
    {imageSize}
    onlessonCreated={handleLessonCreated}
    onshowTeacherView={handleTeacherView}
    onshowAdminView={handleAdminView}
  />
</div>

<style>
  .main-view {
    position: fixed;
    top: 50px; /* Höhe der Navigationsleiste */
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    overflow: auto;
    padding: 20px;
    transition: left 0.3s ease;
  }

  .main-view.menu-visible {
    left: 260px; /* Breite des Menüs */
  }
</style>