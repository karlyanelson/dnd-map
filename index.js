// Data Store
var store = new Reef.Store({
  data: {}
});

// Variables
var mapSrcInput = document.querySelector("#mapSrc");
var pieceSizeInput = document.querySelector("#pieceSize");
var mapZoomInput = document.querySelector("#mapZoom");
var storageID = "dnd-map-data";
var draggedElemPosX;
var draggedElemPosY;
var draggedElemMouseOffsetX;
var draggedElemMouseOffsetY;
var mainControlsContent = document.querySelector("#mainControls");

// Methods
function generateRandomID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
}

function getDatafromStorage() {
  var storedData = localStorage.getItem(storageID);
  var emptyData = {
    map: "https://i.imgur.com/KYVBIZd.jpeg",
    settingsExpanded: true,
    pieceSize: 24,
    zoom: 100,
    characters: []
  };
  var storedDataObject = storedData ? JSON.parse(storedData) : emptyData;
  store.data = storedDataObject;
}

function addCharacter() {
  var numOfCharacters = (store.data.characters.length + 1).toString();
  var newCharacter = {
    id: generateRandomID(),
    name: "Character " + numOfCharacters,
    image: "none",
    dragged: false,
    x: 400,
    y: 100,
    size: 1
  };
  store.data.characters.push(newCharacter);
}

function removeCharacter(characterIndex) {
  if (characterIndex){
    store.data.characters.splice(characterIndex, 1);
  }
}

function zoomMap(value) {
  store.data.zoom = value === 'out' ? parseInt(store.data.zoom) - 10 : parseInt(store.data.zoom) + 10;
}

// Event Handlers
function inputHandler(event) {
  if (event.target.matches("#mapSrc")) {
    store.data.map = event.target.value;
  }

  if (event.target.matches("#pieceSize")) {
    store.data.pieceSize = event.target.value;
  }

  if (event.target.matches("#mapZoom")) {
    store.data.zoom = event.target.value;
  }

  if (event.target.matches('[character-data-type]') && event.target.hasAttribute('character-data-index')){
    var characterIndex = event.target.getAttribute('character-data-index');
    var characterDataType = event.target.getAttribute('character-data-type');
    store.data.characters[characterIndex][characterDataType] = event.target.value;
  }
}

function clickHandler(event) {
  if(!event.target.matches('button')){
    return;
  }
  if (event.target.matches('[data-toggle-settings]')) {
    store.data.settingsExpanded = store.data.settingsExpanded ? false : true;
  }

  if (event.target.matches("#addCharacter")) {
    addCharacter();
  }
  if (event.target.matches("[data-zoom]")) {
    zoomMap(event.target.getAttribute("data-zoom"));
  }
  if (event.target.matches("[data-remove]")) {
    var characterContainer = event.target.closest(".character-list-item");
    
    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      removeCharacter(characterIndex);
    }
  }
}

function renderHandler() {
  mapSrcInput.value = store.data.map;
  pieceSizeInput.value = store.data.pieceSize;
  mapZoomInput.value = store.data.zoom;

  store.data.settingsExpanded ? mainControlsContent.classList.remove('collapsed') : mainControlsContent.classList.add('collapsed');

  localStorage.setItem(storageID, JSON.stringify(store.data));
}

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.style.opacity = 0.5;
  
  draggedElemMouseOffsetX = event.offsetX;
  draggedElemMouseOffsetY = event.offsetY;
}

function dropHandler(event) {
  event.preventDefault();
  var draggedElemId = event.dataTransfer.getData("text");
  var draggedElem = document.getElementById(draggedElemId);
  var characterIndex = draggedElem.getAttribute("data-index");

  if (!characterIndex) {
    return
  }

  var zoomRatio = store.data.zoom / 100;
  
  draggedElemPosX = event.pageX - draggedElemMouseOffsetX;
  draggedElemPosY = event.pageY - draggedElemMouseOffsetY;

  var character = store.data.characters[characterIndex];

  character.dragged = true;
  character.x = draggedElemPosX / zoomRatio;
  character.y = draggedElemPosY / zoomRatio;
}

