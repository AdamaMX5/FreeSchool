<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Edit } from 'lucide-svelte';
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import ContentNew from "../components/ContentNew.svelte";
  import EditLessonDialog from "../dialogs/EditLessonDialog.svelte";
  import EditContentDialog from "../dialogs/EditContentDialog.svelte";
  import { user } from "../lib/global";
  import { layout } from "../lib/global";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let isModerator = $state(false);

  user.subscribe((value) => {
    const roles = value.roles ?? [];
    isModerator = roles.includes("MODERATOR");
  });

  let {
    isStudentLoggedIn,
    onPositionChanged = () => {},
    onLessonDeleted = () => {},
    lesson,
    draggable = false,
    editable = false,
    isMobile = false
  } = $props();

  let isOpen = $state(false);
  let showEditDialog = $state(false);
  let contents = $state([]);
  let progress = $state(0);
  let progressColor = $state("green");
  let tempProgress = $state(progress); // Temporärer Wert während der Bewegung
  let isProgressDragging = $state(false);
  let selectedContentId = $state(null);
  let selectedContent = $state(null);
  let markdownContent = $state("");
  
  const offsetX = $derived($layout.imgOffsetX);
  const offsetY = $derived($layout.imgOffsetY);
  const scale   = $derived($layout.scale);
  const screenX = $derived(lesson.position_x * scale);
  const screenY = $derived(lesson.position_y * scale);
  const iconSize = $derived(80 * scale);
  const fontSize = $derived(14 * scale);

  let startX: number = 0;
  let startY: number = 0;
  // Mobile Touch Variablen
  let touchStartX = 0;
  let touchStartY = 0;
  let isScrolling = false;

  let cursor = $state("pointer");
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let originalX = 0;
  let originalY = 0;
  let element;

  $effect(() => {
    if (contents.length > 0 && !selectedContentId) {
      selectedContentId = contents[0].id;
      updateSelectedContent();
    }
  });

   $effect(() => {
    if (draggable) {
      cursor = "grab";
    } else {
      cursor = "pointer";
    }
  });

  $effect(() => {
    progress = lesson.progress || 0;
    updateProgressColor();
  });
  
  onMount(() => {
    fetchContents();
  });

  function getSmoothProgressColor(progress: number) {
    let r, g, b;
    
    if (progress < 50) {
      // Grün: rgb(40, 167, 69) -> Gelb: rgb(255, 233, 0)
      const ratio = progress / 50;
      r = Math.floor(40 + (215 * ratio));  // 40 -> 255
      g = Math.floor(167 + (66 * ratio));  // 167 -> 233
      b = Math.floor(69 - (69 * ratio));   // 69 -> 0
    } else {
      // Gelb: rgb(255, 233, 0) -> Rot: rgb(255, 0, 0)
      const ratio = (progress - 50) / 50;
      r = Math.floor(255);  // 255 -> 255
      g = Math.floor(233 - (233 * ratio)); // 233 -> 0
      b = Math.floor(0);    // 0 -> 0
    }
    //console.log(`Progress ${progress} Color: Rot ${r} Grün ${g} Blau ${b}`);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function updateProgressColor() {
    progressColor = getSmoothProgressColor(progress);
  }

  function toggleOpen() {
    if (editable) {
      showEditDialog = true;
    } else if (draggable) {
    } else {
      isOpen = !isOpen;
    }
  }

  function handleProgressInput(event) {
    tempProgress = parseInt(event.target.value);
    progressColor = getSmoothProgressColor(tempProgress);
  }

  async function handleProgressChange(event) {
    isProgressDragging = false;
    if (tempProgress !== progress) {
      await updateProgress(tempProgress);
    }
  }

  function handleMouseDown() {
    isProgressDragging = true;
  }

  async function updateProgress(newProgress: number) {
    if (!$user?.jwt) return;
    const headers = {};
    headers['Content-Type'] = `application/json`;
    headers['Authorization'] = `Bearer ${$user.jwt}`;
    
    const payload = {
      lesson_id: lesson.id,
      progress: newProgress
    };
    try {
      const response = await fetch(`${API_BASE_URL}/lesson/progress`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
      }
      
      const result = await response.json();
      progress = result.progress; // <- Wichtig: Server-Antwort übernehmen
      lesson.progress = result.progress; // <- Auch das Lesson-Objekt aktualisieren
      updateProgressColor();
      
    } catch (error) {
      console.error("Fehler beim Speichern des Fortschritts:", error);
      // Auf vorherigen Wert zurücksetzen
      tempProgress = progress;
    }
  }

  async function fetchContents() {
    //console.log('📡 Fetching contents for lesson:', lesson.id);
    //console.log('🔗 API URL:', `${API_BASE_URL}/content/by_lesson/${lesson.id}`);
    try {
      const headers = {};
      if ($user?.jwt) {
        headers['Authorization'] = `Bearer ${$user.jwt}`;
      }

      const res = await fetch(`${API_BASE_URL}/content/by_lesson/${lesson.id}`, {
        headers: headers
      });
      
      //console.log('📊 Response status:', res.status);
      
      if (res.ok) {
        contents = await res.json();
        //console.log('✅ Contents loaded:', $state.snapshot(contents));
        // Automatisch ersten Content auswählen
        if (contents.length > 0) {
          selectedContentId = contents[0].id;
          updateSelectedContent();
        } else {
          selectedContent = null;
          markdownContent = "";
          console.log('ℹ️ No contents available for this lesson');
        }
      } else {
        const errorText = await res.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`HTTP-Fehler: ${res.status}`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      //error = "Fehler beim Laden der Inhalte";
    }
  }

  function onNewConent() {
    fetchContents();
  }

  async function fetchLesson() {
    try {
      const res = await fetch(`${API_BASE_URL}/lesson/${lesson.id}`);
      if (res.ok) {
        const updatedLesson = await res.json();
        // Aktualisiere die Lesson-Daten mit den neuen Werten
        lesson = {
          ...lesson,
          name: updatedLesson.name,
          description: updatedLesson.description,
          order: updatedLesson.order,
          position_x: updatedLesson.position_x,
          position_y: updatedLesson.position_y,
        };
      } else {
        console.error(
          "Fehler beim Laden der aktualisierten Lesson:",
          await res.text(),
        );
      }
    } catch (error) {
      console.error(
        "Netzwerkfehler beim Laden der aktualisierten Lesson:",
        error,
      );
    }
  }

  function updateSelectedContent() {
    selectedContent = contents.find((c) => c.id === selectedContentId) || null;
    markdownContent = selectedContent?.text || "";
  }

  function onEditSuccess(event) {
    fetchLesson();
    showEditDialog = false;
  }

  function onEditError(event) {
    alert("Fehler beim Bearbeiten: " + event);
  }

  function onDeleteLesson(event){
    onLessonDeleted(event)
    showEditDialog = false;
  }

  function onMouseDown(event: MouseEvent) {
    if (!draggable) return;
    dragging = true;
    cursor = "grabbing";
    dragStartX = event.clientX;
    dragStartY = event.clientY;

    originalX = lesson.position_x;
    originalY = lesson.position_y;

    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event: MouseEvent) {
    if (!dragging) return;
    const dx = (event.clientX - dragStartX) / scale;
    const dy = (event.clientY - dragStartY) / scale;

    lesson.position_x = originalX + dx;
    lesson.position_y = originalY + dy;

    // Sofort visualisieren
    lessonsRerender();
  }

  function lessonsRerender() {
    // Trick: zwingt Svelte zu einem Re-Render, ohne Endlosschleife
    lesson = { ...lesson };
  }

  function onMouseUp() {
    if (!dragging) return;
    dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    cursor = "grab";

    dispatchEvent(new CustomEvent("positionChanged", {
      detail: {
        id: lesson.id,
        x: Math.round(lesson.position_x),
        y: Math.round(lesson.position_y)
      }
    }));
  }

  onMount(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  onDestroy(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  });

  function onTouchStart(event: TouchEvent) {
    if (!draggable) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isScrolling = false;

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  }

  function onTouchMove(event: TouchEvent) {
    if (!draggable || isScrolling) return;
    
    const touch = event.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;
    
    // Prüfen ob es ein Scroll oder Drag ist
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
      isScrolling = true;
      return;
    }
    
    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
      event.preventDefault();
      //offsetX += diffX;
      //offsetY += diffY;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }
  }

  function onTouchEnd() {
    if (!draggable) return;
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);

    if (!isScrolling) {
      const newX = Math.trunc(offsetX / scale);
      const newY = Math.trunc(offsetY / scale);

      if (newX !== lesson.position_x || newY !== lesson.position_y) {
        onPositionChanged?.({ id: lesson.id, x: newX, y: newY });
      }
    }
  }

  let showEditContentDialog = $state(false);
  let contentToEdit = $state(null);

  function onEditContentDialog(content) {
    contentToEdit = content;
    showEditContentDialog = true;
  }

  function onContentEditSuccess() {
    fetchContents();
    showEditContentDialog = false;
  }

  // Close lesson details when clicking outside on mobile
  function handleOutsideClick(event) {
    if (isMobile && isOpen && !event.target.closest('.lesson-details') && !event.target.closest('.lesson-icon')) {
      isOpen = false;
    }
  }

  // Handle mobile scrolling behavior
  function handleScroll(event) {
    if (isMobile && isOpen) {
      // Prevent background scrolling when lesson is open on mobile
      event.stopPropagation();
    }
  }
