<script lang="ts">
  import { Pencil } from 'lucide-svelte';
  import EditCategoryDialog from '../dialogs/EditCategoryDialog.svelte';
  

  let {
    category = null,
    onsuccess = () => {},
    onerror = () => {}
  } = $props();
  

  let showDialog = $state(false);

  function open(event) {
    event.stopPropagation();
    showDialog = true;
  }

  function close() {
    showDialog = false;
  }

  function handleSuccess(result) {
    console.log("Kategorie erfolgreich aktualisiert:", result);
    onsuccess(result); 
    close();
  }

  function handleError(error) {
    console.error("Fehler beim Aktualisieren:", error);
    onerror(error);
  }

</script>

<button
  class="icon-button edit"
  on:click|stopPropagation={open} 
  title="Bearbeiten"
>
  <Pencil size="30" />
</button>

{#if showDialog}
  <EditCategoryDialog
    category={category}
    oncancel={close}
    onsuccess={handleSuccess}
    onerror={handleError}
  />
{/if}

<style>
  .icon-button.edit {
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: red;
    background-color: transparent;
    z-index: 10;
  }
</style>
