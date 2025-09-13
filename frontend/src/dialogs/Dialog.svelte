<script lang="ts">
  import { onDestroy } from 'svelte';

  let dialogDiv: HTMLDivElement;

  let {
    onclose = () => {}
  } = $props();

  $effect( () => {
    if (dialogDiv && document.body !== dialogDiv.parentNode) {
      document.body.appendChild(dialogDiv);
    }
  });

  onDestroy(() => {
    if (dialogDiv && dialogDiv.parentNode === document.body) {
      document.body.removeChild(dialogDiv);
    }
  });

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onclose();
    }
  }
</script>

<div
  bind:this={dialogDiv}
  class="dialog"
  onclick={handleBackdropClick}
>
  <div class="dialog-content"> <!-- stopPropagation -->
    <slot />
  </div>
</div>

<style>
  .dialog {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .dialog-content {
    background: #aaa;
    padding: 2rem;
    border-radius: 10px;
    min-width: 320px;
    max-width: 90vw;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
</style>
