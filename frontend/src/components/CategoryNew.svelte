<script>
  
  import { PlusCircle } from 'lucide-svelte';
  import CreateCategoryDialog from '../dialogs/CreateCategoryDialog.svelte';

  let {
    parent = null,
    onsuccess = () => {},
    onerror = () => {},
    oncancel = () => {}
  } = $props();

  let showDialog = $state(false);


  function open(event) {
    event.stopPropagation()
    showDialog = true;
  }

  function close() {
    showDialog = false;
  }

  function handleSuccess(event) {
    close();
    onsuccess(event.detail);
  }

  function handleError(event) {
    close();
    onerror(event);
  }

  function handleCancel() {
    close();
    oncancel();
  }
</script>

{#if parent}
  <button class="icon-button create" onclick={open} title="Neue Kategorie">
    <PlusCircle size="48" />
  </button>
{:else}
  <button class="icon-button create" onclick={open} title="Neues Lernbüro">
    <PlusCircle size="48" />
  </button>
{/if}

{#if showDialog}
  <CreateCategoryDialog
    {parent}
    onsuccess={handleSuccess}
    onerror={handleError}
    oncancel={handleCancel} />
{/if}

<style>
  .icon-button.create {
    border: none;
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    background-color: rgba(255, 0, 0, 0.5);
    z-index: 10;
  }
</style>
