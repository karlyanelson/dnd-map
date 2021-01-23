<script>
  import { generateRandomID } from "../utils/utils";
  import { DEFAULT_COLOR } from "../globals/variables";
  import { globalStore } from "../globals/globalStore";
  import CharacterListItem from "./CharacterListItem";

function addCharacter() {
  const numOfCharacters = ($globalStore.characters.length + 1).toString();

  const zoomRatio = $globalStore.zoom / 100;
  const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
  const randomNumberX =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const randomNumberY =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const posX =
    (window.innerWidth / 2 + window.pageXOffset) / zoomRatio -
    $globalStore.pieceSize / 2 +
    randomNumberX;
  const posY =
    (window.innerHeight / 2 + window.pageYOffset) / zoomRatio -
    $globalStore.pieceSize / 2 +
    randomNumberY;

  var newCharacter = {
    id: generateRandomID(),
    name: "Character " + numOfCharacters,
    color: DEFAULT_COLOR,
    image: "",
    icon: "",
    background: "color", // options are: 'color', 'image', 'icon'
    dragged: false,
    expanded: true,
    areaOfEffect: false,
    areaOfEffectRadius: 1,
    x: posX,
    y: posY,
    size: 1,
  };

  globalStore.addCharacter(newCharacter)
}

</script>
<section class="pt-4 pb-8 px-0">
  <div class="content-row">
    <h2 aria-live="polite">
      <span id="charCount" class="screenreader-only">0</span
      >Characters
    </h2>
    <button on:click={addCharacter} class="button" id="addCharacter">Add Character</button>
  </div>
  <div id="characterList">
    <ul>
      {#each $globalStore.characters as character, index}
        <CharacterListItem character={character} index={index} />
      {/each}
    </ul>
    
  </div>
</section>