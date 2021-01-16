// Globals
import * as _ from "./js/globals/variables";

// Utils
import getDataFromStorage from "./js/utils/getDataFromStorage";

// Components
import CharacterList from "./js/components/CharacterList";
import Map from "./js/components/Map";
// import ToggleSettingsBtn from "./js/components/ToggleSettingsBtn";
import ToggleSettingsButton from "./js/components/ToggleSettingsButton";

//Event Handlers
import clickHandler from "./js/handlers/clickHandler";
import dragEndHandler from "./js/handlers/dragEndHandler";
import dragStartHandler from "./js/handlers/dragStartHandler";
import dropHandler from "./js/handlers/dropHandler";
import inputHandler from "./js/handlers/inputHandler";
import renderHandler from "./js/handlers/renderHandler";
import touchMoveHandler from "./js/handlers/touchMoveHandler";

(function () {
  //// Inits
  getDataFromStorage(_.STORAGE_ID);
  // ToggleSettingsBtn.render();
  Map.render();
  CharacterList.render();

  new ToggleSettingsButton({
    target: document.querySelector("#toggleSettingsBtn"),
  });

  //// Event Listeners
  document.addEventListener("render", renderHandler, false);

  document.addEventListener("input", inputHandler, false);

  document.addEventListener("click", clickHandler, false);

  document.addEventListener("dragstart", dragStartHandler, false);

  document.addEventListener("touchstart", dragStartHandler, false);

  document.addEventListener("touchmove", touchMoveHandler, false);

  document.addEventListener(
    "dragover",
    function (event) {
      event.preventDefault();
    },
    false
  );

  document.addEventListener("drop", dropHandler, false);

  document.addEventListener("touchend", dropHandler, false);

  document.addEventListener("dragend", dragEndHandler, false);
})();
