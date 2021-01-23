<script>
  import { globalStore } from "../globals/globalStore";

  function increaseZoom(){
    globalStore.updateData('zoom', $globalStore.zoom + 10)
  }

  function decreaseZoom(){
    globalStore.updateData('zoom', $globalStore.zoom - 10)
  }
</script>



<div
  class="map-controls py-2 px-4 border-1 border-black fixed bg-ink bg-opacity-90 rounded-lg z-50 content-row bottom-4 left-4 sm:bottom-auto sm:left-auto sm:right-4 sm:top-4"
>
  <label class="m-0" for="mapZoom">Map Zoom</label>
  <button on:click={decreaseZoom} class="button" data-zoom="out" aria-label="Zoom out">
    &#8211;
  </button>
  <input id="mapZoom" step="10" type="number" name="Map Zoom" bind:value={$globalStore.zoom} />
  <button on:click={increaseZoom} class="button" data-zoom="in" aria-label="Zoom in">+</button>
</div>