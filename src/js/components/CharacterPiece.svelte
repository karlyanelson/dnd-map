<script>
import * as _ from "../globals/variables";
import { globalStore } from "../globals/globalStore";
import characterBGimg from "../utils/characterBGimg";

export let character;
export let index;

$: zoomPercent = $globalStore.zoom / 100;

$: characterSize = $globalStore.pieceSize * zoomPercent * character.size;

$: characterPosX = character.x * zoomPercent;
$: characterPosY = character.y * zoomPercent;

$: charColor = character.color ? character.color : _.DEFAULT_COLOR;

$: charName = character.name ? character.name : "<em>Untitled</em>";

$:charBGImg = characterBGimg(character);
</script>

<div 
class='piece text-center inline-flex p-4 flex-col items-center cursor-grab hover:cursor-grab' draggable='true' id={character.id} data-index={index} 
style={`position:absolute; top:${characterPosY}px; left:${characterPosX}px;`}>
  <div 
    class='bg-no-repeat bg-center rounded-full shadow-piece' 
    style="height: {characterSize}px; width:{characterSize}px; background-color:{charColor}; {charBGImg};">
  </div>
  <span 
    class='piece-label p-05 mt-1 bg-white bg-opacity-90 text-xs rounded tracking-wide text-black truncate max-w-20' 
    style='top: {characterSize * 1.15}px;'
  >
    {charName}
  </span>
</div>