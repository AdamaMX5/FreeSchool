<script lang="ts">
  import { isEditMode, toggleEditMode, isMoveMode, toggleMoveMode } from '../lib/global';
  import { Edit, Move, PlusCircle, GraduationCap, Shield, Bug } from 'lucide-svelte';
  import CreateLessonDialog from '../dialogs/CreateLessonDialog.svelte'; // <-- Dialog importieren
  import CreateGitIssueDialog from '../dialogs/CreateGitIssueDialog.svelte';
  import CategoryNew from '../components/CategoryNew.svelte';
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
    onshowAdminView = () => {},
    onCategoryCreated = () => {}
  } = $props();

  let showCreateLessonDialog = $state(false);
  let showCreateGitIssueDialog = $state(false);


  function createLesson() {
    showCreateLessonDialog = true;
  }

  function closeCreateLessonDialog() {
    showCreateLessonDialog = false;
  }

  function createGitIssue() {
    showCreateGitIssueDialog = true;
  }

  function closeCreateGitIssueDialog() {
    showCreateGitIssueDialog = false;
  }

  function lessonCreated(event) {
    closeCreateLessonDialog();
    onlessonCreated();
    if(!$isMoveMode)
      toggleMoveMode();
  }
</script>

<div class="toolbar">
  <!-- Links: neue Kategorie / neues Lernbüro -->
  <div class="toolbar-zone left">
    {#if isModerator}
    <CategoryNew
      parent={currentCategory}
      onsuccess={onCategoryCreated}
      onerror={(e) => alert(e.message)} />
    {/if}
  </div>

  <!-- Mitte: Aktionen rund um die Lektionen -->
  <div class="toolbar-zone center">
    {#if isModerator}
    <button onclick={(e) => onshowTeacherView(e)} title="Lehrer-Ansicht öffnen">
      <GraduationCap size="24" />
    </button>
    <button class:active={$isMoveMode} onclick={toggleMoveMode} title="Verschiebemodus">
      <Move size="24" />
    </button>
    <button class:active={$isEditMode} onclick={toggleEditMode} title="Bearbeitungsmodus">
      <Edit size="24" />
    </button>
    <button onclick={createLesson} title="Neue Lektion erstellen">
      <PlusCircle size="24" />
    </button>
    {/if}
    {#if isAdmin}
    <button onclick={(e) => onshowAdminView(e)} title="Admin-Ansicht öffnen">
      <Shield size="24" />
    </button>
    {/if}
  </div>

  <!-- Rechts: Verbesserung senden -->
  <div class="toolbar-zone right">
    {#if isAdmin || isModerator}
    <button onclick={createGitIssue} title="Verbesserung als Issue melden">
      <Bug size="24" />
    </button>
    {/if}
  </div>
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
    onerror={(e) => alert(e.message)}
  />
{/if}

{#if showCreateGitIssueDialog}
  <CreateGitIssueDialog
    onsuccess={() => {
      closeCreateGitIssueDialog();
      alert("Issue wurde erstellt.");
    }}
    oncancel={closeCreateGitIssueDialog}
    onerror={(e) => alert(e.message)}
  />
{/if}

<style>
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    box-sizing: border-box;
    background-color: #252526;
    border-top: 1px solid #333;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    z-index: 50;
  }

  /* Drei gleich breite Zonen: links | mitte | rechts */
  .toolbar-zone {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .toolbar-zone.left {
    justify-content: flex-start;
  }

  .toolbar-zone.center {
    justify-content: center;
  }

  .toolbar-zone.right {
    justify-content: flex-end;
  }

  .toolbar button,
  .toolbar :global(.icon-button.create) {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    border-radius: 6px;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar button:hover,
  .toolbar :global(.icon-button.create):hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .toolbar button.active {
    background-color: rgba(255, 255, 255, 0.25);
    color: #fff;
  }
</style>
