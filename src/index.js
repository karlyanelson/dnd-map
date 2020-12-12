//// Reef
import Reef from "reefjs";

(function () {
  //// Data Store
  var store = new Reef.Store({
    data: {},
  });

  //// Variables
  var pieceSizeInput = document.getElementById("pieceSize");
  var mapZoomInput = document.getElementById("mapZoom");
  var mapSrcLabel = document.getElementById("mapSrcLabel");
  var imgUploadError = document.getElementById("imgUploadError");
  var characterCount = document.getElementById("charCount");
  var storageID = "dnd-map-data";
  var draggedElemPosX;
  var draggedElemPosY;
  var draggedElemMouseOffsetX;
  var draggedElemMouseOffsetY;
  var currentTouchPosX;
  var currentTouchPosY;
  var mainControlsContent = document.getElementById("mainControls");
  var defaultColor = "#ce0f0f";
  var iconListClasses = [
    "artificer",
    "barbarian",
    "bard",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard",
  ];
  var iconListRaces = [
    "aarakocra",
    "aasimar",
    "bugbear",
    "dragonborn",
    "dwarf",
    "elf",
    "firbolg",
    "genasi",
    "gnome",
    "goblin",
    "goliath",
    "halfling",
    "human",
    "kenku",
    "kobold",
    "lizardfolk",
    "orc",
    "tabaxi",
    "tiefling",
    "triton",
    "yuan-ti",
  ];
  var iconListMonsters = [
    "aberration",
    "beast",
    "celestial",
    "construct",
    "dragon",
    "elemental",
    "fey",
    "fiend",
    "giant",
    "humanoid",
    "monstrosity",
    "ooze",
    "plant",
    "undead",
  ];

  //// Methods
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function generateRandomID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  function getDatafromStorage() {
    var storedData = localStorage.getItem(storageID);
    var emptyData = {
      // map: "https://i.imgur.com/KYVBIZd.jpeg",
      map: null,
      settingsExpanded: true,
      pieceSize: 24,
      zoom: 100,
      characters: [],
    };
    var storedDataObject = storedData ? JSON.parse(storedData) : emptyData;
    store.data = storedDataObject;
  }

  function addCharacter() {
    var numOfCharacters = (store.data.characters.length + 1).toString();

    var zoomRatio = store.data.zoom / 100;
    var positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
    var randomNumberX =
      Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
    var randomNumberY =
      Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
    var posX =
      (window.innerWidth / 2 + window.pageXOffset) / zoomRatio -
      store.data.pieceSize / 2 +
      randomNumberX;
    var posY =
      (window.innerHeight / 2 + window.pageYOffset) / zoomRatio -
      store.data.pieceSize / 2 +
      randomNumberY;

    var newCharacter = {
      id: generateRandomID(),
      name: "Character " + numOfCharacters,
      color: defaultColor,
      image: "",
      icon: "",
      background: "color", // options are: 'color', 'image', 'icon'
      dragged: false,
      expanded: true,
      areaOfEffect: false,
      areaOfEffectRadius: 1,
      x: posX,
      y: posY,
      size: 1,
    };
    store.data.characters.push(newCharacter);
  }

  function removeCharacter(characterIndex) {
    if (characterIndex) {
      store.data.characters.splice(characterIndex, 1);
    }
  }

  function zoomMap(value) {
    store.data.zoom =
      value === "out"
        ? parseInt(store.data.zoom) - 10
        : parseInt(store.data.zoom) + 10;
  }

  function handleFiles(event) {
    const file = event.target.files[0];
    const maxMB = 3 * 1000 * 1000; // 1 MB = 1000 KB = 1000 B

    if (file.size <= maxMB) {
      const reader = new FileReader();
      reader.onload = (function () {
        return function (e) {
          store.data.map = e.target.result;
        };
      })();
      reader.readAsDataURL(file);

      if (!imgUploadError.hasAttribute("hidden")) {
        imgUploadError.addAttribute("hidden");
      }
    } else {
      imgUploadError.removeAttribute("hidden");
    }
  }

  function characterBGimg(character) {
    var charBGimg = "";
    var bgBlendMode = "";

    if (character.image) {
      charBGimg = " background-image: url(" + character.image + "); ";

      return charBGimg;
    }

    if (character.icon) {
      charBGimg =
        " background-image: url(" +
        "./img/" +
        character.icon +
        "/image.png" +
        "); ";
      bgBlendMode = " background-blend-mode: lighten; ";

      return charBGimg + bgBlendMode;
    }
  }

  //// Event Handlers
  function inputHandler(event) {
    if (event.target.matches("#mapSrc")) {
      handleFiles(event);
    }

    if (event.target.matches("#pieceSize")) {
      store.data.pieceSize = event.target.value;
    }

    if (event.target.matches("#mapZoom")) {
      store.data.zoom = event.target.value;
    }

    if (
      event.target.matches("[character-data-type]") &&
      event.target.hasAttribute("character-data-index")
    ) {
      var characterIndex = event.target.getAttribute("character-data-index");
      var characterDataType = event.target.getAttribute("character-data-type");
      store.data.characters[characterIndex][characterDataType] =
        event.target.value;
    }
  }

  function clickHandler(event) {
    if (!event.target.closest("button")) {
      return;
    }

    let buttonTarget = event.target.closest("button");

    if (buttonTarget.matches("[data-toggle-settings]")) {
      store.data.settingsExpanded = store.data.settingsExpanded ? false : true;
    }

    if (buttonTarget.matches("[data-toggle-character]")) {
      var characterContainer = buttonTarget.closest(".character-list-item");

      if (characterContainer) {
        var characterIndex = characterContainer.getAttribute("data-index");
        var character = store.data.characters[characterIndex];
        character.expanded = character.expanded ? false : true;
      }
    }

    if (buttonTarget.matches("#addCharacter")) {
      addCharacter();
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
    pieceSizeInput.value = store.data.pieceSize;
    mapZoomInput.value = store.data.zoom;
    characterCount.textContent = store.data.characters.length;
    mapSrcLabel.textContent = store.data.map ? "Change Map" : "Upload Map";

    store.data.settingsExpanded
      ? mainControlsContent.classList.remove("collapsed")
      : mainControlsContent.classList.add("collapsed");

    store.data.map
      ? document.body.classList.remove("no-map")
      : document.body.classList.add("no-map");

    localStorage.setItem(storageID, JSON.stringify(store.data));
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

    var zoomRatio = store.data.zoom / 100;

    var character = store.data.characters[characterIndex];

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

  function characterListItem(character, index) {
    // Sub Template
    function iconList(icon) {
      let selection = icon === character.icon ? "selected" : "";
      return (
        "<option " +
        selection +
        ' value="' +
        icon +
        '">' +
        capitalize(icon) +
        "</option>"
      );
    }

    // Variables
    var charColor = character.color ? character.color : defaultColor;

    var charExpanded = character.expanded ? true : false; // handle undefined

    var contentClass = character.expanded ? "" : " closed ";

    var arrow = character.expanded ? " arrow arrow-up " : " arrow arrow-down ";

    var btnCharName = character.name ? character.name : "<em>Untitled</em>";

    var iconSelectorContent =
      "<option></option>" +
      "<optgroup label='Classes'>" +
      iconListClasses.map(iconList).join("") +
      "</optgroup>" +
      "<optgroup label='Races'>" +
      iconListRaces.map(iconList).join("") +
      "</optgroup>" +
      "<optgroup label='Monsters'>" +
      iconListMonsters.map(iconList).join("") +
      "</optgroup>";

    // Template Content
    return (
      "<li class='character-list-item' data-id='" +
      character.id +
      "'" +
      "data-index='" +
      index +
      "'>" +
      // Character expand/collapse button
      "<button data-toggle-character aria-expanded=" +
      charExpanded +
      " class='character-list-item__trigger grid-row'>" +
      "<span class='character-list-item__thumbnail grid-col-auto' style='background-color:" +
      charColor +
      "; " +
      characterBGimg(character) +
      "'></span>" +
      "<span class='grid-col'>" +
      btnCharName +
      "</span>" +
      "<span class='grid-col-auto " +
      arrow +
      "'></span>" +
      "</button>" +
      "<div class='character-list-item__content " +
      contentClass +
      "'>" +
      "<fieldset>" +
      "<legend class='screenreader-only'>" +
      btnCharName +
      "'s Settings</legend>" +
      "<div class='grid-row form-field' >" +
      // Character Name
      "<div class='grid-col'>" +
      "<label for='name-" +
      character.id +
      "'>Name</label>" +
      "<input placeholder='Enter name...' type='text' character-data-type='name' value='" +
      character.name +
      "' id=name-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      // Character Color
      "<div class='grid-col-auto'>" +
      "<label for='color-" +
      character.id +
      "'>Color</label>" +
      "<input type='color' character-data-type='color' value='" +
      charColor +
      "' id=color-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      "</div>" +
      "<div class='form-field'>" +
      // Character Background selector
      // "<fieldset class='radio-group' >" +
      //   "<legend>Background</legend>" +
      //   "<input checked type='radio' name='radio-group-" + character.id + "' id='radio-color-" + character.id + "'>" +
      //   "<label for='radio-color-" + character.id + "'>Color</label>" +
      //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-icon-" + character.id + "'>" +
      //   "<label for='radio-icon-" + character.id + "'>Icon</label>" +
      //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-image-" + character.id + "'>" +
      //   "<label for='radio-image-" + character.id + "'>Image</label>" +
      // "</fieldset>" +

      // Character Icon
      "<label for='char-icon-" +
      character.id +
      "'>Icon</label>" +
      "<select name='Icon' character-data-type='icon' value='" +
      character.icon +
      "' id=char-icon-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      iconSelectorContent +
      "</select>" +
      // Character Image
      "<label for='char-image-" +
      character.id +
      "'>Image URL</label>" +
      "<input placeholder='None' type='url' character-data-type='image' value='" +
      character.image +
      "' id=char-image-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      "<div class='grid-row grid-row-align-end form-field'>" +
      // Character Size
      "<div>" +
      "<label for='size-" +
      character.id +
      "'>Size</label>" +
      "<input type='number' character-data-type='size' value='" +
      character.size +
      "' id=size-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      // Character X Postion
      "<div>" +
      "<label for='posX-" +
      character.id +
      "'>X</label>" +
      "<input type='number' step='5' character-data-type='x' value='" +
      character.x +
      "' id=posX-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      // Character Y Postion
      "<div>" +
      "<label for='posY-" +
      character.id +
      "'>Y</label>" +
      "<input type='number' character-data-type='y' value='" +
      character.y +
      "' id=posY-'" +
      character.id +
      "' character-data-index='" +
      index +
      "'>" +
      "</div>" +
      // Remove Character Button
      "<button data-remove character-data-index='" +
      index +
      "'>Remove</button>" +
      "</div>" +
      "</fieldset>" +
      "</div>" +
      "</li>"
    );
  }

  function characterPiece(character, index) {
    var zoomPercent = store.data.zoom / 100;

    var characterSize = store.data.pieceSize * zoomPercent * character.size;

    var characterPosX = character.x * zoomPercent;
    var characterPosY = character.y * zoomPercent;

    var charColor = character.color ? character.color : defaultColor;

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
      "<div class='piece-content' style='" +
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
    store: store,
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

  var CharacterList = new Reef("#characterList", {
    store: store,
    template: function (props) {
      return (
        "<ul>" + props.characters.map(characterListItem).join("") + "</ul>"
      );
    },
  });

  var ToggleSettingsBtn = new Reef("#toggleSettingsBtn", {
    store: store,
    template: function (props) {
      var btnText = props.settingsExpanded ? "Hide" : "Show";
      var arrow = props.settingsExpanded
        ? "arrow arrow-up"
        : "arrow arrow-down";

      return (
        '<button data-toggle-settings class="btn-toggle grid-row" aria-expanded="' +
        props.settingsExpanded +
        '">' +
        btnText +
        ' Settings<span class="' +
        arrow +
        '"></span></button>'
      );
    },
  });

  //// Inits
  getDatafromStorage();
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
