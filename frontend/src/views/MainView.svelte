<script lang="ts">
  import ToolbarView from './ToolbarView.svelte';
  import CategoryView from './CategoryView.svelte';
  import TeacherView from './TeacherView.svelte';
  import AdminView from './AdminView.svelte';
  import { onMount } from 'svelte';

  export let currentCategory = null;
  export let isStudentLoggedIn = false;
  export let imageSize = { width: 0, height: 0 };
  export let menuVisible = true; 
  export let isMobile = false;
  export let onSwipe = () => {};

  let mainViewDiv;
  let categoryViewRef;
  let activeView = 'category';
  let startX = 0;

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

  function handleTouchStart(e) {
    if (!isMobile) return;
    startX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    if (!isMobile) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        onSwipe('right');
      } else {
        onSwipe('left');
      }
    }
  }
</script>

<div 
  bind:this={mainViewDiv} 
  class="main-view" 
  class:menu-visible={menuVisible}
  class:mobile={isMobile}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
>
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
    {isMobile}
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
    transition: left 0.3s ease, transform 0.3s ease;
  }

  .main-view.menu-visible {
    left: 260px; /* Breite des Menüs */
  }

  .main-view.mobile {
    left: 0 !important;
    padding: 10px;
    overflow-x: hidden;
  }

  .main-view.mobile.menu-visible {
    transform: translateX(260px);
  }

  @media (max-width: 768px) {
    .main-view {
      padding: 10px;
      left: 0 !important;
    }

    .main-view.menu-visible {
      transform: translateX(260px);
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
    }
  }
</style>