import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import characterBGimg from "../utils/characterBGimg";

function characterPiece(character, index) {
  var zoomPercent = DATA_STORE.data.zoom / 100;

  var characterSize = DATA_STORE.data.pieceSize * zoomPercent * character.size;

  var characterPosX = character.x * zoomPercent;
  var characterPosY = character.y * zoomPercent;

  var charColor = character.color ? character.color : _.DEFAULT_COLOR;

  var charName = character.name ? character.name : "<em>Untitled</em>";

  return (
    "<div class='piece' draggable='true' id='" +
    character.id +
    "'" +
    "data-index='" +
    index +
    "'" +
    " style='" +
    "position:absolute; " +
    "top:" +
    characterPosY +
    "px; left:" +
    characterPosX +
    "px;" +
    "'>" +
    "<div class='bg-no-repeat bg-center rounded-full shadow-piece' style='" +
    "height:" +
    characterSize +
    "px; " +
    "width:" +
    characterSize +
    "px; " +
    "background-color:" +
    charColor +
    ";" +
    characterBGimg(character) +
    "'></div>" +
    "<span class='piece-label' style='top: " +
    characterSize * 1.15 +
    "px;" +
    "'>" +
    charName +
    "</span>" +
    "</div>"
  );
}

const Map = new Reef("#mapContainer", {
  store: DATA_STORE,
  template: function (props) {
    var noMap =
      "<div class='no-map-message'>" +
      "<h2 class='no-map-message__header'>Welcome to your virtual Dungeons & Dragons tabletop!</h2>" +
      "<p class='no-map-message__text'>To get started, upload a map and add your customizable characters using the settings panel on the left.</p> <p class='no-map-message__text'>Everything is saved automatically to your browser's storage.</p>" +
      "</div>";
    return (
      props.characters.map(characterPiece).join("") +
      (props.map
        ? "<img alt='' draggable='false' src='" +
          props.map +
          "' style='width:" +
          props.zoom +
          "%;' />"
        : noMap)
    );
  },
});

export default Map;
