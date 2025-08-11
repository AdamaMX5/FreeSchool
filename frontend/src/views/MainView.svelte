<script lang="ts">
  import ToolbarView from './ToolbarView.svelte';
  import CategoryView from './CategoryView.svelte';
  import TeacherView from './TeacherView.svelte';

  export let currentCategory = null;
  export let isStudentLoggedIn = false;
  export let imageSize = { width: 0, height: 0 };

  let mainViewDiv;
  let categoryViewRef;
  let showTeacherView = false;

  function handleLessonCreated() {
    if (categoryViewRef && categoryViewRef.loadLessons) {
      categoryViewRef.loadLessons();
    }
  }

  function handleTeacherView(){
    showTeacherView = !showTeacherView;
  }


</script>

<div bind:this={mainViewDiv} class="main-view">

  {#if showTeacherView}
    <TeacherView

    />
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