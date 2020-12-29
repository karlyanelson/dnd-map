// Globals
import DATA_STORE from "./js/globals/store";
import * as _ from "./js/globals/variables";

// Utils
import getDataFromStorage from "./js/utils/getDataFromStorage";

// Components
import CharacterList from "./js/components/CharacterList";
import Map from "./js/components/Map";
import ToggleSettingsBtn from "./js/components/ToggleSettingsBtn";

//Event Handlers
import renderHandler from "./js/handlers/renderHandler";
import inputHandler from "./js/handlers/inputHandler";
import clickHandler from "./js/handlers/clickHandler";

(function () {
  //// Drag and Drop
  let draggedElemMouseOffsetX;
  let draggedElemMouseOffsetY;
  let currentTouchPosX;
  let currentTouchPosY;

  function dragStartHandler(event) {
    if (event.type === "touchstart") {
      if (!event.target.closest(".piece")) {
        return;
      }
      event.target.style.opacity = 0.5;
      draggedElemMouseOffsetX = event.touches[0].target.offsetLeft;
      draggedElemMouseOffsetY = event.touches[0].target.offsetTop;
    } else {
      event.target.style.opacity = 0.5;
      event.dataTransfer.setData("text/plain", event.target.id);
      draggedElemMouseOffsetX = event.offsetX;
      draggedElemMouseOffsetY = event.offsetY;
    }
  }

  function touchMoveHandler(event) {
    if (!event.target.closest(".piece")) {
      return;
    }
    currentTouchPosX = event.touches[0].pageX;
    currentTouchPosY = event.touches[0].pageY;
  }

  function dropHandler(event) {
    let draggedElemPosX;
    let draggedElemPosY;
    let draggedElemId;

    if (event.type === "touchend") {
      if (event.target.closest(".piece")) {
        draggedElemId = event.target.closest(".piece").id;
      } else {
        return;
      }
    } else {
      event.preventDefault();
      draggedElemId = event.dataTransfer.getData("text");
    }
    const draggedElem = document.getElementById(draggedElemId);
    const characterIndex = draggedElem.getAttribute("data-index");

    if (!characterIndex) {
      return;
    }

    const zoomRatio = DATA_STORE.data.zoom / 100;

    const character = DATA_STORE.data.characters[characterIndex];

    character.dragged = true;

    if (event.type === "touchend") {
      draggedElemPosX = currentTouchPosX - draggedElemMouseOffsetX;
      draggedElemPosY = currentTouchPosY - draggedElemMouseOffsetY;
    } else {
      draggedElemPosX = event.pageX - draggedElemMouseOffsetX;
      draggedElemPosY = event.pageY - draggedElemMouseOffsetY;
    }

    character.x = draggedElemPosX / zoomRatio;
    character.y = draggedElemPosY / zoomRatio;
  }

  function dragEndHandler(event) {
    event.target.style.opacity = "";
  }

  //// Inits
  getDataFromStorage(_.STORAGE_ID);
  ToggleSettingsBtn.render();
  Map.render();
  CharacterList.render();

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
