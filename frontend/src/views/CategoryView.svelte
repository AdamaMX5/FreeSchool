<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import LessonComponent from "../components/LessonComponent.svelte";
  import { isEditMode, isMoveMode, isModerator } from "../lib/global";
  import { getLessonsByCategory, updateLessonPosition } from "../lib/lessonApi";
  import { layout } from "../lib/global";

  let{
    currentCategory = null,
    isStudentLoggedIn = false,
    isMobile = false,
    menuVisible = true,
    lessons = []
  } = $props();

  let imageSize = $state({ width: 0, height: 0 });

  const viewWidth = $derived($layout.viewWidth);
  const viewHeight = $derived($layout.viewHeight);
  const imgWidth  = $derived($layout.imgWidth);
  const imgHeight = $derived($layout.imgHeight);
  const imgOffsetX = $derived(($layout.viewWidth - $layout.imgWidth) / 2);
  const imgOffsetY = $derived(($layout.viewHeight - $layout.imgHeight) / 2);

  let isLoading = $state(false);
  let error = $state(null);
  let debugInfo = $state(null);

  $effect(() => {
    layout.update(prev => ({
      ...prev,
      imgOffsetX,
      imgOffsetY
    }));
  });

  $effect(() => {
    if (currentCategory?.id) {
      loadLessons();
    } else {
      lessons = [];
    }
    updateLayout();
  });

  function updateLayout() {
    const menuWidth = (isMobile || !menuVisible) ? 0 : 260;
    const navHeight = 50;
    const toolbarHeight = isMobile ? 80 : 66;

    const availableWidth = window.innerWidth - menuWidth;
    const availableHeight = window.innerHeight - navHeight - toolbarHeight;

    if (imageSize.width > 0 && imageSize.height > 0) {
      const widthScale = availableWidth / imageSize.width;
      const heightScale = availableHeight / imageSize.height;
      const scale = Math.min(widthScale, heightScale);
      const scaledImgWidth = imageSize.width * scale;
      const scaledImgHeight = imageSize.height * scale;
      const offsetX = (availableWidth - scaledImgWidth) / 2;
      const offsetY = (availableHeight - scaledImgHeight) / 2;

      console.log(
        "%c[Layout]",       "color:#4af; font-weight:bold",
        "\n  window.innerWidth      :", window.innerWidth,
        "\n  window.innerHeight     :", window.innerHeight,
        "\n  menuWidth              :", menuWidth,
        "\n  navHeight              :", navHeight,
        "\n  toolbarHeight          :", toolbarHeight,
        "\n  availableWidth         :", availableWidth,
        "\n  availableHeight        :", availableHeight,
        "\n  imageSize (natural)    :", imageSize.width, "x", imageSize.height,
        "\n  widthScale             :", widthScale.toFixed(4),
        "\n  heightScale            :", heightScale.toFixed(4),
        "\n  scale (min)            :", scale.toFixed(4),
        "\n  scaledImgWidth         :", scaledImgWidth.toFixed(1),
        "\n  scaledImgHeight        :", scaledImgHeight.toFixed(1),
        "\n  imgOffsetX             :", offsetX.toFixed(1),
        "\n  imgOffsetY             :", offsetY.toFixed(1),
        "\n  isMobile               :", isMobile,
        "\n  menuVisible            :", menuVisible,
      );

      debugInfo = {
        windowW: window.innerWidth, windowH: window.innerHeight,
        menuWidth, navHeight, toolbarHeight,
        availableWidth, availableHeight,
        imageSizeW: imageSize.width, imageSizeH: imageSize.height,
        widthScale: widthScale.toFixed(4), heightScale: heightScale.toFixed(4),
        scale: scale.toFixed(4),
        scaledImgW: scaledImgWidth.toFixed(1), scaledImgH: scaledImgHeight.toFixed(1),
        offsetX: offsetX.toFixed(1), offsetY: offsetY.toFixed(1),
        isMobile, menuVisible,
      };

      layout.update(prev => ({
        ...prev,
        viewWidth: availableWidth,
        viewHeight: availableHeight,
        imgWidth: scaledImgWidth,
        imgHeight: scaledImgHeight,
        scale
      }));
    } else {
      console.warn(
        "%c[Layout] updateLayout übersprungen – imageSize noch nicht bekannt",
        "color:orange",
        "\n  imageSize:", imageSize.width, "x", imageSize.height,
        "\n  window.innerWidth:", window.innerWidth,
        "\n  isMobile:", isMobile,
        "\n  menuVisible:", menuVisible,
      );
      debugInfo = {
        windowW: window.innerWidth, windowH: window.innerHeight,
        menuWidth, navHeight, toolbarHeight,
        availableWidth, availableHeight,
        imageSizeW: imageSize.width, imageSizeH: imageSize.height,
        widthScale: '—', heightScale: '—', scale: '— (imageSize=0!)',
        scaledImgW: '—', scaledImgH: '—',
        offsetX: '—', offsetY: '—',
        isMobile, menuVisible,
      };
    }
  }

  export async function loadLessons() {
    if (!currentCategory?.id) return;

    try {
      isLoading = true;
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

  onMount(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateLayout);
  });
</script>


{#if currentCategory}
  <div
    class="category-view"
    class:mobile={isMobile}
    style="width: {viewWidth}px; height: {viewHeight}px;">
  <!-- Width : 100% ist a Hotfix, when ContainerSize is not set... -->
    <img
      class="background-image"
      src={currentCategory?.background_link ?? "ressources/background/learninghub.jpg"}
      alt={currentCategory?.name}
      onload={handleImageLoad}
      style="width: {imgWidth}px; height: {imgHeight}px; left: {imgOffsetX}px; top: {imgOffsetY}px; position: absolute;"
    />

    {#if debugInfo}
      <div class="debug-hud">
        <div>window: {debugInfo.windowW} × {debugInfo.windowH}</div>
        <div>menuWidth: {debugInfo.menuWidth} | nav: {debugInfo.navHeight} | toolbar: {debugInfo.toolbarHeight}</div>
        <div>availableW: {debugInfo.availableWidth} | availableH: {debugInfo.availableHeight}</div>
        <div>imageSize (natural): {debugInfo.imageSizeW} × {debugInfo.imageSizeH}</div>
        <div>widthScale: {debugInfo.widthScale} | heightScale: {debugInfo.heightScale}</div>
        <div><strong>scale: {debugInfo.scale}</strong></div>
        <div>scaledImg: {debugInfo.scaledImgW} × {debugInfo.scaledImgH}</div>
        <div>offsetX: {debugInfo.offsetX} | offsetY: {debugInfo.offsetY}</div>
        <div>isMobile: {debugInfo.isMobile} | menuVisible: {debugInfo.menuVisible}</div>
      </div>
    {/if}

    {#each lessons as lesson}
      <LessonComponent
        {lesson}
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
  .category-view {
    position: relative;
    overflow: hidden;
  }

  .debug-hud {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.75);
    color: #4af;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.6;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #4af;
    pointer-events: none;
    white-space: nowrap;
  }

  .debug-hud strong {
    color: #ff0;
  }

  .category-view.mobile {
    width: 100% !important;
    height: auto !important;
    min-height: 300px;
  }

  .background-image {
    position: absolute;
    pointer-events: none;
    user-select: none;
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
    .category-view {
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
