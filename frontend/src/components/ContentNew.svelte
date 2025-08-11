<script>
    import { PlusCircle } from 'lucide-svelte';
    import CreateContentDialog from '../dialogs/CreateContentDialog.svelte';
  
    let {
      lesson,
      onsuccess = () => {},
      onerror = () => {},
      oncancel = () => {}
    } = $props();
  
    let showDialog = $state(false);
  
  
    function open(event) {
      event.stopPropagation();
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
      console.log("EIn Fehler ist passiert: ", event);
      onerror(event);
    }
  
    function handleCancel() {
      close();
      oncancel();
    }
  </script>
  
  
    <button class="icon-button create" onclick={open} title="Neuer Content">
        <PlusCircle />
    </button>

  
  {#if showDialog}
    <CreateContentDialog
      {lesson}
      onsuccess={handleSuccess}
      onerror={handleError}
      oncancel={handleCancel} />
  {/if}
  
  <style>
    .icon-button.create {
      border: none;
      border-radius: 6px;
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      background: none;
      z-index: 10;
    }
  </style>
  