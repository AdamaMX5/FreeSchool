<script lang="ts">
  import ToolbarView from './ToolbarView.svelte';
  import CategoryView from './CategoryView.svelte';
  import TeacherView from './TeacherView.svelte';
  import AdminView from './AdminView.svelte';
  import { onMount } from 'svelte';
  import { layout } from "../lib/global";
  import { throttle } from "../lib/throttle";

  let{
    currentCategory = null,
    isStudentLoggedIn = false,
    imageSize = { width: 0, height: 0 },
    menuVisible = true,
    isMobile = false,
    onSwipe = () => {}
  } = $props();
  
  let categoryViewRef = $state(null);
  let activeView = $state('category');
  let startX = $state(0);

  let container: HTMLElement;
  let ro: ResizeObserver;

  // Reagiere auf Änderungen von menuVisible
  $effect(() => {
    if (categoryViewRef && categoryViewRef.updateLayout) {
      // Kurze Verzögerung damit das Layout aktualisiert werden kann
      setTimeout(() => {
        categoryViewRef.updateLayout();
      }, 50);
    }
  });

  const updateLayout = throttle((rect: DOMRect) => {
    layout.update(prev => ({
      ...prev,
      viewWidth: rect.width,
      viewHeight: rect.height
    }));
  }, 60);

  onMount(() => {
    ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      updateLayout(rect);     // <- Nur hier wird Layout gesetzt!
    });

    if (container) ro.observe(container);

    return () => ro.disconnect();
  });

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
  bind:this={container} 
  class="main-view" 
  class:menu-visible={menuVisible}
  class:mobile={isMobile}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
>
  {#if activeView === 'admin'}
    <AdminView on:close={() => activeView = 'category'} />
  {:else if activeView === 'teacher'}
    <TeacherView on:close={() => activeView = 'category'} />
  {:else}
    <CategoryView
      bind:this={categoryViewRef}
      {currentCategory}
      {isStudentLoggedIn}
      {imageSize}
      {isMobile}
      {menuVisible}
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    overflow: auto;
    transition: left 0.3s ease, width 0.3s ease;
    box-sizing: border-box;
  }

  .main-view.menu-visible {
    left: 260px; /* Breite des Menüs */
    width: calc(100% - 260px);
  }

  .main-view.mobile {
    left: 0 !important;
    padding: 0;
    overflow-x: hidden;
    width: 100% !important;
  }

  .main-view.mobile.menu-visible {
    transform: translateX(260px);
    width: 100% !important;
  }

  @media (max-width: 768px) {
    .main-view {
      padding: 0;
      left: 0 !important;
      width: 100% !important;
    }

    .main-view.menu-visible {
      transform: translateX(260px);
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
      width: 100% !important;
    }
  }
</style>