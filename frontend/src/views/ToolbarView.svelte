<script lang="ts">
  import { isEditMode, toggleEditMode, isMoveMode, toggleMoveMode } from '../lib/global';
  import { Edit, Move, PlusCircle, GraduationCap, Shield } from 'lucide-svelte';
  import CreateLessonDialog from '../dialogs/CreateLessonDialog.svelte'; // <-- Dialog importieren
  import { user } from '../lib/global';
  import { get } from 'svelte/store'; 


  let isAdmin = $state(false);
  let isModerator = $state(false);

  user.subscribe(value => {
    const roles = value.roles ?? [];
    isModerator = roles.includes('MODERATOR');
    isAdmin = roles.includes('ADMIN');
  });

  let {
    currentCategory = null,
    imageSize = { width: 0, height: 0 },
    onlessonCreated = () => {},
    onshowTeacherView = () => {},
    onshowAdminView = () => {}
  } = $props();

  let showCreateLessonDialog = $state(false);
  

  function createLesson() {
    showCreateLessonDialog = true;
  }

  function closeCreateLessonDialog() {
    showCreateLessonDialog = false;
  }

  function lessonCreated(event) {
    closeCreateLessonDialog();
    onlessonCreated();
    if(!$isMoveMode)
      toggleMoveMode();
  }
</script>

<div class="toolbar">
  {#if isModerator}
  <button onclick={(e) => onshowTeacherView(e)} title="Lehrer-Ansicht öffnen">
    <GraduationCap size="24" />
  </button>
  {/if}
  {#if isModerator}
  <button class:active={$isMoveMode} onclick={toggleMoveMode} title="Verschiebemodus">
    <Move size="24" />
  </button>
  {/if}
  {#if isModerator}
  <button class:active={$isEditMode} onclick={toggleEditMode} title="Bearbeitungsmodus">
    <Edit size="24" />
  </button>
  {/if}
  {#if isModerator}
  <button onclick={createLesson} title="Neue Lesson erstellen">
    <PlusCircle size="24" />
  </button>
  {/if}  

  {#if isAdmin}
  <button onclick={(e) => onshowAdminView(e)} title="Admin-Ansicht öffnen">
    <Shield size="24" />
  </button>
  {/if}
</div>

{#if showCreateLessonDialog}
  <CreateLessonDialog
    category={currentCategory}
    x={imageSize?.width ? imageSize.width / 2 : 10}
    y={imageSize?.height ? imageSize.height / 2 : 10}
    onsuccess={(e) => {
      console.log(`Create Lesson Success. ${e}`); // Korrigierte Log-Ausgabe
      lessonCreated(e);
    }}
    oncancel={() =>{
      showCreateLessonDialog = false;
    }}
    onerror={(e) => alert(e.detail)}
  />
{/if}

<style>
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 260px;
    right: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0.75rem 1rem;
    z-index: 50;
  }

  .toolbar button {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    border-radius: 6px;
    transition: background 0.2s ease;
  }

  .toolbar button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .toolbar button.active {
    background-color: rgba(255, 255, 255, 0.25);
    color: #fff;
  }
</style>
