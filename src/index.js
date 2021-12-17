// Globals
import * as _ from "./js/globals/variables";

// Utils
import getDataFromStorage from "./js/utils/getDataFromStorage";

// Components
import CharacterList from "./js/components/CharacterList";
import Map from "./js/components/Map";
import ToggleSettingsBtn from "./js/components/ToggleSettingsBtn";

//Event Handlers
import clickHandler from "./js/handlers/clickHandler";
import dragEndHandler from "./js/handlers/dragEndHandler";
import dragStartHandler from "./js/handlers/dragStartHandler";
import dropHandler from "./js/handlers/dropHandler";
import inputHandler from "./js/handlers/inputHandler";
import renderHandler from "./js/handlers/renderHandler";
import touchMoveHandler from "./js/handlers/touchMoveHandler";
import keydownHandler from "./js/handlers/keydownHandler";

(function () {
  //// Inits
  getDataFromStorage(_.STORAGE_ID);
  ToggleSettingsBtn.render();
  Map.render();
  CharacterList.render();

  //// Event Listeners
  document.addEventListener("reef:render", renderHandler, false);

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

  document.addEventListener("keydown", keydownHandler, false);

  window.addEventListener("storage", () => {
    // When local storage changes in a different tab (ie: the settings page)
    // refresh any other open dnd map tabs (ie: the map page)
    getDataFromStorage(_.STORAGE_ID);
  });
})();
