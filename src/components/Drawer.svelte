<script>
  import { onMount, reactive } from 'svelte';
  let isOpen = false;
  let content = "";
  let blockDocument = "";

  function toggleDrawer(open) {
    isOpen = open;
    if (isOpen) {
      content = document.getElementById('artisan-frame').contentDocument.documentElement.outerHTML;
    }
  }

  // Assuming the `Blocks` prop is passed to the Svelte component, you could set it as the initial `blockDocument` value like this:
  export let Blocks;
  onMount(() => {
    blockDocument = Blocks;
  });
</script>

<div>
  <div id="drawer" class:fixed class:top-0 class:left-0 class:w-full class:h-full class:bg-black class:bg-opacity-50 class:z-40 class:hidden={!isOpen}>
    <div class="absolute top-0 left-0 w-96 h-full bg-white overflow-auto">
      <button on:click={() => toggleDrawer(false)}>Close</button>
      <div id="drawer-content" {@html: content} />
    </div>
  </div>
  <iframe id="artisan-frame" srcDoc={blockDocument} class="w-full h-screen m-0" on:click={() => toggleDrawer(true)} />
</div>
