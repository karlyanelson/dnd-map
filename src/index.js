//// Reef
import Reef from "reefjs";

// Globals
import DATA_STORE from "./globals/store";
import * as _ from "./globals/variables";

// Utils
import { getDatafromStorage, characterBGimg } from "./utils/utils";
import addCharacter from "./utils/addCharacter";

// Components
import CharacterList from "./components/CharacterList";

(function () {
  //// Variables
  let draggedElemPosX;
  let draggedElemPosY;
  let draggedElemMouseOffsetX;
  let draggedElemMouseOffsetY;
  let currentTouchPosX;
  let currentTouchPosY;

  //// Methods

  function removeCharacter(characterIndex) {
    if (characterIndex) {
      DATA_STORE.data.characters.splice(characterIndex, 1);
    }
  }

  function zoomMap(value) {
    DATA_STORE.data.zoom =
      value === "out"
        ? parseInt(DATA_STORE.data.zoom) - 10
        : parseInt(DATA_STORE.data.zoom) + 10;
  }

  function handleFiles(event) {
    const file = event.target.files[0];
    const maxMB = 3 * 1000 * 1000; // 1 MB = 1000 KB = 1000 B

    if (file.size <= maxMB) {
      const reader = new FileReader();
      reader.onload = (function () {
        return function (e) {
          DATA_STORE.data.map = e.target.result;
        };
      })();
      reader.readAsDataURL(file);

      if (!_.imgUploadError.hasAttribute("hidden")) {
        _.imgUploadError.addAttribute("hidden");
      }
    } else {
      _.imgUploadError.removeAttribute("hidden");
    }
  }

  //// Event Handlers
  function inputHandler(event) {
    if (event.target.matches("#mapSrc")) {
      handleFiles(event);
    }

    if (event.target.matches("#pieceSize")) {
      DATA_STORE.data.pieceSize = event.target.value;
    }

    if (event.target.matches("#mapZoom")) {
      DATA_STORE.data.zoom = event.target.value;
    }

    if (
      event.target.matches("[character-data-type]") &&
      event.target.hasAttribute("character-data-index")
    ) {
      var characterIndex = event.target.getAttribute("character-data-index");
      var characterDataType = event.target.getAttribute("character-data-type");
      DATA_STORE.data.characters[characterIndex][characterDataType] =
        event.target.value;
    }
  }

  function clickHandler(event) {
    if (!event.target.closest("button")) {
      return;
    }

    let buttonTarget = event.target.closest("button");

    if (buttonTarget.matches("[data-toggle-settings]")) {
      DATA_STORE.data.settingsExpanded = DATA_STORE.data.settingsExpanded
        ? false
        : true;
    }

    if (buttonTarget.matches("[data-toggle-character]")) {
      var characterContainer = buttonTarget.closest(".character-list-item");

      if (characterContainer) {
        var characterIndex = characterContainer.getAttribute("data-index");
        var character = DATA_STORE.data.characters[characterIndex];
        character.expanded = character.expanded ? false : true;
      }
    }

    if (buttonTarget.matches("#addCharacter")) {
      addCharacter(DATA_STORE);
    }

    if (buttonTarget.matches("[data-zoom]")) {
      zoomMap(buttonTarget.getAttribute("data-zoom"));
    }

    if (buttonTarget.matches("[data-remove]")) {
      var characterContainer = buttonTarget.closest(".character-list-item");

      if (characterContainer) {
        var characterIndex = characterContainer.getAttribute("data-index");
        removeCharacter(characterIndex);
      }
    }
  }

  function renderHandler() {
    _.pieceSizeInput.value = DATA_STORE.data.pieceSize;
    _.mapZoomInput.value = DATA_STORE.data.zoom;
    _.characterCount.textContent = DATA_STORE.data.characters.length;
    _.mapSrcLabel.textContent = DATA_STORE.data.map
      ? "Change Map"
      : "Upload Map";

    DATA_STORE.data.settingsExpanded
      ? _.mainControlsContent.classList.remove("collapsed")
      : _.mainControlsContent.classList.add("collapsed");

    DATA_STORE.data.map
      ? document.body.classList.remove("no-map")
      : document.body.classList.add("no-map");

    localStorage.setItem(_.STORAGE_ID, JSON.stringify(DATA_STORE.data));
  }

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
    var draggedElemId;

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
    var draggedElem = document.getElementById(draggedElemId);
    var characterIndex = draggedElem.getAttribute("data-index");

    if (!characterIndex) {
      return;
    }

    var zoomRatio = DATA_STORE.data.zoom / 100;

    var character = DATA_STORE.data.characters[characterIndex];

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

  //// Templates

  function characterPiece(character, index) {
    var zoomPercent = DATA_STORE.data.zoom / 100;

    var characterSize =
      DATA_STORE.data.pieceSize * zoomPercent * character.size;

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
      "<div class='bg-no-repeat bg-center rounded-full shadow-piece bg-80%' style='" +
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

  //// Components

  var Map = new Reef("#mapContainer", {
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

  var ToggleSettingsBtn = new Reef("#toggleSettingsBtn", {
    store: DATA_STORE,
    template: function (props) {
      var btnText = props.settingsExpanded ? "Hide" : "Show";
      var arrow = props.settingsExpanded
        ? "arrow arrow-up"
        : "arrow arrow-down";

      return (
        '<button data-toggle-settings class="button-outline content-row" aria-expanded="' +
        props.settingsExpanded +
        '">' +
        "<span>" +
        btnText +
        ' Settings</span><span class="' +
        arrow +
        '"></span></button>'
      );
    },
  });

  //// Inits
  getDatafromStorage(_.STORAGE_ID, DATA_STORE);
  ToggleSettingsBtn.render();
  Map.render();
  CharacterList.render();

  //// Events
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
