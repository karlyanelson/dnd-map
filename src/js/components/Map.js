import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import characterPiece from "./characterPiece";

const Map = new Reef("#mapContainer", {
  store: DATA_STORE,
  template: function (props) {
    let noMapInstructions = `To get started, upload a map and add your customizable characters using the settings panel on the left.`;

    if (window.location.pathname === "/map") {
      noMapInstructions = `To get started, upload a map and add your customizable characters on the <a href="/settings" target="_blank">Settings page</a>, or in the settings panel on the left of the <a href="/">Home page</a>.`;
    }

    let noMap = `
    <div class='no-map-message'> 
      <h2 class='no-map-message__header'>Welcome to your virtual Dungeons & Dragons tabletop!</h2> 
      <p class='no-map-message__text'>
        ${noMapInstructions}
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