</script>

<div
  class="lesson-wrapper {cursor}"
  class:mobile={isMobile}
  class:open={isOpen}
  style="
        width: {iconSize}px;
        height: {iconSize}px;
        font-size: {fontSize}px;
        left: {screenX - iconSize/2}px;
        top: {screenY - iconSize/2}px;
     "
  title={lesson.name}
  role="button"
  tabindex="0"
  onkeydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOutsideClick(e);
    }
  }}
  onclick={(e) => {
    if (e.target === e.currentTarget) {
      handleOutsideClick(e);
    }
  }}
>
  <div
    bind:this={element}
    role="button"
    tabindex="0"
    class="lesson-icon"
    onclick={toggleOpen}
    onkeydown={(e) => (e.key === "Enter" || e.key === " ") && toggleOpen()}
    onmousedown={onMouseDown}
    ontouchstart={onTouchStart}
    style="
      left: {screenX}px;
      top: {screenY}px;
      width: {iconSize}px;
      height: {iconSize}px;
      font-size: {fontSize}px;
    "
  >

    <div 
      class="icon-circle" style="background-color: {getSmoothProgressColor(progress)}"
    >
      {lesson.order ?? "•"}
    </div>
  </div>

  {#if isOpen}
    <div class="content-debug" style:display={contents.length === 0 ? 'block' : 'none'}>
      Keine Contents verfügbar für diese Lesson
    </div>
    <div 
      class="lesson-details" 
      class:mobile={isMobile}
      onscroll={handleScroll}
    >
      <button class="close-button" onclick={() => isOpen = false}>
        ✕
      </button>
      

      {#if isModerator}
        <ContentNew {lesson} onsuccess={onNewConent} />
      {/if}

      <h3>{lesson.name}</h3>
      {#if $user?.jwt}
        <div class="progress-container">
          <label for="progress-{lesson.id}">Fortschritt: {isProgressDragging ? tempProgress : progress}%</label>
          <input
            id="progress-{lesson.id}"
            type="range"
            min="0"
            max="100"
            step="1"
            value={progress}
            oninput={handleProgressInput}
            onchange={handleProgressChange}
            onmousedown={handleMouseDown}
            class="progress-slider"
            style="--progress-color: {isProgressDragging ? getSmoothProgressColor(tempProgress) : progressColor}"
          />
          <div class="progress-labels">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      {/if}

      {#if contents.length > 1}
        <select bind:value={selectedContentId} onchange={updateSelectedContent}>
          {#each contents as content}
            <option value={content.id}>
              {content.teacher?.name || "Unbekannter Lehrer"}
            </option>
          {/each}
        </select>
      {/if}
      
      {#if selectedContent}
        {#if selectedContent.internal_video}
          <div class="media-container">
            <video controls src={selectedContent.internal_video}>
              <track kind="captions" label="Untertitel" srcLang="de" />
              Dein Browser unterstützt kein Video-Element.
            </video>
          </div>
        {:else if selectedContent.youtube_id}
          <div class="media-container">
            <iframe
              width="100%"
              height="{isMobile ? '200' : '338'}"
              src="https://www.youtube.com/embed/{selectedContent.youtube_id}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            >
            </iframe>
          </div>
        {/if}

        {#if isModerator}
          <button class="edit-btn" onclick={() => onEditContentDialog(selectedContent)} title="Content bearbeiten">
            <Edit size="{isMobile ? 20 : 24}" />
            {#if isMobile}Bearbeiten{/if}
          </button>
        {/if}

        <div class="markdown-container">
          <MarkdownRenderer markdown={markdownContent} />
        </div>
      {/if}

      {#if isStudentLoggedIn && !$user?.jwt}
        <div class="progress-container">
          <label for="progress">Fortschritt: {progress}%</label>
          <input
            id="progress"
            type="range"
            min="0"
            max="100"
            step="10"
            bind:value={progress}
          />
        </div>
      {/if}
    </div>
  {/if}

  {#if showEditDialog}
    <EditLessonDialog
      {lesson}
      oncancel={() => (showEditDialog = false)}
      onsuccess={onEditSuccess}
      onerror={onEditError}
      ondeleted={onDeleteLesson}
    />
  {/if}

  {#if showEditContentDialog}
    <EditContentDialog
      content={contentToEdit}
      oncancel={() => (showEditContentDialog = false)}
      onsuccess={onContentEditSuccess}
      onerror={(e) => alert("Fehler: " + e.detail)}
    />
  {/if}
</div>

<style>
  .lesson-wrapper {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: auto;
  }

  .lesson-wrapper.pointer {
    cursor: pointer;
  }

  .lesson-wrapper.grab {
    cursor: grab;
  }

  .lesson-wrapper.grabbing {
    cursor: grabbing;
  }

  .lesson-wrapper.mobile {
    touch-action: pan-y;
  }

  .lesson-wrapper.mobile.open {
    z-index: 100;
  }

  .lesson-wrapper.mobile .icon-circle {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .lesson-icon {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .lesson-details {
    position: absolute;
    left: 1px;
    top: 1px;
    background-color: #333;
    color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 10px;
    width: 600px;
    max-width: 90vw;
    z-index: 11;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    max-height: 80vh;
    overflow-y: auto;
  }

  .lesson-details.mobile {
    width: 95vw;
    max-width: 95vw;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    max-height: 90vh;
    padding: 15px;
  }

  .icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #000; /* Dunkle Schrift für besseren Kontrast */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
  }

  .icon-circle::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;
    z-index: 11;
  }

  select {
    margin-bottom: 12px;
    width: 100%;
    padding: 8px;
    background: #444;
    color: #fff;
    border: 1px solid #666;
    border-radius: 4px;
  }

  .media-container {
    margin-top: 10px;
    border-radius: 6px;
    overflow: hidden;
  }

  iframe,
  video {
    margin-top: 10px;
    border-radius: 6px;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 10px;
  }

  .create-btn {
    margin-top: 10px;
    padding: 6px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .create-btn:hover {
    background-color: #0056b3;
  }

  .edit-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 10px 0;
    padding: 8px 16px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    justify-content: center;
  }

  .edit-btn:hover {
    background-color: #555;
  }

  .progress-container {
    margin-top: 15px;
    width: 100%;
  }

  .progress-slider {
    width: 100%;
    height: 8px;
    margin: 8px 0;
    -webkit-appearance: none;
    appearance: none;
    background: #444;
    border-radius: 4px;
    outline: none;
  }

  .progress-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--progress-color);
    cursor: pointer;
    transition: background 0.2s;
  }

  .progress-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--progress-color);
    cursor: pointer;
    transition: background 0.2s;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #aaa;
  }
  
  .markdown-container {
    margin-top: 15px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  .lesson-details.mobile .markdown-container {
    max-height: 200px;
  }

  /* Mobile-specific styles */
  @media (max-width: 768px) {
    .lesson-details {
      position: fixed;
      top: 55px;
      left: 1vw;
      width: 95vw;
      max-width: 95vw;
      transform: none;
      margin-top: 0;
    }

    .lesson-details h3 {
      font-size: 1.2rem;
      margin-right: 30px;
    }

    .edit-btn {
      padding: 10px;
      font-size: 0.9rem;
    }

    .progress-container label {
      font-size: 0.9rem;
    }

    .markdown-container {
      font-size: 0.9rem;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    .lesson-icon {
      min-width: 44px;
      min-height: 44px;
    }
    
    .icon-circle {
      min-width: 44px;
      min-height: 44px;
    }
    
    .edit-btn {
      min-height: 44px;
    }
    
    select {
      min-height: 44px;
    }
  }

  .content-debug {
    border: 2px solid red;
    padding: 10px;
    margin: 10px 0;
  }
</style>
