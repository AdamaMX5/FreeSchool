<script lang="ts">
  import { marked } from 'marked';

  marked.use({ async: false }); // Synchrones Parsen erzwingen

  let {
    markdown = ''
  } = $props(); 

  let htmlContent = $state(''); 
  let container: HTMLDivElement = $state(); 

  
  $effect(() => {
    renderMarkdown();
  });

  async function renderMarkdown() {
    if (!markdown) return;
    htmlContent = await marked.parse(markdown);
  }

  $effect(() => {
    if (container) {
      container.innerHTML = htmlContent;
    }
  });
</script>

<div class="markdown" bind:this={container}>
  {@html htmlContent}
</div>

<style>
  .markdown {
    color: #eee;
    line-height: 1.6;
  }

  .markdown h1, .markdown h2 {
    color: #fff;
  }

  .markdown p {
    margin-bottom: 1em;
  }
</style>