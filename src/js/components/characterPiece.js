import DATA_STORE from "../globals/store";
import characterBGimg from "../utils/characterBGimg";
import { DEFAULT_COLOR } from "../globals/variables";

export default function characterPiece(character, index) {
  const zoomPercent = DATA_STORE.data.zoom / 100;

  const characterSize =
    DATA_STORE.data.pieceSize * zoomPercent * character.size;

  const characterPosX = character.x * zoomPercent;
  const characterPosY = character.y * zoomPercent;

  const charColor = character.color ? character.color : DEFAULT_COLOR;

  const charName = character.name ? character.name : "<em>Untitled</em>";

  const charAreaOfEffectRadius = character.areaOfEffectRadius
    ? character.areaOfEffectRadius * characterSize
    : 1 * characterSize;

  const charAreaOfEffectColor = character.areaOfEffectColor
    ? character.areaOfEffectColor
    : DEFAULT_COLOR;

  const charAreaOfEffect = character.areaOfEffect
    ? ` box-shadow: 1px 1px 1px 2px black, 0px 0px 0px ${charAreaOfEffectRadius}px ${charAreaOfEffectColor}75; `
    : "";

  return `
    <div 
      class='piece text-center inline-flex p-4 flex-col items-center cursor-grab hover:cursor-grab' draggable='true' id='${
        character.id
      }' 
      data-index='${index}' 
      style='position:absolute; top: ${characterPosY}px; left: ${characterPosX}px;'
    > 
    <div 
      class='bg-no-repeat bg-center rounded-full shadow-piece' 
      style='height:${characterSize}px; width:${characterSize}px;  ${charAreaOfEffect} background-color:${charColor}; ${characterBGimg(
    character
  )}'
    ></div> 
    <span class='piece-label p-05 mt-1 bg-white bg-opacity-90 text-xs rounded tracking-wide text-black truncate max-w-20' style='top:${
      characterSize * 1.15
    }px;'> 
      ${charName} 
    </span> 
    </div>
    `;
}
