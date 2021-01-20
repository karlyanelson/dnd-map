<script>
  import { globalStore } from "../globals/globalStore";
import characterBGimg from "../utils/characterBGimg";
  import CharacterPiece from "./CharacterPiece.svelte";

//   <div id="mapContainer" class="relative pt-2 touch-action-none">
//   <!--  ^leave room up top for controls when zoomed out; need touch action for drag and drop to work on mobile -->
//   <div class="no-map-message">
//     <h2 class="no-map-message__header">
//       Welcome to your virtual Dungeons & Dragons tabletop!
//     </h2>
//     <p class="no-map-message__text">
//       To get started, upload a map and add your customizable characters
//       using the settings panel on the left.
//     </p>
//     <p class="no-map-message__text">
//       Everything is saved automatically to your browser's storage.
//     </p>
//   </div>
// </div>
</script>

{#each $globalStore.characters as character, index}
  <CharacterPiece character={character} index={index} />
{/each}

<style>
  .no-map-message__header {
  font-size: 3rem;
}

.no-map-message__text {
  font-size: 1.5rem;
  line-height: 1.4;
}

.no-map-message {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
  padding: 1rem;
  min-height: 80vh;
}
</style>