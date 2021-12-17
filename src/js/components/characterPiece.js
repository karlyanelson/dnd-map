import DATA_STORE from "../globals/store";
import characterBGimg from "../utils/characterBGimg";
import { DEFAULT_COLOR } from "../globals/variables";

export default function characterPiece(character, index) {
  console.log("characterPiece called");
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

  const charSelected = character.selected || false;

  return `
    <button 
      class='piece-container text-center inline-flex p-0 flex-col items-center cursor-grab rounded-full hover:cursor-grab' 
      id='${character.id}' 
      data-character-piece
      data-index='${index}' 
      draggable='true' 
      aria-grabbed='${character.dragged || charSelected}'
      aria-dropeffect='${character.dragged || charSelected ? "move" : "none"}'
      style='position:absolute; top: ${characterPosY}px; left: ${characterPosX}px;'
    > 
      <div 
        class='bg-no-repeat bg-center rounded-full ${
          charSelected ? "outline-dotted shadow-high-dark" : "shadow-piece"
        }' 
        style='height:${characterSize}px; width:${characterSize}px;  ${charAreaOfEffect} background-color:${charColor}; ${characterBGimg(
    character
  )}'
      ></div> 
      <span class='piece-label p-05 mt-1 bg-white bg-opacity-90 text-xs rounded tracking-wide text-black truncate max-w-20 absolute' style='top:${
        characterSize + 4
      }px;'> 
        ${charName} 
      </span> 
    </button>
    `;
}
