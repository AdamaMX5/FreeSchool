<script lang="ts">
  import { onMount } from "svelte";
  import { Edit } from 'lucide-svelte';
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import ContentNew from "../components/ContentNew.svelte";
  import EditLessonDialog from "../dialogs/EditLessonDialog.svelte";
  import EditContentDialog from "../dialogs/EditContentDialog.svelte";
  import { user } from "../lib/global";

  let isModerator = $state(false);

  user.subscribe((value) => {
    const roles = value.roles ?? [];
    isModerator = roles.includes("MODERATOR");
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let {
    isStudentLoggedIn,
    onPositionChanged = () => {},
    onLessonDeleted = () => {},
    lesson,
    draggable = false,
    editable = false,
    scaleFactor = 1,
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
  

  let dragging = false;
  let cursor = $state("pointer");
  let offsetX = $state(0);
  let offsetY = $state(0);
  let startX: number = 0;
  let startY: number = 0;


  
  $effect(() => {
    if (selectedContentId) {
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
    // Position neu berechnen, wenn scaleFactor sich ändert
    offsetX = lesson.position_x * scaleFactor;
    offsetY = lesson.position_y * scaleFactor;
  });

  $effect(() => {
    progress = lesson.progress || 0;
    updateProgressColor();
  });

  
  onMount(() => {
    fetchContents();
    // Initial Position setzen:
    offsetX = lesson.position_x * scaleFactor;
    offsetY = lesson.position_y * scaleFactor;
  });

  function getTempProgressColor(p: number) {
    if (p < 30) return "green";
    if (p < 70) return "yellow";
    return "red";
  }

  function updateProgressColor() {
    if (progress < 30) {
      progressColor = "green";
    } else if (progress < 70) {
      progressColor = "yellow";
    } else {
      progressColor = "red";
    }
  }

  function toggleOpen() {
    if (editable) {
      showEditDialog = true;
    } else if (draggable) {
    } else {
      isOpen = !isOpen;
    }
  }

  function extractYouTubeId(url: string) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  }

  function handleProgressInput(event) {
    tempProgress = parseInt(event.target.value);
    progressColor = getTempProgressColor(tempProgress);
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
    try {
      const res = await fetch(`${API_BASE_URL}/content/by_lesson/${lesson.id}`);
      if (res.ok) {
        contents = await res.json();
        selectedContentId = contents[0]?.id || null;
        updateSelectedContent();
      } else {
        console.error(
          "Fehler beim Laden der aktualisierten Lesson:",
          await res.json().de,
        );
      }
    } catch (err) {
      console.error("Fehler beim Laden der Contents:", err);
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
        // Aktualisiere auch die Position im UI
        offsetX = updatedLesson.position_x * scaleFactor;
        offsetY = updatedLesson.position_y * scaleFactor;
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
    selectedContent =
      contents.find((c) => c.id === selectedContentId) || contents[0] || null;
    markdownContent = selectedContent?.text || "";
  }

  function onEditSuccess(event) {
    fetchLesson();
    showEditDialog = false;
  }

  function onEditError(event) {
    alert("Fehler beim Bearbeiten: " + event.detail);
  }

  function onDeleteLesson(event){
    onLessonDeleted(event)
  }



  function onMouseDown(event: MouseEvent) {
    if (!draggable) return;
    dragging = true;
    cursor = "grabbing";
    startX = event.clientX;
    startY = event.clientY;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event: MouseEvent) {
    if (!dragging) return;
    offsetX += event.clientX - startX;
    offsetY += event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
  }

  function onMouseUp() {
    if (!dragging) return;
    dragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    cursor = "grab";

    const newX = Math.trunc(offsetX / scaleFactor);
    const newY = Math.trunc(offsetY / scaleFactor);

    if (newX !== lesson.position_x || newY !== lesson.position_y) {
      onPositionChanged?.({ id: lesson.id, x: newX, y: newY });
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

</script>

<div
  class="lesson-wrapper {cursor}"
  style="left: {offsetX}px; top: {offsetY}px;"
  title={lesson.name}
>
  <div
    role="button"
    tabindex="0"
    class="lesson-icon"
    onclick={toggleOpen}
    onmousedown={onMouseDown}
    onkeydown={(e) => (e.key === "Enter" || e.key === " ") && toggleOpen()}
  >
    <div class="icon-circle {progressColor}">
      {lesson.order ?? "•"}
    </div>
  </div>

  {#if isOpen}
    <div class="lesson-details">
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
            style="--progress-color: {isProgressDragging ? getTempProgressColor(tempProgress) : progressColor}"
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
          <video controls src={selectedContent.internal_video}>
            <track kind="captions" label="Untertitel" srcLang="de" />
            Dein Browser unterstützt kein Video-Element.
          </video>
        {:else if selectedContent.youtube_id}
          <iframe
            width="600"
            height="338"
            src="https://www.youtube.com/embed/{selectedContent.youtube_id}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          >
          </iframe>
        {/if}

        {#if isModerator}
          <button class="edit-btn" onclick={() => onEditContentDialog(selectedContent)} title="Content bearbeiten">
            <Edit size="24" />
          </button>
        {/if}

        <MarkdownRenderer markdown={markdownContent} />
      {/if}

      {#if isStudentLoggedIn}
        <label for="progress">Fortschritt: {progress}%</label>
        <input
          id="progress"
          type="range"
          min="0"
          max="100"
          step="10"
          bind:value={progress}
        />
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
    z-index: 10;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  }

  .icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.5);
    transition: transform 0.2s;
  }

  .icon-circle.red {
    background-color: #ff3b30;
  }
  .icon-circle.yellow {
    background-color: #ffff00;
  }
  .icon-circle.green {
    background-color: #28a745;
  }

  select {
    margin-bottom: 12px;
    width: 100%;
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
    padding: 6px 12px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
</style>