function dragEndHandler(event) {
  event.target.style.opacity = "";
}

// Templates
function characterListItem(character, index) {
  return (
    "<li class='character-list-item' data-id='" + character.id + "'" + 
      "data-index='" + index + "'>" + 
      "<div class='grid-row'>" +
        "<div>" +
          "<label for='name-" + character.id + "'>Name</label>" +
          "<input type='text' character-data-type='name' value='" + character.name +
          "' id=input-'" + character.id +
          "' character-data-index='" + index + "'>" +
        "</div>" +
        "<div>" +
          "<label for='size-" + character.id + "'>Size</label>" +
          "<input type='number' character-data-type='size' value='" + character.size +
          "' id=input-'" + character.id +
          "' character-data-index='" + index + "'>" +
        "</div>" +
      "</div>" +
      "<div class='grid-row grid-row-align-end'>" +
        "<div>" +
          "<label for='image-" + character.id + "'>Image</label>" +
          "<input type='url' character-data-type='image' value='" + character.image +
          "' id=input-'" + character.id +
          "' character-data-index='" + index + "'>" +
        "</div>" +
        "<button data-remove character-data-index='" + index + "'>Remove</button>" + 
      "</div>" +
    "</li>"
  );
}

function characterPiece(character, index) {
  var zoomPercent = store.data.zoom / 100;  

  var characterSize = store.data.pieceSize * zoomPercent * character.size;

  var characterPosX = character.x * zoomPercent;
  var characterPosY = character.y * zoomPercent;

  return (
    "<div class='piece' draggable='true' id='" +
        character.id +
      "'" +
      "data-index='" +
        index +
      "'" +
      " style='" +
        "position:absolute; " + "top:" + characterPosY + "px; left:" + characterPosX + "px;" +
      "'>" +
        "<div class='piece-content' style='" + 
            "height:" + characterSize + "px; " +
            "width:" + characterSize + "px; " +
            "background-image: url(" + character.image + ");" +
        "'></div>" +
        "<span class='piece-label' style='top: " +
          characterSize * 1.15 +
        "px;" +
        "'>" +
          character.name +
        "</span>" +
    "</div>"
  );
}

// Components

var map = new Reef("#mapContainer", {
  store: store,
  template: function (props) {
    return (
      props.characters.map(characterPiece).join("") +
      (props.map
        ? "<img draggable='false' src='" + props.map + "' style='width:" + props.zoom + "%;' />"
        : "<p class='empty'>No map image.</p>")
    );
  }
});

var characterList = new Reef("#characterList", {
  store: store,
  template: function (props) {
    return '<ul>' + props.characters.map(characterListItem).join("") + '</ul>';
  }
});

var toggleSettingsBtn = new Reef("#toggleSettingsBtn", {
  store: store,
  template: function (props) {
    var btnText = props.settingsExpanded ? 'Hide' : 'Show'
    var arrow = props.settingsExpanded ? 'arrow-up' : 'arrow-down'

    return '<button data-toggle-settings aria-expanded="' + props.settingsExpanded + '" class="grid-row">' + btnText + ' Controls<span class="' + arrow + '"></span></button>'
  }
})

// Inits
getDatafromStorage();
toggleSettingsBtn.render();
map.render();
characterList.render();

//Events
document.addEventListener("input", inputHandler, false);

document.addEventListener("click", clickHandler, false);

document.addEventListener("dragstart", dragStartHandler,false);

document.addEventListener("dragover", function (event) {event.preventDefault();},false);

document.addEventListener("drop", dropHandler, false);

document.addEventListener("dragend", dragEndHandler, false);

// Handle saving to localstorage every time the page data changes
document.addEventListener("render", renderHandler, false);
