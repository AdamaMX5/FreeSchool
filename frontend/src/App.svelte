<script>
  import MenuView from './views/MenuView.svelte';
  import MainView from './views/MainView.svelte';
  import NavigationView from './views/NavigationView.svelte';
  import ToolbarView from './views/ToolbarView.svelte';
  import { onMount } from 'svelte';
  import { getCategoryPath } from './lib/categoryApi';

  let navCategory = $state(null);
  let currentCategory = $state(null);
  let currentPath = $state([]);
  let menuVisible = $state(true);
  let isMobile = $state(false);

  // Refs to coordinate the bottom toolbar (rendered here) with the menu/main views.
  let mainViewRef = $state(null);
  let menuViewRef = $state(null);

  // Beim URL-Start: welche Lesson/Content soll auto-geöffnet werden
  let initialLessonId = $state(null);
  let initialContentId = $state(null);

  // Aktuell offene Lesson (für URL-Schreiben)
  let activeLessonId = $state(null);
  let activeContentId = $state(null);

  // Verhindert URL-Überschreiben während der initialen URL-Auflösung
  let urlReady = $state(false);

  function updateUrl() {
    const params = new URLSearchParams();
    if (currentCategory?.id) params.set('category', currentCategory.id);
    if (activeLessonId)      params.set('lesson', activeLessonId);
    if (activeContentId)     params.set('content', activeContentId);
    const search = params.toString() ? `?${params}` : '';
    history.replaceState(null, '', search || window.location.pathname);
  }

  $effect(() => {
    if (!urlReady) return;
    // Zugriff auf alle relevanten States damit $effect sie trackt
    currentCategory; activeLessonId; activeContentId;
    updateUrl();
  });

  function checkMobile() {
    isMobile = window.innerWidth <= 768;
    if (isMobile && menuVisible) {
      menuVisible = false;
    }
  }

  onMount(async () => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('category');
    const lessonId   = params.get('lesson');
    const contentId  = params.get('content');

    if (categoryId) {
      const path = await getCategoryPath(categoryId);
      if (path.length > 0) {
        handleNavigate(path);
        if (lessonId)  initialLessonId  = lessonId;
        if (contentId) initialContentId = contentId;
      }
    }

    urlReady = true;
  });

  function handleUrlUpdate(lessonId, contentId) {
    activeLessonId  = lessonId;
    activeContentId = contentId;
  }

  function handleCategorySelected(selected) {
    initialLessonId  = null;
    initialContentId = null;
    activeLessonId   = null;
    activeContentId  = null;

    if (selected === null) {
      currentCategory = null;
      navCategory = "__home__";
      currentPath = [];
    } else {
      currentCategory = selected;
      navCategory = selected;

      if (currentPath.includes(selected)) {
        currentPath = currentPath.slice(0, currentPath.indexOf(selected) + 1);
      } else {
        currentPath = [...currentPath, selected];
      }
    }
  }

  function handleNavigate(newPath) {
    if (JSON.stringify(newPath) === JSON.stringify(currentPath)) return;

    currentPath     = newPath;
    navCategory     = newPath.length > 0 ? newPath[newPath.length - 1] : "__home__";
    currentCategory = newPath.length > 0 ? newPath[newPath.length - 1] : null;
  }

  function handleToggleMenu() {
    menuVisible = !menuVisible;
  }
</script>  

<!-- Navigationsleiste: fixiert oben -->
<NavigationView 
  {currentPath} 
  onNavigate={handleNavigate}
  onToggleMenu={handleToggleMenu}
/>

<!-- Menü: fixiert links, außerhalb des Content-Containers -->
<MenuView
  bind:this={menuViewRef}
  {navCategory}
  oncategorySelected={handleCategorySelected}
  {menuVisible}
/>

<!-- Content-Container: Nimmt immer die volle Breite ein -->
<MainView
  bind:this={mainViewRef}
  {currentCategory}
  {menuVisible}
  {initialLessonId}
  {initialContentId}
  onUrlUpdate={handleUrlUpdate}
/>

<!-- Toolbar für Moderatoren/Admins: fixiert ganz unten -->
<ToolbarView
  {currentCategory}
  onlessonCreated={() => mainViewRef?.reloadLessons()}
  onshowTeacherView={() => mainViewRef?.toggleTeacherView()}
  onshowAdminView={() => mainViewRef?.toggleAdminView()}
  onCategoryCreated={() => menuViewRef?.reload()}
/>

<style>
  :global(html, #app) {
    height: 100%;
  }

  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #1e1e1e;
    overflow: hidden;
  }

</style>
