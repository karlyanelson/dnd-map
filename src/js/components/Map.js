import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import characterBGimg from "../utils/characterBGimg";
import { DEFAULT_COLOR } from "../globals/variables";

function characterPiece(character, index) {
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

const Map = new Reef("#mapContainer", {
  store: DATA_STORE,
  template: function (props) {
    let noMap = `
      <div class='no-map-message'> 
        <h2 class='no-map-message__header'>Welcome to your virtual Dungeons & Dragons tabletop!</h2> 
        <p class='no-map-message__text'>
          To get started, upload a map and add your customizable characters using the settings panel on the <a href="/">home page</a> or using the <a href="/settings" target="_blank">settings page</a>.
        </p> 
        <p class='no-map-message__text mt-6'>Everything is saved automatically to your browser's storage.</p> 
      </div>
      `;
    return (
      props.characters.map(characterPiece).join("") +
      (props.map
        ? `<img alt='' draggable='false' src='${props.map}' style='width:${props.zoom}%;' />`
        : noMap)
    );
  },
});

export default Map;
