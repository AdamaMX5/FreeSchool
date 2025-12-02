<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import LessonComponent from "../components/LessonComponent.svelte";
  import { isEditMode, isMoveMode, isModerator } from "../lib/global";
  import { user } from "../lib/global";
  import { getLessonsByCategory, updateLessonPosition } from "../lib/lessonApi";


  let{
    currentCategory = null,
    isStudentLoggedIn = false,
    imageSize = { width: 0, height: 0 },
    isMobile = false,
    menuVisible = true,
    lessons = []
  } = $props();

  let containerSize = $state({ width: 0, height: 0 });
  let scaleFactor = $state(1);
  let isLoading = $state(false);
  let error = $state(null);

//  $effect(() => {
//    if (currentCategory) {
//      loadLessons(); // Neue Daten laden
//    } else {
//      lessons = []; // Zurücksetzen wenn keine Kategorie
//    }
//  });

//  $effect(() => {
//    if (scaleFactor) {
      // Dieser Block wird ausgeführt, wenn sich scaleFactor ändert
      // Die Lessons werden neu gerendert und ihre Positionen aktualisiert
//      lessons = [...lessons];
//    }
//  });

   // Layout bei relevanten Änderungen aktualisieren
//  $effect(() => {
    // Diese Abhängigkeiten lösen Layout-Update aus
//    const trigger = menuVisible;
//    const mobile = isMobile;
//    const category = currentCategory?.id;
    
    // Kurze Verzögerung um DOM-Änderungen abzuwarten
//    setTimeout(updateLayout, 10);
//    updateLayout();
//  });

  $effect(() => {
    const categoryId = currentCategory?.id;
    if (categoryId) {
      loadLessons();
    } else {
      lessons = [];
    }
  });

  // ⚠️ WICHTIG: Layout updates mit debounce
  let layoutTimeout = null;
  
  $effect(() => {
    // Debounce Layout Updates
    if (layoutTimeout) clearTimeout(layoutTimeout);
    
    layoutTimeout = setTimeout(() => {
      updateLayout();
    }, 50);
    
    return () => {
      if (layoutTimeout) clearTimeout(layoutTimeout);
    };
  });

  export async function loadLessons() {
    if (!currentCategory?.id) return;

    try {
      isLoading = true;
      error = null;
      lessons = await getLessonsByCategory(currentCategory.id);
    } catch (err) {
      error = "Fehler beim Laden der Lektionen";
      console.error("API Fehler:", err);
    } finally {
      isLoading = false;
    }
  }

  async function handleLessonPositionUpdate({ id, x, y }) {
    try {
      await updateLessonPosition(id, { x, y });
      // Kein reload nötig, da Position client-seitig bereits aktualisiert
    } catch (err) {
      console.error("Fehler beim Speichern der Position:", err);
    }
  }

  function handleImageLoad(event) {
    const img = event.target;
    imageSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
    updateLayout();
  }

  function updateLayout() {
    const menuWidth = (isMobile || !menuVisible) ? 0 : 260;
    const navHeight = 50;
    const toolbarHeight = isMobile ? 80 : 66;
    const padding = isMobile ? 0 : 0;

    const availableWidth = window.innerWidth - menuWidth - (padding * 2);
    const availableHeight = window.innerHeight - navHeight - toolbarHeight*0 - (padding * 2);

    if (imageSize.width > 0 && imageSize.height > 0) {
      const widthScale = availableWidth / imageSize.width;
      const heightScale = availableHeight / imageSize.height;
      const newScaleFactor = Math.min(widthScale, heightScale); // Maximal 1 (Originalgröße)
      console.log('Scale factors:', { widthScale, heightScale, newScaleFactor });

      if (Math.abs(newScaleFactor - scaleFactor) > 0.001) {
        scaleFactor = newScaleFactor;
        containerSize = {
          width: Math.floor(imageSize.width * scaleFactor),
          height: Math.floor(imageSize.height * scaleFactor),
        };
      }
    } else {
      // Fallback wenn Bild noch nicht geladen
      containerSize = {
        width: availableWidth,
        height: availableHeight,
      };
    }
  }

  onMount(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    // Auch bei visibility changes aktualisieren
    document.addEventListener('visibilitychange', updateLayout);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateLayout);
    document.removeEventListener('visibilitychange', updateLayout);
  });
</script>


{#if currentCategory}
  <div
    class="image-container"
    class:mobile={isMobile}
    style="width: {containerSize.width}px; height: {containerSize.height}px;">
  <!-- Width : 100% ist a Hotfix, when ContainerSize is not set... -->
    {#if currentCategory?.background_link}
      <img
        class="background-image"
        src={currentCategory.background_link}
        alt={currentCategory.name}
        onload={handleImageLoad}
        style="width: {containerSize.width}px; height: {containerSize.height}px;">
    {:else}
      <img
        class="background-image"
        src="ressources/background/learninghub.jpg"
        alt={currentCategory.name}
        onload={handleImageLoad}
        style="width: {containerSize.width}px; height: {containerSize.height}px;">
    {/if}

    {#each lessons as lesson}
      <LessonComponent
        {lesson}
        {scaleFactor}
        {isStudentLoggedIn}
        {isMobile}
        editable={$isEditMode}
        draggable={$isMoveMode}
        onPositionChanged={({ id, x, y }) => handleLessonPositionUpdate({ id, x, y })}
        onLessonDeleted={loadLessons}
      />
    {/each}
  </div>
{:else}
  <div class="empty-state" class:mobile={isMobile}>
    <h1>Willkommen in der Freischule</h1>
    <div class="video-container">
      <iframe 
        width="{isMobile ? '100%' : '560'}" 
        height="{isMobile ? '200' : '315'}" 
        src="https://www.youtube.com/embed/HUMMr4icLeY?si=XW525iCdQxrXPFOE" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
      </iframe>
    </div>
    <br><br>
    <a href="/ressources/pdf/Freischule.pdf" download class="download-link">
      📥 Freischul-Konzept für Swakopmund herunterladen
    </a>
    <br><br>
    <a href="/ressources/pdf/Freeschool.pdf" download class="download-link">
      📥 Download Free School-Conception for Swakopmund
    </a>
  </div>
{/if}

<style>
  .image-container {
    position: relative;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto; /* Zentriert den Container */
  }

  .image-container.mobile {
    width: 100% !important;
    height: auto !important;
    min-height: 300px;
  }

  .background-image {
    display: block;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }

  .empty-state {
    color: #aaa;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }

  .empty-state.mobile {
    padding: 20px;
  }

 .video-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .download-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #777;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .download-link:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    .image-container {
      width: 100% !important;
      height: auto !important;
    }
    
    .background-image {
      width: 100% !important;
      height: auto !important;
    }
    
    .empty-state {
      padding: 10px;
    }
    
    .empty-state h1 {
      font-size: 1.5rem;
    }
    
    .download-link {
      display: block;
      margin: 10px 0;
      text-align: center;
    }
  }
</style>
