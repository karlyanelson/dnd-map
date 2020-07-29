// Data Store
var store = new Reef.Store({
  data: {}
});

// Variables
var mapSrcInput = document.querySelector("#mapSrc");
var pieceSizeInput = document.querySelector("#pieceSize");
var storageID = "dnd-map-data";
var draggedElemPosX;
var draggedElemPosY;
var draggedElemMouseOffsetX;
var draggedElemMouseOffsetY;

// Methods
function generateRandomID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
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
    map: "https://i.imgur.com/KYVBIZd.jpeg",
    pieceSize: 24,
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
    image: "",
    dragged: false,
    x: 0,
    y: 0
  };
  store.data.characters.push(newCharacter);
}

function removeCharacter(characterIndex) {
  if (characterIndex){
    store.data.characters.splice(characterIndex, 1);
  }
}

// Event Handlers
function inputHandler(event) {
  if (event.target.matches("#mapSrc")) {
    store.data.map = event.target.value;
  }

  if (event.target.matches("#pieceSize")) {
    store.data.pieceSize = event.target.value;
  }

  var characterContainer = event.target.closest(".character-list-item");

  if (characterContainer) {
    var characterIndex = characterContainer.getAttribute("data-index");
    
    if (characterIndex) {
      store.data.characters[characterIndex].name = event.target.value
    }
  }
}

function clickHandler(event) {
  if(!event.target.matches('button')){
    return;
  }
  if (event.target.matches("#addCharacter")) {
    addCharacter();
  }
  if (event.target.matches("[data-remove]")) {
    var characterContainer = event.target.closest(".character-list-item");
    
    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      removeCharacter(characterIndex);
    }
  }
}

function storeData() {
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
  
  draggedElemPosX = event.pageX - draggedElemMouseOffsetX;
  draggedElemPosY = event.pageY - draggedElemMouseOffsetY;

  var character = store.data.characters[characterIndex];
  character.dragged = true;
  character.x = draggedElemPosX;
  character.y = draggedElemPosY;
}

function dragEndHandler(event) {
  event.target.style.opacity = "";
}

// Templates
function characterListItem(character, index) {
  return (
    "<div class='character-list-item' data-id='" + character.id + "'" + 
      "data-index='" + index + "'>" +
      "<label for='name-" +
        character.id +
      "'>Name</label>" +
      "<input type='text' data-type='name' value='" +
        character.name +
      "' id=input-'" +
        character.id +
      "'>" + "<button data-remove >Remove</button>" +
    "</div>"
  );
}

function characterPiece(character, index) {
  var draggedStyle = "";
  if (character.dragged === true) {
    draggedStyle = "position:absolute; top:" + character.y + "px; left:" + character.x + "px;";
  }
  return (
    "<div class='piece' draggable='true' id='" +
        character.id +
      "'" +
      "data-index='" +
        index +
      "'" +
      " style='" +
        draggedStyle +
      "'>" +
        "<div class='piece-content' style='" + 
          "height:" +
            store.data.pieceSize +
            "px; " +
            "width:" +
            store.data.pieceSize +
            "px; " +
        "'></div>" +
        "<span class='piece-label' style='top: " +
          store.data.pieceSize * 1.15 +
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
      "<div class='new-character-box'>" +
      props.characters.map(characterPiece).join("") +
      "</div>" +
      (props.map
        ? "<img draggable='false' src='" + props.map + "' />"
        : "<p class='empty'>No map image.</p>")
    );
  }
});

var characterList = new Reef("#characterList", {
  store: store,
  template: function (props) {
    return props.characters.map(characterListItem).join("");
  }
});

// Inits
getDatafromStorage();
map.render();
characterList.render();

mapSrcInput.value = store.data.map;
pieceSizeInput.value = store.data.pieceSize;

//Events
document.addEventListener("input", inputHandler, false);

document.addEventListener("click", clickHandler, false);

document.addEventListener("dragstart", dragStartHandler,false);

document.addEventListener("dragover", function (event) {event.preventDefault();},false);

document.addEventListener("drop", dropHandler, false);

document.addEventListener("dragend", dragEndHandler, false);

// Handle saving to localstorage every time the page data changes
document.addEventListener("render", storeData, false);
