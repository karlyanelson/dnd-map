import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import characterBGimg from "../utils/characterBGimg";

function characterPiece(character, index) {
  let zoomPercent = DATA_STORE.data.zoom / 100;

  let characterSize = DATA_STORE.data.pieceSize * zoomPercent * character.size;

  let characterPosX = character.x * zoomPercent;
  let characterPosY = character.y * zoomPercent;

  let charColor = character.color ? character.color : _.DEFAULT_COLOR;

  let charName = character.name ? character.name : "<em>Untitled</em>";

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
      style='height:${characterSize}px; width:${characterSize}px; background-color:${charColor}; ${characterBGimg(
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
          To get started, upload a map and add your customizable characters using the <a href="../settings/index.html">settings page</a> or the settings panel on the <a href="/">home page</a>.
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
