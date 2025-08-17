<script lang="ts">
  import ToolbarView from './ToolbarView.svelte';
  import CategoryView from './CategoryView.svelte';
  import TeacherView from './TeacherView.svelte';
  import AdminView from './AdminView.svelte';

  export let currentCategory = null;
  export let isStudentLoggedIn = false;
  export let imageSize = { width: 0, height: 0 };

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

<div bind:this={mainViewDiv} class="main-view">

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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    overflow: auto;
    padding: 20px;
  }
</style>